'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
// Creating an object with account or specific data, and then placing these accounts in an array. This is one of the most common ways of organizing data within javascript applications

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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////////////////////////////
// InsertAdjacentHTML method inserts HTML written code syntax and all into the page within a string. It accepts two parameters: 1. being the positioning which are `beforebegin`, `afterbegin`, `beforeend`, `afterend`. The second parameter is the actual code you would like to insert. You call this method on the containing element you would like to insert the text on.

// It's not best practice to create an app in the global context, in this first step we will be using a forEach() loop to loop through the movements array and using DOM manipulation in order to display each of the looped iterations on the webpage

// Instead of working with global variables, start getting in the practice of passing creating functions and passing in the needed data, that functions requires to operate.

const displayMovements = function (movements, sort = false) {
  // Here we add the sort = false as a default parameter to this function, we then below create a movs variable which says, if sort is true, then create a shallow copy of the movements array and sort it in a descending order, if not then pass in the original movements array
  containerMovements.innerHTML = ``; // The innerHTML property gets or sets the HTML markup contained within the element, therefore by just replacing the innerHTML with an empty string, it erases the content which was in there beforehand.
  // The textContent property is similar to this property, the difference is that the innerHTML includes all of the HTML syntax markup that's included within the HTML.

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? `deposit` : `withdrawal`; // We use the ternary operator to check if the type of movement is a deposit or a withdrawal

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div> 
         <div class="movements__value">${mov}€</div>
      </div>
    )`;
    // We use the same ternary operator created above to dynamically change the class based on whether or not the movement type is a deposit or a withdrawal

    //With this here, we use the forEach() to go through each array element and create a new element on the page for each value without having to manually hardcode all of this

    containerMovements.insertAdjacentHTML(`afterbegin`, html);
    // The insertAdjacentHTML() method, inserts text into a wepage or div container, the two string parameters are the location of where you are placing the item and the actual HTML that you would like to be placed
  });
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(
    (accum, curVal) => accum + curVal,
    0
  );
  labelBalance.textContent = `${account.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0); // This creates an array called interest, and then applies the filter() method on it in order to filter out all negative numbers. We then call the .map() method in order to map all of these array elements to a new array with the interest applied to each.

  labelSumInterest.textContent = `${interest}€`;
};
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(` `)
      .map(name => name[0])
      .join(``);
  });
};
createUsernames(accounts);

const updateUI = function (curAcc) {
  // Display Movements
  displayMovements(curAcc.movements),
    // Display Balance
    calcDisplayBalance(curAcc),
    // Display Summary
    calcDisplaySummary(curAcc);
};
// Event Handlers for login
let currentAccount;

