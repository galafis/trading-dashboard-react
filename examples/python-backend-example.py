"""
Python Backend Example for Trading Dashboard
==============================================

This example demonstrates a complete Flask backend implementation
for the Trading Dashboard React application.

Features:
- REST API endpoints for strategies and trades
- WebSocket support for real-time updates
- CORS enabled for development
- Sample data generation
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from datetime import datetime, timedelta
import random
import time

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Sample data
STRATEGIES = {
    'strategy-alpha': {
        'name': 'Strategy Alpha',
        'sharpe': 1.85,
        'drawdown': -0.15,
        'winRate': 0.62,
        'profitFactor': 2.1,
        'return': 0.25
    },
    'strategy-beta': {
        'name': 'Strategy Beta',
        'sharpe': 1.50,
        'drawdown': -0.10,
        'winRate': 0.58,
        'profitFactor': 1.8,
        'return': 0.20
    }
}

TRADES = []

# Generate sample trades
def generate_sample_trades(strategy_id, count=50):
    trades = []
    symbols = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA']
    base_date = datetime.now() - timedelta(days=30)
    
    for i in range(count):
        trade_type = random.choice(['BUY', 'SELL'])
        entry_price = random.uniform(100, 500)
        
        # Simulate profitable trades more often (60% win rate)
        if random.random() < 0.6:
            # Winning trade
            if trade_type == 'BUY':
                exit_price = entry_price * random.uniform(1.01, 1.05)
            else:
                exit_price = entry_price * random.uniform(0.95, 0.99)
        else:
            # Losing trade
            if trade_type == 'BUY':
                exit_price = entry_price * random.uniform(0.95, 0.99)
            else:
                exit_price = entry_price * random.uniform(1.01, 1.05)
        
        profit = exit_price - entry_price if trade_type == 'BUY' else entry_price - exit_price
        
        trades.append({
            'id': f'{strategy_id}-{i}',
            'symbol': random.choice(symbols),
            'type': trade_type,
            'entryPrice': round(entry_price, 2),
            'exitPrice': round(exit_price, 2),
            'profit': round(profit, 2),
            'date': (base_date + timedelta(hours=i * 12)).isoformat()
        })
    
    return trades

# Generate equity curve data
def generate_equity_curve(initial_capital=10000, points=100):
    equity_data = []
    current_value = initial_capital
    base_date = datetime.now() - timedelta(days=points)
    
    for i in range(points):
        # Simulate random walk with positive drift
        change = random.gauss(0.002, 0.01)  # 0.2% drift, 1% volatility
        current_value *= (1 + change)
        
        equity_data.append({
            'timestamp': (base_date + timedelta(days=i)).isoformat(),
            'value': round(current_value, 2)
        })
    
    return equity_data

# REST API Endpoints

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route('/api/strategies', methods=['GET'])
def get_strategies():
    """Get all available strategies"""
    return jsonify(list(STRATEGIES.values()))

@app.route('/api/strategies/<strategy_id>', methods=['GET'])
def get_strategy(strategy_id):
    """Get specific strategy performance"""
    if strategy_id not in STRATEGIES:
        return jsonify({'error': 'Strategy not found'}), 404
    return jsonify(STRATEGIES[strategy_id])

@app.route('/api/trades/<strategy_id>', methods=['GET'])
def get_trades(strategy_id):
    """Get trade history for a strategy"""
    # Get pagination parameters
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    # Generate trades if not cached
    trades = generate_sample_trades(strategy_id, 50)
    
    # Apply pagination
    start = (page - 1) * per_page
    end = start + per_page
    
    return jsonify({
        'trades': trades[start:end],
        'total': len(trades),
        'page': page,
        'per_page': per_page
    })

@app.route('/api/equity/<strategy_id>', methods=['GET'])
def get_equity_curve(strategy_id):
    """Get equity curve data for a strategy"""
    points = request.args.get('points', 100, type=int)
    equity_data = generate_equity_curve(points=points)
    return jsonify(equity_data)

@app.route('/api/metrics/<strategy_id>', methods=['GET'])
def get_metrics(strategy_id):
    """Get detailed performance metrics for a strategy"""
    if strategy_id not in STRATEGIES:
        return jsonify({'error': 'Strategy not found'}), 404
    
    strategy = STRATEGIES[strategy_id]
    trades = generate_sample_trades(strategy_id, 50)
    
    # Calculate additional metrics
    total_profit = sum(t['profit'] for t in trades)
    winning_trades = [t for t in trades if t['profit'] > 0]
    losing_trades = [t for t in trades if t['profit'] <= 0]
    
    metrics = {
        **strategy,
        'totalTrades': len(trades),
        'winningTrades': len(winning_trades),
        'losingTrades': len(losing_trades),
        'totalProfit': round(total_profit, 2),
        'averageWin': round(sum(t['profit'] for t in winning_trades) / len(winning_trades), 2) if winning_trades else 0,
        'averageLoss': round(sum(t['profit'] for t in losing_trades) / len(losing_trades), 2) if losing_trades else 0,
        'largestWin': round(max((t['profit'] for t in winning_trades), default=0), 2),
        'largestLoss': round(min((t['profit'] for t in losing_trades), default=0), 2)
    }
    
    return jsonify(metrics)

# WebSocket Events

@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    print('Client connected')
    emit('connected', {'message': 'Successfully connected to trading server'})

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection"""
    print('Client disconnected')

@socketio.on('subscribe')
def handle_subscribe(data):
    """Handle subscription to strategy updates"""
    strategy_id = data.get('strategyId')
    print(f'Client subscribed to {strategy_id}')
    
    # Start sending updates (in production, this would be event-driven)
    def send_updates():
        while True:
            equity_point = {
                'timestamp': datetime.now().isoformat(),
                'value': 10000 + random.uniform(-100, 500)
            }
            socketio.emit('equity_update', equity_point)
            time.sleep(5)
    
    # In production, use background tasks or event-driven architecture
    # socketio.start_background_task(send_updates)

# Error handlers

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print('Starting Trading Dashboard Backend...')
    print('REST API: http://localhost:8000')
    print('WebSocket: ws://localhost:8000/socket.io')
    socketio.run(app, host='0.0.0.0', port=8000, debug=True)
