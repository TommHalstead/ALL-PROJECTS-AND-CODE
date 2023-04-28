'use strict';

const weekdays = [`mon`, `tues`, `wed`, `thurs`, `fri`, `sat`, `sun`];

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const flightSplit = flights.split(`+`);
const emoji = `🚩`;

// for (const flight of flightSplit) {
//   const lineEnd = `)`;
//   const flightNew = flight
//     .trim()
//     .replaceAll(`_`, ` `)
//     .replace(`;`, ` from `)
//     .replace(`;`, ` to `)
//     .replace(`;`, ` (`)
//     .replace(`:`, `h`);

//   let flightNew1 = flightNew.concat(``, lineEnd);
//   if (
//     flightNew1.includes(
//       `fao93766109` ||
//         `txl2133758440` ||
//         `bru0943384722` ||
//         `hel7439299980` ||
//         `lis2323639855`
//     )
//   ) {
//     const newNew = flightNew1
//       .replace(`fao93766109`, `FAO`)
//       .replace(`txl2133758440`, `TXL`)
//       .replace(`bru0943384722`, `BRU`)
//       .replace(`hel7439299980`, `HEL`)
//       .replace(`lis2323639855`, `LIS`);
//     console.log(newNew);
//   }
// }

const getCode = str => str.slice(0, 3).toUpperCase(); // Slicing the first 3 indexes from the str parameter and using the . toUpperCase() method on it.

for (const flight of flights.split(`+`)) {
  const [type, from, to, time] = flight.split(`;`); // Destructuring the flight string into multiple seperate elements, split by a colon.
  const output = `${type.startsWith(`_Delayed`) ? `🚩` : ``}${type.replaceAll(
    `_`,
    ` `
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    `:`,
    `h`
  )})`.padStart(42);
  console.log(output);
}

// Delayed Departure from FAQ to TXL (11h25)
//            Arrival from BRU to FAQ (11h45)
// Delayed Arrival from HEL to FAQ (12h05)
//            Departure from FAQ to LIS (12h30)

// Data needed for first part of the section

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [`${weekdays[5]}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced Object Literals
  openingHours,

  // Enhanced ES6 methods syntax
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = `20:00`, address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`()
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza(mainIngredients, ...otherIngredients) {
    console.log(mainIngredients, otherIngredients);
  },
};

/*
//////////////////////////////////////////////////////
// Working with strings- Part 3
// Split and Join
console.log(`a+very+nice+string`.split(`l`)); // This string method takes the string and splits it at the inputted parameter,omitting the parameter, returning you an array. If there is no matching parameter within the string, it returns the full string as is.
console.log(`Thomas Halstead`.split(` `)); // This gives you an array of the first and last name, since it is split by the space

const [firstName, lastName] = `Thomas Halstead`.split(` `); // Assings the result of this split to this array with two elements, firstName and lastName. The results of the .split(` `) are then stored into the [firstName, lastName] array

const newName = [`Mr.`, firstName, lastName.toUpperCase()].join(` `);
console.log(newName); // The .join() method joins all the items from the array with the specified parameter being the conjoining figure.

const capitalizeNameDifferent = function (nombre) {
  const names = nombre.split(` `);
  const namesUpper = [];

  for (const n of names) {
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(` `));
};

const capitalizeName = function (nombre) {
  const names = nombre.split(` `); // This is where the magic happens, the .split(` `) method splits the string at the spaces and places them into an array.
  const namesUpper = [];
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(namesUpper);
  console.log(namesUpper.join(` `)); // The .join() method joins the array together with the inputter parameter.
};
// }; // This function takes the element at position [0] on every iteration through the array and applies the .toUpperCase() method on them, then adding the rest of the string back by using the .slice(1) method on every iteration in order to get everything except the first letter. It then pushes the results of this logic to an empty array created within the function.

const passenger = `jessica ann smith davis`;

capitalizeNameDifferent(passenger);
capitalizeNameDifferent(`thomas halstead`);
// console.log(`thomashalstead`.slice(1, 8)); // Cuts 0, keeps 1 - 7, cuts 8.

// Padding

const message = `Go to gate 23`;
// console.log(message.padStart(25, `+`)); // The .padStart() method adds to your string. The first parameter is the desired length of the string, and the second parameter is the desired padding or filler to reach the desired .length; The .padStart() method inclues the string within the first parameter.
console.log(`Thomas`.padStart(20, `+`).padEnd(30, `+`));
console.log(message.padStart(25, `+`).padEnd(37, `-`));

const maskCreditCard = function (number) {
  const str = number + ``; // Converts the CC to a string by adding it a an empty string.
  const last = str.slice(-4); // Slices the last 4 chars. from the string.
  return last.padStart(str.length, `*`); // Returns the CC# with the length of the string as the first parameter in the padStart method to give the placeholder for the padStart method, and the second parameter is the astericks the numbers are to be replaced with.
};

console.log(maskCreditCard(9384739294739204));
maskCreditCard(`1029484948783920`);

// Repeat

const message2 = `Bad weather... All Departures Delayed...\n`;
console.log(message2.repeat(5)); // The .repeat() method does exacltly that and repeats the message as many times as the parameter dictates.

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${`✈️`.repeat(n)}\n`);
}; // Here we pass the argument to the to the '.repeat()' method, INSIDE of the template literal in order to repeat the plane itself 'n' times.

planesInLine(5);
planesInLine(3);
planesInLine(12);

*/

