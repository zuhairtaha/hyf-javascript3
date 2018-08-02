"use strict";
// step (1)
let numbers    = [1, 2, 3, 4];
/**
 * Doubles the odd numbers in an array and throws away the even number.
 * @type newNumbers {Array} newNumbers
 */
let newNumbers = numbers
    .filter(number => number % 2 !== 0)
    .map(number => number * 2);
console.log('new numbers =', newNumbers);

