const express = require('express');
const send = express.Router();

const {
    sendRequest,
    seeSendRequet,
    updateApprovalRequest,
    rejectRequest
} = require('../controller/sender');

send.post('/sendRequest', sendRequest);
send.get('/seeSendRequet/:id', seeSendRequet);
send.put('/updateApprovalRequest/:id', updateApprovalRequest);
send.delete('/rejectRequest/:id', rejectRequest);

module.exports = send;