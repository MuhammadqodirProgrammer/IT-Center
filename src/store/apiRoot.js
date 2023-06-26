import axios from "axios";

const apiRoot = axios.create({
  baseURL: `https://tizim.astrolab.uz/`,
  // baseURL: `https://saidovzohid.jprq.live/`,
});

export default apiRoot;


