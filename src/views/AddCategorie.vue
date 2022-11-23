<template>
  <nav-bar-top></nav-bar-top>
  <h1 v-if="showCategory" class="title">Categorie toevoegen</h1>
  <h1 v-else class="title">Oefening toevoegen</h1>

  <!-- MOET DYNAMISC -->
  <div class="categoryWrapper">
    <div v-show="showCategory" class="category">
      <div class="textBox">
        <div><b class="categoryTitle">Schouder</b></div>
        <div class="categorySubText"></div>
      </div>
      <img class="addImage" src="@/assets/add.png" @click="showShoulder" />
    </div>

    <div v-show="showCategory" class="category">
      <div class="textBox">
        <div><b class="categoryTitle">Elleboog</b></div>
        <div class="categorySubText"></div>
      </div>
      <img class="addImage" src="@/assets/add.png" @click="showElbow" />
    </div>

    <div v-show="showCategory" class="category">
      <div class="textBox">
        <div><b class="categoryTitle">Heup</b></div>
        <div class="categorySubText"></div>
      </div>
      <img class="addImage" src="@/assets/add.png" @click="showHip" />
    </div>

    <div v-show="showCategory" class="category">
      <div class="textBox">
        <div><b class="categoryTitle">Knie</b></div>
        <div class="categorySubText"></div>
      </div>
      <img class="addImage" src="@/assets/add.png" @click="showKnee" />
    </div>

    <div v-show="showCategory" class="category">
      <div class="textBox">
        <div><b class="categoryTitle">Enkel</b></div>
        <div class="categorySubText"></div>
      </div>
      <img class="addImage" src="@/assets/add.png" @click="showAnkle" />
    </div>

    <div v-show="showElbowExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Elleboog flexie & extensie links</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('elleboog-flexie-extensie-links')"
      />
    </div>

    <div v-show="showElbowExercices" class="categoryBox">
      <div class="textBox">
        <div>
          <b class="categoryTitle">Elleboog flexie & extensie rechts</b>
        </div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('elleboog-flexie-extensie-rechts')"
      />
    </div>

    <div v-show="showHipExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Heup extensie links</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('heup-extensie-links')"
      />
    </div>

    <div v-show="showHipExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Heup extensie rechts</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('heup-extensie-rechts')"
      />
    </div>

    <div v-show="showHipExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Heup flexie links</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('heup-flexie-links')"
      />
    </div>

    <div v-show="showHipExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Heup flexie rechts</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('heup-flexie-rechts')"
      />
    </div>

    <div v-show="showKneeExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Knie extensie & flexie links</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('knie-extensie-flexie-links')"
      />
    </div>

    <div v-show="showKneeExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Knie extensie & flexie rechts</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('knie-extensie-flexie-rechts')"
      />
    </div>

    <div v-show="showAnkleExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Enkel dorsaalflexie links</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('enkel-dorsaalflexie-links')"
      />
    </div>

    <div v-show="showAnkleExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Enkel dorsaalflexie rechts</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('enkel-dorsaalflexie-rechts')"
      />
    </div>

    <div v-show="showAnkleExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Enkel plantairflexie links</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('enkel-plantairflexie-links')"
      />
    </div>

    <div v-show="showAnkleExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Enkel plantairflexie rechts</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('enkel-plantairflexie-rechts')"
      />
    </div>

    <div v-show="showShoulderExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Shouder flexie links</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('shouder-flexie-links')"
      />
    </div>

    <div v-show="showShoulderExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Shouder flexie rechts</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('shouder-flexie-rechts')"
      />
    </div>

    <div v-show="showElbowExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Elleboog pronatie links</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('elleboog-pronatie-links')"
      />
    </div>

    <div v-show="showElbowExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Elleboog pronatie rechts</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('elleboog-pronatie-rechts')"
      />
    </div>

    <div v-show="showElbowExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Elleboog supinatie links</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('elleboog-supinatie-links')"
      />
    </div>

    <div v-show="showElbowExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Elleboog supinatie rechts</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        @click="addSelected('elleboog-supinatie-rechts')"
      />
    </div>
  </div>

  <!-- EINDE MOET DYNAMISC -->
  <footer><BackButton></BackButton></footer>
</template>

<script>
import NavBarTop from "../components/navigation/NavBarTop.vue";
import { addCategorie } from "../db/fdb";
import { useRoute } from "vue-router";
import BackButton from "../components/buttons/BackButton.vue";

export default {
  name: "AddCategory",
  components: {
    NavBarTop,
    BackButton,
  },
  data() {
    return {
      route: useRoute(),
      showCategory: true,
      showShoulderExercices: false,
      showElbowExercices: false,
      showHipExercices: false,
      showKneeExercices: false,
      showAnkleExercices: false,
    };
  },

  methods: {
    showShoulder() {
      this.showCategory = false;
      this.showShoulderExercices = true;
    },
    showElbow() {
      this.showCategory = false;
      this.showElbowExercices = true;
    },
    showHip() {
      this.showCategory = false;
      this.showHipExercices = true;
    },
    showKnee() {
      this.showCategory = false;
      this.showKneeExercices = true;
    },
    showAnkle() {
      this.showCategory = false;
      this.showAnkleExercices = true;
    },
    addSelected(type) {
      let docIdPatient = this.route.params.name;
      console.log(type);
      addCategorie(docIdPatient, type);
      this.$router.push({ name: "patient" });
    },
  },
};
</script>

<style scoped>
.categoryWrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
  gap: 1em;
  margin-right: 5%;
  margin-left: 5%;
  padding-bottom: 30px;
}

.categoryBox,
.category {
  cursor: pointer;
  background: white;
  border: 1px solid white;
  color: white;
  border-radius: 1em;
  display: flex;
  flex-wrap: wrap;
}

.title {
  color: white;
  margin-bottom: 2%;
  margin-top: 2%;
  margin-right: 10%;
  margin-left: 10%;
  font-size: 3em;
  width: 80%;
  text-align: center;
}

.addImage {
  margin-top: 5px;
  margin-bottom: 5px;
  max-width: auto;
  height: 80px;
  display: block;
  margin-left: auto;
  margin-right: 5px;
}

.textBox {
  margin: 15px;
  max-width: 60%;
}

.categoryTitle {
  color: black;
  font-size: 1.5em;
  display: inline;
}

.categorySubText {
  color: black;
  margin-bottom: 0px;
  display: inline;
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
