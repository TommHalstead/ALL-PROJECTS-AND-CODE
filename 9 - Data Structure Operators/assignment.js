'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals: function (...goals) {
    console.log(
      `Goals scored by:`,
      ...goals,
      `Goals scored:`,
      arguments.length
    );
  },
  // gameOdds: function (odds1, odds2) {
  //   let value1Name = `Team1`;
  //   let value2Name = `Team2`;
  //   (odds1 < odds2 &&
  //     console.log(
  //       `The team with the lower odds is ${value1Name}, with game odds of ${team1}, ${value2Name} has odds of ${team2}`
  //     )) ||
  //     (odds2 < odds1 &&
  //       console.log(
  //         `The team with the lower odds is ${value2}, with game odds of ${team2}, ${value1} has odds of ${team1}`
  //       ));
  // },
};
// 1).

// const [players1, players2] = game.players;
// // console.log(players1, players2);

// // 1.5)
// const players1Copy = [...players1];
// // console.log(players1Copy);
// // 2.)
// const [gk, ...fieldplayers] = players1;
// // console.log(gk, fieldplayers);
// // 3.)
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);
// // 4.)
// const playersFinal = [...players1Copy, `Thiago`, `Coutinho`, `Perisic`];
// // console.log(playersFinal);
// // 5.)
// const { team1 = 1, x: draw = 1, team2 = 1 } = game.odds;
// // console.log(team1, draw, team2);

// // 6.)
// game.printGoals(`Davies`, `Muller`, `Lewandowski`, `Kimmich`);
// game.printGoals(...game.scored);

// // game.gameOdds(1, 2);

// console.log(
//   (team2 > team1 &&
//     `Team1 has a lower score of ${team1}, and is likely to win.`) ||
//     (team1 > team2 &&
//       `Team2 has a lower score of ${team2}, and is likely to win`)
// );
// console.log(
//   team2 < team1 && `Team1 has a lower score of ${team1}, and is likely to win.`
// );

// Loops over the game.scored array and prints each player name to the console as well as the goal number that they scored. Example: Goal '1': Hummels.
// const scoredEntries = game.scored.entries();

// for (const [i, players] of scoredEntries) {
//   console.log(`Goal ${i + 1}: ${players}`);
// }

// // Loop over the game.odds object and calculate the average odds
// const properties = Object.keys(game.odds); // Returns KEYS only
// const oddsValues = Object.values(game.odds); // Returns VALUES only
// const oddsEntries = Object.entries(game.odds); // Returns the whole object
// console.log(properties);
// console.log(oddsValues);
// console.log(oddsEntries);

// let str = `Odds of victory `;
// for (const [i, { team1, x: draw, team2 }] of Object.entries(game.odds)) {
//   str += `${team1} at `;
//   console.log(str, i);
// }

// console.log(Object.values(game.odds));
// let sum = 0;

// for (let i = 0; i < oddsValues.length; i++) {
//   sum += oddsValues[i] / 3;
// }
// console.log(sum);

// console.log(
//   `Odds of victory ${game.team1}: ${
//     Object.values(game.odds)[0]
//   }\nOdds of draw: ${oddsValues[1]}\nOdds of victory ${game.team2}: ${
//     oddsValues[2]
//   }`
// );

// //  3.)
// for (const [team, odd] of Object.entries(game.odds)) {
//   const teamStr = team === `x` ? `draw` : `victory ${game[team]}`;
//   console.log(`Odd of ${teamStr}: ${odd}`);
// }
// console.log(Object.entries(game.odds));
// let scorers = {};
// Object.assign(scorers, game.scored);
// console.log(scorers);

// console.log(Object.entries(scorers));
// for (const [names, values] of Object.entries(scorers)) {
// if (Object.values(scorers) === names) {
// }
// console.log(values);
// }
// console.log(scorers);

// console.log(Object.values(scorers));

console.log(
  `---------------------------- CODING CHALLENGE 3 ----------------------------`
);

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1.) // Create an Array of events from this map that show the events that happened with no duplicates

const events = [...new Set(gameEvents.values())];
console.log(`Challenge 1: ${events}`);

// Creating an array, by first filtering it through a set in order to remove duplicates.

// 2.) Remove the yellow card event from minute 64 from the game
gameEvents.delete(64);
console.log(`Challenge 2:`, gameEvents);

const gameLength = 90;
// 3.5.)
const time = [...gameEvents.keys()].pop();
console.log(time);
// Grabs the last key from the gameEvents map and stores it in a variable for use

// 3.)
console.log(
  `Challenge 4: An event happened, on average, every ${
    time / gameEvents
  } minutes.`
);
// Right here we divide the amount of penalties within the game by the gameLength in order to get the average on when these events occurred.

// 4.)
for (const [minute, event] of gameEvents) {
  const half = minute <= 45 ? `FIRST` : `SECOND`;
  console.log(`[${half} HALF] ${minute}: ${event}`);
}

// Print to the console what penalty happened and whether or not it happened in the fisrt or second half of the game

console.log(
  `--------------------------------Challenge #4!--------------------------------`
);

document.body.append(document.createElement(`textarea`));
document.body.append(document.createElement(`button`));

document.querySelector(`button`).addEventListener(`click`, function () {
  const text = document.querySelector(`textarea`).value; // This uses a query selector in order to grab the value of data inputted by the user.
  const rows = text.split(`\n`); // This splits every section by the end of the line or line break, and this is specified by using the `\n` keyword. The .split() function splits at the desired parameter, and places each substring into an array, each indexed after the other.

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split(`_`);
    let output =
      `${first}` + `${second.replace(second[0], second[0].toUpperCase())}`;
    console.log(`${output.padEnd(20)}${`✅`.repeat(i + 1)}`);
  }
});

// const camelCase = function (text) {
//   const [firstW, secondW] = text.trim().toLowerCase().split(`_`);

//   const secondWCorrect = secondW[0].toUpperCase() + secondW.slice(1);
//   const finishP = firstW + secondWCorrect;
//   console.log(finishP);
// };

// underscore_case;
// first_name;
// Some_Variable;
// calculate_AGE;
// delayed_departure;
