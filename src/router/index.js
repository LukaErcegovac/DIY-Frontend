import { authorization } from "@/services";
import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/newpost",
    name: "newpost",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "NewPost" */ "../views/NewPost.vue"),
  },
  {
    path: "/postdetail",
    name: "postdetail",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "PostDetail" */ "../views/PostDetail.vue"),
  },
  {
    path: "/userdetails",
    name: "userdetails",
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "UserDetails" */ "../views/UserDetails.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let javneStranice = ["/login", "/register"];
  let needLogin = !javneStranice.includes(to.path);
  let user = authorization.getUser();

  if (needLogin && !user) {
    return next("/login");
  }

  next();
});

export default router;
