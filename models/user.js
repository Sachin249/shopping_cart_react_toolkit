const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required:true,
    },
    remember_token: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: 'Active'
    }
});

UserSchema.set('timestamps', true);
UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('users',UserSchema,'users');