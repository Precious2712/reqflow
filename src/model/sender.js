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
    profile: { type: String, required: true },
    religion: { type: String, required: true, enum: ['christain', 'muslim', 'traditionalist'] },
    status: {
        type: String,
        required: true,
        enum: ['married', 'single']
    }
}, { strict: 'throw' });

const likes = new Schema({
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

const senderFriendRequest = new Schema({
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData',
        required: true
    },
    nickName: {
        type: String,
        required: true
    },
    approval: {
        type: Boolean,
        required: true
    },
    userFirstName: { type: String, required: true },
    userLastName: { type: String, required: true },
    profile: [userProfile],
    about: [personalProfile],
    hobbies: [likes]
}, { timestamps: true });

const profile = mongoose.model('sender', senderFriendRequest);

module.exports = profile;