<template>
  <div class="sidebar">
    <h2>Admin Dashboard</h2>
    <h3> {{ getDisplayName() }} </h3>

    <div class="navitems">
      <ul>

        <a role="menuitem" tabindex="0" @click="goToPatients()" @keyup.enter="goToPatients()">
          <li>Home</li>
        </a>

        <a role="menuitem" tabindex="0" @click="goToUserManage()" @keyup.enter="goToUserManage()">
          <li>User Management</li>
        </a>

        <a role="menuitem" tabindex="0" @click="goToUserManage()" @keyup.enter="goToUserManage()">
          <li>Therapist Management</li>
        </a>

        <a role="menuitem" tabindex="0" @click="goToTest()">
          <li>Test</li>
        </a>

      </ul>
    </div>

    <div class="footertext">
      <p>IBS INNOVATION 2023</p>
    </div>
  </div>
</template>
  
<script>
import router from "../../../router";

export default {
  name: "AdminNavbar",
  methods: {
    goToUserManage() {
      this.$router.push({ name: "usermanage" });
    },
    goToPatients() {
      this.$router.push({ name: "patients" });
    },
    goToTest() {
      this.$router.push({ name: "test" });
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
li {
  list-style-type: none;
}

.sidebar {
  color: white;

  text-align: center;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  background-color: #151a2c;

  float: left;
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0;
  bottom: 0;
  padding: 0.5em;
}

.sidebar h2 {}

.sidebar h3 {
  text-align: center;
  border-bottom: solid;
  border-width: 2px;
  border-color: grey;
}

.navitems li {
  padding: 5px;
  margin: 4px;
  border-bottom: solid;
  border-width: 2px;
  border-color: grey;
  text-align: left;
}

.navitems li:hover {
  background-color: grey;
  transition: 0.9s;
}

.navitems a {
  cursor: pointer;
}

.sidebar .footertext {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: smaller;
}
</style>
