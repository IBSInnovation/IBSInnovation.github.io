<template>
  <nav-bar-top></nav-bar-top>
  <h1 class="title">Meting info</h1>
  <main>
    <div class="info_container">
      <p class="boxTitle">{{ titleText }}</p>
      <img id="infoImage" class="infoImage" />
      <hr class="line" />
      <p>{{ infoBox1 }}</p>
      <p>{{ infoBox2 }}</p>
      <p>{{ infoBox3 }}</p>
      <p>{{ infoBox4 }}</p>

      <div>
        <img
          id="leftArrow"
          class="arrowImageLeft"
          src="/images/empty.png"
          tabindex="0"
          @keyup.enter="previousPanel()"
          @click="previousPanel()"
        />
        <div class="indexText">{{ indexBox }}</div>
        <img
          id="rightArrow"
          class="arrowImageRight"
          src="/images/arrowRight.png"
          tabindex="0"
          @keyup.enter="nextPanel()"
          @click="nextPanel()"
        />
      </div>
    </div>
  </main>

  <footer>
    <button class="connectSensorButton" @click="checkConnectedSensor()">
      <b>Selecteer sensor</b>
    </button>
    <BackButton></BackButton>
  </footer>
</template>

<script>
import { useRoute } from "vue-router";
import BackButton from "../components/buttons/BackButton.vue";
import NavBarTop from "../components/navigation/NavBarTop.vue";

var textIndex = 1;

