// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*
const temperatures = [3, -2, -6, 1, `error`, 9, 13, 17, 15, 14, 9, 5];
const tempArrTwo = [4, 8, 9, 3, 8, 11, 18, 4];

// 1) Understand the problem

// - Calculate the amplitude between the numbers in the array
// - Amplitude is the difference between the highest and the lowest numbers
// - How to compute max and min temps?
// - What does a sensor error look like, and what to do when an error occurs?

// 2) Break up these problems into smaller problems

// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from the max (amplitude) and return it.
const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const currentTemp = temps[i];
    if (typeof currentTemp !== `number`) continue;
    if (currentTemp > max) {
      max = currentTemp;
    } else if (currentTemp < min) {
      min = currentTemp;
    }
  }
  // console.log(min, max);
  return max - min;
};
const amplitude = calcTempAmplitude(temperatures);

// console.log(amplitude);

// PROBLEM 2:
// - Function should now recieve two arrays as input for temperatures

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice?
// - Merge the arrays together

// 2) BREAKING UP THE PROBLEM INTO SUB-PROBLEMMS:

// - How to merge 2 arrays together?

// const newTemps = temperatures.concat(tempArrTwo);
// console.log(newTemps);

const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const currentTemp = temps[i];
    if (typeof currentTemp !== `number`) continue;
    if (currentTemp > max) {
      max = currentTemp;
    } else if (currentTemp < min) {
      min = currentTemp;
    }
  }
  console.log(temps);
  console.log(min, max);
  return max - min;
};
const amplitudeNew = calcTempAmplitudeNew(temperatures, tempArrTwo);



const measureKelvin = function () {
  const measurement = {
    typeof: `temp`,
    unit: `celsius`,
    // value: prompt(`Degrees celsius:`),
    value: 10,
  };

  console.table(measurement);

  const kelvin = Number(measurement.value) + 273;
  return kelvin;
};

console.log(measureKelvin());

// Using a debugger
const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  let max = 0;
  let min = 0;

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== `number`) continue;
    if (curTemp > max) {
      max = curTemp;
    } else if (curTemp < min) {
      min = curTemp;
    }
  }
  console.log(temps);
  console.log(max, min);
  return max - min;
};
const amplitudeBug = calcTempAmplitudeBug([3, 5, 1, 9, 4, 5]);
console.log(amplitudeBug);


const weatherTemps = [17, 21, 23];
const nextWeatherTemps = [12, 5, -5, 0, 4];
// const curTemp = weatherTemps[i];
// const curLoop = Number([i] + 1);
const printForecast = function (arr) {
  let myStr = ``;
  for (let i = 0; i < arr.length; i++) {
    myStr += ` ${arr[i]}C in ${i + 1} days... `;
  }
  console.log(`...` + myStr);
};
printForecast(nextWeatherTemps);

*/
