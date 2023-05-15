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

    console.log(recipe);
  } catch (err) {
    // Temp error handling
    console.error(`${err.name} - ${err.message} 🚩🚩`);
  }
};
