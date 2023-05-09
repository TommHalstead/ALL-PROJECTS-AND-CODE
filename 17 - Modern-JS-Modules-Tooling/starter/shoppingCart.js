// EXPORTING MODULE
console.log(`EXPORTING MODULE`);

//Blocking code
// console.log(`Start fetching users`);
// const res = await fetch(`https://jsonplaceholder.typicode.com/users`);

// console.log(`Finish fetching`);

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}; // Write export in front of any varaiable or function you would like to export

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
