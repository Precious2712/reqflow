const mongoose = require('mongoose');
const { Schema } = mongoose;

const userProfile = new Schema({
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    country: { type: String, required: true },
    occupation: { type: String, required: true },
    age: { type: Number, required: true },
}, { strict: 'throw' });

const personalProfile = new Schema({
    aboutYourself: { type: String, required: true },
    religion: { type: String, required: true, enum: ['christain', 'muslim', 'traditionalist'] },
    maritalStatus: {
        type: String,
        required: true,
        enum: ['married', 'single', 'divorced', 'widowed', 'seperated', 'In a relationship']
    }
}, { strict: 'throw' });

const hobbies = new Schema({
    one: {
        type: String,
        required: true
    },
    two: {
        type: String,
        required: true
    },
    three: {
        type: String,
        required: true
    }
})

const personalData = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    profileInfo: [userProfile],
    about: [personalProfile],
    hobby: [hobbies]
}, { timestamps: true });

const profile = mongoose.model('PersonalData', personalData);

module.exports = profile;