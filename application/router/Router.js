const express = require('express');
const router = express.Router();

const API = require('./API');
const ApiAnswer = require('./ApiAnswer');

function Router(options = {}) {
    const service = options.service;

    const apiAnswer = new ApiAnswer();

    router.get(API.GET_USERS_LIST_WITH_PROGRESS, async (req, res) => {
        const result = await service.getUsersInfo();
        if (result && typeof result !== 'number') {
            res.send(apiAnswer.answer(result));
        } else {
            res.send(apiAnswer.error(result));
        }
    });

    router.get(API.GET_TEXT_BY_HASH, async (req, res) => {
        const hash = req.params.hash;
        const result = await service.getUserTextByHash(hash);
        if (result && result.success) {
            res.send(apiAnswer.answer(result));
        } else {
            res.send(apiAnswer.error(result));
        }
    });

    return router;
}

module.exports = Router;