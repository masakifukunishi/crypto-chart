import TabItem from "./TabItem";
const Index = () => {
  return (
    <ul className="flex flex-wrap text-xs font-medium text-center border-b border-gray-700">
      <TabItem isActive={true} ItemName="1 year" />
      <TabItem isActive={false} ItemName="Year to Date" />
      <TabItem isActive={false} ItemName="6 month" />
      <TabItem isActive={false} ItemName="1 month" />
    </ul>
  );
};

export default Index;
