const https = require('https');

let APIKEY = 'YOURAPIKEYHERE';

/* Connect to the API
 * https://api.openweathermap.org/data/2.5/weather?q=YOURCITYHERE&APPID=YOURAPIKEYHERE&units=metric` 
 */

function printError(error) {
	console.error(error.message);
};

function printMessage(city, weather, description, degrees) {
	const message = `The weather in ${city} is ${degrees} degrees and ${weather} - ${description}`
	console.log(message);
};

function get(city) {
	https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKEY}&units=metric`, res => {
	let body = '';
	
	res.on('data', data => {
		//process.stdout.write(data);
		body += data.toString();
	});

	res.on('end', () => {
		try {
			const report = JSON.parse(body);
			// print data
			printMessage(city, report.weather[0].main, report.weather[0].description, report.main.temp);

		} catch (error){
			printError(error)
		}
	});

	}).on('error', (e) => {
		console.error(e);
	});
}

module.exports.get = get;


