import axios from "axios";

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

const logout = () => {
  return localStorage.removeItem('token');
}

const auth = {
  getAuthToken,
  setAuthToken,
  getCurrentUser,
  logout,
}

export default auth;