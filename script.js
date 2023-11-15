//let currentPokemon;
let allPokemon = [];


async function loadAllPokemon(){
    let url = "https://pokeapi.co/api/v2/pokemon?limit=99";
    let response = await fetch(url);
    let allPokemonAsJson = await response.json();
    //console.log('loaded pokemon', allPokemonAsJson);
    allPokemon = allPokemonAsJson["results"];
    renderAllPokemon();
}

async function renderAllPokemon(){
    for (let i = 0; i < allPokemon.length; i++) {
        let PokemonUrl = allPokemon[i].url;
        let pokemonResponse = await fetch(PokemonUrl);
        let currentPokemon = await pokemonResponse.json();
        //let type = currentPokemon.types[i];

        let mainContent = document.getElementById('main-content');
        let typesHtml = "";

        for (let j = 0; j < currentPokemon.types.length; j++) {
            let type = currentPokemon.types[j];
            typesHtml += `<div class="type">${type.type.name}</div>`;
        }

        mainContent.innerHTML += `
            <div id="content" class="content"> 
                <div class="pokemonName">
                    ${allPokemon[i].name}
                </div>
                <div class="pokemonTypes">
                    ${typesHtml}
                </div>
            
                <div class="pokemonImage">
                    <img class="pokemonImage-main" src="${currentPokemon.sprites.other.dream_world.front_default}">
                </div>
            </div>`;
    getBackgroundColor(currentPokemon, i);
    }
    
}

function getBackgroundColor(currentPokemon, index){
    let firstType = currentPokemon.types[0].type.name; // Beachte, dass currentPokemon nicht in dieser Funktion verfügbar ist
    let contentElement = document.getElementsByClassName('content')[index];

    if (firstType == 'grass') {
        contentElement.classList.add('bg-grass');
    }
    if (firstType == 'fire') {
        contentElement.classList.add('bg-fire');
    }
    if (firstType == 'water') {
        contentElement.classList.add('bg-water');
    }
    if (firstType == 'bug') {
        contentElement.classList.add('bg-bug');
    }
    if (firstType == 'normal') {
        contentElement.classList.add('bg-normal');
    }
    if (firstType == 'poison') {
        contentElement.classList.add('bg-poison');
    }
    if (firstType == 'electric') {
        contentElement.classList.add('bg-electric');
    }
    if (firstType == 'ground') {
        contentElement.classList.add('bg-ground');
    }
    if (firstType == 'fairy') {
        contentElement.classList.add('bg-fairy');
    }
    if (firstType == 'psychic') {
        contentElement.classList.add('bg-psychic');
    }
    if (firstType == 'fighting') {
        contentElement.classList.add('bg-fighting');
    }
    if (firstType == 'rock') {
        contentElement.classList.add('bg-rock');
    }
    if (firstType == 'ghost') {
        contentElement.classList.add('bg-ghost');
    }
}