export default {
  name: "MeasureInfo",
  components: {
    NavBarTop,
    BackButton,
  },
  inject: ["sensorHandler"],
  data() {
    return {
      titleText: "",
      indexBox: "",
      infoBox1: "",
      infoBox2: "",
      infoBox3: "",
      infoBox4: "",
      route: useRoute(),
      categoryMountText1: "",
      categoryMountText2: "",
      categoryMountImage: "",
      categoryActionText1: "",
      categoryActionText2: "",
      categoryActionImage: "",
      sensorsNeeded: null,
    };
  },
  mounted() {
    this.dynamicPanels();
  },

  methods: {
    dynamicPanels() {
      const category = this.route.params.category;
      if (
        category === "elleboog-flexie-extensie-rechts" ||
        category === "elleboog-flexie-extensie-links"
      ) {
        this.categoryMountText1 =
          "Plaats de sensor op de rechter onder arm (zoals afgebeeld)";
        this.categoryMountText2 = "Zorg ervoor dat de sensor stevig vast zit";
        this.categoryMountImage =
          "/images/measureImages/Elbow-flexion-extension1.png";

        this.categoryActionText1 =
          "Zorg dat de patiënt zijn/haar arm zo recht mogelijk strekt";
        this.categoryActionText2 =
          "Laat de patiënt zijn/haar arm zo ver mogelijk terug te laten bewegen (zoals afgebeeld)";
        this.categoryActionImage =
          "/images/measureImages/Elbow-flexion-extension2.png";
        this.sensorsNeeded = 2;
      } else if (
        category === "heup-extensie-links" ||
        category === "heup-extensie-rechts"
      ) {
        this.categoryMountText1 =
          "Plaats de sensor op het been net onder de heup (zoals afgebeeld)";
        this.categoryMountText2 = "Zorg dat de sensor stevig vast zit";
        this.categoryMountImage = "/images/measureImages/Hip-extension1.png";

        this.categoryActionText1 =
          "Zorg dat de patiënt rechtop staat met volledig gestrekte benen";
        this.categoryActionText2 =
          "Laat de patiënt zijn/haar been zo ver mogelijk naar achter bewegen (zoals afgebeeld)";
        this.categoryActionImage = "/images/measureImages/Hip-extension2.png";
        this.sensorsNeeded = 1;
      } else if (
        category === "heup-flexie-links" ||
        category === "heup-flexie-rechts"
      ) {
        this.categoryMountText1 =
          "Plaats de sensor op het been net onder de heup (zoals afgebeeld)";
        this.categoryMountText2 = "Zorg dat de sensor stevig vast zit";
        this.categoryMountImage = "/images/measureImages/Hip-flexion1.png";

        this.categoryActionText1 =
          "Zorg dat de patiënt rechtop staat met volledig gestrekte benen";
        this.categoryActionText2 =
          "Laat de patiënt zijn/haar knie zo hoog mogelijk in de lucht heffen";
        this.categoryActionImage = "/images/measureImages/Hip-flexion2.png";
        this.sensorsNeeded = 3;
      } else if (
        category === "knie-extensie-flexie-links" ||
        category === "knie-extensie-flexie-rechts"
      ) {
        this.categoryMountText1 =
          "Plaats de sensor op het been net onder de knie (zoals afgebeeld)";
        this.categoryMountText2 = "Zorg dat de sensor stevig vast zit";
        this.categoryMountImage =
          "/images/measureImages/Knee-flexion-extension1.png";

        this.categoryActionText1 =
          "Zorg dat de patiënt plat licht met de benen in de lucht";
        this.categoryActionText2 =
          "Laat de patiënt zijn/haar onderbeen zo ver naar achter bewegen (zoals afgebeeld)";
        this.categoryActionImage =
          "/images/measureImages/Knee-flexion-extension2.png";
        this.sensorsNeeded = 1;
      } else if (
        category === "enkel-dorsaalflexie-links" ||
        category === "enkel-dorsaalflexie-rechts"
      ) {
        this.categoryMountText1 =
          "Plaats de sensor op het been net onder de enkel ";
        this.categoryMountText2 = "Zorg dat de sensor stevig vast zit";
        this.categoryMountImage =
          "/images/measureImages/Ankle-dorsiflexion1.png";

        this.categoryActionText1 = "Zorg dat de patiënt stevig recht op staat";
        this.categoryActionText2 =
          "Laat de patiënt zijn/haar voet zo ver mogelijk naar boven bewegen zonder het onderbeen te verplaatsen (zoals afgebeeld)";
        this.categoryActionImage =
          "/images/measureImages/Ankle-dorsiflexion2.png";
        this.sensorsNeeded = 1;
      } else if (
        category === "enkel-plantairflexie-links" ||
        category === "enkel-plantairflexie-rechts"
      ) {
        this.categoryMountText1 =
          "Plaats de sensor op het been net onder de enkel ";
        this.categoryMountText2 = "Zorg dat de sensor stevig vast zit";
        this.categoryMountImage =
          "/images/measureImages/Ankle-plantar-flexion1.png";

        this.categoryActionText1 = "Zorg dat de patiënt stevig recht op staat";
        this.categoryActionText2 =
          "Laat de patiënt zijn/haar voet zo ver mogelijk naar beneden bewegen zonder het onderbeen te verplaatsen (zoals afgebeeld)";
        this.categoryActionImage =
          "/images/measureImages/Ankle-plantar-flexion2.png";
        this.sensorsNeeded = 1;
      } else if (
        category === "shouder-flexie-links" ||
        category === "shouder-flexie-rechts"
      ) {
        this.categoryMountText1 =
          "Plaats de sensor op het bovenarm (zoals afgebeeld)";
        this.categoryMountText2 = "Zorg dat de sensor stevig vast zit";
        this.categoryMountImage = "/images/measureImages/Shoulder-flexion1.png";

        this.categoryActionText1 =
          "Zorg dat de patiënt recht staat met zijn/haar arm strak langs het lichaam";
        this.categoryActionText2 =
          "Laat de patiënt zijn/haar arm zo ver mogelijk naar voren draaien (zoals afgebeeld)";
        this.categoryActionImage =
          "/images/measureImages/Shoulder-flexion2.png";
        this.sensorsNeeded = 1;
      } else if (
        category === "elleboog-pronatie-links" ||
        category === "elleboog-pronatie-rechts"
      ) {
        this.categoryMountText1 =
          "Plaats de sensor op de pols (zoals afgebeeld)";
        this.categoryMountText2 = "Zorg dat de sensor stevig vast zit";
        this.categoryMountImage = "/images/measureImages/Elbow-pronation1.png";

        this.categoryActionText1 =
          "Laat de patiënt zijn zijn/haar hand met de duim boven voor hem/haar houden (zoals afgebeeld)";
        this.categoryActionText2 =
          "Laat de patiënt zijn/haar hand zo ver mogelijk naar rechts draaien (zoals afgebeeld)";
        this.categoryActionImage = "/images/measureImages/Elbow-pronation2.png";
        this.sensorsNeeded = 1;
      } else if (
        category === "elleboog-supinatie-links" ||
        category === "elleboog-supinatie-rechts"
      ) {
        this.categoryMountText1 =
          "Plaats de sensor op de pols (zoals afgebeeld)";
        this.categoryMountText2 = "Zorg dat de sensor stevig vast zit";
        this.categoryMountImage = "/images/measureImages/Elbow-supination1.png";

        this.categoryActionText1 =
          "Laat de patiënt zijn zijn/haar hand met de duim boven voor hem/haar houden (zoals afgebeeld)";
        this.categoryActionText2 =
          "Laat de patiënt zijn/haar hand zo ver mogelijk naar links draaien (zoals afgebeeld)";
        this.categoryActionImage =
          "/images/measureImages/Elbow-supination2.png";
        this.sensorsNeeded = 1;
      }

      this.indexBox = "1/3";
      document.getElementById("leftArrow").src = "/images/empty.png";

      this.titleText = "Plaats de sensor";
      document.getElementById("infoImage").src = this.categoryMountImage;

      this.infoBox1 = "1. " + this.categoryMountText1;
      this.infoBox2 = "2. " + this.categoryMountText2;
      this.infoBox3 = "";
      this.infoBox4 = "";
    },
    checkConnectedSensor() {
      const patientId = this.route.params.name;
      const category = this.route.params.category;

      if (this.sensorHandler.enoughConnectedSensors(this.sensorsNeeded)) {
        this.$router.push({
          name: "sensorCheck",
          params: {
            name: patientId,
            category: category,
            sensorsNeeded: this.sensorsNeeded,
          },
        });
      } else {
        this.$router.push({
          name: "selectSensorFromInfo",
          params: {
            name: patientId,
            category: category,
            sensorsNeeded: this.sensorsNeeded,
          },
        });
      }
    },
    nextPanel() {
      if (textIndex != 3) {
        textIndex += 1;
      }
      if (textIndex == 2) {
        this.indexBox = "2/3";
        document.getElementById("leftArrow").src = "/images/arrowLeft.png";

        this.titleText = "Beweging van de meting";
        document.getElementById("infoImage").src = this.categoryActionImage;

        this.infoBox1 = "1. " + this.categoryActionText1;
        this.infoBox2 = "2. " + this.categoryActionText2;
        this.infoBox3 = "";
        this.infoBox4 = "";
      } else if (textIndex == 3) {
        this.indexBox = "3/3";
        document.getElementById("rightArrow").src = "/images/empty.png";

        this.titleText = "Start van de meting";
        document.getElementById("infoImage").src =
          "/images/measureImages/startStop.png";

        this.infoBox1 = '1. klik hieronder op "Koppel sensor"';
        this.infoBox2 = "2. koppel een sensor en klik op start";
        this.infoBox3 =
          "3. Zorg ervoor dat de patiënt zijn/haar boven arm zo horizontaal mogelijk  houdt";
        this.infoBox4 =
          "4. Zodra de patiënt zijn/haar top punt  heeft bereikt; druk op stop";
      }
    },
    previousPanel() {
      if (textIndex != 1) {
        textIndex -= 1;
      }
      if (textIndex == 2) {
        this.indexBox = "2/3";
        document.getElementById("rightArrow").src = "/images/arrowRight.png";

        this.titleText = "Beweging van de meting";
        document.getElementById("infoImage").src = this.categoryActionImage;

        this.infoBox1 = "1. " + this.categoryActionText1;
        this.infoBox2 = "2. " + this.categoryActionText2;
        this.infoBox3 = "";
        this.infoBox4 = "";
      } else if (textIndex == 1) {
        this.indexBox = "1/3";
        document.getElementById("leftArrow").src = "/images/empty.png";

        this.titleText = "Plaats de sensor";
        document.getElementById("infoImage").src = this.categoryMountImage;

        this.infoBox1 = "1. " + this.categoryMountText1;
        this.infoBox2 = "2. " + this.categoryMountText2;
        this.infoBox3 = "";
        this.infoBox4 = "";
      }
    },
  },
};
</script>

