import { ref } from 'vue'


interface Pokemon
{
	id: number
	name: string
	level: number
	nature: string
	ivs: number[]
	evs: number[]
}


export const store = ref({
	list: [] as Pokemon[]
})


export function AddToList(pokemon: Pokemon)
{
	if (store.value.list.includes(pokemon)) {
		// alert('This Pokemon is already in the compare list.');
		return;
	}
	store.value.list.push(pokemon);
	// alert('Pokemon added to the compare list.');
}
export function RemoveFromList(pokemon: Pokemon)
{
	const index = store.value.list.indexOf(pokemon);
	if (index > -1) {
		store.value.list.splice(index, 1);
		// alert('Pokemon removed from the compare list.');
	} else {
		// alert('This Pokemon is not in the compare list.');
	}
}
export function IsInCompareList(pokemon: Pokemon): boolean
{
	return store.value.list.includes(pokemon);
}

export function ClearCompareList()
{
	store.value.list = [];
	// alert('Compare list cleared.');
}