const express = require('express');
const router = express.Router();

const API = require('./API');
const ApiAnswer = require('./ApiAnswer');

function Router(options = {}) {
    const service = options.service;

    const apiAnswer = new ApiAnswer();

    router.get(API.GET_USERS_LIST_WITH_PROGRESS, (req, res) => {
        res.send(apiAnswer.answer('some data'));
    });

    router.get(API.GET_TEXT_BY_HASH, (req, res) => {
        res.send(apiAnswer.answer('some data'));
    });

    return router;
}

module.exports = Router;