# Troubleshooting Guide

This guide helps you resolve common issues when using the Trading Strategy Dashboard.

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Build Issues](#build-issues)
3. [Runtime Issues](#runtime-issues)
4. [WebSocket Issues](#websocket-issues)
5. [Performance Issues](#performance-issues)
6. [Browser Compatibility](#browser-compatibility)

## Installation Issues

### npm install fails

**Problem:** Dependencies fail to install

**Solutions:**

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Use correct Node.js version:**
   ```bash
   node --version  # Should be 18 or higher
   ```

3. **Check for conflicting global packages:**
   ```bash
   npm list -g --depth=0
   ```

### Permission denied errors

**Problem:** EACCES errors during installation

**Solutions:**

1. **Don't use sudo (recommended):**
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   export PATH=~/.npm-global/bin:$PATH
   ```

2. **Fix npm permissions:**
   ```bash
   sudo chown -R $USER:$GROUP ~/.npm
   sudo chown -R $USER:$GROUP ~/.config
   ```

## Build Issues

### TypeScript compilation errors

**Problem:** `tsc` fails with type errors

**Solutions:**

1. **Check TypeScript version:**
   ```bash
   npx tsc --version
   ```

2. **Clear TypeScript cache:**
   ```bash
   rm -rf node_modules/.cache
   ```

3. **Strict type checking:**
   - Review errors in console
   - Fix type mismatches
   - Add proper type annotations

### Vite build fails

**Problem:** Build fails with Vite errors

**Solutions:**

1. **Clear Vite cache:**
   ```bash
   rm -rf node_modules/.vite
   ```

2. **Check vite.config.ts:**
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     build: {
       outDir: 'dist',
       sourcemap: true,
     }
   })
   ```

3. **Increase Node.js memory:**
   ```bash
   NODE_OPTIONS=--max_old_space_size=4096 npm run build
   ```

### Module resolution errors

**Problem:** Cannot find module errors

**Solutions:**

1. **Check tsconfig.json paths:**
   ```json
   {
     "compilerOptions": {
       "moduleResolution": "bundler",
       "resolveJsonModule": true
     }
   }
   ```

2. **Verify imports use correct paths:**
   ```typescript
   // Correct
   import { Component } from './Component'
   
   // Incorrect
   import { Component } from 'Component'
   ```

## Runtime Issues

### White screen on load

**Problem:** Application shows blank white screen

**Solutions:**

1. **Check browser console for errors**

2. **Verify build output:**
   ```bash
   ls -la dist/
   ```

3. **Check index.html:**
   - Ensure script tag is present
   - Verify correct paths

4. **Clear browser cache:**
   - Hard reload: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

### Components not rendering

**Problem:** Specific components don't appear

**Solutions:**

1. **Check component props:**
   ```typescript
   // Ensure all required props are provided
   <EquityCurve data={equityData} height={400} />
   ```

2. **Verify data format:**
   ```typescript
   // Correct format
   const equityData: EquityPoint[] = [
     { timestamp: new Date(), value: 10000 }
   ]
   ```

3. **Check for React errors:**
   - Open React DevTools
   - Look for error boundaries

### State not updating

**Problem:** Component state doesn't update

**Solutions:**

1. **Check hooks dependencies:**
   ```typescript
   useEffect(() => {
     // Update logic
   }, [dependencies]) // Add all dependencies
   ```

2. **Verify state setters:**
   ```typescript
   // Correct
   setData([...data, newItem])
   
   // Incorrect (mutating state)
   data.push(newItem)
   setData(data)
   ```

## WebSocket Issues

### Cannot connect to WebSocket

**Problem:** WebSocket shows "Disconnected" status

**Solutions:**

1. **Verify WebSocket URL:**
   ```typescript
   // Check environment variable
   console.log(import.meta.env.VITE_WS_URL)
   ```

2. **Check backend is running:**
   ```bash
   curl http://localhost:8000/api/health
   ```

3. **Verify CORS settings:**
   ```python
   # Flask backend
   CORS(app, origins=['http://localhost:5173'])
   ```

4. **Check firewall rules:**
   - Allow WebSocket port (default: 8000)
   - Check corporate proxy settings

### WebSocket disconnects frequently

**Problem:** Connection drops repeatedly

**Solutions:**

1. **Implement reconnection logic:**
   ```typescript
   useEffect(() => {
     const reconnect = () => {
       if (!isConnected) {
         // Reconnect logic
       }
     }
     const interval = setInterval(reconnect, 5000)
     return () => clearInterval(interval)
   }, [isConnected])
   ```

2. **Add heartbeat/ping:**
   ```typescript
   // Send ping every 30 seconds
   setInterval(() => {
     if (ws.current?.readyState === WebSocket.OPEN) {
       ws.current.send(JSON.stringify({ type: 'ping' }))
     }
   }, 30000)
   ```

3. **Check backend timeout settings**

### Invalid WebSocket data

**Problem:** Cannot parse WebSocket messages

**Solutions:**

1. **Validate JSON format:**
   ```typescript
   ws.current.onmessage = (event) => {
     try {
       const data = JSON.parse(event.data)
       setData(data)
     } catch (error) {
       console.error('Invalid JSON:', event.data)
     }
   }
   ```

2. **Check data structure:**
   ```typescript
   // Expected format
   {
     "equity": { "timestamp": "...", "value": 10000 },
     "trades": [...]
   }
   ```

## Performance Issues

### Slow rendering

**Problem:** UI feels sluggish or unresponsive

**Solutions:**

1. **Use React.memo for expensive components:**
   ```typescript
   export const ExpensiveComponent = React.memo(({ data }) => {
     // Component logic
   })
   ```

2. **Optimize re-renders:**
   ```typescript
   const memoizedValue = useMemo(() => 
     expensiveCalculation(data), 
     [data]
   )
   ```

3. **Virtualize long lists:**
   ```typescript
   import { FixedSizeList } from 'react-window'
   
   <FixedSizeList
     height={600}
     itemCount={trades.length}
     itemSize={50}
   >
     {TradeRow}
   </FixedSizeList>
   ```

### High memory usage

**Problem:** Browser tab uses excessive memory

**Solutions:**

1. **Limit data points:**
   ```typescript
   // Keep only last 1000 points
   const limitedData = equityData.slice(-1000)
   ```

2. **Clean up subscriptions:**
   ```typescript
   useEffect(() => {
     const subscription = subscribeToData()
     return () => subscription.unsubscribe()
   }, [])
   ```

3. **Use Chrome DevTools Memory Profiler:**
   - Take heap snapshot
   - Identify memory leaks
   - Fix detached DOM nodes

### Large bundle size

**Problem:** JavaScript bundle is too large

**Solutions:**

1. **Analyze bundle:**
   ```bash
   npm run build
   npx vite-bundle-visualizer
   ```

2. **Code splitting:**
   ```typescript
   const ChartComponent = lazy(() => import('./ChartComponent'))
   ```

3. **Tree shaking:**
   - Import only what you need
   - Use named imports
   ```typescript
   // Good
   import { map } from 'lodash-es'
   
   // Bad
   import _ from 'lodash'
   ```

## Browser Compatibility

### Features not working in older browsers

**Problem:** Application doesn't work in Safari/Firefox

**Solutions:**

1. **Check browser console for errors**

2. **Add polyfills if needed:**
   ```bash
   npm install core-js
   ```

3. **Update browserslist:**
   ```json
   {
     "browserslist": [
       ">0.2%",
       "not dead",
       "not op_mini all"
     ]
   }
   ```

### CSS issues

**Problem:** Styles don't display correctly

**Solutions:**

1. **Check TailwindCSS build:**
   ```bash
   npx tailwindcss -i ./src/index.css -o ./dist/output.css
   ```

2. **Verify PostCSS configuration:**
   ```javascript
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     }
   }
   ```

3. **Clear CSS cache:**
   - Hard reload browser
   - Check for conflicting styles

## Testing Issues

### Tests fail

**Problem:** `npm test` shows failures

**Solutions:**

1. **Check Jest configuration:**
   ```javascript
   module.exports = {
     testEnvironment: 'jsdom',
     setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
   }
   ```

2. **Mock dependencies:**
   ```typescript
   jest.mock('./hooks/useWebSocket', () => ({
     useWebSocket: () => ({ data: null, isConnected: false })
   }))
   ```

3. **Update snapshots:**
   ```bash
   npm test -- -u
   ```

### Mock issues

**Problem:** Mocks not working correctly

**Solutions:**

1. **Use proper mock structure:**
   ```typescript
   // setupTests.ts
   global.WebSocket = jest.fn(() => ({
     onopen: jest.fn(),
     onclose: jest.fn(),
     send: jest.fn(),
   }))
   ```

2. **Clear mocks between tests:**
   ```typescript
   beforeEach(() => {
     jest.clearAllMocks()
   })
   ```

## Getting Help

If you can't resolve your issue:

1. **Check existing issues:** [GitHub Issues](https://github.com/galafis/trading-dashboard-react/issues)
2. **Search documentation:** Review README and docs/
3. **Create a bug report:** Include:
   - Node.js version
   - npm version
   - Operating system
   - Error messages
   - Steps to reproduce
   - Expected vs actual behavior

### Debug Information

Collect this info when reporting issues:

```bash
# System info
node --version
npm --version
git --version

# Package info
npm list --depth=0

# Build info
npm run build 2>&1 | tee build.log
```

### Enable Debug Mode

```bash
# Verbose logging
DEBUG=* npm run dev

# Vite debug
VITE_DEBUG=* npm run dev
```
