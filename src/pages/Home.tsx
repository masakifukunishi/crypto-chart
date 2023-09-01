import { useSelector } from "react-redux";

import Header from "../components/header/Index";
import CandlestickChart from "../components/charts/CandlestickChart";
import VolumeBarChart from "../components/charts/VolumeBarChart";
import { selectChartPeriod, selectCurrencyPair } from "../store/slicers/chart";
import useFetchOhlcvData from "../hook/useFetchOhlcvData";
import useFetchConstants from "../hook/useFetchConstants";

const Home: React.FC = () => {
  const chartPeriod = useSelector(selectChartPeriod);
  const currencyPair = useSelector(selectCurrencyPair);

  const ohlcv = useFetchOhlcvData(chartPeriod, currencyPair);
  useFetchConstants("chart");

  return (
    <div className="bg-gray-900 text-gray-50">
      <Header />
      <CandlestickChart data={ohlcv.ohlc} />
      <VolumeBarChart data={ohlcv.volume} />
    </div>
  );
};

export default Home;
