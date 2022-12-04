<template>
  <div :style="blurrStyle()">
    <nav-bar-top></nav-bar-top>

    <h1 class="title">{{ capitalizeString(route.params.category) }}</h1>
    <main>
      <div class="result_container">
        <b>Meest recente metingen </b>
        <movement-percentage-in-time
          :data-prop="graphResults"
        ></movement-percentage-in-time>
      </div>

      <div class="recent_results">
        <b>Recente resultaten in vergelijking tot de norm</b>
        <table>
          <tr>
            <th>Datum</th>
            <th>Beweging (graden)</th>
            <th>Vergeleken tot de norm i</th>
          </tr>
          <!-- {{
            JSON.stringify(results)
          }} -->
          <template v-for="result in results" :key="result">
            <!-- <template v-for="(obj2, pos2) in obj" :key="pos2"> -->
            <tr>
              <td>{{ result.date }}</td>
              <td>{{ result.beweging }}°</td>
              <td>{{ result.norm }}%</td>
            </tr>
            <!-- </template> -->
          </template>
        </table>
      </div>
    </main>

    <footer>
      <button class="addMeasurement" @click="addMeasurement()">
        <b>Nieuwe meting</b>
      </button>

      <button class="delete_categoryBtn" @click="showDeleteForm">
        <b>Verwijder categorie</b>
      </button>
      <BackButton></BackButton>
    </footer>
  </div>
  <DeleteForm
    v-if="showForm"
    @close="closeForm"
    @delete="deleteCategory"
  ></DeleteForm>
</template>

<script>
import NavBarTop from "../components/navigation/NavBarTop.vue";
import MovementPercentageInTime from "../components/charts/MovementPercentageInTime.vue";
import DeleteForm from "../components/forms/DeleteForm.vue";
import { deleteCategory, getCategoryResults } from "@/db/fdb";
import { useRoute } from "vue-router";
import { capitalizeString } from "../service/CapitalizeString";
import BackButton from "../components/buttons/BackButton.vue";

export default {
  name: "ExerciseResults",
  components: {
    NavBarTop,
    MovementPercentageInTime,
    DeleteForm,
    BackButton,
  },

  data() {
    return {
      results: [],
      graphResults: [],
      showForm: false,
      route: useRoute(),
      routeName: "",
    };
  },
  mounted() {
    this.getCategoryResults();
    console.log(this.route.params.category);
  },

  methods: {
    async getCategoryResults() {
      let docIdPatient = this.route.params.name;
      let docIdCategory = this.route.params.category;
      const getCategoryResultsConst = await getCategoryResults(
        docIdPatient,
        docIdCategory
      );
      const results = getCategoryResultsConst.results;
      this.routeName = getCategoryResultsConst.name;

      if (typeof results !== "undefined") {
        this.graphResults = results.reduce((res, val) => {
          res[val.date] = val.beweging;
          return res;
        }, {});

        this.results = results;
      }

      // this.graphResults = this.results;
    },
    addMeasurement() {
      let name = this.route.params.name;
      let category = this.route.params.category;
      this.$router.push({
        name: "measureInfo",
        params: { name: name, category: category },
      });
    },
    capitalizeString,
    deleteCategory() {
      let docIdPatient = this.route.params.name;
      let docIdCategory = this.route.params.category;
      deleteCategory(docIdPatient, docIdCategory);

      this.$router.push({
        name: "patient",
        params: { name: docIdPatient },
      });
    },
    blurrStyle() {
      if (this.showForm) {
        return "filter: blur(24px); opacity: 0.6;";
      } else {
        return "";
      }
    },
    showDeleteForm(event) {
      event.stopPropagation();
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.errorMessage = "";
    },
  },
};
</script>

<style scoped>
main {
  padding-bottom: 5em;
}

@media screen and (max-width: 800px), screen and (max-height: 800px) {
  main {
    padding-bottom: 8em;
  }
}

.page_container {
  position: relative;
  overflow: none;
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

/* result graph*/
.result_container {
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

/* recent results */
.recent_results {
  margin-top: 1%;
  height: 50%;
  margin-right: 5%;
  margin-left: 5%;
  background: white;
  width: 90%;
  border-radius: 15px;
  padding-bottom: 1em;
  padding-left: 1em;
  padding-right: 1em;
  margin-bottom: 1em;
}

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
td {
  width: 40%;
}
th {
  border: 2px solid #00a1e1;
  padding-left: 1%;
}

/* buttons */
.addMeasurement,
.delete_categoryBtn {
  border: 1px solid #e43a23;
  border-radius: 18px;
  background-color: #e43a23;
  padding-top: 0.5rem;
  padding-bottom: 0.5em;
  color: white;
  border: none;
}

.addMeasurement,
.delete_categoryBtn {
  width: 200px;
}

.addMeasurement:hover,
.addMeasurement:focus,
.delete_categoryBtn:hover,
.delete_categoryBtn:focus {
  background: #d3322c;
  border: none;
}

/* footer */

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
