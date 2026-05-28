<template>
  <div class="pokemon-search">
    <h1>Search for Pokemon</h1>
    <div>
        <input v-model="searchQuery" @keyup.enter="searchPokemon" placeholder="Enter Pokemon name or number"/>
        <button @click="searchPokemon">Search</button>
    </div>
    
    <div v-if="pokemon">
        <h2>{{ pokemon.name }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { SearchPokemon } from '../api/api';

    const searchQuery = ref('');
    const pokemon = ref<{ id: any; name: any } | null>(null);

    const searchPokemon = () => {
        console.log(`Searching for: ${searchQuery.value}`);
        SearchPokemon(searchQuery.value)
            .then((result) => { pokemon.value = result; })
            .catch((err) => { console.error(err); pokemon.value = null; });
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
