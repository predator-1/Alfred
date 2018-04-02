const apiai = require('apiai');
const constants = require('../../constans');

var app = apiai(constants.ApiAi);

const recognize = (sessionId, text, success, error) =>{
    var request = app.textRequest(text, {
        sessionId: sessionId
    });
     
    request.on('response', function(response) {
        console.log(response);
        if(success){
            success(response);
        }
    });
     
    request.on('error', function(errors) {
        console.log(errors);
        if(error){
            error(errors);
        }
    });
     
    request.end();
};

module.exports.recognize = recognize;