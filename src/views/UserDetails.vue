<template>
  <div class="row">
    <div class="col-5"></div>
    <div class="col-7">
      <div class="card" style="width: 18rem">
        <div class="card-body">
          <h4 class="card-title">User</h4>
          <div class="card-text">
            <b>Email:</b><br />
            {{ user.email }}<br />
            <b>Username:</b> <br />
            {{ user.username }}<br />
            <b>Grad:</b> <br />
            {{ user.grad }}<br />
            <b>Datum rođenja:</b> <br />
            {{ user.datum_rodjenja }}<br />
            <b>Follow:</b> <br />
            <div v-for="f in user.follow" :key="f.followingName">
              {{ f.followingName }}<br />
            </div>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-primary"
          v-if="user.username != auth.userName"
          @click="newFollow"
        >
          Follow
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { authorization } from "@/services";

export default {
  name: "user_details",

  data() {
    return {
      user: [],
      rez: [],
      auth: authorization.state,
      username: "",
      usertoFollow: "",
    };
  },

  methods: {
    async getUser() {
      let response = await authorization.getUserDetails(this._id);
      this.user = response;
    },

    async newFollow() {
      this.usertoFollow = JSON.parse(
        localStorage.getItem("detailuser")
      ).username;
      console.log(this.usertoFollow);

      this.username = JSON.parse(localStorage.getItem("kljuc")).username;
      console.log(this.username);

      await authorization
        .putFollow(this.username, this.usertoFollow)
        .then((response) => {
          if (response.data == "Ok") {
            alert("User followed");
          } else if (response.data == "Existing") {
            alert("Alredy following this user");
          }
        });
    },
  },

  mounted() {
    this.getUser();
  },

  created() {
    this._id = localStorage.getItem("userdetail");
  },
};
</script>
