interface TabItemProps {
  onTabChange: () => void;
  isActive: boolean;
  name: string;
}

const TabItem: React.FC<TabItemProps> = ({ onTabChange, isActive, name }) => {
  return (
    <li>
      {isActive ? (
        <span className="inline-block p-3 text-yellow-400 bg-gray-800 rounded-t-lg cursor-pointer">{name}</span>
      ) : (
        <span
          onClick={onTabChange}
          className="inline-block p-3 rounded-t-lg text-gray-200 hover:bg-gray-800 dark:hover:text-gray-100 cursor-pointer"
        >
          {name}
        </span>
      )}
    </li>
  );
};

export default TabItem;
