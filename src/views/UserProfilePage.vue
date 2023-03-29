<template>
  <nav-bar-top></nav-bar-top>

  <h2>hallo</h2>
  <p>{{ fysioUser.name }}</p>
  <p>{{ fysioUser.email }}</p>
9
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
      fysioUser: null
    };
  },
  async mounted() {
    this.fysioUser = await Promise.resolve(this.user())
    console.log(this.fysioUser)

  },
  methods: {
    user: function() {
      const docKey = this.route.params.id;
      return getSingleFysio(docKey);
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
