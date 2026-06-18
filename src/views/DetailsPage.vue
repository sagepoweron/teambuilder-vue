<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { GetPokemon } from '@/api/api';
    import type { Pokemon } from '@/types';
    import SpinningImages from '@/components/SpinningImages.vue';
    import Chart from '@/components/Chart.vue';
    import { AddToCompareList, IsInCompareList, RemoveFromCompareList } from '@/api/compareStore';

    const route = useRoute();
    const pokemon = ref<Pokemon | null>(null);
    const loading = ref(true);
    const error = ref<string | null>(null);

    const fetchPokemon = async (query: string) => {
        loading.value = true;
        error.value = null;
        pokemon.value = null;

        try {
            const data = await GetPokemon(query);
            if (!data) {
                throw new Error('Pokemon not found.');
            }
            pokemon.value = data;
        } catch (err) {
            error.value = (err as Error).message || 'Unable to load Pokemon details.';
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        const query = route.params.query;
        if (typeof query === 'string' && query.length > 0) {
            fetchPokemon(query);
        } else {
            loading.value = false;
            error.value = 'No Pokemon specified.';
        }
    });

    watch(() => route.params.query, (newQuery) => {
        if (typeof newQuery === 'string' && newQuery.length > 0) {
            fetchPokemon(newQuery);
        }
    }
    );
</script>


<template>
    <main class="column">
        <div class="column">
            <h1>Pokemon Details</h1>
            <router-link class="back-link" to="/search">Back to Search</router-link>
        </div>

        <div v-if="loading" class="status">Loading...</div>
        <div v-else-if="error" class="status error">{{ error }}</div>
        <div v-else-if="pokemon" class="column">
            <h2>#{{ pokemon.id }} {{ pokemon.name }}</h2>
            <button v-if="!IsInCompareList(pokemon.name)" @click="AddToCompareList(pokemon.name)" class="add">Add</button>
            <button v-else @click="RemoveFromCompareList(pokemon.name)" class="remove">Remove</button>
            <div class="row">
                <div class="column">
                    <SpinningImages :pokemon="pokemon" />
                    <div class="sprites">
                        <img v-if="pokemon.sprites.front_default" :src="pokemon.sprites.front_default" alt="Front default" />
                        <img v-if="pokemon.sprites.back_default" :src="pokemon.sprites.back_default" alt="Back default" />
                    </div>
                    <div class="info-box">
                        <h2>Types</h2>
                        <div class="type-list">
                            <div v-for="typeInfo in pokemon.types" :key="typeInfo.slot" class="type-pill" :class="typeInfo.type.name.toLowerCase()">
                                {{ typeInfo.type.name }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="stats-panel">
                    <Chart :pokemon="pokemon" />
                    <div class="stat-list card">
                        <h2>Base Stats</h2>
                        <ul>
                        <li v-for="stat in pokemon.stats" :key="stat.stat.name">
                            <strong>{{ stat.stat.name }}:</strong>
                            <div>{{ stat.base_stat }}</div>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="status">No Pokemon data found.</div>
    </main>
</template>



<style scoped>

.back-link {
  padding: 0.6rem 1rem;
  background: #2d8cf0;
  color: white;
  border-radius: 8px;
  text-decoration: none;
}
.status {
  font-size: 1rem;
  color: #444;
}
.status.error {
  color: #b00020;
}
.sprites
{
    display: flex;
    gap: 1rem;
}
.sprites img {
  width: 120px;
  height: auto;
  border-radius: 12px;
  background: #f6f6f6;
  padding: 0.5rem;
}
.info-box {
  background: #f7f9fc;
  padding: 1rem;
  border-radius: 12px;
}
.type-list {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.type-pill {
  background: #4f96ff;
  color: white;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  text-transform: capitalize;
  font-size: 0.95rem;
}
.stats-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.stat-list ul
{
    list-style: none;
    padding: 0;
    margin: 0;
}
.stat-list li
{
    padding: 8px;
    border-bottom: 1px solid #e9edf3;
    display: flex;
    justify-content: space-between;
}
.stat-list li:last-child
{
    border-bottom: none;
}



.normal
{
    background-color: #9FA19F;
}
.fighting
{
    background-color: #FF8000;
}
.flying
{
    background-color: #81B9EF;
}
.poison
{
    background-color: #9141CB;
}
.ground
{
    background-color: #915121;
}
.rock
{
    background-color: #AFA981;
}
.bug
{
    background-color: #91A119;
}
.ghost
{
    background-color: #704170;
}
.steel
{
    background-color: #60A1B8;
}
.fire
{
    background-color: #E62829;
}
.water
{
    background-color: #2980EF;
}
.grass
{
    background-color: #3FA129;
}
.electric
{
    background-color: #FAC000;
}
.psychic
{
    background-color: #EF4179;
}
.ice
{
    background-color: #3DCEF3;
}
.dragon
{
    background-color: #5060E1;
}
.dark
{
    background-color: #624D4E;
}
.fairy
{
    background-color: #EF70EF;
}


</style>
