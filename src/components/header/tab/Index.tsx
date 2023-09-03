import { useSelector, useDispatch } from "react-redux";

import TabItem from "./TabItem";
import { selectChartConstant } from "../../../store/slicers/constant";
import { selectChartPeriod, setChartPeriod } from "../../../store/slicers/chart";

const Index = () => {
  const chartConstant = useSelector(selectChartConstant);
  const period = useSelector(selectChartPeriod);
  const dispatch = useDispatch();

  const handleTabChange = (newPeriod: string) => {
    dispatch(setChartPeriod(newPeriod));
  };

  return (
    <ul className="flex flex-wrap text-xs font-medium text-center border-b border-gray-700">
      <TabItem
        onTabChange={() => handleTabChange(chartConstant.CHART_PERIOD.ONE_YEAR.value)}
        isActive={period === chartConstant.CHART_PERIOD.ONE_YEAR.value || !period}
        name={chartConstant.CHART_PERIOD.ONE_YEAR.displayName}
      />
      <TabItem
        onTabChange={() => handleTabChange(chartConstant.CHART_PERIOD.YEAR_TO_DATE.value)}
        isActive={period === chartConstant.CHART_PERIOD.YEAR_TO_DATE.value}
        name={chartConstant.CHART_PERIOD.YEAR_TO_DATE.displayName}
      />
      <TabItem
        onTabChange={() => handleTabChange(chartConstant.CHART_PERIOD.SIX_MONTHS.value)}
        isActive={period === chartConstant.CHART_PERIOD.SIX_MONTHS.value}
        name={chartConstant.CHART_PERIOD.SIX_MONTHS.displayName}
      />
      <TabItem
        onTabChange={() => handleTabChange(chartConstant.CHART_PERIOD.ONE_MONTH.value)}
        isActive={period === chartConstant.CHART_PERIOD.ONE_MONTH.value}
        name={chartConstant.CHART_PERIOD.ONE_MONTH.displayName}
      />
    </ul>
  );
};

export default Index;
