import { async } from 'regenerator-runtime/runtime'; // Imports polyfills for async functions
export const state = {
  recipe: {},
};

// Async function that is responsible for fetching our data from our API
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    ); // Create an API call and await the result in a variable.

    const data = await res.json(); // We await for the promise to be parsed through json().

    if (!res.ok) throw new Error(`${data.message} (${res.status})`); // This error will propegate down to the catch block, and alert this error message.

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
    console.error(err);
  }
};
