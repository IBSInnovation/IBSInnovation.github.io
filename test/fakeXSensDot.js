import * as THREE from "three";

export default class FakeXSensDot {
  constructor() {
    this.device = this.#createFakeDevice();
    this.device_name = "fakeSensor";
    this.sensor_status = "disconnected";
    this.battery_level = 100;
    this.max_angle = 15.57;
    this.rotation = new THREE.Euler(0, 0, 0, "XYZ");
  }

  #createFakeDevice() {
    return { field1: "field1", field2: "field2" };
  }

  disconnect() {
    return Promise.resolve();
  }

  findAndConnect() {
    this.sensor_status = "online";
    return Promise.resolve();
  }

  writeDeviceName(name) {
    this.device_name = name;
    console.log("changed name to " + name);
    return Promise.resolve();
  }

  blinkDeviceLED() {
    console.log("Blinking LED...");
    return Promise.resolve();
  }

  downloadDataToCSV() {
    console.log("You just downloaded a CSV file");
    return Promise.resolve();
  }

  getSyncStatusSensor() {
    console.log("You just synced your sensor");
    return Promise.resolve();
  }

  startRTStream() {
    console.log("You started streaming for data");
    return Promise.resolve();
  }

  stopRTStream() {
    console.log("You stopped streaming for data");
    return Promise.resolve();
  }
}
