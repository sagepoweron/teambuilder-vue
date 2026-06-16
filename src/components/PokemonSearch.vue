<template>
  <div class="pokemon-search">
    <h1>Search for Pokemon</h1>
    <div>
        <input v-model="searchQuery" @keyup.enter="searchPokemon" placeholder="Enter Pokemon name or number"/>
        <button @click="searchPokemon">Search</button>
    </div>
    
	<div>
		<div v-if="loading">Loading...</div>
        <div v-else-if="pokemon" class="card column">
			<h2>{{ pokemon.name }}</h2>
            <img :src="pokemon.sprites.front_default" alt="Pokemon sprite" class="pixelated"/>
            <router-link :to="`/pokemon/${pokemon.name}`" class="detail-button">View full details</router-link>
            <button @click="addToCompare">Add to Compare</button>
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
	import type { Pokemon } from '@/types.ts';
    import { store } from '@/api/compareStore';

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
    const addToCompare = () => {
        if (pokemon.value) {
            store.list.push(pokemon.value.name);
        }
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

.detail-button {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 1.25rem;
    background: #2d8cf0;
    color: white;
    border-radius: 8px;
    text-decoration: none;
}

image {
    display: block;
    width: 150px;
    height: 150px;
}
</style>
