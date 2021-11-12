import axios from "axios";

const axiosRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    key: process.env.REACT_APP_YT_API_KEY,
  },
});

export default axiosRequest;
