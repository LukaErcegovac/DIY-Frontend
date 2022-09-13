<template>
  <div id="app">
    <!-- Modal -->
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Prolazna ocjena
            </h5>
          </div>
          <div class="modal-body">Može li 2? Plsss</div>
        </div>
      </div>
    </div>
    <!-- APP -->
    <div class="bg-white">
      <div class="container">
        <div class="row">
          <div class="col">
            <nav class="navbar navbar-expand-lg navbar-light mb-2">
              <button
                type="button"
                class="btn"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <img src="@/assets/DIY.jpg" width="140" />
              </button>
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
                <div class="container w-25">
                  <form class="form-inline my-2 my-lg-0 mr-auto ml-5">
                    <input
                      v-model="searchTerm"
                      class="form-control mr-sm-2"
                      type="search"
                      placeholder="Pretraga..."
                      aria-label="Search"
                    />
                  </form>
                </div>
                <router-link
                  v-if="!auth.authenticated"
                  class="btn btn btn-dark my-2 my-sm-0 mr-2"
                  to="/login"
                >
                  Login
                </router-link>
                <span v-if="auth.authenticated">
                  <a
                    @click="logout"
                    class="btn btn-dark my-2 my-sm-2 mx-5"
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
  </div>
</template>
<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { authorization } from "./services";

export default {
  data() {
    return {
      ...authorization.search,
      auth: authorization.state,
      searchTerm: "",
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
      border-right: rgb(12, 0, 0) 1px solid;
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
