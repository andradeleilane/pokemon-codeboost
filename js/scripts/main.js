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
  card.setAttribute('code-pokemon', code);
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

  let codePokemon = this.getAttribute('code-pokemon');
  let imagePokemon = this.querySelector('.thumb-img');
  let iconTypePokemon = this.querySelector('.info .icon img');
  let namePokemon = this.querySelector('.info h3').textContent;
  let codeStringPokemon = this.querySelector('.info span').textContent;
  
  const modalDetails = document.getElementById('js-modal-details');
  const imagePokemonModal = document.getElementById('js-image-pokemon-modal');
  const iconTypePokemonModal = document.getElementById('js-image-type-modal');
  const namePokemonModal = document.getElementById('js-name-pokemon-modal');
  const codePokemonModal = document.getElementById('js-code-pokemon-modal');


  imagePokemonModal.setAttribute('src', imagePokemon.getAttribute('src'))
  modalDetails.setAttribute('type-pokemon-modal', this.classList[2]);
  iconTypePokemonModal.setAttribute('src', iconTypePokemon.getAttribute('src'));

  namePokemonModal.textContent = namePokemon;
  codePokemonModal.textContent = codeStringPokemon;

  /*
  axios({
    method: 'GET',
    url: `https://pokeapi.co/api/v2/pokemon/${codePokemon}`
  })
  .then(response => {
    console.log(response.data.name)
  })*/
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove('open-modal');
}

// List pokemons types

const areaTypes =  document.getElementById('js-type-area');
const areaTypesMobile = document.querySelector('.dropdown-select');

axios({
  method: 'GET',
  url: 'https://pokeapi.co/api/v2/type'
})
.then(response => {
  const { results } = response.data;
  results.forEach((type, index) => {
      if(index < 18) {
        let itemType = document.createElement('li');
        areaTypes.appendChild(itemType);

        let buttonType = document.createElement('button');
        buttonType.classList = `type-filter ${type.name}`;
        buttonType.setAttribute('code-type', index + 1);
        itemType.appendChild(buttonType);

        let iconType = document.createElement('div');
        iconType.classList = "icon";
        buttonType.appendChild(iconType);

        let srcType = document.createElement('img');
        srcType.setAttribute('src', `images/icon-types/${type.name}.svg`)
        iconType.appendChild(srcType);

        let nameType = document.createElement('span');
        nameType.textContent = firstLetterCapitalized(type.name);
        buttonType.appendChild(nameType);

        // Select mobile
        let itemTypeMobile = document.createElement('li');
        areaTypesMobile.appendChild(itemTypeMobile);

        let buttonTypeSelectMobile = document.createElement('button');
        buttonTypeSelectMobile.classList = `type-filter ${type.name}`;
        buttonTypeSelectMobile.setAttribute('code-type', index +1);
        itemTypeMobile.appendChild(buttonTypeSelectMobile);

        let iconTypeMobile = document.createElement('div');
        iconTypeMobile.classList = "icon";
        buttonTypeSelectMobile.appendChild(iconTypeMobile);

        let srcTypeMobile = document.createElement('img');
        srcTypeMobile.setAttribute('src', `images/icon-types/${type.name}.svg`)
        iconTypeMobile.appendChild(srcTypeMobile);

        let nameTypeMobile = document.createElement('span');
        nameTypeMobile.textContent = firstLetterCapitalized(type.name);
        buttonTypeSelectMobile.appendChild(nameTypeMobile);

        const allTypes = document.querySelectorAll('.type-filter');

        allTypes.forEach(btn => {
          btn.addEventListener('click', filterByTypes);
        })

      }
  })
})

// function load more

const btnLoadMore = document.getElementById('js-btn-load-more');

let countPagination = 10;

function showMorePokemon() {
  listingPokemons(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`);

  countPagination = countPagination + 9;
}

btnLoadMore.addEventListener('click', showMorePokemon);

// Filter by type

function filterByTypes() {

  let idPokemon = this.getAttribute('code-type');

  const areaPokemons = document.getElementById('js-list-pokemons');
  const btnLoadMore = document.getElementById('js-btn-load-more');
  const countPokemonsType = document.getElementById('js-count-pokemons');
  const allTypes = document.querySelectorAll('.type-filter');

  areaPokemons.innerHTML = "";
  btnLoadMore.style.display = "none";

  const sectionPokemons = document.querySelector('.s-all-info-pokemons');
  const topSection = sectionPokemons.offsetTop;

  window.scrollTo({
    top: topSection + 288, 
    behavior: 'smooth'
  })

  allTypes.forEach(type => {
    type.classList.remove('active')
  })

  this.classList.add('active');

  if(idPokemon) {
    axios({
      method: 'GET',
      url: `https://pokeapi.co/api/v2/type/${idPokemon}`
    })
    .then(response => {
      const { pokemon } = response.data;
      countPokemonsType.textContent = pokemon.length;
  
      pokemon.forEach(pok => {
        const { url } = pok.pokemon;
  
        axios({
          method: 'GET', 
          url: `${url}`
        })
        .then(response => {
          const { name, id, sprites, types } = response.data;
          
          const infoCard = {
            nome: name,
            code: id,
            image: sprites.other.dream_world.front_default,
            tipo: types[0].type.name
          }
          
          if(infoCard.image) {
            createCardPokemon(infoCard.code, infoCard.tipo, infoCard.nome, infoCard.image);
          }
          
          const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
  
          cardPokemon.forEach(card => {
            card.addEventListener('click', openDetailsPokemon);
          })
        })
  
      })
    })

  } else {
    areaPokemons.innerHTML = "";
    listingPokemons(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`);
    btnLoadMore.style.display = "block";
  }
  
}

// search pokemons

const btnSearch = document.getElementById('js-btn-search');
const inputSearch = document.getElementById('js-input-search');

btnSearch.addEventListener('click', searchPokemon);
inputSearch.addEventListener('keyup', (event) => {
  if(event.code == 'Enter') {
    searchPokemon();
  }
})

function searchPokemon() {
  let valueInput = inputSearch.value.toLowerCase();
  const typeFilter = document.querySelectorAll('.type-filter');

  typeFilter.forEach(type => {
    type.classList.remove('active');
  })

  axios({
    method: 'GET',
    url: `https://pokeapi.co/api/v2/pokemon/${valueInput}`
  })
  .then(response => {
    areaPokemons.innerHTML = "";
    btnLoadMore.style.display = 'none';
    countPokemons.textContent = 1;

    const { name, id, sprites, types } = response.data;
          
      const infoCard = {
        nome: name,
        code: id,
        image: sprites.other.dream_world.front_default,
        tipo: types[0].type.name
      }
          
      if(infoCard.image) {
        createCardPokemon(infoCard.code, infoCard.tipo, infoCard.nome, infoCard.image);
      }
          
      const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
  
        cardPokemon.forEach(card => {
          card.addEventListener('click', openDetailsPokemon);
      })
  })
  .catch((error) => {
    if(error.response) {
      areaPokemons.innerHTML = "";
      btnLoadMore.style.display = 'none';
      countPokemons.textContent = 0;
      alert('Nenhum resultado encontrado com essa pesquisa.');
    }
  })

}