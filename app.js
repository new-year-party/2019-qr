const express = require('express');
const Server = require('http').Server;

const Router = require('./application/router');
const settings = require('./settings');

const app = express();
const http = Server(app);

const router = new Router({});

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(`${__dirname}/public`));
app.use(router);

http.listen(settings.PORT, () => console.log(`Server is running on 8080`));
