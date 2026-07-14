<template>
    <div class="bar">
        <h2>Compare List</h2>

        <div class="list">
            <div v-for="name in store.list" :key="name" class="card">
                <p class="capitalized">{{ name }}</p>
                <router-link :to="`/pokemon/${name}`" class="detail-button">
                    <button>Details</button>
                </router-link>
                <button @click="Remove(name)" class="remove">Remove</button>
            </div>
        </div>
        
        
        <div v-if="store.list.length === 0">No Pokemon in compare list.</div>
        <div v-else><button @click="ClearCompareList">Clear</button></div>
    </div>
</template>



<script setup lang="ts">
    import { store, ClearCompareList, Remove } from '@/api/compareStore';
</script>

<style scoped>
    .bar
    {
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgb(180, 142, 70);
        border-bottom: 1px solid lightgray;
    }
    .list
    {
        height: 400px;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        
    }
</style>