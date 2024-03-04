'use strict';

const form = document.querySelector('.form');
const formInput = document.querySelectorAll('.form__input');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;
  constructor(coords, distance, duration) {
    this.coords = coords; // Array of [long, lat]
    this.distance = distance; // in km
    this.duration = duration; // in minutes
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    }  ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

//////////////////////////////////////////
// APPLICATION ARCHITECTURE

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];
  #isEditActivity = false;

  constructor() {
    //Get user's position
    this._getPosition(); // putting the function in the constructor means it will get call on any creation of an App object
    //Attach event handlers
    form.addEventListener('submit', this._saveWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener(
      'click',
      this._workoutClicked.bind(this)
    );
    //Get stored data
    this._getLocalStorage();
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), //getCurrentPosition requires a success and failure callback function
        function () {
          alert(`Could not get your position`);
        }
      );
    }
  }

  _loadMap(position) {
    const latitude = position.coords.latitude;
    const { longitude } = position.coords; //Using destructuring to pull variable out of object
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`); //Print url with coords for google maps

    //Displaying a map using a 3rd party map (Leaflet.js)
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Handling click on map
    this.#map.on('click', this._showForm.bind(this));

    //Load locally stored activities on map - has to be done after map has loaded
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    if (!this.#isEditActivity) this.#mapEvent = mapE; // Making mapE global
    form.classList.remove('hidden'); // Remove hidden class from form
    inputDistance.focus(); //Focus on first input field on form
  }

  // Hide  form and clear inputs
  _hideForm() {
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';
    form.style.display = 'none'; // Hide form to prevent animation being visible
    form.classList.add('hidden'); // Remove hidden class from form
    setTimeout(() => (form.style.display = 'grid'), 1000); // Once animation has finished add the display back to form
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _saveWorkout(e) {
    //Helper function to validate any given number of inputs are numbers
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    // Helper function to validate positive numbers
    const allPositiveNumbers = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    //Get Data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If activity = running create running object
    const cadence = +inputCadence.value;
    //Check Data is valid
    if (type === 'running') {
      if (
        !validInputs(distance, cadence, duration) ||
        !allPositiveNumbers(distance, cadence, duration)
      )
        return alert('inputs have to be positive numbers');
      //Create running object
      workout = new Running([lat, lng], distance, duration, cadence);
    }
    // If activity = cycling create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      //Check Data is valid
      if (
        !validInputs(distance, elevation, duration) ||
        !allPositiveNumbers(distance, duration)
      )
        return alert('inputs have to be positive numbers');
      //Create new Cycling object
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new Object to workout array
    this.#workouts.push(workout);

    // Render working on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    //Hide form
    this._hideForm();

    //Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords) // Read documentation to understand this
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
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    //Shared HTML between running and cycling
    let html = `<li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">    
      <h2 class="workout__title">${
        workout.description
      }<button class="btn btn__edit_workout">Edit</button></h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>`;
    //HTML unique to running
    if (workout.type === 'running')
      html += `<div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>`;

    //HTML unique to cycling
    if (workout.type === 'cycling')
      html += `<div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevation}</span>
        <span class="workout__unit">m</span>
      </div>`;

    html += '</li>';

    form.insertAdjacentHTML('afterend', html);
  }

  // function that handles click on workout list and controls which method is called depending on click location
  _workoutClicked(e) {
    this._moveToPopup(e);
    if (e.target.closest('.btn__edit_workout')) this._editWorkout(e);
  }

  // Move to pop up function
  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout'); // Event delegation to determine which activity the user has clicked
    if (!workoutEl) return;
    const workout = this.#workouts.find(
      workout => workout.id === workoutEl.dataset.id
    );
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    }); // SetView is a built in method from the Leaflet library

    //Using public interface
    workout.click();
  }

  _editWorkout(e) {
    const workoutEl = e.target.closest('.workout');
    const workout = this.#workouts.find(
      work => work.id === e.target.closest('.workout').dataset.id
    );
    this.#isEditActivity = true;
    workoutEl.classList.add('hidden');
    inputType.value = workout.type;
    inputDistance.value = workout.distance;
    inputDuration.value = workout.duration;
    if (workout.type === 'running') {
      inputCadence.value = workout.cadence;
    }
    if (workout.type === 'cycling') {
      inputElevation.value = workout.elevation;
      this._toggleElevationField();
    }
    this._showForm();
  }

  _deleteWorkout() {}

  _deleteAllWorkouts() {}

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts)); // Local storage is a simple API so only use for small amounts of data
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;

    this.#workouts = data;
    this.#workouts.forEach(work => {
      //Set object prototypes when retrieving from local storage
      if (work.type === 'running')
        work.__proto__ = Object.create(Running.prototype);
      if (work.type === 'cycling')
        work.__proto__ = Object.create(Cycling.prototype);
      this._renderWorkout(work);

      console.log(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts'); //Clears stored workouts
    location.reload(); // reloads page
  }
}

const app = new App();
