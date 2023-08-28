const { timeStamp } = require('console')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');    
const user_model = require('./user_model');
const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
    senderId :{
        type: Schema.Types.ObjectId,
        required: true,
        ref : user_model
    },
    receiverId :{
        type: Schema.Types.ObjectId,
        required: true,
        ref : user_model
    },
    requestMsg :{
        type: String
    },
    status :{
        type: String,
        enum :["pending", "accepted", "rejected"],
        default : "pending"
    }
},{timestamps:true});

module.exports = mongoose.model('friendRequest', friendRequestSchema)