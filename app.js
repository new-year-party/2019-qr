const express = require('express');
const Server = require('http').Server;

const DB = require('./application/modules/db');
const Service = require('./application/modules/service');

const Router = require('./application/router');
const settings = require('./settings');

const app = express();
const http = Server(app);

const db = new DB();
const service = new Service({ db });

const router = new Router({ service });

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(`${__dirname}/public`));
app.use(router);

http.listen(settings.PORT, () => console.log(`Server is running on 8080`));
