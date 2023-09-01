import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="py-1">
      <h1 className="font-bold text-lg ml-2">
        <Link to="/">Crypto chart</Link>
      </h1>
    </header>
  );
};

export default Header;
