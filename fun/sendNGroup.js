const axios = require('axios')

const {getUrl} = require("./get/getUrl")
const {replyText} = require("./replyText")
const {AdministratorId, ChannelId} = require('../config')
const {send} = require("./send")

const sendNGroup = async (url, caption, id, isFromGroup = false) => {
    let downloadUrl
    if (isFromGroup) {
        //来自Group筛选后仅剩下1条合法分享链接,如其他视频链接都大于20m
        downloadUrl = url
    } else {
        try {
            downloadUrl = await getUrl(url)
        } catch {
            replyText('视频解析时出错,请稍后重试', id, '视频解析出错')
            return;
        }
    }

    let head = await Promise.any([1, 2, 3].map(() => axios.head(downloadUrl)))
    let isLegalSize = head.headers['content-length'] < 20 * (1024 ** 2)
    if (isLegalSize) {
        downloadUrl = downloadUrl.substring(0, downloadUrl.indexOf('?'))
        let data = {
            'chat_id': id === AdministratorId ? ChannelId : id,
            'video': downloadUrl,
            'caption': caption
        }
        send(data, false)
    } else {
        downloadUrl = downloadUrl.substring(0, downloadUrl.indexOf('?'))
        replyText(`视频体积超出20M,下载直链:\n${downloadUrl}`, id, '视频体积超出20M,发送链接')
    }
}

module.exports = {
    sendNGroup
}
