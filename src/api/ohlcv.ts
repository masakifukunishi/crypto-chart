import axios from "axios";

import { setupAxiosInterceptors } from "./lib/axiosInterceptors";

setupAxiosInterceptors();

const ENDPOINT_URL = "/api/ohlcv";

const ohlcvApi = {
  async get(chartPeriod: string) {
    const result = await axios.get(ENDPOINT_URL, {
      params: {
        chartPeriod: chartPeriod,
      },
    });
    return result.data;
  },
};

export default ohlcvApi;
