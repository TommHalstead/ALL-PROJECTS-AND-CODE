'use strict';
/*
// Default parameters
const bookings = [];

const createBooking = function (
  flightNum = `***`,
  numPassengers = 10, // This sets default values for parameters
  price = 250 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking(`LH123`);
createBooking(`SAD`, 5);

createBooking(`LH123`, undefined, 500); // Setting the middle parameter to undefined (acts as skipping this prameter) and it uses the default value

// Passing arguments into functions
// Primitives vs. Relatives

*/

/*

///////////////////////////////////

// Passing arguments, value vs. reference

const flight = `LH234`;
const thomas = {
  name: `Thomas Halstead`,
  passport: 2344234522,
};

const checkIn = function (flightNum, passenger) {
  flightNum = `LH999`; // This is only a reference to the actual parameter that is passed in, therefore it does not change the outside variable. This is considered its own variable technically.
  passenger.name = `Mr. ` + passenger.name;

  if (passenger.passport === 2344234522) {
    alert(`Checked in`);
  } else {
    alert(`Wrong passport!`);
  }
};

// checkIn(flight, thomas);
// console.log(flight);
// console.log(thomas);

// This simply makes a copy of the actual value and will not affect the actual flight variable in global scope if it's changed elsewhere, which is the same as above because it's only referenced.

// const passenger = thomas;
// const flightNum = flight;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};
newPassport(thomas);
checkIn(flight, thomas);
*/

/*
// A first class function means that a function is simply treated as a value in javascript, and that functions are also just another type of object, which being objects have their own callable methods on those functions.

// Higher Order Functions are functions that receiuve another function as an argument, or one that returns a function, or a combination of the both.

const oneWord = function (str) {
  return str[0].toUpperCase() + str.slice(1).replaceAll(` `, ``).toLowerCase();
};

// This function simply takes a string as an input and removes all spaces, as well as converts the whole string to lowercase and returns that result.
console.log(oneWord(`HelLo, hOW ARe you?`));

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(` `);
  return [first.toUpperCase(), ...others].join(` `);
};

// This function takes a string as an input, destructures and splits the string by placing the first word into an array by itself and uses the rest operator to palce all the other words into a seperate array. It then returns the first word transformed to uppercase, with the rest of the words from the ...others array and joins the two back together.

console.log(upperFirstWord(`Hi how are you doing`));

// Higher Order Function, since it will be receiving another function as an argument

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

// This function takes in a string as the first argument and a function as the second, therefore this is a HIGHER ORDER FUNCTION. " console.log(`Transformed string: ${fn(str)}`); " this part of the function takes the string and applies the second argument which is a funtion to the string, which happens to be the upperFirstWord function that capitalizes the first word of the string and returns the string joined together with the first word capitalized.

// When using callback functions and Higher Order Functions, the callback function is called from within inside of the higher order function. It is telling javascript that this function is not to be called until at a later time. When calling the function from within inside the Higher Order Function, you use the argument name to call that function.

transformer(`javascript is the best!`, upperFirstWord);

transformer(`javascript is the best!`, oneWord);

// JS uses callbacks all over, all of the time
const high5 = function () {
  console.log(`🙋‍♂️`);
};
document.body.addEventListener(`click`, high5);

[`Thomas`, `Martha`, `Adam`].forEach(high5);

*/

// PRACTICE CALLBACK FUNCTION
/*
const arr = [4, 6, 8, 3, 2];

const testFn = function (arr, fn) {
  for (const i of arr) {
    fn(i);
  }
  return `Callback calculation complete!`;
};

const callback = function (input) {
  console.log(input * input);
};

console.log(testFn(arr, callback));
 */
