<template>
  <div id="screen">
    <nav-bar-top></nav-bar-top>
    <h1 class="title">Koppel sensor</h1>

    <div class="info_container">
      <p class="boxTitle">Een sensor koppelen</p>
      <p>1. Klik op 'Koppel sensor' hieronder</p>
      <p>2. Klik op de sensor die u wilt verbinden</p>
      <p>3. Klik op verbinden</p>
    </div>

    <button class="connectSensorButton" @click="connectSensor()">
      <b>Koppel sensor</b>
    </button>

    <div v-show="loading">
      <p class="loadingTitle">Connecting...</p>
      <scale-loader
        :loading="loading"
        :color="color"
        :height="height"
        :width="width"
      ></scale-loader>
    </div>

    <button
      v-if="visible"
      class="connectSensorButton"
      @click="doornaarmeting()"
    >
      <b>Door naar meting</b>
    </button>

    <footer><BackButton></BackButton></footer>
  </div>
</template>

<script>
import BackButton from "../components/buttons/BackButton.vue";
import NavBarTop from "../components/navigation/NavBarTop.vue";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  name: "SelectSensor",
  components: {
    NavBarTop,
    BackButton,
    ScaleLoader,
  },
  inject: ["sensorHandler"],
  data() {
    return {
      loading: false,
      color: "#0275d8",
      height: "50px",
      width: "6px",
      visible: false,
    };
  },
  mounted() {
    window.onclick = function () {
      if (this.loading) {
        this.loading = false;
      }
    };
  },

  methods: {
    // Function copied from https://masteringjs.io/tutorials/fundamentals/wait-1-second-then#:~:text=To%20delay%20a%20function%20execution,call%20fn%20after%201%20second.
    delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    connectSensor() {
      this.loading = true;
      this.delay(2500).then(() => this.connect());
    },
    connect() {
      this.sensorHandler.connectToSensor().then(() => {
        return new Promise((resolve) => {
          this.loading = false;
          this.enoughSensorsCheck();
          resolve();
        });
      });
    },
    enoughSensorsCheck() {
      if (
        this.sensorHandler.getAllSensors().length >=
        this.$route.params.sensorsNeeded
      ) {
        this.visible = true;
      }
    },
    doornaarmeting() {
      this.$router.push({
        name: "sensorCheck",
        params: {
          name: this.$route.params.name,
          category: this.$route.params.category,
          sensorsNeeded: this.$route.params.sensorsNeeded,
        },
      });
    },
  },
};
</script>

<style scoped>
.page_container {
  position: relative;
  overflow: none;
}

.loadText {
  color: white;
  position: absolute;
  font-size: 3em;
  margin-top: 70%;
  margin-left: 30%;
  z-index: 1;
}

.title {
  color: white;
  margin: 2% 10%;
  font-size: 2.5em;
  width: 80%;
  text-align: center;
}

.boxTitle {
  padding-top: 3%;
  padding-left: 3%;
  font-weight: bold;
  font-size: 1.5em;
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

/* buttons */

.connectSensorButton {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  width: 200px;
  background-color: #0275d8;
  color: #f8f9fa;
  border-radius: 15px;
  border: none;
}

.connectSensorButton:hover {
  background: #0161b6;
  border: none;
}

.loadingTitle {
  text-align: center;
  color: #f8f9fa;
  font-weight: bold;
  font-size: 1.5em;
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
