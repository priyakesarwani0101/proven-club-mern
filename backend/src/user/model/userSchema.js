const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        select: false
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel
