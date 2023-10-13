import { useState, useEffect } from "react";

const useWebSocketsOhlcv = (period: string, currencyPair: string) => {
  const [ohlcv, setOhlcv] = useState({ ohlc: [], volume: [] });

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081");

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
