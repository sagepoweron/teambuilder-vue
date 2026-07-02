<script setup lang="ts">
    import type { Pokemon } from '@/types';

    interface Props
    {
        pokemon: Pokemon[]
    }
    const props = defineProps<Props>();

    //const props = defineProps<{
    //    pokemon: Pokemon
    //}>();
    //const props = defineProps<Pokemon>();

</script>

<template>
    <div class="container">
        <div class="spin" v-if="props.pokemon[0]">
            <div class="origin0">
                <img class="pixelated image" :src="props.pokemon[0]?.sprites?.front_default" alt="" />
                <div class="number">1</div>
            </div>
            <div class="origin1">
                <img class="pixelated image" :src="props.pokemon[0]?.sprites?.front_default" alt="" />
                <div class="number">2</div>
            </div>
            <div class="origin2">
                <img class="pixelated image" :src="props.pokemon[0]?.sprites?.front_shiny" alt="" />
                <div class="number">3</div>
            </div>
            <div class="origin3">
                <img class="pixelated image" :src="props.pokemon[0]?.sprites?.back_default" alt="" />
                <div class="number">4</div>
            </div>
            <div class="origin4">
                <img class="pixelated image" :src="props.pokemon[0]?.sprites?.front_shiny" alt="" />
                <div class="number">5</div>
            </div>
            <div class="origin5">
                <img class="pixelated image" :src="props.pokemon[0]?.sprites?.back_default" alt="" />
                <div class="number">6</div>
            </div>
        </div>
    </div>

                
</template>

<style scoped>

    .container
    {
        perspective: 1000px;
        perspective-origin: 0px -200px;
        height: 200px;
    }

    .spin
    {
        width: 100px;
        height: 100px;
        transform-style: preserve-3d;
        animation: spin 10s infinite linear;
        will-change: transform;
    }
    @keyframes spin
    {
        from { transform: rotateY(0) }
        to { transform: rotateY(-360deg) }
    }

    .spin div
    {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
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
        transform: translateZ(200px);
        width: 100%;
        height: 100%;
    }
    .origin0
    {
        transform-style: preserve-3d;
    }
    .origin1
    {
        transform: rotateY(60deg);
        transform-style: preserve-3d;
    }
    .origin2
    {
        transform: rotateY(120deg);
        transform-style: preserve-3d;
    }
    .origin3
    {
        transform: rotateY(180deg);
        transform-style: preserve-3d;
    }
    .origin4
    {
        transform: rotateY(240deg);
        transform-style: preserve-3d;
    }
    .origin5
    {
        transform: rotateY(300deg);
        transform-style: preserve-3d;
    }
    .number
    {
        transform: translateY(50px) translateZ(200px) rotateX(90deg);
        font-size: 64px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        border-radius: 50%;
        background-color: rgb(102, 161, 172);
    }
    

</style>