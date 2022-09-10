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
    <div class="form-group row">
      <div class="col-4"></div>
      <div class="col-4">
        <label for="comment">Comment</label>
        <textarea
          v-model="comment"
          type="comment"
          class="form-control"
          id="commentField"
          cols="10"
          rows="1"
          aria-describedby="commentHelp"
          placeholder="Komentiraj"
        ></textarea>
        <button
          type="button"
          class="btn btn-primary mt-5"
          @click="postComment"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Submit
        </button>
      </div>
    </div>
    <div class="row" v-for="allcomment in allcomments" :key="allcomment._id">
      <div class="col-5"></div>
      <div class="col-4">
        <div class="card" style="width: 18rem">
          <img src="" class="card-img-top" alt="" />
          <div class="card-body">
            <p class="card-text">
              {{ allcomment.comment }}
            </p>
            {{ allcomment.postedAt }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { posts, comments } from "@/services";

export default {
  name: "post_details",

  data() {
    return {
      post: [],
      comment: "",
      _id: "",
      allcomments: [],
    };
  },

  methods: {
    async getPost() {
      let response = await posts.getOne(this._id);
      this.post = response;
    },

    async getComments() {
      let response = await comments.getAllComments();
      this.allcomments = response;
    },

    async postComment() {
      let postId = this._id;

      try {
        let ncomment = await comments.newComment(this.comment, postId);

        console.log(ncomment);
      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    },
  },
  mounted() {
    this.getPost();
    this.getComments();
  },

  created() {
    this._id = localStorage.getItem("post");
    console.log(this._id);
  },
};
</script>
