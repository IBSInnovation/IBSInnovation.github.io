<template>
  <!-- Navbar -->
  <nav class="navbar1">
    <!-- Container wrapper -->
    <div class="container-fluid1">
      <button @click="goBackToHome()">
        <img
          src="@/assets/beeldmerk.png"
          height="40"
          alt="hu logo"
          loading="lazy"
        />
      </button>
      <div class="item-left-side">
        <div class="dropdown">
          <a
            id="dropdownMenuButton"
            class="dropdown-toggle d-flex align-items-center hidden-arrow"
            data-mdb-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ getDisplayName() }}
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <a class="dropdown-item" @click="logOut()">Log uit</a>
            </li>
            <li>
              <a class="dropdown-item" @click="goToDevelop()">Development</a>
            </li>
          </ul>
        </div>
      </div>
      <!-- Right elements -->
    </div>
    <!-- Container wrapper -->
  </nav>
  <!-- Navbar -->
</template>

<script>
import { logOut } from "@/db/firebaseAuth.js";
// eslint-disable-next-line no-unused-vars
import router from "../../router";

export default {
  name: "NavBarTop",

  data() {
    return {
      user: {},
    };
  },
  computed: {},
  methods: {
    logOut() {
      logOut();
      this.$router.push({ path: "/" });
    },
    goBackToHome() {
      this.$router.push({ name: "patients" });
    },
    goToDevelop() {
      this.$router.push({ name: "dev" });
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
    },
  },
};
</script>

<style scoped>
.navbar1 {
  background-color: #f8f9fa;
  position: sticky;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.container-fluid1 {
  width: 100%;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
}
.navbar1 > .container-fluid1 {
  display: flex;
  flex-wrap: inherit;
  align-items: center;
  justify-content: space-between;
}
/* .item-left-side {
  align-items: center !important;
  display: flex !important;
} */

/* pages dropdown */
.dropdown {
  border: 1px solid #00a1e1;
  border-radius: 7px;
  background-color: #00a1e1;
}

#dropdownMenuButton {
  text-decoration: none;
  margin: 5px 5px;
  color: #f8f9fa;
}

#dropdownMenuButton:hover {
  cursor: pointer;
}

button {
  border: none;
  background-color: #f8f9fa;
  color: red;
}
</style>