btnLogin.addEventListener(`click`, function (e) {
  e.preventDefault(); // The default method for login forms when pressing the form button is to `sumbit` the results, so this must be changed. This is done with the .preventDefault() method. Hitting enter in the text field, will also log a click event.

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  ); // IF A WRONG USERNAME IS ENTERED, THE FIND METHOD RETURNS UNDEFINED BECAUSE IT CAN'T FIND ANYTHING TO MATCH
  console.log(currentAccount); // This checks to see that the variable containing the login fields value entered by the user matches one of the values from within the accounts array of objects

  // We use optional chaining here to verify that first the account exists before moving on
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(` `)[0]
    }`;
    containerApp.style.opacity = 100; // This changes the opacity of the webpage once the login form is clicked in order to show the page fully with no opacity.

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ``; // This will clear the input field by entering it with an empty string once the user clicks login or hits enter
    inputLoginPin.blur(); // This method makes it so that once the user hits enter or clicks login, the inputLoginPin will lose its focus.

    // UPDATE UI
    updateUI(currentAccount);
  }
});
// inputLoanAmount.value
btnLoan.addEventListener(`click`, function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // We use the .some() method to test for the currentAccount having a deposit that contains at least 10% of the requested amount
    // Add the movement
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
  inputLoanAmount.value = ``;
});
// indexOf(23) will return the indexOF a sinlge value, and no conditions may be applied1

// The findIndex(curAcc => currAcc.name === inputField.value) method is close to the find() method, except it returns the index of the found index and not the element itself

btnClose.addEventListener(`click`, function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    ); // This .findIndex() method takes a callback function as a param, similar to other array methods. Right here we use the `acc` param to act as the whole accounts array, then we return the account with the username equal to the currentAccount username at that index. This method() will return the index at which we can find the specified parameters
    accounts.splice(index, 1); // This right here will grab the accounts array ob the accounts objects and from the index, it will splice at the index, and remove one element.  There's no need to save the result of this operation to a variable, because the original underlying array will be mutated from the .splice() method.

    // HIDE ACCOUNT
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = ``;
  labelWelcome.textContent = `Log in to get started`;
});

let sorted = false;
btnSort.addEventListener(`click`, function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

btnTransfer.addEventListener(`click`, function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value); // This creates a variable `amount` and stores the inputted value to it.
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value // This finds the account matching the inputted username into the field and stores it in this variable
  );

  inputTransferAmount.value = inputTransferTo.value = ``;

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // UPDATE UI
    updateUI(currentAccount);
  }
}); // This if() block right here checks first if the amount trying that is being transferred is first: greater than 0, second: receiverAcc exists, third: that the current user has equal to or more than the transfer amount and, fourth: that the recieverAcc is not the currentAccount.

// We then .push() the negative amount transferred to the currentAccount balance. After that, we push the positive transfer amount to the receiverAcc.

// inputLoginUsername.addEventListener();
// inputLoginPin.addEventListener();
// Within this, we are creating side effects to the accs directly, there is no need to return anything

// We nest these functions or make callback functions like this, in this particular case because we don't want to use variables of these arrays created in the global context, instead we want to be able to pass in the whole array and work with the data from the whole array, and then be able to pass in any array and compute it in the same way

// The forEach() within a parent function, which receives a whole array as a parameter, allows us to pass in each individual value from within the array to the a forEach() array in order to compute what needs to be computed.

// The split method will divide a string by the given parameter, and place each substring into an array seperated, in this case it's the space.

// You can chain the .map method just like any other method. Therefore the result of this username variable is an array

// console.log(containerMovements.innerHTML); // This shows ALL of the HTML markup and everything
// console.log(containerMovements.textContent); // Whereas this solely shows the actual TEXT CONTENT of the html document

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*

let arr = [`a`, `b`, `c`, `d`, `e`];

// Slice Array method
console.log(arr.slice(2)); // This will slice the array from the 2nd index and return a new array with everything after and including 2
console.log(arr.slice(2, 4)); // This will slice the array and return everything from 2-3

console.log(arr.slice(-1)); // This will give you the last element of any array

console.log(arr.slice(1, -2)); // This will extract everything starting at positing one, to the last two elements within the array

console.log(arr.slice()); // This will give you a shallow copy of any array

console.log([...arr]); // This does the same thing as the .slice() method, its up to personal preference which you use

// SPLICE

// console.log(arr.splice(2)); // This will grab the first two elements and return a new array, it also deletes those two elements from the first array
console.log(arr);

// Typically in practice, the slice() method is used to delete 1 or more elements from an array. This deletes the last element from the array
console.log(arr.splice(-1));
console.log(arr);
arr.splice(1, 4); // This will delete elements 1 - 4 from the array. The first parameter tells where to start, and the second parameter tells how many elements to delete
console.log(arr);

///////////////////////////////////
// REVERSE

arr = [`a`, `b`, `c`, `d`, `e`];
const arr2 = [`j`, `i`, `h`, `g`, `f`];
console.log(arr);
console.log(arr2.reverse()); // This will reverse an array. It mutates the orignal array. So it changes the original array.

// CONCAT

const letters = arr.concat(arr2);
console.log(letters);
console.log(...arr, ...arr2); // This will give you both of these arrays unpacked as a string
console.log([...arr, ...arr2]); // This will give you both of these strings combined in an array and it does not mutate either of the involved arrays

// JOIN

console.log(letters.join(` - `)); // This joins both of these arrays with the specified parameter

// OTHER ARRAY METHODS WE'VE LEARNED
// PUSH() - Adds an element to the end of an array
// UNSHIFT() - Adds one or more elements to the beginning of an array
// POP() - Removes the last element from an array and returns that element
// SHIFT() - Removes the first element from an array and returns that first element
// INDEXOF() - This gives you the given index of any array element. From the above letters array, indexOf(`c`) would return 2.
// INCLUDES() - This is how you check if an array has any specific value or string and returns a boolean

*/

/*

const arr = [23, 11, 64];
console.log(arr[0]); // This grabs the first element from an array
console.log(arr.at(0)); // This also grabs the first element within an array. USE PREFERRED METHOD

// Getting the last element from an array

console.log(arr.at(arr.length - 1));
console.log(arr.slice(-1)[0]); // This will give you the last item from the array in an array still. The square bracket notation will allow you take the element out of the array of which it is in
console.log(arr.at(-2)); // This will give you the number at the specified index

console.log(`Thomas`.at(0)); // The .at() method also works on strings

 */

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// In order to loop an array, you must use the .entries() method in order to get the key, value pairs of the array
for (const [index, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`You deposited ${movement} at index ${index + 1}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)} at index ${index + 1}`);
  }
} // The .abs() Math object method, allows you to give just the absoulte value without any dollar signs or negative signs surrounding the answer

// FOR EACH! The for each array method, takes a callback method as its parameter

// The for loop will loop over the array and execute the callback function after every iteration

// As the forEach() method calls this callback function in each iteration, it will pass in each element of the array as an argument

console.log(`ForEach! -------------------------------------`);

movements.forEach(function (mov, i, arr) {
  // Parameters: Current value, iteration, whole array
  if (mov > 0) {
    console.log(`You deposited ${mov} at index ${i + 1}`);
  } else {
    console.log(`You withdrew ${Math.abs(mov)} at index ${i + 1}`);
  }
});

// One fundamental difference from the forOf and the forEach is that you cannot break the forEach loop, as it will always loop over the entire array and you cannot `break;` on `coninute;` it.

//So if you need to break out of a loop, you need to use the forOf loop.

// When looping, the forEach() array passes in, the current value at the iteration, the index and the entire array itself, therefore they can be specified in the parameter list
// You must pass in these parameters in this order: Element, index, enire array you are looping over

*/

/*

// forEach() function with maps and sets

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
// Within this map that contains an array of arrays, the first value or entry is the key and the second is the value. Each array is one entry of the map

console.log(currencies.entries());

currencies.forEach(function (curVal, key, entMap) {
  console.log(`${key}: ${curVal}`);
});
// Therefore looping over a map is similar to looping over an array in the way that you specify the parameters in the same order and create the actual forEach() loop in the same way.

const currenciesUnique = new Set([`USD`, `GBP`, `USD`, `EUR`]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (curVal, _, map) {
  console.log(`${curVal}: ${curVal}`);
});
// Sets do not have keys, nor do they have index's. So no value would make sense for the key parameter. In order to get around this, you can just simply set the second parameter the same as the first one, which would be the curVal. Although you cannot have a duplicate parameter name, so therefore you can use the `_` which is JS is designated as a throw away variable.

*/

/* 

//-------------------- CODING CHALLENGES --------------------

const checkDogs = function (dogsJulia, dogsKate) {
  const juliaCopy = [...dogsJulia].slice(1, -2);
  const dogsBoth = juliaCopy.concat(dogsKate);
  dogsBoth.forEach(function (curDog, iteration) {
    const puppyOrDog =
      curDog >= 3
        ? `is an adult, and is ${curDog} years old 🐕‍🦺`
        : `is still a puppy 🐶`;
    console.log(`Dog number ${iteration + 1} ${puppyOrDog}`);
  });
};

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1,15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

checkDogs(dogsJulia, dogsKate);

// --------------------CODING CHALLENGE #2--------------------

const dogAges = [5, 2, 4, 1, 15, 8, 3];
const dogAges1 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (dogsAges) {
  const humanAge = dogsAges.map(curAge =>
    curAge <= 2 ? curAge * 2 : curAge * 4 + 16
  );
  // console.log(`Human ages of dogs :`, humanAge);

  const adultDogAges = humanAge.filter(ages => ages >= 18);
  // console.log(`Ages of all dogs > 18:`, adultDogAges);

  const humanAgeAverage = adultDogAges.reduce(
    (acc, curAge) => acc + curAge / adultDogAges.length,
    0
  );
  return humanAgeAverage;
  // console.log(`Human age average of all dogs:`, humanAgeAverage);
};
const humanAgeAverage = calcAverageHumanAge(dogAges);
const humanAgeAverage1 = calcAverageHumanAge(dogAges1);

console.log(humanAgeAverage);
console.log(humanAgeAverage1);


// --------------------CODING CHALLENGE #3--------------------

const calcAverageHumanAge = dogsAges =>
  dogsAges
    .map(curAge => (curAge <= 2 ? curAge * 2 : curAge * 4 + 16))
    .filter(ages => ages >= 18)
    .reduce((acc, curAge, i, arr) => acc + curAge / arr.length, 0);
const avg = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg1 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg, avg1);
// FIND AVERAGE OF (2,3) 2 + 3 / 2 = 2.5 || 2/2 + 3/2 = 2.5

*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

const foodPortion = function (arr) {
  arr.forEach(dog => {
    dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
    return console.log(
      `The recommended food portion for dog ${dog.owners.join(
        ` and `
      )}'s dog is: ${dog.recommendedFood} grams`
    );
  });
};
foodPortion(dogs);

