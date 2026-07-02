import { ref } from 'vue'


interface TeamMember
{
	name: string
	level: number
	nature: string
	ivs: number[]
	evs: number[]
}


export const store = ref({
	list: [] as TeamMember[]
})


export function AddToList(instance: TeamMember)
{
	if (store.value.list.length >= 6) {
		alert('Your team is full. You cannot add more than 6 Pokemon.');
		return;
	}
	if (store.value.list.some(p => p.name === instance.name)) {
		alert('This Pokemon is already in your team.');
		return;
	}
	store.value.list.push(instance);
	alert('Pokemon added to your team.');
}
export function RemoveFromList(instance: TeamMember)
{
	const index = store.value.list.findIndex(p => p.name === instance.name);
	if (index > -1) {
		store.value.list.splice(index, 1);
		alert('Pokemon removed from your team.');
	} else {
		alert('This Pokemon is not in your team.');
	}
}
export function RemoveFromListByName(name: string)
{
	const index = store.value.list.findIndex(p => p.name === name);
	if (index > -1) {
		store.value.list.splice(index, 1);
		alert('Pokemon removed from your team.');
	} else {
		alert('This Pokemon is not in your team.');
	}
}
export function RemoveByIndex(index: number)
{
	if (index > -1 && index < store.value.list.length) {
		store.value.list.splice(index, 1);
		alert('Pokemon removed from your team.');
	} else {
		alert('Invalid index.');
	}
}
export function IsInList(name: string): boolean
{
	return store.value.list.some(p => p.name === name);
}

export function ClearList()
{
	store.value.list = [];
	alert('Your team has been cleared.');
}