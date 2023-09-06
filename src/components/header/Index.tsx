import { Link } from "react-router-dom";
const Header: React.FC = () => {
  return (
    <header className="py-1">
      <h1 className="text-lg text-yellow-400 font-bold ml-2 mb-2">
        <Link to="/">Crypto chart</Link>
      </h1>
    </header>
  );
};

export default Header;
