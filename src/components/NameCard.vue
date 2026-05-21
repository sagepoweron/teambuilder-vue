<template>
    <a href="https://sagepoweron.github.io/"  class="nameCard">
        <span class="capitalize">J</span>
        <span class="letters">on</span> <span class="capitalize">T</span>
        <span class="letters">ate</span>
        
        <!--
        <span class="letters first">Jon</span> <span class="letters last">Tate</span>
        -->
    </a>
</template>

<style scoped>
    /*@import url('https://fonts.googleapis.com/css2?family=Elsie+Swash+Caps:wght@400;900&display=swap');*/
    .nameCard
    {
        margin: 8px;
        padding: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        /*font-family: 'Elsie Swash Caps', sans-serif;*/
        text-transform: uppercase;
        transition-duration: 1s;
        background-color: #e1e5f2ff;
        color:#022b3aff;
        border: 2px solid slategrey;
        border-radius: 8px;
    }
    .nameCard:hover
    {
        /*color: black;*/
        text-shadow: 0px 0px 10px white;
    }
    
    .nameCard:hover .letters
    {
        max-width: 50px;
    }
    .capitalize
    {
        font-size:xx-large;
    }
    

 
    .letters
    {
        /*font-family: 'Consolas', monospace; /* Use a monospaced font */
        font-size:large;
        /*max-width: 1ch;*/
        max-width: 0px;
        transition-duration: 1s;
        overflow: hidden;
    }
    /*.nameCard:hover .first
    {
        max-width: 3ch;
    }
    .nameCard:hover .last
    {
        max-width: 4ch;
    }*/
</style>