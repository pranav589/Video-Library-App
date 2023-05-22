import { apiCall } from "../../../utils/apiCall";

const API_URL = "auth";

const token = localStorage.getItem("token");

const login = async (userData) => {
  const res = await apiCall("POST", `${API_URL}/login`, "", userData);

  if (res?.data?.status === "success") {
    localStorage.setItem("token", res?.data?.Data?.token);
  }
  return res.data;
};

const register = async (userData) => {
  const res = await apiCall("POST", `${API_URL}/register`, "", userData);
  return res.data;
};

const getLoggedUser = async () => {
  const res = await apiCall("GET", `${API_URL}/verify`, token);
  return res.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  login,
  register,
  getLoggedUser,
  logout,
};

export default authService;
