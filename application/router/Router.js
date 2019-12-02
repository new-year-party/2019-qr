const express = require('express');
const router = express.Router();

function Router(options) {
    options = (options instanceof Object) ? options : {};

    return router;
}

module.exports = Router;