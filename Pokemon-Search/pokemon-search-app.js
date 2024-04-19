const form = document.getElementById("pokemon-form");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonImg = document.getElementById("img");
const pokemonTypes = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

// targetting loading message element
const loadingMessage = document.getElementById("loading-message");

const displayLoadingMessage = () => {
    loadingMessage.style.display = "block";
};

const hideLoadingMessage = () => {
    loadingMessage.style.display = "none";
};

const displayPokemon = () => {
    // display loading message
    displayLoadingMessage();

    // declare input.value
    const searchInput = document.getElementById("search-input").value;
    // check if input is not Red
    const normalizedInput = searchInput.toLowerCase() !== "red" ? searchInput.toLowerCase() : searchInput;
    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${normalizedInput}`)
        .then((res) => res.json())
        .then((pokemon) => {
            // hide loading message after fetching pokemon data
            hideLoadingMessage();

            const { id, name, sprites, weight, height, types, stats } = pokemon;

            pokemonName.textContent = `${name}`;
            pokemonId.textContent = `#${id}`;
            pokemonWeight.textContent = `Weight: ${weight}`;
            pokemonHeight.textContent = `Height: ${height}`;
            pokemonImg.innerHTML = `<img id="sprite" src="${sprites.front_default}" alt="${name}" />`;
            pokemonTypes.innerHTML = types.length === 1 ? `<span class="type">${types[0].type.name}</span>` 
            : `<span class="type">${types[0].type.name}</span> <span class="type">${types[1].type.name}</span>`;

            hp.textContent = `${stats[0].base_stat}`;
            attack.textContent = `${stats[1].base_stat}`;
            defense.textContent = `${stats[2].base_stat}`;
            specialAttack.textContent = `${stats[3].base_stat}`;
            specialDefense.textContent = `${stats[4].base_stat}`;
            speed.textContent = `${stats[5].base_stat}`;
        })
    .catch((err) => {
        // hide loading message upon error
        hideLoadingMessage();

        pokemonName.innerHTML = "Pokémon not found";
        pokemonId.textContent = ""
        pokemonWeight.textContent = ""
        pokemonHeight.textContent = ""
        pokemonImg.innerHTML = ""
        pokemonTypes.innerHTML = ""
        hp.textContent = "";
        attack.textContent = "";
        defense.textContent = "";
        specialAttack.textContent = "";
        specialDefense.textContent = "";
        speed.textContent = "";
    });

    //alert if input is "Red"
    if (searchInput.toLowerCase() === "red") {
        alert("Pokémon not found");
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    displayPokemon();
})
searchBtn.addEventListener("click", displayPokemon);
