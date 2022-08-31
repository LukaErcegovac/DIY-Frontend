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
  async login(email, password) {
    let response = await service.post("/auth", {
      email: email,
      password: password,
    });

    let user = response.data;

    localStorage.setItem("kljuc", JSON.stringify(user));

    return true;
  },

  async register(email, username, password, datum_rodjenja, grad) {
    let data = {
      email: email,
      username: username,
      password: password,
      datum_rodjenja: datum_rodjenja,
      grad: grad,
    };

    await service.post("/users", data);

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

let posts = {
  async newPost(naslov, opis, alati, materijali) {
    //let user = authorization.getUser();
    //if (user) {
    let post = {
      naslov,
      opis,
      alati,
      materijali,
    };
    return service.post("/posts", post);
    //}
  },

  async getAll(searchTerm) {
    let options = {};

    if (searchTerm) {
      options.params = {
        _any: searchTerm,
      };
    }

    let response = await service.get("/posts", options);
    return response.data.map((posts) => {
      return {
        id: posts._id,
        url: posts.source,
        email: posts.createdBy,
        title: posts.title,
        postedAt: Number(posts.postedAt),
      };
    });
  },

  async getOne(id) {
    let response = await service.get(`/posts/${id}`);

    let post = response.data;

    return {
      id: post._id,
      url: post.source,
      email: post.createdBy,
      title: post.title,
      postedAt: Number(post.postedAt),
    };
  },
};

export { service, authorization, posts };
