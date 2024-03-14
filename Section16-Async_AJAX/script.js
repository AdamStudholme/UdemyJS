'use strict';
const geoAPI = `506226896658048326943x2313`;
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
// function to display error
const renderError = function (message) {
  console.log(message);
  countriesContainer.insertAdjacentText(`beforeend`, message);
  //countriesContainer.style.opacity = 1; // Now in the finally handler of the async call chain
};
//function to display data fetched from API
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
      `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
///////////////////////////////////////
// URL Change:- https://countries-api-836d.onrender.com/countries/

///////////////////////////////////////

///// Video 249 - First AJAX call XMLHttpRequest /////////////////////
// This is an old approach to AJAX requests

/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();

  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `<article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

//Due to the unblocking async nature of the AJAX call the following info can end up being displayed in any order
getCountryData(`portugal`);
getCountryData('usa');
getCountryData('germany');


///// Video  251 - Welcome to Callback hell ////////////////////////////
*/

/*
const getCountryAndNeighbourData = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();

  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //Render Country 1
    renderCountry(data);
    //Get neighbour country (2)
    //const [neighbour] = data.borders
    const neighbour = data.borders?.[0]; // Use optional chaining to account for countries without any bordering countries

    if (!neighbour) return;
    //AJAX call country
    const request2 = new XMLHttpRequest();

    request2.open(
      'GET',
      `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
    );
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText); // Response is as an object not a array so no need to destructure
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbourData('USA');
*/

///////////////// Video 252/ 253 /254 - Promises and the FETCH API/Consuming Promises/Chaining Promises /////////////////////////////////////////

//OLD Method
/*
const request = new XMLHttpRequest();

  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  request.send();
 

// New method using Fetch
// const request = fetch(
//   `https://countries-api-836d.onrender.com/countries/name/portugal`
// );
// console.log(request); // Now request is a pending Promise

// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(function (response) {
//       // Using then() to handle the promise returned
//       console.log(response);
//       return response.json(); // Have to call json() to get access to the body of the promise, which is in itself a new promise so needs to be returned to chain
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

//Simplified version of above using arrow functions
const request = fetch(
  `https://countries-api-836d.onrender.com/countries/name/portugal`
);
const getCountryData = function (country) {
  //Country 1
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
getCountryData('portugal');


//Chaining promises - getting the neighbour country
const getCountryAndNeighbour = function (country) {
  //Country 1
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      //Country 2
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};
 */
//////////////// Video 255/256 - Handling rejected promises/ Throwing errors manually ////////////////////////

