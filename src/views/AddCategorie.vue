<template>
  <nav-bar-top></nav-bar-top>
  <h1 v-if="showCategory" class="title">Categorie toevoegen</h1>
  <h1 v-else class="title">Oefening toevoegen</h1>

  <div class="categoryWrapper">
    <div v-show="showCategory" class="category">
      <img src="../assets/categoryImages/shouldersCategory.jpg" />
      <div class="text">
        <h3>Schouder</h3>
        <p></p>
        <button class="btn btn-primary" @click="showShoulder">
          Ga naar categorie
        </button>
      </div>
    </div>

    <div v-show="showCategory" class="category">
      <img src="@/assets/categoryImages/elbowCategory.jpg" />
      <div class="text">
        <h3>Elleboog</h3>
        <p></p>
        <button class="btn btn-primary" @click="showElbow">
          Ga naar categorie
        </button>
      </div>
    </div>

    <div v-show="showCategory" class="category">
      <img src="@/assets/categoryImages/hipCategory.jpg" />
      <div class="text">
        <h3>Heup</h3>
        <p></p>
        <button class="btn btn-primary" @click="showHip">
          Ga naar categorie
        </button>
      </div>
    </div>

    <div v-show="showCategory" class="category">
      <img src="@/assets/categoryImages/kneeCategory.jpg" />
      <div class="text">
        <h3>Knie</h3>
        <p></p>
        <button class="btn btn-primary" @click="showKnee">
          Ga naar categorie
        </button>
      </div>
    </div>

    <div v-show="showCategory" class="category">
      <img src="@/assets/categoryImages/ankleCategory.jpg" />
      <div class="text">
        <h3>Enkel</h3>
        <p></p>
        <button class="btn btn-primary" @click="showAnkle">
          Ga naar categorie
        </button>
      </div>
    </div>
  </div>

  <div class="exerciseWrapper">
    <div v-show="showElbowExercices" class="categoryBox">
      <div class="textBox">
        <div><b class="categoryTitle">Elleboog flexie & extensie links</b></div>
        <div class="categorySubText">1 Xsens sensor vereist</div>
      </div>
      <img
        class="addImage"
        src="@/assets/add.png"
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
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
        tabindex="0"
        @click="addSelected('elleboog-supinatie-rechts')"
      />
    </div>
  </div>

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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1em;
  align-items: stretch;
  margin-right: 5%;
  margin-left: 5%;
  padding-bottom: 30px;
}

.category {
  background-color: #fff;
}

.category img {
  max-width: 100%;
}

.text {
  padding: 20px;
}

.exerciseWrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 330px));
  gap: 1em;
  align-items: stretch;
  margin-right: 5%;
  margin-left: 5%;
  padding-bottom: 30px;
}

.categoryBox {
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
  cursor: pointer;
  max-width: auto;
  height: 70px;
  display: block;
  margin: 1.75em 1em 1em auto;
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
