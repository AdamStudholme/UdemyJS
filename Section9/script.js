'use strict';

//-------------------- Destructing Arrays
/*
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  catagories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Foccacia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

//Old way of extracting individual variables from an array
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

//Extracting individual variables using Destructuring
const [x, y, z] = arr;
console.log(x, y, z);

let [first, second] = restaurant.catagories;
console.log(first, second); // Will take the first and second elements from catagories

const [first2, , third] = restaurant.catagories; // Leaving a gap in the destructing assigment means it skips an element
console.log(first2, third);

//Switching variables using destructuring
[first, second] = [second, first];
console.log(first, second);

//Receiving 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//Nested Destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested; // Destructure within destructuring to extract nested array variables.
console.log(i, j, k);

//Default values
let [p, q, r] = [8, 9];
console.log(p, q, r); // r returns undefined
[p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); // setting default values, r now returns 1. This is useful when the array length is unknown.
*/

//------------- Destructuring Objects
/*
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  catagories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Foccacia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, //Open 24hrs
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // orderDelivery: function (obj) {
  //   console.log(obj);
  // },
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = 20,
    address,
  }) {
    // Destructing can happen in the function call
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your tasty pasta with: ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

restaurant.orderDelivery({
  time: '23:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
}); // You can pass in one object and the function will destructure it. Helpful as the order is no longer important in the function

//Use curly braces to destructure objects
const { name, openingHours, catagories } = restaurant; // Order of variables doesn't matter
console.log(name, openingHours, catagories);

const {
  // You can rename the object elements to a new variable name within the destructuring
  name: restaurantName = 'resturant', // You can still use default values
  openingHours: hours,
  catagories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values are particularly useful when using APIs when the data is from another source and isn't known

//Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj); //You have to put the entire destructing in parathensese to mutate exsisting variables
console.log(a, b);

//Nested Objects
const {
  fri: { open, close },
} = openingHours;

console.log(open, close);

//-------- The Spread Operator

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

//Acheiving the same result with spread opperator
const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr); // The spread opperator allows you to extract all the elements from array

const newMenu = [...restaurant.mainMenu, 'Gnocci']; // This is a new array
console.log(newMenu);

// Copy array

const mainMenuCopy = [...restaurant.mainMenu]; // Shallow copy of mainMenu array

//Join multiple arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Iterables are Arrays, Strings, Maps, Sets but NOT Objects
const str = 'Adam';
const letters = [...str, 's'];
console.log(letters);

//Real world example
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Let's make pasta! Ingredient 2?"),
//   prompt("Let's make pasta! Ingredient 3?"),
// ];
//Old long way to pass in the ingridents to orderPasta Method
//restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

//Using Spread operator
//restaurant.orderPasta(...ingredients);

// Objects with the spread operator
const newResturant = { ...restaurant, founder: 'Guiseppe' };


//------------- Rest Pattern and Parameters

//...SPREAD Opperator as its on the right hand side of opperator
const arr = [1, 2, 3, ...[4, 5]];
console.log(arr);

//... REST as its on the left side
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // Combines the remaining parts of the array into a new array

const [pizza, , risotto, ...otherFood] = [
  // Rest element must be the last element and there can only be one
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

//Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); // New object containing just the weekdays hours

//Functions
const add = function (...numbers) {
  // Using the rest pattern on the function call means you can pass in an unknown number of elements in a single array
  //console.log(numbers);
  return console.log(
    numbers.reduce((a, b) => {
      return a + b;
    }, 0)
  );
};

add(2, 3);
add(5, 3, 4, 6);
add(1, 2, 3, 5, 6, 7);

const x = [23, 5, 7];

add(...x); // This will spread all of the elements in the array to enable them to be passed into the add function

restaurant.orderPizza('Mushrooms', 'Olives', 'Pepperoni');

restaurant.orderPizza('Mushrooms'); 


//---------------- Short Circuiting ( && or ||)
//Use Any data type and return any data type, and short circuiting
console.log('----------------OR---------------');

console.log(3 || 'Jonas'); // As 3 is a truthy value the second value isn't even evaluated. This is shortcircuiting
console.log('' || 'Jonas'); //returns 'Jonas'
console.log(true || 0); // returns true
console.log(undefined || null); //returns null
console.log(undefined || 0 || ` ` || 'Hello' || null); //returns `Hello`, the first truthy value reached

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

// Can be shortened to the following using short-circuiting
const guests2 = restaurant.numGuests || 10;

console.log('----------------AND---------------');

console.log(0 && 'Jonas'); // Returns 0, returns the first element if its a falsey

//Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'Spinach');
}

///Can be writen using the && operator
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'Spinach'); // If the orderPizza operator  exsists (truthy), the second part is evaluated

// ------------------ Nullish Coalescing Operator

restaurant.numGuests = 0;
const guestsOr = restaurant.numGuests || 10; //Dispite numGuests having a value, because 0 is falsey this results in 10 instead of 0
console.log(guestsOr);

// To get around the above issue use the Nullish Coalescing Operator ??
const guestsNullish = restaurant.numGuests ?? 10; //Uses Nullish values: Null or Undefined ( NOT 0 or '')
console.log(guestsNullish);


// -------------- Logical Assignment Operators

const rest1 = {
  name: 'Capri',
  numGuests: 0,
  // numGuests: 20,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

//Setting all restuarant objects to have number of guests using the ||
rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 10;

//Instead it can be writtnen with the OR Assignment operator
rest1.numGuests ||= 10;
rest2.numGuests ||= 10;

// Using the Nullish Assignment Operator to avoid issues with 0 values
rest1.numGuests ??= 10;

//Using AND Assignment Operator to anonomyize data
// rest2.owner = rest2.owner && '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>'; // Shortened version, it will only assign the value if the variable is already assigned

console.log(rest1);
console.log(rest2);


//----------------- For Of Loop

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item); // This doesn't have any indexing as standard as it was designed to just return the element

for (const item of menu.entries()) console.log(item); // The entries method creates arrays with the element and its index

for (const item of menu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`); // You can use the items from the entries array to create a menu
}

// Use destructuring to make above cleaner
for (const [index, item] of menu.entries()) {
  console.log(`${index + 1}: ${item}`);
}
*/

