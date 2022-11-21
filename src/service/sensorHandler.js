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
    return null;
  }

  isConnected() {
    return true;
  }
}

let sensorService = new sensorHandler();
export { sensorService };
