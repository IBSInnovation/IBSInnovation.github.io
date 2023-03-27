<template>
  <nav-bar-top></nav-bar-top>

  <h2>hallo</h2>

  <footer><BackButton /></footer>
</template>

<script>
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
        route: useRoute()
    }
  },
};
</script>

<style scoped>
h2 {
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
