var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // userName: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    //recipientName: { type: String, required: true},
    userName: { type: String, required: true},
    recipientName: { type: String, required: true},
    contents: { type: String, required: true}
});

module.exports = mongoose.model('Mail', messageSchema);