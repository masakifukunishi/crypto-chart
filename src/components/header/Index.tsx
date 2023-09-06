import { Link } from "react-router-dom";
const Header: React.FC = () => {
  return (
    <header className="mb-2 pl-1 pt-1.5">
      <h1 className="text-lg text-yellow-400 font-bold">
        <Link to="/">Crypto Chart</Link>
      </h1>
    </header>
  );
};

export default Header;
