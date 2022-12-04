<template>
  <NavBarTop></NavBarTop>

  <!-- //! is not dynamic yet -->
  <h1 class="title">Meet</h1>
  <!-- //! graph has to be installed and used -->
  <div class="info_container">
    <b>Meet resultaten</b>
    <table>
      <tr>
        <td class="header_name"><b class="table_content">Tijd (m:s:ms) </b></td>
        <td>
          <span id="minutes">{{ minutes }}:</span>
          <span id="seconds">{{ seconds }}:</span>
          <span id="milliseconds">{{ miliseconds }}</span>
        </td>
      </tr>
      <tr>
        <td class="header_name"><b>Beweging (graden) </b></td>
        <td>{{ maxAngle }}°</td>
      </tr>
      <tr>
        <td class="header_name"><b>Procent van de norm </b></td>
        <td>{{ norm }}%</td>
      </tr>
    </table>

    <button id="button1" class="measureButtonBlue" @click="measure()">
      <b>{{ button1text }}</b>
    </button>

    <button
      id="button2"
      class="measureButtonBlue"
      style="margin-top: 0.5rem; display: none"
      @click="saveMeasurement()"
    >
      <b>Sla meting op</b>
    </button>

    <button
      id="button3"
      class="measureButtonRed"
      style="margin-top: 0.5rem; display: none"
      @click="deleteMeasurement()"
    >
      <b>Verwijder meting</b>
    </button>
  </div>

  <div style="margin-top: 80px"></div>
  <footer><BackButton></BackButton></footer>
</template>

<script>
import NavBarTop from "../components/navigation/NavBarTop.vue";
import { addResultToCategory, getSinglePatient } from "../db/fdb";
import { useRoute } from "vue-router";
import jsonMovementData from "/src/service/movement_data.json";
import { formatBirthDateToAge } from "../service/calculators/AgeCalculator";
import BackButton from "../components/buttons/BackButton.vue";

var measureState = "idle";
var timer;

