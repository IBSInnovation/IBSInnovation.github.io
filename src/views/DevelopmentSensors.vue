Register.vue - base vue
<template>
  <nav-bar-top></nav-bar-top>
  <h1>XsensDotSensor Development</h1>

  <div class="flexWrapper">
    <div class="sensorButtons1">
      <button @click="goToSelectSensor">Connect</button>
      <button @click="sync">Synchronize</button>
      <button @click="identify">Identify device</button>
    </div>

    <div class="info_container">
      <table>
        <tr>
          <td class="header_name"><b>Device name</b></td>
          <td>
            <div class="table_data">{{ device_name }}</div>
          </td>
        </tr>
        <tr>
          <td class="header_name"><b>Battery level</b></td>
          <td>
            <div class="table_data">{{ batterylevel }}</div>
          </td>
        </tr>
        <tr>
          <td class="header_name"><b>Sensor status</b></td>
          <td>
            <div class="table_data">{{ sensorstatus }}</div>
          </td>
        </tr>
        <tr>
          <td class="header_name"><b>x-axis</b></td>
          <td>
            <div class="table_data">{{ x }}</div>
          </td>
        </tr>
        <tr>
          <td class="header_name"><b>y-axis</b></td>
          <td>
            <div class="table_data">{{ x }}</div>
          </td>
        </tr>
        <tr>
          <td class="header_name"><b>z-axis</b></td>
          <td>
            <div class="table_data">{{ z }}</div>
          </td>
        </tr>
        <tr>
          <td class="header_name"><b>Biggest angle</b></td>
          <td>
            <div class="table_data">{{ angle }}</div>
          </td>
        </tr>
      </table>
    </div>

    <div class="sensorButtons2">
      <button @click="startDataExport">Export data</button>
      <button @click="streamData">Start streaming</button>
      <button @click="stopDataStream">Stop streaming</button>
    </div>
  </div>

  <!-- <input
    type="text"
    name="device name"
    placeholder=" Enter new device name"
    :value="device_name"
    @change="updateDeviceName"
  /> -->

  <!-- <div class="x-axis">X: {{ x }}</div>
  <div class="y-axis">Y: {{ y }}</div>
  <div class="z-axis">Z: {{ z }}</div>
  <div class="biggest-angle">Biggest angle: {{ angle }}</div> -->

  <footer>
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
      x: 0,
      y: 0,
      z: 0,
      batterylevel: 0,
      device_name: "",
      sensorstatus: "",
      angle: null,
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
    let XsensDotSensor = this.sensorHandler.getSensor();

    if (XsensDotSensor != null) {
      this.batterylevel = XsensDotSensor.battery_level;
      this.x = XsensDotSensor.rotation.x;
      this.y = XsensDotSensor.rotation.y;
      this.z = XsensDotSensor.rotation.z;
      this.device_name = XsensDotSensor.device_name;
      this.sensorstatus = XsensDotSensor.sensor_status;
      this.angle = XsensDotSensor.max_angle;
    }
  },
  methods: {
    goToSelectSensor() {
      this.$router.push({ name: "selectSensor" });
    },
    disconnect() {
      this.sensorHandler.disconnectSensor();
    },
    sync() {
      this.sensorHandler.getSyncStatusSensor();
    },
    identify() {
      this.sensorHandler.blinkDeviceLED();
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
  display: flex;
  gap: 4em;
  flex-wrap: wrap-reverse;
  margin-left: 5%;
}

.sensorButtons1,
.sensorButtons2 {
  display: flex;
  flex-direction: column;
  gap: 2em;
  flex-wrap: wrap;
}

.sensorButtons2 {
  position: absolute;
  bottom: 0;
  margin-bottom: 1em;
  z-index: 1;
}

button {
  border: 1px solid #e43a23;
  border-radius: 18px;
  background-color: #e43a23;
  padding-top: 0.5rem;
  padding-bottom: 0.5em;
  color: white;
  border: none;
  font-weight: bolder;
  width: 130px;
}

.info_container {
  height: 50%;
  background: white;
  border-radius: 15px;
  width: 300px;
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
}

@media screen and (max-height: 900px), screen and (max-width: 500px) {
  .flexWrapper {
    gap: 2em;
  }
}
</style>
