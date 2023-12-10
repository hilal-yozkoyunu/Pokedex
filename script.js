let currentPokemon;
let allPokemon = [];
let apiData = [];
let myChart;
let number = 50;
let start = 0;
let searchOutput = [];

async function loadAllPokemon(){
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${number}`;
    let response = await fetch(url);
    let allPokemonAsJson = await response.json();
    allPokemon = allPokemonAsJson["results"];
    renderAllPokemon();
}

async function renderAllPokemon(){
    for (let i = 0 + start; i < allPokemon.length; i++) {
        let PokemonUrl = allPokemon[i].url;
        let pokemonResponse = await fetch(PokemonUrl);
        let currentPokemon = await pokemonResponse.json();
        let mainContent = document.getElementById('main-content');
        let typesHtml = "";

        for (let j = 0; j < currentPokemon.types.length; j++) {
            let type = currentPokemon.types[j];
            typesHtml += `<div class="type">${type.type.name}</div>`;
        }

        let abil = [];
        let currentImage = currentPokemon.sprites.other.dream_world.front_default;
        let currentWeigth = (currentPokemon['weight']*0.1).toFixed(2).replace('.',',');
        let currentHeight = (currentPokemon['height']*0.1).toFixed(2).replace('.',',');
        let currentAbilities = currentPokemon.abilities;
        let currentHP = currentPokemon['stats']['0']['base_stat'];
        let currentAttack = currentPokemon['stats']['1']['base_stat'];
        let currentDefense = currentPokemon['stats']['2']['base_stat'];
        let currentSpatk = currentPokemon['stats']['3']['base_stat'];
        let currentSpdef = currentPokemon['stats']['4']['base_stat'];
        let currentSpeed = currentPokemon['stats']['5']['base_stat'];


        for (let k=0; k < currentAbilities.length; k++){
            let abi = [];
            abi += currentAbilities[k]['ability']['name'];
            abil.push(abi);
        }
        let abilitiesString = abil.join('<br>');

        mainContent.innerHTML += `
            <div id="content-${i} hoverCard" data-name="${allPokemon[i].name}" class="content" onclick="showPokemon(${i}, '${currentImage}', '${currentHeight}', '${currentWeigth}', '${abilitiesString}', '${currentHP}', '${currentAttack}', '${currentDefense}', '${currentSpatk}', '${currentSpdef}', '${currentSpeed}')"> 
                <div class="pokemonName">
                    ${allPokemon[i].name}
                </div>
                <div class="pokemonTypes">
                    ${typesHtml}
                </div>
            
                <div class="pokemonImage">
                    <img class="pokemonImage" src="${currentImage}">
                </div>
            </div>`;

    
        getBackgroundColor(currentPokemon, i);
    };
}

function getBackgroundColor(currentPokemon, index){
    let firstType = currentPokemon.types[0].type.name;
    let contentElement = document.getElementsByClassName('content')[index];

    if (firstType == 'grass') { contentElement.classList.add('bg-grass'); }
    if (firstType == 'fire') { contentElement.classList.add('bg-fire'); }
    if (firstType == 'water') { contentElement.classList.add('bg-water'); }
    if (firstType == 'bug') { contentElement.classList.add('bg-bug'); }
    if (firstType == 'normal') { contentElement.classList.add('bg-normal'); }
    if (firstType == 'poison') { contentElement.classList.add('bg-poison'); }
    if (firstType == 'electric') { contentElement.classList.add('bg-electric'); }
    if (firstType == 'ground') { contentElement.classList.add('bg-ground'); }
    if (firstType == 'fairy') { contentElement.classList.add('bg-fairy'); }
    if (firstType == 'psychic') { contentElement.classList.add('bg-psychic'); }
    if (firstType == 'fighting') { contentElement.classList.add('bg-fighting'); }
    if (firstType == 'rock') { contentElement.classList.add('bg-rock'); }
    if (firstType == 'ghost') { contentElement.classList.add('bg-ghost'); }
    if (firstType == 'ice') { contentElement.classList.add('bg-ice'); }
    if (firstType == 'dragon') { contentElement.classList.add('bg-dragon'); }
    if (firstType == 'dark') { contentElement.classList.add('bg-dark'); }
    if (firstType == 'steel') { contentElement.classList.add('bg-steel'); }
}

function showPokemon(i, currentImage, currentHeight, currentWeigth, abilitiesString, currentHP, currentAttack, currentDefense, currentSpatk, currentSpdef, currentSpeed) {
    let card = document.getElementById('popup');
    card.classList.remove('d-none');

    let cardHeader = document.getElementById('card-header');
    cardHeader.innerHTML ="";
    cardHeader.innerHTML +=`<div class="headline-header">
                                <div class="pokemonName">
                                    ${allPokemon[i].name}
                                </div>
                                <div onclick="closeCard()">
                                <img class="close-pokeball" src="./img/pokeball-2.png"></div>
                            </div>
                            <div class="pokemonImage-main-main">
                                <img class="pokemonImage-main" src="${currentImage}">
                            </div>`;

    getInfoAbout(currentHeight, currentWeigth, abilitiesString);
    getStatsInfo(currentHP, currentAttack, currentDefense, currentSpatk, currentSpdef, currentSpeed, i);
}

function getInfoAbout(currentHeight, currentWeight, abilitiesString){
    let info = document.getElementById('info-cont');
    info.innerHTML = "";
    info.innerHTML += `<div class="height-info"> Height: ${currentHeight} m <br> Weight: ${currentWeight} kg <br> Abilities: <br>${abilitiesString}</div>`;
}


function getStatsInfo(currentHP, currentAttack, currentDefense, currentSpatk, currentSpdef, currentSpeed, i){
    apiData[i] = [currentHP, currentAttack, currentDefense, currentSpatk, currentSpdef, currentSpeed];
    createChart(apiData[i], allPokemon);
    let chartcont = document.getElementById('chart-cont');
}

function openAbout(){
    document.getElementById('info-cont').classList.remove('d-none');
    document.getElementById('chart-cont').classList.add('d-none');
}

function openBaseStats(){
    document.getElementById('chart-cont').classList.remove('d-none');
    document.getElementById('info-cont').classList.add('d-none');
}

function closeCard(){
    document.getElementById('popup').classList.add('d-none');
    destroyChart();
    document.getElementById('chart-cont').classList.add('d-none');
    document.getElementById('info-cont').classList.remove('d-none');
}


function createChart(apiData){

    const ctx = document.getElementById('myChart').getContext('2d');
    let apiLabels = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: apiLabels,
            datasets: [{
                data: apiData,
                backgroundColor: ['#47d1b188', '#fb6c6c85', '#76bffe87', '#e3c48288', '#f2983882', '#cea6cc83'],
            }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
                position: 'left',
                title: {
                    display: false,
                }
             }
          },
        }
    })
}


function destroyChart(){
    myChart.destroy();
}

function loadMorePokemon(){
    number = number + 50; 
    start = start + 50;
    loadAllPokemon();
}



function filterNames() {
    let search = document.getElementById('search').value.toLowerCase();
    let filteredPokemon = [];

    for (let j = 0; j < allPokemon.length; j++) {
        let pokemonName = allPokemon[j].name.toLowerCase();
        let pokemonContainer = document.getElementById(`content-${j}`);

        if (pokemonName.includes(search)) {
            filteredPokemon.push(j);
        }

        if (filteredPokemon.includes(j)) {
            pokemonContainer.style.display = ''; 
        } else {
            pokemonContainer.style.display = 'none'; 
        }
    }
}

function showFilteredPokemon(filteredPokemon) {
    for (let i = 0; i < allPokemon.length; i++) {
        let pokemonContainer = document.getElementById(`main-content`);
        let flipCard = document.getElementById(`content-${i}`);

        if (filteredPokemon.includes(i)) {
            pokemonContainer.style.display = ''; 
            flipCard.style.display = '';
        } else {
            pokemonContainer.style.display = 'none'; 
            flipCard.style.display = 'none'; 
        }
    }
}