/////////////////////////////////////////////////////
// Working with strings - Part 2
/*
const airline = `Delta Airlines`;

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());
console.log(`Thomas`.toUpperCase());

// Fix capitalization in name
const passenger = `ThOmAs`;
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);

console.log(passengerCorrect);

const fixName = function (nombre) {
  const lowerCase = nombre.toLowerCase();
  const passengerCorrectName = nombre[0].toUpperCase() + lowerCase.slice(1);
  console.log(passengerCorrectName);
};
fixName(`JoRDaN`);

// Comparing emails

const email = `hello@thomas.io`;
const loginEmail = `  Hello@Thomas.Io \n`;

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail); // This method trims all the white space and/or enters from a string and returns the non-whitespace string.
const lowerEmail = loginEmail.toLowerCase().trim();
console.log(lowerEmail);
console.log(email === lowerEmail);

// Replacing parts of strings

const priceGB = `$288,97`;
const priceUS = priceGB.replace(`$`, `#`).replace(`,`, `.`);
console.log(priceUS); // This replaces first the dollar sign with the hashtag and then following, the comma with the period, by also chaining these methods.

const announcement = `All passengers come to boarding door 23! Boarding door 23!`;

console.log(announcement.replace(`door`, `gate`)); // This will only replace the first occurance of the specified parameter.
console.log(announcement.replace(/door/g, `gate`)); // This is the pre .replaceAll() method way of replacing all specified parameters within a string
console.log(announcement.replaceAll(`door`, `gate`)); // This will replace ALL occurances of the specified parameter(s).

// Booleans .includes() .startsWith() .endsWith()

const plane = `Airbus A320neo`;
console.log(plane.includes(`A320`)); // This checks if the string contains whatever specified parameters you choose.
console.log(plane.startsWith(`A`)); // This checks the string starts with the specified parameters, any matching selection within the string will show.

// These 3 methods are very helpful when taking decisions based on the string
if (plane.startsWith(`Airbus`) && plane.endsWith(`neo`)) {
  console.log(`Part of the NEW airbus family.`);
}

// Practice exercise

const checkBag = function (items) {
  const bags = items.toLowerCase();
  if (bags.includes(`knife`) || bags.includes(`gun`)) {
    console.log(`You are not allowed on board!`);
  } else {
    console.log(`Welcome a board!`);
  }
};
checkBag(`I have a laptop, some Food and a pocket Knife`);
checkBag(`I have some socks and a camera`);
checkBag(`I have some snaccks and a gun for protection`);
*/
/*
//////////////////////////////////////////////////////

// Working with strings - Part 1

const plane = `A320`;

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log(`B737`[0]); // Strings are also 0 based

console.log(`B737`.length);
console.log(airline.length);

console.log(airline.indexOf(`h`));
// .indexOf finds the position of the desired letter or value
console.log(airline.lastIndexOf(`e`));
// Is key-sensitive
console.log(airline.indexOf(`how`)); // On full words, it gives you the indecOf the last character of the word you typed in

// Extract part of a string with the .slice method, the .slice method uses indexes as arguments
console.log();
console.log(airline.slice(1, 12)); // The .slice method slices a string at whatever value correlates to the arguments you enter. This for example, 1, 12 will slice everything AFTER 1 but through 12, the result of this would be `elta Airlin` - this is called a `substring` because it's only a part of the original string. This does not change the underlying string because strings are primitives and therefore can not be mutated. In order to use this sliced string, you must store it in a variale. This method always returns a new string.

// The length of the string is always the last parameter - the first parameter.

console.log(airline.slice(airline.indexOf(` `))); // This slices a string starting from the index position of 0, spanning through until the fist space,  ` ` , by using the .indexOf method on within the slice method as a parameter.
console.log(airline.slice(airline.lastIndexOf(` `) + 1)); // This first uses the lastIndexOf method to grab the last space within the string, we then apply the .slice() method on it so it slices everything before the last space, ` ` . We then add 1 to that because we only want the last word and not the last space included.

// Extracting the first word with indexOf, so that we don't have to hard code the parameters, because we may not always know the string we are extracting from.

console.log(airline.slice(-2)); // This will extract from the end of the string rather than the beginning
console.log(airline.slice(5, -5)); // This will slice from both the beginning and the end of the string

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === `B` || s === `C`) console.log(`You got the middles seat👎`);
  else console.log(`You got lucky 👍`);
};

checkMiddleSeat(`11C`);
checkMiddleSeat(`23C`);
checkMiddleSeat(`3E`);

console.log(new String(`Thomas`)); // This is how JS can use these methods on strings, by taking it out and placing it into an object which indexes the strings and when the method has finished, it places this result back into a string primitive. All string methods returned primitves.

console.log(typeof new String(`Thomas`).slice(1)); // This shows that it was placed back into a string primitive after finishing with the called method.
*/

