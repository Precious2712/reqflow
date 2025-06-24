const express = require('express');
const send = express.Router();

const {
    sendRequest,
    seeSendRequet
} = require('../controller/sender');

send.post('/sendRequest', sendRequest);
send.get('/seeSendRequet/:id', seeSendRequet)

module.exports = send;