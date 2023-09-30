import axios from "axios";

import { setupAxiosInterceptors } from "./lib/axiosInterceptors";

setupAxiosInterceptors();

const ENDPOINT_URL = "/api/constants";

const constantsApi = {
  async getChart() {
    const result = await axios.get(`${ENDPOINT_URL}/chart`);
    return result.data;
  },
};

export default constantsApi;
