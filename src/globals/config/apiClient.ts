import axios from "axios";
import {API_TOKEN, BASE_URL} from "../contsants";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_TOKEN,
  },
});

export default apiClient;