const owners = dogs.flatMap(dog => dog.owners.flat());
console.log(owners);
const sarahsDog = dogs.find(dog => dog.owners.includes(`Sarah`));
console.log(sarahsDog); // We can use the .find method on arrays inside of objects and it will still search through the nested array, we can use the .includes method from within the .find method.

const ownerLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownerLittle);

const ownerMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownerMuch);

const eatsTooMuchOrLittle = dog => {
  dog.forEach(dog => {
    dog.curFood < dog.recommendedFood
      ? console.log(
          `${dog.owners.join(` and `)}'s dog eats too little food with ${
            dog.curFood
          } grams for a dog that weighs ${
            dog.weight
          } kg and a recommended food intake of ${dog.recommendedFood} grams`
        )
      : console.log(
          `${dog.owners.join(` and `)}'s dog eats too much food with ${
            dog.curFood
          } grams for a dog that weighs ${
            dog.weight
          } kg and a recommended food intake of ${dog.recommendedFood} grams`
        );
  });
};
eatsTooMuchOrLittle(dogs);
console.log(dogs.some(dogArr => dogArr.recommendedFood === dogArr.curFood));

const checkEatingOkay = dog =>
  dog.curFood <= dog.recommendedFood * 1.1 &&
  dog.curFood >= dog.recommendedFood * 0.9;

