<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { GetPokemon } from '@/api/api';
    import type { Pokemon } from '@/types';

    //const props = defineProps<{ url: string }>()
    //console.log(props.url);

    const pokemon = ref<Pokemon | null>(null);
    const loading = ref(true);
    const error = ref<string | null>(null);
    

    onMounted(async () => {
        //await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay
        try {
            pokemon.value = await GetPokemon("mewtwo");
            console.log(pokemon.value?.name);
        } catch (err) {
            error.value = (err as Error).message;
        } finally {
            loading.value = false;
        }
    });
</script>

<template>
    

    <div v-if="loading">Loading...</div>
            <div v-else-if="error">Error: {{ error }}</div>
            <div v-else-if="pokemon">
                <h3>{{ pokemon.name }}</h3>
                <div class="container">
                    <div class="cube">
                        <img class="pixelated" :src="pokemon?.sprites.front_default"></img>
                        <!--<div class="front"><img class="pixelated" src={{props.url}}></img></div>
                        <div class="back"><img class="pixelated" src={{props.url}}></img></div>-->
                    </div>
                </div>
            </div>
            <div v-else>
                No data available.
            </div>
</template>

<style scoped>
    .cube{
        width: 100px;
        height: 100px;
    }
</style>