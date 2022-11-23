import { deserialize, XsensDotSensor } from "./bluetooth";

class SensorHandler {
  constructor() {
    // this.getSensorListIfExist();
  }

  sensorMap = new Map();

  // getSensorListIfExist() {
  //   let optionalSensorList = localStorage.getItem("sensorList");
  //   if (optionalSensorList != null) {
  //     let jsonSensorList = JSON.parse(optionalSensorList);
  //
  //     for (let i = 0; i < jsonSensorList.length; i++) {
  //       let sensor = deserialize(jsonSensorList[i]);
  //       this.sensorMap.set(sensor.device_name, sensor);
  //     }
  //   }
  // }

  clearList() {
    this.sensorMap.clear();
    // localStorage.setItem("sensorList", JSON.stringify(this.sensorMap));
  }

  //returned voor nu 1 enkele sensor
  getSensor() {
    console.log(this.sensorMap.get(Array.from(this.sensorMap.keys())[0]));
    return this.sensorMap.get(Array.from(this.sensorMap.keys())[0]);
  }

  addToSensorList(sensor) {
    this.sensorMap.set(sensor.device_name, sensor);
    // localStorage.setItem("sensorList", JSON.stringify(this.sensorMap));
  }

  removeFromSensorList(sensor) {
    this.sensorMap.delete(sensor.device_name);
    // localStorage.setItem("sensorList", JSON.stringify(this.sensorMap));
  }

  connectSensor() {
    const sensor = XsensDotSensor;
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

  disconnectSensor() {
    const sensor = this.getSensor();
    sensor.disconnect();
    this.removeFromSensorList(sensor);
  }

  isConnected() {
    this.getSensor();
    return true;
  }

  startRTStream() {
    this.getSensor().startRTStream();
  }

  stopRTStream() {
    this.getSensor().stopRTStream();
  }

  getMaxAngle() {
    return this.getSensor().max_angle;
  }

  getSyncStatusSensor() {
    this.getSensor().getSyncStatusSensor();
  }

  blinkDeviceLED() {
    this.getSensor().blinkDeviceLED();
  }

  downloadDataToCSV() {
    this.getSensor().downloadDataToCSV();
  }

  writeDeviceName(name) {
    this.getSensor().writeDeviceName(name);
  }
}

export default new SensorHandler();
