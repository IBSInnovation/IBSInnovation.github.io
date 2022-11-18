<template>
  <form class="form">
    <h3><b>Patiënt gegevens aanpassen</b></h3>
    <Form
      ref="editForm"
      :validation-schema="schema"
      @submit="editPatientWithFireStore"
    >
      <div class="form-group">
        <label for="email" style="font-weight: bold">Email</label>
        <Field name="email" type="email" class="form-control" />
        <ErrorMessage name="email" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="naam" style="font-weight: bold">Naam</label>
        <Field name="naam" type="name" class="form-control" />
        <ErrorMessage name="naam" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="gewicht" style="font-weight: bold">Gewicht (kg)</label>
        <Field name="gewicht" type="numeric" class="form-control" />
        <ErrorMessage name="gewicht" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="lengte" style="font-weight: bold">Lengte (m)</label>
        <Field name="lengte" type="numeric" class="form-control" />
        <ErrorMessage name="lengte" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="geslacht" style="font-weight: bold">Geslacht</label>
        <Field name="geslacht" type="name" class="form-control" as="select">
          <option value="Man">Man</option>
          <option value="Vrouw">Vrouw</option>
          <option value="Anders">Anders</option>
          <option value="Wil ik liever niet zeggen">
            Wil ik liever niet zeggen
          </option>
        </Field>
        <ErrorMessage name="geslacht" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="date" style="font-weight: bold">Geboorte datum</label>
        <Field name="date" type="date" class="form-control" />
        <ErrorMessage name="date" class="error-feedback" />
      </div>
      <div id="submit_btn_cover">
        <button class="registerButton" style="font-weight: bold">
          <b>Opslaan</b>
        </button>
      </div>
    </Form>
    <button class="returnButton" @click="goBackToPatient()">
      <b>Terug</b>
    </button>
    <div v-if="firebaseError !== ''" id="errorText">{{ firebaseError }}</div>

    <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
      {{ message }}
    </div>
  </form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { editPatient } from "@/db/fdb.js";

import * as yup from "yup";
import { useRoute } from "vue-router";
export default {
  name: "EditPatientForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    firebaseError: {
      type: String,
      default: "",
    },
  },
  emits: ["close"],
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .required("Dit veld is verplicht")
        .email("Email is ongeldig")
        .max(50, "Karakter limiet bereikt"),
      naam: yup
        .string()
        .required("Dit veld is verplicht")
        .max(50, "Karakter limiet bereikt"),
      geslacht: yup
        .string()
        .required("Dit veld is verplicht")
        .max(50, "Karakter limiet bereikt"),
      gewicht: yup
        .number()
        .required("Dit veld is verplicht")
        .lessThan(700, "Voer een valide gewicht in")
        .typeError("Dit veld is verplicht"),
      date: yup
        .string()
        .required("Dit veld is verplicht")
        .max(50, "Karakter limiet bereikt"),
      lengte: yup
        .number()
        .required("Dit veld is verplicht")
        .lessThan(2.5, "Voer een valide lengte in")
        .moreThan(0, "Voer een valide lengte in")
        .typeError("Dit veld is verplicht"),
    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      route: useRoute(),
      age: "",
    };
  },
  mounted() {
    // Fill edit form with current patient info from the store
    this.$refs.editForm.setValues({
      email: this.$store.getters.getPatientEmail,
      naam: this.$store.getters.getPatientName,
      gewicht: this.$store.getters.getPatientWeight,
      lengte: this.$store.getters.getPatientLength,
      geslacht: this.$store.getters.getPatientGender,
      date: this.$store.getters.getPatientBirthdate,
    });
  },

  methods: {
    goBackToPatient() {
      this.$emit("close");
    },

    editPatientWithFireStore(patient) {
      const docKey = this.route.params.name;

      editPatient(
        docKey,
        patient.naam,
        patient.gewicht,
        patient.date,
        patient.lengte,
        patient.email,
        patient.geslacht
      );

      this.goBackToPatient();
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
body,
input,
button {
  font-family: "segeo UI", Tahoma, Geneva, Verdana, sans-serif;
}

body:before {
  content: "";
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  filter: blur(24px);
  opacity: 0.3;
  z-index: 1;
}

.form {
  position: absolute;
  top: 60%;
  right: 0;
  left: 0;
  background-color: #fff;
  width: 350px;
  padding: 40px;
  margin: 0 auto;
  transform: translateY(-60%);
  box-shadow: 0 10px 20px -5px #ccc;
}

h3 {
  color: #e6302b;
  font-size: 30px;
  margin: 0 0 40px 0;
}

label {
  display: block;
  cursor: pointer;
  font-size: 1.2em;
}

.input_box {
  margin-bottom: 20px;
}
#tnc_text {
  font-size: 14px;
}

#submit_btn_cover {
  margin-top: 40px;
}

.returnButton {
  display: block;
  width: 100%;
  color: #fff;
  background-color: #e6302b;
  border-radius: 2px;
  border: 0;
  font-size: 18px;
  font-weight: bold;
  padding: 16px 16px 18px 16px;
}

.returnButton:hover {
  background: #d3322c;
  border: none;
}

.registerButton {
  display: block;
  width: 100%;
  color: #fff;
  background-color: #0275d8;
  border-radius: 2px;
  border: 0;
  font-size: 18px;
  font-weight: bold;
  padding: 16px 16px 18px 16px;
  margin-bottom: 1rem;
}

.registerButton:hover {
  background: #0161b6;
  border: none;
}

.form-control {
  display: block;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  background-color: #f1f2f3;
  border-radius: 2px;
  border: 0;
  box-sizing: border-box;
}

.form-group {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