console.log(dogs.some(checkEatingOkay));

const okayFood = dogs.filter(checkEatingOkay).map(dog => dog);
console.log(okayFood);

const dogsCopy = [...dogs].sort((dog1, dog2) => {
  if (dog1.recommendedFood < dog2.recommendedFood) {
    return -1;
  } else if (dog1.recommendedFood > dog2.recommendedFood) {
    return 1;
  }
});
console.log(dogsCopy);

/*

// Excercise #1

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((preVal, curVal) => preVal + curVal, 0); // This first flattens these arrays into one array, and second maps them all to one single array with the .flatMap() method. We then call the .reduce() method in order to reduce all of the movements into one single sum.

console.log(bankDepositSum);

// Excercise #2

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, curVal) => (curVal >= 1000 ? ++count : count), 0);
console.log(numDeposits1000); // This reduce method uses the first accumalator argument as a counter for elements > 1000. It then says, IF the current value is greater than 1000, add 1 to the count and return it. IF the current value isn't > 1000, just return the count as it is.

let a = 10;
console.log(++a); // The a++ returns the same old value, it only increases it in the next iteration. Or the next use of the variable. BUT if we use the PREFIX operator, it will ++ the value right then and there and return the updated value.

// Excercise #3

// Create an object containing the sums of the deposits AND withdrawls of the account movements

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, curVal) => {
      // curVal > 0 ? (sums.deposits += curVal) : (sums.withdrawals += curVal);
      sums[curVal > 0 ? `deposits` : `withdrawals`] += curVal; // Bracket notation, allows you to use an expression directly inside of the brackets, therefore dynamically selectiing the option based on the results of that evaluation inside of the brackets, and this will dynamically select the property.
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  ); // Here we specify an object with a deposits: 0 and withdrawals: 0 properties in order to send the return results to this object
console.log(deposits, withdrawals);

// Excercise #4
// this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = [`a`, `and`, `an`, `the`, `but`, `or`, `on`, `in`, `with`]; // Common technique of creating an array of exceptions to use later on

  const titleCase = title
    .toLowerCase()
    .split(` `)
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(` `);
  return capitalize(titleCase);
}; // This function creates a variable `titleCase` and first makes everything lowercase, we then split it by the spaces within the string and map the word at position 0 to a new array and make it uppercase, we then finally add the sliced word without the first letter back to the capitalized letter.

console.log(convertTitleCase(`this is a nice title`));
console.log(convertTitleCase(`this is a LONG title but not too long`));
console.log(convertTitleCase(`and here is another title with an EXAMPLE`));


*/
/* 

///////////////////////////////////////
// ARRAY DATA TRANSFORMATIONS

// Methods used to create new arrays based on transforming data from other arrays

// MAP - Takes an array and loops over it and in each iteration, applies a callback function that we specify in our code to that current iteration

// Creates a new array with whatever transformation you would like done to the original array

// It maps values of the original array to a new array. EXTREMELY USEFUL

// FILTER - Filter elements in an array that satisfy a certain condition, and get passed into a new array.

// Elements in which the condition is true, will be passed to a new array, all elements that do not meet the specifications are filtered out

// REDUCE - The reduce method reduces all the values or elements in an array together.

// Known as the snowball effect because as the reduce() the array, the value or accumalator variable gets bigger, which in turn reduces the original array to one single value. This value, is returned as a single value and not an array.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUSD = movements.map(mov => Math.trunc(mov * eurToUsd));

// This is more in line with functional programming because we use a function to solve the problem of creating a new array whereas with a for loop we loop over the array and manually create a new array

// With this map method here, the parameters are the same as the forEach() method. The first parameter is the current value at that iteration, the second param is the current iteration itself and the third param is the wholr array itself

// This specific function, creates a variable called movementsUSD and stores a map method within it that has a callback function which multiplies the current iteration value and multiplies it by the eurToUsd variable, the map then returns an array with the completed calculations

console.log(movements);
console.log(movementsUSD);

// const movementsUSDFor = [];
// for (const mov of movements) {
//   movementsUSDFor.push(mov * eurToUsd);
// }
// console.log(movementsUSDFor);

const movementsDescriptions = movements.map((mov, i) =>
  mov > 0
    ? `You deposited ${mov} at index ${i + 1}`
    : `You withdrew ${Math.abs(mov)} at index ${i + 1}`
);
// This map method takes the movements array and uses a callback function in order to apply these statements onto each item within the array and returns a new array with the computed results

// Before with the forEach() loop, we printed each individual item to the console as we looped over the array. This is called a side-effect

// Here with the map method, all we did is return each of the strings with the callback. So with this, we did not create side effects, all we did was build a new array

console.log(movementsDescriptions);

*/

