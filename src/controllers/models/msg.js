
const mongoose = require('mongoose');

const msgCollection = 'msg';

const MsgSchema = new mongoose.Schema({
    author: {
        type: Object,
        required: true
        
        
    },
    message:{
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    }
});
const msg = mongoose.model(msgCollection, MsgSchema);
module.exports =  {msg}