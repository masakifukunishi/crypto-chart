import axios from "axios";

import { setupAxiosInterceptors } from "./lib/axiosInterceptors";

setupAxiosInterceptors();

const ENDPOINT_URL = "/api/configs";

const configsApi = {
  async getCryptowatch() {
    const result = await axios.get(`${ENDPOINT_URL}/cryptowatch`);
    return result.data;
  },
};

export default configsApi;
