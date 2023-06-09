<template>
  <main @click="checkClickOutside">
    <div :style="blurrStyle()">
      <NavBarTop></NavBarTop>

      <h1 class="title">{{ name }}</h1>

      <div class="info_container">
        <b>Patiënt gegevens</b>
        <table>
          <tr>
            <td class="header_name"><b class="table_content">Naam </b></td>
            <td>
              <div class="table_data">{{ name }}</div>
            </td>
          </tr>
          <tr>
            <td class="header_name"><b>E-mail</b></td>
            <td>
              <div class="table_data">{{ email }}</div>
            </td>
          </tr>
          <tr>
            <td class="header_name"><b>Gewicht</b></td>
            <td>
              <div class="table_data">{{ weight }} kg</div>
            </td>
          </tr>
          <tr>
            <td class="header_name"><b>Lengte</b></td>
            <td>
              <div class="table_data">{{ heightInM }} m</div>
            </td>
          </tr>
          <tr>
            <td class="header_name"><b>Geslacht</b></td>
            <td>
              <div class="table_data">{{ gender }}</div>
            </td>
          </tr>
          <tr>
            <td class="header_name"><b>Leeftijd</b></td>
            <td>
              <div class="table_data">{{ age }} jaar</div>
            </td>
          </tr>
        </table>
      </div>

      <div class="categoryContainer">
        <template v-for="[name] in categories" :key="name.id">
          <div class="category">
            <div class="text-holder">
              <div style="max-width: 100%; word-break: break-word">
                <b>{{ capitalizeString(name) }}</b>
              </div>
              <!-- <p>Laatste meting: {{ category.lastMeasure }}</p> -->
            </div>
            <!-- TOO set param for patient -> category -> results -->
            <button
              :disabled="showFormDelete || showFormEdit"
              class="see-results"
              @click="goToExerciseResults(name)"
            >
              Bekijk
            </button>
          </div>
        </template>
      </div>

      <footer>
        <button
          :disabled="showFormDelete || showFormEdit"
          class="addCategory"
          @click="goToCategory()"
        >
          <b>Categorie toevoegen</b>
        </button>
        <button
          :disabled="showFormDelete || showFormEdit"
          class="editButton"
          @click="showEditForm"
        >
          <b>Gegevens aanpassen</b>
        </button>

        <button
          :disabled="showFormDelete || showFormEdit"
          class="deletePatientBtn"
          @click="showDeleteForm"
        >
          <b>Verwijder patiënt</b>
        </button>
        <button
          :disabled="showFormDelete || showFormEdit"
          class="deletePatientBtn"
          @click="downloadFile()"
        >
          <b>Download CSV</b>
        </button>

        <BackButton :disabled="showFormDelete || showFormEdit"></BackButton>
      </footer>
    </div>
    <DeleteForm
      v-if="showFormDelete && !showFormEdit"
      @delete="deletePatientWithFireStore"
      @close="closeForm"
    ></DeleteForm>
    <EditForm
      v-if="showFormEdit && !showFormDelete"
      @edit="editPatient"
      @close="closeForm"
    ></EditForm>
  </main>
</template>

<script>
import NavBarTop from "../components/navigation/NavBarTop.vue";
import { formatBirthDateToAge } from "@/service/calculators/AgeCalculator";
import { getSinglePatient, deletePatient, getCategories } from "@/db/fdb";
import { useRoute } from "vue-router";
import DeleteForm from "../components/forms/DeleteForm.vue";
import EditForm from "../components/forms/EditPatientForm.vue";
import { capitalizeString } from "../service/CapitalizeString";
import BackButton from "../components/buttons/BackButton.vue";
import userApiStore from "../store/userApiStore";

