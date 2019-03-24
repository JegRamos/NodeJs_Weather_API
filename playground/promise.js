let asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Invalid arguments');
            }
        }, 1500);
    });
};

asyncAdd(5, 5)
    .then((result) => {
        console.log(`First Promise: ${result}`);
        return asyncAdd(result, 5);
    })
    .then((result) => {
        console.log(`Second Promise: ${result}`);
    })
    .catch((error) => {
        console.log(error);
    });