<template>
    <div class="chart-container card">
        <Radar :data="chartData" :options="chartOptions"></Radar>
    </div>
</template>



<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import type { Pokemon } from "../types";
    import { Radar } from 'vue-chartjs'
    import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
    ChartJS.register( RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend );

    interface Props
    {
        pokemon: Pokemon[]
    }
    const props = defineProps<Props>();

    // reactive chart data/options exposed to the template
    const chartData = ref<any>({});
    const chartOptions = ref<any>({});

    const datasetList = [];
    for (const pokemon of props.pokemon)
    {
        const stats = [...pokemon.stats];
        // swap sp attack and speed to match game layout
        // use non-null assertions to satisfy TypeScript that indexed elements exist
        [stats[5]!, stats[3]!] = [stats[3]!, stats[5]!];

        datasetList.push({
            label: pokemon.name,
            data: stats.map((element) => element.base_stat),
            backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.3)`,
            borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
            borderWidth: 1
        });
    }
    chartData.value = {
        labels: ["HP", "Attack", "Defense", "Speed", "Sp. Def", "Sp. ATK"],
        //labels: pokemon.stats.map((element) => element.stat.name),
        datasets: datasetList
    };

    chartOptions.value = {
        responsive: true,
        /*plugins: {
            title: {
                display: true,
                text: 'Chart.js Radar Chart'
            }
        },*/
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                //suggestedMin: 0,
                //suggestedMax: 255
                min: 0,
                max: 255
            }
        }
    };
</script>

<style scoped>
    .chart-container
    {
        width: 800px;
        height: 800px;
    }
</style>