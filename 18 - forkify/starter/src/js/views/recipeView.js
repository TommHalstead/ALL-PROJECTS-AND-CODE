import View from './View';

import icons from 'url:../../img/icons.svg'; // Parcel 2
import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector(`.recipe`);
  _errorMessage = `We couldn't find that recipe. Please try another!`;
  _message = ``;

  addHandlerRender(handler) {
    [`hashchange`, `load`].forEach(ev => window.addEventListener(ev, handler));
  } // Here we create the publisher, because this is the one that will be listening for the event. We pass in the Subscriber, which is the code that will actually handle this event.

  _generateMarkup() {
    return `
  <figure class="recipe__fig">
    <img src="${this._recipe.image}" alt=${
      this._recipe.title
    } class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._recipe.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
    </div>
  </div>

  <div class="recipe__user-generated">

  </div>
  <button class="btn--round">
    <svg class="">
      <use href="${icons}#icon-bookmark-fill"></use>
    </svg>
  </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${this._recipe.ingredients.map(this._generateMarkupIngredient).join(``)}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This _recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._recipe.publisher
      }</span>. Please check out
            directions at their website.
    </p>
    <a
        class="btn--small recipe__btn"
        href="${this._recipe.sourceUrl}"
        target="_blank"
        >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
</div>
    `;
  }

  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing?.quantity ? new Fraction(ing?.quantity).toString() : ``
      }
      </div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing?.unit}</span>
        ${ing?.description}
      </div>
    </li>`;
  }
}

export default new RecipeView(); // This creates an object that we then export to our controller.js file so that we can use this data from this object instantiated through this class, which then therefore has all the prototypes from this class and the document.object. Since we are not passing in any data, we don't need any constructor function even
