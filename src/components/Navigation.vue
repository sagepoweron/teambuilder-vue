<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import NameCard from './NameCard.vue';
</script>

<template>
    <nav>
        <NameCard></NameCard>
        
		<div class="panel row">
            <RouterLink to="/"><div class="clickable">Home</div></RouterLink>
            <RouterLink to="/search"><div class="clickable">Search</div></RouterLink>
            <RouterLink to="/compare"><div class="clickable">Compare</div></RouterLink>

		</div>
	</nav>
</template>

<style scoped>
    nav
    {
        padding: 8px;
        display: flex;
        justify-content: space-between;
        background-color: steelblue;
        border-bottom: 1px solid lightgray;
    }
</style>