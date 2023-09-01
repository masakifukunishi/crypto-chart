import { useEffect } from "react";

import ohlcvApi from "../api/ohlcv";

const useFetchOhlcvData = (chartPeriod, setOhlcv) => {
  useEffect(() => {
    const fetchOhlcvData = async () => {
      try {
        const _ohlcv = await ohlcvApi.get(chartPeriod);
        setOhlcv(_ohlcv);
      } catch (error) {
        console.error("Error fetching candle data:", error);
      }
    };
    fetchOhlcvData();
  }, [chartPeriod, ohlcvApi, setOhlcv]);
};

export default useFetchOhlcvData;
