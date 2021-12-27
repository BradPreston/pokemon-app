<script context="module" lang="ts">
  export const prerender = true;
  import { pokemonList } from '../API/getAllPokemon';
</script>

<script>
  import { currentPokemon } from '../API/currentPokemon';
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="wrapper">
  <img
    src="https://www.onlinepalette.com/wp-content/uploads/2021/07/Pokemon-Logo-768x432.png"
    alt="Pokemon Logo"
  />
  <ul>
    {#each $pokemonList as pokemon}
      <li>
        <a
          href="/pokemon/{pokemon.name}"
          on:click={() => currentPokemon.set(pokemon.id)}
          sveltekit:prefetch>{pokemon.name}</a
        >
      </li>
    {/each}
  </ul>
</div>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background: #fff;
  }

  img {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
  }

  .wrapper {
    padding: 20px;
  }

  :global(body) {
    font-family: Arial, Helvetica, sans-serif;
  }

  ul {
    list-style: none;
  }

  li {
    text-align: center;
  }

  a {
    color: #0a285f;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    text-transform: capitalize;
    line-height: 2;
    transition: all 0.1s ease-in-out;
  }

  a:hover {
    color: #0075be;
    font-size: 20px;
    line-height: 1.58;
    font-weight: bold;
  }
</style>
