const axios = require("axios")

const {getUrls} = require("./get/getUrls")
const {sendNGroup} = require("./sendNGroup")
const {replyText} = require("./replyText")
const {send} = require("./send")

const {AdministratorId, ChannelId} = require('../config')

const getIsLegaSizelList = async (downloadUrls) => {
    const getIsLegalSizeFunList = (downloadUrls) => {
        let isLigalFun = []
        for (let i = 0; i < downloadUrls.length; i++) {
            isLigalFun[i] = axios.head(downloadUrls[i])
        }
        return isLigalFun
    }

    let list = await Promise.any([1, 2].map(() => axios.all(getIsLegalSizeFunList(downloadUrls))))

    console.log('视频组视频大小合法验证完成')
    let isLegalList = []
    for (let i = 0; i < list.length; i++) {
        isLegalList[i] = list[i].headers['content-length'] < 20 * (1024 ** 2)
    }
    return isLegalList
}

const sendGroup = async (urlList, caption, id) => {
    let downloadUrlsList
    try {
        downloadUrlsList = await getUrls(urlList)
    } catch {
        replyText('解析视频组时出错,请稍后重试', id, '视频组解析出错')
        return;
    }
    let mediaGroup = []
    let illegalCount = 0

    let IsLegaSizelList = await getIsLegaSizelList(downloadUrlsList)

    for (let i = 0; i < IsLegaSizelList.length; i++) {
        if (IsLegaSizelList[i]) {
            mediaGroup[i - illegalCount] = {
                type: 'video',
                media: downloadUrlsList[i]
            }
        } else {
            illegalCount++
            downloadUrlsList[i] = downloadUrlsList[i].substring(0, downloadUrlsList[i].indexOf('?'))
            replyText(`第${i + 1}个链接的视频体积超出20M,下载直链:\n${downloadUrlsList[i]}`, id, `第${i + 1}个视频超出20M,发送链接`)
        }
    }

    if (mediaGroup.length >= 2) {
        mediaGroup[0] = {
            ...mediaGroup[0],
            caption: caption
        }
        let data = {
            'chat_id': id === AdministratorId ? ChannelId : id,
            'media': JSON.stringify(mediaGroup)
        }

        send(data, true)
        return;
    }
    if (mediaGroup.length === 1) {
        sendNGroup(mediaGroup[0].media, caption, id, true).then()
    }
}

module.exports = {
    sendGroup
}