import { async } from 'regenerator-runtime/runtime'; // Imports polyfills for async functions
import { API_URL } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: ``,
    results: [],
  },
};

// Async function that is responsible for fetching our data from our API
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // console.log(rec);
  } catch (err) {
    // Temp error handling
    console.error(`${err.name} - ${err.message} 🚩🚩`);
    throw err; // We throw this error because in our controller.js is where we call this function but this function lives here in the model.js. So therefore if this function has an error, as the engine is reading this code, it would short-circuit and throw this error right here, never propegating it to the controller. This way, we throw our error and now it will return the code execution to the calling function in the (controller.js) which is where we will catch and ha ndle this error.
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query; // We created a search object within our state object, which holds the query that we here set to this parameter that is passed in, this way we update the query property with the queries that are searched.
    const {
      data: { recipes },
    } = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = recipes.map(
      rec => {
        return {
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          image: rec.image_url,
        };
      } // Right here we map these objects in this array to a new array with new objects with the property names changed and we save these mapped arrays to our search object within our state object that we export to all modules.
    );
  } catch (err) {
    console.error(`${err} 🏴`);
    throw err;
  } // We will throw this error, so that we can handle it in the controller, where we will call this function.
};
// This is the function we are creating for loading the search results, this will be called by the contoller, and the controller is the one who will tell this function what we're going to be searching for. Therefore we will pass in a `query` parameter in order to pass this argument in when we call it with the controller.
