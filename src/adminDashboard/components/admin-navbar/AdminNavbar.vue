<template>
  <div class="sidebar">
    <h2>Admin Dashboard</h2>
  
    <NavbarLink to="/">Home</NavbarLink>
  
  </div>
</template>
  
<script>
import NavbarLink from "./AdminNavbarLink.vue"

export default {
  name: "AdminNavbar",
  components: {
    NavbarLink
  }
  }
</script>

<style>
:root {
  --sidebar-bg-color: #2f855a;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0px;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  display: flex;
  flex-direction: column;
}
</style>
