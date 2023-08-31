import { useState, useEffect } from "react";
import ApexCharts from "apexcharts";

import candleApi from "../api/candle";

const Home = () => {
  const [candleData, setCandleData] = useState([]);
  useEffect(() => {
    console.log("Home");
    candleApi.getAll().then((_candles) => {
      setCandleData(_candles);
      console.log(_candles);
    });

    const options = {
      series: [
        {
          data: candleData,
        },
      ],
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#000",
            downward: "#EF403C",
          },
          wick: {
            useFillColor: true,
          },
        },
      },
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: "CandleStick Chart",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }, []);

  return (
    <div>
      <h1 id="chart">Home</h1>
    </div>
  );
};

export default Home;
