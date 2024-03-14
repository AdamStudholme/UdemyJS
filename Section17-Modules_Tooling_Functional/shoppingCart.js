//Exporting Module
console.log('exporting module');
/*
//Blocking code
console.log('start fetching users');
await fetch('https://jsonplaceholder.typicode.com/users'); // This will block the code in the importing script as imports are executed before the code in the import script
console.log('finish fetching users');
*/
const shippingCost = 10;
const cart = [];

//Exports must happen in top level code, so cannot be inside a block
export const addToCart = function (prod, qty) {
  cart.push({ prod, qty });
  console.log(`${qty} ${prod} added to cart`);
};

const totalPrice = 237;
const totalQty = 20;

// You should really only use named or default exports and not mix them even though you can
//Export named exports multiple items at once
export { totalPrice, totalQty, cart };

// default export just takes in a value
/*
export default function (prod, qty) {
  cart.push({ prod, qty });
  console.log(`${qty} ${prod} added to cart`);
}
*/
