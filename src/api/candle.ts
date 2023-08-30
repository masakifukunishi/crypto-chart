import axios from "axios";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response.data.msg);
  }
);

const ENDPOINT_URL = "/api/candles";

const candleApi = {
  async getAll() {
    const result = await axios.get(ENDPOINT_URL);
    return result.data;
  },
};

export default candleApi;
