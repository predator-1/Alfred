const wellcomeDialog = require('./wellcomeDialog');
var apiairecognizer = require('api-ai-recognizer');
const constants = require('../../constans');
var recognizer = new apiairecognizer(constants.ApiAi);
const weatherDialog = require('./weatherDialog');
const lib = require('../libraries/mainLibrary');

const createMain = (bot) =>{
    bot.dialog('/', (session) =>{
        session.endDialog('Поздоровайся чтобы начать.');
    });
};


const registerDialogs = (bot)=>{
    bot.recognizer(recognizer);
    createMain(bot);
    wellcomeDialog.createDialog(bot);
    weatherDialog.createDialog(bot);
    bot.library(lib.createLibrary());
};

module.exports.registerDialogs = registerDialogs;