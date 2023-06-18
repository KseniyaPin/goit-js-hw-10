// import { fetchBreeds, fetchCatByBreed } from './cat-api';

import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const BASE_URL = 'https://api.thecatapi.com';
const API_KEY =
  'live_q0Y0NSriP2bgV4TqApf6tXUgwEV2DmOJkn0L8NIDEsVTn7SPPwazZlUODCI5tkt9';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const messageLoader = document.querySelector('.loader');
const messageError = document.querySelector('.error');

// alert('Begin');
breedSelect.classList.add('is-hidden');
noMessageError();

//----- export--------------------------------

function fetchBreeds() {
  addMessageLoader();
  breedSelect.classList.add('is-hidden');
  return fetch(`${BASE_URL}/v1/breeds?limit=20&has_breeds=1&api_key=${API_KEY}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .then(data => createMarkup(data))
    .catch(() => addMessageError())
    .finally(() => noMessageLoader());
}
//-------------------------------------

function createMarkup(arr) {
  breedSelect.classList.remove('is-hidden');

  return (breedSelect.innerHTML = arr
    .map(
      ({ reference_image_id, name }) =>
        `<option value="${reference_image_id}">${name}</option>`
    )
    .join(''));
}

fetchBreeds();

new SlimSelect({
  select: 'breed-select',
});

breedSelect.addEventListener('change', fetchCatByBreed);

// Пользователь делает выбор в селекте
//----- export--------------------------------

function fetchCatByBreed(evt) {
  console.log('Changed to: ' + evt.target.value);
  addMessageLoader();
  catInfo.classList.add('is-hidden');
  return fetch(`${BASE_URL}/v1/images/${evt.target.value}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .then(data => (catInfo.innerHTML = createMarkupBreed(data)))
    .catch(() => addMessageError())
    .finally(() => noMessageLoader());
}
//-------------------------------------

function createMarkupBreed(objImgResponse) {
  catInfo.classList.remove('is-hidden');
  return `<img src="${objImgResponse.url}" alt="${objImgResponse.breeds[0].name}" width="400px" class="imgStyle"><div class="styleInfo"><h2>${objImgResponse.breeds[0].name}</h2> <p> ${objImgResponse.breeds[0].description} </p><h3>Temperament:</h3><p>${objImgResponse.breeds[0].temperament} </p></div>`;
}
// ==----------------------------------------------------
function noMessageLoader() {
  messageLoader.classList.add('is-hidden');
}

function addMessageLoader() {
  messageLoader.classList.remove('is-hidden');
}

function noMessageError() {
  messageError.classList.add('is-hidden');
}

function addMessageError() {
  Notiflix.Notify.failure(`${messageError.textContent}`);
  messageError.classList.add('is-hidden');
  breedSelect.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');
}
