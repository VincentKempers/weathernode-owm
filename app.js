
// require weather app
const weather = require('./weather.js');
// argsv <- 
const things = process.argv.slice(2);
things.forEach(weather.get);