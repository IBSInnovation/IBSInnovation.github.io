<template>
  <div class="sidebar">
    <h2>Admin Dashboard</h2>
    <h3> {{ getDisplayName() }} </h3>

    <div class="navitems">
      <ul>
        <li>
          <a role="menuitem" tabindex="0" @click="goToPatients()" @keyup.enter="goToPatients()">Home</a>
        </li>
        <li>
          <a role="menuitem" tabindex="0" @click="goToUserManage()" @keyup.enter="goToUserManage()">User Management </a>
        </li>
        <li>
          <a role="menuitem" tabindex="0">Test</a>
        </li>
      </ul>
    </div>

  </div>
</template>
  
<script>

export default {
  name: "AdminNavbar",
  methods: {
    goToUserManage() {
      this.$router.push({ name: "user" });
    },
    goToPatients() {
      this.$router.push({ name: "patients" });
    },
    getDisplayName() {
      // if registered with mail  -> mail is the displayName
      let email = this.$store.getters.getUser.email;
      let displayName = this.$store.getters.getUser.displayName;
      if (typeof displayName === "undefined") {
        return email;
      } else {
        return displayName;
      }
    }
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

.sidebar h2 {
  text-align: center;
  border-style: groove hidden ridge;
  border-width: 2px;
  border-color: grey;
  
}

.sidebar h3 {
  text-align: center;
}

.navitems li {
  padding: 10px;

  border: 10px;
  border-color: red;
  border-radius: 20px;
}

.navitems a {
  cursor: pointer;
}
</style>
