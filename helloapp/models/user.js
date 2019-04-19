var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
