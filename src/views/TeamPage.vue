<script setup lang="ts">
    import {ref, onMounted} from "vue";
    import type { Pokemon } from "../types";
	import { GetPokemon } from "../api/api";
    import TeamImages from "@/components/TeamImages.vue";
    import { store, ClearList, RemoveFromList } from '@/api/teamStore';

	const pokemon = ref<Pokemon | null>(null);
    const loading = ref(true);
    const error = ref<string | null>(null);


    onMounted(async () => {
        //await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay
        try {
            const randomNumber = Math.floor(Math.random() * 1025) + 1;

            pokemon.value = await GetPokemon(randomNumber.toString());
            /*console.log(pokemon.value?.name);*/
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    });

</script>

<template>
    <main class="column">
        <h1>Team</h1>
        <p>This page is currently under construction.</p>
        <div v-if="pokemon">
            <TeamImages :pokemon="[pokemon]"></TeamImages>
        </div>
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
        <ul>
            <li v-for="instance in store.list" :key="instance.name" class="column card">
                <h2>{{ instance.name }}</h2>
                <div class="row">
                    <div class="tableColumn">
                        <strong class="cell">Level</strong>
                        <div class="cell">{{ instance.level }}</div>
                    </div>
                    <div class="tableColumn">
                        <strong class="cell">Nature</strong>
                        <div class="cell">{{ instance.nature }}</div>
                    </div>
                </div>
                <button @click="RemoveFromList(instance)">Remove from Team</button>
                <!--
                <h1>{{ instance.name }}</h1>
                <h2>Base Stats</h2>
                <ul class="row">
                    <li v-for="stat in pokemon.stats" :key="stat.stat.name">
                        <strong>{{ stat.stat.name }}:</strong>
                        <div>{{ stat.base_stat }}</div>
                    </li>
                </ul>-->
            </li>
        </ul>
	</main>
</template>

<style scoped>
    .detail-button {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.75rem 1.25rem;
        background: #2d8cf0;
        color: white;
        border-radius: 8px;
        text-decoration: none;
    }
</style>