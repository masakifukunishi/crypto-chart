import axios from "axios";

export function setupAxiosInterceptors() {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error.response.data.msg);
    }
  );
}