// ----------- Enhanced Object Literals
const weekdays = ['mon', 'tues', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    // Can use another variable to delcare the key names in an object
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, //Open 24hrs
    close: 24,
  },
};
/*
console.log(openingHours);

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  catagories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Foccacia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours, // ES6 Enhanced Object Literals, takes the variable object from outside of object
  order(starterIndex, mainIndex) {
    // No longer need to have : function for a method.
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // orderDelivery: function (obj) {
  //   console.log(obj);
  // },
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = 20, address }) {
    // Destructing can happen in the function call
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your tasty pasta with: ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

//-------- Optional Chaining

console.log(restaurant.openingHours.mon); // returns undefined
//console.log(restaurant.openingHours.mon.open); //returns error as property of undefined is an error

//To avoid above error
if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);
// but if the check needed to be multi level it can get messy
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

//Optional chaining makes this easier (adding the ?)
console.log(restaurant.openingHours?.mon?.open); // You can add the ? at every level if needed

//Example using restuarant opening days
for (const day of weekdays) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? `Closed`; // Check to see if its open. Usinf Nullish to set default value
  console.log(open);
}

//Optional chaining of methods
console.log(restaurant.order?.(0, 1) ?? "Method doesn't exist"); // calls method as it exists
console.log(restaurant.orderRisotto?.(0, 1) ?? "Method doesn't exist"); // returns string " Method doesn't exist"

//optional chaining arrays
const users = [{ name: 'Adam', email: 'adam@email.com' }];
console.log(users[0]?.name ?? 'User array is empty');


// ------------Looping Objects
// Key Array
const properties = Object.keys(openingHours);
console.log(properties);
// Value Array
const values = Object.values(openingHours);
console.log(values);
//Entire Object
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) { //Destructuring the entries in for of loop
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}


//------------ Sets - Data Structures
// Collection of unique values

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]); // instantiate a new Set object and give it a iterable, such as an array

console.log(ordersSet); // Only logs unique values {'Pizza', 'Pizza', 'Risotto'}
console.log(new Set('Adam Studholme')); // prints {'A', 'd', 'a', 'm', ' ', …} with only the one 'm'

//Methods on sets
console.log(ordersSet.size); // Returns the size of set (3)
console.log(ordersSet.has('Pizza')); // Returns boolean
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread'); // You can add elements
ordersSet.delete('Pizza'); // You can delete an element
console.log(ordersSet);
//ordersSet.clear(): //Clears the set

//You can loop through a set
for (const order of ordersSet) {
  console.log(order);
}

//Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)]; // You can pass in an array to get unique values and then use spread operator to put them back into an array
console.log(new Set(staff).size); //You can use this to work out the number of unique postions

// ---------------------- Maps - Fundamentals
// Structure to map values to keys
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firencze, Italy'); // The keys do not have to be strings in Maps. They can be any data type
rest.set(2, 'Lison, Portugal');
console.log(rest);

rest // You can chain together set methods on Maps as each set method returns an updated Map
  .set('catagories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

console.log(rest.get('name')); // The get method returns the value for a given key
console.log(rest.get(false));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); // You tie it all together and use the boolean keys to determine what is printed

//More Map Methods
console.log(rest.has('catagories')); // Has method returns a boolean
rest.delete(2); //You can pass in a key to delete it
console.log(rest.size); // Size property
// rest.clear() // Clear Map method

rest.set([1, 2], 'Test'); // You can set an array as the key but doing it this way means you cannot call it
console.log(rest.get([1, 2])); // Returns undefined as the two arrays are stored in different parts of the memory
const arr = [1, 2]; // To use an array as a key first assign it to a variable then use that as the key
rest.set(arr, 'Test2');
console.log(rest.get(arr));

//You can use DOM Elements as a key for a Map
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
*/
/*
// Alternative way to populate Maps if you are hardcoding
//Quiz App
const question = new Map([
  ['question', 'What is the best programming language?'],
  [1, 'C'],
  [2, 'Python'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct answer!'],
  [false, 'Wrong answer'],
]);

console.log(question);

//Convert Object to Map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log(question.get('question'));

//Maps are iterrables so a for loop can be used
for (const [key, value] of question) {
  if (typeof key == 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}
const answer = 3; //Number(prompt('What is your answer?')); // Have to convert to number so it matches the key type
console.log(question.get(answer === question.get('correct'))); // Using the boolean keys to provide a response

//Convert Map to an Array
console.log([...question]);



//---------------- Working with Strings
//PART 1
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]); // strings are indexed returns 'a' etc
console.log('B737'[0]); // This will also work 'B'

//String Methods - All string methods return a new string
console.log(airline.indexOf('r')); // Get index of letter (first match)
console.log(airline.lastIndexOf('r')); // Get index of letter (last match)
console.log(airline.indexOf('Portugal')); // Can search for entire words

//Slice Method
console.log(airline.slice(4)); // Slice starts at index 4, returns 'Air Portugal'
console.log(airline.slice(4, 7)); // To cap start and end, start index inclusive/end index excluded returns 'Air'
console.log(airline.slice(0, airline.indexOf(' '))); // Extracting first word
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Extracting first word
console.log(airline.slice(-2)); // Minus index works from the end of the string

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s == 'B' || s == 'E') {
    return console.log('Middle Seat');
  }
  return console.log('Not a middle seat');
};

checkMiddleSeat('11E');
checkMiddleSeat('3A');
checkMiddleSeat('2B'); // Behind the scenes JS converts the String to an String Object, then converts it back

//PART 2

const nameCaptalization = function (name) {
  const words = name.split(' ');
  let fixedName = [];
  for (const word of words) {
    const lowerWord = word.toLowerCase();
    fixedName.push(lowerWord[0].toUpperCase() + lowerWord.slice(1));
    // fixedName.push(lowerWord.replace(lowerWord[0], lowerWord[0].toUpperCase())) // Alternative method
  }

  console.log(fixedName.join(' '));
};

nameCaptalization('adam sTudholme');

//Comparing Emails Example
const email = 'hello@adam.com';
const loginEmail = ' Hello@Adam.com \n'; // Fix this so it will match with 'email'

const fixedEmail = loginEmail.trim().toLowerCase();
console.log(fixedEmail === email);

// Replacing parts of Strings
const priceGB = '288,97£';
const priceUS = priceGB.replace(',', '.').replace('£', '$'); // Replace comma and pound sign
console.log(priceUS);

const announcement = 'All passengers come to door 23, Thats door 23 now!'; // Replace multiple occurences
const announcementEditRegex = announcement.replace(/door/g, 'gate'); // Using a Regex
const announcementEdit = announcement.replaceAll('door', 'gate'); // Using replaceAll Method
console.log(announcementEditRegex);

//Practice Exercise

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun'))
    return console.log('You cannot board!');
  return console.log('Security cleared');
};

checkBaggage('I have a laptop, some food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

//Using split along with destructuring
const [firstName, lastName] = 'Adam Studholme'.split(' ');

//Padding - Used to make a string a set length
const message = 'Hi please pad me';
console.log(
  message
    .padStart(Math.trunc(50 - message.length / 2), `-`)
    .padEnd(Math.trunc(100 - message.length / 2), `-`)
);

const maskCreditCard = function (number) {
  const str = number + ''; // making sure number is a string
  const last = str.slice(-4);
  return last.padStart(str.length, '*'); // pad last four digits so it looks like full card length
};

console.log(maskCreditCard(1234345645676789));

//Repeat
const message2 = ' Bad Weather All Departures delayed... ';
console.log(message2.repeat(5));

const planesQueuing = function (n) {
  console.log(`There are ${n} planes in the queue. ${'✈'.repeat(n)}`);
};

planesQueuing(10);
/*
//--------------- Coding Challenge #1

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1 Create two arrays for the players
const [players1, players2] = game.players;
//console.log(players1);
//console.log(players2);

//2 Create variable for goalies and an array for the rest of the team
const [gk1, ...feildPlayers1] = players1;
const [gk2, ...feildPlayers2] = players2;

//console.log(gk1, feildPlayers1);
//console.log(gk2, feildPlayers2);

//3 All PLayers Array
const allPlayers = [...players1, ...players2];
//console.log(allPlayers);

//4 New Team 1 with subs
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
//console.log(players1Final);

//5 Game Odds variables
const {
  odds: { team1, x: draw, team2 },
} = game;
//console.log(team1, draw, team2);

//6 Function for logging goal scorers
const printGoals = function (...scorers) {
  scorers.forEach(scorer => {
    console.log(scorer);
  });
  console.log(`Total Number of Goals: ${scorers.length}`);
};

//printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
//printGoals(...game.scored);

//7 Print most likely team to win to console.
// console.log(
//   `${team2 < team1 ? game.team2 : game.team1} is most likely to win.`
// );

// ------- Coding Challenge #2

//1 Loop over game.scored array printing each player and the goal number they scored
for (const [index, scorer] of game.scored.entries()) {
  //console.log(`Goal ${index + 1}: ${scorer}`);
}

//2 Calc averge odd and log
let odds = 0;
const gameValues = Object.values(game.odds);

for (const odd of gameValues) {
  odds += odd;
}
//console.log(odds / gameValues.length);

//3 Print the odds and the team name where applicable
// const gameOddsEntries = Object.entries(game.odds);
// for (const [team, odds] of gameOddsEntries) {
//   game[team]
//     ? console.log(`${game[team]} odds of victory: ${odds}`)
//     : console.log(`Odds of a draw: ${odds}`);
// }

const scorersObj = function (...scorers) {
  const scorersObj = {};
  for (const scorer of scorers) {
    scorersObj[scorer] ? (scorersObj[scorer] += 1) : (scorersObj[scorer] = 1);
  }
  //console.log(scorersObj);
};
scorersObj(...game.scored);

// ----------- Coding Challenge #3

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
]);

//1 Create Events array of unique events
const events = [...new Set(gameEvents.values())];
console.log(events);

//2 Remove false yellow card from 64min
gameEvents.delete(64);
console.log(gameEvents);

//3 Calculate and log a strign ofo the average frequency of an event.
const average = 90 / gameEvents.size;
console.log(`On average there was an event every ${average} minutes.`);

//4 Log each element of the gameEvents stating if it was in the first or second half

for (const [key, event] of gameEvents) {
  key <= 45
    ? console.log(`[FIRST HALF] ${key}: ${event}`)
    : console.log(`[SECOND HALF] ${key}: ${event}`);
}


//----------- Coding Challenge #4

//document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').textContent = 'Camel Case';

const convertToCamelCase = function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split(`\n`);
  //--My solution:
  // for (const row of rows) {
  //   const line = row
  //     .trim()
  //     .toLowerCase()
  //     .split(/[-_ .,:;]/);
  //   let newLine = '';
  //   for (const word of line) {
  //     newLine +=
  //       line.indexOf(word) == 0 ? word : word[0].toUpperCase() + word.slice(1);
  //   }
  // console.log(newLine.padEnd(20, ' '), '✅'.repeat(rows.indexOf(row) + 1))
  // }

  //Better solution using destructuring
  for (const [i, row] of rows.entries()) {
    const [first, second] = row
      .trim()
      .toLowerCase()
      .split(/[-_ .,:;]/);
    const newLine = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(newLine.padEnd(20, ' '), '✅'.repeat(i + 1));
  }
};

document.querySelector('button').addEventListener('click', convertToCamelCase);
*/
//--------- Further Strings Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const flightArray = flights.split('+');
for (const flight of flightArray) {
  const [message, from, to, time] = flight.split(';');
  let announcement = `${message.replaceAll('_', ' ').trim()} from ${from
    .slice(0, 3)
    .toUpperCase()} to ${to.slice(0, 3).toUpperCase()} (${time.replace(
    ':',
    'h'
  )})`;

  announcement = announcement.startsWith('Delayed')
    ? '🔴 ' + announcement
    : announcement;
  console.log(announcement.padStart(50));
}
