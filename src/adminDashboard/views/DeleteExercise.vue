<template>
    <div class="container">
        <h1 class="title">Exercise overzicht</h1>

        <main>
            <template v-for="[docKey, exercise] in exercises" :key="exercise">
                <div class="exercise">
                    <h2>Exercise</h2>
                    <div class="exercise-text-holder">
                        <p class="text color-black">
                            <b>{{ exercise.name }} </b>
                        </p>
                        <p class="text color-black">
                            {{ exercise.amountSensor }}
                        </p>
                        <a @click="displayDescription(exercise.description)">
                            <p class="text description color-blue">
                                {{ exercise.description }}
                            </p>
                        </a>
                    </div>
                    <div class="actionButtons">
                        <button class="fullcolumn button deleteButton" @click="confirmDelete(docKey)">
                            <b> Delete </b>
                        </button>
                    </div>
                </div>
            </template>
        </main>
    </div>
</template>
  
<script>
import { getAllExercises, deleteExercise } from "../../db/fdb";

export default {
    name: "deleteExercise",
    data() {
        return {
            exercises: null,
            user: {},
        };
    },
    mounted() {
        this.getExercisesfromFireStore();
        this.user = this.$store.getters.getUser.email;
    },
    methods: {
        async getExercisesfromFireStore() {
            await getAllExercises().then((results) => {
                this.exercises = results;
            });
        },
        confirmDelete(docKey) {
            if (window.confirm("Do you really want to delete the Exercise?")) {
                deleteExercise(docKey);
                this.exercises.delete(docKey);
            }
        },
        displayDescription(description) {
            if (window.confirm(description)) {
                deleteExercise(docKey);
                this.exercises.delete(docKey);
            }
        }
    },
}
</script>
  
<style scoped>
h1 {
    text-align: center;
    color: aliceblue;
}

h2 {
    text-align: center;
    color: black;
}


main {
    display: grid;
    gap: 2rem;

    grid-template-columns: repeat(3, 1fr);
    margin: 0 5% 2rem;
    padding-bottom: 70px;
}

.vh {
    min-height: 100vh;
}

.actionButtons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
}

.title {
    color: white;
    margin-bottom: 2%;
    margin-top: 2%;
    margin-right: 25%;
    margin-left: 25%;
    font-size: 2.5em;
    width: 50%;
    text-align: center;
}

p {
    margin: 0;
    word-break: break-word;
    margin-left: auto;
    margin-right: auto;
}

a {
    cursor: pointer;
    margin: 0;
    word-break: break-word;
}

.exercise {
    background: white;
    color: white;
    padding: 1em;
    border: 1px solid white;
    border-radius: 0.5em;
    display: grid;
    flex-wrap: wrap;
}

.exercise:hover {
    transform: scale(1.1);
    z-index: 3;
}

.exercise-text-holder {
    margin: 1em 1em 2em 1em;
}

.text {
    font-size: 1.3em;
}

.description {
    width: 20ch;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.button {
    position: relative;
    width: 100%;
    height: 3em;
    bottom: 0.2em;
    color: white;
    border: none;
    transition: all 0.2s ease-in-out;
    border-radius: 10px;
}

.fullcolumn {
    grid-column: 1 / 3;
}

.color-black {
    color: black;
}

.color-blue {
    color: blue;
    text-decoration: underline;
}

.deleteButton {
    background: red;
}

.deleteButton:focus,
.deleteButton:focus-within,
.deleteButton:hover {
    background: rgb(54, 1, 1);
}
</style>