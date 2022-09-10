import axios from "axios";
import $router from "@/router";

let service = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
});

service.interceptors.request.use((request) => {
  let token = authorization.getToken();

  if (token) {
    request.headers["authorization"] = "Bearer " + token;
  }

  return request;
});

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

  async getAllUsers() {
    let users = await service.get("/users");
    delete users.password;

    return users.data;
  },

  async getUserDetails(_id) {
    let response = await service.get(`/users/${_id}`);

    let user = response.data;

    return user;
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
    let post = {
      naslov,
      opis,
      alati,
      materijali,
    };
    await service.post("/posts", post).then((response) => {
      console.log(response);
    });

    return true;
  },

  async getAll() {
    let posts = await service.get("/posts");
    posts.data.sort(function (a, b) {
      var dateA = new Date(a.postedAt),
        dateB = new Date(b.postedAt);
      return dateB - dateA;
    });
    return posts.data;
  },

  async getOne(_id) {
    let response = await service.get(`/posts/${_id}`);

    let post = response.data;

    return post;
  },
};

let comments = {
  async newComment(comment, postId) {
    let com = {
      comment,
    };

    await service.post(`/posts/${postId}/comments`, com).then((response) => {
      return response;
    });
  },

  async getAllComments(postId) {
    postId = localStorage.getItem("post");
    console.log("postId: ", postId);
    let response = await service.get(`/comments/${postId}`);

    let comments = response.data;

    comments.sort(function (a, b) {
      var dateA = new Date(a.postedAt),
        dateB = new Date(b.postedAt);
      return dateB - dateA;
    });

    return comments;
  },
};

export { service, authorization, posts, comments };
