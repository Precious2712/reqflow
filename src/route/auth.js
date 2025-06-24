const express = require('express');
const link = express.Router();
const upload = require("../utils/multer");

const verifyUser = require('../middleware/checkCurrentUser');

const {
    signUp,
    signIn,
    uploadProfilePicture,
    checkCurrentUser
} = require('../controller/auth');

link.post('/signUp', signUp);
link.post('/signIn', signIn);
link.put("/upload/:id",
    upload.single('image'),
    uploadProfilePicture
);
link.get('/checkCurrentUser', verifyUser, checkCurrentUser);

module.exports = link;