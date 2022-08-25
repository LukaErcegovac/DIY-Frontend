import axios from "axios";

let service = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
});

let authorization = {
  async login(username, password) {
    let response = await service.post("/auth", {
      username: username,
      password: password,
    });

    let user = response.data;

    localStorage.setItem("kljuc", JSON.stringify(user));

    return true;
  },

  logout() {
    localStorage.removeItem("kljuc");
  },

  getUser() {
    return JSON.parse(localStorage.getItem("kljuc"));
  },
};

export { service, authorization };
