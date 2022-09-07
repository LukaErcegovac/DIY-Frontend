<template>
  <div class="row">
    <div class="col-5"></div>
    <div class="col-7">
      <div class="card" style="width: 18rem">
        <img src="" class="card-img-top" alt="" />
        <div class="card-body">
          <h4 class="card-title">{{ post.naslov }}</h4>
          <p class="card-text">
            <b>Opis/Postupak:</b><br />
            {{ post.opis }}<br />
            <b>Korišteni materijali:</b> <br />
            {{ post.materijali }}<br />
            <b>Korišteni alati:</b> <br />
            {{ post.alati }}<br />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { posts } from "@/services";

export default {
  name: "post_details",

  data() {
    return {
      post: [],
    };
  },

  methods: {
    async getPost() {
      let response = await posts.getOne(this._id);
      this.post = response;
    },
  },
  mounted() {
    this.getPost();
  },

  created() {
    this._id = localStorage.getItem("post");
    console.log(this._id);
  },
};
</script>
