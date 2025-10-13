import { renderHook, waitFor } from '@testing-library/react';
import { useWebSocket } from './useWebSocket';

// Mock WebSocket
class MockWebSocket {
  url: string;
  onopen: (() => void) | null = null;
  onmessage: ((event: any) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: ((error: any) => void) | null = null;
  readyState: number = 0;

  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  constructor(url: string) {
    this.url = url;
    // Simulate async connection
    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN;
      this.onopen?.();
    }, 0);
  }

  close() {
    this.readyState = MockWebSocket.CLOSED;
    this.onclose?.();
  }

  send(_data: string) {
    // Mock send
  }
}

global.WebSocket = MockWebSocket as any;

describe('useWebSocket', () => {
  const testUrl = 'ws://localhost:8000/test';

  it('should initialize with null data and disconnected state', () => {
    const { result } = renderHook(() => useWebSocket(testUrl));
    expect(result.current.data).toBeNull();
    expect(result.current.isConnected).toBe(false);
  });

  it('should connect to WebSocket and set isConnected to true', async () => {
    const { result } = renderHook(() => useWebSocket(testUrl));

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true);
    });
  });

  it('should receive and parse JSON data', async () => {
    const { result } = renderHook(() => useWebSocket(testUrl));

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true);
    });

    const testData = { message: 'test', value: 123 };
    const mockEvent = {
      data: JSON.stringify(testData)
    };

    // Simulate receiving a message
    act(() => {
      const ws = (global.WebSocket as any).lastInstance;
      if (ws && ws.onmessage) {
        ws.onmessage(mockEvent);
      }
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(testData);
    });
  });

  it('should handle WebSocket close', async () => {
    const { result, unmount } = renderHook(() => useWebSocket(testUrl));

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true);
    });

    unmount();

    // WebSocket should be closed on unmount
  });

  it('should handle errors', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    const { result } = renderHook(() => useWebSocket(testUrl));

    await waitFor(() => {
      expect(result.current.isConnected).toBe(true);
    });

    // Simulate error
    const mockError = new Error('Connection failed');
    act(() => {
      const ws = (global.WebSocket as any).lastInstance;
      if (ws && ws.onerror) {
        ws.onerror(mockError);
      }
    });

    expect(consoleSpy).toHaveBeenCalledWith('WebSocket error:', mockError);
    
    consoleSpy.mockRestore();
  });
});

// Helper to track WebSocket instances
const OriginalMockWebSocket = MockWebSocket;
global.WebSocket = class extends OriginalMockWebSocket {
  constructor(url: string) {
    super(url);
    (global.WebSocket as any).lastInstance = this;
  }
} as any;

function act(callback: () => void) {
  callback();
}
