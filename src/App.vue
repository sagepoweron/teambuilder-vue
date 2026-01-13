<script setup lang="ts">
	import {ref, onMounted} from "vue";
	import Navigation from "./components/Navigation.vue";
	import type { Pokemon } from "./types";
	import { GetPokemon } from "./api/api";

	const name = ref("Jon");
	const pokemon = ref<Pokemon | null>(null);

	onMounted(async () =>
	{
		pokemon.value = await GetPokemon("mewtwo");
    	console.log(pokemon.value?.name);
	});
</script>

<template>
	<Navigation />
	<header>
		Welcome!
	</header>

	<main>
		<h1>
			Full site coming soon!
		</h1>
		<img class="pixelated" :src="pokemon?.sprites.front_default"></img>
	</main>

  	

	<footer>
		<p>&copy; 2025 {{name}}</p>
	</footer>
</template>

<style scoped>
	p
	{
		color: blue;
	}
</style>