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

      <div className="steps-header">
        <h3>Add Steps</h3>
        <a className="addInput" href="#" @click.prevent="addInput()">&plus;</a>
      </div>

      <div id="input-group">
        <div className="flex input-field">
          <input type="text" required placeholder="Step" />
          <a className="btn" type="button"> X </a>
        </div>
      </div>

      <div className="actionButtons">
        <button className="btn" type="submit"> Create </button>
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
      step.required = true;

      const btn = document.createElement("button");
      btn.innerHTML = "X"
      btn.type = "button"
      btn.classList.add("btn")
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

:deep(.btn) {
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: center;
  border-radius: 18px;
  background-color: #e43a23;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  color: white;
  border: none;
  margin-left: auto;
  width: 100px;
}

:deep(.btn:hover,
.btn:focus) {
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