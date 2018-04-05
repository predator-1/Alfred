const messageUtil = require('./utils/messageUtil');
const Prompts = require('botbuilder').Prompts;

const name = 'timetracker';
const createNotificationName = `${name}.createNotification`;
const deleteNotificationName = `${name}.deleteNotification`;

const dialog = () => {
    return [(session) => {
        let options = ['Создать', 'Отменить', 'Выйти'];
        let text = 'Ты в меню управления уведомлений тайм трекера. Выбери нужную опцию.';
        let image = 'https://media.giphy.com/media/xUPGctUP1Z50BNlEpa/giphy.gif';
        let message = messageUtil.createQuickReply(session, text, [image], options);
        Prompts.choice(session, message, options, {
            retryPrompt: 'Ты можешь ввести ответ или нажать на кнопку'
        });
    }, (session, results, next) => {
        if(results){
            if(results.response.index == 0){
                session.replaceDialog(createNotificationName);
            }
            else if(results.response.index == 1){
                session.replaceDialog(deleteNotificationName);
            }
            else{
                session.endDialog(messageUtil.createMessage(session, '', ['https://media3.giphy.com/media/OEv4VSSLkzqs8/giphy.gif']));
            }
        }
    }];
};

const createNotification = () => {
    return [(session)=> {
        session.endDialog('createNotification');
    }];
};

const deleteNotification = () => {
    return [(session)=> {
        Prompts.confirm(session, 'Ты уверен?');
    }, (session, results) => {
        if(results.response){
            session.endDialog(messageUtil.createMessage(session, 'Я отменил подписку', ['https://media2.giphy.com/media/zvBuF2oYRErVS/giphy.gif']));
        } else{
            session.endDialog(messageUtil.createMessage(session, 'Подписка активна', ['https://media0.giphy.com/media/3otPowQIzMRKDKKSvm/giphy.gif']));
        }
    }];
};


const createDialog = (bot) =>{
    bot.dialog(name, dialog()).triggerAction({
        matches: name
    }); 
    bot.dialog(deleteNotificationName, deleteNotification());
    bot.dialog(createNotificationName, createNotification());
};

module.exports.dialog = dialog;
module.exports.createDialog = createDialog;
module.exports.name = name;