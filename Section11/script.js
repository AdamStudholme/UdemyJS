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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // Empty container using innerHTML to prevent duplicates

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements; // slice method makes a copy of
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // String literals allow you to creat custom blocks of code
    const html = `<div class="movements__row"> 
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    
    <div class="movements__value">${mov}£</div>
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
  labelSumIn.textContent = `${income}£`;
  labelSumOut.textContent = `${Math.abs(outgoings)}£`;
  labelSumInterest.textContent = interest;
};

const calcDisplayBalance = function (acc) {
  // Use reduce to calculate and display account balance
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `£${acc.balance}`;
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
  displayMovements(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  // Display Summmary
  calcDisplaySummary(acc);
};

createUsername(accounts);
//console.log(accounts);

//Event handlers
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //Prevent for from submitting and reloading page
  e.preventDefault();
  //console.log('Log in');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Adding the ? means it will just returned undefined if theres no account
    // Check users pin
    console.log(`Log in successful`);
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100; // Sets opacity
    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // THis removes the focus from the inputs once logged in

    //Update UI
    updateUI(currentAccount);
  }
});

//Transfer Button handler
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
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
    updateUI(currentAccount);
  }
});

//Loan Request Handler
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  // For a loan the account must have one deposit of at least 10% of the loan request
  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    //Add movement if loan is approved
    currentAccount.movements.push(amount);
    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

//Close Acc handler
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('delete');
  //Check account details
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
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
});

//Sort Handler
let sortState = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortState); // using the opposite of the sort state can flip the sort
  sortState = !sortState;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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
  // in forEach loop there are more attributes available
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
*/
// ------------ Find Method ----------------
/*
const firstWithdrawal = movements.find(mov => mov < 0); // find method just returns the first element that matches, unlike filter which returns an array with all matches
console.log(movements);
console.log(firstWithdrawal);
console.log(accounts);

const account = accounts.find(acc => acc.owner === `Jessica Davis`); // You can use this method to find an object in an array that matches a certain property

console.log(account);

*/
/*
// -------------- Some and Every Methods -------------------

//Includes is an EQUALITY
console.log(movements.includes(-130));
console.log(movements);

//Some Method CONDITION
const anyDeposits = movements.some(mov => mov > 5000); // With some you can check if  condition is true for any item in an array
console.log(anyDeposits);

//Every Method - only returns True when ever element passes the test in the condition
console.log(movements.every(mov => mov >= 0)); //False
console.log(account4.movements.every(mov => mov >= 0)); //True

//Seperate callback function - Saves typing out the function every time DRY!
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

//------------------ Flat and FlatMap Methods ----------------------
//Flat Method
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // Flat method puts all nested arrays ( 1 level down) into a single array
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); // Only gets flatten down one level, so you still have two nested arrays
console.log(arrDeep.flat(2)); // Passing in depth to the function will allow more depth with the flattening

const accountMovements = accounts.map(acc => acc.movements); // Map all movements from all accounts
const allMovements = accountMovements.flat();
console.log(allMovements); // You now get a single array with all movements
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// Above could be written as a chained assigment
const overallBal = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBal);

// FlatMap Method - Simplifies the above further however flatmap is limited to one level of nesting
const overallBalFlatMap = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalFlatMap);

// ------------------- Sorting Values - Sort Method--------------------
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // Built in sort method mutates original array
console.log(movements);
console.log(movements.sort()); // Sort works based on strings so it converts everything to strings and sorts alphabetically
//To fix numerical sort you need to pass in a callback function
//If we return something less than 0 then A before B otherwise B before A.

//Ascending Sort
movements.sort((a, b) => {
  if (a > b) return 1; //Flips the order
  if (b > a) return -1; // Keeps the order
});
console.log(movements); // Now the array is sorted in an ascending order

//Descending Sort
movements.sort((a, b) => {
  if (a > b) return -1; //Flips the order
  if (b > a) return 1; // Keeps the order
});
console.log(movements); // Now the array is sorted in an Descending order

//This numerical sort can be simplified though as you only need to return a positive or a negative number
movements.sort((a, b) => a - b); //Ascending
movements.sort((a, b) => b - a); //Descending
*/
/*
// ---------------------- Programmically generating arrays ---------
// Fill Method
const x = new Array(7); // Builds an empty array with 7 elements, which is not much use unless called with a fill method
console.log(x); // [empty x7]
x.fill(1); // Fills array with 1
console.log(x); //[1,1,1,1,1,1,1]
const y = new Array(7).fill(7, 2, 4); // You can provide start and end indexes in the fill method
console.log(y); // [empty × 2, 7, 7, empty × 3]

// From Method - on array constructor
const z = Array.from({ length: 7 }, () => 1); // Alternate way of creating an array
console.log(z);

const w = Array.from({ length: 7 }, (_, i) => i + 1); // Builds array with incrementing values
console.log(w);

// You can use these methods to generate arrays such as 100 random dice rolls
const diceRoll = () => Math.trunc(Math.random() * 6) + 1;
const randRolls = Array.from({ length: 100 }, () => diceRoll());
console.log(randRolls);

// More practical uses for the from method
// Converting querySelectorAll node lists to an array so you can use array methods
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    // Takes all  the movements from the UI and converts them to an array of numbers
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('£', ''))
  );

  console.log(movementsUI);
});

//-------------- Array Methods Practice ---------------

//1. Use array methods to calculate sum of all deposits to accounts
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, curr) => sum + curr);
console.log(bankDepositSum);

//2. Count how many deposits over £1000
//Using filter
const depositsOver1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000).length;
console.log(depositsOver1000);
// Using reduce
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, sum) => (sum > 1000 ? ++count : count), 0);
console.log(numDeposits1000);

//3. Create new object which contains the deposits and withdrawals with reduce method
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      //cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur; // refactored version
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

//4. Convert any string to a title case
// this is a nice title -> This Is a Nice Title

const convertToTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  console.log(title);

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertToTitleCase('this is a nice title'));
console.log(convertToTitleCase('this is a LONG title but not too long'));
console.log(convertToTitleCase('and here is another title with an EXAMPLE'));


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

// ----------------- Coding Challenge #4 -----------------------

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1. Set the recommended food portion for each dog
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);

console.log(dogs);

//2. Find Sarah's dog and log if its eating too much/little food
const size = dogs.reduce((str, dog) => {
  if (dog.owners.includes(`Matilda`)) {
    if (dog.curFood < dog.recommendedFood * 0.9) {
      str = 'Portion to small';
      return str;
    }
    if (dog.curFood > dog.recommendedFood * 1.1) {
      str = 'Portion to large';
      return str;
    } else {
      str = ' Potion size is correct';
    }
  } else str = str;

  return str;
});

console.log(size);

//3. Create array contain all owners who's dogs eat to much and one for those who eat to little

const ownersEatToMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood * 1.1)
  .flatMap(dog => dog.owners);

const ownersEatToLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood * 0.9)
  .flatMap(dog => dog.owners);

console.log(ownersEatToMuch);
console.log(ownersEatToLittle);

// 8. Sort dogs ascending by recommended food
const dogsAsc = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsAsc);
