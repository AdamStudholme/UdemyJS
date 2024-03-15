//Importing Module
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// Importing statements are hoisted to the top of the file. Even if it is placed lower down in the code block it will be executed first
//import { addToCart, totalPrice as price, totalQty } from './shoppingCart.js';
console.log('importing module');

// You can import all exports using the * notation, which returns an object containing exports
import * as ShoppingCart from './shoppingCart.js';

// Importing the default export value, you can give it any name
//import add from './shoppingCart.js';

ShoppingCart.addToCart('Cheese', 5);
console.log(ShoppingCart.totalPrice, ShoppingCart.totalQty);

ShoppingCart.addToCart('pizza', 2);

console.log(ShoppingCart.cart);

// console.log('start');

// // In JS Modules you can use the await (without async function) !! Will block execution of module !!
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('end');

//Real world example of top level await use
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

// Without the await lastPost would be a promise
// const lastPost = await getLastPost();
// console.log(lastPost);

/*
///////////////////////// OLD Module pattern before 'Native Modules' were added in ES6 ////////////////////////////
//Create a self declaring function to create single use code in its own scope
const shoppingCart2 = (function () {
  // Everything declared within this function is private
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQty = 23;
  const addToCart = function (prod, qty) {
    cart.push({ prod, qty });
    console.log(`${qty} ${prod} added to cart`);
  };

  const orderStock = function (prod, qty) {
    console.log(`${qty} ${prod} ordered from supplier`);
  };

  //To expose the contents of the function return them in an object
  return {
    addToCart,
    cart,
    totalPrice,
    totalQty,
  };
})();

console.log(shoppingCart2.addToCart('apple', 4));
*/

/*
////////////////////// CommonJS Modules - Predominantly used in Node.js. Again used before ES6 modules /////////////////////////////
// lots of npm packages use the commonJS module pattern but it will not work in a browser

// Export 
export.addToCart = function (prod, qty) {
    cart.push({ prod, qty });
    console.log(`${qty} ${prod} added to cart`);
  };

  // Import
  const { addToCart} = require('./shoppingCart.js')

///////////////////////////////////////////////////////// */

////////////////////  Using NPM to use 3rd party libraries from npm //////////////////////////////

//import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es'; // Parcel will automatically find route to package without full path

const state = {
  cart: [
    { product: 'bread', qty: 5 },
    { product: 'pizza', qty: 6 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
console.log(stateClone); // This clone still has the same end points as state. So changing loggedIn to false will also change stateClone

//Using lodash cloneDeep
const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);

state.user.loggedIn = true;

//This is a Parcel command which will inject new version of a module into the browser without changing the browser state
if (module.hot) {
  module.hot.accept();
}

class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const adam = new Person('Adam');

console.log(ShoppingCart.cart.find(el => el.qty >= 2));
Promise.resolve('TESTSTRING'), then(t => console.log(t));
