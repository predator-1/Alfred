const restify = require('restify');
const constans = require('../constans');
const Bot = require('./bot');

const server = restify.createServer(); 
server.listen(constans.port, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

const bot = new Bot();

server.post('/api/messages', bot.connector.listen());
