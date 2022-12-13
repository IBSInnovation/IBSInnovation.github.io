<template>
  <button class="backBtn" @click="$router.go(-1)">
    <b>Terug</b>
  </button>
</template>

<script>
export default {
  name: "BackButton",
};
</script>

<style scoped>
.backBtn {
  border-radius: 18px;
  background-color: #e43a23;
  margin-right: 5.3%;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  color: white;
  border: none;
  margin-left: auto;
  width: 100px;
}
.backBtn:hover,
.backBtn:focus {
  background: #d3322c;
}
</style>
