import type { Pokemon } from "@/types";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

export async function GetPokemon(query: string): Promise<Pokemon | null>
{
    try
    {
        const response = await fetch(BASE_URL + encodeURIComponent(query));

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

    return null;
}

export async function GetPokemonList(offset: string, limit: string): Promise<Array<{ name: string, url: string }>>
{
    try
    {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        const response = await fetch(url);

        if (!response.ok)
        {
            throw new Error("Unable to fetch data");
        }

        const data = await response.json();

        return data.results;
    }
    catch (error)
    {
        console.error(error);
    }

    return [];
}

export async function SearchPokemon(query: string) {
    try {
        const response = await fetch(`${BASE_URL}${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error("Pokemon not found.");
        }

        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}