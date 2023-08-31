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
  async get() {
    const result = await axios.get(ENDPOINT_URL);
    return result.data;
  },
};

export default ohlcvApi;
