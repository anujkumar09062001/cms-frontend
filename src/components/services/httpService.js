import axios from "axios";

function setJwt(jwt) {
  axios.defaults.headers.common.Authorization = `JWT ${jwt}`
}

const http = {
  setJwt,
}

export default http;