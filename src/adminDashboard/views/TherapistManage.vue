<template>
    <div class="container">
        <h1 class="title">FysioTherapeuten overzicht</h1>

        <main>
            <template v-for="[docKey, fysio] in this.fysios" :key="fysio">
                <div class="fysio" v-if="fysio.email !== user">
                    <i class="bi bi-person-square userIcon"></i>
                    <div class="fysio-text-holder">
                        <p>
                            <b>{{ fysio.name }} </b>
                        </p>
                        <p class="text">
                            {{ fysio.email }}
                        </p>
                    </div>
                    <div class="actionButtons">
                        <button class="button adminButton" @click="confirmAdmin(docKey)">
                            <b> Admin </b>
                        </button>
                        <button class="button deleteButton" @click="confirmDelete(docKey)">
                            <b> Delete </b>
                        </button>
                        <button class="button fullcolumn adminButton" @click="goToProfile(docKey)">
                            <b> Go to Profile </b>
                        </button>
                    </div>
                </div>
            </template>
        </main>
    </div>
</template>

<script>
import { getAllFysio, deleteFysio, makeAdmin } from '../../db/fdb';
import AdminNavbar from '../components/admin-navbar/AdminNavbar.vue';

export default {
    name: "TherapistManage",
    components: {
        AdminNavbar
    },
    data() {
        return {
            fysios: null,
            user: {}
        };
    },
    mounted() {
        this.getFysiofromFireStore();
        this.user = this.$store.getters.getUser.email;

    },
    methods: {
        async getFysiofromFireStore() {

            await getAllFysio().then((results) => {
                this.fysios = results;
            });
        },
        goToProfile(docKey) {
            this.$router.push({
                name: "profilePage",
                params: { id: docKey },
            });
        },
        confirmDelete(dockey) {
            if (window.confirm("Do you really want to delete the Fysiotherapist?")) {
                deleteFysio(dockey);
                this.fysios.delete(dockey);
            }
        },
        confirmAdmin(dockey) {
            if (window.confirm("Do you really want to make this Fysio an Admin?")) {
                makeAdmin(dockey);
            }
        }
    }
}

</script>

<style scoped>
h1 {
    text-align: center;
    color: aliceblue;
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
    color: black;
    word-break: break-word;
}

.fysio {
    background: white;
    color: white;
    padding: 1em;
    border: 1px solid white;
    border-radius: 0.5em;
    display: grid;
    flex-wrap: wrap;
}

.fysio:hover {
    transform: scale(1.1);
    z-index: 3;
}

.fysio-text-holder {
    margin: 1em 1em 2em 1em;
}

.text {
    font-size: 1.3em;
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

.adminButton {
    background: #0275d8;
}

.deleteButton {
    background: red;
}



.makeAdminButton:focus,
.makeAdminButton:focus-within,
.makeAdminButton:hover,
.makeAdminButton:focus,
.makeAdminButton:hover {
    background: #04359e;
    border: none;
}

.makeAdminButton {
    border: none;
    background: #0275d8;
    color: white;
    border: none;
    padding: 0.5em 2em;
    transition: all 0.2s ease-in-out;
    border-radius: 10px;
}

.userIcon {
    font-size: 4rem;
    color: #0275d8;
    width: 100%;
}
</style>