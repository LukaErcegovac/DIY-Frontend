<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="errorModal"
      tabindex="-1"
      aria-labelledby="errorModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="errorModal">Modal title</h5>
          </div>
          <div class="modal-body" v-if="password != password2">
            Passwords don't mach!
          </div>
          <div class="modal-body" v-if="password == password2">
            User created successfully, login now!
          </div>
        </div>
      </div>
    </div>
    <!-- Register -->
    <div class="row">
      <div class="col">
        <h1 class="text-center mb-5">This is a register page</h1>
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <form @submit.prevent="register">
          <div v-if="errorMessage" class="alert alert-danger">
            <strong>Ups!</strong>
            {{ errorMessage }}
          </div>
          <div class="form-group">
            <label for="emailField">Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="emailField"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group">
            <label for="usernamelField">Username</label>
            <input
              v-model="username"
              type="username"
              class="form-control"
              id="usernameField"
              placeholder="Enter Username"
            />
          </div>
          <div class="form-group">
            <label for="passwordField">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="passwordField"
              placeholder="Password"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your password with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="confirmPasswordField">Confirm Password</label>
            <input
              v-model="password2"
              type="password"
              class="form-control"
              id="confirmPasswordField"
              placeholder="Confirm password"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your password with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="gradField">Grad</label>
            <input
              v-model="grad"
              type="grad"
              class="form-control"
              id="gradField"
              placeholder="Enter city you live in"
            />
          </div>
          <div class="form-group">
            <label for="datumField">Datum rodjenja</label>
            <input
              v-model="datum_rodjenja"
              type="datum_rodjenja"
              class="form-control"
              id="datumField"
              placeholder="Ender your birth date"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary mt-5"
            data-bs-toggle="modal"
            data-bs-target="#errorModal"
          >
            Submit
          </button>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import { authorization } from "@/services";
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      errorMessage: "",
      email: "",
      username: "",
      password: "",
      password2: "",
      datum_rodjenja: "",
      grad: "",
    };
  },

  methods: {
    async register() {
      try {
        if (this.password == this.password2) {
          let result = await authorization.register(
            this.email,
            this.username,
            this.password,
            this.datum_rodjenja,
            this.grad
          );

          console.log(result);

          this.$router.push({ name: "login" });
        } else console.log("Error");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
