import { XsensDotSensor } from "./bluetooth";
import store from "../store/userStore.js";

class sensorHandler {
  constructor() {}
  createSensor() {
    return XsensDotSensor;
  }

  addToStore(sensor) {
    let sensorList = store.getters.getSensors;
    sensorList.push(sensor);
    store.commit("setSensorList", sensorList);
  }

  removeFromStore(sensor) {
    let sensorList = store.getters.getSensors;
    const index = sensorList.indexOf(sensor);
    if (index > -1) {
      sensorList.splice(index, 1);
    }
    store.commit("setSensorList", sensorList);
  }

  getSensor() {
    //voor nu hebben we maar 1 sensor
    const sensors = store.getters.getSensors;
    if (sensors.length > 0) {
      return store.getters.getSensors.indexOf(0);
    }
    return this.addToStore(this.createSensor());
  }
}

let sensorService = new sensorHandler();
export { sensorService };
