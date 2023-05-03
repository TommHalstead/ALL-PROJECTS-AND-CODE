'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const getCountryData = function (countryCode) {
  // Create AJAX request
  const request = new XMLHttpRequest();
  // OPEN request and SET or GET
  request.open(`GET`, `https://restcountries.com/v3.1/alpha/${countryCode}`);
  // Send request
  request.send();
  // Add eventHandler to listen for load event and data
  request.addEventListener(`load`, function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    let html = `
  <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.official}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} Million</p>
      <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
      <p class="country__row"><span>💰</span>${data.currencies.USD.name}</p>
    </div>
  </article>`;
    countriesContainer.insertAdjacentHTML(`afterbegin`, html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData(`US`);
