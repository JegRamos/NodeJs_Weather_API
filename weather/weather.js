const req = require('request');

let getWeather = (coordinates, fetchData) => {
    let lat = String(coordinates[0]);
    let lng = String(coordinates[1]);
    req({
        url: `https://api.darksky.net/forecast/f4e269f1981c61acab7cac66924d7d83/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            fetchData(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            fetchData('Unable to fetch weather data');
        }
    });
};

module.exports = {
    getWeather
};