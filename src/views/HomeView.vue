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
    <div class="col-2 ms-auto">
      <span v-if="auth.authenticated">
        {{ auth.userName }}
        <br />
        <br />
      </span>
    </div>
  </div>
</template>

<script>
import { authorization } from "@/services";

export default {
  name: "HomeView",
  data() {
    return {
      auth: authorization.state,
    };
  },
};
</script>

<style></style>
