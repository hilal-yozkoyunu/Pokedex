let currentPokemon;
let allPokemon;
let pokemons = [];


async function loadPokemon(){
    let url = "https://pokeapi.co/api/v2/pokemon?limit=151";
    let response = await fetch(url);
    /*allPokemon = await response.json();*/

    currentPokemon = await response.json();
    console.log('loaded pokemon', currentPokemon);
    renderPokemonInfo();
}

function renderPokemonInfo(){
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
   /* document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['dream_world']['front_default'];*/
}

