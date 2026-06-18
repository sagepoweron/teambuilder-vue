import { ref } from 'vue'

export const store = ref({
	list: [] as string[]
})


export function AddToCompareList(name: string)
{
	if (store.value.list.includes(name || '')) {
		// alert('This Pokemon is already in the compare list.');
		return;
	}
	store.value.list.push(name);
	// alert('Pokemon added to the compare list.');
}
export function RemoveFromCompareList(name: string)
{
	const index = store.value.list.indexOf(name);
	if (index > -1) {
		store.value.list.splice(index, 1);
		// alert('Pokemon removed from the compare list.');
	} else {
		// alert('This Pokemon is not in the compare list.');
	}
}
export function IsInCompareList(name: string): boolean
{
	return store.value.list.includes(name);
}

export function ClearCompareList()
{
	store.value.list = [];
	// alert('Compare list cleared.');
}