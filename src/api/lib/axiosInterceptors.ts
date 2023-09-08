import axios from "axios";

export const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error.response.data.msg);
    }
  );
};
