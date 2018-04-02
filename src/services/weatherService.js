const validDate = (date) =>{
    return (Date.parse(date) - new Date().getTime()) > 1296000000;
};

module.exports.validDate = validDate;