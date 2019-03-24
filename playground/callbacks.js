let getUser = (id, callback) => {
    let user = {
        id: id,
        name: 'Jeg'
    };
    setTimeout(() => {
        callback(user);
    }, 3000);
}

getUser(50, (user) => {
    console.log(`Name: ${user.name} ID: ${user.id}`)
});
