<script setup lang="ts">
    import type { Pokemon } from '@/types';
    import { IsInList, AddToList } from '@/api/teamStore';
    import { ref, watch } from 'vue';
    
    interface Props
    {
        pokemon: Pokemon
    }
    const props = defineProps<Props>();


    const statIds = {
        hp: 0,
        attack: 1,
        defense: 2,
        specialAttack: 3,
        specialDefense: 4,
        speed: 5
    }
    const natures = {
        adamant: {name: 'Adamant', increase: statIds.attack, decrease: statIds.specialAttack},
        bashful: {name: 'Bashful', increase: statIds.specialAttack, decrease: statIds.specialAttack},
        bold: {name: 'Bold', increase: statIds.defense, decrease: statIds.attack},
        brave: {name: 'Brave', increase: statIds.attack, decrease: statIds.speed},
        calm: {name: 'Calm', increase: statIds.specialDefense, decrease: statIds.attack},
        careful: {name: 'Careful', increase: statIds.specialDefense, decrease: statIds.specialAttack},
        docile: {name: 'Docile', increase: statIds.defense, decrease: statIds.defense},
        gentle: {name: 'Gentle', increase: statIds.defense, decrease: statIds.defense},
        hardy: {name: 'Hardy', increase: statIds.attack, decrease: statIds.attack},
        hasty: {name: 'Hasty', increase: statIds.speed, decrease: statIds.defense},
        impish: {name: 'Impish', increase: statIds.defense, decrease: statIds.specialAttack},
        jolly: {name: 'Jolly', increase: statIds.speed, decrease: statIds.specialAttack},
        lax: {name: 'Lax', increase: statIds.defense, decrease: statIds.specialDefense},
        lonely: {name: 'Lonely', increase: statIds.attack, decrease: statIds.defense},
        mild: {name: 'Mild', increase: statIds.specialAttack, decrease: statIds.defense},
        modest: {name: 'Modest', increase: statIds.specialAttack, decrease: statIds.attack},
        naive: {name: 'Naive', increase: statIds.speed, decrease: statIds.specialDefense},
        naughty: {name: 'Naughty', increase: statIds.attack, decrease: statIds.specialDefense},
        quiet: {name: 'Quiet', increase: statIds.specialDefense, decrease: statIds.speed},
        quirky: {name: 'Quirky', increase: statIds.specialDefense, decrease: statIds.specialDefense},
        rash: {name: 'Rash', increase: statIds.specialAttack, decrease: statIds.specialDefense},
        relaxed: {name: 'Relaxed', increase: statIds.defense, decrease: statIds.speed},
        sassy: {name: 'Sassy', increase: statIds.specialDefense, decrease: statIds.speed},
        serious: {name: 'Serious', increase: statIds.speed, decrease: statIds.speed},
        timid: {name: 'Timid', increase: statIds.speed, decrease: statIds.attack}
    }

    const level = ref(100);
    const nature = ref(natures.hardy);
    const ivs = ref([0, 0, 0, 0, 0, 0]);
    const evs = ref([0, 0, 0, 0, 0, 0]);


    function setIV(index: number, value: number)
    {
        if (value < 0) value = 0;
        if (value > 31) value = 31;

        ivs.value[index] = value;
    }
    function setEV(index: number, value: number)
    {
        if (value < 0) value = 0;
        if (value > 255) value = 255;

        evs.value[index] = value;
    }

    function checkEVs(): boolean
    {
        if (!evs.value) return false;

        const maxSum = 510;
        let sum = 0;
        for (let i = 0; i < evs.value.length; i++)
        {
            sum += evs.value[i] ?? 0;
        }
        return sum >= 0 && sum <= maxSum;
    }
    function calculateHP()
    {
        if (!evs.value) return;

        const evPoints = Math.floor(evs.value[0]! / 4);
        const stat = Math.floor(((2 * props.pokemon.stats[0]!.base_stat + ivs.value[0]! + evPoints) * level.value) / 100);
        return stat + level.value + 10;
    }

    function calculateStat(index: number)
    {
        const evPoints = Math.floor(evs.value[index]! / 4);
        const stat = ((2 * props.pokemon.stats[index]!.base_stat + ivs.value[index]! + evPoints) * level.value) / 100 + 5;
        return Math.floor(stat * natureMultiplier(index));
    }
    function natureMultiplier(index: number)
    {
        if (index == nature.value.increase && index != nature.value.decrease)
        {
            return 1.1;
        }
        if (index == nature.value.decrease && index != nature.value.increase)
        {
            return 0.9;
        }
        return 1;
    }
    function AddToTeam()
    {
        const pokemonInstance = {
            name: props.pokemon.name,
            level: level.value,
            nature: nature.value.name ?? 'hardy',
            ivs: [...ivs.value],
            evs: [...evs.value]
        };
        AddToList(pokemonInstance);
    }

    watch(() => ivs.value, (value) => {
        ivs.value.forEach((iv, index) => setIV(index, iv));
        //console.log("IVs changed:", value);
    }, { deep: true });
