import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ohlcvApi from "../api/ohlcv";
import Header from "../components/header/Index";
import CandlestickChart from "../components/charts/CandlestickChart";
import VolumeBarChart from "../components/charts/VolumeBarChart";
import { selectChartPeriod, selectCurrencyPair } from "../store/slicers/chart";

const Home: React.FC = () => {
  const chartPeriod = useSelector(selectChartPeriod);
  const currencyPair = useSelector(selectCurrencyPair);

  const [ohlcv, setOhlcv] = useState({ ohlc: [], volume: [] });

  useEffect(() => {
    const fetchOhlcvData = async () => {
      try {
        const _ohlcv = await ohlcvApi.get(chartPeriod);
        setOhlcv(_ohlcv);
      } catch (error) {
        console.error("Error fetching candle data:", error);
      }
    };
    console.log("Fetching candle data...");
    fetchOhlcvData();
  }, [currencyPair, chartPeriod]);

  return (
    <div className="bg-gray-900 text-gray-50">
      <Header />
      <CandlestickChart data={ohlcv.ohlc} />
      <VolumeBarChart data={ohlcv.volume} />
    </div>
  );
};

export default Home;
