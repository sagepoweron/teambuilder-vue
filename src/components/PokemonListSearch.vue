<template>
  <div class="pokemon-search">
    <h1>Search for Pokemon</h1>
    <input
      v-model="searchQuery"
      @input="searchPokemon"
      placeholder="Enter Pokemon name or number"
    />
    <ul>
      <li v-for="pokemon in pokemonList" :key="pokemon.id">
        {{ pokemon.name }} ({{ pokemon.id }})
      </li>
    </ul>
    <div v-if="pokemon">
      <h2>{{ pokemon.name }}</h2>
      <!-- Additional Pokemon details can be displayed here -->
    </div>
  </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { SearchPokemon } from '../api/api';

    const searchQuery = ref('');
    const pokemonList = ref<Array<{ id: number; name: string }>>([]);
    const pokemon = ref<{ id: any; name: any } | null>(null);

    const searchPokemon = () => {
        // Placeholder for API call
        console.log(`Searching for: ${searchQuery.value}`);
        SearchPokemon(searchQuery.value).then((result) => {
            pokemon.value = result;
        }).catch((err) => {
            console.error(err);
            pokemon.value = null;
        });
    };
</script>

<style scoped>
.pokemon-search {
  text-align: center;
  margin: 20px;
}

input {
  padding: 10px;
  margin-bottom: 20px;
  width: 80%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: background-color 0.3s;
}

li:hover {
  background-color: #e0e0e0;
}
</style>
