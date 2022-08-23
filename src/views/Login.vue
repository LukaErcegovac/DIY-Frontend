<template>
  <div class="login">
    <div class="row">
      <div class="col">
        <h1 class="text-center mb-5">This is a login page</h1>
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your password with anyone else.
            </small>
          </div>
          <button type="submit" class="btn btn-primary mt-5">Submit</button>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import { authorization } from "@/services";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async login() {
      let response = await authorization.login(this.email, this.password);
      console.log("Rezultat je: ", JSON.stringify(response));
    },
  },
};
</script>
