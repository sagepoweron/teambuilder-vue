<script setup lang="ts">
    import type { Pokemon } from '@/types';

    const props = defineProps<Pokemon>();
</script>

<template>
    <div class="outline">
        <div class="container">
            <div class="cube">
                <div class="front"><img class="pixelated" :src="props.sprites.front_default"></img></div>
                <div class="back"><img class="pixelated" :src="props.sprites.front_shiny"></img></div>
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

    .cube
    {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
    }

    .cube div
    {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }

    .back
    {
        transform: translateZ(-100px) rotateY(180deg);
    }
    .right
    {
        transform: rotateY(-270deg) translateX(100px);
        transform-origin: top right;
    }
    .left
    {
        transform: rotateY(270deg) translateX(-100px);
        transform-origin: center left;
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
    .front
    {
        transform: translateZ(100px);
    }

    @keyframes spin
    {
        from { transform: rotateY(0); }
        to { transform: rotateY(-360deg); }
    }

    .cube
    {
        animation: spin 5s infinite linear;
    }

    img
    {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
</style>