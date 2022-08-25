<template>
  <div id="app">
    <div class="bg-white">
      <div class="container">
        <div class="row">
          <div class="col">
            <nav class="navbar navbar-expand-lg navbar-light mb-2">
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <form class="form-inline my-2 my-lg-0 mr-auto ml-5">
                  <input
                    v-model="searchTerm"
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Pretraga..."
                    aria-label="Search"
                  />
                </form>
                <router-link
                  v-if="!auth.authenticated"
                  class="btn btn-info my-2 my-sm-0 mr-2"
                  to="/login"
                >
                  Login
                </router-link>
                <span v-if="auth.authenticated">
                  <a
                    @click="logout"
                    class="btn btn-info my-2 my-sm-0 mr-2"
                    href="#"
                    >Logout</a
                  >
                </span>
                <router-link
                  v-if="!auth.authenticated"
                  class="btn btn-outline my-2 my-sm-0 mr-2"
                  to="/register"
                >
                  Register
                </router-link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <router-view />
    </div>

    <div id="footer" class="text-center mt-5">
      Ovo je footer. (c) 2019 mi svi skupa.
    </div>
  </div>
</template>
<script>
import { authorization } from "./services";
import "bootstrap";

export default {
  data() {
    return {
      ...authorization.search,
      auth: authorization.state,
    };
  },

  methods: {
    logout() {
      authorization.logout();
      this.$router.go();
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: rgba(var(--b3f, 250, 250, 250), 1);
}
.bg-white {
  background-color: white;
  border-bottom: #ccc 1px solid;
  margin-bottom: 20px;
  padding: 10px;
}
nav.navbar {
  background-color: white;
  a {
    svg {
      border-right: #aaa 1px solid;
      margin-right: 10px;
      padding-right: 10px;
    }
    img {
      position: relative;
      top: 3px;
    }
  }
}
.btn-primary {
  color: #007bff;
  background: none;
  border-color: #007bff;
}
</style>
