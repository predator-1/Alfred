const name = 'weather';
const constants = require('../../constans');
var apiairecognizer = require('api-ai-recognizer');
var recognizer = new apiairecognizer(constants.ApiAi);
const EntityRecognizer = require('botbuilder').EntityRecognizer;

const dialog = () => {
    return [ (session, args, next) => {
        let date =  EntityRecognizer.findEntity(args.intent.entities, 'date');
        if(date){
            session.dialogData.date = date.entity;
        }
        let city =  EntityRecognizer.findEntity(args.intent.entities, 'geo-city');
        if(city){
            session.dialogData.geoCity = city.entity;
        }
        next();
    },
    (session, args, next) => {
        if(session.dialogData.geoCity){
            next();
        }
        else{
            session.beginDialog('shared:geoCity');
        }
    },
    (session, args, next) => {
        if(!session.dialogData.geoCity){
            session.dialogData.geoCity = args.geocity;
        }
        next();
    },
    (session, args, next) => {
        if(session.dialogData.date){
            next();
        }
        else{
            session.beginDialog('shared:date');
        }
    },
    (session, args, next) => {
        if(!session.dialogData.date){
            session.dialogData.date = args.date;
        }
        next();
    },
    (session, args) => {
       session.endDialog(`Погода в ${session.dialogData.geoCity} на ${session.dialogData.date}`);
    }];
};

const createDialog = (bot) =>{
    bot.dialog(name, dialog()).triggerAction({
        matches: name
    });
};

module.exports.dialog = dialog;
module.exports.createDialog = createDialog;
module.exports.name = name;