/*


///////////////////////////////////////
// REDUCE METHOD

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
}); // This filter method is used in combination with a callback function in order to meet some specifications in order to be filtered into a new array. In this instance, any movement greater thatn 0 is pushed into the movements array

console.log(movements);
console.log(deposits);
const depositsFor = [];
for (const mov of movements)
  if (mov > 0) {
    depositsFor.push(mov);
  }
console.log(depositsFor);

const withdrawalsFor = movements.filter(mov => mov < 0);

console.log(withdrawalsFor);

*/

/*

////////////////////////////////////////////////
// REDUCE - We use the reduce method in order to boil down all the elements within an array, to a single value

// With the reduce method, the params are as follows: (accumalator, currentEl, iteration, wholeArr)

// An accumalator acts as a snowball in this case, as to where it will accumalate as the reduce method goes down the array.

// The reduce method will loop over the array and call the callback at each iteration, therefore applying whatever rules we have stated to the given array or value.

const accumalated = movements.reduce((acc, currEl) => acc + currEl, 0); // The second param is the starting value of the accumalor variable.
// The reduce method has a built-in accumalator method, therefore you do not need to create a global variable or external variable to hold this value.

// This .reduce() method takes the accumalator variable at every iteration and adds the currEl value to it, it then returns the sum of the whole array reduced.

// Every iteration returns the value of the acc + currEl, and stores it in the accumated variable, so the next iteration can also be added to the accumalator variable.

console.log(accumalated);
let accumalator = 0;
for (const mov of movements) {
  accumalator += mov;
}
console.log(accumalator);

// Maximum value of movements array using the .reduce() method

const curMax = movements.reduce(
  (acc, currEl) => (currEl > acc ? (acc = currEl) : (acc = acc)),
  200
);
console.log(curMax);

// The reduce method is by far the most useful array method!


// When dealing with methods on arrays, or strings, or just methods at all. The order of operations works from right to left after the assignment operator, but assings to the left.

const eurToUsd = 1.1;

// This action below, takes the movements array and applies the filter() method to it in order to filter out any movements not greater than 0. Then we use the .map() method in order to multiply each movement by out eurToUsd variable which holds a conversion value of 1.1. Then we call the .reduce() method on this operation in order to add all of the elements together.

// We can chain methods, as long as the method before returns a usable data type. Since all of these methods return arrays, we can chain them back to back.

// PIPELINE OR METHOD CHAINING

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // .map((mov, i, arr) => {
  //   console.log(arr); // Great use case of the arr param, when chaining methods and you need to check the array before this map method has returned you can place a console.log() before the return in order to view the array before it has been computed by this method
  //   return mov * eurToUsd;
  // })
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/

/*

/////////////////////////////////////////

// FIND method .find()

// The find method will loop over an array and find an element that meets whatever specified conditions. It accepts a callback function as most of the array methods do and the conditional statement of the .find() method must be a boolean

// The .find() method does not return an array, but rather the first value that satisfies this condition

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === `Jessica Davis`);
console.log(account);
// Here we use the find method on this array of objects and we search the accounts for the one with the owner of `Jessica Davis`. When using the find() method, it's best to make the condition only matching one specific object or element, so you don't grab the wrong element

for (const acc of accounts) {
  if (acc.owner === `Jessica Davis`) {
    console.log(acc);
  }
}

*/

