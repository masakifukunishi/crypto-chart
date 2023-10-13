import OhlcvService from "../services/ohlcvService.js";

export const getOhlcv = async (period: string, currencyPair: string): Promise<any> => {
  try {
    const ohlcvServiceInstance = new OhlcvService(period as string, currencyPair as string);
    const formattedChartData = await ohlcvServiceInstance.getChartData();
    return formattedChartData;
  } catch (error) {
    console.log(error);
  }
};

export const watchOhlcv = async (period: string, currencyPair: string, callback: any): Promise<void> => {
  try {
    const ohlcvServiceInstance = new OhlcvService(period as string, currencyPair as string);
    ohlcvServiceInstance.watchModelAndGetChartData(callback);
  } catch (error) {
    console.log(error);
  }
};
