<template>
    <div class="chart-container card">
        <Radar :data="chartData" :options="chartOptions"></Radar>
    </div>
</template>



<script setup lang="ts">
    import { ref, watch } from "vue";
    import type { Pokemon } from "../types";
    import { Radar } from 'vue-chartjs'
    import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
    ChartJS.register( RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend );

    interface Props
    {
        pokemon: Pokemon[]
    }
    interface Dataset
    {
        label: string,
        data: number[],
        backgroundColor: string,
        borderColor: string,
        borderWidth: number
    }
    const props = defineProps<Props>();
    const chartData = ref<any>({});
    const chartOptions = ref<any>({});

    function GetDataSet(pokemon: Pokemon)
    {
        const stats = [...pokemon.stats];
        [stats[5]!, stats[3]!] = [stats[3]!, stats[5]!];
        const dataSet = {
            label: pokemon.name,
            data: stats.map((element) => element.base_stat),
            backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.3)`,
            borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
            borderWidth: 1
        };
        return dataSet;
    }

    watch(props, () => {
        //console.log("Pokemon list changed, updating chart...");
        const datasetList = [] as Dataset[];
        for (const pokemon of props.pokemon)
        {
            const dataSet = GetDataSet(pokemon);
            datasetList.push(dataSet);
        }
        chartData.value = {
            labels: ["HP", "Attack", "Defense", "Speed", "Sp. Def", "Sp. ATK"],
            //labels: pokemon.stats.map((element) => element.stat.name),
            datasets: datasetList
        };
    });
    

    const datasetList = [] as Dataset[];
    for (const pokemon of props.pokemon)
    {
        const dataSet = GetDataSet(pokemon);
        datasetList.push(dataSet);
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