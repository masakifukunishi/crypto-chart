import TabItem from "./TabItem";
import { CHART_CONSTANT } from "../../../constants/chart";

const Index = () => {
  return (
    <ul className="flex flex-wrap text-xs font-medium text-center border-b border-gray-700">
      <TabItem item={CHART_CONSTANT.CHART_PRRIOD.ONE_YEAR} />
      <TabItem item={CHART_CONSTANT.CHART_PRRIOD.YEAR_TO_DATE} />
      <TabItem item={CHART_CONSTANT.CHART_PRRIOD.SIX_MONTHS} />
      <TabItem item={CHART_CONSTANT.CHART_PRRIOD.ONE_MONTH} />
    </ul>
  );
};

export default Index;