/*
const question = new Map([
  [`question`, `What is the best programming language in the world?`],
  [1, `C`],
  [2, `Java`],
  [3, `Javascript`],
  [`correct`, 3],
  [true, `Correct 🥳`],
  [false, `Try again!`],
]);
// This creates a new map with an alterate method to the .set() method used previously. This instead lets you create an array, holding more arrays with the key, value pairs related to that map. In this case, it's a game related to questiopns.
console.log(question);

console.log(Object.entries(openingHours)); // The .entries() method returns a very similar looking structure as a map, it returns an array of arrays containing the key, value pairs relating to that object or map. Therefore, converting an object to a map or via versa is doable.

let hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get(`question`));

for (const [key, value] of question) {
  if (typeof key === `number`) {
    console.log(`Answer: ${key} ${value}`);
  }
} // This loops through the question map and checks if the data types for the key are a number, and if so it prints it to the console along with its value to retrieve the data.
const answer = 3; // Creates a variable called answer which stores a prompt in it which asks the user what their answer is.

console.log(
   The user input is what is inputted into this .get() method which returns the value of the key (number) that the user has inputted 
  question.get(
    question.get(`correct`) ===
      This expression evaluates to TRUE, ONLY IF the number 3 is inputted by the user  answer
  )
);

// Convert map to an array
console.log([...question]);
const newArr2 = [...question]; // Turning the question map into a newArr2 by using the spread operator and placing it into a new array
console.log(question.keys()); // keys method on the question map
console.log(question.values()); // values method on the question map
console.log(newArr2);
/////////////////////////////////////////
// MAPS: Fundamentals

const rest = new Map(); // Easiest way to create a map is to first create an empty map and then to fill the map up using the .set(`name`, `Classico Italiano` ) method, where you first pass in the key and then the value as arguments.
 rest.set(`name` , `Classico Italiano`);
// Maps can take any data type as a key, they don't stricly have to be strings
// rest.set(1, `Firenze, Italy`); // This maps Firenze, Italy to the key '1'
// console.log(rest.set(2, `Lisbon, Portugal`));

// rest
//   .set(`categories`, ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set(`open`, 11 )
//   .set(`close`, 23)
//   .set(true, `We are open :D`)
//   .set(false, `We are closed D:`);

// Calling the set method, returns that updated map. Therefore, we can chain the .set() method multiple times on the already updated and returned map.

// console.log(rest.get(`name`)); // The .get() method returns the value of the entered key. The expected ouput of this console.log(); is `Classico Italiano`
// console.log(rest.get(true));
// console.log(rest.get(1));

const time = 24;
// console.log(rest.get(time > rest.get(`open`) && time < rest.get(`close`))); // This asks within the .get() method whether or not the time variable is greater than the `open` key from the `rest` map AND less than the `close` key from within the `rest` map. Since the && operator returns a truthy or falsy, and a true and false key are both set within the .rest map, it returns the string allocted to that booleans map.

// console.log(rest.has(`categories`));
// The .has() method checks whether or not that map has a key with that name.
rest.delete(2); // This deletes a value from the map, which is done by passing in the key assigned to any which value.
// console.log(rest);
rest.set(1, `Utah`); // This re-assings the value of the `1` key to Utah
// console.log(rest);
// console.log(rest.size);
// console.log(clear); // Clears the map

const arr = [1, 2]; // Setting a variable to an arr of [1,2], and passing that into the set function, which therefore technically sets the key to this value as an array being held in the arr variable.
rest.set(arr, `Test`);
// rest.set([1, 2], `Test`); // Sets the key to an array of [1,2]
// console.log(rest.get([1, 2])); // Trying to access the key with this array, but since they are not in the same location within the heap, they are not the same object.
// console.log(rest.get(arr));

rest.set(document.querySelector(`h1`), `heading`); // This grabs the `h1` element from the page and sets the value to a heading within the map
// console.log(rest);

/////////////////////////////////////////
// SETS
//   // new Set () is the syntax to create a set.

// const ordersSet = new Set([
//   `Pasta`,
//   `Pizza`,
//   `Pizza`,
//   `Risotto`,
//   `Pasta`,
//   `Pizza`,
// ]);
// console.log(ordersSet);
// console.log(new Set());
// console.log(ordersSet.size);
// console.log(ordersSet.has(`Bread`)); // Checking if the set has a specific item
// console.log(ordersSet.has(`Pizza`)); // Checking if the set has a specific item
// ordersSet.add(`Garlic Bread`); // Adding items to a set
// ordersSet.add(`Garlic Bread`); // Adding items to a set
// ordersSet.delete(`Risotto`); // Deletes Risotto from the set
// ordersSet.clear(); // Clears the whole set.
// console.log(ordersSet);

// THERE IS NO WAY OF ACTUALLY RETRIEVING DATA FROM A SET, BECAUSE THERE IS NO INDEX OR DUPLICATES OR WAY OR ORDERING THE ITEMS WITHIN A SET. THE ONLY WAY OR KNOWING IF A SET CONTAINS ANY SPECIFIC ITEM IS WITH THE has() METHOD.
// for (const order of ordersSet) {
//   console.log(order);
// }

// Example real life
// const staff = [`Waiter`, `Chef`, `Waiter`, `Manager`, `Chef`, `Waiter`];

// const staffUnique = [...new Set(staff)];
// This creates an array from the new Set(staff) set by placing the new set in the array syntax and using the spread operator to unpack the items within the set.

// const staffUnique = new Set(staff);
// Creates a set based off of the staff array and only has the unique positions and no duplicates, since it's a set.
// console.log(staffUnique);
// console.log(new Set(staff).size);
// This checks the size of the set without even having to create an a unique array to find that out

// console.log(new Set(`Thomas`).size);
// Checks how many letters are within this string

//////////////////////////////////
// Property NAMES via the Object.keys function, passing in the openingHours object
// Creating a variable holding the keys or properties of the openingHours oject.
// const properties = Object.keys(openingHours);
// console.log(properties);

// let openStr = `We are open on ${properties.length} days: `;

// Looping through an object. (Technically looping through the keys of the object, which gives you the key names)
// for (const day of properties) {
//   openStr += `${day},`;
// }
// console.log(openStr);

// Property values
// const values = Object.values(openingHours);
// console.log(values);

// Entire object
// const entries = Object.entries(openingHours);
// console.log(entries);

// Destructured the open, close properties from each individual weekday from within the openingHours Object.entries() (which is the key, value pairs of whatever object is passed in)
// for (const [key, { open, close }] of entries) {
//   console.log(`On ${key} we open at ${open} and close at ${close}`);
// }

// if (restaurant.openingHours && restaurant.openingHours.mon)
// console.log(restaurant.openingHours.mon.open);

// Optional Chaining '?.' checks whether or not that property exists before attempting to access the next property or value and returns undefined if it doesn't exist
// If it's not null and not undefined, it exists.

// console.log(restaurant?.openingHours.mon?.open); // Asking if the mon property exists, before accessing the open property
// console.log(restaurant.openingHours.mon?.open);

// Real World example
// const days = [`mon`, `tues`, `wed`, `thurs`, `fri`, `sat`, `sun`];
// for (const day of days) {
// console.log(day);
// const open = restaurant.openingHours[day]?.open ?? `closed`;
// console.log(`On ${day}, we open at ${open}`);
// }

// Methods
// Checking if the method exists with the optional chaining, and then using the nullish coalescing to give a message if it doesn't exist
// console.log(restaurant.order?.(0, 1) ?? `Method does not exist`);

// Optional chaining Arrays
// const hello = 0;
// const users = [{ age: 25, name: `Thomas`, email: `hello@thomas.io` }];

// console.log(users[0]?.name ?? `User array empty`);

// The Nullish Coalescing operator and the optional chaining operator are meant to be used together. You use the optional chaining operator to check if a variable exists, and if not you use the nullish coalescing operator to give a default action or method if it doesn't exist.
// console.log(restaurant.orderRisotto?.(0, 1) ?? `Method does not exist`);

// const me = {
//   years: [1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000],
//   age: [30, 29, 28, 27, 26, 25, 24, 23, 22],
//   location: `Cedar City, Utah.`,
// };
// for (const year of me.years) {
//   console.log(
//     `I was born in ${year}, my age is, ${} at a hospital in ${me.location}`
//   );
// }

///////////////////////////////////////////////////
// FOR OF LOOP
// for (const item of menu) console.log(item);

// for (const [i, el] of menu.entries()) {
//   // console.log(`${i + 1}: ${el}`);
// }

// console.log([...menu.entries()]);

// const rest1 = {
//   name: `Capri`,
//   numGuests: 20,
// };
// const rest2 = {
//   name: `La Piazza`,
//   owner: `Giovanni Rossi`,
// };

// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// Nullish assignment operator (null or undefined )
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// AND assignment operator
// rest1.owner = rest1.owner && `<ANONYMOUS>`;
// rest2.owner = rest2.owner && `<ANONYMOUS>`;
// rest1.owner &&= `ANONYMOUS`;
// rest2.owner &&= `ANONYMOUS`;

// console.log(rest1, rest2);
/*
///////////////////////////////////////////////
// The Nullish Coalescing Operator

// Nullish Coalescing values : Null and/or Undefined
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

/////////////////////////////////
// Short-circuiting (&& and ||)
console.log(`--------OR--------`);
// Logical Operators can use ANY data type, they can return ANY data type, and they do short-circuit evaluation

console.log(3 || `Thomas`);
console.log(`` || `Thomas`);
console.log(true || 0);
console.log(undefined || 0 || `` || `Hello` || 23 || null);

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log(`-------AND-------`);
console.log(`` && `Thomas`);

console.log(`Hello` && 23 && null && `Thomas`);

// Practical example

if (restaurant.orderPizza) {
  restaurant.orderPizza(`mushrooms`, `spinach`);
}

restaurant.orderPizza && restaurant.orderPizza(`Mushrooms`, `Spinach`);


//////////////////////////////////////////////////////
// Rest pattern and Parameters
// 1) Destructuring

const arr1 = [7, 3, 7, 5, 7, 4, 1, 3, 41, 1, 7, 8];

const [t, y, c, ...others2] = arr1;
console.log(others2, t, y, c);

// 1) Destructuring

// Spread because the `...` is on the right side of the assignment operator
const arr = [1, 2, ...[3, 4]];

// REST. This is the rest operator because it's on the left side of the assignement operator
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , ristto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, ristto, otherFood);

// Objects

const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// 2) Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 3, 5, 6, 8, 3);

const x = [23, 5, 7];
add(...x);
restaurant.orderPizza(`mushrooms`, `onions`, `olives`, `spinach`);
restaurant.orderPizza(`mushrooms`);

//
//
//
//
//
//

///////////////////////////////////////////////////
// THE SPREAD OPERATOR (...)
// ES5 method for adding items from an array to another array.

const arr = [7, 8, 9];
const badNewArray = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArray);

// ES6 Spread operator

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, `Gnocci`];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// 2 arrays

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Iterables are arrays, strings, maps, sets but NOT objects
const str = `Thomas`;
const letters = [...str, ` `, `H.`];
console.log(letters);
console.log(...str);
console.log();

// Real world example
const ingredients = [
  // prompt(`Let's make pasta! Ingredient 1?`),
  // prompt(`Let's make pasta! Ingredient 2?`),
  // prompt(`Let's make pasta! Ingredient 3?`),
];
console.log(ingredients);

// restaurant.orderPasta(...ingredients);

// Objects

const newRestaraunt = { foundedIn: 1988, ...restaurant, founder: `Guiseppe` };
console.log(newRestaraunt);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = `Ristorante Roma`;
console.log(restaurantCopy.name, restaurant.name);


//////////////////////////////////////////////////
// Destructuring Objects 

restaurant.orderDelivery({
  time: `22 :30`,
  address: `Via del Sole, 21`,
  mainIndex: 2,
  starterIndex: 2,
});
restaurant.orderDelivery({
  address: `Via del Sole, 21`,
  starterIndex: 1,
});

// Destructuring Objects

const { name, openingHours, categories } = restaurant;

// console.log(name, openingHours, categories);

// Destructuring and renaming variable names of properties within an object.
const {
  name: restarauntName,
  openingHours: hours,
  categories: tags,
} = restaurant;
// console.log(restarauntName, hours, tags);

// Default values
// Setting default values of an empty array to the menu property as well as the starterMenu. It also renames the starterMenu property name value to just simply 'starters'.
const { menu = [], starterMenu: starters = [] } = restaurant;

// console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
// console.log(a, b);
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
// console.log(a, b);

// Nested Objects

// Destructuring the `openingHours` object, and then going further and destrucuting the `fri` object from within the `openingHours` object.
const {
  fri: { open: o, close: c },
} = openingHours;
// console.log(o, c);


/////////////////////////////////////////////////
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// Destructuring an array
const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(secondary, main);

// Switching variables

// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested Destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/
