import { writable } from 'svelte/store';

export const pokemonList = writable([]);

const getallPokemon = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151');
  const data = await res.json();

  const pokemonData = data.results.map((data, index) => {
    return {
      name: data.name,
      id: index + 1,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        index + 1
      }.png`
    };
  });
  pokemonList.set(pokemonData);
};

getallPokemon();
