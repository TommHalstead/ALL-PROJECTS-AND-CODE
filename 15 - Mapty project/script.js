'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {
  date = new Date(); // These are PUBLIC FIELDS OF THIS CLASS
  id = +Math.random().toString().slice(3, 10); // `Unique` ID
  constructor(distance, duration, coords) {
    this.distance = distance; // in miles - 3
    this.duration = duration; // in mins - 21
    this.coords = coords; // [latitude, longitude]
  }
}

class Running extends Workout {
  type = `running`;
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    //min/mile
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = `cycling`;
  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    //mph
    this.speed = this.distance / this.duration / 60;
    return this.speed;
  }
}
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapEvent; // FIELDS
  #workouts = [];
  constructor() {
    this.#getPosition();
    form.addEventListener(`submit`, this.#newWorkout.bind(this));
    inputType.addEventListener(`change`, this.#toggleElevationField);
  }

  #getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.#loadMap.bind(this),
        function () {
          alert(
            `Could not access your location, enable location and reload the page.`
          );
        }
      ); // The getCurrentLocation() API takes two callback functions. One that is called when the browser successfully receives the geolocation of the user and takes one position param. The second callback is the error callback, which is what is called when an error occurs
  }

  #loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 15); // This .setView() function takes two arguments, the first is an array of coordinates, lat, lng. The second is the zoom level of the map that you would like to be default

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on(`click`, this.#showForm.bind(this));
  }

  #showForm(mapE) {
    this.#mapEvent = mapE; // Right here we assign this mapE parameter to a global variable, so that we can use this variable(event) in other functions and event handlers
    form.classList.remove(`hidden`);
    inputDistance.focus();
  }

  #toggleElevationField() {
    inputElevation.closest(`.form__row`).classList.toggle(`form__row--hidden`);
    inputCadence.closest(`.form__row`).classList.toggle(`form__row--hidden`);
  }

  #newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp)); // This is form validation, what we're doing is creating an array of inputs (the rest operator) and looping over that array and returning a boolean on whether or not every input is a number and it positive.

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Add new workout to workout array

    // Get data from input form
    const type = inputType.value;
    const distVal = +inputDistance.value;
    const durVal = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    // If workout is running, create running object
    if (type === `running`) {
      // Check if data is valid
      const cadence = +inputCadence.value;
      if (
        !validInputs(distVal, durVal, cadence) ||
        !allPositive(distVal, durVal, cadence)
      )
        return alert(`Inputs must be a positive number!`);

      workout = new Running(distVal, durVal, [lat, lng], cadence);
    }
    // If workout if cycling, createa cyclying object
    if (type === `cycling`) {
      // Check if data is valid
      const elevationGain = +inputElevation.value;
      if (
        !validInputs(distVal, durVal, elevationGain) ||
        !allPositive(distVal, durVal)
      )
        return alert(`Inputs must be a positive number!`);
      workout = new Cycling(distVal, durVal, [lat, lng], elevationGain);
    }

    // Add new object to workout array

    this.#workouts.push(workout);
    console.log(this.#workouts);
    // Render workout on map as marker
    this.renderWorkoutMarker(workout);

    // Render workout on list

    //Hide form and clear input fields

    form.classList.add(`hidden`);
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        ``;
  }

  renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(workout.type)
      .openPopup();
  }
}
const app = new App();
