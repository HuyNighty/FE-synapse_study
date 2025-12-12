import axios from "../configurations/axiosConfig";

const authService = {
  login: (identifier, password) => {
    return axios.post("/auth/login", {
      identifier,
      password,
    });
  },

  register: (data) => {
    return axios.post("/users", data);
  },

  getMyInfo: () => {
    return axios.get("/users/my-info");
  },

  logout: (token) => {
    return axios.post("/auth/logout", { token });
  },
};

export default authService;
