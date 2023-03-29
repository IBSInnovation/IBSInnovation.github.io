import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import store from "./store/userStore.js";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";
import Chartkick from "chartkick";
Chartkick.configure({ language: "de" });

const firebaseConfig = {
  apiKey: "AIzaSyD5e9LrGSnSUkVs4z-4QZhQD_wM5REeTfY",
  authDomain: "ibs-fysiotherapy.firebaseapp.com",
  projectId: "ibs-fysiotherapy",
  storageBucket: "ibs-fysiotherapy.appspot.com",
  messagingSenderId: "767042773850",
  appId: "1:767042773850:web:c38e45c3058e7d3ab80963",
};

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "mdb-ui-kit";
import "bootstrap-icons/font/bootstrap-icons.css";
import sensorHandler from "./service/sensorHandler";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {faEllipsisVertical, faHeart } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faEllipsisVertical, faHeart)

// Initialize Firebase
initializeApp(firebaseConfig);

let development = "true";
localStorage.setItem("development", development);

getFirestore();
createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .use(VueChartkick)
  .provide("sensorHandler", sensorHandler)
  .mount("#app");
