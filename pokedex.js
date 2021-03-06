alert('¡ Bienvenid@ !'); // extra de saludo

// const basePokemon = 'https://pokeapi.co/api/v2/pokemon/'; // URL pokemon, almaceno en variable

const pokeBola = document.getElementById('pokedex'); // doy valor a la variable con el elemento del html creado, para que me sirva de cajón
pokeBola.classList.add('pokedex'); // add clase


function recorrePokedex(number) {

    const pokebola = [];

    // atrapa el # que le doy en la línea 60
    // gener Loop, para crear ciertos números de id's para usarlo en urls
    for (let i = 1; i <= number; i++) { // le paso el argumento para que sea todo práctico, que será un # que paso en línea 60. O el cliente pasa.
        askPokemon(i) // me llamo a la función donde me obtniene los datos de la api
    }

    // puedo pasar el nombre o el id 
    function askPokemon(id) {
        // llamo fetch para recger sus datos 
        pokebola.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`) // pido desde su url y hago que me llame el id que pasa como argumento, pero tb se gana en el loop ffor de líena 22
            .then((pokemonGetApi) => {
                return pokemonGetApi.json(); // pido datos, y los convierto en json, fácil lectura
            }));
    }


    Promise.all(pokebola).then((results) => {

        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }))
        creaPokemon(pokemon);
    });

}

// aquí voy creando las tarjetas donde contendremos a los pokemones 
function creaPokemon(pokemon) { // mágica, me crea todo lo del dom desde js

    pokemon.forEach(element => {
        const card = document.createElement('div'); // add new elemento
        card.classList.add('card');

        // lo que va a contener la imagen 
        const spriteContainer = document.createElement('div'); // add new elemento
        spriteContainer.classList.add('img-content'); // add clase

        const sprite = document.createElement('img'); // add new elemento
        sprite.classList.add('card-image') // add clase
        sprite.src = element.image; // puedo anotar con corchetes o con .fornt_defaul que es como la api le llama a esa imagen en espcifica , tengo que llamar con src 

        spriteContainer.appendChild(sprite);

        const number = document.createElement('p'); // add new elemento
        number.classList.add('card-subtitle') // add clase
        number.textContent = `#${element.id}` // le pongo el # para que me de el número junto al # ex #1  y así

        const name = document.createElement('p'); // add new elemento
        name.classList.add('card-title'); // add clase
        name.textContent = element.name;


        card.appendChild(spriteContainer); //asigno hijos
        card.appendChild(number); //asigno hijos
        card.appendChild(name); //asigno hijos
        pokeBola.appendChild(card); //asigno hijos
    });
}
// recorrePokedex(151); // aquí hago llamada del LOop, Y COMIENZA LA MAGIA -- Vittorio, recuerda ponerle el número que quiero como argumento/ parametreo. Manual desde dentro

recorrePokedex(prompt(`Indíca el # de pokemones que deseas obtener.
                         Pero... Sólo puedes ver un máximo de 800 POKEMONES.`)); // aquí ponemos lo que yo quiero, es que el cliente me diga que cantidad de pokemones quiere VER... él elige el #, no yo. Bien!