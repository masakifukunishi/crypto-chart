import { useState, useEffect } from "react";
import ApexCharts from "apexcharts";

import candleApi from "../api/candle";

const Home = () => {
  const [candleData, setCandleData] = useState([]);
  useEffect(() => {
    const fetchCandleData = async () => {
      try {
        const _candles = await candleApi.getAll();
        setCandleData(_candles);
      } catch (error) {
        console.error("Error fetching candle data:", error);
      }
    };
    fetchCandleData();
  }, []);

  useEffect(() => {
    if (candleData.length === 0) {
      return;
    }

    const options = {
      series: [
        {
          data: candleData,
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
        type: "candlestick",
        height: 650,
        background: "#1E1E1E",
        foreColor: "#fff",
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

    // const optionsBar = {
    //   series: [
    //     {
    //       name: "volume",
    //       data: [100, 2, 3, 4, 5, 60000, 7, 8, 9, 10],
    //     },
    //   ],
    //   chart: {
    //     height: 160,
    //     type: "bar",
    //     brush: {
    //       enabled: true,
    //       target: "candles",
    //     },
    //     selection: {
    //       enabled: true,
    //       xaxis: {
    //         min: new Date("3 Sep 2022").getTime(),
    //         max: new Date("31 Aug 2023").getTime(),
    //       },
    //       fill: {
    //         color: "#ccc",
    //         opacity: 0.4,
    //       },
    //       stroke: {
    //         color: "#0D47A1",
    //       },
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   plotOptions: {
    //     bar: {
    //       columnWidth: "80%",
    //       colors: {
    //         ranges: [
    //           {
    //             from: -1000,
    //             to: 0,
    //             color: "#F15B46",
    //           },
    //           {
    //             from: 1,
    //             to: 10000,
    //             color: "#FEB019",
    //           },
    //         ],
    //       },
    //     },
    //   },
    //   stroke: {
    //     width: 0,
    //   },
    //   xaxis: {
    //     type: "datetime",
    //     axisBorder: {
    //       offsetX: 13,
    //     },
    //   },
    //   yaxis: {
    //     labels: {
    //       show: false,
    //     },
    //   },
    // };
    // const chartBar = new ApexCharts(document.querySelector("#chart-bar"), optionsBar);
    // chartBar.render();

    return () => {
      chart.destroy();
      // chartBar.destroy();
    };
  }, [candleData]);

  return (
    <div>
      <h1>Home</h1>
      <div id="chart"></div>
      <div id="chart-bar"></div>
    </div>
  );
};

export default Home;
