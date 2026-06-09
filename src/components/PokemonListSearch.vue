<template>
    <div class="pokemon-search column">
        <h1>Pokemon List</h1>
        <div class="row">
            <button @click="onListButtonClick('0', '151')">1-151</button>
            <button @click="onListButtonClick('151', '100')">152-251</button>
            <button @click="onListButtonClick('251', '135')">252-386</button>
            <button @click="onListButtonClick('386', '107')">387-493</button>
            <button @click="onListButtonClick('493', '156')">494-649</button>
            <button @click="onListButtonClick('649', '72')">650-721</button>
            <button @click="onListButtonClick('721', '88')">722-809</button>
            <button @click="onListButtonClick('809', '96')">810-905</button>
            <button @click="onListButtonClick('905', '120')">906-1025</button>
            <button @click="onListButtonClick('1025', '500')">Alternate Forms</button>
            <button @click="clearSearchListClicked">Clear List</button>
        </div>
        
        <ul>
            <li v-for="result in searchResults" :key="result.id">
                <div class="name">{{ result.id }} {{ result.name }}</div>
                <router-link :to="`/pokemon/${result.name}`" class="detail-button">Details</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { GetPokemonList } from '../api/api';

    const offset = ref("0");
    const limit = ref("10");
    const searchResults = ref<Array<{ id: number, name: string }>>([]);
    const loading = ref(false);


    function clearSearchListClicked()
    {
        searchResults.value = [];
    }
    async function onListButtonClick(offset: string, size: string)
    {
        loading.value = true;
        //await sleep(1000);
        const results = await GetPokemonList(offset, size);

        searchResults.value = results.map((pokemon, index) => {
            const id = parseInt(offset) + index + 1;
            return { id, name: pokemon.name };
        });

        loading.value = false;
    }

</script>

<style scoped>
    .pokemon-search ul
    {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .pokemon-search li
    {
        padding: 8px;
        border-bottom: 1px solid #e9edf3;
        display: flex;
        justify-content: space-between;
        
    }
    .pokemon-search li:last-child
    {
        border-bottom: none;
    }
    .name
    {
        text-transform: capitalize;
    }
</style>
