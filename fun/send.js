const axios = require("axios")

const {replyText} = require("./replyText")
const {Token, AdministratorId, ChannelId} = require('../config')
const send = (params, isGroup, tryAgain = true) => {
    axios.get(`https://api.telegram.org/bot${Token}/${isGroup ? 'sendMediaGroup' : 'sendVideo'}`, {
        params,
        timeout: 16000
    }).then(_ => {
        console.log(`视频${isGroup ? '组' : ''}发送成功`)
    }).catch(_ => {
        console.log(`视频${isGroup ? '组' : ''}超时错误`)
        if (tryAgain) {
            send(params, isGroup, false)
        } else {
            let newParams = params
            if (newParams['chat_id'] === ChannelId) {
                newParams['chat_id'] = AdministratorId
            }
            replyText(`视频${isGroup ? '组' : ''}上传至tg超时(16s),请重试${!isGroup ? '\n' + params['video'] : ''}`, newParams['chat_id'], '上传视频超时,发送链接')
        }
    })
}

module.exports = {send}
