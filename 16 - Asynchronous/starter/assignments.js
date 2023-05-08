'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const div = document.querySelector(`.images`);

// const renderCountry = function (data, className = ``) {
//   // set className to default ``, incase we don't want one so we don't get errors.
//   const languages = data.languages[Object.keys(data.languages)[0]];
//   const currencies = Object.values(data.currencies)[0].name;
//   let html = `
//   <article class="country ${className}">
//     <img class="country__img" src="${data.flags.png}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} Million</p>
//       <p class="country__row"><span>🗣️</span>${languages}</p>
//       <p class="country__row"><span>💰</span>${currencies}</p>
//     </div>
//   </article>`;
//   countriesContainer.insertAdjacentHTML(`beforeend`, html);
//   countriesContainer.style.opacity = 1;
// };

// const parsePromise = function (
//   url,
//   errorMsg = `Uh-oh! Something wasn't right!`
// ) {
//   return fetch(url).then(response => {
//     if (!response.ok) {
//       throw new Error(errorMsg, response.status);
//     }
//     return response.json();
//   });
// };

// const whereAmI = function (lat, lng) {
//   parsePromise(
//     `https://geocode.xyz/${lat},${lng}?json=1`,
//     `Request Was Rejected!`
//   )
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country || data.prov}`);
//       return parsePromise(
//         `https://restcountries.com/v3.1/alpha/${data.prov}`,
//         `Request Was Rejected!`
//       );
//     })
//     .then(restData => {
//       const [{ ...easyAcess }] = restData;
//       renderCountry(easyAcess, easyAcess.borders[0]);
//       return parsePromise(
//         `https://restcountries.com/v3.1/alpha/${easyAcess.borders[0]}`,
//         `Request Was Rejected!`
//       );
//     })
//     .then(data => {
//       const [{ ...easyAcessNeighbor }] = data;
//       renderCountry(easyAcessNeighbor, `neighbor`);
//     })
//     .catch(err => {
//       console.error(`Something went wrong, try again please! \n ${err}`);
//     });
// };
// whereAmI(52.508, 13.381); // Germany
// whereAmI(19.037, 72.873); // India
// whereAmI(-33.933, 18.474); // South Africa

// 52.508, 13.381
// 19.037, 72.873
// -33.933, 18.474

const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  }); // We add a setTimeout() saying to resolve, only after 2 seconds.
  // No reject() needed, it's impossible for a timer to fail. So no rejection is possible.
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement(`img`);
    img.src = imgPath; // Logic we want applied to successfull promise
    img.addEventListener(`load`, () => {
      // Event handler to listen for the load event to finish and then append it to the div.
      div.append(img);
      resolve(img); // We resolve this pic into a new promise with the logic applied to it.
    });
    img.addEventListener(`error`, function () {
      // We listen for an error
      reject(new Error(`Image path was not right`)); // Reject message throws new Error()
    });
  });
};

// let currentImg;
// createImage(`/ALL PROJECTS AND CODE/16 - Asynchronous/starter/img/img-1.jpg`)
//   .then(newImg => {
//     currentImg = newImg;
//     console.log(`Img 1 loaded`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = `none`;
//     return createImage(
//       `/ALL PROJECTS AND CODE/16 - Asynchronous/starter/img/img-2.jpg`
//     );
//   })
//   .then(res => {
//     currentImg = res;
//     console.log(`Img 2 loaded`);
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = `block`;
//     return wait(2);
//   })
//   .then(() => (currentImg.style.display = `none`))
//   .catch(err => {
//     console.error(`Request was rejected. \n \n ${err}!`);
//   });

// `/ALL PROJECTS AND CODE/16 - Asynchronous/starter/img/img-1.jpg`;

// .then(newPromise => {
//   newPromise.addEventListener(`load`, () => {
//     wait(2);
//   });
// })

// async function hideImg(element) {
//   element.style.display = 'none';
//   await new Promise(resolve => setTimeout(resolve, 2000));
//   element.style.display = '';
// }

// const loadNPause = async function (url1, url2, url3) {
//   try {
//     let create = await createImage(url1);
//     await wait(2);
//     let hide = await hideImg(create);
//     create = await createImage(url2);
//     await wait(2);
//     hide = await hideImg(create);
//     create = await createImage(url3);
//   } catch (err) {
//     console.error(`Something didn't fetch right! \n ${err}`);
//   }
// };

// loadNPause(
//   `/ALL PROJECTS AND CODE/16 - Asynchronous/starter/img/img-1.jpg`,
//   `/ALL PROJECTS AND CODE/16 - Asynchronous/starter/img/img-2.jpg`,
//   `/ALL PROJECTS AND CODE/16 - Asynchronous/starter/img/img-3.jpg`
// );

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const allImgs = await Promise.all(imgs);
    allImgs.forEach(img => {
      img.classList.add(`parallel`);
    });
  } catch (err) {
    console.error(err);
  }
};

loadAll([
  `/ALL PROJECTS AND CODE/16 - Asynchronous/starter/img/img-1.jpg`,
  `/ALL PROJECTS AND CODE/16 - Asynchronous/starter/img/img-3.jpg`,
  `/ALL PROJECTS AND CODE/16 - Asynchronous/starter/img/img-2.jpg`,
]);