</script>

<template>
    <div class="stats-panel">
        <div class="card">
            <h2>Stats</h2>
            <input type="number" min="1" max="100" v-model="level" />
            <select v-model="nature" class="nature-select">
                <option v-for="(value, key) in natures" :key="key" :value="value">{{ key }}</option>
            </select>
            <!--ul>
                <li class="row" v-for="(stat, index) in pokemon.stats" :key="index">
                    <strong>{{ stat.stat.name }}:</strong>
                    <div>{{ stat.base_stat }}</div>
                    <input type="number" min="0" max="31" v-model="ivs[index]"></input>
                    <div v-if="index === 0">
                        {{ calculateHP() }}
                    </div>
                    <div v-else :class="{'increase': index === nature.increase && index !== nature.decrease, 'decrease': index === nature.decrease && index !== nature.increase}">
                        {{ calculateStat(index) }}
                    </div>

                    <input type="number" min="0" max="255" v-model="evs[index]"></input>
                </li>
            </ul-->
            <!--button v-if="!IsInCompareList(pokemon.name)" @click="AddToCompareList(pokemon.name)" class="add">Add To Team</button-->
            <div class="row">
                <div class="tableColumn">
                    <strong class="cell">Stat</strong>
                    <strong class="cell" v-for="(stat, index) in pokemon.stats" :key="index" >
                        {{ stat.stat.name }}
                    </strong>
                </div>
                <div class="tableColumn">
                    <strong class="cell">Base</strong>
                    <div class="cell" v-for="(stat, index) in pokemon.stats" :key="index" >
                        {{ stat.base_stat }}
                    </div>
                </div>
                <div class="tableColumn">
                    <strong class="cell">IVs</strong>
                    <div class="cell" v-for="(stat, index) in pokemon.stats" :key="index">
                        <input type="number" min="0" max="31" v-model="ivs[index]"></input>
                        <button @click="setIV(index, 0)">0</button>
                        <button @click="setIV(index, 31)">31</button>
                    </div>
                </div>
                <div class="tableColumn">
                    <strong class="cell">EVs</strong>
                    <div class="cell" v-for="(stat, index) in pokemon.stats" :key="index">
                        <input type="number" min="0" max="255" v-model="evs[index]"></input>
                        <button @click="setEV(index, 0)">0</button>
                        <button @click="setEV(index, 4)">4</button>
                        <button @click="setEV(index, 252)">252</button>
                        
                        <!--input type="range" min="0" max="252" step="4" v-model.number="evs[index]"></input-->
                    </div>
                </div>
                <div class="tableColumn">
                    <strong class="cell">Calculated</strong>
                    <div class="cell" v-for="(stat, index) in pokemon.stats" :key="index">
                        <div v-if="index === 0">
                            {{ calculateHP() }}
                        </div>
                        <div v-else :class="{'increase': index === nature.increase && index !== nature.decrease, 'decrease': index === nature.decrease && index !== nature.increase}">
                            {{ calculateStat(index) }}
                        </div>
                    </div>
                    
                </div>
            </div>
            <div v-if="!checkEVs()" class="error">Total EVs must be between 0 and 510.</div>
            <button v-if="!IsInList(pokemon.name)" @click="AddToTeam" class="add">Add To Team</button>
            
        </div>
    </div>
                
</template>

<style scoped>
.increase
{
    color: green;
}
.decrease
{
    color: red;
}
.error
{
    color: red;
    font-weight: bold;
}
.tableColumn
{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
}
.cell
{
    height: 24px;
}
</style>