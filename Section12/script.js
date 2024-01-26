'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2024-01-15T21:31:17.178Z',
    '2024-01-14T07:42:02.383Z',
    '2024-01-13T09:15:04.904Z',
    '2024-01-10T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const calcDaysPassed = (d1, d2) =>
  Math.round(Math.abs(d1 - d2) / (1000 * 60 * 60 * 24));

const formatCurr = function (amount, locale, currency) {
  const options = {
    style: 'currency',
    currency: currency,
  };
  return new Intl.NumberFormat(locale, options).format(amount);
};

const formatMovementDate = function (date, locale) {
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date); // Returns a date formatted according to account locale
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''; // Empty container using innerHTML to prevent duplicates

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements; // slice method makes a copy of
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const options = {
      style: 'currency',
      currency: acc.currency,
    };
    const formattedMov = formatCurr(mov, acc.locale, acc.currency);
    // String literals allow you to creat custom blocks of code
    const html = `<div class="movements__row"> 
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html); //This method takes two inputs, where its being inserted and string thats being inserted
  });
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const outgoings = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1) // Bank introduces a rule where only interest values over 1 will be added
    .reduce((acc, int) => acc + int, 0);
  labelSumIn.textContent = formatCurr(income, acc.locale, acc.currency);
  labelSumOut.textContent = formatCurr(outgoings, acc.locale, acc.currency);
  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
};

const calcDisplayBalance = function (acc) {
  // Use reduce to calculate and display account balance
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
};

const createUsername = function (acc) {
  acc.forEach(
    a =>
      (a.username = // Loop through account array and add user names to each of the object within (this is a side effect as there is no return value)
        a.owner
          .toLowerCase()
          .split(' ')
          .map(name => name[0])
          .join(''))
  );
};

const updateUI = function (acc) {
  displayMovements(acc);
  //Display balance
  calcDisplayBalance(acc);
  // Display Summmary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function (time) {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);
    //Each call print remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //When time  = 0 logout user
    if (time === 0) {
      clearInterval(countdown);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    //Decrease time
    time--;
  };
  // Call timer every second
  tick();
  const countdown = setInterval(tick, 1000);
  return countdown; // return the interval so it can be cleared
};

createUsername(accounts);
//console.log(accounts);

//Event handlers
let currentAccount, countdown;

btnLogin.addEventListener('click', function (e) {
  //Prevent for from submitting and reloading page
  e.preventDefault();
  //console.log('Log in');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    //Adding the ? means it will just returned undefined if theres no account
    // Check users pin
    console.log(`Log in successful`);
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100; // Sets opacity

    // Create current date and time
    const now = new Date();
    // Configuration object for the DateTimeFormat API
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      //weekday: 'long',
    };
    //const locale = navigator.language; // Fetches the ISO language from browser 'en-GB' for UK
    labelDate.textContent = Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // THis removes the focus from the inputs once logged in

    // Start logout timer, if timer is already running clear it first before starting a new one
    if (countdown) clearInterval(countdown);
    countdown = startLogoutTimer(30);

    //Update UI
    updateUI(currentAccount);
  }
});

//Transfer Button handler
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = ''; //Empty text fields

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Update movements for sender and receiver accounts
    receiverAcc.movements = receiverAcc.movements.concat(amount);
    currentAccount.movements = currentAccount.movements.concat(-amount);
    //Add dates for movements
    receiverAcc.movementsDates.push(new Date().toISOString());
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }

  clearInterval(countdown);
  countdown = startLogoutTimer(30);
});

//Loan Request Handler
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value); // Round down request nearest whole number
  // For a loan the account must have one deposit of at least 10% of the loan request
  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    //Simulate loan approval with a timeout
    setTimeout(function () {
      //Add movement if loan is approved
      currentAccount.movements.push(amount);
      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      //Update UI
      updateUI(currentAccount);
    }, 3000);
  }
  inputLoanAmount.value = '';
  clearInterval(countdown);
  countdown = startLogoutTimer(30);
});

//Close Acc handler
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('delete');
  //Check account details
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    console.log('Match!');
    //Find index of account that needs deleting
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // Remove account from accounts array
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
  clearInterval(countdown);
  countdown = startLogoutTimer(30);
});

//Sort Handler
let sortState = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sortState); // using the opposite of the sort state can flip the sort
  sortState = !sortState;
});

////////////////////////////////////////////////////////////////////////////////

// ----- LECTURES ------

// ------------ Math and Rounding ------------
/*
//--sqrt
console.log(Math.sqrt(25));
//OR
console.log(25 ** (1 / 2));

// -- Random number function
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(-3, 20));

//-- Rounding Integers
console.log(Math.trunc(23.3));
console.log(Math.trunc(23.6));
console.log(Math.round(23.3));
console.log(Math.round(23.6));
console.log(Math.floor(23.3));
console.log(Math.floor(23.6));
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.6));
console.log(Math.trunc(23.3));
console.log(Math.trunc(23.6));

// --------------- Dates and Times -------------------

//Creating a date
const now = new Date(); // Returns current date/time
console.log(now);

// Can parse a string into a date
console.log(new Date('Mon Jan 15 2024 08:38:57'));
console.log(new Date('December 25, 2015'));
// Can parse a variable 
console.log(new Date(account1.movementsDates[0]));
// Parse numbers for year, month (zero based), day, hours, min, seconds
console.log(new Date (2034, 10, 19, 15, 23, 5)); 


// Working with dates
const future = new Date(2034, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay()); // Returns day of the week as an int
console.log(future.toISOString()); // Converts date to ISO standard string, useful for storing
console.log(future.getTime()); // Returns timestamp, time in milliseconds since 1/1/1970
console.log(Date.now()); // Returns current timestamp

//Modifying/setting dates
future.setFullYear(2040); // All of the gets have a corrosponding set
console.log(future);

// -------------- Internationalizing numbers -------------------

const num = 284342.87;
const options = {
  style: 'unit',
  unit: 'mile-per-hour',
};

console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
*/
// -------------- Timers -----------

//-- Set Timeout function
const ingredients = ['olives', 'spinach'];

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with, ${ing1} and ${ing2}🍕`),
  3000,
  ...ingredients
); // Timeouts take a callback function then the delay in milliseconds
//With the timeout callback function you have to pass any arguements for the functions after the time
console.log('Waiting....');

// You can cancel the timeout anytime before the timer runs out
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

//-- Set Interval function
const timer = setInterval(function () {
  const now = Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date());
  console.log(now);
}, 1000);

setTimeout(() => clearInterval(timer), 5000);
