<script setup lang="ts">
    import type { Pokemon } from '@/types';

    interface Props
    {
        pokemon: Pokemon
    }
    const props = defineProps<Props>();

    //const props = defineProps<{
    //    pokemon: Pokemon
    //}>();
    //const props = defineProps<Pokemon>();

</script>

<template>
    <div class="outline">
        <div class="container">
            <div class="spin">
                <div class="front"><img class="pixelated image" :src="props.pokemon.sprites.front_default"></img></div>
                <div class="back"><img class="pixelated image" :src="props.pokemon.sprites.front_shiny"></img></div>
            </div>
        </div>
    </div>

                
</template>

<style scoped>

    .outline
    {
        margin: 10px;
        padding: 40px;
        overflow: hidden;
        border: 1px solid #444;
        border-radius: 50%;
        background-color: #add8e6;
    }
    .container
    {
        width: 200px;
        height: 200px;
        perspective: 800px;
        perspective-origin: top;
    }


    
    .spin
    {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        animation: spin 5s infinite linear;
    }
    @keyframes spin
    {
        from { transform: rotateY(0); }
        to { transform: rotateY(-360deg); }
    }

    .spin div
    {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }

    .front
    {
        transform-style: preserve-3d;
    }
    .back
    {
        transform-style: preserve-3d;
        transform: rotateY(180deg);
    }
    .left
    {
        transform-style: preserve-3d;
        transform: rotateY(270deg);
    }
    .right
    {
        transform-style: preserve-3d;
        transform: rotateY(-270deg);
    }
    .top
    {
        transform: rotateX(-90deg) translateY(-100px);
        transform-origin: top center;
    }
    .bottom
    {
        transform: rotateX(90deg) translateY(100px);
        transform-origin: bottom center;
        background-color: darkslategray;
        border: 2px solid black;
        border-radius: 50%;
    }

    .image
    {
        transform: translateZ(100px);
    }

    img
    {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
</style>