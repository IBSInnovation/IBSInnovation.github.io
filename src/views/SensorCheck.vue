<template>
  <NavBarTop></NavBarTop>

  <main id="fullPage">
    <h1 class="title">Sensor check</h1>

    <div class="sensorBox">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Naam</th>
            <th>Batterij niveau</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sensor, index) in sensors" :key="sensor.device_name">
            <td>
              <input
                id="flexCheckDefault"
                v-model="selected"
                class="form-check-input"
                type="checkbox"
                :value="sensor.device_name"
                :disabled="
                  selected.length >= sensorsNeeded &&
                  selected.indexOf(index) === -1
                "
              />
            </td>
            <td>{{ sensor.device_name }}</td>
            <td>{{ sensor.battery_level }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <button class="selectSensorButton" @click="selectSensor()">
      <b>Koppel sensor</b>
    </button>
  </main>

  <footer><BackButton></BackButton></footer>
</template>

<script>
import NavBarTop from "../components/navigation/NavBarTop.vue";
import BackButton from "../components/buttons/BackButton.vue";

export default {
  name: "SensorCheck",
  components: {
    NavBarTop,
    BackButton,
  },
  inject: ["sensorHandler"],
  data() {
    return {
      sensorsNeeded: null,
      sensors: [],
      selected: [],
    };
  },
  created() {
    this.sensorsNeeded = parseInt(this.$route.params.sensorsNeeded);

    const allSensors = this.sensorHandler.getAllSensors();
    for (let i = 0; i < allSensors.length; i++) {
      const sensor = {};
      sensor.device_name = allSensors[i][1].device_name;
      sensor.battery_level = allSensors[i][1].battery_level;
      this.sensors.push(sensor);
    }
  },
  methods: {
    goToMeasureStart() {
      const patientId = this.route.params.name;
      const category = this.route.params.category;

      this.$router.push({
        name: "measure",
        params: {
          name: patientId,
          category: category,
        },
      });
    },
    selectSensor() {
      console.log(this.selected);
      this.$store.commit("setSelectedSensors", this.selected);
      // ga verder naar measure
      this.goToMeasureStart();
    },
  },
};
</script>

<style>
#fullPage {
  margin-left: 5%;
  margin-right: 5%;
}

.title {
  color: white;
  margin: 2% 10%;
  font-size: 2.5em;
  width: 80%;
  text-align: center;
}

.sensorBox {
  height: 50%;
  background: white;
  border-radius: 15px;
  padding: 1em;
}

.form-check-label {
  display: flex;
  gap: 1em;
}

.selectSensorButton {
  margin: 2em 0 2em 0;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  width: 200px;
  background-color: #0275d8;
  color: #f8f9fa;
  border-radius: 15px;
  border: none;
}

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
