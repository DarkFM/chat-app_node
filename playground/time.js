const moment = require('moment');



// var date = moment();
// date.add(1, 'years').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));
// console.log(date.format("h:mm a"));

var someTimeStamp = new moment().valueOf();
console.log(someTimeStamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format("h:mm a"));
