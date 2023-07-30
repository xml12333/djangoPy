import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL!;
axios.defaults.withCredentials = true;

let refresh = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      const response = await axios.post("refresh/", {});
      if (response.status === 200) {
        return axios(error.config);
      }
      refresh = false;
      return error;
    }
  }
);
