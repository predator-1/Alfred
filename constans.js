require('dotenv').config();

module.exports = {
  MicrosoftAppId: process.env.MICROSOFT_APP_ID,
  MicrosoftAppPassword: process.env.MICROSOFT_APP_PASSWORD,
  port: process.env.port || process.env.PORT || 3979,
  ApiAi: process.env.ApiAi
};