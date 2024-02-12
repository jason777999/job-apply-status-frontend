import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

const register = (email) => {
  return axios.post(API_URL + "/register", {
    email,
  });
};

const login = (email) => {
  console.log("Service", email);
  return axios
    .post(API_URL + "/login", {
      email: email,
    })
    .then((response) => {
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
