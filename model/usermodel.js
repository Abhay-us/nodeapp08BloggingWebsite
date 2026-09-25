const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    gender: { type: String, required: true, default: "male" },
})

const userTable = mongoose.model('users', userSchema);

module.exports = userTable;