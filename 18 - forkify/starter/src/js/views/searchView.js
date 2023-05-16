class SearchView {
  #parentEl = document.querySelector(`.search`);
  // We will use this function to grab the query typed in by the user
  getQuery() {
    const query = this.#parentEl.querySelector(`.search__field`).value; // We do a querySelector() on the parent el to find the first child with the matching class and grab that value from there.
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector(`.search__field`).value = ``;
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener(`submit`, function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
