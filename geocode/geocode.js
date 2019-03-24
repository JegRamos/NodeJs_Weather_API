const req = require('request');

const geoCodeAddress = (address, fetchData) => {
    req({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=2XwcKfndgP2bdwHJEVMYdcifUU2aGrGt&location=${address}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            fetchData('Unable to connect to the server');
        } else if (body && body.info.statuscode !== 0 ) {
            fetchData('Something went wrong while getting the data');
        } else if (body && body.info.statuscode === 0 ) {
            fetchData(undefined, {
                address: body.results[0].providedLocation.location,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });
        } else {
            fetchData('Invalid input');
        }
    });
};

module.exports = {
    geoCodeAddress
};