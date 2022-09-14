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

  async register(email, username, password, datum_rodjenja, grad, follow) {
    let data = {
      email,
      username,
      password,
      datum_rodjenja,
      grad,
      follow,
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

    let detuser = {
      _id: user._id,
      username: user.username,
    };

    localStorage.setItem("detailuser", JSON.stringify(detuser));

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

  async putFollow(username, usertoFollow) {
    let follow = {
      username: username,
      usertoFollow: usertoFollow,
    };

    let response = await service.put("/following", follow);
    return response;
  },
};

let posts = {
  async newPost(naslov, opis, alati, materijali, postedBy) {
    let post = {
      naslov,
      opis,
      alati,
      materijali,
      postedBy,
    };
    await service.post("/posts", post).then((response) => {
      console.log(response);
    });

    return true;
  },

  async getAll(searchTerm) {
    let terms = {};

    if (searchTerm) {
      terms.params = {
        _any: searchTerm,
      };
    }

    let posts = await service.get("/posts", terms);
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

  async deletPost(_id) {
    let response = await service.delete(`/posts/${_id}`);
    return true;
  },

  async updatePost(_id, naslov, opis, alati, materijali) {
    let post = {
      naslov,
      opis,
      alati,
      materijali,
    };
    await service.patch(`/posts/${_id}`, post);

    return post;
  },
};

let comments = {
  async newComment(comment, postId, commentedBy) {
    let com = {
      comment,
      commentedBy,
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
