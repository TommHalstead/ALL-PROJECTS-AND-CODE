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

const getLastPost = async function () {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};

// Not very clean
const lastPost = getLastPost();
lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);
