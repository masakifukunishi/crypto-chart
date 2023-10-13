import { useState, useEffect } from "react";

const useWebSocket = (period, currencyPair) => {
  const [ohlcv, setOhlcv] = useState({ ohlc: [], volume: [] });

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081");

    socket.onopen = () => {
      socket.send(JSON.stringify({ period, currencyPair }));
    };

    socket.onmessage = (event: any) => {
      setOhlcv(JSON.parse(event.data));
    };

    return () => {
      socket.close();
    };
  }, [period, currencyPair]);

  return ohlcv;
};

export default useWebSocket;
