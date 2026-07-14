<template>
    <div class="bar">
        <h2>Compare List</h2>

        <div class="row">
            <div v-for="pokemon in store.list" :key="pokemon.name" class="card">
                <p class="capitalized">{{ pokemon.name }}</p>
                <router-link :to="`/pokemon/${pokemon.name}`" class="detail-button">
                    <button>Details</button>
                </router-link>
                <button @click="Remove(pokemon)" class="remove">Remove</button>
            </div>
        </div>
        
        
        <div v-if="store.list.length === 0">No Pokemon in compare list.</div>
        <div v-else><button @click="Clear">Clear</button></div>
        <div><button @click="DebugList">Debug</button></div>
    </div>
</template>



<script setup lang="ts">
    import { store, Clear, Remove, DebugList } from '@/components/test/compareStore2';
</script>

<style scoped>
    .bar
    {
        padding: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(180, 142, 70);
        border-bottom: 1px solid lightgray;
    }
</style>