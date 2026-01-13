/*import { useFetch } from 'nuxt/app';
import { Pokemon } from '~/types';

export const GetPokemon = async () => {

//const { isFetching, error, data: pokemon } = await useFetch<Pokemon>('https://pokeapi.co/api/v2/pokemon/25');
    const { data, pending, error, refresh } = await useFetch('https://pokeapi.co/api/v2/pokemon/25')

    console.log(data);

    return data;
    try
    {
        const url = `https://pokeapi.co/api/v2/pokemon/25`
        const response = await fetch(url);

        if (!response.ok)
        {
            throw new Error("Unable to fetch data");
        }

        const data = await response.json();

        if (typeof data.results !== 'undefined')
        {
            return data.results;
        }

        return data;
    }
    catch (error)
    {
        console.error(error);
    }
}*/



export const GetPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/25');
    const data = await response.json();
    return data;
}