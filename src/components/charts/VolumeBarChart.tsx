import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface VolumeBarChartProps {
  data: {
    x: number;
    y: number;
  }[];
}
const VolumeBarChart: React.FC<VolumeBarChartProps> = ({ data }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const options = {
      series: [
        {
          name: "volume",
          data: data,
        },
      ],
      chart: {
        height: 168,
        type: "bar",
        foreColor: "#F9FAFB",
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
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();
    return () => {
      chart.destroy();
    };
  }, [data]);
  return <div ref={chartRef}></div>;
};

export default VolumeBarChart;
