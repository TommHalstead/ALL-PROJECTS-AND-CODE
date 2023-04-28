'use strict';

/*

const friends = [`Michael`, `Steven`, `Peter`];
//Normal Array

console.log(friends); // View items within an Array
console.log(friends[1]); //View the number 1 item or 2nd item within the array

console.log(friends.length); //View the length of an array
console.log(friends[friends.length - 1]); //View the last item indexed on an array. Arrays are 0 based and the .length property is not, therefore you must -1.

friends[2] = `Jay`; //Replace the 2nd item on the array with 'Jay'
console.log(friends); //View the items on the friends array.

const firstName = `Thomas`;








const thomas = [firstName, `Halstead`, 2037 - 1997, `programmer`, friends]
//Adding variables, Expressions, and other arrays into an array

console.log(thomas); //Logging the items within the 'thomas' array

const calcAge = function (birthYear) {
  return 2023 - birthYear;
}

const years = [1990, 1967, 2002, 2010, 2020]; //New array holding years

const ages1 = calcAge(years[0]); //Using a function on an array item.
const ages2 = calcAge(years[1]); //Using a function an an array item.
const ages3 = calcAge(years[years.length - 1]); //Using a function on the last item within this array

console.log(ages1, ages2, ages3); //Logging the results of running the function on the array items

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])]; //Creating a new array holding the items that were just inputted to the calcAge function by using the function statement.

console.log(ages) //Logging the new array to the console








const friends = [`Michael`, `Steven`, `Peter`];

const newLength = friends.push(`Jay`); // The push function adds an item to the end of an array
console.log(newLength);

friends.unshift(`John`); //This adds an item to the beginning of an array

friends.pop();
const popped = friends.pop(); //Remove the last item from an array and returns the element that it has removed


friends.shift(); // This removes the last element from an array 
console.log(friends);

console.log(friends.indexOf(`Steven`)); //indexOf returns the indexed position of the specified parameter. In this case, Steven was the indexed parameter and his location within the 2 person array is 1.

console.log(friends.indexOf(`Bob`)); // If you attempt to find the indexed postition of an item that isn't listen within the array, you will receive the error of -1.

console.log(friends.includes(`Steven`)); //The includes function will check and return a boolean value on whether or not the specified parameter is included within the array.
friends.push(`Peter`);

if (friends.includes(`Peter`)) {
  console.log(`You have a friend named Peter!`);
}           //Combining the includes method used on the friends array with an if ()statement to create a conditional that will only log to the console if there is an item within the array named `Peter`.

*/
