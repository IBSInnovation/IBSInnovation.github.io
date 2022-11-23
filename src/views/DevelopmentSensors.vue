Register.vue - base vue
<template>
  <nav-bar-top></nav-bar-top>
  <h1>XsensDotSensor Development</h1>

  <p><button @click="clearList()">clear sensor list</button></p>

  <p><button @click="goToSelectSensor()">connect</button></p>
  <p><button @click="goToSelectSensor()">disconnect</button></p>

  <p><button @click="sync()">synchronize</button></p>
  <input
    type="text"
    name="device name"
    placeholder="enter new device name"
    :value="device_name"
    @change="updateDeviceName"
  />
  <p><button @click="identify()">identify device</button></p>
  <h2>Device name: {{ device_name }}</h2>
  <h2>Battery level: {{ batterylevel }}</h2>
  <h2>Sensor status: {{ sensorstatus }}</h2>
  <p><button @click="startDataExport()">Export data</button></p>
  <p><button @click="streamData()">Start real time streaming</button></p>
  <p><button @click="stopDataStream()">stop real time streaming</button></p>
  <h2>X: {{ x }}</h2>
  <h2>Y: {{ y }}</h2>
  <h2>Z: {{ z }}</h2>
  <h2>Biggest angle: {{ angle }}</h2>
</template>

<script>
import NavBarTop from "../components/navigation/NavBarTop.vue";
import sensorService from "../service/sensorHandler";

export default {
  name: "DevelopmentSensors",
  components: {
    NavBarTop,
  },
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
    let XsensDotSensor = sensorService.getSensor();

    if (XsensDotSensor != null) {
      this.batterylevel = XsensDotSensor.battery_level;
      this.x = XsensDotSensor.rotation.x;
      this.y = XsensDotSensor.rotation.y;
      this.z = XsensDotSensor.rotation.z;
      this.device_name = XsensDotSensor.device_name;
      this.sensorstatus = XsensDotSensor.sensor_status;
    }
  },
  methods: {
    goToSelectSensor() {
      this.$router.push({ name: "selectSensor" });
    },
    sync() {
      sensorService.getSyncStatusSensor();
    },
    identify() {
      sensorService.blinkDeviceLED();
    },
    startDataExport() {
      sensorService.downloadDataToCSV();
    },
    streamData() {
      sensorService.startRTStream();
    },
    stopDataStream() {
      sensorService.stopRTStream();
    },
    updateDeviceName(e) {
      sensorService.writeDeviceName(e.target.value.trim());
    },
    clearList() {
      sensorService.clearList();
    },
  },
};
</script>
<style scoped>
button {
  border: none;
  padding: 5px 5px;
  font-size: 18px;
  cursor: pointer;
  display: inline-block;
  font-weight: bold;
  border-radius: 3px;
}

h1,
h2 {
  color: white;
}

p,
h1,
h2,
button,
input {
  margin: 1em 0 0 1em;
}
</style>
