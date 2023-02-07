import axios from "axios";

axios.defaults.headers.common.Authorization = `JWT ${getAuthToken()}`

const getCurrentUser = async () => {
  const response = await axios.get('current_user/')
  return response.data;
}

const setAuthToken = (token) => {
  localStorage.setItem('token', token);
}

function getAuthToken() {
  return localStorage.getItem('token');
}

const login = (user) => {
  axios
    .post("token-auth/", user)
    .then((res) => {
      localStorage.setItem('token', res.data.token)
      return res.data.user;
    })
  return;
}

const logout = () => {
  return localStorage.removeItem('token');
}

const auth = {
  getAuthToken,
  setAuthToken,
  getCurrentUser,
  login,
  logout,
}

export default auth;