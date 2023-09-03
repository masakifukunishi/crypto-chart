import { Link } from "react-router-dom";

import Tab from "./tab/Index";
import SelectCurrency from "./select-currency/Index";
const Header: React.FC = () => {
  return (
    <header className="py-1">
      <h1 className="text-lg text-yellow-400 font-bold ml-2 mb-2">
        <Link to="/">Crypto chart</Link>
      </h1>
      <Tab />
      <SelectCurrency />
    </header>
  );
};

export default Header;
