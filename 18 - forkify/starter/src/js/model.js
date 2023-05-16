import { async } from 'regenerator-runtime/runtime'; // Imports polyfills for async functions
import { API_URL } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
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

    // console.log(recipe);
  } catch (err) {
    // Temp error handling
    console.error(`${err.name} - ${err.message} 🚩🚩`);
    throw err; // We throw this error because in our controller.js is where we call this function but this function lives here in the model.js. So therefore if this function has an error, as the engine is reading this code, it would short-circuit and throw this error right here, never propegating it to the controller. This way, we throw our error and now it will return the code execution to the calling function in the (controller.js) which is where we will catch and ha ndle this error.
  }
};
