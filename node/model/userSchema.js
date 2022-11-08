const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    userNum: Number,
    email: String,
    displayName: String,
    uid: String
}, {collection: 'User'});

const User = mongoose.model('User', userShema);
module.exports = { User };