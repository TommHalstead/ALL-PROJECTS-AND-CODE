/*let js = 'amazing';
let firstName = 'Matilda';
console.log(40 + 8 + 23 - 10);

console.log(23);
console.log(firstName);
console.log(firstName);
console.log(firstName);

let myCurrentJob = 'Mechanical Installer';
let myNextJob = 'Programmer';

console.log(myCurrentJob);
console.log(myNextJob);

let child;
let javascriptIsFun = true;
console.log(javascriptIsFun);

// console.log(typeof true);
console.log(typeof javascriptIsFun);
// console.log(typeof 1234);
// console.log(typeof 'Tommy');

javascriptIsFun = 'YES!';
console.log(typeof javascriptIsFun);

console.log(child);
console.log(typeof child);

// child = 'boy';
// console.log(typeof child);

console.log(typeof null);


let age = 30;
age = 31;

// const birthYear = 1997;
birthYear = 1996;

var job = 'programmer';
job = 'teacher';

let firstName = 'Thomas';
let lastName = 'Halstead';

//Math operators
const now = 2037;
const ageThomas = now - 1991;
const ageSarah = now - 2018;

// console.log(lastName);
// console.log(firstName, lastName);
console.log(ageThomas, ageSarah, firstName, lastName);

console.log(ageThomas * 2,
    ageThomas / 10, 2 ** 3) // 2 ** 3 means 2 to the power of 3, which is 2 * 2 * 2

console.log(firstName + ' ' + lastName)

//Assignment operators
let x = 10 + 5; //15
x += 10; //15 + 10 = 25 or x = x + 10;
x *= 4;  // x = x * 4; or 25 * 4 = 100;
x++; //+1
x--;
x--; //-1
console.log(x);

//Comparison operators
console.log(ageThomas > ageSarah);
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);


const now = 2037;
const ageThomas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10, y = 10, x = 10;
console.log(x, y);

const averageAge = (ageThomas + ageSarah) / 2;
console.log(ageThomas, ageSarah);
console.log(averageAge)

const firstName = 'Thomas';
const job = 'Mechanical Installer';
const birthYear = 1997;
const year = 2023;

const thomasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;

console.log(thomasNew);

console.log(`Just a regular String!`)

console.log(`String with \n\
Multiple \n\
lines`);

console.log(`String
multiple
lines`);


const age = 17;
const yearsLeft = 18 - age;

if (age >= 18) {
    console.log(`Sarah can start driving license training! 🚘`)
} else {
    console.log(`Sorry, you must wait ${yearsLeft} year(s) to start drivers license training! 🥺`)
}

const birthYear = 2001;

let century;
if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}

console.log(century);

// TYPE CONVERSION
const inputYear = '1991';
console.log(Number(inputYear) + 18);
console.log(inputYear);

console.log(String(23), 23);

//TYPE COERCION

console.log(`I am ` + 23 + ` years old`);
console.log(`23` - `10` - 3);
console.log(`23` * `2`);
console.log(`23` / `2`);

let n = `1` + 1; //11
n = n - 1;
console.log(n);

// 5 Falsy values: 0, ``, undefined, null, NaN

console.log(Boolean(0));
console.log(Boolean(''));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean(NaN));
console.log(Boolean({}));

const money = 1;

if (money) {
    console.log(`Don't spend it all! :)`)
} else {
    console.log(`You should get a job!`)
}

let height = 0;
if (height) {
    console.log(`YAY! Height is defined`)
} else {
    console.log(`Height is UNDEFINED`)
}

const age = 18;

if (age === 18) console.log(`You just became an adult!:D (strict)`);

if (age == 18) console.log(`You just became an adult!:D (loose)`);

const favorite = Number(prompt(`What's your favorite number?`));
// alert(`Are you sure?`);
// prompt(`Verify that you're sure by typing 'Y' or 'YES'`);
// console.log(favorite);
// console.log(typeof favorite);

if (favorite === 23) {
    console.log(`Cool! 23 is an amazing number!`)
} else if (favorite === 7) {
    console.log(`7 is also a cool number!`)
} else if (favorite === 9) {
    console.log(`9 is a cool number!`)
} else {
    console.log(`The number isn't 23 or 7 or 9, therefore it isn't cool!`)
}



if (favorite !== 23) {
    console.log(`Why not 23?`)
}

const age = 16;
const hasDriversLicennse = true; // A
const hasGoodVision = true; // B

// console.log(hasDriversLicennse || hasGoodVision);
// console.log(hasDriversLicennse && hasGoodVision);
// console.log(!hasDriversLicennse);

// if (hasDriversLicennse && hasGoodVision) {
//     console.log(`Sarah is able to drive!`)
// } else {
//     console.log(`Someone else should drive!`)
// }

const isTired = false; // C

console.log(hasDriversLicennse && hasGoodVision && isTired);

if (hasDriversLicennse && hasGoodVision && !isTired) {
    console.log(`Sarah is able to drive!`)
} else {
    console.log(`Someone else should drive!`)
}

const day = `Thursday`;

switch (day) {
    case `Monday`:
        console.log(`Plan course structure`);
        console.log(`Go to coding meetup`);
        break;
    case `Tuesday`:
        console.log(`Prepare theory videos`);
        break;
    case `Wednesday`:
    case `Thursday`:
        console.log(`Write code examples`);
        break;
    case `Friday`:
        console.log(`Record Videos`);
        break;
    case `Saturday`:
    case `Sunday`:
        console.log(`Enjoy the weekend! :D`)
        break;
    default:
        console.log(`Not a valid day!`);
}

const day = `Friday`;

if (day === `Monday`) {
    console.log(`Plan course structure`);
    console.log(`Go to coding meetup`);
} else if (day === `Tuesday`) {
    console.log(`Prepare theory videos`);
} else if (day === `Wednesday` || day === `Thursday`) {
    console.log(`Write code examples`);
} else if (day === `Friday`) {
    console.log(`Record Videos`);
} else if (day === `Saturday` || day === `Sunday`) {
    console.log(`Enjoy the weekend! :D`)
} else {
    console.log(`Not a valid day`);
}

const age = 18; //Condition
// age >= 18 ? console.log(`I like to drink wine🍷`) : console.log(`I like to drink water! 💧`); / / ELSE STATEMENT

const drink = age >= 18 ? `Wine! 🍷` : `Water! 💧`;
// console.log(`Hello, I like to drink ${drink}`)

let drink2;

if (age >= 18) {
    drink2 = `Wine! 🍷`
} else {
    drink2 = `Water! 💧`
}
// console.log(drink2);

console.log(`I like to drink ${age >= 18 ? `Wine! 🍷` : `Water! 💧`}`)


*/



