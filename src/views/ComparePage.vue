<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { store, AddToCompareList, ClearCompareList } from '@/api/compareStore';
import type { Pokemon } from '@/types';
import { GetPokemon } from '@/api/api';
import Chart from '@/components/Chart.vue';
import ChartMultiple from '@/components/ChartMultiple.vue';

const pokemonList = ref<Pokemon[]>([]);

const fetchPokemon = async (query: string) => {

    var pokemon = null;
    try {
        const data = await GetPokemon(query);
        if (!data) {
            throw new Error('Pokemon not found.');
        }
        pokemon= data;
    } catch (err) {
        console.error(err);
    } finally {
        if (pokemon) {
            pokemonList.value.push(pokemon);
        }
    }
};

onMounted(() => {
    for (const name of store.list)
    {
        fetchPokemon(name);
    }
});
</script>

<template>
    <main class="column">
        <h1>Compare</h1>
        <p>Compare multiple Pokemon side by side.</p>

        <ul>
            <li v-for="pokemon in pokemonList" :key="pokemon.name" class="column">
                <h2>{{ pokemon.name }}</h2>
                <Chart :pokemon="pokemon" />
                <!--
                <h1>{{ pokemon.name }}</h1>
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
ul
{
    list-style: none;
    padding: 0;
    margin: 0;
}
li
{
    padding: 8px;
    border-bottom: 1px solid #e9edf3;
    display: flex;
    justify-content: space-between;
}
li:last-child
{
    border-bottom: none;
}
</style>