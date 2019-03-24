const yargs = require('yargs');
const axios = require('axios');

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
let geoCodeAddrURL = `http://www.mapquestapi.com/geocoding/v1/address?key=2XwcKfndgP2bdwHJEVMYdcifUU2aGrGt&location=${address}`;

axios.get(geoCodeAddrURL)
    .then((response) => {
        if (!response.data || response.data.info.statuscode === 400) {
            throw new Error('Invalid Input!');
        }
        console.log(`Location: ${response.data.results[0].providedLocation.location}`)

        let lat = response.data.results[0].locations[0].latLng.lat;
        let lng = response.data.results[0].locations[0].latLng.lng;
        const weatherURL = `https://api.darksky.net/forecast/f4e269f1981c61acab7cac66924d7d83/${lat},${lng}`;
        return axios.get(weatherURL);
    })
    .then((response) => {
        let temp = response.data.currently.temperature;
        let apparentTemp = response.data.currently.apparentTemperature;
        let summary =  response.data.currently.summary;
        console.log(`Temperature: ${temp} degrees but feels like ${apparentTemp}.`);
        console.log(`Summary: ${summary}`);
    })
    .catch((error) => {
        if (error.code === 'ENOTFOUND') {
            console.log('Unable to connect to API server');
        } else {
            console.log(error.message);
        }
    });