///////////////////////////////////////////
// .some() and .every() array methods, both return booleans.

/*


console.log(movements);

// EQUALITY
console.log(movements.includes(-130)); // The includes method, accepts a value or string as a param and returns a boolean if that value or string is included within the array. This is esentially testing for equality

// SOME CONDITION
console.log(movements.some(mov => mov === -130)); // This does the same as the .includes() method, only we used a condition in order to return a boolean
const deposit = mov => mov > 0; // We can now use this function for any calculation that needs this, to honor the DRY method.

const anyDeposits = movements.some(deposit); // The .some() method will allow you to check for a condition and it will return a boolean based on that condition
console.log(anyDeposits);

// EVERY CONDITION - Just like the .some() method, but it only returns true if EVERY element within the array match the conditions

console.log(account4.movements.every(deposit)); // So this checks if every element within the array matches the supplied condition. It returns a boolean value
console.log(movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit)); // We can then use this variable on all use cases for this calculation

// Seperate variable for the callbackfunction outside of the param, and passing in the variable instead

*/

/*

//////////////////////////////////////
// .flat() and .flatMap() mathods.
// The .flat() method can take an array of nested array and combine them all in one big array, simply by calling the method on the array. With no param, it only flattens up to one level deep. You can flatten as many levels as you would like, you only must specify how many levels deep you would like to go in the param.

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2, [3, [4]], 5, 6], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(4));


const account = accounts.find(acc => acc.owner === `Jessica Davis`);
const allMovements = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0); // This takes the accounts array and applies the .map() method to them, with an arrow function simply placing all of the movements arrays from each account into a new array, we then use the .flat() method on these arrays in order to flatten all of those movements into one array, and then we  applie the .reduce() method on them in order to get the sum of all accounts
console.log(allMovements);

// We can instead of chaining the .flat() method with the .map() method, we can use the .flatMap() method which does the same thing but all in one function. The .flatMap() method only goes one level deep at all times, so when we need to unnest deep nested arrays, we must first flatten the levels with the .flat() method beforehand.

const allMovements1 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(allMovements1);

*/

////////////////////////////////////////////
// SORTING ARRAYS - VERY TALKED ABOUT SUBJECT WITHIN COMPUTER SCIENCE, MANY ALGOITHYMS ONLINE FOR SORTING

/*

const owners = [`Jonas`, `Zach`, `Adam`, `Martha`];

console.log(owners.sort()); // The .sort() method will sort an array of strings alphabetically with no params. It also MUTATES the original array as well though, so be careful

console.log(movements);
// console.log(movements.sort()); // The sort method sorts based on strings. So it will sort negative numbers first, and then it looks at the the first number and goes from lowest to highest

// Return > 0, param B is placed before A (b, a) (siwtches order) 1 Positive return? Params are switched
// Return < 0, param A is placed before B (a, b) (keeps the order the same) -1 Negative return? Params are kept the same
// This will place these numbers in ascending orders
movements.sort((a, b) => a - b); //
console.log(movements); // The .sort() method loops the array and applies whatever logic inputted in order to sort the array

// Descending order by simply switching the return value
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);

*/

