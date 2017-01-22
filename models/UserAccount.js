 "use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAccountSchema = mongoose.Schema({
    user: {
        type:String,
        required: true,
        unique: true,
        email:true
    },
    pass: {
        type: String,
        required:true
    },
    bots: {
        type: Array,
        default:[]
    }
});

const UserAccount = mongoose.model("UserAccount", userAccountSchema);

module.exports = UserAccount;