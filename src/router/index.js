import { createRouter, createWebHistory } from "vue-router";
import store from "../store/userStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "register",
      component: () => import("../views/RegisterUser.vue"),
    },
    {
      path: "/dev",
      name: "dev",
      component: () => import("../views/DevelopmentSensors.vue"),
    },
    {
      path: "/patients",
      name: "patients",
      component: () => import("../views/PatientsOverview.vue"),
    },
    {
      path: "/patients/:name",
      name: "patient",
      component: () => import("../views/PatientInfo.vue"),
    },
    {
      path: "/registerPatient",
      name: "registerPatient",
      component: () => import("../components/forms/RegisterPatientForm.vue"),
    },
    {
      path: "/:name/:category/exerciseResults",
      name: "exerciseResults",
      component: () => import("../views/ExerciseResults.vue"),
    },
    {
      path: "/selectSensor",
      name: "selectSensor",
      component: () => import("../views/SelectSensor.vue"),
    },
    {
      path: "/:name/:category/measureInfo",
      name: "measureInfo",
      component: () => import("../views/MeasureInfo.vue"),
    },
    {
      path: "/:name/:category/measure",
      name: "measure",
      component: () => import("../views/MeasureStart.vue"),
    },
    {
      path: "/:name/addCategorie",
      name: "addCategorie",
      component: () => import("../views/AddCategorie.vue"),
    },
    {
      path: "/:name/:category/:sensorsNeeded/sensorCheck",
      name: "sensorCheck",
      component: () => import("../views/SensorCheck.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.name !== "register" && !store.getters.isLogedIn)
    return { name: "register" };
});

export default router;
