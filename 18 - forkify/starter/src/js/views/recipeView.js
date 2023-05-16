import { state } from '../model';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import { Fraction } from 'fractional';
class RecipeView {
  #parentElement = document.querySelector(`.recipe`);
  #errorMessage = `We couldn't find that recipe. Please try another!`;
  #message = ``;
  render(recipe) {
    this.recipe = recipe; // Creates a recipe property and sets it to the argument that is received.
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  #clear() {
    this.#parentElement.innerHTML = ``;
  } // Here we create a helper function to clear the container for us

  #insertHTML(markup) {
    this.#parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  renderSpinner() {
    const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this.#clear();
    this.#insertHTML(markup);
  }

  renderError(message = this.#errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this.#clear();
    this.#insertHTML(markup);
  }

  renderMessage(message = this.#message) {
    const markup = `
   <div class="recipe">
     <div class="message">
       <div>
         <svg>
           <use href="${icons}#icon-smile"></use>
         </svg>
       </div>
       <p>${message}</p>
     </div>`;
    this.#clear();
    this.#insertHTML(markup);
  }

  addHandlerRender(handler) {
    [`hashchange`, `load`].forEach(ev => window.addEventListener(ev, handler));
  } // Here we create the publisher, because this is the one that will be listening for the event. We pass in the Subscriber, which is the code that will actually handle this event.

  #generateMarkup() {
    return `
  <figure class="recipe__fig">
    <img src="${this.recipe.image}" alt=${
      this.recipe.title
    } class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this.recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this.recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this.recipe.servings
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
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
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
      ${this.recipe.ingredients.map(this.#generateMarkupIngredient).join(``)}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this.recipe.publisher
      }</span>. Please check out
            directions at their website.
    </p>
    <a
        class="btn--small recipe__btn"
        href="${this.recipe.sourceUrl}"
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

  #generateMarkupIngredient(ing) {
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
