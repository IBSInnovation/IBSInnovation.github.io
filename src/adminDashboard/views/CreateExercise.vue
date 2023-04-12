<template>
  <div className="container">
    <form action="">
      <h2>Create Exercise</h2>

      <div className="input-field">
        <input type="text" required placeholder="Name Exercise" />
      </div>

      <div className="input-field">
        <input type="number" required placeholder="Amount of Sensors" />
      </div>

      <div className="input-field">
        <textarea rows="2" cols="23" required placeholder="Description..."></textarea>
      </div>

      <div className="input-field">
        <input type="text" required placeholder="Step 1" />
      </div>
      <div className="input-field">
        <input type="text" required placeholder="Step 2" />
      </div>
      <div className="input-field">
        <input type="text" required placeholder="Step 3" />
      </div>

      <div>
        <button className="btn" type="submit"> Update </button>
      </div>

    </form>
  </div>
</template>

<script>

export default {
  name: "createExercise",

};
</script>

<style scoped>
.container {
  position: relative;
  text-align: center;
  background: #323232;
  width: 25%;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  padding: 60px 40px;
}

.input-field {
  width: 100%;
  padding-bottom: 15px;
  outline: none;
  font-size: 19px;
  transition: .4s;
}

.btn {
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

.btn:hover,
.btn:focus {
  background: #d3322c;
}
</style>