export default {
  name: "PatientInfo",
  components: {
    NavBarTop,
    DeleteForm,
    EditForm,
    BackButton,
  },
  data() {
    return {
      name: "",
      weight: null,
      age: "",
      heightInM: null,
      patients: null,
      categories: null,
      showFormDelete: false,
      showFormEdit: false,
      gender: "",
      email: "",
      fysio: this.$store.getters.getUser.uid,
      route: useRoute(),
      patientID: null,
    };
  },

  mounted() {
    this.getPatientData();
    this.getCategories();
  },

  methods: {
    downloadFile(id) {
      axios({
        url: `http://localhost:8080/mqtt/csv/${id}`,
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", id + ".json");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    },
    async getCategories() {
      const docIdPatient = this.route.params.name;
      let categories = await getCategories(docIdPatient);
      this.categories = categories;
    },
    async getPatientData() {
      const docKey = this.route.params.name;
      let patient = await getSinglePatient(docKey);
      this.$store.commit("setPatientName", patient.name);
      this.$store.commit("setPatientEmail", patient.email);
      this.$store.commit("setPatientWeight", patient.weight);
      this.$store.commit("setPatientLength", patient.heightInM);
      this.$store.commit("setPatientGender", patient.gender);
      this.$store.commit("setPatientBirthdate", patient.dateOfBirth);
      this.name = patient.name;
      this.weight = patient.weight;
      this.age = formatBirthDateToAge(patient.dateOfBirth);
      this.heightInM = patient.heightInM;
      this.email = patient.email;
      this.gender = patient.gender;
    },
    deletePatientWithFireStore() {
      let docKey = this.route.params.name;
      deletePatient(docKey);
      this.$router.push({ name: "patients" });
    },
    goToExerciseResults(category) {
      let docKey = this.route.params.name;
      this.$router.push({
        name: "exerciseResults",
        params: { name: docKey, category: category },
      });
    },
    capitalizeString,
    goToCategory() {
      const name = this.route.params.name;
      this.$router.push({
        name: "addCategorie",
        params: { name: name },
      });
    },
    blurrStyle() {
      if (this.showFormDelete | this.showFormEdit) {
        let style = "filter: blur(24px); opacity: 0.6;";
        return style;
      } else {
        return "";
      }
    },
    showDeleteForm(event) {
      event.stopPropagation();
      this.showFormDelete = true;
    },
    showEditForm(event) {
      event.stopPropagation();
      window.scrollTo(0, 0);
      this.showFormEdit = true;
    },
    closeForm() {
      this.showFormDelete = false;
      this.showFormEdit = false;
      this.errorMessage = "";
      this.getPatientData();
      return;
    },
    checkClickOutside(event) {
      if (!event.target.closest(".form")) {
        this.closeForm();
      }
    },
    editPatient() {
      this.closeForm();
    },
  },
};
</script>

<style scoped>
main {
  padding-bottom: 50px;
  min-height: 100vh;
}
.title {
  color: white;
  margin-bottom: 2%;
  margin-top: 2%;
  margin-right: 10%;
  margin-left: 10%;
  font-size: 2.5em;
  width: 80%;
  text-align: center;
}

.info_container {
  margin-top: 1%;
  height: 50%;
  margin-right: 5%;
  margin-left: 5%;
  background: white;
  width: 90%;
  border-radius: 15px;
  padding-bottom: 1rem;
  padding-left: 1rem;
  margin-bottom: 2rem;
}

/* patient data */

tr td {
  border: 2px solid #00a1e1;
  padding-left: 1%;
  margin-right: 100px;
}
table {
  table-layout: fixed;
  width: 98%;
  margin-right: 2%;
}

.header_name {
  padding-left: 1%;
  width: 110px;
}
.table_content {
  margin-right: 70px;
}

.table_data {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.categoryContainer {
  display: grid;
  column-gap: 6em;
  row-gap: 2em;
  grid-template-columns: repeat(auto-fill, minmax(280px, 350px));
  margin-right: 5%;
  margin-left: 5%;
  margin-bottom: 3em;
}

.category {
  background: white;
  padding: 1em;
  border-radius: 1em;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}
.text-holder {
  display: block;
}
/* buttons */
.see-results {
  background-color: #0275d8;
  color: white;
  width: 200px;
  font-weight: bold;
  border-radius: 15px;
  border: none;
  padding: 1rem;
}
.see-results:hover,
.see-results:focus {
  background: #04359e;
  border: none;
}

.backBtn,
.addCategory,
.editButton,
.deletePatientBtn {
  border: 1px solid #e43a23;
  border-radius: 18px;
  background-color: #e43a23;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  color: white;
  border: none;
}

.addCategory,
.editButton,
.deletePatientBtn {
  width: 200px;
}

.editButton:hover,
.editButton:focus,
.deletePatientBtn:hover,
.deletePatientBtn:focus,
.addCategory:hover,
.addCategory:focus {
  background: #d3322c;
  border: none;
}

@media screen and (max-height: 800px), screen and (max-width: 800px) {
  .categoryContainer {
    margin-bottom: 10em;
  }
}

footer {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  padding-left: 5%;
  position: fixed;
  bottom: 0;
  padding-top: 1.5em;
  padding-bottom: 1em;
  width: 100%;
  background: #1b2235;
}
</style>
