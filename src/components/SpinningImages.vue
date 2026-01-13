<script setup lang="ts">
    import { GetPokemon } from '@/api/api';
    import type { Pokemon } from '@/types';
    import { ref } from 'vue';

    //const props = defineProps<{ url: string }>()
    //console.log(props.url);

    const pokemon = ref<Pokemon | null>(null);

    pokemon.value = await GetPokemon("mewtwo");
    console.log(pokemon.value?.name);
</script>


<template>
    <div class="container">
            <div class="cube">
                <img class="pixelated" :src="pokemon?.sprites.front_default"></img>
                <!--<div class="front"><img class="pixelated" src={{props.url}}></img></div>
                <div class="back"><img class="pixelated" src={{props.url}}></img></div>-->
            </div>
        </div>
</template>

<style scoped>
    .cube{
        width: 100px;
        height: 100px;
    }
</style>