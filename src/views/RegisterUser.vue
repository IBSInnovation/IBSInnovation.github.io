// Register.vue - base vue
<template>
  <div class="container" :style="blurrStyle()" @click="closeForm()">
    <img class="logo" alt="hogeschool utrecht logo" src="@/assets/logo.png" />

    <p class="main-text">Sensor technologie voor de fysiotherapeut</p>

    <GoogleLoginButton @click="RegisterWithGoogle()"></GoogleLoginButton>

    <EmailLoginButton @click="showLogForm"></EmailLoginButton>
    <p class="acountText">HEB JE NOG GEEN ACCOUNT?</p>
    <p>
      <button class="registerBtn" @click="showRegisterForm">Registreer</button>
    </p>
  </div>
  <RegisterForm
    v-if="showForm && !showLoginForm"
    :firebase-error="firebaseErrorFromRegister"
    @send="registerWithEmail"
    @close="closeForm"
  ></RegisterForm>
  <LoginForm
    v-if="showLoginForm"
    :error-message="errorMessage"
    @send="login"
    @close="closeForm"
  ></LoginForm>
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
      user: null,
      showLoginForm: false,
      errorMessage: "",
      registerMessage: "",
      firebaseErrorFromRegister: "",
    };
  },
  methods: {
    showLogForm(event) {
      event.stopPropagation();
      this.showLoginForm = true;
    },
    showRegisterForm(event) {
      event.stopPropagation();
      this.showForm = true;
    },
    blurrStyle() {
      if (this.showForm || this.showLoginForm) {
        let style = "filter: blur(24px); opacity: 0.6;";
        return style;
      } else {
        return "";
      }
    },
    closeForm() {
      this.showForm = false;
      this.showLoginForm = false;
      this.errorMessage = "";

      return;
    },
    RegisterWithGoogle() {
      RegisterWithGoogle();
    },

    registerWithEmail(value) {
      registerWithEmail(value).then((data) => {
        this.firebaseErrorFromRegister = data.error;
      });
    },

    login(value) {
      login(value).then((data) => {
        this.errorMessage = data.error;
      });
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}
.title {
  margin-top: 1em;
}
.main-text {
  color: white;
  /* font-weight: bold; */
  margin-top: 1em;
  margin-bottom: 1em;
  font-size: 2em;
  padding: 5px;
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
</style>
