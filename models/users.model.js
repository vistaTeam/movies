const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type: String,
        unique:true,
        required: true,
        minlength: 3
    },
    email:{
        type: String,
        unique:true,
        required: true,
        minlength: 5,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 3
    },
    movies:{
        type: Object
    },
    name:{
        type: String,
        required: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;