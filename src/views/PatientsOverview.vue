<template>
  <div class="vh" @click="checkClickOutside">
    <div :style="blurrStyle()">
      <NavBarTop></NavBarTop>

      <h1 class="title">Patiënten</h1>

      <main>
        <template v-for="[docKey, patient] in patients" :key="patient">
          <div class="patient" @click="goToPatient(docKey)">
            <i class="bi bi-person-square userIcon"></i>
            <div class="patient-text-holder">
              <p>
                <b>{{ patient.name }} </b>
              </p>
              <p class="text">
                {{ patient.email }}
              </p>
            </div>
            <button
              :disabled="showForm"
              class="seeResultsButton"
              @click="goToPatient(docKey)"
            >
              <b> Ga naar patiënt</b>
            </button>
          </div>
        </template>
      </main>

      <footer>
        <button
          :disabled="showForm"
          class="addPatientButton"
          @click="showPatientForm"
        >
          <b>Patiënt toevoegen</b>
        </button>
      </footer>
    </div>
    <PatientForm v-if="showForm" @close="closeForm"></PatientForm>
  </div>
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
      patients: null,
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
      window.scrollTo(0, 0);
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
    checkClickOutside(event) {
      console.log(event.target);
      if (!event.target.closest(".form")) {
        this.closeForm();
      }
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 400px));
  margin: 0 5% 2rem;
  padding-bottom: 70px;
}

.vh {
  min-height: 100vh;
}

.title {
  color: white;
  margin-bottom: 2%;
  margin-top: 2%;
  margin-right: 25%;
  margin-left: 25%;
  font-size: 2.5em;
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
  color: white;
  padding: 1em;
  border: 1px solid white;
  border-radius: 0.5em;
  display: flex;
  flex-wrap: wrap;
}

.patient:hover {
  transform: scale(1.1);
  z-index: 3;
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
.seeResultsButton:hover,
.addPatientButton:focus,
.addPatientButton:hover {
  background: #04359e;
  border: none;
}

.addPatientButton {
  border: none;
  background: #0275d8;
  color: white;
  border: none;
  padding: 0.5em 2em;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
}

footer {
  display: flex;
  position: fixed;
  justify-content: center;
  bottom: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  background-color: #1b2235;
}

.userIcon {
  font-size: 4rem;
  color: #0275d8;
  width: 100%;
}
</style>
