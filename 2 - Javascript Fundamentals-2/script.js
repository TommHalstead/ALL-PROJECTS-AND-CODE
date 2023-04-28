'use strict';

/*

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log(`I can drive :D`);




function logger() {
  console.log(`My name is Thomas`);
}

// Calling / Running / Invoking the function

logger();

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);



const age1 = calcAge1(1997);


function calcAge1(birthYear) {
  return 2037 - birthYear;
}
// Function Declaration


const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
}
// Function Expression

const age2 = calcAge2(1997);

console.log(age1, age2);




// Arrow Function

const calcAge3 = birthYear => 2037 - birthYear;

const calcAgeResults = calcAge3(906);

console.log(calcAgeResults);


const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2023 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement} years.`
  // return retirement;
}

console.log(yearsUntilRetirement(1997, `Thomas Halstead`));
console.log(yearsUntilRetirement(1983, `Mia Roan`));



function cutFruitPieces(fruit) {
  return fruit * 3;
}


function fruitProcessor(apples, oranges) {

  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges.`;

  return juice;
}

console.log(fruitProcessor(2, 3));



const calcAge = function (birthYear) {
  return 2037 - birthYear;
}

const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;
  if (retirement > 0) {
    return retirem ent;
  } else {
    return -1;
  }
}

console.log(yearsUntilRetirement(1997, `Thomas`));
console.log(yearsUntilRetirement(1978, `Mike`));



const thomasArray = [
  `Thomas`,
  `Halstead`,
  2023 - 1997,
  `Programmer`,
  [`Michael`, `Peter`, `Steven`]
];




const thomas = {
  firstName: `Thomas`,
  lastName: `Halstead`,
  age: 2023 - 1997,
  job: `Programmer`,
  friends: [`Michael`, `Peter`, `Steven`]
};

console.log(thomas.lastName);
console.log(thomas[`lastName`]);

const nameKey = `Name`;

console.log(thomas[`first` + nameKey]);
console.log(thomas[`last` + nameKey]);

console.log(thomas.lastName);


const interestedIn = prompt(`What do you want to know about Thomas? Choose between firstName, lastName, age, job, and friends`); //This prompt acts as a placeholder for the actual key, which the user will input and then javascript will grab the corresponding value for the requested key.

if (thomas[interestedIn]) {
  console.log(thomas[interestedIn]);     // This says IF the expressed chosen property of interestedIn within the thomas object is there, return back the value.
} else {
  console.log(`Wrong request! Choose between firstName, lastName, age, job, and friends. `)
} // IF something was chosen that's NOT within the thomas object, return this string.

thomas.location = `USA`;
thomas[`twitter`] = `@tomhalstead`;
console.log(thomas);

// Challenge
// Thomas has 3 friends, and his best friend is called `Michael`

console.log(`${thomas.firstName} has ${thomas.friends.length} friends, and his best friends name is ${thomas.friends[0]}.`);



const thomas = {
  firstName: `Thomas`,
  lastName: `Halstead`,
  birthYear: 1997,
  job: `Programmer`,
  friends: [`Michael`, `Peter`, `Steven`],
  hasDriversLicense: true,

  // calcAge: function (birthYear) {
  //   return 2023 - birthYear;
  // }

  // calcAge: function () {
  //   // console.log(this);
  //   return 2023 - this.birthYear;
  // }

  calcAge: function () {
    this.age = 2023 - this.birthYear;
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${thomas.age} year old ${thomas.job}, and he has ${this.hasDriversLicense ? `a` : `no`} driver's license.`
  }


};

console.log(thomas.calcAge());
console.log(thomas.getSummary());

console.log(thomas.age);
console.log(thomas.age);
console.log(thomas.age);




// console.log(thomas[`calcAge`](1997));




// console.log(`Lifting weights repetition 1 🏋️‍♂️!`);


//For loop keeps running while condition is TRUE.

for (let rep = 1; rep <= 100; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♂️!`);
}



const thomas = [
  `Thomas`,
  `Halstead`,
  2023 - 1997,
  `Programmer`,
  [`Michael`, `Peter`, `Steven`],
  true
];

const types = [];

for (let i = 0; i < thomas.length; i++) {
  // Reading from thomas array
  console.log(thomas[i], typeof thomas[i]);



  types[i] = typeof thomas[i]; // Types [i] at counter position thomas[i], should be stored into the types array. This will store the typeof for each value within the array into a the types array.


  types.push(typeof thomas[i]); // Adding all of the 'typeofs' for all the elements within the thomas array to the types array itself.
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2023 - years[i]);
}
//This for() loop pushes the result of the expression calculated on the items within the years array, to the ages array.
// console.log(ages)

//Continue and Break

console.log(`-----ONLY STRINGS-----`);

for (let i = 0; i < thomas.length; i++) {
  if (typeof thomas[i] !== `string`) continue;
  console.log(thomas[i], typeof thomas[i]);
} //IF the typeof 'thomas' at current iteration [i] IS NOT a string, then continue past that item. This will exit the current iteration and start the next immediately.

console.log(`------ BREAK WITH NUMBERS -----`);
for (let i = 0; i < thomas.length; i++) {
  if (typeof thomas[i] === `number`) break;
  console.log(thomas[i], typeof thomas[i]);
}



const thomas = [
  `Thomas`,
  `Halstead`,
  2023 - 1997,
  `Programmer`,
  [`Michael`, `Peter`, `Steven`]
];
for (let i = thomas.length - 1; i >= 0; i--) {
  console.log(i, thomas[i]);
} // This is a for() loop that will loop through the array backwards. It's initialized at thomas.length - 1; because the array has 5 items in it, but since arrays are 0 based, technically there are 4 items within this array. So it's technically 5 items - 1 since in reality, starting at 1 there is only 4 items listed in this array. The conditional says to run this loop all the way until >= 0, and then decrement.


for (let exercise = 1; exercise <= 3; exercise++) {
  console.log(`------- Starting Exercise ${exercise} -------`);


  for (let rep = 1; rep <= 5; rep++) {
    console.log(`Exercise ${exercise} Lifting weights rep etiition ${rep}.`)
  }
}



for (let rep = 1; rep <= 10; rep++) {
  console.log(`FOR: Lifting weights rep etiition ${rep}.`)
}



let rep = 1;
while (rep <= 10) {
  // console.log(`WHILE: Lifting weights repetiition ${rep}.`);
  rep++;
}



let dice = Math.trunc(Math.random() * 6) + 1;


while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log(`You rolled a 6, loop has ended.`);
}

*/