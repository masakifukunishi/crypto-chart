import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ohlcvApi from "../api/ohlcv";
import constantsApi from "../api/constants";
import Header from "../components/header/Index";
import CandlestickChart from "../components/charts/CandlestickChart";
import VolumeBarChart from "../components/charts/VolumeBarChart";
import { selectChartPeriod, selectCurrencyPair } from "../store/slicers/chart";
import { setChartConstant, initializeChartConstant } from "../store/slicers/constant";

const Home: React.FC = () => {
  const dispatch = useDispatch();
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
    fetchOhlcvData();
  }, [currencyPair, chartPeriod]);

  useEffect(() => {
    const fetchConstants = async () => {
      try {
        const _chartConstants = await constantsApi.geChart();
        dispatch(setChartConstant(_chartConstants));
      } catch (error) {
        console.error("Error fetching constants:", error);
      }
    };
    fetchConstants();
    return () => {
      dispatch(initializeChartConstant());
    };
  }, []);

  return (
    <div className="bg-gray-900 text-gray-50">
      <Header />
      <CandlestickChart data={ohlcv.ohlc} />
      <VolumeBarChart data={ohlcv.volume} />
    </div>
  );
};

export default Home;
