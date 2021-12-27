import { writable } from 'svelte/store';

export const singlePokemon = writable();

export const getSinglePokemon = async (pokemon: any) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await res.json();

  singlePokemon.set(data);
};
