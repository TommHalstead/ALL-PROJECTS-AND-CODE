'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText(`beforebegin`, msg);
//   // countriesContainer.style.opacity = 1;
// };

// const renderCountry = function (data, className = ``) {
//   // set className to default ``, incase we don't want one so we don't get errors.
//   const languages = data.languages[Object.keys(data.languages)[0]];
//   const currencies = Object.values(data.currencies)[0].name;
//   let html = `
//   <article class="country ${className}">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.official}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} Million</p>
//       <p class="country__row"><span>🗣️</span>${languages}</p>
//       <p class="country__row"><span>💰</span>${currencies}</p>
//     </div>
//   </article>`;
//   countriesContainer.insertAdjacentHTML(`beforeend`, html);
//   // countriesContainer.style.opacity = 1;
// };

///////////////////////////////////////

// const getCountryData = function (countryCode) {
//   // Create AJAX request
//   const request = new XMLHttpRequest();
//   // OPEN request and SET or GET
//   request.open(`GET`, `https://restcountries.com/v3.1/alpha/${countryCode}`);
//   // Send request
//   request.send();
//   // Add eventHandler to listen for load event and data
//   request.addEventListener(`load`, function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     let html = `
//   <article class="country">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.official}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} Million</p>
//       <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
//       <p class="country__row"><span>💰</span>${data.currencies.USD.name}</p>
//     </div>
//   </article>`;
//     countriesContainer.insertAdjacentHTML(`afterbegin`, html);
//     countriesContainer.style.opacity = 1;
//   });
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const getCountryAndNeighbor = function (countryCode) {
//   // Create AJAX request
//   const request = new XMLHttpRequest();
//   // OPEN a request. With SET OR GET
//   request.open(`GET`, `https://restcountries.com/v3.1/alpha/${countryCode}`);
//   // Send request
//   request.send();
//   // Add eventHandler to listen for load event and data
//   request.addEventListener(`load`, function () {
//     const [dataUS] = JSON.parse(this.responseText);
//     // Render country 1
//     renderCountry(dataUS);

//     // Get the neighbor Countrty (2)
//     console.log(dataUS.borders);
//     const neighbor = dataUS.borders?.[0];

//     if (!neighbor) return;
//     // AJAX call country 2 by borders
//     const request2 = new XMLHttpRequest();
//     request2.open(`GET`, `https://restcountries.com/v3.1/alpha/${neighbor}`);
//     request2.send();

//     request2.addEventListener(`load`, function () {
//       const [dataCan] = JSON.parse(this.responseText);
//       console.log(dataCan);

//       renderCountry(dataCan, `neighbor`);
//     });
//   });
// };

// getCountryAndNeighbor(`US`);
// // getCountryAndNeighbor(`PT`);

// Callback hell

// setTimeout(() => {
//   console.log(`1 second passed`);
//   setTimeout(() => {
//     console.log(`2 seconds passes`);
//     setTimeout(() => {
//       console.log(`3 seconds passes`);
//       setTimeout(() => {
//         console.log(`4 seconds passes`);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// OLD XMLHttpRequest() method - very long and hard

// FETCH API AND AJAX CALLS

// Simple GET request - More complex calls can take options
// const request = fetch(`https:restcountries.com/v3.1/alpha/USA`);
// This creates a promise, stored to this request variable.

// Fetch data and consume with .then()
// const getCountryData = function (countryCode) {
//   fetch(`https:restcountries.com/v3.1/alpha/${countryCode}`) // .fetch() returns a promise
//     .then(function (response) {
//       // .then() handles this promise
//       console.log(response);
//       return response.json(); // .json() parses the the code in this response into a new promise.
//     })
//     .then(function (data) {
//       // We call the .then() method on this resolved promise in order to get a javascript object.
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const getJSON = function (url, errorMsg = `Something went wrong!`) {
//   return fetch(url).then(response => {
//     if (!response.ok) {
//       throw new Error(`${errorMsg} - ${response.status}`);
//     }
//     return response.json(); // RETURN PARSED PROMISE - NOW BECOMES THIS FUNCTIONS RETURN VALUE
//   });
// };

//     -- BEFORE REFACTURING --

// const getCountryData = function (country) {
//   // Country 1 - Original
//   fetch(`https://restcountries.com/v3.1/alpha/${country}`)
//     .then(response => {
//       // Original PROMISE request
//       if (!response.ok) {
//         throw new Error(`Country not found: Error - ${response.status}`);
//       }
//       return response.json(); // RETURN PARSED PROMISE - NOW BECOMES THIS FUNCTIONS RETURN VALUE
//     })
//     .then(dataUS => {
//       // NEW PROMISE RETURNED from the original function now becomes the dataUS object created from this AJAX call
//       renderCountry(dataUS[0]); // We render the first index from this array of objects to the UI
//       if (!dataUS[0].borders) throw new Error(`No neighbors found!`); // IF there is NO neighbors, exit the function.
//       const neighbor = dataUS[0].borders[0]; // Create a neighbor const with the borders[0] from the dataUS[0] object property

//       // const neighbor = `asdfsfsa`;

//       // Country 2 - Neighbor[0]
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`); // fetch new object with the neighbor value as the country code.
//     })
//     .then(neighborResponse => {
//       if (!neighborResponse.ok) {
//         throw new Error(
//           `Neighbor Country Request Denied! Error : ${neighborResponse.status}`
//         );
//       }
//       return neighborResponse.json();
//     }) // Original PROMISE request parse returned and now this function.
//     .then(dataNei => {
//       renderCountry(dataNei[0], `neighbor`);
//     }) // Fulfilled promise rendered to the UI with the new object and neighbor class added.
//     .catch(err => {
//       // ERROR HANDLER
//       console.error(`${err} 🚩🚩`); // Custom error message throwing in the error itself.
//       renderError(`${err.message}`); // We use this err parameter to access the message property, which is then the msg we created above.
//     })
//     .finally(() => {
//       // ALWAYS CALLED ERROR OR NOT - Change the opacity of the container to show our content.
//       countriesContainer.style.opacity = 1;
//     });
// };

// Fetch, then, catch, finally, errors.

// const getCountryData = function (country) {
//   // Country 1 - Original
//   getJSON(
//     // Helper function that checks for the response, and throws an error if something is wrong. Returns the whole AJAX promise request.
//     `https://restcountries.com/v3.1/alpha/${country}`,
//     `Country not found!`
//   )
//     .then(dataUS => {
//       // NEW PROMISE RETURNED from the original function now becomes the dataUS object created from this AJAX call
//       renderCountry(dataUS[0]); // We render the first index from this array of objects to the UI
//       if (!dataUS[0].borders) throw new Error(`No neighbors found!`); // IF there is NO neighbors, exit the function.
//       const neighbor = dataUS[0].borders[0]; // Create a neighbor const with the borders[0] from the dataUS[0] object property
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbor}`,
//         `Neighbor Country not found!`
//       );
//     })
//     .then(dataNei => {
//       renderCountry(dataNei[0], `neighbor`);
//     }) // Fulfilled promise rendered to the UI with the new object and neighbor class added.
//     .catch(err => {
//       // ERROR HANDLER
//       console.error(`${err} 🚩🚩`); // Custom error message throwing in the error itself.
//       renderError(`${err.message}`); // We use this err parameter to access the message property, which is then the msg we created above.
//     })
//     .finally(() => {
//       // ALWAYS CALLED ERROR OR NOT - Change the opacity of the container to show our content.
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener(`click`, function () {
//   getCountryData(`mv`);
// });

// // getCountryData(`mv`);

// EVENT LOOP, CALLBACK QUEUE, CALL STACK, MICROTASK QUEUE, WEB APIS example

console.log(`Test Start`);

setTimeout(() => {
  console.log(`0 Second timer`);
}, 0);

Promise.resolve(`Resolved promise 1`).then(res => console.log(res)); // Our resolved promise 1 from this promise will be places on the microtask queue, therefore on the next event loop tick, it will notice the mircotasks and handle these tasks first before continuing work in the callback queue.
Promise.resolve(`Resolved promise 2`).then(res => {
  for (let i = 0; i < 5000; i++) {
    console.log(res);
  }
});

console.log(`Test end`);
