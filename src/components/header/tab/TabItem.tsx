import { useSelector, useDispatch } from "react-redux";

import { selectChartPeriod, setChartPeriod } from "../../../store/slicers/chart";

interface TabItemProps {
  item: {
    value: string;
    displayName: string;
  };
}

const TabItem: React.FC<TabItemProps> = ({ item }) => {
  const chartPeriod = useSelector(selectChartPeriod);
  const isActive = chartPeriod === item.value;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setChartPeriod(item.value));
  };

  return (
    <li>
      {isActive ? (
        <span className="inline-block p-3 text-yellow-400 bg-gray-800 rounded-t-lg cursor-pointer">{item.displayName}</span>
      ) : (
        <span
          onClick={handleClick}
          className="inline-block p-3 rounded-t-lg text-gray-200 hover:bg-gray-800 dark:hover:text-gray-100 cursor-pointer"
        >
          {item.displayName}
        </span>
      )}
    </li>
  );
};

export default TabItem;
