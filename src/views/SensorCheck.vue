<template>
  <NavBarTop></NavBarTop>

  <main id="fullPage">
    <h1 class="title">Sensor check</h1>

    <div class="sensorBox">
      <p>Selecteer maximaal {{ sensorsNeeded }} sensoren</p>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Naam</th>
            <th>Batterij niveau</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sensor in sensors" :key="sensor.device_name">
            <td>
              <input
                id="flexCheckDefault"
                v-model="selected"
                class="form-check-input"
                type="checkbox"
                :value="sensor"
                :disabled="
                  selected.length >= sensorsNeeded &&
                  selected.indexOf(sensor) === -1
                "
              />
            </td>
            <td>{{ sensor.device_name }}</td>
            <td>{{ sensor.battery_level }}</td>
          </tr>
        </tbody>
      </table>
      <div class="dropdown">
        <button class="dropbtn">{{ measureMethod }}</button>
        <div class="dropdown-content">
          <a @click="chooseMeasureMethod(1)">Hoek in graden</a>
          <a @click="chooseMeasureMethod(2)">Snelheid beweging</a>
        </div>
      </div>
    </div>
  </main>

  <footer>
    <button class="selectSensorButton" @click="selectSensor()">
      <b>Selecteer sensors</b></button
    ><BackButton></BackButton>
  </footer>
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
      measureMethod: "Selecteer methode",
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
      const patientId = this.$route.params.name;
      const category = this.$route.params.category;

      //Hier zou je de meet methode kunnen verwerken in de route,
      // en gebaseerd op de meetmethode de measure pagina kunnen aanpassen

      this.$router.push({
        name: "measure",
        params: {
          name: patientId,
          category: category,
        },
      });
    },

    selectSensor() {
      let proxyToArray = JSON.parse(JSON.stringify(this.selected));
      const deviceNames = [];
      // check if enough sensors selected
      if (proxyToArray.length < this.sensorsNeeded) {
        window.alert(`Selecteer minimaal ${this.sensorsNeeded} sensor(en)`);
      } else {
        for (let i = 0; i < proxyToArray.length; i++) {
          // console.log(proxyToArray[i].device_name);
          deviceNames.push(proxyToArray[i].device_name);
        }

        this.$store.commit("setSelectedSensors", deviceNames);

        this.goToMeasureStart();
      }
    },

    chooseMeasureMethod(measureMethod) {
      switch (measureMethod) {
        case 1:
          this.measureMethod = "hoek in graden";
          break;
        case 2:
          this.measureMethod = "snelheid beweging";
          break;
      }
    },
  },
};
</script>

<style>
#fullPage {
  margin-left: 5%;
  margin-right: 5%;
  padding-bottom: 80px;
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

.selectSensorButton {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  width: 200px;
  background-color: #0275d8;
  color: #f8f9fa;
  border-radius: 15px;
  border: none;
}

.dropbtn {
  background-color: #0275d8;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #336184;
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
