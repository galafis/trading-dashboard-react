# API Documentation

## Table of Contents

1. [REST API Endpoints](#rest-api-endpoints)
2. [WebSocket Connection](#websocket-connection)
3. [Data Models](#data-models)
4. [Error Handling](#error-handling)
5. [Authentication](#authentication)

## REST API Endpoints

### Base URL
```
http://localhost:8000/api
```

### Strategy Endpoints

#### Get All Strategies
```http
GET /api/strategies
```

**Response:**
```json
[
  {
    "name": "Strategy Alpha",
    "sharpe": 1.85,
    "drawdown": -0.15,
    "winRate": 0.62,
    "profitFactor": 2.1,
    "return": 0.25
  }
]
```

#### Get Strategy by ID
```http
GET /api/strategies/:id
```

**Parameters:**
- `id` (string): Strategy identifier

**Response:**
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

#### Get Strategy Metrics
```http
GET /api/metrics/:strategyId
```

**Parameters:**
- `strategyId` (string): Strategy identifier

**Response:**
```json
{
  "name": "Strategy Alpha",
  "sharpe": 1.85,
  "drawdown": -0.15,
  "winRate": 0.62,
  "profitFactor": 2.1,
  "return": 0.25,
  "totalTrades": 50,
  "winningTrades": 31,
  "losingTrades": 19,
  "totalProfit": 1500.50,
  "averageWin": 75.25,
  "averageLoss": -42.30,
  "largestWin": 250.00,
  "largestLoss": -120.00
}
```

### Trade Endpoints

#### Get Trade History
```http
GET /api/trades/:strategyId?page=1&per_page=20
```

**Parameters:**
- `strategyId` (string): Strategy identifier
- `page` (number, optional): Page number (default: 1)
- `per_page` (number, optional): Items per page (default: 20)

**Response:**
```json
{
  "trades": [
    {
      "id": "trade-123",
      "symbol": "AAPL",
      "type": "BUY",
      "entryPrice": 150.00,
      "exitPrice": 155.00,
      "profit": 5.00,
      "date": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "per_page": 20
}
```

### Equity Endpoints

#### Get Equity Curve
```http
GET /api/equity/:strategyId?points=100
```

**Parameters:**
- `strategyId` (string): Strategy identifier
- `points` (number, optional): Number of data points (default: 100)

**Response:**
```json
[
  {
    "timestamp": "2024-01-01T00:00:00Z",
    "value": 10000.00
  },
  {
    "timestamp": "2024-01-02T00:00:00Z",
    "value": 10050.25
  }
]
```

## WebSocket Connection

### Connection URL
```
ws://localhost:8000/socket.io
```

### Events

#### Connect
```javascript
socket.on('connected', (data) => {
  console.log(data.message);
});
```

#### Subscribe to Strategy Updates
```javascript
socket.emit('subscribe', { strategyId: 'strategy-alpha' });
```

#### Receive Equity Updates
```javascript
socket.on('equity_update', (data) => {
  console.log('New equity point:', data);
  // data: { timestamp: "...", value: 10500.50 }
});
```

#### Disconnect
```javascript
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
```

### React Integration Example

```typescript
import { useWebSocket } from './hooks/useWebSocket';

function Dashboard() {
  const { data, isConnected } = useWebSocket('ws://localhost:8000/ws');
  
  useEffect(() => {
    if (data) {
      // Handle real-time updates
      updateEquityCurve(data);
    }
  }, [data]);
  
  return (
    <div>
      <StatusIndicator connected={isConnected} />
      <EquityCurve data={equityData} />
    </div>
  );
}
```

## Data Models

### Strategy Performance
```typescript
interface StrategyPerformance {
  name: string;
  sharpe: number;
  drawdown: number;
  winRate: number;
  profitFactor: number;
  return: number;
}
```

### Trade
```typescript
interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  entryPrice: number;
  exitPrice: number;
  profit: number;
  date: Date;
}
```

### Equity Point
```typescript
interface EquityPoint {
  timestamp: Date;
  value: number;
}
```

## Error Handling

### Error Response Format
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `NOT_FOUND` | 404 | Resource not found |
| `INVALID_REQUEST` | 400 | Invalid request parameters |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `INTERNAL_ERROR` | 500 | Server error |

### Error Handling Example

```typescript
import axios, { AxiosError } from 'axios';

try {
  const response = await axios.get('/api/strategies/invalid-id');
} catch (error) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // Server responded with error
      console.error('Status:', axiosError.response.status);
      console.error('Data:', axiosError.response.data);
    } else if (axiosError.request) {
      // Request made but no response
      console.error('Network error');
    }
  }
}
```

## Authentication

### JWT Token Authentication

#### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

#### Using Token in Requests

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Make authenticated request
const response = await api.get('/strategies/strategy-alpha');
```

#### Refresh Token
```http
POST /api/auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response:**
```json
{
  "token": "new_access_token",
  "expiresIn": 3600
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Rate Limit:** 100 requests per minute per IP
- **Headers:**
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time when the rate limit resets

**Example Response (429 Too Many Requests):**
```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 60
}
```

## CORS Configuration

The API supports CORS for the following origins:

- `http://localhost:3000`
- `http://localhost:5173`
- `http://localhost:5174`

For production, configure allowed origins in your backend:

```python
# Flask example
CORS(app, origins=['https://yourdomain.com'])
```

## Pagination

All list endpoints support pagination:

**Query Parameters:**
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 20, max: 100)

**Response Headers:**
- `X-Total-Count`: Total number of items
- `X-Page`: Current page
- `X-Per-Page`: Items per page
- `X-Total-Pages`: Total pages

## Filtering and Sorting

### Trade History Filtering
```http
GET /api/trades/:strategyId?symbol=AAPL&type=BUY&minProfit=5
```

**Query Parameters:**
- `symbol`: Filter by symbol
- `type`: Filter by trade type (BUY/SELL)
- `minProfit`: Minimum profit threshold
- `maxProfit`: Maximum profit threshold
- `startDate`: Start date (ISO 8601)
- `endDate`: End date (ISO 8601)

### Sorting
```http
GET /api/trades/:strategyId?sortBy=profit&order=desc
```

**Query Parameters:**
- `sortBy`: Field to sort by (profit, date, symbol)
- `order`: Sort order (asc/desc)

## Caching

Responses include caching headers:

```http
Cache-Control: public, max-age=300
ETag: "33a64df551425fcc55e4d42a148795d9"
```

Use ETags for conditional requests:

```http
GET /api/strategies/strategy-alpha
If-None-Match: "33a64df551425fcc55e4d42a148795d9"
```

**304 Not Modified Response** if content hasn't changed.

## Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0"
}
```

## Testing the API

### Using cURL

```bash
# Get all strategies
curl http://localhost:8000/api/strategies

# Get specific strategy
curl http://localhost:8000/api/strategies/strategy-alpha

# Get trades with pagination
curl "http://localhost:8000/api/trades/strategy-alpha?page=1&per_page=10"
```

### Using Postman

Import the provided Postman collection:
```
examples/Trading-Dashboard-API.postman_collection.json
```

### Using HTTPie

```bash
# Install HTTPie
pip install httpie

# Make requests
http GET localhost:8000/api/strategies
http GET localhost:8000/api/trades/strategy-alpha page==1 per_page==10
```
