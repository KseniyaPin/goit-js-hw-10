// export { fetchBreeds, fetchCatByBreed };

// function fetchBreeds() {
//   addMessageLoader();
//   breedSelect.classList.add('is-hidden');
//   return fetch(`${BASE_URL}/v1/breeds?limit=20&has_breeds=1&api_key=${API_KEY}`)
//     .then(resp => {
//       if (!resp.ok) {
//         throw new Error(resp.statusText);
//       }
//       return resp.json();
//     })
//     .then(data => createMarkup(data))
//     .catch(() => addMessageError())
//     .finally(() => noMessageLoader());
// }

// // ============

// function fetchCatByBreed(evt) {
//   // console.log('Changed to: ' + evt.target.value);
//   addMessageLoader();
//   catInfo.classList.add('is-hidden');
//   return fetch(`${BASE_URL}/v1/images/${evt.target.value}`)
//     .then(resp => {
//       if (!resp.ok) {
//         throw new Error(resp.statusText);
//       }
//       return resp.json();
//     })
//     .then(data => (catInfo.innerHTML = createMarkupBreed(data)))
//     .catch(() => addMessageError())
//     .finally(() => noMessageLoader());
// }
