interface TabItemProps {
  isActive: boolean;
  ItemName: string;
}

const TabItem: React.FC<TabItemProps> = ({ isActive, ItemName }) => {
  return (
    <li>
      {isActive ? (
        <a className="inline-block p-3 text-yellow-400 bg-gray-800 rounded-t-lg">{ItemName}</a>
      ) : (
        <a href="#" className="inline-block p-3 rounded-t-lg text-gray-200 hover:bg-gray-800 dark:hover:text-gray-100">
          {ItemName}
        </a>
      )}
    </li>
  );
};

export default TabItem;
