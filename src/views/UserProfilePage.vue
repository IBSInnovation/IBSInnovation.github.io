<template>
  <nav-bar-top></nav-bar-top>
  <div class="profile-wrapper">

    <h2>hallo</h2>
    <p>{{ name }}</p>
    <p>{{ email }}</p>
  </div>

  <footer>
    <BackButton />
  </footer>
</template>

<script>
import { getSingleFysio } from "../db/fdb";
import NavBarTop from "../components/navigation/NavBarTop.vue";
import BackButton from "../components/buttons/BackButton.vue";
import { useRoute } from "vue-router";
export default {
  name: "UserProfilePage",
  components: {
    NavBarTop,
    BackButton,
  },
  data() {
    return {
      route: useRoute(),
      name: "",
      email: ""
    };
  },
  mounted() {
    this.user();


  },
  methods: {
    //If each variable isnt individually set, the object you return keeps shuffling
    //And then by not setting it will not work only 1/10 times
    user: async function () {
      const docKey = this.route.params.id;
      let user = await getSingleFysio(docKey);

      this.name = user.name;
      this.email = user.email;

      console.log(user)
      this.$store.commit("setUserProfile", user);
    }
  }
}
</script>

<style scoped>
h2,
p {
  text-align: center;
  color: #fff;
}

footer {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  padding-left: 5%;
  position: fixed;
  bottom: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  background-color: #1b2235;
}
</style>
