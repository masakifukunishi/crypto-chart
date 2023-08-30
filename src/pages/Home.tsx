import { useEffect } from "react";

import candleApi from "../api/candle";

const Home = () => {
  useEffect(() => {
    console.log("Home");
    candleApi.getAll().then((_candles) => {
      console.log(_candles);
    });
  }, []);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
