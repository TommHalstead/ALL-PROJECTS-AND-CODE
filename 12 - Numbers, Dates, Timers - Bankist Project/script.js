'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2023-03-31T23:36:17.929Z',
    '2023-04-02T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24))); // This takes two arguments of two seperate dates, and does the math on them with this calculation to see how many days passed from one date to the next

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${month}/${day}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: `currency`,
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(
    Math.abs(incomes),
    acc.locale,
    acc.currency
  );
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(
    Math.abs(interest),
    acc.locale,
    acc.currency
  );
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};
// LOGOUT TIMER

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Log in to get started`;
    }
    // Decrease 1 second
    time--; // Every second that this setInterval timer runs, we decrease the timer by 1 second here manually

    // When time = 0, stop the timer and log the user out
  };
  // Set timer to 5:00 5 minutes
  let time = 300;
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create the current date and time
    const now = new Date();
    const options = {
      hour: `numeric`,
      minute: `numeric`, // We write numeric to allow JS to know we would like a numeric value in this place
      day: `numeric`,
      month: `numeric`, // We can use `numeric` - gives number date, `long` - gives full month name, or `2-digit
      year: `numeric`, // Numeric or 2-digit
      // weekday: `short`, // Long, 2-digit, numeric, short, narrow
    };
    // const locale = navigator.language; // This grabs the current ISO language code for the current user from their computer

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now); // This creates a `formatter` for this specific timezone and location. en-US. We then call the .format() function in order to format it to whatever time we would like, we then pass in a second argument which is a configuration object in order to pass in the hour and minutes and any other times or properties we would like to add to this Intl.DateTimeFormat()

    // const year = now.getFullYear();
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const day = `${now.getDay()}`.padStart(2, 0);
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minute = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${month}/${day}/${year}, ${hour}:${minute}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(acc.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// CHECKING NUMBERS

/*

// Base 10 : 0 - 9. 1/10 = 0.1
// Binary Base 2 : 0 - 1

// Convery string to numbers
console.log(23 === 23.0);

console.log(0.1 + 0.2);

console.log(+`23`); // This makes the 23 a number because it preforms type coercion behind the scenes

// Parsing
console.log(Number.parseInt(`30px`, 10)); // The .parseInt() method called on the Number object will grab a number from within a string and get rid of the rest of the string. The string MUST start with a number for this to work
console.log(Number.parseInt(`e23`, 10)); // The second param is the

// RADIX is the base of the number system being used. We use base 10, so we pass in 10 as the second argument to this function

// Float
console.log(Number.parseFloat(`   2.5rem`, 10)); // This will read the FPN, the floating point number from within the string. Once again, it must start with the number for this to work.
// console.log(parseInt(`2.5rem`, 10)); // Using the parseInt() on a floating point number will give you the integer part of the number.
// These are global objects, so you can call them on explicitly, but it's encouraged to call them on the number object
// Calling the number object, creates a namespace.

// ONLY use to check if a value is NaN
console.log(Number.isNaN(20)); // is Not a Number? false
console.log(Number.isNaN(`20`)); // is Not a Number? false. true if the given value is NaN after being converted to a number; otherwise, false. because it can't be a number

// Use to check if the value IS a number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite(`20`)); // false, because no type coercion is preformed on the more robust, Number.isFinite() call.
console.log(isFinite(`20`)); // True, because type coercion is preformed on this isFinite() call.

// Use to check if a value is a number as well
console.log(Number.isInteger(20));
console.log(Number.isInteger(20.0));

*/

/* 

// Square root of numbers and cube root
console.log(Math.sqrt(25)); // Find the square root of a number
console.log(25 ** (1 / 2)); // This also gives you the square root a number, due to fractional exponents
console.log(8 ** (1 / 3)); // This will give you the cubic root of a number.

// Max and min of numbers
console.log(Math.max(5, 18, 23, 20, `55`)); // This gives you the maximum value back from a list of numbers, does type coercion as well. DOES NOT PARSE

console.log(Math.min(1, 3, 5, 7, 3)); // Gives the min out of a list of numbers

console.log(Math.PI * Number.parseFloat(`10px`) ** 2); // This will calculate the radius of a circle.

// console.log(Math.trunc(Math.random() * 6) + 1);

// Function for a random number, specified in parameters
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

console.log(randomInt(10, 20));

// Rounding integers ALL these methods do type coercion

console.log(Math.trunc(23.3)); // Removes everything after the decimal

console.log(Math.round(23.3)); // Rounds to the nearest integer

console.log(Math.ceil(23.1)); // Rounds up to the nearest interger
console.log(Math.floor(23.6)); // Rounds down to the nearest whole integer

console.log(Math.floor(-23.2)); // Rounding negative numbers works backwards

// Rounding floating point numbers or decimals

console.log(+(2.732).toFixed(5)); // To fixed returns a string always and not a number. It will add decimals to reach the desired decimal length

*/

/*

//Remainder operator %
console.log(5 % 2); // 2 goes into 5, 2 times with a remainder of 1
console.log(8 % 3); // 2

const evenOrOdd = n =>
  n % 2 === 0 ? console.log(`Number is even`) : console.log(`Number is odd`);

evenOrOdd(9);

labelBalance.addEventListener(`click`, () => {
  [...document.querySelectorAll(`.movements__row`)].forEach((row, i) => {
    if (i % 2 === 0) row.style.backgroundColor = `orangered`;
    if (i % 2 !== 0) row.style.backgroundColor = `cyan`;
  });
});

*/

/*

// Numeric Seperators
// 286,460,000,000
// 286_460_000_000
// The _ is a numeric operator used to act as a comma in order to be able to read the number you're looking at

const diameter = 287_460_000_000;
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const transferFee = 15_00;

const PI = 3.1415;

// console.log(Number(`230_000`)); // Numeric seperators only work on numbers

// 

*/

/*

// Big INT

// Numbers are represented in 64 bits, only 53 bits are used to store numbers because 11 bits are used to store commas, and other numberic operators

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

// Maximum safe number in Javascript

console.log(3423452345123451245234523452345234513341345n); // The n transforms a number to a big INT

console.log(BigInt(342345234512));

// Operations with BigInt()
console.log(10000n + 10000n);
console.log(3238974592043875209348759023475892347529038475n * 1000000000n);
// console.log(Math.sqrt(16n));
// You can't mix BigInt with other numbers that aren't BigInt

const huge = 324234124213412343214123412342134n;
const num = 23;
console.log(huge * BigInt(num));

console.log(20n == 20); // JS does type coercion, so this is true
console.log(20n === 20); // NO type coercion, left operand is a BigInt right operand is an integer
console.log(typeof 20n);

console.log(huge + ` is REALLY big!!!`);

// Divisions
console.log(10n / 3n); // Returns 3n, returns closest BigInt

*/

/*

// Dates and Times fundamentals

// You must first create a date with the new Date constructor function

// Method 1

const now = new Date(); // This gives you the current time and date right now
console.log(now);

// Method 2

console.log(new Date(`Sun Apr 02 2023 19:55:41`)); // JS will parse the date here and find the time zone and time zone code
console.log(new Date(`December 24, 2015`)); // This will also give you the date and time and day as well because JS can parse through and find these details

console.log(account1);

console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); // This will also parse the dates based on these inputs
console.log(new Date(2037, 10, 34)); // If the wrong day is entered like here, 34 it will auto correct to the correct day

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Conversion for milliseconds to days. 3 days * 24 hours * 60 mins * 60 seconds * 1000 milliseconds in one second

*/

// Working with dates
// Getting and Setting dates

/*

const future = new Date(2037, 10, 19, 15, 23);

console.log(future);
console.log(future.getFullYear()); // 2037; gets the full year
console.log(future.getMonth()); // 0 based, so 10 is really 11
console.log(future.getDate()); // The actual day of the month
console.log(future.getDay()); // Grabs the day of the week, 0 being Sunday
console.log(future.getHours()); // Gets seconds
console.log(future.getMinutes()); // Gets minutes
console.log(future.getSeconds()); // Gets seconds

console.log(future.toISOString()); // Returns a string in simplified extended ISO format YYYY-MM-DDTHH:mm:ss.sssZ
// Use to convert a date object to a string to place somewhere

console.log(future.getTime()); // Gives you the milliseconds that have passed since January 1st, 1970 AKA timestamp

console.log(new Date(2142278580000)); // timestamps. Gives you the time and date

console.log(Date.now()); // Gives you the timestamp currently at this moment

future.setFullYear(2040);
console.log(future);

////////////////////////////////////////////
// All of the above methods also have a set() method on them as well, so we can set all of these dates as well.


*/

/*

//////////////////////////////

// Operations with dates:

const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

// Subtracting timestamps can give you the time in between two dates

const calcDaysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)); // This takes two arguments of two seperate dates, and does the math on them with this calculation to see how many days passed from one date to the next

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);


*/

/*

///////////////////////

// Internationalizing Dates INTL:

// Intl.DateTimeFormat() - Takes two arguments, a locale and then an object of options for hours, minutes, etc.

const num = 3884764.23;

const options = {
  style: `currency`, // unit // currency //percent
  unit: `celsius`, // Many more units to use online
  currency: `USD`, // We can change the currency type as well - Currecny is not defined by the locale, so we have to manually define the currency
  // useGrouping: false, // This property allows you to change whether or not commas and decimals are used for the thousands place
};

console.log(`US: `, new Intl.NumberFormat(`en-US`, options).format(num)); // Takes a LOCALE first in the NumberFormat function. Adn then we have to call the format function in order to pass in what we want to format // 3,884,764.23 `en-US`
console.log(`Germany: `, new Intl.NumberFormat(`de-DE`, options).format(num)); // 3.884.764,23
console.log(`Syria: `, new Intl.NumberFormat(`ar-SY`, options).format(num));
console.log(
  `Browser: `,
  new Intl.NumberFormat(navigator.language, options).format(num)
);

// THE NAVIGATOR.LANGUAGE WILL GRAB THE CURRENT LANGUAGE OR TIME OR WHATEVER IS NEEDED FROM THE USERS OWN LAPTOP AND APPLY THAT TIMEZONE OR LANGUAGE TO THE PROGRAM


*/

/*

///////////////////

// Timers: setTimeout() - sets a function to run after a timeout - only gets called once / setInterval() - Keeps running until we set it basically

// ASYNCHRONOUS JAVASCRIPT

// We can pass more arguments to this setTimeout() function by simply passing them into the callback function itself as extra parameters, after the timeout duration. We also have to add the params in the setTimeout function itself as always of course

const ingredients = [`olives`, `spinach`];

const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}🍕`),
  3000,
  ...ingredients
); // Receives a callback function for the first argument, WE DO NOT CALL THIS FUNCTION, WE PASS IN THIS ARGUMENT TO SET TIMEOUT, IT'S THIS FUNCTION WHICH WILL CALL THIS CALLBACK FUNCTION. The second argument is when we would like to call this function in milliseconds. 1 second = 1000 Milliseconds
console.log(`Waiting...`); // When JS parses this code, it will simply store the timeout in memory and keep parsing code without stopping

// clearTimeout() allows you to conditionally clear a timeout timer based on some condition

if (ingredients.includes(`spinach`)) clearTimeout(pizzaTimer);

//setInterval()

setInterval(function () {
  const now = new Date();
  const seconds = now.getSeconds();
  const minute = now.getMinutes();
  const hour = now.getHours();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  console.log(`${month}/${day}/${year}, ${hour}:${minute}:${seconds}`);
}, 1000); // This interval timer will call a function at a specified interval, in this case, every 5 seconds we will display the current date and time to the console

*/

////////////////////////////////////////////

// Implementing a countdown timer
