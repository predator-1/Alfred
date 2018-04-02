const name = 'welcome';

const createDialog = (bot) => {
    bot.dialog(name, dialog)
    .triggerAction({
        matches: name
    });
};

const dialog = () => {
    return  (session, args) => {  
        session.endDialog('Привет. Пока я могу только предсказывать погоду');  
    };
};

module.exports.dialog = dialog;
module.exports.createDialog = createDialog;
module.exports.name = name;