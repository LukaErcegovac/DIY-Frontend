<template>
  <div class="home">
    <div class="col-4">
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
