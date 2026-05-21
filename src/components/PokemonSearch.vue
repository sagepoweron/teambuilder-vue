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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PokemonSearch',
  setup() {
    const searchQuery = ref('');
    const pokemonList = ref<Array<{ id: number; name: string }>>([]);

    const searchPokemon = () => {
      // Placeholder for API call
      console.log(`Searching for: ${searchQuery.value}`);
    };

    return {
      searchQuery,
      pokemonList,
      searchPokemon,
    };
  },
});
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
