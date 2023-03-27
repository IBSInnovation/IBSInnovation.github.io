<template>
    <nav-bar-top></nav-bar-top>
  
    <footer><BackButton></BackButton></footer>
  </template>
  
  <script>
  import NavBarTop from "../components/navigation/NavBarTop.vue";
  import { useRoute } from "vue-router";
  import BackButton from "../components/buttons/BackButton.vue";
  
  export default {
    name: "UserProfilePage",
    components: {
      NavBarTop,
      BackButton,
    },
    data() {
      return {
        route: useRoute()
      };
    },
  
    methods: {
    },
  };
  </script>
  
  <style scoped>


  </style>
  