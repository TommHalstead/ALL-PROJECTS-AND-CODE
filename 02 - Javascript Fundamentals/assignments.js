'use strict';
/*
const calcAverage = (scoreOne, scoreTwo, scoreThree) => (scoreOne + scoreTwo + scoreThree) / 3;

let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(24, 16, 8);

// console.log(avgDolphins, avgKoalas);

function checkWinner(dolphinsAvg, koalasAvg) {
  if (dolphinsAvg >= koalasAvg * 2) {
    return console.log(`Dolphins average score of ${dolphinsAvg} is more than double that of Koalas average score of ${koalasAvg}, therefore the Dolphins win!`);
  } else if (koalasAvg >= dolphinsAvg * 2) {
    return console.log(`Koalas average score of ${koalasAvg} is more than double that of Dolphins average score of ${dolphinsAvg}, therefore the Koalas win!`);
  } else {
    console.log(`Neither team had a score that was double or more of the other teams, therefore there is no winning team.`);
  }
}
const winner = checkWinner(scoreDolphins, scoreKoalas);

scoreDolphins = calcAverage(23, 34, 27);
scoreKoalas = calcAverage(85, 54, 41);

const winner2 = checkWinner(scoreDolphins, scoreKoalas)



const calcTip = function (billValue) {
  if (billValue >= 50 && billValue <= 300) {
    return billValue * .2
  } else {
    return billValue * .15
  }
}

// console.log(calcTip1(125));

const bills = [125, 555, 44];

const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

const totals = [calcTip(bills[0]) + bills[0], calcTip(bills[1]) + bills[1], calcTip(bills[2]) + bills[2]];


function calcTip(billValue) {
  if (billValue >= 50 && billValue <= 300) {
    return billValue * .15
  } else {
    return billValue * .20
  }
}



console.log(bills);
console.log(tips);
console.log(totals);


const mark = {
  firstName: `Mark`,
  lastName: `Miller`,
  mass: 78,
  height: 1.69,

  calcBMI: function () {
    this.marksBMI = mark.mass / mark.height ** 2
    return this.marksBMI;
  }
};

mark.calcBMI();
console.log(mark);

const john = {
  fistName: `John`,
  lastName: `Smith`,
  mass: 92,
  height: 1.95,

  calcBMI: function () {
    this.johnsBMI = this.mass / this.height ** 2
    return this.johnsBMI;
  }
};

john.calcBMI();
console.log(john);

// console.log(`${johnSmith.fistName} ${johnSmith.lastName}'s BMI of ${johnSmith.calcBMI1()} is higher than that of ${markMiller.firstName} ${markMiller.lastName}'s  of ${markMiller.calcBMI()}. `)


console.log(mark.marksBMI > john.johnsBMI ? `${mark.firstName} ${mark.lastName}'s BMI of ${mark.marksBMI} is higher than ${john.fistName} ${john.lastName}'s BMI of ${john.johnsBMI}.` : `${john.fistName} ${john.lastName}'s BMI of ${john.johnsBMI} is higher than that of ${mark.firstName} ${mark.lastName}'s BMI of ${mark.marksBMI}.`)



// console.log(mark.marksBodyMassIndex, john.johnsBodyMassIndex);

// console.log(mark, john)

*/

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let tips = [];
let totals = [];



const calcTip = function (bill) {
  if (bill >= 50 && bill <= 300) {
    return bill * .15
  } else {
    return bill * .20
  }
}

for (let i = 0; i <= bills.length - 1; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(tips[i] + bills[i]);
}
console.log(bills)
console.log(tips);
console.log(totals);

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length - 1; i++) {
    sum += arr[i];
  }
  // A function created with a for () loop that loops through an array and adds all the values to each other.
  return sum / arr.length;
}
calcAverage([totals]);
console.log(calcAverage(totals));
console.log(calcAverage(tips));