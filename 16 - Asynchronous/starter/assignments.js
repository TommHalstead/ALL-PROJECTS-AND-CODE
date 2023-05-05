'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

btn.addEventListener(`click`, function () {
  renderCountry(data);
});

const renderCountry = function (data, className = ``) {
  // set className to default ``, incase we don't want one so we don't get errors.
  const languages = data.languages[Object.keys(data.languages)[0]];
  const currencies = Object.values(data.currencies)[0].name;
  let html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
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

const parsePromise = function (
  url,
  errorMsg = `Uh-oh! Something wasn't right!`
) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(errorMsg, response.status);
    }
    return response.json();
  });
};

const whereAmI = function (lat, lng) {
  parsePromise(
    `https://geocode.xyz/${lat},${lng}?json=1`,
    `Request Was Rejected!`
  )
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country || data.prov}`);
      return parsePromise(
        `https://restcountries.com/v3.1/alpha/${data.prov}`,
        `Request Was Rejected!`
      );
    })
    .then(restData => {
      const [{ ...easyAcess }] = restData;
      renderCountry(easyAcess, easyAcess.borders[0]);
      return parsePromise(
        `https://restcountries.com/v3.1/alpha/${easyAcess.borders[0]}`,
        `Request Was Rejected!`
      );
    })
    .then(data => {
      const [{ ...easyAcessNeighbor }] = data;
      renderCountry(easyAcessNeighbor, `neighbor`);
    })
    .catch(err => {
      console.error(`Something went wrong, try again please! \n ${err}`);
    });
};
whereAmI(52.508, 13.381);

// 52.508, 13.381
// 19.037, 72.873
// -33.933, 18.474
