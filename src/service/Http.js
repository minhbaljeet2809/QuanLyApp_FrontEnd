import axios from "axios";

const BASE_API = "http://localhost:8080/api/v1";

const Http = axios.create({
  baseURL: BASE_API,
});

export default Http;
