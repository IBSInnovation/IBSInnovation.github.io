import XsensDot from "./xSensDot";
import FakeXSensDot from "../../test/fakeXSensDot";

class SensorHandler {
  constructor() {}

  sensorMap = new Map();

  giveFakeOrRealSensor() {
    switch (localStorage.getItem("development")) {
      case "true":
        console.log("Using a fake sensor");
        return new FakeXSensDot();
      case "false":
        return new XsensDot();
    }
  }

  clearList() {
    this.sensorMap.clear();
  }

  //returned voor nu 1 enkele sensor
  // startRTStream breekt nu, omdat er een device_name meegegeven moet worden
  // dit moet nog dynamisch gemaakt worden, nu ff de methode gecheesed zodat ie t met 1 sensor wel nog doet.
  getSensor(device_name) {
    if (this.sensorMap.size == 1) {
      return this.sensorMap.get(Array.from(this.sensorMap.keys())[0]);
    } else {
      return this.sensorMap.get(device_name);
    }
  }

  getAllSensors() {
    return Array.from(this.sensorMap);
  }

  addToSensorList(sensor) {
    this.sensorMap.set(sensor.device_name, sensor);
  }

  removeFromSensorList(sensor) {
    this.sensorMap.delete(sensor.device_name);
  }

  connectToSensor() {
    const sensor = this.giveFakeOrRealSensor();
    console.log(sensor);
    return sensor
      .findAndConnect()
      .then(() => {
        this.addToSensorList(sensor);
        return Promise.resolve();
      })
      .catch(() => {
        return Promise.reject();
      });
  }

  disconnectSensor(device_name) {
    const sensor = this.getSensor(device_name);
    sensor.disconnect();
    this.removeFromSensorList(sensor);
  }

  diconnectAllSensors() {
    for (let sensor of this.sensorMap.values()) {
      sensor.disconnect();
    }
  }

  enoughConnectedSensors(sensorsNeeded) {
    if (this.sensorMap.size < sensorsNeeded) {
      console.log("There are not enough sensors properly connected");
      return false;
    }
    return true;
  }

  streamMultipleSensors(device_names) {
    for (let i = 0; i < device_names.length; i++) {
      this.startRTStream(device_names[i]);
    }
  }

  stopStreamMultipleSensors(device_names) {
    for (let i = 0; i < device_names.length; i++) {
      this.stopRTStream(device_names[i]);
    }
  }

  startRTStream(device_name) {
    this.getSensor(device_name).startRTStream();
  }

  stopRTStream(device_name) {
    this.getSensor(device_name).stopRTStream();
  }

  getMaxAngle(device_name) {
    return this.getSensor(device_name).max_angle;
  }

  getSyncStatusSensor(device_name) {
    this.getSensor(device_name).getSyncStatusSensor();
  }

  blinkDeviceLED(device_name) {
    this.getSensor(device_name).blinkDeviceLED();
  }

  downloadDataToCSV(device_name) {
    this.getSensor(device_name).downloadDataToCSV();
  }

  writeDeviceName(name) {
    this.getSensor().writeDeviceName(name);
  }
}

export default new SensorHandler();
