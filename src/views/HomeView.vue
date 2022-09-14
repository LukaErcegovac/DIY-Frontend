<template>
  <div class="row">
    <div class="col">
      <router-link :to="{ name: 'newpost' }">
        <button
          type="Novi post"
          style="margin-bottom: 10px"
          class="btn btn-primary"
        >
          New DIY
        </button>
      </router-link>
    </div>

    <div class="col-6">
      <div class="col-5" v-for="post in posts" :key="post._id">
        <div
          class="card my-2"
          style="width: 18rem"
          v-if="
            post.naslov.includes(store.searchTerm) ||
            post.postedBy.includes(store.searchTerm)
          "
        >
          <img src="" class="card-img-top" alt="" />
          <div class="card-body">
            <h5 class="card-title">{{ post.naslov }}</h5>
            <p class="card-text">
              Posted by: {{ post.postedBy }}<br />
              {{ post.postedAt }}
            </p>
            <a class="btn btn-primary" @click="setPostId(post._id)">Details</a>
          </div>
        </div>
      </div>
    </div>

    <div class="col-2">
      <span v-if="auth.authenticated">
        <h5>Current user:</h5>
        <a
          class="btn btn-primary my-1"
          @click="
            setUserId(
              users.find((u) => {
                return u.username == auth.userName;
              })._id
            )
          "
          >{{ auth.userName }}</a
        >
        <br />
        <br />
      </span>
      <h5>All users:</h5>
      <div v-for="user in users" :key="user._id">
        <a
          v-if="user.username != auth.userName"
          class="btn btn-primary my-1"
          @click="setUserId(user._id)"
          >{{ user.username }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { authorization, posts } from "@/services";
import store from "@/Store.js";

export default {
  name: "HomeView",
  data() {
    return {
      auth: authorization.state,
      posts: [],
      users: [],
      store,
    };
  },

  methods: {
    setUserId(i) {
      localStorage.setItem("userdetail", i);

      this.$router.push({ name: "userdetails" });
    },

    setPostId(i) {
      localStorage.setItem("post", i);

      this.$router.push({ name: "postdetail" });
    },

    remove() {
      localStorage.removeItem("post");
      localStorage.removeItem("userdetail");
      localStorage.removeItem("detailuser");
    },

    async getPosts() {
      let response = await posts.getAll();
      this.posts = response;
      console.log(this.posts);
    },
    async getUser() {
      let response = await authorization.getAllUsers();
      this.users = response;
    },
  },

  mounted() {
    this.getPosts();
    this.getUser();
    this.remove();
  },
};
</script>

<style></style>
