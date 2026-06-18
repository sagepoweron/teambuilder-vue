import { reactive } from 'vue'

export const store = reactive({
	list: [] as string[]
})

export function AddToCompareList(name: string)
{
	if (store.list.includes(name || '')) {
		// alert('This Pokemon is already in the compare list.');
		return;
	}
	store.list.push(name);
	// alert('Pokemon added to the compare list.');
}
export function RemoveFromCompareList(name: string)
{
	const index = store.list.indexOf(name);
	if (index > -1) {
		store.list.splice(index, 1);
		// alert('Pokemon removed from the compare list.');
	} else {
		// alert('This Pokemon is not in the compare list.');
	}
}
export function IsInCompareList(name: string): boolean
{
	return store.list.includes(name);
}

export function ClearCompareList()
{
	store.list = [];
	// alert('Compare list cleared.');
}