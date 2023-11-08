import OhlcvService from "../services/ohlcvService.js";

interface FormattedChartData {
  ohlc: { x: number; y: number[] }[];
  volume: { x: number; y: number }[];
}

export const getOhlcv = async (period: string, currencyPair: string): Promise<FormattedChartData> => {
  const ohlcvServiceInstance = new OhlcvService(period as string, currencyPair as string);
  const formattedChartData = await ohlcvServiceInstance.getChartData();
  return formattedChartData;
};

export const watchOhlcv = async (
  period: string,
  currencyPair: string,
  ohlcv: FormattedChartData,
  callback: (ohlcv: FormattedChartData) => void
): Promise<void> => {
  try {
    const ohlcvServiceInstance = new OhlcvService(period as string, currencyPair as string);
    ohlcvServiceInstance.watchModel(ohlcv, callback);
  } catch (error) {
    console.log(error);
  }
};
