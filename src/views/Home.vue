<script setup lang="ts">
    import {ref, onMounted} from "vue";
    import type { Pokemon } from "../types";
	import { GetPokemon } from "../api/api";
    import SpinningImages from "@/components/SpinningImages.vue";

    const name = ref("Jon");
	const pokemon = ref<Pokemon | null>(null);

	onMounted(async () =>
	{
		pokemon.value = await GetPokemon("mewtwo");
    	console.log(pokemon.value?.name);
	});

</script>

<template>
    <main class="column">
        <div class="panel">
            <h1>Welcome!</h1>
            <img class="pixelated" :src="pokemon?.sprites.front_default"></img>
		</div>
        <!--
        <SpinningImages url1={pokemon.sprites.front_default} url2={pokemon.sprites.front_shiny}></SpinningImages>
        -->
	</main>
</template>

<style scoped>
</style>