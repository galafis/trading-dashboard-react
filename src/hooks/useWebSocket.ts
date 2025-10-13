import { useEffect, useState, useRef } from 'react';

export const useWebSocket = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('WebSocket connected');
      }
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    ws.current.onclose = () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('WebSocket disconnected');
      }
      setIsConnected(false);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  return { data, isConnected };
};

