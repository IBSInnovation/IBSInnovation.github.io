Register.vue - base vue
<template>
  <nav-bar-top></nav-bar-top>
  <h1>XsensDotSensor Development</h1>

  <div class="sensorButtons1">
    <button class="red-btn" @click="goToSelectSensor">Connect</button>
    <button class="red-btn" @click="sync">Synchronize</button>
  </div>

  <div class="flexWrapper">
    <template v-for="sensor in sensors" :key="sensor.device_name">
      <div class="sensorCard">
        <div class="info_container">
          <table>
            <tr>
              <td class="header_name"><b>Device name</b></td>
              <td>
                <div class="table_data">{{ sensor.device_name }}</div>
              </td>
            </tr>
            <tr>
              <td class="header_name"><b>Battery level</b></td>
              <td>
                <div class="table_data">{{ sensor.battery_level }}</div>
              </td>
            </tr>
            <tr>
              <td class="header_name"><b>Sensor status</b></td>
              <td>
                <div class="table_data">{{ sensor.sensorstatus }}</div>
              </td>
            </tr>
            <tr>
              <td class="header_name"><b>x-axis</b></td>
              <td>
                <div class="table_data">{{ sensor.x }}</div>
              </td>
            </tr>
            <tr>
              <td class="header_name"><b>y-axis</b></td>
              <td>
                <div class="table_data">{{ sensor.y }}</div>
              </td>
            </tr>
            <tr>
              <td class="header_name"><b>z-axis</b></td>
              <td>
                <div class="table_data">{{ sensor.z }}</div>
              </td>
            </tr>
            <tr>
              <td class="header_name"><b>Biggest angle</b></td>
              <td>
                <div class="table_data">{{ sensor.angle }}</div>
              </td>
            </tr>
          </table>
        </div>
        <button class="blue-btn" @click="identify">Identify device</button>
        <button class="red-btn" @click="disconnect">Disconnect</button>
      </div>
    </template>
  </div>

  <!-- <input
    type="text"
    name="device name"
    placeholder=" Enter new device name"
    :value="device_name"
    @change="updateDeviceName"
  /> -->

  <footer>
    <button
      id="show-btn"
      class="red-btn"
      type="button"
      aria-label="Toggle navigation"
      @click="showButtons"
    >
      Show buttons
    </button>
    <div id="buttonGroup" ref="buttonGroup">
      <button class="red-btn" @click="streamData">Start streaming</button>
      <button class="red-btn" @click="stopDataStream">Stop streaming</button>
      <button class="red-btn" @click="startDataExport">Export data</button>
    </div>
    <BackButton></BackButton>
  </footer>
</template>

<script>
import NavBarTop from "../components/navigation/NavBarTop.vue";
import BackButton from "../components/buttons/BackButton.vue";

