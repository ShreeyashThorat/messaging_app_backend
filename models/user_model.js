const { timeStamp } = require('console')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');    
const Schema = mongoose.Schema;

const userSchema= new Schema({
    name :{
        type: String,
        required: true,
    },
    email :{
        type : String,
        required : true,
        unique: true,
    },
    number :{
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type : String,
        required : true,
    },
    gender : {
        type : String,
        required : true,
    },
    dob : {
        type : String,
        required : true
    },
    profilePic : {
        type : String,
        default : "https://cdn-icons-png.flaticon.com/128/847/847969.png"
    },
    nationality : {
        type : String,
        default : "Global"
    },
    state : {
        type : String,
        default : "Deselect"
    },
    intro : {
        type : String,
        maxLength:140,
        default : null
    },
    imageUrls: [{
        type : String,
        default : null
    }],
    deviceToken : {
        type : String,
        default : null
    },
    blockedUsers : {
        type : Array,
        default : null
    },
    blockedByUserd : [{
        type : String,
        default : null
    }],
    sentFriendRequests: [{
        type : String,
        default : null
    }],
    accountStatus : {
        type : String,
        default : "now"
    }

},{timestamps:true});

userSchema.pre('save', function(next){

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;

    next();
});

module.exports = mongoose.model('Users', userSchema)