<style scoped>
main {
  padding-bottom: 30px;
}
.title {
  color: white;
  margin-bottom: 2%;
  margin-top: 2%;
  margin-right: 10%;
  margin-left: 10%;
  font-size: 2.5em;
  width: 80%;
  text-align: center;
}

.boxTitle {
  padding-top: 3%;
  padding-left: 3%;
  font-weight: bold;
  font-size: 1.5em;
}

.indexText {
  font-weight: bold;
  font-size: 1.2em;
  text-align: center;
}

.infoImage {
  max-width: 100%;
  max-height: 400px;
  padding-right: 2em;
  padding-left: 2em;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.arrowImageLeft {
  max-width: 35px;
  height: auto;
  position: absolute;
}

.arrowImageRight {
  max-width: 35px;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: 10px;
  position: relative;
  margin-top: -28px;
}

.line {
  width: 96%;
  height: 5px;
  background-color: black;
  margin-left: 0px;
}

/* result graph*/
.info_container {
  margin-top: 1%;
  height: 50%;
  margin-right: 5%;
  margin-left: 5%;
  background: white;
  width: 90%;
  border-radius: 15px;
  padding-bottom: 1rem;
  padding-left: 1rem;
  margin-bottom: 2rem;
}

/* buttons */
.connectSensorButton {
  border-radius: 18px;
  background-color: #0275d8;
  padding-top: 0.5rem;
  padding-bottom: 0.5em;
  color: white;
  border: none;
  width: 200px;
}

.connectSensorButton:hover,
.connectSensorButton:focus {
  background: #04359e;
}
/* footer */

footer {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  padding-left: 5%;
  position: fixed;
  bottom: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
}
</style>
