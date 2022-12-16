<script>
export default {
  name: "App",
  inject: ["sensorHandler"],
  mounted() {
    window.addEventListener("beforeunload", () => {
      this.sensorHandler.diconnectAllSensors();
    });
  },
};
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #1b2235;
  scroll-behavior: smooth;
}
</style>
