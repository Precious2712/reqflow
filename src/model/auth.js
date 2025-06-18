const mongoose = require('mongoose');

const { Schema } = mongoose;

const userData = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: ''
    }
})

const authScheme = mongoose.model('userData', userData);

module.exports = authScheme;