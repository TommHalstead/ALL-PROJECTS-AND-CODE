// IMPORTING MODULE
// import {
//   addToCart,
//   totalPrice as price,
//   totalQuantity,
// } from './shoppingCart.js'; // We must place our function into curly braces and they have to be the same name
// addToCart(`bread`, 5);
// console.log(price, totalQuantity);

console.log(`IMPORTING MODULE`);

// NAMED IMPORTS AND EXPORTS

// import * as ShoppingCart from './shoppingCart.js'; // Creates an object CONTAINING EVERYTHING THAT WAS EXPORTED FROM ANOTHER MODULE
// console.log(ShoppingCart);
// ShoppingCart.addToCart(`bread`, 5);
// console.log(ShoppingCart.totalPrice);

// import add, {
//   addToCart,
//   totalPrice as price,
//   totalQuantity,
// } from './shoppingCart.js';

import add, { cart } from './shoppingCart.js';
add(`pizza`, 2);
add(`bread`, 5);
add(`apple`, 4);
console.log(cart);

// const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

// const data = await res.json(); // BLOCKS EXECUTION OF EXTIRE MODULE
// console.log(data);
// console.log(`BLOCKED`);

// const getLastPost = async function () {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const data = await res.json();
//   return { title: data.at(-1).title, text: data.at(-1).body };
// };

// // Not very clean
// const lastPost = getLastPost();
// lastPost.then(last => console.log(last));

// const lastPost2 = await getLastPost();
// console.log(lastPost2);

// OLD WAY FOR EXPORTNG FUNCTIONS AND PROPERTIES

// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   };

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered from supplier `);
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart(`apple`, 4);
// ShoppingCart2.addToCart(`pizza`, 2);

// console.log(ShoppingCart2);
// console.log(ShoppingCart2.cart);

// Export

// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// }; // NODE.JS

// Import

// const { addToCart } = require(`./shoppingCart`);
// CommonJS

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: `bread`, quantity: 5 },
    { product: `pizza`, quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}
