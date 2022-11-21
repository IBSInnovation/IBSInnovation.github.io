import { XsensDotSensor } from "./bluetooth";
import store from "../store/userStore.js";

class sensorHandler {
  constructor() {}
  createSensor() {
    return XsensDotSensor;
  }

  getSensor() {
    return store.getters.getSensors[0];
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

  connectSensor() {
    const sensor = XsensDotSensor;
    return sensor
      .findAndConnect()
      .then(() => {
        this.addToStore(sensor);
        return Promise.resolve();
      })
      .catch(() => {
        return Promise.reject();
      });
  }

  isConnected() {
    console.log(store.getters.getSensors);
    return true;
  }
}

let sensorService = new sensorHandler();
export { sensorService };
