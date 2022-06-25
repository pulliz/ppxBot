const axios = require("axios");
const Token = '5045595268:AAFPv3piDOeNCNryRU1vkMsW7fe5hAHvIUQ'

const replyText = (text, id, log = '') => {
    axios.get(`https://api.telegram.org/bot${Token}/sendMessage`, {
        params: {
            'chat_id': id,
            'text': text,
            'parse_mode': 'HTML'
        }
    }).then(_ => {
        console.log(log)
    }).catch(err => console.log(err))
}

module.exports = {
    replyText
}