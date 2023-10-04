import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface CandlestickChartProps {
  data: {
    x: number;
    y: number[];
  }[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const options = {
      series: [
        {
          data: data,
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
        height: 420,
        foreColor: "#F9FAFB",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        type: "datetime",
        tooltip: {
          enabled: true,
        },
        labels: {
          minWidth: 40,
          maxWidth: 40,
          style: {
            fontSize: "14px",
          },
        },
      },
      yaxis: {
        tooltip: {
          enabled: true,
          theme: false,
        },
        labels: {
          minWidth: 48,
          maxWidth: 48,
          formatter: (val: number) => {
            return val.toFixed(0);
          },
          style: {
            fontSize: "14px",
          },
        },
      },
    };
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [data]);
  return <div ref={chartRef}></div>;
};
export default CandlestickChart;
