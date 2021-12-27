<script context="module">
  export const prerender = true;
  import { currentPokemon } from '../../API/currentPokemon';

  let id;

  currentPokemon.subscribe(value => {
    id = value;
  });

  export async function load() {
    const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const speciesData = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    );
    const species = await speciesData.json();
    const pokemon = await pokemonData.json();
    return { props: { pokemon, species } };
  }
</script>

<script lang="ts">
  import '../../styles/types.css';
  export let pokemon;
  export let species;
  export let mainType: string = pokemon.types[0].type.name;

  const englishBio: string[] = [];

  species.flavor_text_entries.map((_, i: number) => {
    if (species.flavor_text_entries[i].language.name == 'en') {
      englishBio.push(species.flavor_text_entries[i].flavor_text);
    }
  });

  let bio: string = englishBio[0].replace(
    /[\u0000-\u001F-\u007F-\u009F]/g,
    ' '
  );

  let moveset = [];
  pokemon.moves.map(move => {
    let name = move.move.name;
    let level = move.version_group_details[0].level_learned_at;
    let method = move.version_group_details[0].move_learn_method.name;
    moveset.push({
      name: name,
      learnedAt: level,
      method: method
    });
  });

  console.log(
    moveset.sort((a, b) =>
      a.method > b.method ? 1 : b.method > a.method ? -1 : 0
    )
  );
</script>

<div class="main-info {mainType}">
  <a href="/">Back to List</a>
  <img
    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
    alt="Image of the pokemon {pokemon.name}."
  />

  <h1>{pokemon.name}</h1>
  <h2>#{pokemon.id}</h2>
</div>

<div class="pokemon-body">
  <div class="types">
    <h2>{pokemon.types.length > 1 ? 'Types' : 'Type'}</h2>
    <ul>
      {#each pokemon.types as type}
        <li class="type">{type.type.name}</li>
      {/each}
    </ul>
  </div>

  <div class="bio">
    <h3>Bio</h3>
    <p>
      {bio}
    </p>
  </div>

  <div class="abilities">
    <h3>Abilities</h3>
    <ul>
      {#each pokemon.abilities as ability}
        <li>{ability.ability.name}</li>
      {/each}
    </ul>
  </div>

  <div class="moveset">
    <h3>Moves</h3>
    <ul>
      {#each moveset as attack}
        <li>
          <strong>{attack.name}</strong>
          <ul>
            <li>
              Level: {attack.learnedAt} by {attack.method}
            </li>
          </ul>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .main-info {
    height: fit-content;
    position: fixed;
    width: 100%;
    top: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-bottom-left-radius: 50% 10%;
    border-bottom-right-radius: 50% 10%;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.25);
  }

  .main-info a {
    color: #fff;
    position: fixed;
    left: 20px;
    text-decoration: none;
    top: 20px;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
  }

  h1,
  h2 {
    margin: 0;
  }

  h2 {
    margin-bottom: 20px;
  }

  .pokemon-body {
    background: white;
    margin-top: 400px;
    padding: 0 10%;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 0 10px;
    justify-content: center;
  }

  li {
    margin: 0;
  }

  .types,
  .abilities {
    display: flex;
    align-items: center;
  }

  .abilities h3 {
    font-size: 16px;
  }

  .abilities li {
    border-right: 1px solid #333;
    padding: 0 10px;
  }

  .abilities li:first-of-type {
    padding-left: 0;
  }

  .abilities li:last-of-type {
    border-right: none;
  }

  .moveset {
    display: flex;
    align-items: flex-start;
  }

  .moveset ul {
    display: flex;
    flex-direction: column;
  }

  .type {
    padding: 10px 25px;
    border-radius: 50px;
    border: 1px solid black;
    flex-wrap: wrap;
  }

  .bio {
    display: flex;
  }

  .bio h3,
  .bio p {
    font-size: 16px;
  }
  .bio h3 {
    margin-right: 10px;
  }
  img {
    height: 250px;
    width: 250px;
    padding: 25px;
  }
</style>
