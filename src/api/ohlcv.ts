import axios from "axios";

import { setupAxiosInterceptors } from "./lib/axiosInterceptors";

setupAxiosInterceptors();

const ENDPOINT_URL = "/api/ohlcv";

const ohlcvApi = {
  async get(period: string, currencyPair: string) {
    const result = await axios.get(ENDPOINT_URL, {
      params: {
        period: period,
        currencyPair: currencyPair,
      },
    });
    return result.data;
  },
};

export default ohlcvApi;
