import type { Pokemon } from '@/types';
import { ref } from 'vue'
import { GetPokemon } from '@/api/api';

export const store = ref({
	list: [] as Pokemon[]
})


export async function AddPokemonByName(name: string)
    {
        const pokemon = await GetPokemon(name);
        if (pokemon) {
            Add(pokemon);
        }
    }

export function Add(pokemon: Pokemon)
{
	if (store.value.list.some(p => p.name === pokemon.name)) {
		// alert('This Pokemon is already in the compare list.');
		return;
	}
	store.value.list.push(pokemon);
	// alert('Pokemon added to the compare list.');
}
export function Remove(pokemon: Pokemon)
{
	const index = store.value.list.indexOf(pokemon);
	if (index > -1) {
		store.value.list.splice(index, 1);
		// alert('Pokemon removed from the compare list.');
	} else {
		// alert('This Pokemon is not in the compare list.');
	}
}
export function IsInList(name: string): boolean
{
	return store.value.list.some(p => p.name === name);
}

export function Clear()
{
	store.value.list = [];
	// alert('Compare list cleared.');
}

export function DebugList()
{
	console.log('Current compare list:', store.value.list);
}