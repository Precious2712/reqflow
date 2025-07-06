const express = require('express');

const path = express.Router();

const {
    userProfile,
    updateInfo,
    getUserProfile,
    searchField,
    deleteUser
} = require('../controller/userProfile');

path.post('/profile', userProfile);
path.put('/update-info/:id', updateInfo);
path.get('/getUserProfile/:id', getUserProfile);
path.get('/search-field', searchField);
path.delete('/deleteUser/:id', deleteUser);

module.exports = path;