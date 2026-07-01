<script setup lang="ts">
    import type { Pokemon } from '@/types';
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
        adamant: {increase: statIds.attack, decrease: statIds.specialAttack},
        bashful: {increase: statIds.specialAttack, decrease: statIds.specialAttack},
        bold: {increase: statIds.defense, decrease: statIds.attack},
        brave: {increase: statIds.attack, decrease: statIds.speed},
        calm: {increase: statIds.specialDefense, decrease: statIds.attack},
        careful: {increase: statIds.specialDefense, decrease: statIds.specialAttack},
        docile: {increase: statIds.defense, decrease: statIds.defense},
        gentle: {increase: statIds.defense, decrease: statIds.defense},
        hardy: {increase: statIds.attack, decrease: statIds.attack},
        hasty: {increase: statIds.speed, decrease: statIds.defense},
        impish: {increase: statIds.defense, decrease: statIds.specialAttack},
        jolly: {increase: statIds.speed, decrease: statIds.specialAttack},
        lax: {increase: statIds.defense, decrease: statIds.specialDefense},
        lonely: {increase: statIds.attack, decrease: statIds.defense},
        mild: {increase: statIds.specialAttack, decrease: statIds.defense},
        modest: {increase: statIds.specialAttack, decrease: statIds.attack},
        naive: {increase: statIds.speed, decrease: statIds.specialDefense},
        naughty: {increase: statIds.attack, decrease: statIds.specialDefense},
        quiet: {increase: statIds.specialDefense, decrease: statIds.speed},
        quirky: {increase: statIds.specialDefense, decrease: statIds.specialDefense},
        rash: {increase: statIds.specialAttack, decrease: statIds.specialDefense},
        relaxed: {increase: statIds.defense, decrease: statIds.speed},
        sassy: {increase: statIds.specialDefense, decrease: statIds.speed},
        serious: {increase: statIds.speed, decrease: statIds.speed},
        timid: {increase: statIds.speed, decrease: statIds.attack}
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
            <div v-if="!checkEVs()" class="error">Total EVs must be between 0 and 510.</div>
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
                    </div>
                </div>
                <div class="tableColumn">
                    <strong class="cell">EVs</strong>
                    <div class="cell" v-for="(stat, index) in pokemon.stats" :key="index">
                        <input type="number" min="0" max="255" v-model="evs[index]"></input>
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