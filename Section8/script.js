'use strict';

// function calcAge(birthYear) {
//   const age = 2022 - birthYear;
//   console.log(firstName); // First name is a global variable so accessable in the function scope

//   function printAge() {
//     const output = `${firstName}, You are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       const str = `Oh, and you're a millenial ${firstName}.`;
//       console.log(str);
//     }
//   }
//   printAge();
//   return age;
// }

// const firstName = 'Adam';

// calcAge(1988);

// console.log(calcAge);

//----------- Primative v Object

let lastName = 'Williams';
let oldlastName = lastName;
lastName = 'Davis';
console.log(lastName, oldlastName);

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica; //Not a new object in the heap, so both variables point to the same memory address.
marriedJessica.lastName = 'Davis'; // Changing the lastName will impact both variables

//---- copying an object
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'John', 'Bob'],
};

//Shallow copy
const jessicaCopy = Object.assign({}, jessica2); // To make two seperate objects. However it only creates a shallow copy. Only first level propeties

jessicaCopy.lastName = ' Davis';

console.log(jessica2, jessicaCopy); // Now you have an actual copy rather than two variable names for the same object

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('William');

console.log(jessica2.family, jessicaCopy.family); // You can see that the copied object still points to the same second level object (family array)

//You would use an external library to do a deep clone to create a true copy.
