'use strict';

// const measurementKelvin = function () {
//   const measurement = {
//     type: 'temp',
//     unit: 'celsius',
//     value: Number(prompt('Degrees Celsius: ')),
//   };

//   console.table(measurement);

//   const kelvin = measurement.value + 273;
//   return kelvin;
// };

// console.log(measurementKelvin());

const printForecast = tempArray => {
  let forecast = '... ';
  for (let day = 0; day < tempArray.length; day++) {
    let daysText;
    day === 0 ? (daysText = 'day') : (daysText = 'days');
    forecast = forecast + `${tempArray[day]}°C in ${day + 1} ${daysText}...`;
  }
  return console.log(forecast);
};

const testData1 = [17, 21, 23];
const testData2 = [12, 5, -5, 0, 4];

printForecast(testData1);
printForecast(testData2);
