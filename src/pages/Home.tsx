import { useState, useEffect } from "react";

import ohlcvApi from "../api/ohlcv";
import Header from "../components/header/Index";
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
    <div className="bg-gray-900 text-yellow-400">
      <Header />
      <CandlestickChart data={ohlcv.ohlc} />
      <VolumeBarChart data={ohlcv.volume} />
    </div>
  );
};

export default Home;
