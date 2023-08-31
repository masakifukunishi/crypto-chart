import { useState, useEffect } from "react";

import ohlcvApi from "../api/ohlcv";
import CandlestickChart from "../components/charts/CandlestickChart";
import VolumeBarChart from "../components/charts/VolumeBarChart";

const Home = () => {
  const [ohlcv, setOhlcv] = useState({ ohlc: [], volume: [] });
  useEffect(() => {
    const fetchOhlcvData = async () => {
      try {
        const _ohlcv = await ohlcvApi.get();
        setOhlcv(_ohlcv);
      } catch (error) {
        console.error("Error fetching candle data:", error);
      }
    };
    fetchOhlcvData();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <CandlestickChart data={ohlcv.ohlc} />
      <VolumeBarChart data={ohlcv.volume} />
    </div>
  );
};

export default Home;
