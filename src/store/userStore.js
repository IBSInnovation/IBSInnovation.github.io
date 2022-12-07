import { createApp } from "vue";
import Vuex from "vuex";
import App from "../App.vue";

createApp(App).use(Vuex);
export default new Vuex.Store({
  state: {
    user: "",
    patients: [],
    name: null,
    email: null,
    weight: null,
    length: null,
    gender: null,
    birthdate: null,
    selected_sensors: [],
  },
  getters: {
    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    },
    isLogedIn() {
      return localStorage.getItem("user") !== null;
    },
    getPatientName(state) {
      return state.name;
    },
    getPatientEmail(state) {
      return state.email;
    },
    getPatientWeight(state) {
      return state.weight;
    },
    getPatientLength(state) {
      return state.length;
    },
    getPatientGender(state) {
      return state.gender;
    },
    getPatientBirthdate(state) {
      return state.birthdate;
    },
    getPatientList(state) {
      return state.patients;
    },
    getSelectedSensors(state) {
      return state.selected_sensors;
    },
  },
  mutations: {
    changeProfilePicture(state, photoUrl) {
      state.user.photoUrl = photoUrl;
    },
    setPatientName(state, name) {
      state.name = name;
    },
    setPatientEmail(state, email) {
      state.email = email;
    },
    setPatientWeight(state, weight) {
      state.weight = weight;
    },
    setPatientLength(state, length) {
      state.length = length;
    },
    setPatientGender(state, gender) {
      state.gender = gender;
    },
    setPatientBirthdate(state, birthdate) {
      state.birthdate = birthdate;
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setPatientList(state, patients) {
      state.patients = patients;
    },
    setSelectedSensors(state, selected_sensors) {
      state.selected_sensors = selected_sensors;
    },
  },
  actions: {
    logOutUser(state) {
      state.user = "";
      localStorage.removeItem("user");
      indexedDB.deleteDatabase("firebaseLocalStorageDb");
      state.patientEmail = "";
      localStorage.removeItem("patientEmail");
    },
    deletePatient(state) {
      state.patientEmail = "";
      localStorage.removeItem("patientEmail");
    },
  },
});
