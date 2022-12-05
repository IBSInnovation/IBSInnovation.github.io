<template>
  <NavBarTop></NavBarTop>

  <main id="fullPage">
    <h1 class="title">Sensor check</h1>

    <input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
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
};
</script>

<style>
#fullPage {
  margin-left: 5%;
  margin-right: 5%;
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
