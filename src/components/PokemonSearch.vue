<template>
  <div class="pokemon-search">
    <h1>Search for Pokemon</h1>
    <div>
        <input v-model="searchQuery" @keyup.enter="searchPokemon" placeholder="Enter Pokemon name or number"/>
        <button @click="searchPokemon">Search</button>
    </div>
    
	<div>
		<div v-if="loading">Loading...</div>
        <div v-else-if="pokemon">
			<SpinningImages v-bind="pokemon"></SpinningImages>
			<h2>{{ pokemon.name }}</h2>
			<Chart v-bind="pokemon"></Chart>
        </div>
        <div v-else>
            No data available.
        </div>
	</div>
  </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { SearchPokemon } from '../api/api';
	import { GetPokemon } from "../api/api";
	import SpinningImages from './SpinningImages.vue';
	import type { Pokemon } from '@/types.ts';
	import Chart from './Chart.vue';

    const searchQuery = ref('');
	const pokemon = ref<Pokemon | null>(null);
	const loading = ref(false);

    const searchPokemon = async () => {
        
		pokemon.value = null;
		loading.value = true;

		const searchResult = await SearchPokemon(searchQuery.value);

		if (searchResult)
		{
			pokemon.value = await GetPokemon(searchResult.name);
		}
		
		loading.value = false;
    };


</script>

<style scoped>
.pokemon-search
{
    text-align: center;
    margin: 20px;
}

input
{
    padding: 10px;
    margin-bottom: 20px;
    width: 80%;
    max-width: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>
