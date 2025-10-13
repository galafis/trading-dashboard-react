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

![Trading Dashboard Main View](https://github.com/user-attachments/assets/a1d315ff-95ff-4595-895c-14f83b70f973)

*Overview of the dashboard showing equity curve, performance metrics, and trade history*

### Overview

Modern, responsive dashboard for visualizing trading strategy performance built with React 18, TypeScript, and Recharts. Designed for quantitative traders and portfolio managers to monitor strategy performance, analyze trades, and compare multiple strategies side-by-side.

**🚀 Quick Start:**
```bash
git clone https://github.com/galafis/trading-dashboard-react.git
cd trading-dashboard-react && npm install && npm run dev
```

**⚡ Features at a Glance:**
- 📈 Real-time equity curves and performance tracking
- 🎯 Advanced metrics calculation (Sharpe, Drawdown, Win Rate, Profit Factor)
- 🔄 WebSocket support for live data streaming
- 🌓 Dark/Light mode with persistent theme
- 📱 Fully responsive mobile-first design
- ✅ 100% test coverage with comprehensive test suite
- 🚀 Production-ready with optimized builds

### Key Features

- **Real-time Charts**: Interactive equity curves with zoom and pan capabilities
- **Performance Metrics**: Comprehensive KPIs including Sharpe ratio, max drawdown, win rate, and profit factor
- **Strategy Comparison**: Side-by-side multi-strategy analysis with visual comparisons
- **Trade History**: Sortable, filterable trade log with detailed entry/exit information
- **Responsive Design**: Mobile-first approach with TailwindCSS for all screen sizes
- **Dark Mode**: Built-in theme switching for comfortable viewing in any lighting
- **Data Export**: Export charts and data to CSV/PNG formats
- **WebSocket Support**: Real-time data updates via WebSocket connections
- **Type-Safe**: Full TypeScript support with strict type checking
- **100% Test Coverage**: Comprehensive test suite with Jest and Testing Library
- **Production Ready**: Optimized build with code splitting and lazy loading

### How It Works

```
┌─────────────┐        ┌──────────────┐        ┌─────────────┐
│   Backend   │◄──────►│  Dashboard   │◄──────►│    User     │
│   Server    │  HTTP  │   (React)    │  View  │  Interface  │
└─────────────┘  WS    └──────────────┘        └─────────────┘
      │                        │
      │                        │
      ▼                        ▼
┌─────────────┐        ┌──────────────┐
│  Database   │        │   Charts &   │
│   Storage   │        │   Metrics    │
└─────────────┘        └──────────────┘
```

The dashboard receives trading data via REST API or WebSocket, processes it through TypeScript-based utilities, and displays it using interactive Recharts components. All state is managed with React hooks for optimal performance.

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

### Documentation

📚 **Additional Resources:**
- [Architecture Overview](./docs/ARCHITECTURE.md) - System design and component structure
- [API Documentation](./docs/API.md) - REST endpoints and WebSocket integration
- [Deployment Guide](./docs/DEPLOYMENT.md) - Deploy to Vercel, Netlify, Docker, AWS
- [Troubleshooting](./docs/TROUBLESHOOTING.md) - Common issues and solutions
- [FAQ](./docs/FAQ.md) - Frequently asked questions
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute to the project

### Frequently Asked Questions

**Q: Can I use this with my existing backend?**  
A: Yes! The dashboard is backend-agnostic and works with any REST API or WebSocket server. See examples in the `examples/` directory.

**Q: How do I customize the theme?**  
A: Edit `tailwind.config.js` to change colors, or use the built-in dark/light mode toggle.

**Q: Is there a live demo?**  
A: Deploy your own instance to Vercel/Netlify in minutes with one click, or run locally with `npm run dev`.

**Q: How do I add more metrics?**  
A: Add custom metrics to the `StrategyPerformance` interface in `src/types/trading.ts` and update the `PerformanceMetrics` component.

For more questions, see the [complete FAQ](./docs/FAQ.md).

### Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for:
- Development setup
- Coding standards  
- Testing requirements
- Pull request process

Quick contribution checklist:
- ✅ Fork the repository
- ✅ Create a feature branch
- ✅ Write tests for new features
- ✅ Ensure all tests pass (`npm test`)
- ✅ Submit a pull request

### Roadmap

**Planned Features:**
- [ ] Real-time notifications system
- [ ] Export to PDF reports
- [ ] Advanced filtering and search
- [ ] Multi-language support (i18n)
- [ ] Portfolio optimization tools
- [ ] Advanced technical indicators
- [ ] Mobile app version (React Native)
- [ ] Backtesting integration

See [open issues](https://github.com/galafis/trading-dashboard-react/issues) for more details.

### Performance & Best Practices

- ⚡ **Code Splitting**: Vendor libraries are split into separate chunks
- 🎯 **Lazy Loading**: Components load on-demand for faster initial load
- 📦 **Bundle Size**: Optimized to ~150KB gzipped
- 🧪 **Testing**: 100% code coverage with 40+ tests
- 🔒 **Type Safety**: Strict TypeScript for fewer runtime errors
- 📱 **Responsive**: Mobile-first design with TailwindCSS
- ♿ **Accessibility**: WCAG 2.1 compliant components

### License

MIT License - see the [LICENSE](./LICENSE) file for details.

### Author

**Gabriel Demetrios Lafis**

### Acknowledgments

- Built with [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Recharts](https://recharts.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Powered by [Vite](https://vitejs.dev/)

### Support

- 🐛 [Report Issues](https://github.com/galafis/trading-dashboard-react/issues)
- 💬 [GitHub Discussions](https://github.com/galafis/trading-dashboard-react/discussions)
- 📧 Contact the author via GitHub

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**

---

## Português

### Screenshots

![Visão Principal do Dashboard de Trading](https://github.com/user-attachments/assets/a1d315ff-95ff-4595-895c-14f83b70f973)

*Visão geral do dashboard mostrando a curva de equity, métricas de desempenho e histórico de trades*

### Visão Geral

Dashboard moderno e responsivo para visualização de performance de estratégias de trading construído com React 18, TypeScript e Recharts. Projetado para traders quantitativos e gestores de portfólio monitorarem performance de estratégias, analisarem trades e compararem múltiplas estratégias lado a lado.

**🚀 Início Rápido:**
```bash
git clone https://github.com/galafis/trading-dashboard-react.git
cd trading-dashboard-react && npm install && npm run dev
```

**⚡ Recursos em Destaque:**
- 📈 Curvas de equity e rastreamento de performance em tempo real
- 🎯 Cálculo de métricas avançadas (Sharpe, Drawdown, Taxa de Acerto, Fator de Lucro)
- 🔄 Suporte WebSocket para streaming de dados ao vivo
- 🌓 Modo Dark/Light com tema persistente
- 📱 Design totalmente responsivo mobile-first
- ✅ 100% de cobertura de testes com suíte abrangente
- 🚀 Pronto para produção com builds otimizados

### Características Principais

- **Gráficos em Tempo Real**: Curvas de equity interativas com capacidades de zoom e pan
- **Métricas de Performance**: KPIs abrangentes incluindo Índice de Sharpe, drawdown máximo, taxa de acerto e fator de lucro
- **Comparação de Estratégias**: Análise multi-estratégia lado a lado com comparações visuais
- **Histórico de Trades**: Log de trades ordenável e filtrável com informações detalhadas de entrada/saída
- **Design Responsivo**: Abordagem mobile-first com TailwindCSS para todos os tamanhos de tela
- **Dark Mode**: Alternância de tema integrada para visualização confortável em qualquer iluminação
- **Exportação de Dados**: Exportar gráficos e dados para formatos CSV/PNG
- **Suporte WebSocket**: Atualizações de dados em tempo real via conexões WebSocket
- **Type-Safe**: Suporte completo a TypeScript com verificação de tipos rigorosa
- **100% de Cobertura de Testes**: Suíte de testes abrangente com Jest e Testing Library
- **Pronto para Produção**: Build otimizado com code splitting e lazy loading

### Como Funciona

```
┌─────────────┐        ┌──────────────┐        ┌─────────────┐
│  Servidor   │◄──────►│  Dashboard   │◄──────►│  Interface  │
│   Backend   │  HTTP  │   (React)    │  View  │   Usuário   │
└─────────────┘  WS    └──────────────┘        └─────────────┘
      │                        │
      │                        │
      ▼                        ▼
┌─────────────┐        ┌──────────────┐
│  Banco de   │        │  Gráficos &  │
│    Dados    │        │   Métricas   │
└─────────────┘        └──────────────┘
```

O dashboard recebe dados de trading via REST API ou WebSocket, processa através de utilitários baseados em TypeScript, e exibe usando componentes interativos Recharts. Todo o estado é gerenciado com React hooks para performance ótima.

### Stack Tecnológico

- **Frontend**: React 18 com TypeScript
- **Gráficos**: Recharts para visualização de dados
- **Estilização**: TailwindCSS para design responsivo
- **Build Tool**: Vite para desenvolvimento rápido e HMR
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

# Pré-visualizar build de produção
npm run preview
```

### Executando Testes

Para executar a suíte de testes:

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
Cards exibindo indicadores chave de performance como Índice de Sharpe, Drawdown Máximo, Taxa de Acerto e Fator de Lucro.

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

Conecte à sua API de análise quantitativa:

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
- **Virtual Scrolling**: Para tabelas de trades grandes
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

- Chrome/Edge (última versão)
- Firefox (última versão)
- Safari (última versão)
- Navegadores móveis (iOS Safari, Chrome Mobile)

### Documentação

📚 **Recursos Adicionais:**
- [Visão Geral da Arquitetura](./docs/ARCHITECTURE.md) - Design do sistema e estrutura de componentes
- [Documentação da API](./docs/API.md) - Endpoints REST e integração WebSocket
- [Guia de Deploy](./docs/DEPLOYMENT.md) - Deploy para Vercel, Netlify, Docker, AWS
- [Solução de Problemas](./docs/TROUBLESHOOTING.md) - Problemas comuns e soluções
- [FAQ](./docs/FAQ.md) - Perguntas frequentes
- [Guia de Contribuição](./CONTRIBUTING.md) - Como contribuir para o projeto

### Perguntas Frequentes

**P: Posso usar isso com meu backend existente?**  
R: Sim! O dashboard é agnóstico de backend e funciona com qualquer API REST ou servidor WebSocket. Veja exemplos no diretório `examples/`.

**P: Como customizo o tema?**  
R: Edite `tailwind.config.js` para mudar as cores, ou use o alternador de modo dark/light integrado.

**P: Existe uma demo ao vivo?**  
R: Faça deploy da sua própria instância para Vercel/Netlify em minutos com um clique, ou execute localmente com `npm run dev`.

**P: Como adiciono mais métricas?**  
R: Adicione métricas customizadas à interface `StrategyPerformance` em `src/types/trading.ts` e atualize o componente `PerformanceMetrics`.

Para mais perguntas, veja o [FAQ completo](./docs/FAQ.md).

### Contribuindo

Aceitamos contribuições! Por favor veja nosso [Guia de Contribuição](./CONTRIBUTING.md) para:
- Configuração de desenvolvimento
- Padrões de código
- Requisitos de testes
- Processo de pull request

Checklist rápido de contribuição:
- ✅ Faça fork do repositório
- ✅ Crie um branch de feature
- ✅ Escreva testes para novas funcionalidades
- ✅ Garanta que todos os testes passem (`npm test`)
- ✅ Envie um pull request

### Roadmap

**Funcionalidades Planejadas:**
- [ ] Sistema de notificações em tempo real
- [ ] Exportação para relatórios PDF
- [ ] Filtragem e busca avançada
- [ ] Suporte multi-idioma (i18n)
- [ ] Ferramentas de otimização de portfólio
- [ ] Indicadores técnicos avançados
- [ ] Versão mobile app (React Native)
- [ ] Integração com backtesting

Veja [issues abertas](https://github.com/galafis/trading-dashboard-react/issues) para mais detalhes.

### Performance e Melhores Práticas

- ⚡ **Code Splitting**: Bibliotecas vendor são divididas em chunks separados
- 🎯 **Lazy Loading**: Componentes carregam sob demanda para carregamento inicial mais rápido
- 📦 **Tamanho do Bundle**: Otimizado para ~150KB gzipped
- 🧪 **Testes**: 100% de cobertura de código com 40+ testes
- 🔒 **Type Safety**: TypeScript rigoroso para menos erros em runtime
- 📱 **Responsivo**: Design mobile-first com TailwindCSS
- ♿ **Acessibilidade**: Componentes compatíveis com WCAG 2.1

### Licença

Licença MIT - veja o arquivo [LICENSE](./LICENSE) para detalhes.

### Autor

**Gabriel Demetrios Lafis**

### Agradecimentos

- Construído com [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), e [Recharts](https://recharts.org/)
- Estilizado com [TailwindCSS](https://tailwindcss.com/)
- Powered by [Vite](https://vitejs.dev/)

### Suporte

- 🐛 [Reportar Issues](https://github.com/galafis/trading-dashboard-react/issues)
- 💬 [GitHub Discussions](https://github.com/galafis/trading-dashboard-react/discussions)
- 📧 Contate o autor via GitHub

---

**⭐ Se você achar este projeto útil, por favor considere dar uma estrela no GitHub!**


