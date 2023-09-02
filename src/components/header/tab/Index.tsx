import { useSelector } from "react-redux";

import TabItem from "./TabItem";
import { selectChartConstant } from "../../../store/slicers/constant";

const Index = () => {
  const chartConstant = useSelector(selectChartConstant);
  return (
    <ul className="flex flex-wrap text-xs font-medium text-center border-b border-gray-700">
      <TabItem item={chartConstant.CHART_PERIOD.ONE_YEAR} />
      <TabItem item={chartConstant.CHART_PERIOD.YEAR_TO_DATE} />
      <TabItem item={chartConstant.CHART_PERIOD.SIX_MONTHS} />
      <TabItem item={chartConstant.CHART_PERIOD.ONE_MONTH} />
    </ul>
  );
};

export default Index;
