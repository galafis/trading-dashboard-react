# 📊 Trading Strategy Dashboard

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8.svg)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.12-brightgreen.svg)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[English](#english) | [Português](#português)

---

## English

### Overview

Modern, responsive dashboard for visualizing trading strategy performance built with React 18, TypeScript, and Recharts. Designed for quantitative traders and portfolio managers to monitor strategy performance, analyze trades, and compare multiple strategies side-by-side.

### Key Features

- **Real-time Charts**: Interactive equity curves with zoom and pan
- **Performance Metrics**: Sharpe ratio, max drawdown, win rate, profit factor
- **Strategy Comparison**: Side-by-side multi-strategy analysis
- **Trade History**: Sortable, filterable trade log with detailed information
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Dark Mode**: Built-in theme switching for comfortable viewing
- **Data Export**: Export charts and data to CSV/PNG
- **WebSocket Support**: Real-time data updates

### Tech Stack

- **Frontend**: React 18 with TypeScript
- **Charts**: Recharts for data visualization
- **Styling**: TailwindCSS for responsive design
- **Build Tool**: Vite for fast development and HMR
- **State Management**: React Context API
- **HTTP Client**: Axios for API calls

### Installation

```bash
# Clone repository
git clone https://github.com/galafis/trading-dashboard-react.git
cd trading-dashboard-react

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
trading-dashboard-react/
├── src/
│   ├── components/
│   │   ├── EquityCurve.tsx
│   │   ├── PerformanceMetrics.tsx
│   │   ├── TradeTable.tsx
│   │   └── StrategyComparison.tsx
│   ├── hooks/
│   │   ├── useWebSocket.ts
│   │   └── useTheme.ts
│   ├── types/
│   │   └── trading.ts
│   ├── utils/
│   │   └── calculations.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

### Components

#### EquityCurve
Interactive line chart displaying portfolio value over time.

```tsx
import { EquityCurve } from './components/EquityCurve';

<EquityCurve 
  data={equityData}
  height={400}
  showGrid={true}
  enableZoom={true}
/>
```

#### PerformanceMetrics
Cards displaying key performance indicators.

```tsx
import { PerformanceMetrics } from './components/PerformanceMetrics';

<PerformanceMetrics 
  sharpeRatio={1.85}
  maxDrawdown={-0.15}
  winRate={0.62}
  profitFactor={2.1}
/>
```

#### TradeTable
Sortable and filterable table of all trades.

```tsx
import { TradeTable } from './components/TradeTable';

<TradeTable 
  trades={tradeHistory}
  onSort={handleSort}
  onFilter={handleFilter}
/>
```

#### StrategyComparison
Side-by-side comparison of multiple strategies.

```tsx
import { StrategyComparison } from './components/StrategyComparison';

<StrategyComparison 
  strategies={[strategy1, strategy2, strategy3]}
  metrics={['sharpe', 'drawdown', 'return']}
/>
```

### API Integration

Connect to your quantitative analysis API:

```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Fetch strategy performance
const getStrategyPerformance = async (strategyId: string) => {
  const response = await axios.get(`${API_BASE_URL}/strategies/${strategyId}`);
  return response.data;
};

// Fetch trade history
const getTradeHistory = async (strategyId: string) => {
  const response = await axios.get(`${API_BASE_URL}/trades/${strategyId}`);
  return response.data;
};
```

### WebSocket Real-time Updates

```typescript
import { useWebSocket } from './hooks/useWebSocket';

function Dashboard() {
  const { data, isConnected } = useWebSocket('ws://localhost:8000/ws');
  
  useEffect(() => {
    if (data) {
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

### Customization

#### Theme Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        success: '#10b981',
        danger: '#ef4444',
      }
    }
  }
}
```

#### Chart Styling

```tsx
<EquityCurve 
  data={data}
  colors={{
    line: '#3b82f6',
    grid: '#e5e7eb',
    tooltip: '#1f2937'
  }}
/>
```

### Performance Optimization

- **Code Splitting**: Lazy loading of components
- **Memoization**: React.memo for expensive components
- **Virtual Scrolling**: For large trade tables
- **Debouncing**: For search and filter operations

### Use Cases

- **Algorithmic Trading**: Monitor live strategy performance
- **Backtesting**: Visualize historical strategy results
- **Portfolio Management**: Track multiple strategies
- **Risk Analysis**: Analyze drawdowns and risk metrics
- **Research**: Compare strategy variations

### Deployment

#### Vercel
```bash
npm run build
vercel --prod
```

#### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### License

MIT License

### Author

**Gabriel Demetrios Lafis**

---

## Português

### Visão Geral

Dashboard moderno e responsivo para visualização de performance de estratégias de trading construído com React 18, TypeScript e Recharts. Projetado para traders quantitativos e gestores de portfólio monitorarem performance de estratégias, analisarem trades e compararem múltiplas estratégias lado a lado.

### Características Principais

- **Gráficos em Tempo Real**: Curvas de equity interativas com zoom e pan
- **Métricas de Performance**: Índice de Sharpe, drawdown máximo, taxa de acerto, fator de lucro
- **Comparação de Estratégias**: Análise multi-estratégia lado a lado
- **Histórico de Trades**: Log de trades ordenável e filtrável com informações detalhadas
- **Design Responsivo**: Abordagem mobile-first com TailwindCSS
- **Dark Mode**: Alternância de tema integrada para visualização confortável
- **Exportação de Dados**: Exportar gráficos e dados para CSV/PNG
- **Suporte WebSocket**: Atualizações de dados em tempo real

### Instalação

```bash
# Clonar repositório
git clone https://github.com/galafis/trading-dashboard-react.git
cd trading-dashboard-react

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Casos de Uso

- **Trading Algorítmico**: Monitorar performance de estratégia ao vivo
- **Backtesting**: Visualizar resultados históricos de estratégia
- **Gestão de Portfólio**: Rastrear múltiplas estratégias
- **Análise de Risco**: Analisar drawdowns e métricas de risco
- **Pesquisa**: Comparar variações de estratégia

### Autor

**Gabriel Demetrios Lafis**
