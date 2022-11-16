<template>
  <div :style="blurrStyle()">
    <NavBarTop></NavBarTop>

    <h1 class="title">Patiënten</h1>

    <main>
      <template v-for="[docKey, patient] in patients" :key="patient">
        <div class="patient">
          <i class="bi bi-person-square userIcon"></i>
          <div class="patient-text-holder">
            <p>
              <b>{{ patient.name }} </b>
            </p>
            <p class="text">
              {{ patient.email }}
            </p>
          </div>
          <button class="seeResultsButton" @click="goToPatient(docKey)">
            <b> Ga naar patiënt</b>
          </button>
        </div>
      </template>
    </main>

    <div style="margin-top: 80px"></div>
    <footer>
      <button class="addPatientButton" @click="showPatientForm">
        <b>Patiënt toevoegen</b>
      </button>
    </footer>
  </div>
  <PatientForm
    v-if="showForm && !showLoginForm"
    @send="registerWithEmail"
    @close="closeForm"
  ></PatientForm>
</template>

<script>
import NavBarTop from "../components/navigation/NavBarTop.vue";
import { getPatients } from "../db/fdb";
import PatientForm from "../components/forms/RegisterPatientForm.vue";

export default {
  name: "PatientsOverview",
  components: {
    NavBarTop,
    PatientForm,
  },
  data() {
    return {
      showForm: false,
      user: null,
      showLoginForm: false,
      patients: null,
      newPatientForm: false,
    };
  },
  mounted() {
    this.getPatientsFromFireStore();
  },
  methods: {
    async getPatientsFromFireStore() {
      let uid = this.$store.getters.getUser.uid;

      await getPatients(uid).then((results) => {
        this.patients = results;
      });
    },
    goToPatient(docKey) {
      this.$router.push({
        name: "patient",
        params: { name: docKey },
      });
    },
    showPatientForm(event) {
      event.stopPropagation();
      this.showForm = true;
    },
    blurrStyle() {
      if (this.showForm) {
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
      this.getPatientsFromFireStore(); // Show newly added patients
      return;
    },

    addNewPatient() {
      this.$router.push({ name: "registerPatient" });
    },
  },
};
</script>

<style scoped>
main {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(232px, 1fr));
  margin: 0 2rem 2rem 2rem;
}
.title {
  color: white;
  margin-bottom: 3%;
  margin-top: 3%;
  margin-right: 25%;
  margin-left: 25%;
  font-size: 3em;
  width: 50%;
  text-align: center;
}
p {
  margin: 0;
  color: black;
  word-break: break-word;
}
.patient {
  cursor: pointer;
  background: white;
  padding: 1em;
  border: 1px solid white;
  color: white;
  border-radius: 1em;
  display: flex;
  flex-wrap: wrap;
}

.patient-text-holder {
  margin: 1em 1em 2em 1em;
}

.text {
  font-size: 1.3em;
}

.seeResultsButton {
  position: relative;
  width: 100%;
  height: 3em;
  bottom: 0.2em;
  background: #0275d8;
  color: white;
  border: none;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
}

.seeResultsButton:focus,
.seeResultsButton:focus-within,
.seeResultsButton:hover {
  background: #0161b6;
  border: none;
}

.addPatientButton {
  flex: 0 0 100%;
  border: none;
  background: #0275d8;
  color: white;
  border: none;
  padding: 0.5em;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
}

footer {
  display: flex;
  position: fixed;
  bottom: 0;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  background-color: #f4f4f4;
}

.userIcon {
  font-size: 4rem;
  color: #0275d8;
  width: 100%;
}
</style>
