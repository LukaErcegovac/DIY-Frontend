<template>
  <div class="row">
    <div class="col-5"></div>
    <div class="col-7">
      <div class="card" style="width: 18rem">
        <div class="card-body">
          <h4 class="card-title">User</h4>
          <p class="card-text">
            <b>Email:</b><br />
            {{ user.email }}<br />
            <b>Username:</b> <br />
            {{ user.username }}<br />
            <b>Grad:</b> <br />
            {{ user.grad }}<br />
            <b>Datum rođenja:</b> <br />
            {{ user.datum_rodjenja }}<br />
          </p>
        </div>
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
    };
  },

  methods: {
    async getUser() {
      let response = await authorization.getUserDetails(this._id);
      this.user = response;
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
