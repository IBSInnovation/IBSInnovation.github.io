<template>
    <AdminNavbar></AdminNavbar>
    <div class="container">
        <h1>Admin Dashboard</h1>
        <p>From here you can configure the website</p>
    </div>
    <router-view></router-view>
</template>

<script>
import AdminNavbar from '../components/admin-navbar/AdminNavbar.vue';

export default {
  name: "AdmingLandingPage",
  components: {
    AdminNavbar
  }
}

</script>

<style scoped>
.container {
    text-align: center;
    color:aliceblue;
}
</style>