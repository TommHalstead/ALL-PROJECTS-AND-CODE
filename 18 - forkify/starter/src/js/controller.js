import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { RES_PER_PAGE } from './config.js';

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

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

// We create a new function to handle our search query, we call and await our loadSearchResults fn from our model.js
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) throw new Error();

    // Load search results
    await model.loadSearchResults(query); // WE MUST AWAIT this promise so that code execution in the background will stop while we're loading this.

    // Render results
    resultsView.render(model.getSearchResultsPage()); // Call our pagination function to display only wanted amount of results.

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(this._errorMessage);
  }
};

const controlPagination = function (goToPage) {
  // Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update Recipe servings in the state
  model.updateServings(newServings);

  console.log(model.state.recipe.servings);
  // Update the recipeView
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
// We create this INIT function in order to call the addHandlerRender() and addHandlerSearch() function immediately as the engine reads it. Which in turn, calls the addHandlerRender() function that adds an event listener to the `hashchange` and `load` events on the view and waits for them to call the controlRecipes function.

init();
