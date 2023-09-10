import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selecCryptowatchConfig } from "../../store/slicers/config";

const Header: React.FC = () => {
  const cryptowatchConfig = useSelector(selecCryptowatchConfig);
  const exchange = cryptowatchConfig.exchange;
  return (
    <header className="mb-2 pl-1 pt-1.5 flex flex-col items-start mt-0.5 sm:flex-row sm:items-end sm:justify-between ">
      <h1 className="text-2xl text-yellow-400 font-bold">
        <Link to="/">Crypto Chart</Link>
      </h1>
      <div className="text-sm mb-0.5">
        {/* Time Zone is hard coded, as timezone changes are currently not supported */}
        <span className="px-1">Exchange: {exchange} </span> / <span className="px-1">Time Zone: UTC</span>
      </div>
    </header>
  );
};

export default Header;
