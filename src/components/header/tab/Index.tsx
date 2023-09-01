import { useSelector } from "react-redux";

import TabItem from "./TabItem";
import { selectChartConstant } from "../../../store/slicers/constant";

const Index = () => {
  const chartPeriod = useSelector(selectChartConstant);
  return (
    <ul className="flex flex-wrap text-xs font-medium text-center border-b border-gray-700">
      <TabItem item={chartPeriod.CHART_PERIOD.ONE_YEAR} />
      <TabItem item={chartPeriod.CHART_PERIOD.YEAR_TO_DATE} />
      <TabItem item={chartPeriod.CHART_PERIOD.SIX_MONTHS} />
      <TabItem item={chartPeriod.CHART_PERIOD.ONE_MONTH} />
    </ul>
  );
};

export default Index;
