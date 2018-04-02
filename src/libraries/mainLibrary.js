const Library = require('botbuilder').Library;
const IntentDialog = require('botbuilder').IntentDialog;
const EntityRecognizer = require('botbuilder').EntityRecognizer;
const constants = require('../../constans');
var apiairecognizer = require('api-ai-recognizer');
var recognizer = new apiairecognizer(constants.ApiAi);
const stopMatch = 'cansel';

const geoCity = () => {
    return new IntentDialog({  
        recognizers: [recognizer]  
    })
    .onBegin( (session, args) => {
        session.send('В каком городе?');
    })
    .matches('geo-city', (session, args) => {
        let geocity =  EntityRecognizer.findEntity(args.entities, 'geo-city');
        session.endDialogWithResult({geocity:geocity.entity});
    }).onDefault((session) => {
        session.send('Не могу найти этот город');
    })
    .cancelAction('CancelDialog', 'Ok. Canceled.', {
        matches: stopMatch
    }); 
};

const dateInt = (validate) => {
    return new IntentDialog({  
        recognizers: [recognizer]  
    })
    .onBegin( (session, args) => {
        session.send('На когда?');
    })
    .matches('date', (session, args) => {
        let date =  EntityRecognizer.findEntity(args.entities, 'date');
        if(validate){
            validate(args.entities, session.endDialogWithResult({date:date.entity}))
        }
        else{
            session.endDialogWithResult({date:date.entity});
        }
    }).onDefault((session) => {
        session.send('Укажите дату точнее');
    })
    .cancelAction('CancelDialog', 'Ok. Canceled.', {
        matches: stopMatch
    }); 
};

const lib = new Library('shared');
lib.dialog('geoCity', geoCity());
lib.dialog('date', dateInt());

module.exports.createLibrary = () => lib.clone();