/*
///////////////////////////
// Using a function as a return function
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

const greet = greeting => name => console.log(`${greeting} ${name}`);
// This arrow function called greet, takes one parameter of `greeting` and then returns another function that takes a parameter of `name` and then finally returns the combined two arguments in a single string.

const greeterHey = greet(`Hey`); // This stores this specific greeting `Hey` being called by this function into a `greeterHey` variable, which then also becomes callable as seen below, just with the second name parameter as an argument.
greeterHey(`Thomas`);
greeterHey(`Steven`);

//Basically we stored the result of the first function into a variable which then becomes its own function that you can call with the name argument.

greet(`Hello`)(`Thomas`);
// Here we call both of the functions together since the return value of the greet function is the 'greeterHey' function.

*/
/*
////////////////////////////
// The THIS keyword and setting it manually

const lufthansa = {
  airline: `Lufthansa`,
  iataCode: `LH`,
  bookings: [],
  // book: function() {}, old syntax for object methods.
  // Enhanced object Syntax
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline || this.name} flight ${
        this.iataCode
      }${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name,
    });
  },
};

console.log(lufthansa);

lufthansa.book(239, `Thomas Halstead`);
lufthansa.book(635, `John Smith`);

// const delta = {
//   name: `Delta`,
//   iataCode: `DH`,
//   bookings: [],
// };
// delta.book = lufthansa.book; // This borrows the book() method from the lufhtansa object and then calls the method on the delta object.
// delta.book(431, `Thomas Halstead`);
// delta.book(783, `Jose Alvarez`);
// delta.book(325, `Michael Jordan`);
// delta.book(947, `John Smith`);
// console.log(delta);

const delta = {
  name: `Delta`,
  iataCode: `DH`,
  bookings: [],
};

///////////////////////////////////
// The .call() method

const book = lufthansa.book;

// Does NOT work
// book(23, `Sarah Williams`);

book.call(delta, 23, `Sarah Williams`); // This uses the .call() function on the book method and with the first parameter, sets the .this keyword to delta. The following arguments are the ones you would put into the book() method.
console.log(delta);

book.call(lufthansa, 239, `Mary Cooper`);
console.log(lufthansa);

const swiss = {
  name: `Swiss Airlines`,
  iataCode: `LX`,
  bookings: [],
};

book.call(swiss, 895, `Mary Cooper`);
console.log(swiss);

// Apply method
const flightData = [583, `George Cooper`];
book.apply(swiss, flightData);
console.log(swiss);

// The .apply() method does the same thing as the .call() method, only as the parameters, it takes an array of the arguments instead.

book.call(swiss, ...flightData); // This is the same as using the apply method, only you just use the spread operator to unpack the array of

// Bind method
////////////////////////////////////////

// book.call(delta, 23, `Sarah Williams`);

const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
const bookDH = book.bind(delta); // The bind keyword binds the .this keyword to the lufthansa, swiss and delta objects respectively and permanantly as long as it's used with the bookDH, bookLH, or bookLX function

bookDH(23, `Steven Williams`);
console.log(delta);

const bookDH23 = book.bind(delta, 23); // This permanantly binds this `23` argument to this variable, therefore they do not need to be set again
bookDH23(`Steven Smith`);
bookDH23(`Martha Cooper`);

//////////////////////////////////////////
// Partial Application is when you preset some of the arguments needed for a function

// With Event Listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector(`.buy`)
  .addEventListener(`click`, lufthansa.buyPlane.bind(lufthansa));
// The this keyword when attached to an event handler, points to the element in which is handling the event as the .this keyword does.

lufthansa.buyPlane.bind(lufthansa); // Here we bind the .this keyword to the lufthansa object so that the buyPlane function points to the lufthansa object.

// Partial Application
/////////////////////////////////

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
// General function for adding tax

const addVAT = addTax.bind(null, 0.23);
// const addVAT = (rate, value) => value + value * .23; // This is what the above line of code would do

// Typically within bind, you set the first keyword to the object in which you would like the .this keyword to point at, therefore for the first argument, we just place a `null` there, since that is not our focus with this .bind() function.

console.log(addVAT(100));

// MINI CHALLENGE
// Make a function, which returns a callback function copying the above code.

const addTax2 = rate => value => value + value * rate;

const addTaxVat = addTax2(0.23);

console.log(addTaxVat(100));

*/

////////////////////////////////////////
// IMMEDIATELY INVOKED FUNCTION EXPRESSIONS!!
/*
const runOnce = function () {
  console.log(`This will never run again`);
};

runOnce();

// IIFE

const isPrivate = 23;
(function () {
  console.log(`This will never run again`);
  console.log(isPrivate);
})(); // This is called an immediately invoked function expression because it is called right as it is read and never called again

// Arrow function IIFE

(() => console.log(`This will never run again`))();

//ALL data within any scope is private, or also encapsulated

// IIFE's are wrapped in parentheses and not given a variable name

{
  const isPrivate = 23;
  var notPrivate = 24; // var is not block scoped
}

console.log(notPrivate);

*/

/*

////////////////////////////////////////
// CLOSURES
// A close us not a future that we explicity use. They are not a feature that we create manually.

// A closure is simply something that happens automatically that we need to notice or realize

// A clousre means that when we have one FEC inside another FEC, the inner FEC rememebrs the outer FEC variables so that they can be utilized for later use. Even thought the execution context has finished.

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
// Functions return a value, the return value of this function is another function that we store in this `booker` variable, which then becomes its very own function.

// Any function always has access to the variable environment of the execution context in which the function was created. EVEN IF the excutiong context of the parent function is no longer on the call stack

// THE BOOKER CLOSES OVER THE PARENT SCOPE OR THE PARENT VARIABLE ENVIRONMENT. Closure has priority over the scope chain.

// console.log(booker);
booker();
booker();
booker();

console.dir(secureBooking);
console.dir(booker);

*/

/*

// Example 1:

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);
// Re-assigning the f function inside of the h function
h();
f();
console.dir(f);

// Example 2:

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait}`);
};

boardPassengers(180, 3);


*/
