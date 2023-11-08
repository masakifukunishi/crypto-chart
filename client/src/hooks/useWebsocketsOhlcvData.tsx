import { useState, useEffect } from "react";

const useWebSocketsOhlcv = (period: string, currencyPair: string) => {
  const [ohlcv, setOhlcv] = useState({ ohlc: [], volume: [] });
  const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL;

  useEffect(() => {
    const socket = new WebSocket(websocketUrl);

    socket.onopen = () => {
      socket.send(JSON.stringify({ period, currencyPair }));
    };

    socket.onmessage = (event: MessageEvent) => {
      setOhlcv(JSON.parse(event.data));
    };

    return () => {
      socket.close();
    };
  }, [period, currencyPair]);

  return ohlcv;
};

export default useWebSocketsOhlcv;
