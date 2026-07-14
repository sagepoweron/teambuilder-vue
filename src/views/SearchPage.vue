<script setup lang="ts">
import PokemonListSearch from '@/components/PokemonListSearch.vue';
import PokemonSearch from '@/components/PokemonSearch.vue';
import CompareListPanel from '@/components/CompareListPanel.vue';

</script>

<template>
    <main class="column">
        <CompareListPanel></CompareListPanel>
        <div class="column">
            <h1>Search</h1>
            <PokemonSearch></PokemonSearch>
            <PokemonListSearch></PokemonListSearch>
        </div>
	</main>
</template>

<style scoped>
</style>