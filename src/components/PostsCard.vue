<template>
  <div class="card text-center">
    <div class="card-header text-left">
      <h5>{{ info.naslov }}</h5>
      by
      <strong>{{ info.email }}</strong>
    </div>
    <div class="card-footer text-left">
      <div>{{ timeAgo }}</div>
    </div>
  </div>
</template>

<script>
import { posts } from "@/services";

export default {
  props: ["info"],

  data() {
    return {};
  },

  async refresh() {
    let post = await posts.getOne(this.info.id);
    this.info.posts = post.url;
  },
  formatTime(time) {
    return moment(time.posted_at).fromNow();
  },

  computed: {
    timeAgo() {
      return moment(this.info.posted_at).fromNow();
    },
  },
};
</script>
