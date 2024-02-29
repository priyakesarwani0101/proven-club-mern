const UserModel = require('./userSchema')

async function createUser({ username, password }) {
    let newUser = await UserModel.create({ username: username, password: password });
    return newUser;
}

async function findUser() {
    let users = await UserModel.find();
    return users;
}

module.exports = {
    createUser,
    findUser
}