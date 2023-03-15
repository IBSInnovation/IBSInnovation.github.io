<script>
import AdminNavbar from '../components/admin-navbar/AdminNavbar.vue';

export default {
  name: "PatientInfo",
  components: {
    AdminNavbar
  }
}

</script>

<template>
    <AdminNavbar></AdminNavbar>
    <div class="container">
        <h1>Admin Dashboard</h1>
        <p>From here you can configure the website</p>
    </div>
</template>

<style>
* {
    text-align: center;
    color:aliceblue
}
</style>