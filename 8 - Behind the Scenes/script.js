'use strict';
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW varibale with same name as outer scope's variable
      const firstName = 'Steven';

      // Reassigning outer scope's variable
      output = `NEW OUTPUT!`;

      const str = `Oh, and you're a millenial,${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }

    // console.log(str);
    console.log(millenial);
    // console.log(add(2, 3));
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = 'Thomas';
calcAge(1991);



// Variable hoisting
// console.log(me);
// console.log(job);
// console.log(year);

// var me = `Thomas`;
// let job = `teacher`;
// const year = 1991;

// Functions

// console.log(addDecl(1, 2));
// console.log(addExpr(1, 2));
// console.log(addArrow(1, 2));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Example
console.log(undefined);
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log(`All products deleted!`);
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);



// console.log(this);

const calcAge = function (birthYear) {
  // console.log(2037 - birthYear);
  // console.log(this);
};

calcAge(1991);

const calcAgeArrow = birthYear => {
  // console.log(2037 - birthYear);
  // console.log(this);
};

calcAgeArrow(1980);

const thomas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
thomas.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = thomas.calcAge;
matilda.calcAge();

const f = thomas.calcAge;
f();


// var firstName = `Matilda`;

const thomas = {
  firstName: `Thomas`,
  year: 1991,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    // Solution 1 to the .this keyword not working on a function inside a method

    // const self = this; // self or that
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    //   // console.log(this.year >= 1981 && this.year <= 1996);
    // };

    // Solution 2
    // USE AN ARROW FUNCTION BECAUSE AN ARROW FUNCTION INHERITS ITS PARENTS .this FROM ITS PARENTS SCOPE
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};
thomas.greet();
thomas.calcAge();

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8);


let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me = {
  name: `Thomas`,
  age: 30,
};

const friend = me;
friend.age = 27;
console.log(`Friend:`, friend);
console.log(`Me:`, me);
*/

// Primitive types
let lastName = `Williams`;
let oldLastName = lastName;
lastName = `Davis`;
console.log(lastName, oldLastName);

// Reference types
const jessica = {
  firstName: `Jessica`,
  lastName: `Williams`,
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = `Davis`;
// console.log(`Before Marriage:`, jessica);
// console.log(`After Marriage:`, marriedJessica);

// marriedJessica = {}; ------ Not allowed with a Const variable

// Copying Objects

const jessica2 = {
  firstName: `Jessica`,
  lastName: `Williams`,
  age: 27,
  family: [`Alice`, `Bob`],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = `Davis`;

jessicaCopy.family.push(`Mary`);
jessicaCopy.family.push(`John`);

console.log(`Before Marriage:`, jessica2);
console.log(`After Marriage:`, jessicaCopy);
