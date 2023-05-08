'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText(`beforebegin`, msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = ``) {
  // set className to default ``, incase we don't want one so we don't get errors.
  const languages = data.languages[Object.keys(data.languages)[0]];
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

// console.log(`Test Start`);

// setTimeout(() => {
//   console.log(`0 Second timer`);
// }, 0);

// Promise.resolve(`Resolved promise 1`).then(res => console.log(res)); // Our resolved promise 1 from this promise will be places on the microtask queue, therefore on the next event loop tick, it will notice the mircotasks and handle these tasks first before continuing work in the callback queue.
// Promise.resolve(`Resolved promise 2`).then(res => {
//   for (let i = 0; i < 5000; i++) {
//     console.log(res);
//   }
// });

// console.log(`Test end`);

// Executor function will automaticaly be executed once the promise constructor runs, since it's a promise, it goes on the microtask queue.
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log(`Lottery draw is happening! 🔮`);
//   setTimeout(function () {
//     // Asynchronous function that is handled behind the scenes with the web API.
//     if (Math.random() >= 0.5) {
//       resolve(`You WIN! 🏁`);
//     } else {
//       reject(
//         new Error(`You lost your money! 😓
//   `)
//       );
//     }
//   }, 2000);
// }); // This function will be the one that contains the async behavior in which we are trying to handle with the promise

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err)); // Here we consume this promise with the .then() method, and we add a .catch() method to catch any errors that are thrown.

// // Promisifying setTimeout()
// const wait = seconds => {
//   // Function that returns a promise, that we can then chain. Same as the .fetch() in a sense.
//   return new Promise(resolve => setTimeout(resolve, seconds * 1000)); // We add a setTimeout() saying to resolve, only after 2 seconds.
//   // No reject() needed, it's impossible for a timer to fail. So no rejection is possible.
// };

// wait(1)
//   .then(() => {
//     // We handle this promise by returning the same promise
//     console.log(`1 second passed`);
//     return wait(1); // Create a new fetch `promise` and return it as well, which we can then also handle.
//   })
//   .then(() => {
//     console.log(`2 seconds passed`);
//     return wait(1);
//   })
//   .then(() => {
//     console.log(`3 seconds passed`);
//     return wait(1);
//   })
//   .then(() => console.log(`I waited for 4 seconds! `));

// SAME RESULT ⬆️⬇️

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

// Promise.resolve(`Promise Resolved!`).then(x => console.log(x));
// Promise.reject(new Error(`Promise Rejected!`)).catch(x => console.error(x));

// const getPosition = function () {
// return new Promise((resolve, reject) => {
// Promise callbacks, RESOLVED, REDJECTED
// Callbacks (success, error, options) - Navigator
// navigator.geolocation.getCurrentPosition(
// position => {
// console.log(position);
// resolve(position);
// }, // Resolved promise - LAT,LNG IS THE FULFILLED PROMISE VALUE
// err => reject(console.error(`${err}`)) // Rejected promise - ANY ERROR IS REJECTED PROMISE VALUE
// ); // WEB API - ALL ASYNCHRONOUS BEHVAIOR
// navigator.geolocation.getCurrentPosition(resolve, reject); // The Promise executor function is called no matter what, so here instead of all the logic above, we can simply pass in the resolve and reject parameters into our getCurrentPosition() function since it takes two callbacks, one as a resolved promise and one as a rejected promise.
// });
// }; // This function will return either a rejected or fulfilled promise based on the code.

// getPosition().then(promise => console.log(promise));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding API ${res.status} `);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country || data.prov}`);
//       return fetch(`https://restcountries.com/v3.1/alpha/${data.prov}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found! (${res.status})`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//       console.error(`Something went wrong, try again please! \n ${err}`);
//     });
// };

// btn.addEventListener(`click`, whereAmI);

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Async -- Await
const whereAmI = async function (country) {
  try {
    // Geolocation
    const pos = await getPosition(); // Actual data object
    const { latitude: lat, longitude: lng } = pos.coords;
    // Geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?json=1`); // Fulfilled or Rejected response.
    if (!resGeo.ok) throw new Error(`Problem getting location data!`);
    const geoData = await resGeo.json(); // Actual data object after being parsed through json.
    // Country data
    const resCou = await fetch(
      `https://restcountries.com/v3.1/alpha/${geoData.prov}`
    ); // Fulfilled or Rejected response.
    if (!resCou.ok) throw new Error(`Problem getting Country!`);
    const data = await resCou.json(); // Actual data object after being parsed through json.
    renderCountry(data[0]);
  } catch (err) {
    console.error(`${err} 👎`);
    renderError(`Something went wrong! \n ${err.message} 👎`);
  }
};

whereAmI();
console.log(`Hello`);

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }
