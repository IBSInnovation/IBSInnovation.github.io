// Register.vue - base vue
<template>
  <div class="fullPage" @click="checkClickOutside">
    <div class="background">
      <img
        class="background-image"
        alt="hogeschool utrecht achtergrond"
        src="@/assets/stockImages/huImage.jpg"
      />
    </div>
    <div class="registerButtons">
      <img class="logo" alt="hogeschool utrecht logo" src="@/assets/logo.png" />

      <p class="main-text">Sensor technologie voor de fysiotherapeut</p>

      <GoogleLoginButton
        tabindex="0"
        @keyup.enter="RegisterWithGoogle()"
        @click="RegisterWithGoogle()"
      ></GoogleLoginButton>

      <EmailLoginButton
        tabindex="0"
        @keyup.enter="showLogForm"
        @click="showLogForm"
      ></EmailLoginButton>
      <p class="acountText">HEB JE NOG GEEN ACCOUNT?</p>
      <p>
        <button
          :disabled="showForm || showLoginForm"
          class="registerBtn"
          @click="showRegisterForm"
        >
          Registreer
        </button>
      </p>
      <RegisterForm
        v-if="showForm && !showLoginForm"
        :firebaseError="authenticationErrorFromRegister"
        @send="registerWithEmail"
        @close="closeForm"
      ></RegisterForm>
      <LoginForm
        v-if="showLoginForm"
        :error-message="errorMessage"
        @send="login"
        @close="closeForm"
      ></LoginForm>
    </div>
  </div>
</template>

<script>
import GoogleLoginButton from "../components/buttons/GoogleLoginButton.vue";
import EmailLoginButton from "../components/buttons/EmailLoginButton.vue";
import RegisterForm from "../components/forms/RegisterForm.vue";
import LoginForm from "../components/forms/LoginForm.vue";
import {
  registerWithEmail,
  login,
  RegisterWithGoogle,
} from "../db/firebaseAuth.js";
import router from "../router";

export default {
  name: "RegisterUser",
  components: {
    GoogleLoginButton,
    EmailLoginButton,
    RegisterForm,
    LoginForm,
  },
  data() {
    return {
      showForm: false,
      showLoginForm: false,
      showGoogleForm: false,
      user: null,
      errorMessage: "",
      registerMessage: "",
      authenticationErrorFromRegister: "",
    };
  },
  methods: {
    showLogForm(event) {
      if (!this.showForm && !this.showGoogleForm) {
        event.stopPropagation();
        this.showLoginForm = true;
      }
    },
    showRegisterForm(event) {
      if (!this.showLoginForm && !this.showGoogleForm) {
        event.stopPropagation();
        this.showForm = true;
      }
    },
    closeForm() {
      this.showForm = false;
      this.showLoginForm = false;
      this.errorMessage = "";
    },
    checkClickOutside(event) {
      if (!event.target.closest(".form")) {
        this.closeForm();
      }
    },
    RegisterWithGoogle() {
      if (!this.showLoginForm && !this.showForm) {
        this.showGoogleForm = true;
        RegisterWithGoogle();
      }
    },
    registerWithEmail(value) {
      registerWithEmail(value).then(() => {
        router.push({ path: "/patients" });
      });
    },
    login(value) {
      login(value)
        .then(() => {
          router.push({ path: "/patients" });
        })
        .catch((data) => {
          window.alert(data.error);
        });
    },
  },
};
</script>

<style scoped>
.fullPage {
  width: 100vw;
  height: 100vh;
  background-color: inherit;
}

.main-text {
  color: white;
  margin-top: 1em;
  margin-bottom: 1em;
  font-size: 2em;
  padding: 5px;
}

.background {
  grid-area: background;
  height: 100%;
  width: 100%;
  float: left;
  margin: 0;
  padding: 0;
}

.background-image {
  height: 100vh;
  width: 100vw;
  background-size: contain;
  object-fit: cover;
}

.registerButtons {
  position: relative;
  width: 800px;
  height: 100vh;
  overflow: auto;
  margin-left: -800px;
  margin-right: 0px;
  background: #1b2236;
  float: left;
  padding: 90px 150px 50px 100px;
}

.logo {
  max-width: 100%;
  height: auto;
  margin-top: 3em;
}

.registerBtn {
  margin: 10px;
  display: inline-block;
  width: 240px;
  height: 50px;
  background-color: #e6302b;
  color: #fff;
  border-radius: 15px;
  border: none;
  font-size: 16px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
}

.registerBtn:hover {
  cursor: pointer;
  -webkit-box-shadow: 0 0 3px 3px rgba(66, 133, 244, 0.3);
  box-shadow: 0 0 3px 3px rgba(66, 133, 244, 0.3);
  background: #d3322c;
}

.acountText {
  color: white;
  margin: 1em 0em 0;
}

@media screen and (max-height: 800px), screen and (max-width: 800px) {
  .background {
    display: none;
  }

  .registerButtons {
    all: revert;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10%;
    gap: 1em;
  }
}
</style>
