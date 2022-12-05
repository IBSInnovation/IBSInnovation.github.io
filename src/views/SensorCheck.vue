<template>
  <NavBarTop></NavBarTop>

  <main id="fullPage">
    <h1 class="title">Sensor check</h1>

    <div class="sensorBox">
      <template v-for="sensor in sensors" :key="sensor.device_name">
        <div>{{ sensor.device_name }}</div>
      </template>
    </div>
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
      sensors: [],
    };
  },
  created() {
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
  margin-right: 5%;
  margin-left: 5%;
  background: white;
  border-radius: 15px;
  padding: 1em;
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
