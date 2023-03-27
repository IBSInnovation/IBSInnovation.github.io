<template>
  <nav class="navbar navbar-expand-sm navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand">
        <button @click="goBackToHome()">
          <img
            src="@/assets/beeldmerk.png"
            height="40"
            alt="hu logo"
            loading="lazy"
          />
        </button>
      </a>
      <ul class="nav navbar-nav ms-auto">
        <li class="nav-item dropdown">
          <a
            href="#"
            class="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            {{ getDisplayName() }}
          </a>
          <div class="dropdown-menu dropdown-menu-end">
            <li>
              <a
                class="dropdown-item"
                role="menuitem"
                tabindex="0"
                @click="goToProfile()"
                @keyup.enter=""
                >Profile</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                role="menuitem"
                tabindex="0"
                @click="goToDevelop()"
                @keyup.enter="goToDevelop()"
                >Development</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                role="menuitem"
                tabindex="0"
                @click="goToAdmin()"
                @keyup.enter="goToAdmin()"
                >Admin Dashboard</a
              >
            </li>
            <div class="dropdown-divider"></div>
            <li>
              <a
                class="dropdown-item"
                role="menuitem"
                tabindex="0"
                @click="logOut()"
                @keyup.enter="logOut()"
                >Log uit</a
              >
            </li>
          </div>
        </li>
      </ul>
    </div>
  </nav>
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
    goToProfile() {
      this.$router.push({ name: "profilePage" });
    },
    goToDevelop() {
      this.$router.push({ name: "dev" });
    },
    goToAdmin() {
      this.$router.push({ name: "admin" });
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
.navbar {
  border-bottom: 2px solid white;
  background: #1b2235;
}

.nav-item {
  cursor: pointer;
}

.nav-link {
  padding: 6px;
  color: #f8f9fa;
  border: 1px solid #e43a23;
  border-radius: 18px;
  background-color: #e43a23;
}

.nav-link:hover,
.nav-link:focus {
  background: #d3322c;
}

button {
  border: none;
  background-color: #1b2235;
}

@media (max-width: 576px) {
  .navbar-expand-sm .navbar-nav .dropdown-menu {
    position: absolute;
  }
}
</style>
