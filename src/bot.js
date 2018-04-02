const ChatConnector = require('botbuilder').ChatConnector;
const UniversalBot = require('botbuilder').UniversalBot;
const MemoryBotStorage = require('botbuilder').MemoryBotStorage;
const constans = require('../constans');
const mainDialog = require('./dialogs/mainDialog');

module.exports = class Bot {

    constructor(){
        this.setup();
    }

    get connector(){
        return this._connector;
    }

    set connector(value){
        return this._connector = value;
    }

    setup(){
        this.connector = new ChatConnector({
            appId: constans.MicrosoftAppId,
            appPassword: constans.MicrosoftAppPassword
        });

        this.bot = new UniversalBot(this.connector);
        this.bot.set('storage', new MemoryBotStorage());
        mainDialog.registerDialogs(this.bot);
    }
};