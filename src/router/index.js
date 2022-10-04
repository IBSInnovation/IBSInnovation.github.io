import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/feed",
      name: "feed",
      component: () => import("../views/Feed.vue"),
    },
    {
      path: "/patients",
      name: "patients",
      component: () => import("../views/Patients.vue"),
    },
    {
      path: "/patients/:name",
      name: "patient",
      component: () => import("../views/Patient.vue"),
    },
    {
      path: "/newPatient",
      name: "patientCreator",
      component: () => import("../components/forms/PatientCreatorForm.vue"),
    },
    {
      path: "/:name/:category/exerciseResults",
      name: "exerciseResults",
      component: () => import("../views/ExerciseResults.vue"),
    },
    {
      path: "/:name/:category/selectSensor",
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
      component: () => import("../views/Measure.vue"),
    },
    {
      path: "/:name/addCategorie",
      name: "addCategorie",
      component: () => import("../views/AddCategorie.vue"),
    },
  ],
});

export default router;
