const Message = require('botbuilder').Message;
const CardAction = require('botbuilder').CardAction;
const SuggestedActions = require('botbuilder').SuggestedActions;
const mime = require('mime-types');

const createMessage = (session, text, attachs) => {
    let msg = new Message(session).text(text);
    if(attachs){
        addAttach(msg, attachs);
    }
    return msg;
};

module.exports.createMessage = createMessage;

const addAttach = (message, attachs) =>{
    if(message && attachs){
        attachs.forEach(attach => {
            message.addAttachment({
                contentUrl: attach,
                contentType: mime.lookup(attach)
            });
        });
    }
    return message;
};

module.exports.addAttach = addAttach;

const createQuickReply = (session, text, attachs, options) => {
    const msg = createMessage(session, text, attachs);
    if(options){
        let imBacks = [];
        options.forEach(option => {
            imBacks.push(CardAction.imBack(session, option, option));
        });
        msg.suggestedActions(
            SuggestedActions.create(
                session, imBacks
        ));
    }
    return msg;
};

module.exports.createQuickReply = createQuickReply;