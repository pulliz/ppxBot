const axios = require("axios")

const {replyText} = require("./replyText")
const {Token} = require('../config')
const send = (params, isGroup) => {
    axios.get(`https://api.telegram.org/bot${Token}/${isGroup ? 'sendMediaGroup' : 'sendVideo'}`, {
        params,
        timeout: 16000
    }).then(_ => {
        console.log(`视频${isGroup ? '组' : ''}发送成功`)
    }).catch(() => {
        console.log(`视频${isGroup ? '组' : ''}超时错误`)
        replyText(`视频${isGroup ? '组' : ''}上传至tg超时(16s),请重试${!isGroup ? '\n' + params['video'] : ''}`, params['chat_id'], '上传视频超时,发送链接')
    })
}

module.exports = {send}