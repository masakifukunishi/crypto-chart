import { useSelector } from "react-redux";

import Header from "../components/header/Index";
import Tab from "../components/charts/controls/tab/Index";
import SelectCurrency from "../components/charts/controls/select-currency/Index";
import CandlestickChart from "../components/charts/CandlestickChart";
import VolumeBarChart from "../components/charts/VolumeBarChart";
import { selectChartPeriod, selectCurrencyPair } from "../store/slicers/chart";
import useFetchOhlcvData from "../hooks/useFetchOhlcvData";
import useFetchConstants from "../hooks/useFetchConstants";
import useFetchConfigs from "../hooks/useFetchConfigs";

const Home: React.FC = () => {
  const period = useSelector(selectChartPeriod);
  const currencyPair = useSelector(selectCurrencyPair);

  const ohlcv = useFetchOhlcvData(period, currencyPair);
  useFetchConstants("chart");
  useFetchConfigs("cryptowatch");

  return (
    <div className="bg-gray-900 text-gray-50 min-h-screen p-1">
      <Header />
      <SelectCurrency />
      <Tab />

      {/* This color and font designation is for tooltips */}
      <div className="text-gray-900 text-xs">
        <CandlestickChart data={ohlcv.ohlc} />
        <VolumeBarChart data={ohlcv.volume} />
      </div>
    </div>
  );
};

export default Home;
