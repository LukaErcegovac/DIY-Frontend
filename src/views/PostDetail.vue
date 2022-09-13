<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="newPost" class="mb-5">
              <div class="form-group">
                <label for="naslovField">Naslov</label>
                <input
                  v-model="naslov"
                  type="naslov"
                  class="form-control"
                  id="naslovField"
                  aria-describedby="naslovHelp"
                  placeholder="Unesi naslov"
                />
              </div>
              <div class="form-group">
                <label for="opisField">Opis</label>
                <textarea
                  v-model="opis"
                  id="opisField"
                  type="opis"
                  class="form-control"
                  cols="10"
                  rows="5"
                  name="opisField"
                  aria-describedby="opisHelp"
                  placeholder="Unesi opis"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="materijaliField">Materijali</label>
                <textarea
                  v-model="materijali"
                  type="materijali"
                  class="form-control"
                  id="materijaliField"
                  cols="10"
                  rows="5"
                  aria-describedby="materijaliHelp"
                  placeholder="Unesi materijale korištene u izradi"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="alatiField">Alati</label>
                <textarea
                  v-model="alati"
                  type="alati"
                  class="form-control"
                  id="alatiField"
                  cols="10"
                  rows="5"
                  aria-describedby="alatiHelp"
                  placeholder="Unesi alate korištene u izradi"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" @click="updPost" class="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- App -->
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
          <a class="mx-auto" v-if="post.postedBy == localUser">
            <button
              type="button"
              class="btn btn-primary"
              @click="filModal(post)"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Update
            </button>
            <button type="button" class="btn btn-danger" @click="delPost">
              Delet
            </button>
          </a>
        </div>
      </div>
      <div class="form-group row py-5">
        <div class="col-5"></div>
        <div class="col-4 text-center">
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
            class="btn btn-primary my-2"
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
          <div class="card my-1" style="width: 18rem">
            <img src="" class="card-img-top" alt="" />
            <div class="card-body">
              <p class="card-text">
                {{ allcomment.comment }}<br />
                Commented by: {{ allcomment.commentedBy }}<br />
                {{ allcomment.postedAt }}
              </p>
            </div>
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
      naslov: "",
      opis: "",
      materijali: "",
      alati: "",
      commentedBy: "",
      localUser: "",
    };
  },

  methods: {
    filModal(post) {
      this.naslov = post.naslov;
      this.opis = post.opis;
      this.materijali = post.materijali;
      this.alati = post.alati;
    },

    async getPost() {
      let response = await posts.getOne(this._id);
      this.post = response;
    },

    async updPost() {
      let response = await posts.updatePost(
        this._id,
        this.naslov,
        this.opis,
        this.materijali,
        this.alati
      );
      console.log(response);
      window.location.reload();
    },

    async delPost() {
      let response = await posts.deletPost(this._id);
      this.$router.push({ name: "home" });
    },

    async getComments() {
      let response = await comments.getAllComments();
      this.allcomments = response;
    },

    async postComment() {
      let postId = this._id;

      try {
        this.commentedBy = JSON.parse(localStorage.getItem("kljuc")).username;
        let ncomment = await comments.newComment(
          this.comment,
          postId,
          this.commentedBy
        );

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
    this.localUser = JSON.parse(localStorage.getItem("kljuc")).username;
  },

  created() {
    this._id = localStorage.getItem("post");
    console.log(this._id);
  },
};
</script>
