import axios from "axios";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response.data.msg);
  }
);

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
