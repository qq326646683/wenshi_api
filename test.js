var moment = require('moment');
// console.log(moment("20171023100023", "YYYYMMDDHHmmss").add(7,'h').format('YYYY-MM-DD HH:mm:ss'))
console.log(moment('2017-10-10T01:20:00.000Z').diff(moment(),'s'))