<template>
    <router-link to="to" class="link">
        <i class="icon"> </i>        
         </router-link>
</template>

<script>
import { useRoute } from 'vue-router';

export default { 
    props: {
        to: { type: String, required: true },
        icon: { type: String, required: true },
    }
}
</script>

<style scoped>
.link {
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    font-weight: 400;
    user-select: none;

    margin: 0.1em 0;
    padding: 0.4em;
    border-radius: 0.25em;
    height: 1.5em;

    color: white;
    text-decoration: none;
}
.link:hover{
    background-color: grey;
}
.link .icon{
    flex-shrink: 0;
    width: 25px;
    margin-right: 10px;
}
</style>