var mongoose = require('mongoose');

const messsageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    senderName: String,
    contents: String
});

module.exports = mongoose.model('SentMessage', messageSchema);