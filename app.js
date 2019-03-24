const yargs = require('yargs');

// const geocode = require('./geocode/geocode');
const geocode = require('./playground/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let address = encodeURIComponent(argv.address);
geocode.geoCodeAddress(address)
    .then((result) => {
        console.log(result);
    })
    .catch((errMsg) => {
        console.log(errMsg);
    });

// geocode.geoCodeAddress(address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         let coordinates = [results.latitude, results.longitude];
//         getCurrentWeather(coordinates);
//     }
// });

//? Wrapper for weather.getWeather
function getCurrentWeather(coordinates) {
    weather.getWeather(coordinates, (errorMessage, results) => {
        if (errorMessage) {
            console.log(errorMessage);
        } else {
            console.log(`It's ${results.temperature} degrees outside, but feels like ${results.apparentTemperature}`);
        }
    });
};
