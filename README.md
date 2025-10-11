# 📊 Trading Strategy Dashboard

[![Build Status](https://github.com/galafis/trading-dashboard-react/actions/workflows/react-ci.yml/badge.svg)](https://github.com/galafis/trading-dashboard-react/actions/workflows/react-ci.yml)
[![Codecov](https://codecov.io/gh/galafis/trading-dashboard-react/branch/main/graph/badge.svg?token=bf6f1013-4900-4128-bfbc-e996615dd8ed)](https://codecov.io/gh/galafis/trading-dashboard-react)


[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8.svg)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.12-brightgreen.svg)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[English](#english) | [Português](#português)

---

## English

### Screenshots

![Trading Dashboard - Dark Mode](https://github.com/user-attachments/assets/1a72a1aa-0dab-479a-9375-4edf6f3ded22)

*Main dashboard overview showing equity curve, performance metrics, and trade history in dark mode*

![Trading Dashboard - Light Mode](https://github.com/user-attachments/assets/117c3979-b7f1-44b0-be4f-f320df21ab69)

*Dashboard with light mode theme showcasing the theme toggle functionality*

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
- **Hooks**: Custom hooks for WebSocket integration and theme management

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

### Running Tests

To run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

All components have comprehensive unit tests to ensure reliability and maintainability.

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
Cards displaying key performance indicators such as Sharpe Ratio, Max Drawdown, Win Rate, and Profit Factor.

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
Sortable and filterable table of all trades with detailed information.

```tsx
import { TradeTable } from './components/TradeTable';

<TradeTable 
  trades={tradeHistory}
  onSort={handleSort}
  onFilter={handleFilter}
/>
```

#### StrategyComparison
Side-by-side comparison of multiple strategies based on selected performance metrics.

```tsx
import { StrategyComparison } from './components/StrategyComparison';

<StrategyComparison 
  strategies={[strategy1, strategy2, strategy3]}
  metrics={['sharpe', 'drawdown', 'return']}
/>
```

### Hooks

#### useWebSocket
Custom hook for managing WebSocket connections and real-time data updates.

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

#### useTheme
Custom hook for managing theme switching (light/dark mode).

```typescript
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <button onClick={toggleTheme}>
        Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
      {/* ... rest of your app */}
    </div>
  );
}
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

### Screenshots

![Trading Dashboard - Modo Escuro](https://github.com/user-attachments/assets/1a72a1aa-0dab-479a-9375-4edf6f3ded22)

*Visão geral do dashboard mostrando a curva de equity, métricas de desempenho e histórico de trades no modo escuro*

![Trading Dashboard - Modo Claro](https://github.com/user-attachments/assets/117c3979-b7f1-44b0-be4f-f320df21ab69)

*Dashboard com tema claro demonstrando a funcionalidade de alternância de tema*

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

### Stack Tecnológica

- **Frontend**: React 18 com TypeScript
- **Gráficos**: Recharts para visualização de dados
- **Estilização**: TailwindCSS para design responsivo
- **Ferramenta de Build**: Vite para desenvolvimento rápido e HMR
- **Gerenciamento de Estado**: React Context API
- **Cliente HTTP**: Axios para chamadas de API
- **Hooks**: Hooks customizados para integração WebSocket e gerenciamento de tema

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

# Visualizar build de produção
npm run preview
```

### Executando Testes

Para executar a suite de testes:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm test -- --watch

# Executar testes com cobertura
npm test -- --coverage
```

Todos os componentes possuem testes unitários abrangentes para garantir confiabilidade e manutenibilidade.

### Estrutura do Projeto

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

### Componentes

#### EquityCurve
Gráfico de linha interativo exibindo o valor do portfólio ao longo do tempo.

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
Cards exibindo indicadores-chave de performance como Índice de Sharpe, Drawdown Máximo, Taxa de Acerto e Fator de Lucro.

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
Tabela ordenável e filtrável de todos os trades com informações detalhadas.

```tsx
import { TradeTable } from './components/TradeTable';

<TradeTable 
  trades={tradeHistory}
  onSort={handleSort}
  onFilter={handleFilter}
/>
```

#### StrategyComparison
Comparação lado a lado de múltiplas estratégias baseada em métricas de performance selecionadas.

```tsx
import { StrategyComparison } from './components/StrategyComparison';

<StrategyComparison 
  strategies={[strategy1, strategy2, strategy3]}
  metrics={['sharpe', 'drawdown', 'return']}
/>
```

### Hooks

#### useWebSocket
Hook customizado para gerenciar conexões WebSocket e atualizações de dados em tempo real.

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

#### useTheme
Hook customizado para gerenciar alternância de tema (modo claro/escuro).

```typescript
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <button onClick={toggleTheme}>
        Alternar Modo {theme === 'dark' ? 'Claro' : 'Escuro'}
      </button>
      {/* ... resto da aplicação */}
    </div>
  );
}
```

### Integração com API

Conecte-se à sua API de análise quantitativa:

```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Buscar performance da estratégia
const getStrategyPerformance = async (strategyId: string) => {
  const response = await axios.get(`${API_BASE_URL}/strategies/${strategyId}`);
  return response.data;
};

// Buscar histórico de trades
const getTradeHistory = async (strategyId: string) => {
  const response = await axios.get(`${API_BASE_URL}/trades/${strategyId}`);
  return response.data;
};
```

### Personalização

#### Configuração de Tema

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

#### Estilização de Gráficos

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

### Otimização de Performance

- **Code Splitting**: Carregamento lazy de componentes
- **Memoização**: React.memo para componentes custosos
- **Scroll Virtual**: Para tabelas grandes de trades
- **Debouncing**: Para operações de busca e filtro

### Casos de Uso

- **Trading Algorítmico**: Monitorar performance de estratégia ao vivo
- **Backtesting**: Visualizar resultados históricos de estratégia
- **Gestão de Portfólio**: Rastrear múltiplas estratégias
- **Análise de Risco**: Analisar drawdowns e métricas de risco
- **Pesquisa**: Comparar variações de estratégia

### Deploy

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

### Suporte de Navegadores

- Chrome/Edge (mais recente)
- Firefox (mais recente)
- Safari (mais recente)
- Navegadores móveis (iOS Safari, Chrome Mobile)

### Licença

MIT License

### Autor

**Gabriel Demetrios Lafis**

