'use strict';

// ------------ Default Parameters ----------------
/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //ES5 you could not set defaults in the function declaration

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123'); // End up with default for numPassengers and price

//--------------- Primatives and Objects passed into Functions

const flight = 'LH234';
const adam = {
  name: 'Adam Studholme',
  passport: 32762596402,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 32762596402) {
    alert('Checked In');
  } else {
    alert('Wrong Passport!');
  }
};

checkIn(flight, adam);
console.log(flight); // The flight number hasn't changed dispite being asigned to a new variable becuase its a primative type so a new address in memory is made
console.log(adam); // As adam is an object the reference is copied to a new variable but they both point to the same location on the heap, therefore its mutated


//Example of issues caused by this difference

const newPassport = function (person){
  person.passport = Math.trunc(Math.random()*100000000)
}

newPassport(adam)
checkIn(flight, adam)


//--------------- First Class and Higher Order Functions

//Functions accepting Callback Functions

const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...rest] = str.split('-');
  return [first.toUpperCase(), ...rest].join(' ');
};

//Higher Order Function
const transformer = function (str, func) {
  console.log(str);

  console.log(`Transformed string: ${func(str)}`);
  console.log(`Transformed by: ${func.name}`);
};

transformer('Javascript is the best!', upperFirstWord); // Passing in callback functions which are called within the higher order transformer function
transformer('Javascript is the best!', oneWord);

//JS uses Callback functions all the time - As they allow you to add abstraction to you code
const high5 = function () {
  console.log('🙌');
};

document.body.addEventListener('click', high5); // callbacks passed into addEventListener (higher order function)
['Adam', 'Sam', 'Hannah'].forEach(high5); // Will log the '🙌' once per element, again an example of a higher order function taking a callback function


//---------------- Functions Returning Functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`); // Greet returns a new function
  };
};

const greeterHey = greet('Hey'); // You can assign the returned function to a variable
greeterHey('Adam'); // Then call it
greet('Hi')('Adam'); // You can chain the function calls to envoke the returned function imediately

const greetArrow = greeting => name => console.log(`${greeting} ${name}`); // Can be re-written as an arrow function
greetArrow('Arrow')('John');

//-------- Call and Apply Methods

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name}, book a seat on ${this.airline}, flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Adam Studholme');
lufthansa.book(653, 'Hannah Gilroy');

const book = lufthansa.book;

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const swiss = {
  airline: 'Swiss',
  iataCode: 'SW',
  bookings: [],
};

//Call Method
book.call(eurowings, 23, 'Sarah Williams'); // Use call method to use function from luthansa object with eurowings object as 'this'
console.log(eurowings); // You can see that the above function call has added booking to Eurowings array

//Apply Method

const flightData = [583, 'George Cooper'];
book.apply(eurowings, flightData); // Apply is similar to call but takes an array for the arguements for the function

//Apply isn't really used anymore as the same can be acheived with call method and spread opperator
book.call(eurowings, ...flightData);

//----------- Bind Method

const bookEW = book.bind(eurowings); // This will not call the book function but return a new function where eurowings is this
const bookSwiss = book.bind(swiss); // Same but for Swiss airline

bookEW('547', 'Jo Brand');
console.log(eurowings);

// You can go one step further and set some of the parameters in the bind. for example if you want a specific flight number
const bookEW23 = book.bind(eurowings, 23); // Called 'Partial Application' as some parameters are pre-set
bookEW23('Adam Jones'); // Only requires a name as flight number is already set

// With Event Listeners
lufthansa.planes = 300; // Add new attribute to the Luthansa object
lufthansa.buyPlane = function () {
  // Add new function
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

//document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); // Will return NaN rather than updated luthansa plane count, as 'this points to the element the eventlisten is attached to

//To fix the 'this' issue
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // Now the count of the Luthansa object increases

// Partial Application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.2); // You can preset the rate. As there is no this key word used you pass null in as the first argument in the bind

console.log(addVAT(100));

// Challenge
// Use functions returning a function to replicate the partial application

const addTaxRate = rate => value => value + value * rate;

const VAT = addTaxRate(0.2);

console.log(VAT(10));

//---------- Coding Challenge #1

//1. Create method for answering a poll
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = prompt(
      `${this.question}\n${this.options.join(`\n`)} \n (Write option number)`
    );
    if (
      typeof answer !== Number &&
      (answer < 0 || answer > this.answers.length)
    )
      return this.registerNewAnswer();
    this.answers[Number(answer)]++;
    this.displayResults();
    this.displayResults('string');
  },
  //3. Create method to display results and call it at the end of each poll answer
  displayResults(type = 'array') {
    if (type === 'string') {
      return console.log(`The poll results are ${this.answers.join(`, `)}`);
    }
    return console.log(this.answers);
  },
};

//2. Call method when answer poll button is clicked
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// 5. Use displayResults method on the following two arrays
const data1 = [5, 2, 3];
const data2 = [1, 5, 3, 9, 6, 1];

poll.displayResults.call({ answers: data1 }, 'string'); // call the display results with a new object with the answers contained
poll.displayResults.call({ answers: data2 }); 



//----------------- Immediately Invoked Functions
// Making functions that will only run once and will not be saved anywhere

(function () {
  console.log('This will never run again');
})(); // put a function in parathesis and then call it

//Will work with arrow functions to
(() =>console.log('This will never run again'))()

//Using IIFE help to reduce the chances of overwriting variables as you can hide them in the scope of the function. Not as widely used now
// as just making a block will keep variables within a blocks scope.
*/
//---------- Closures

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(passengerCount, 'passengers');
  };
};

const booker = secureBooking();
booker(); // booker function has access to the passenger count function as the variable enviroment is based on the point at which it was created
booker();
booker();

console.dir(booker); // Will allow you to look at the internal scope of a function, and any variables in the closure. This variables cannot be accessed outside of the function

//closure examples

//EXAMPLE 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

g();
f(); // Dispite variable evniroment of g no longer esisting because of closure f can access the variables defined within g

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f); // Closure contains value of a

//Reassigning the f function
h();
f();
console.dir(f); // Closure contains value of b

//EXAMPLE 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding ${n} passengers`);
    console.log(`Ther are 3 groups each with ${perGroup} passengers`);
  }, wait * 1000); // Timers are an example of closure as the boardPassenger function will have completed before the Timeout callback is executed
  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);

//--------------- CODE CHALLENGE #2 ----------------

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.body.addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
