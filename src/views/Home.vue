<script setup lang="ts">
    import {ref, onMounted} from "vue";
    import type { Pokemon } from "../types";
	import { GetPokemon } from "../api/api";
    import SpinningImages from "@/components/SpinningImages.vue";

	const pokemon = ref<Pokemon | null>(null);
    const loading = ref(true);
    const error = ref<string | null>(null);


    onMounted(async () => {
        //await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay
        try {
            const randomNumber = Math.floor(Math.random() * 1025) + 1;

            pokemon.value = await GetPokemon(randomNumber.toString());
            console.log(pokemon.value?.name);
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    });

</script>

<template>
    <main class="column">
        <h1>Home</h1>
        <SpinningImages v-if="pokemon" v-bind="pokemon"></SpinningImages>

        <!--
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else-if="pokemon">
            <h3>{{ pokemon.name }}</h3>
            <div class="container">
                <div class="cube">
                    <img class="pixelated" :src="pokemon?.sprites.front_default"></img>
                </div>
            </div>
        </div>
        <div v-else>
            No data available.
        </div>
        -->
	</main>
</template>

<style scoped>
</style>