export default {
  name: "DevelopmentSensors",
  components: {
    NavBarTop,
    BackButton,
  },
  inject: ["sensorHandler"],
  data() {
    return {
      showButtonsBoolean: false,
      sensors: [],
    };
  },
  watch: {
    "XsensDotSensor.device_name": {
      handler(newName) {
        this.device_name = newName;
      },
      deep: true,
    },
    "XsensDotSensor.sensor_status": {
      handler(newStatus) {
        this.sensorstatus = newStatus;
      },
      deep: true,
    },
    "XsensDotSensor.max_angle": {
      handler(newAngle) {
        this.angle = newAngle;
      },
      deep: true,
    },
    "XsensDotSensor.battery_level": {
      handler(newBattery) {
        this.batterylevel = newBattery;
      },
      deep: true,
    },
    "XsensDotSensor.rotation": {
      handler(newRotation) {
        if (newRotation == undefined) {
          return;
        }
        this.x = (newRotation.x * 57.2957795).toFixed(2);
        this.y = (newRotation.y * 57.2957795).toFixed(2);
        this.z = (newRotation.z * 57.2957795).toFixed(2);
      },
      deep: true,
    },
  },
  created() {
    window.addEventListener("beforeunload", this.handler);
    const allSensors = this.sensorHandler.getAllSensors();

    for (let i = 0; i < allSensors.length; i++) {
      const sensor = {};
      sensor.device_name = allSensors[i][1].device_name;
      sensor.battery_level = allSensors[i][1].battery_level;
      sensor.x = allSensors[i][1].rotation._x;
      sensor.y = allSensors[i][1].rotation._y;
      sensor.z = allSensors[i][1].rotation._z;
      sensor.sensorstatus = allSensors[i][1].sensor_status;
      sensor.angle = allSensors[i][1].max_angle;

      this.sensors.push(sensor);
    }
  },
  methods: {
    goToSelectSensor() {
      this.$router.push({ name: "selectSensor" });
    },
    disconnect(event) {
      this.sensorHandler.disconnectSensor(this.getSensorName(event));
      this.removeSensorFromArray(this.getSensorName(event));
    },
    sync() {
      this.sensorHandler.getSyncStatusSensor();
    },
    identify(event) {
      this.sensorHandler.blinkDeviceLED(this.getSensorName(event));
    },
    startDataExport() {
      this.sensorHandler.downloadDataToCSV();
    },
    streamData() {
      this.sensorHandler.startRTStream();
    },
    stopDataStream() {
      this.sensorHandler.stopRTStream();
    },
    updateDeviceName(e) {
      this.sensorHandler.writeDeviceName(e.target.value.trim());
    },
    clearList() {
      this.sensorHandler.clearList();
    },
    showButtons() {
      if (this.showButtonsBoolean != true) {
        this.$refs.buttonGroup.style =
          "display: flex; position: absolute; bottom: 0; margin-bottom: 4em; z-index: 1; ";
        this.showButtonsBoolean = true;
      } else {
        this.$refs.buttonGroup.style = "display: none";
        this.showButtonsBoolean = false;
      }
    },
    /* 
    Deze functie is nu zo, om de device_name uit het element te halen
    Moet veranderd worden als er echte sensor gebruikt wordt,
    werkt wss alleen met fake sensor
    */
    getSensorName(event) {
      // return event.target.parentElement.firstChild.firstChild.firstChild.lastChild
      //     .textContent;
      return parseInt(
        event.target.parentElement.firstChild.firstChild.firstChild.lastChild
          .textContent
      );
    },
    /* 
    Deze functie haalt de sensor uit de array, zodat vue automatisch het component herlaadt, 
    het kan niet door de pagina te reloaden, want dan zijn alle sensoren weg.
    */
    removeSensorFromArray(device_name) {
      const indexOfObject = this.sensors.findIndex((object) => {
        return object.device_name === device_name;
      });
      this.sensors.splice(indexOfObject, 1);
    },
  },
};
</script>

<style scoped>
h1 {
  color: white;
  text-align: center;
  margin: 1em;
}

.flexWrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
  gap: 2em;
  margin-right: 5%;
  margin-left: 5%;
  padding-bottom: 80px;
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

.sensorButtons1 {
  position: absolute;
  top: 5.25em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  flex-wrap: wrap;
  margin-left: 5%;
  margin-bottom: 2em;
}

#show-btn {
  position: fixed;
  bottom: 0;
  margin-bottom: 1em;
  z-index: 1;
  display: none;
}

#buttonGroup {
  display: flex;
  flex-direction: row;
  gap: 1em;
  flex-wrap: wrap;
  position: absolute !important;
}

.red-btn {
  border-radius: 18px;
  background-color: #e43a23;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  color: white;
  border: none;
  font-weight: bolder;
  width: 130px;
}

.red-btn:hover {
  background: #d3322c;
}

.blue-btn {
  border-radius: 18px;
  background-color: #0275d8;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  color: white;
  border: none;
  font-weight: bolder;
  width: 130px;
}

.blue-btn:hover {
  background: #0161b6;
}

.info_container {
  background: white;
  border-radius: 15px;
  align-items: center;
  display: flex;
}

tr td {
  border: 2px solid #1b2235;
  padding-left: 1%;
  margin-right: 100px;
}
table {
  table-layout: fixed;
  width: 100%;
  border-radius: 20px;
}

.header_name {
  padding-left: 1%;
  width: 130px;
}

.table_data {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

@media screen and (max-height: 800px), screen and (max-width: 600px) {
  h1 {
    margin: 0.5em;
  }
  .flexWrapper {
    gap: 2em;
  }

  .sensorButtons1 {
    gap: 1em;
  }

  #show-btn {
    display: block;
  }

  #buttonGroup {
    display: none;
    gap: 0.5em;
    max-width: 200px;
  }

  .sensorButtons1 {
    position: static;
    top: 12em;
    flex-direction: row;
    margin-bottom: 1em;
    justify-content: center;
    margin-left: 0;
  }
}
</style>
