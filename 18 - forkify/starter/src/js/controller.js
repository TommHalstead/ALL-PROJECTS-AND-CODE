import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';
import { sign } from 'core-js/es6/number';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

console.log(`Test`);

// Async function
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // 1.) Loading spinner
    recipeView.renderSpinner();

    // 2.) Loading recipe
    await model.loadRecipe(id);

    // 3.) Rendering recipe with the state object we created and imported from the model module
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err); // Catch block will catch all errors above, and do what we designate in this block.
  }
};

[`hashchange`, `load`].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
); // If we want to listen for multiple events and fire the same function in both cases, we can use this type of syntax. This will work for as many events as we would like to listen for.

// window.addEventListener(`hashchange`, controlRecipes);
// window.addEventListener(`load`, controlRecipes);
