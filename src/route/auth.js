const express = require('express');
const link = express.Router();
const upload = require("../utils/multer");

const {
    signUp,
    signIn,
    uploadProfilePicture
} = require('../controller/auth');

link.post('/signUp', signUp);
link.post('/signIn', signIn);
link.put("/upload/:id",
    upload.single('image'),
    uploadProfilePicture
);

module.exports = link;