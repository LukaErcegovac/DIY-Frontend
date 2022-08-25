import axios from "axios";
import $router from "@/router";

let service = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
});
/*
service.interceptors.request.use((request) => {
  let token = authorization.getToken();

  if (!token) {
    return $router.go();
  } else {
    request.headers["Authorization"] = "Bearer" + token;
  }
  return request;
});
*/

service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401 || error.response.status == 403) {
      authorization.logout();
      $router.go();
    }
  }
);

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

  getToken() {
    let user = authorization.getUser();

    if (user && user.token) {
      return user.token;
    } else {
      return false;
    }
  },

  authenticated() {
    let user = authorization.getUser();
    if (user && user.token) {
      return true;
    }
    return false;
  },
  state: {
    get authenticated() {
      return authorization.authenticated();
    },

    get userName() {
      let user = authorization.getUser();

      if (user) {
        return user.username;
      }
    },
  },

  search: {
    searchTerm: " ",
  },
};

export { service, authorization };