export default {
  name: "MeasureStart",
  components: {
    NavBarTop,
    BackButton,
  },
  inject: ["sensorHandler"],
  data() {
    return {
      miliseconds: 0,
      seconds: 0,
      minutes: 0,
      maxAngle: 0.0,
      route: useRoute(),
      button1text: "Start meting",
      norm: 0.0,
      patient: null,
    };
  },
  methods: {
    async saveMeasurement() {
      if (this.maxAngle > 0) {
        let docIdPatient = this.route.params.name;
        let docIdCategory = this.route.params.category;
        await addResultToCategory(
          docIdPatient,
          docIdCategory,
          this.maxAngle,
          this.norm
        );
        this.$router.push({ name: "exerciseResults", params: {} });
      }
    },
    deleteMeasurement() {
      this.$router.push({ name: "exerciseResults", params: {} });
    },

    //bron: https://dev.to/walternascimentobarroso/creating-a-timer-with-javascript-8b7
    updateTimer() {
      if ((this.miliseconds += 10) == 1000) {
        this.miliseconds = 0;
        this.seconds++;
      }
      if (this.seconds == 60) {
        this.seconds = 0;
        this.minutes++;
      }
    },

    async measure() {
      if (measureState == "idle") {
        this.sensorHandler.startRTStream();

        document
          .getElementById("button1")
          .classList.toggle("measureButtonBlue");
        document.getElementById("button1").classList.toggle("measureButtonRed");
        this.button1text = "Stop meting";

        clearInterval(timer);
        timer = setInterval(() => {
          this.updateTimer();
        }, 10);

        measureState = "measuring";
      } else if (measureState == "measuring") {
        document
          .getElementById("button1")
          .classList.toggle("measureButtonBlue");
        document.getElementById("button1").classList.toggle("measureButtonRed");
        this.button1text = "Begin opnieuw";

        document.getElementById("button2").style =
          "margin-top: 0.5rem; display: inline";
        document.getElementById("button3").style =
          "margin-top: 0.5rem; display: inline";

        clearInterval(timer);
        measureState = "results";

        await this.sensorHandler.stopRTStream();

        const docKey = this.route.params.name;
        let patient = await getSinglePatient(docKey);

        const category = this.route.params.category;
        let TMPnorm = 0;
        let age = formatBirthDateToAge(patient.dateOfBirth);

        let gender = String(patient.gender).toLocaleLowerCase();

        if (age <= 8) {
          age = "2-8";
        } else if (age <= 19) {
          age = "9-19";
        } else if (age <= 44) {
          age = "20-44";
        } else {
          age = "45+";
        }

        switch (category) {
          case "elleboog-flexie-extensie-rechts":
          case "elleboog-flexie-extensie-links":
            TMPnorm = jsonMovementData["elleboog-flexie-extensie"][gender][age];
            break;
          case "heup-extensie-links":
          case "heup-extensie-rechts":
            TMPnorm = jsonMovementData["heup-extensie"][gender][age];
            break;
          case "heup-flexie-links":
          case "heup-flexie-rechts":
            TMPnorm = jsonMovementData["heup-flexie"][gender][age];
            break;
          case "knie-extensie-flexie-links":
          case "knie-extensie-flexie-rechts":
            TMPnorm = jsonMovementData["knie-extensie-flexie"][gender][age];
            break;
          case "enkel-dorsaalflexie-links":
          case "enkel-dorsaalflexie-rechts":
            TMPnorm = jsonMovementData["enkel-dorsaalflexie"][gender][age];
            break;
          case "enkel-plantairflexie-links":
          case "enkel-plantairflexie-rechts":
            TMPnorm = jsonMovementData["enkel-plantairflexie"][gender][age];
            break;
          case "shouder-flexie-links":
          case "shouder-flexie-rechts":
            TMPnorm = jsonMovementData["shouder-flexie"][gender][age];
            break;
          case "elleboog-pronatie-links":
          case "elleboog-pronatie-rechts":
            TMPnorm = jsonMovementData["elleboog-pronatie"][gender][age];
            break;
          case "elleboog-supinatie-links":
          case "elleboog-supinatie-rechts":
            TMPnorm = jsonMovementData["elleboog-supinatie"][gender][age];
            break;
        }

        this.maxAngle = this.sensorHandler.getMaxAngle();
        this.norm = ((this.maxAngle / TMPnorm) * 100).toFixed(2);
      } else if (measureState == "results") {
        document.getElementById("button2").style =
          "margin-top: 0.5rem; display: none";
        document.getElementById("button3").style =
          "margin-top: 0.5rem; display: none";
        this.button1text = "Start meting";

        this.miliseconds = 0;
        this.seconds = 0;
        this.minutes = 0;
        clearInterval(timer);

        this.maxAngle = 0.0;
        this.norm = 0.0;
        measureState = "idle";
      }
    },
  },
};
</script>

<style scoped>
.page_container {
  position: relative;
  overflow: none;
}
.title {
  color: white;
  margin-bottom: 3%;
  margin-top: 3%;
  margin-right: 10%;
  margin-left: 10%;
  font-size: 3em;
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
  width: 40%;
}
.table_content {
  margin-right: 100px;
}

/* buttons */

.measureButtonBlue {
  margin-left: 1%;
  margin-top: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 96%;
  background-color: #0275d8;
  color: #f8f9fa;
  border-radius: 15px;
  border: none;
}

.measureButtonBlue:hover,
.measureButtonBlue:focus {
  background: #04359e;
}

.measureButtonRed {
  margin-left: 1%;
  margin-top: 2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 96%;
  background-color: #e6302b;
  color: #f8f9fa;
  border-radius: 15px;
  border: none;
}

.measureButtonRed:hover {
  background: #d3322c;
  border: none;
}
/* footer */

footer {
  display: flex;
  flex-wrap: wrap;
  row-gap: 1em;
  position: fixed;
  bottom: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  background-color: #1b2235;
}
</style>
