<template>
  <NavBarTop></NavBarTop>

  <main>
    <!-- //! is not dynamic yet -->
    <h1 class="title">Meet</h1>
    <!-- //! graph has to be installed and used -->
    <div class="info_container">
      <b>Meet resultaten</b>

      <template v-for="sensor in sensorMeasurements" :key="sensor">
        <div class="sensorCard">
          <table>
            <tr>
              <td class="header_name"><b>Device name</b></td>
              <td>
                <div class="table_data">{{ sensor.device_name }}</div>
              </td>
            </tr>
            <tr>
              <td class="header_name">
                <b class="table_content">Tijd (m:s:ms) </b>
              </td>
              <td>
                <span id="minutes">{{ minutes }}:</span>
                <span id="seconds">{{ seconds }}:</span>
                <span id="milliseconds">{{ miliseconds }}</span>
              </td>
            </tr>
            <tr>
              <td class="header_name"><b>Beweging (graden) </b></td>
              <td>{{ sensor.max_angle }}°</td>
            </tr>
            <tr>
              <td class="header_name"><b>Procent van de norm </b></td>
              <td>{{ sensor.norm }}%</td>
            </tr>
          </table>
        </div>
      </template>

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
  </main>

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
      route: useRoute(),
      button1text: "Start meting",
      patient: null,
      sensorMeasurements: [],
    };
  },
  created() {
    this.setSensorMeasurement();
  },
  methods: {
    setSensorMeasurement() {
      this.sensorMeasurements = [];
      let sensorNames = this.$store.getters.getSelectedSensors;
      for (let i = 0; i < sensorNames.length; i++) {
        const sensorData = {};
        sensorData.device_name = sensorNames[i];
        sensorData.max_angle = 0;
        sensorData.norm = 0.0;
        this.sensorMeasurements.push(sensorData);
      }
    },
    updateMeasuredData(TMPnorm) {
      for (let i = 0; i < this.sensorMeasurements.length; i++) {
        const sensor = this.sensorHandler.getSensor(
          this.sensorMeasurements[i].device_name
        );
        this.sensorMeasurements[i].max_angle = sensor.max_angle;
        this.sensorMeasurements[i].norm = (
          (sensor.max_angle / TMPnorm) *
          100
        ).toFixed(2);
      }
    },
    getMeasurements() {
      let measurements = [];
      for (let i = 0; i < this.sensorMeasurements.length; i++) {
        let measurement = {
          max_angle: this.sensorMeasurements[i].max_angle,
          norm: this.sensorMeasurements[i].norm,
        };
        measurements.push(measurement);
      }
      return measurements;
    },
    async saveMeasurement() {
      let docIdPatient = this.route.params.name;
      let docIdCategory = this.route.params.category;
      await addResultToCategory(
        docIdPatient,
        docIdCategory,
        this.getMeasurements()
      );
      this.$router.push({ name: "exerciseResults", params: {} });
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
    getPatientAge(patient) {
      let age = formatBirthDateToAge(patient.dateOfBirth);
      if (age <= 8) {
        return "2-8";
      } else if (age <= 19) {
        return "9-19";
      } else if (age <= 44) {
        return "20-44";
      } else {
        return "45+";
      }
    },
    async calculateTMLnorm() {
      let patient = await getSinglePatient(this.route.params.name);
      let TMPnorm = 0;
      let age = this.getPatientAge(patient);
      let gender = String(patient.gender).toLocaleLowerCase();

      switch (this.route.params.category) {
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
      return TMPnorm;
    },
    async measure() {
      if (measureState == "idle") {
        this.setSensorMeasurement();
        this.sensorHandler.streamMultipleSensors(this.sensorMeasurements);

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

        await this.sensorHandler.stopStreamMultipleSensors(
          this.sensorMeasurements
        );


        let TMPnorm = this.calculateTMLnorm();
        this.updateMeasuredData(TMPnorm);
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
main {
  padding-bottom: 60px;
}
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
.sensorCard {
  display: flex;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  row-gap: 2em;
  column-gap: 1em;
  flex-wrap: wrap;
  justify-content: center;
}

.info_container {
  margin-top: 1%;
  height: 50%;
  margin-right: 5%;
  margin-left: 5%;
  background: white;
  width: 90%;
  border-radius: 15px;
  padding-bottom: 1em;
  padding-left: 1em;
  margin-bottom: 2em;
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

.measureButtonRed:hover,
.measureButtonRed:focus {
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
