# Backend Integration Examples

This directory contains examples of how to integrate the Trading Dashboard with different backend systems.

## Contents

1. [REST API Integration](./rest-api-integration.md)
2. [WebSocket Integration](./websocket-integration.md)
3. [Python Backend Example](./python-backend-example.py)
4. [Real-time Data Streaming](./real-time-streaming.md)

## Quick Start

### Python Backend with Flask

See [python-backend-example.py](./python-backend-example.py) for a complete Flask backend implementation.

### Node.js Backend with Express

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Strategy performance endpoint
app.get('/api/strategies/:id', (req, res) => {
  res.json({
    name: 'Strategy Alpha',
    sharpe: 1.85,
    drawdown: -0.15,
    winRate: 0.62,
    profitFactor: 2.1,
    return: 0.25
  });
});

// Trade history endpoint
app.get('/api/trades/:strategyId', (req, res) => {
  res.json([
    {
      id: '1',
      symbol: 'AAPL',
      type: 'BUY',
      entryPrice: 150.00,
      exitPrice: 155.00,
      profit: 5.00,
      date: new Date()
    }
  ]);
});

app.listen(8000, () => {
  console.log('Backend running on port 8000');
});
```

## WebSocket Server Example

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8001 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send data every 5 seconds
  const interval = setInterval(() => {
    const data = {
      equity: {
        timestamp: new Date(),
        value: 10000 + Math.random() * 1000
      },
      trades: [
        // ... latest trades
      ]
    };
    ws.send(JSON.stringify(data));
  }, 5000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});
```

## Authentication

### JWT Authentication Example

```typescript
import axios from 'axios';

// Setup axios with JWT token
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

// Fetch authenticated data
const getStrategyPerformance = async (strategyId: string) => {
  try {
    const response = await api.get(`/strategies/${strategyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching strategy:', error);
    throw error;
  }
};
```

## Error Handling

```typescript
import axios, { AxiosError } from 'axios';

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    // Server responded with error
    console.error('Server error:', error.response.status);
    console.error('Error data:', error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error('Network error:', error.request);
  } else {
    // Error in request configuration
    console.error('Request error:', error.message);
  }
};

// Usage
try {
  const data = await getStrategyPerformance('strategy-1');
} catch (error) {
  handleApiError(error as AxiosError);
}
```

## Data Formats

### Expected Equity Data Format

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "value": 10500.50
}
```

### Expected Trade Data Format

```json
{
  "id": "trade-123",
  "symbol": "AAPL",
  "type": "BUY",
  "entryPrice": 150.00,
  "exitPrice": 155.00,
  "profit": 5.00,
  "date": "2024-01-15T10:30:00Z"
}
```

### Expected Strategy Performance Format

```json
{
  "name": "Strategy Alpha",
  "sharpe": 1.85,
  "drawdown": -0.15,
  "winRate": 0.62,
  "profitFactor": 2.1,
  "return": 0.25
}
```

## Testing Your Backend

Use the provided test script to verify your backend:

```bash
# Test REST API endpoints
curl http://localhost:8000/api/strategies/strategy-1

# Test WebSocket connection
wscat -c ws://localhost:8001/ws
```
