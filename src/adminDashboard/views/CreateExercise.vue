<template>
  <div className="container">
    <form ref="createExerciseForm" @submit.prevent="createExerciseFunction">
      <h2>Create Exercise</h2>

      <div className="input-field">
        <input type="text" id="name" required placeholder="Name Exercise" />
      </div>

      <div className="input-field">
        <input type="number" id="amountSen" required placeholder="Amount of Sensors" />
      </div>

      <div className="input-field">
        <textarea rows="2" cols="23" id="description" required placeholder="Description..."></textarea>
      </div>

      <div className="steps-header">
        <h3>Add Steps</h3>
        <a className="addInput" href="#" @click.prevent="addInput()">&plus;</a>
      </div>

      <div id="input-group">
        <div className="flex input-field">
          <input type="text" id="steps" required placeholder="Step" />
          <a className="bttn" type="button">X</a>
        </div>
      </div>

      <div className="actionButtons">
        <button className="bttn" type="submit">Create</button>
      </div>

    </form>
  </div>
</template>

<script>
import { createExercise } from "../../db/fdb";

export default {
  name: "createExercise",
  methods: {

    createExerciseFunction() {
      const name = document.querySelector("#name").value;
      const amountSen = document.querySelector("#amountSen").value;
      const description = document.querySelector("#description").value;
      const steps = [];

      var elements = document.querySelectorAll("#steps")

      for (var i = 0, element; element = elements[i++];) {
        if (element.value !== "") steps.push(element.value);
      }

      createExercise(name, amountSen, description, steps)
      this.$refs.createExerciseForm.reset();
    },

    addInput() {
      const inputDivSelector = document.querySelector("#input-group");

      const step = document.createElement("input");
      step.type = "text"
      step.placeholder = "Step"
      step.id = "steps"
      step.required = true;

      const btn = document.createElement("button");
      btn.innerHTML = "X"
      btn.type = "button"
      btn.classList.add("bttn")
      btn.onclick = function () {
        this.parentElement.remove();
      }

      const flexDiv = document.createElement("div");
      flexDiv.classList.add("flex");
      flexDiv.classList.add("input-field");

      inputDivSelector.appendChild(flexDiv);
      flexDiv.appendChild(step);
      flexDiv.appendChild(btn);
    },
  }
}
</script>

<style scoped>
.container {
  position: relative;
  text-align: center;
  background: #323232;
  width: 22rem;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
}

:deep(.input-field) {
  width: 100%;
  padding-bottom: 15px;
  outline: none;
  font-size: 19px;
}

:deep(.bttn) {
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: center;
  border-radius: 18px;
  background-color: #e43a23;
  color: white;
  border: none;
  margin-left: auto;
  width: 100px;
}

:deep(.bttn:focus,
.bttn:focus-within,
.bttn:hover) {
  background: #d3322c;
}

.steps-header {
  justify-content: space-between;
  display: flex;
  border-bottom: 2px solid #fff;
  margin-bottom: 10px;
}

:deep(.flex) {
  display: flex;
  gap: 0.5em;
  justify-content: space-between;
}

.addInput {
  text-decoration: none;
  height: 24px;
  width: 24px;
  display: inline-block;
  background-color: #e43a23;
  border-radius: 18px;
  color: white;
  font-size: 24px;
  line-height: 24px;
}
</style>