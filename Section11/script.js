'use strict';
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements) {
  containerMovements.innerHTML = ''; // Empty container using innerHTML to prevent duplicates
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    // String literals allow you to creat custom blocks of code
    const html = `<div class="movements__row"> 
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}£</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html); //This method takes two inputs, where its being inserted and string thats being inserted
  });
};

const calcDisplaySummary = function (movements) {
  const income = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const outgoings = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter(int => int >= 1) // Bank introduces a rule where only interest values over 1 will be added
    .reduce((acc, int) => acc + int, 0);
  labelSumIn.textContent = `${income}£`;
  labelSumOut.textContent = `${Math.abs(outgoings)}£`;
  labelSumInterest.textContent = interest;
};

calcDisplaySummary(account1.movements);

const calcDisplayBalance = function (movements) {
  // Use reduce to calculate and display account balance
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `£${balance}`;
};

calcDisplayBalance(account1.movements);

const createUsername = function (accs) {
  accs.forEach(
    a =>
      (a.username = // Loop through account array and add user names to each of the object within (this is a side effect as there is no return value)
        a.owner
          .toLowerCase()
          .split(' ')
          .map(name => name[0])
          .join(''))
  );
};

createUsername(accounts);
//console.log(accounts);
displayMovements(account1.movements);

//Event handlers
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //Prevent for from submitting and reloading page
  e.preventDefault();
  //console.log('Log in');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  console.log(currentAccount);
  if (currentAccount.pin === Number(inputLoginPin.value)) {
    // Check users pin
    console.log(`Log in successful`);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//----- Array Methods  Basics
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

//Slice Method -- Creates a new array from the one you are slicing
console.log(arr.slice(2)); // Same as string slice method
console.log(arr); // arr is unmutated

//Splice Method -- Mutates original array
// console.log(arr.splice(2));
arr.splice(-1); // Remove last element from the array
arr.splice(2, 2); // The second parameter in splice is the number of elements to be deleted not the end index
console.log(arr);

//Reverse Method
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // Reverse mutates the original array
console.log(arr2);

//Concat
const letters = arr.concat(arr2); //combines two arrays without mutating either


// -- Array At Method
const arr = [23, 2, 65];

console.log(arr[0]); // Getting specific element
console.log(arr.at(0)); // Can be written with the at method like this

//Old way of getting last elements of an array
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);

//Using at method
console.log(arr.at(-1)); // Shorter to write.
//At method also works on strings

//--Foreach method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Using a for of loop to display withdrawl and deposits
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

//Same thing but using the forEach higher order function

movements.forEach(movement => {
  console.log(
    movement > 0
      ? `You deposited ${movement}`
      : `You withdrew ${Math.abs(movement)}`
  );
});

//If you want to include the index in the callback function
movements.forEach((movement, index, array) => {
  // in forEach loop there are more attributes availble
  console.log(
    movement > 0
      ? `Action ${index + 1}: You deposited ${movement}`
      : `Action ${index + 1}: You withdrew ${Math.abs(movement)}`
  );
  console.log(array); // This is just the complete array for every loop
});

//!!!!!You cannot break out of a forEach Loop!!!!!!


//forEach method on Maps and Sets

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
  // forEach with Maps has three available attributes like arrays
  console.log(`${key} : ${value}`);
  console.log(map);
});

//Sets
const currenciesUnique = new Set(['USD', 'GBP', 'EUR', 'USD']);

currenciesUnique.forEach((value, _, set) => {
  console.log(`${value}: ${value}`); //Sets do not have keys so the key value is just the value again
  console.log(set);
});


//---------- Coding Challenge #1 -------------

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaUpdated = dogsJulia.slice(1, -2);
  const allDogs = [...dogsJuliaUpdated, ...dogsKate]; // Could use Concat Method here instead
  allDogs.forEach((dog, i) => {
    console.log(
      `Dog number ${i + 1} is ${
        dog < 3 ? 'stil a puppy' : `${dog} years old adult`
      }.`
    );
  });
};

const J1 = [3, 5, 2, 12, 7];
const K1 = [4, 1, 15, 8, 3];
const J2 = [9, 16, 6, 8, 3];
const K2 = [10, 5, 6, 1, 4];

checkDogs(J1, K1);
checkDogs(J2, K2);



//------------- Map Method ----------------

*/
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
const movementsUsd = movements.map(mov => mov * eurToUsd); // Returns new array of movements * conversion rate
//console.log(movementsUsd);

//Map method also has access to the index and full array in the callback function

const movementsDescriptions = movements.map((mov, i) => {
  // Using this method as opposed to a for loop means you are not using side effects
  return mov > 0
    ? `Action ${i + 1}: You deposited ${mov}`
    : `Action ${i + 1}: You withdrew ${Math.abs(mov)}`;
});

// -------- Filter Method
const deposits = movements.filter(mov => mov > 0); // have callback element return a boolean. The elements that are true will be included
console.log(deposits);
const withdrawal = movements.filter(mov => mov < 0);
console.log(withdrawal);

//------- Reduce Method
const balance = movements.reduce((acc, mov, i) => {
  //In a reduce callback function the first attribute is a accululator, then it has the same three attributes as the map and filter
  console.log(`Iteration ${i}: ${acc}`);
  return acc + mov; // The return gets passed back in as the acc on the next loop
}, 0); // The last part is the starting value for the accumulator
console.log(balance);

//Maximum value
const maxValue = movements.reduce(
  // Using reduce to filter the list
  (acc, mov) => (mov > acc ? (acc = mov) : (acc = acc)), //If the current element is bigger set the acc to element else return acc
  movements[0] // Inital value is the first value of the array
);

console.log(maxValue);

// ------------ Find Method ----------------
/*
const firstWithdrawal = movements.find(mov => mov < 0); // find method just returns the first element that matches, unlike filter which returns an array with all matches
console.log(movements);
console.log(firstWithdrawal);
console.log(accounts);

const account = accounts.find(acc => acc.owner === `Jessica Davis`); // You can use this method to find an object in an array that matches a certain property

console.log(account);


// --------------------- Coding challenge #2 //--------------------- Coding challenge #3

const calcAverageHumanAge = dogs => {
  //1. Calculate the dogs age in human years using <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4
  dogs
    .map(dog => (dog <= 2 ? dog * 2 : 16 + dog * 4))
    .filter(humanAge => humanAge >= 18) // filter for adult aged dogs
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0); // Sum age and calc average (using current array property in reduce)
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

//------- Chaining Methods

//Pipeline
const totalInUsd = movements
  .filter(mov => mov > 0)
  .map((mov, _, arr) => {
    console.log(arr); //- Can be tricky to debug when they are all chained together. This is another way in which the array property is useful at each step
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalInUsd);
*/
