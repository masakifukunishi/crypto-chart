import { Link } from "react-router-dom";
const Header: React.FC = () => {
  return (
    <header className="mb-2 pl-1 pt-1.5 flex items-end justify-between">
      <h1 className="text-lg text-yellow-400 font-bold">
        <Link to="/">Crypto Chart</Link>
      </h1>
      <div className="text-xs mb-0.5">
        <span className="px-1">Exchange: Bitfinex </span> / <span className="px-1">Time Zone: UTC</span>
      </div>
    </header>
  );
};

export default Header;
