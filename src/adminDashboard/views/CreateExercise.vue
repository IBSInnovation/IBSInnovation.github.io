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

      <div className="input-field" id="input-group">
        <input type="text" required placeholder="Step" />
      </div>
      <a className="addInput" href="#" @click.prevent="addInput()">&plus;</a>

      <div>
        <button className="createbtn" type="submit"> Create </button>
      </div>

    </form>
  </div>
</template>

<script>

export default {
  name: "createExercise",
  methods: {
    addInput() {
      const inputDivSelector = document.querySelector("#input-group");

      const step = document.createElement("input");
      step.type = "text"
      step.placeholder = "Step"
      step.required

      // const btn = document.createElement("a");
      // btn.innerHTML = "Remove"
      // btn.className = "delete"

      inputDivSelector.appendChild(step);
      inputDivSelector.appendChild(btn);
    },
  }
}
</script>

<style scoped>
.container {
  position: relative;
  text-align: center;
  background: #323232;
  width: 20%;
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

.createbtn,
.delete {
  justify-content: center;
  border-radius: 18px;
  background-color: #e43a23;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  color: white;
  border: none;
  margin-left: auto;
  width: 100px;
}

.createbtn,
.delete:hover,
.createbtn,
.delete:focus {
  background: #d3322c;
}

.addInput {
  text-decoration: none;
  height: 24px;
  width: 24px;
  display: inline-block;
  background-color: gray;
  border-radius: 18px;
  color: white;
  font-size: 24px;
  line-height: 24px;
  margin-bottom: 15px;
}
</style>