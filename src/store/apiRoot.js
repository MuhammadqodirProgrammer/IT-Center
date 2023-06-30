import axios from "axios";

const apiRoot = axios.create({
  baseURL: `http://localhost:4000`,
  
});

export default apiRoot;


