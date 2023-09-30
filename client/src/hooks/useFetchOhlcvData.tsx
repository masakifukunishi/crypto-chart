import { useState, useEffect } from "react";
import ohlcvApi from "../api/ohlcv";

interface OhlcvData {
  ohlc: { x: number; y: number[] }[];
  volume: { x: number; y: number }[];
}

const useFetchOhlcvData = (period: string, currencyPair: string): OhlcvData => {
  const [ohlcv, setOhlcv] = useState({ ohlc: [], volume: [] });

  useEffect(() => {
    const fetchOhlcvData = async () => {
      try {
        const _ohlcv = await ohlcvApi.get(period, currencyPair);
        setOhlcv(_ohlcv);
      } catch (error) {
        console.error("Error fetching ohlcv data:", error);
      }
    };
    fetchOhlcvData();
  }, [period, currencyPair]);

  return ohlcv;
};

export default useFetchOhlcvData;
