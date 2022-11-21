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
  border: 1px solid #e43a23;
  border-radius: 18px;
  background-color: #e43a23;
  margin-right: 1em;
  padding-top: 0.5rem;
  padding-bottom: 0.5em;
  color: white;
  border: none;
  margin-left: auto;
  width: 100px;
}
.backBtn:hover {
  background: #d3322c;
  border: none;
}
</style>
