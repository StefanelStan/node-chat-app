/*  Jan 1st 1970 00:00:00 = 0
    >0 ms goes in the future paste 1970
    <0 ms goes into the past
*/
const moment = require('moment');

// let date = new Date();

// console.log(date.getMonth());
// console.log(date.getDate());

let date = moment(); //current point in time
//date.add(100, 'year');
console.log(date.valueOf());
console.log(date.format());
console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm a'));