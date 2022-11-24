import { XsensDotSensor } from "./bluetooth";

class SensorHandler {
  constructor() {}

  sensorMap = new Map();

  clearList() {
    this.sensorMap.clear();
  }

  //returned voor nu 1 enkele sensor
  getSensor() {
    console.log(this.sensorMap);
    return this.sensorMap.get(Array.from(this.sensorMap.keys())[0]);
  }

  addToSensorList(sensor) {
    this.sensorMap.set(sensor.device_name, sensor);
  }

  removeFromSensorList(sensor) {
    this.sensorMap.delete(sensor.device_name);
  }

  connectToSensor() {
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
    if (this.sensorMap.size < 1) {
      console.log("There are no sensors properly connected");
      return false;
    }
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
