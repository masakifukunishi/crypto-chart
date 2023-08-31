import { useState, useEffect } from "react";
import ApexCharts from "apexcharts";

import ohlcvApi from "../api/ohlcv";

const Home = () => {
  const [ohlcv, setOhlcv] = useState({ ohlc: [], volume: [] });
  useEffect(() => {
    const fetchOhlcvData = async () => {
      try {
        const _ohlcv = await ohlcvApi.get();
        setOhlcv(_ohlcv);
      } catch (error) {
        console.error("Error fetching candle data:", error);
      }
    };
    fetchOhlcvData();
  }, []);

  useEffect(() => {
    if (ohlcv.ohlc.length === 0) return;

    const options = {
      series: [
        {
          data: ohlcv.ohlc,
        },
      ],
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#54f542",
            downward: "#EF403C",
          },
          wick: {
            useFillColor: true,
          },
        },
      },
      chart: {
        id: "candles",
        type: "candlestick",
        height: 450,
        background: "#1E1E1E",
        foreColor: "#fff",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
        labels: {
          minWidth: 40,
          maxWidth: 40,
          formatter: (val: number) => {
            return val.toFixed(0);
          },
        },
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    const optionsBar = {
      series: [
        {
          name: "volume",
          data: ohlcv.volume,
        },
      ],
      chart: {
        height: 160,
        type: "bar",
        brush: {
          enabled: false,
          target: "candles",
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          columnWidth: "80%",
          colors: {
            ranges: [
              {
                from: -1000,
                to: 0,
                color: "#F15B46",
              },
              {
                from: 1,
                to: 10000,
                color: "#FEB019",
              },
            ],
          },
        },
      },
      stroke: {
        width: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        labels: {
          minWidth: 40,
          maxWidth: 40,
          formatter: (val: number) => {
            return val.toFixed(0);
          },
        },
      },
    };
    console.log(ohlcv.volume);
    const chartBar = new ApexCharts(document.querySelector("#chart-bar"), optionsBar);
    chartBar.render();

    return () => {
      chart.destroy();
      chartBar.destroy();
    };
  }, [ohlcv]);

  return (
    <div>
      <h1>Home</h1>
      <div id="chart"></div>
      <div id="chart-bar"></div>
    </div>
  );
};

export default Home;
