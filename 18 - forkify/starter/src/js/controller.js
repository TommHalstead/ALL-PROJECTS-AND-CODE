import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

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
    recipeView.renderError(); // We pass in nothing because we have a default message set in our renderError function.
  }
};

(() => {
  recipeView.addHandlerRender(controlRecipes);
})();
// We create this IIFE in order to call the addHandlerRender() function immediately as the engine reads it. Which in turn, calls the addHandlerRender() function that adds an event listener to the `hashchange` and `load` events on the view.