/* // Unrefined version
const getCountryAndNeighbour = function (country) {
  //Country 1
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(
      response => {
        console.log(response);
        if (!response.ok)
          throw new Error(
            `Error ${response.status}: Country "${country}" not found `
          ); // Manually handle error (404 in this case)
        return response.json();
      }
      // ,err => alert(err) //1st method - Pass a second callback into then() to handle any errors, but would need adding at every point you want to catch an error
    )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      //Country 2
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
    })
    .then(response =>{
        if (!response.ok)
        throw new Error( // Having to handle the error a second time goes against DRY
          `Error ${response.status}: Country "${country}" not found `)
                return response.json()}) 
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}!!!!`); // 2nd (better) method will catch any errors in the promise chain
      renderError(`Something went wrong: ${err.message}`);
    })
    .finally(() => {
      console.log(
        'Finally method: Will always be called even in the event of an error'
      );
      countriesContainer.style.opacity = 1;
    });
};


const getJSON = function (url, err = 'Something went wrong') {
  return fetch(url).then(response => {
    console.log(response);
    if (!response.ok) throw new Error(`Error ${response.status}: ${err} `); // Manually handle error (404 in this case)
    return response.json();
  });
};

const getCountryAndNeighbour = function (country) {
  //Country 1
  getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No neighbour found!');
      //Country 2
      return getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      renderError(`Something went wrong: ${err.message}`);
    })
    .finally(() => {
      console.log(
        'Finally method: Will always be called even in the event of an error'
      );
      countriesContainer.style.opacity = 1;
    });
};

//////////////// Coding Challenge #1 ////////////////////////////////

const showPosition = function (position) {
  const { latitude, longitude } = position.coords;
  console.log(`Lat: ${latitude}, Long: ${longitude}`);
  whereAmI(latitude, longitude);
};

//Function that takes in coords and returns the nearest location data
const whereAmI = function (lat, long) {
  fetch(`https://geocode.xyz/${lat},${long}?geoit=json&auth=${geoAPI}`) //
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => data.country)
    .then(country => getCountryAndNeighbour(country))
    .catch(err => console.error(err.message));
};

const WhereAmIHandler = () =>
  navigator.geolocation.getCurrentPosition(showPosition);

btn.addEventListener('click', WhereAmIHandler);

//////////////////////////////// Video 258 Javascript Async behind the scenes ////////////////////////

////////////////////////////// Video 259 - The event loop in practice ////////////////////

console.log('Test Start'); //1st
setTimeout(() => console.log(' 0 second timer', 0)); //5th
Promise.resolve('Resolved Promise 1').then(res => console.log(res)); //3rd Microtasks queue means it appears ahead of the callback in the seTimeout()
Promise.resolve('Resolved promise 2').then(res => {
  //4th A microtask which is process heavy will delay the timeout callback function so you cannot rely on setTimeout for prescision work
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test end'); //2nd


////////////////////////////// Video 260 - Building a simple Promise /////////////////////////
//The promise constructor takes in a single 'executor' function which takes to arguments
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');

  setTimeout(() => {
    if (Math.random() <= 0.5) {
      resolve('You WIN🏆');
    } else {
      reject(new Error('You LOSE 😔'));
    }
  }, 2000);
});

lotteryPromise
  .then(result => console.log(result))
  .catch(err => console.error(err));

//Promises are usually only created to Promisify old Callback based async behaviour
//Promisifying example
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for another second'));


  const geoAPI = `506226896658048326943x2313`;

const showPosition = function (position) {
  const { latitude, longitude } = position.coords;
  console.log(`Lat: ${latitude}, Long: ${longitude}`);
  whereAmI(latitude, longitude);
};

//////////////////////// Video 261 - Using Promises for geolocation ///////////////////////////////


const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // Can be simplified
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err))
    navigator.geolocation.getCurrentPosition(resolve, reject); // Can do this as the previous is just a call back function passing in the position or error into the function
    console.log('Getting Location');
  });
};

//Function that takes in coords and returns the nearest location data
const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: long } = pos.coords;
      return fetch(
        `https://geocode.xyz/${lat},${long}?geoit=json&auth=${geoAPI}`
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => data.country)
    .then(country => getCountryAndNeighbour(country))
    .catch(err => console.error(err.message));
};

btn.addEventListener('click', whereAmI);


/////////////////////////////////// Video 262 - #Coding Challenge #2 ////////////////////////////////////////////////
let currImage;

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const element = document.createElement('img');
    document.querySelector('.images').appendChild(element);
    element.src = imgPath;
    element.onload = () => resolve(element);
    element.onerror = () => reject(new Error('Issue with image URL'));
  });
};

createImage('./img/img-1.jpg')
  .then(img => {
    currImage = img;
    return wait(2);
  })
  .then(() => {
    currImage.style.display = 'none';
    return createImage('./img/img-2.jpg');
  })
  .then(img => {
    currImage = img;
    return wait(2);
  })
  .then(() => (currImage.style.display = 'none'))
  .catch(err => console.error(err));


////////////////////////////// Video 263/264/265 - Consuming Promises with async/await/ Handling errors with try/catch methods/ returning values from async functions //////////////////////////////////////////
///Simple try/catch block
try {
  let y = 1;
  const x = 2;
  x = 3;
} catch (err) {
  alert(err.message);
}

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject); // Can do this as the previous is just a call back function passing in the position or error into the function
  });
};

//Using the async/await syntax to encapsultate the geolocation async functions into one function

const whereAmI = async function () {
  try {
    //Geolocation API
    const pos = await getPosition();
    const { latitude: lat, longitude: long } = pos.coords;

    //Reverse Geocoding API
    const geo = await fetch(
      `https://geocode.xyz/${lat},${long}?geoit=json&auth=${geoAPI}`
    );
    if (!geo.ok) throw new Error('Problem getting location data');
    const dataGeo = await geo.json();
    //Country Data
    const res = await fetch(
      // await will wait until the promise is resolved
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`; // This return value will be the result of the promise that is returned from the async function
  } catch (err) {
    renderError(`something went wrong ${err.message}`);
  }

  //Reject promise is returned from async function
  throw err;
};


//This is one way of handling errors but it mixes the old promise method and async await
console.log('1: Will get Location');
whereAmI()
  .then(msg => console.log(`2: Resolved: ${msg}`)) // handling the promise returned to display message
  .catch(err => console.error(`Error: ${err.message}`))
  .finally(() => console.log('3rd'));


//Using an immediately invoked function to do the above with async/await
(async function () {
  console.log('1st');
  try {
    const location = await whereAmI();
    console.log(`2nd: ${location}`);
  } catch (err) {
    console.error(`2nd: ${err}`);
  }
  console.log('3rd');
})();
*/
////////////////////////// Video 266 - Running promises in parallel ///////////////////////////////////////
const getJSON = function (url, err = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`Error ${response.status}: ${err} `); // Manually handle error (404 in this case)
    return response.json();
  });
};
/*
const getThreeCountries = async function (c1, c2, c3) {
  try {
    //Below takes 1.5s as it runs the request syncronously
    // const [data1] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c3}`
    // );
    //Using the Promise.all() combinator function you can pass in the three promises and they get handled in parallel. Saving 1s on loading the data. However if theres an error all promise are rejected
    const data = await Promise.all([
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

getThreeCountries('portugal', 'germany', 'canada');


/////////////////////////// Video 267 - Promise Combinator functions race(), //////////////////////////////////////
// Promise.race() this will resolve as soon as the first promise is settled
(async function () {
  const res = await Promise.race([
    getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/egypt`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/germany`),
  ]);
  console.log(res[0]);
})();

//Creating a timeout function to handle requests that are taking to long (when combining it with race())
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took too long'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
  timeout(0.25),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

/// Promise.allSettled() This will settle all promises regardless if one throws an error or not
Promise.allSettled([
  Promise.resolve(`Success 1`),
  Promise.reject(`Error`),
  Promise.resolve(`Success 2`),
]).then(res => console.log(res));

// Promise.any [ES2021] // Returns the first fulfilled promise ( ignores any that are rejected)
Promise.any([
  Promise.resolve(`Success 1`),
  Promise.reject(`Error`),
  Promise.resolve(`Success 2`),
]).then(res => console.log(res));
*/

