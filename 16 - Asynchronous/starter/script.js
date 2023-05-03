'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

// OLD XMLHttpRequest() AJAX method.

const renderCountry = function (data, className = ``) {
  const languages = Object.values(data.languages)[0];
  const currencies = Object.values(data.currencies)[0].name;
  let html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.official}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} Million</p>
      <p class="country__row"><span>🗣️</span>${languages}</p>
      <p class="country__row"><span>💰</span>${currencies}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML(`beforeend`, html);
  countriesContainer.style.opacity = 1;
};

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

// const request = new XMLHttpRequest();
// request.open(`GET`, `https://restcountries.com/v3.1/alpha/${countryCode}`);
// request.send();

// FETCH API AND AJAX CALLS

// Simple GET request - More complex calls can take options
const request = fetch(`https:restcountries.com/v3.1/alpha/USA`);
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

const getCountryData = code => {
  fetch(`https:restcountries.com/v3.1/alpha/${code}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

getCountryData(`USA`);
