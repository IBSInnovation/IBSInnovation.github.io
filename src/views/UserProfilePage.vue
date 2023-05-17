<template>
  <nav-bar-top></nav-bar-top>
  <div class="profile-wrapper">
    <div class="profile">
      <div class="top-icons">
        <div>
          <font-awesome-icon icon="fa-solid fa-heart" style="color: #ffffff" />
        </div>
        <div>
          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" style="color: #fff" />
        </div>
      </div>

      <i class="bi bi-person-square userIcon"></i>
      <div class="profileInformation">
        <h2>Name: {{ name }}</h2>
        <p>Email: {{ email }}</p>
        <p>Role: {{ role }}</p>
        <p>{{ information }}</p>

        <a class="button" :href="'mailto:' + email">
          <b> Contact me! </b>
        </a>
      </div>
    </div>
  </div>

  <footer>
    <BackButton />
  </footer>
</template>

<script>
import { getSingleFysio } from "../db/fdb";
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
      route: useRoute(),

      id: "",
      name: "",
      email: "",
      role: "",
      information:
        "Has been a licensed fysiotherapist for: " +
        Math.floor(Math.random() * 21) +
        " years",
    };
  },
  mounted() {
    this.user();
  },
  methods: {
    //If each variable isn't individually set, the object you return keeps shuffling
    //And then by not setting it will not work only 1/10 times
    user: async function () {
      const docKey = this.route.params.id;
      let user = await getSingleFysio(docKey);

      this.id = user.id ? user.id : "No user id";
      this.name = user.name ? user.name: "No username";
      this.email = user.email ? user.email: "No user email";
      this.role = user.role ? user.role: "No role";
    },
  },
};
</script>

<style scoped>
.profile-wrapper {
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.userIcon {
  font-size: 4rem;
  color: #0275d8;
  width: 100%;
}

.profile {
  width: 90%;
  max-width: 320px;
  background: #323232;
  text-align: center;
  padding: 15px 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  color: #fff;
}

.top-icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.profileInformation h2 {
  font-weight: 500;
  font-size: 22px;
  margin-top: 20px;
}

.profileInformation p {
  font-size: 12px;
}

.button {
  display: inline-block;
  padding: 10px 40px;
  margin: 20px 0;
  color: white;
  border: none;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
  background: #0275d8;
  font-size: 15px;
  text-decoration: none;
}

.button:hover {
  background: #024e91;
}

.social-media {
  display: flex;
  justify-content: space-around;
}

.social-media img {
  width: 30px;
  border-radius: 20%;
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
