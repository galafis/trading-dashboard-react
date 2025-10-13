/**
 * Node.js/Express Backend Example for Trading Dashboard
 * =====================================================
 * 
 * This example demonstrates a complete Express backend implementation
 * for the Trading Dashboard React application.
 * 
 * Features:
 * - REST API endpoints for strategies and trades
 * - WebSocket support for real-time updates
 * - CORS enabled for development
 * - Sample data generation
 * - TypeScript support
 * 
 * Installation:
 * npm install express cors ws
 * npm install --save-dev @types/express @types/cors @types/ws
 */

import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import http from 'http';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(cors());
app.use(express.json());

// Types
interface Strategy {
  name: string;
  sharpe: number;
  drawdown: number;
  winRate: number;
  profitFactor: number;
  return: number;
}

interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice: number;
  profit: number;
  date: string;
}

interface EquityPoint {
  timestamp: string;
  value: number;
}

// Sample data
const STRATEGIES: Record<string, Strategy> = {
  'strategy-alpha': {
    name: 'Strategy Alpha',
    sharpe: 1.85,
    drawdown: -0.15,
    winRate: 0.62,
    profitFactor: 2.1,
    return: 0.25
  },
  'strategy-beta': {
    name: 'Strategy Beta',
    sharpe: 1.50,
    drawdown: -0.10,
    winRate: 0.58,
    profitFactor: 1.8,
    return: 0.20
  },
  'strategy-gamma': {
    name: 'Strategy Gamma',
    sharpe: 1.20,
    drawdown: -0.08,
    winRate: 0.55,
    profitFactor: 1.5,
    return: 0.15
  }
};

// Generate sample trades
const generateTrades = (strategyId: string, count: number = 50): Trade[] => {
  const symbols = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA'];
  const trades: Trade[] = [];
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - 30);

  for (let i = 0; i < count; i++) {
    const tradeType = Math.random() > 0.5 ? 'BUY' : 'SELL';
    const entryPrice = 100 + Math.random() * 400;
    
    // Simulate 60% win rate
    const isWin = Math.random() < 0.6;
    let exitPrice: number;
    
    if (tradeType === 'BUY') {
      exitPrice = isWin
        ? entryPrice * (1 + Math.random() * 0.05)
        : entryPrice * (1 - Math.random() * 0.05);
    } else {
      exitPrice = isWin
        ? entryPrice * (1 - Math.random() * 0.05)
        : entryPrice * (1 + Math.random() * 0.05);
    }
    
    const profit = tradeType === 'BUY'
      ? exitPrice - entryPrice
      : entryPrice - exitPrice;

    const tradeDate = new Date(baseDate);
    tradeDate.setHours(tradeDate.getHours() + i * 12);

    trades.push({
      id: `${strategyId}-${i}`,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      type: tradeType,
      entryPrice: Number(entryPrice.toFixed(2)),
      exitPrice: Number(exitPrice.toFixed(2)),
      profit: Number(profit.toFixed(2)),
      date: tradeDate.toISOString()
    });
  }

  return trades;
};

// Generate equity curve
const generateEquityCurve = (initialCapital: number = 10000, points: number = 100): EquityPoint[] => {
  const equityData: EquityPoint[] = [];
  let currentValue = initialCapital;
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - points);

  for (let i = 0; i < points; i++) {
    // Random walk with positive drift
    const change = Math.random() * 0.02 - 0.008; // 0.2% drift, 1% volatility
    currentValue *= (1 + change);

    const pointDate = new Date(baseDate);
    pointDate.setDate(pointDate.getDate() + i);

    equityData.push({
      timestamp: pointDate.toISOString(),
      value: Number(currentValue.toFixed(2))
    });
  }

  return equityData;
};

// REST API Endpoints

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/strategies', (req, res) => {
  res.json(Object.values(STRATEGIES));
});

app.get('/api/strategies/:id', (req, res) => {
  const { id } = req.params;
  const strategy = STRATEGIES[id];
  
  if (!strategy) {
    return res.status(404).json({ error: 'Strategy not found' });
  }
  
  res.json(strategy);
});

app.get('/api/trades/:strategyId', (req, res) => {
  const { strategyId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.per_page as string) || 20;
  
  const allTrades = generateTrades(strategyId, 50);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  
  res.json({
    trades: allTrades.slice(start, end),
    total: allTrades.length,
    page,
    per_page: perPage,
    total_pages: Math.ceil(allTrades.length / perPage)
  });
});

app.get('/api/equity/:strategyId', (req, res) => {
  const points = parseInt(req.query.points as string) || 100;
  const equityData = generateEquityCurve(10000, points);
  res.json(equityData);
});

app.get('/api/metrics/:strategyId', (req, res) => {
  const { strategyId } = req.params;
  const strategy = STRATEGIES[strategyId];
  
  if (!strategy) {
    return res.status(404).json({ error: 'Strategy not found' });
  }
  
  const trades = generateTrades(strategyId, 50);
  const winningTrades = trades.filter(t => t.profit > 0);
  const losingTrades = trades.filter(t => t.profit <= 0);
  
  const totalProfit = trades.reduce((sum, t) => sum + t.profit, 0);
  const avgWin = winningTrades.length > 0
    ? winningTrades.reduce((sum, t) => sum + t.profit, 0) / winningTrades.length
    : 0;
  const avgLoss = losingTrades.length > 0
    ? losingTrades.reduce((sum, t) => sum + t.profit, 0) / losingTrades.length
    : 0;
  
  res.json({
    ...strategy,
    totalTrades: trades.length,
    winningTrades: winningTrades.length,
    losingTrades: losingTrades.length,
    totalProfit: Number(totalProfit.toFixed(2)),
    averageWin: Number(avgWin.toFixed(2)),
    averageLoss: Number(avgLoss.toFixed(2)),
    largestWin: Number(Math.max(...trades.map(t => t.profit)).toFixed(2)),
    largestLoss: Number(Math.min(...trades.map(t => t.profit)).toFixed(2))
  });
});

// WebSocket Connection
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connected',
    message: 'Successfully connected to trading server',
    timestamp: new Date().toISOString()
  }));
  
  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      
      if (data.type === 'subscribe') {
        console.log(`Client subscribed to ${data.strategyId}`);
        
        // Send periodic updates (every 5 seconds)
        const interval = setInterval(() => {
          if (ws.readyState === ws.OPEN) {
            const update = {
              type: 'equity_update',
              strategyId: data.strategyId,
              timestamp: new Date().toISOString(),
              value: 10000 + Math.random() * 500 - 100
            };
            ws.send(JSON.stringify(update));
          } else {
            clearInterval(interval);
          }
        }, 5000);
        
        // Clear interval on disconnect
        ws.on('close', () => {
          clearInterval(interval);
        });
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Error handlers
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log('=================================');
  console.log('Trading Dashboard Backend Server');
  console.log('=================================');
  console.log(`REST API: http://localhost:${PORT}`);
  console.log(`WebSocket: ws://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop');
  console.log('=================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
