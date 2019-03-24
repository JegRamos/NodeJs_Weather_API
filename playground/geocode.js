const req = require('request');

const geoCodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        req({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=2XwcKfndgP2bdwHJEVMYdcifUU2aGrGt&location=${address}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to MapQuest.io server');
            } else if (!body) {
                reject('Invalid Input');
            } else if (body && body.info.statuscode === 0) {
                resolve({
                    address: body.results[0].providedLocation.location,
                    latitude: body.results[0].locations[0].latLng.lat,
                    longitude: body.results[0].locations[0].latLng.lng
                });
            }
        });
    });
};

module.exports = {
    geoCodeAddress
};

// geoCodeAddress('Pasay City')
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((errMsg) => {
//         console.log(errMsg);
//     });