<template>
    <v-app id="inspire">
      <admin-app-bar/>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import AdminNavbar from "../adminDashboard/components/admin-navbar";
  
  export default {
    components: {AdminNavbar},
      mounted() {
        if (this.$store.getters.getUser.role !== "Admin") window.location.href = "/"
      }
  }
  </script>