/*

/////////////////////////////////////////
// Prgramatically making arrays.

//Typical way for making arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7); // This creates an empty array, with a length of 7
console.log(x);

//Empty arrays + fill method
// Fill. fills the array with the parameter specified
x.fill(1, 2, 5); // fills the array with the same logic in the method applied to the .slice method. except, the first param is the number or value you would like to fill with. We fill from index 2 - 5.
x.fill(1);
console.log(x);

arr.fill(23, 4, 6);
console.log(arr);

// Array.from()

// Array.from() maps an object like iterable to an array.
const y = Array.from({ length: 7 }, () => 1); // We create an array with the Array constructor and call the .from() array method on it, we then pass in as the first argument AN ARRAY LIKE OBJECT(an object with a length property) with a property of `length` and give it a value of 7, the second argument is an arrow function that simply adds whatever value we return at every iteration
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); // This is the same exact callbackfn as the .map() function, and does something at every iteration, in this case we add a new element at every iteration with passing in the iteration variable + 1 at every iteration
console.log(z);

// Array with 100 random dice rolls
const diceRolls = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 6 + 1)
);

console.log(diceRolls);

const movementsUI = Array.from(document.querySelectorAll(`.movements__value`));

labelBalance.addEventListener(`click`, function () {
  const movementsUI = Array.from(
    document.querySelectorAll(`.movements__value`),
    el => Number(el.textContent.replace(`€`, ``))
  );
  console.log(movementsUI);
}); // Right here we create a variable called movementsUI and then we use the Array.from() method in order to grab all the elements from the `.moments__value` query, which created a NODE LIST (AN ITERABLE OBVJECT LIKE STRUCTURE). We then add a second param to the .from() method, which is a mapping function. And applies our login in each iteration.

const movementsUI2 = [...document.querySelectorAll(`.movements__value`)];

console.log(movementsUI2);


*/

/*

// ALL 23 ARRAY METHODS

//////////// 1.) Do I want to mutate an array?

////// 1.1) Add to the original array?
//  .push() - Adds an array element to the end of the array
//  .unshift() - Adds ana array element to the beginning of the array

////// 1.2) Remove from the original array?
//  .pop() - Remove an element from the end of an array
//  .shift() - Remove an element from the beginning of an array
//  .splice() - Remove any selections from an array

////// 1.3) Others
//  .reverse() - Reverse the order of the array
//  .sort() - Sort the array, based on your logic or sotring mechanism
// .fill() - Fill an array with empty elements

//////////// 2.) Do I want to make a new array?

////// 2.1) Computed from the original array
// .map() - Create a new array with a condition on the new array items

////// 2.2) Filtered using a condition
// .filter() - Filter through an array and send to a new array filtering out specified values.

////// 2.3) Do you want a portion of the original array?
// .slice() - Returns a shallow copy of an array with the start and end params specified as arguments

////// 2.4) Do you want to combine two arrays?
// .concat() - Combine two arrays into one single array

////// 2.5) Do you want to flatten the original array?
// .flat() - Flatten nested arrays into one single array, with the depth of flattening specified as an argument
// .flatMap() - Flatten an array and map the flattened array to a new array

//////////// 3.) Do I want an arrays index's?

// .indexOf() - Returns the indexOf() the specified param value - BASED ON A VALUE
// .findIndex() - Returns the index positioning of a specified value in the parameter, with an a callback function as the second parameter. - BASED ON A TEST CONDITION

////// 3.1) Do you want to find an array element itself?
// .find() - Returns the first element within an array that returns true to the testing condition, BASED ON A TESTING CONDITION

//////////// 4.) Do I want to know if an array .includes?

////// 4.1) Based on value
// .includes() - Test if an array includes a single specific value

////// 4.2) Based on a test condition
// .some() - Specify a condition based on a callback function, returns true if at least one of the elements satisfy the conditions
// .every() - Specify a condition based on a callback fundtion, returns true if all of the array elements satisfy the condition

////// 5) Transform an array to a string?
// .join - Joins two array based on a seperator string. example: .join(`,`)

//////////// Do I want to transform a value from an array?

// .reduce() - Based on an accumalator - Boils down an array to a single string, value, number, boolean. Or even an array or object. BASED ON A CONDITION

//////////// Do I just want to loop an array?

// .forEach() - Loops an array and applies logic at each iteration or every element. But does not produce a new value

*/
