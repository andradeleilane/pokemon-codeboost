// scripts do slide principal
var slide_hero = new Swiper(".slide-hero", {
  effect: 'fade',
  pagination: {
    el: ".slide-hero .main-area .area-explore .swiper-pagination",
  },
});

// modal pokemon

const cardPokemon  = document.querySelectorAll('.js-open-details-pokemon');
const btnCloseModal = document.querySelector('.js-close-modal-details-pokemon');
const countPokemons = document.getElementById('js-count-pokemons');

cardPokemon.forEach(card => {
  card.addEventListener('click', openDetailsPokemon);
})

if(btnCloseModal) {
  btnCloseModal.addEventListener('click', closeDetailsPokemon);
}

const btnDropdownSelect = document.querySelector('.js-open-select-custom');

btnDropdownSelect.addEventListener('click', () => {
  btnDropdownSelect.parentElement.classList.toggle('active');
})

// create card pokemon 
const areaPokemons = document.getElementById('js-list-pokemons');

function firstLetterCapitalized(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createCardPokemon(code, tipo, nome, imagePokemon) {
  let card = document.createElement('button');
  card.classList = `card-pokemon js-open-details-pokemon ${tipo}`;
  areaPokemons.appendChild(card);

  let image = document.createElement('div');
  image.classList = 'image'
  card.appendChild(image)

  let imageSrc = document.createElement('img');
  imageSrc.classList = 'thumb-img';
  imageSrc.setAttribute('src', imagePokemon);
  image.appendChild(imageSrc)

  let infoCardPokemon = document.createElement('div');
  infoCardPokemon.classList = 'info';
  card.appendChild(infoCardPokemon);

  let infoTextCardPokemon = document.createElement('div');
  infoTextCardPokemon.classList = 'text';
  infoCardPokemon.appendChild(infoTextCardPokemon);

  let codePokemon = document.createElement('span');
  codePokemon.textContent = (code < 10) ? `#00${code}` : (code < 100) ? `#0${code}` : `#${code}`;
  infoTextCardPokemon.appendChild(codePokemon);

  let namePokemon = document.createElement('h3');
  namePokemon.textContent = firstLetterCapitalized(nome);
  infoTextCardPokemon.appendChild(namePokemon);

  let areaIcon = document.createElement('div');
  areaIcon.classList = 'icon';
  infoCardPokemon.appendChild(areaIcon);

  let imgType = document.createElement('img');
  imgType.setAttribute('src', `images/icon-types/${tipo}.svg`);
  areaIcon.appendChild(imgType)


}

// pokemon list

function listingPokemons(urlApi) {
  axios({
    method: 'GET',
    url: urlApi
  })
  .then((response) => {
    const countPokemons = document.getElementById('js-count-pokemons');
    const { results, next, count } =  response.data;

    countPokemons.innerText = count;

    results.forEach(pokemon => {
      let urlApiDetails = pokemon.url;

      axios({
        method: 'GET',
        url: `${urlApiDetails}`
      })
      .then(response => {
        const { name, id, sprites, types } = response.data;
        
        const infoCard = {
          nome: name,
          code: id,
          image: sprites.other.dream_world.front_default,
          tipo: types[0].type.name
        }
        
        createCardPokemon(infoCard.code, infoCard.tipo, infoCard.nome, infoCard.image);

        const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');

        cardPokemon.forEach(card => {
          card.addEventListener('click', openDetailsPokemon);
        })
      })
    })
    
  })
}

listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');

function openDetailsPokemon() {
  document.documentElement.classList.add('open-modal');
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove('open-modal');
}
