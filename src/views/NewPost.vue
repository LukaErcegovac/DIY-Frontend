<template>
  <div class="row">
    <div class="col">
      <h2 class="text-center mb-5">Create your DIY</h2>
    </div>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-5">
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
          <button
            type="submit"
            class="btn btn-primary mt-5"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { posts } from "@/services";

export default {
  name: "NewPosts",
  data() {
    return {
      naslov: "",
      opis: "",
      materijali: "",
      alati: "",
    };
  },

  methods: {
    async newPost() {
      try {
        let newpost = await posts.newPost(
          this.naslov,
          this.opis,
          this.materijali,
          this.alati
        );

        console.log(newpost);
        this.$router.push({ name: "home" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