////////////////////////// Coding Challenge #3 //////////////////////////////////////
let currImage;

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const element = document.createElement('img');
    document.querySelector('.images').appendChild(element);
    element.onload = () => resolve(element);
    element.onerror = () => reject(new Error('Issue with image URL'));
    element.src = imgPath;
  });
};

// createImage('./img/img-1.jpg')
//   .then(img => {
//     currImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     currImage.style.display = 'none';
//     return createImage('./img/img-2.jpg');
//   })
//   .then(img => {
//     currImage = img;
//     return wait(2);
//   })
//   .then(() => (currImage.style.display = 'none'))
//   .catch(err => console.error(err));
/*
// Same as above but using await/async rather than promises
const loadNPause = async function (img1, img2) {
  try{let img = await createImage(img1);
  await wait(2);
  img.style.display = 'none';
  await wait(2);
  img = await createImage(img2);
  await wait(2);
  img.style.display = 'none';}
  catch (err){
    console.error(err)
  }
};

loadNPause('./img/img-1.jpg', './img/img-2.jpg');
*/

// Part 2 - My solution
const loadAll = async function (imgArr) {
  try {
    imgArr.map(async img => {
      // Map each url to extract the image using the createImage() method
      const i = await createImage(img); // Once each img promise has been resolved add the style class to it
      i.classList.add('parallel');
      return i;
    });
  } catch (err) {
    console.error(err);
  }
};
const arr = ['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg'];

//loadAll(arr);

// Part 2 - video solution
const loadAllSol = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img)); // Returns an array of promises
    const imgsEl = await Promise.all(imgs); // handle all the promises to get an array of image objects
    imgsEl.forEach(el => el.classList.add('parallel')); // loop through image array and add style classes
  } catch (err) {
    console.error(err);
  }
};

loadAll(arr);
