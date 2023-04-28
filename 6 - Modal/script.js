'use strict';

const modal = document.querySelector(`.modal`);
const overlay = document.querySelector(`.overlay`);
const btnCloseModal = document.querySelector(`.close-modal`);
const btnsOpenModal = document.querySelectorAll(`.show-modal`);

const openModal = function () {
  modal.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
};
const closeModal = function () {
  modal.classList.add(`hidden`);
  overlay.classList.add(`hidden`); // This is a function that grabs the modal and overlay variables created to hold the `HTML elements and closes them upon clicking the overlay or the `x` on the modal overlay, will apply the hidden class to these elements via CSS rules
};
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener(`click`, openModal);
//This will loops through this variable created which holds the elements on the HTML page with the classes of '.show-modal[i].textContent' making it possible to view each element individually and apply styles

btnCloseModal.addEventListener(`click`, closeModal);
overlay.addEventListener(`click`, closeModal);

document.addEventListener(`keydown`, function (e) {
  if (e.key === `Escape` && !modal.classList.contains(`hidden`)) closeModal();
}); // This event listener checks the argument `e` object to verify which key was pressed, and if it's the `Esc` key, then it checks if the modal classlist has a class of `hidden` and if so, is uses the `closeModal` function on it to close the wiindow by adding the `hidden` class back to the HTML element, through DOM manipulation.
