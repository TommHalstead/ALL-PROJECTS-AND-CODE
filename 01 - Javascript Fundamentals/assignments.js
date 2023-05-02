/*let myCountry = 'United States';
let myContinent = 'North America';
let usaPopulation = '331 million';

console.log(myCountry);
console.log(myContinent);
console.log(usaPopulation);


// Formula = mass / (height ** 2)

// const markMass = 95;
// const markHeight = 1.88;
// const johnMass = 85;
// const johnHeight = 1.76;


// const markMass = 78;
// const markHeight = 1.69;
// const johnMass = 92;
// const johnHeight = 1.95;

// const johnBMI = johnMass / johnHeight ** 2;
// const markBMI = markMass / markHeight ** 2;

// const markHigherBMI = markBMI > johnBMI;

// // console.log(markHigherBMI)
// console.log(johnBMI.toFixed(2))
// console.log(markBMI.toFixed(2))

// if (markBMI > johnBMI) {
//     console.log(`Mark's BMI of ${markBMI.toFixed(2)} is higher than John's BMI of ${johnBMI.toFixed(2)},`)
// } else {
//     console.log(`John's BMI of ${johnBMI.toFixed(2)} is higher than Mark's BMI of ${markBMI.toFixed(2)}`)
// }



// function compareBMI() {


// }

const dolphinsScoreGameOne = 97;
const dolphinsScoreGameTwo = 112;
const dolphinsScoreGameThree = 101;

let dolphinsAverageScore = (dolphinsScoreGameOne + dolphinsScoreGameTwo + dolphinsScoreGameThree) / 3;

// console.log(Number(dolphinsAverageScore.toFixed(2)));

const koalasScoreGameOne = 109;
const koalasScoreGameTwo = 95;
const koalasScoreGameThree = 106;


let koalasAverageScore = (koalasScoreGameOne + koalasScoreGameTwo + koalasScoreGameThree) / 3;

const minimumScore = 100;
let scores = [dolphinsAverageScore, koalasAverageScore];

// console.log(Number(koalasAverageScore.toFixed(2)));


if (koalasAverageScore > dolphinsAverageScore && koalasAverageScore >= minimumScore) {
    console.log(`Koalas Average score of ${Number(koalasAverageScore.toFixed(2))} is higher than Dolphins score of ${Number(dolphinsAverageScore.toFixed(2))}, and are the winners of this game!`);

} else if (dolphinsAverageScore > koalasAverageScore && dolphinsAverageScore >= minimumScore) {
    console.log(`Dolphins Average score of ${Number(dolphinsAverageScore.toFixed(2))} is higher than Koalas score of ${Number(koalasAverageScore.toFixed(2))}, and are the winners of this game!`);

} else if (koalasAverageScore >= 100 && dolphinsAverageScore >= 100) {
    console.log(`Koalas average score of ${Number(koalasAverageScore.toFixed(2))} is the same as Dolphins average score of ${Number(dolphinsAverageScore.toFixed(2))} so therefore, it's a draw!`)
} else {
    console.log(`No one wins the trophy!`);
}






const bill = 200;


const tip = bill >= 50 && bill <= 300 ? bill * .15 : bill * .2;
console.log(`The bill price is ${bill}, the tip was ${tip}, and so the total is: ${bill + tip}.`);


*/