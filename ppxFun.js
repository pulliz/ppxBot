const {sendNGroup} = require("./fun/sendNGroup")
const {sendGroup} = require("./fun/sendGroup")
const {replyText} = require("./fun/replyText")

const {AdministratorId} = require('./config')

const main = (body) => {
    if (!(body?.['message']?.['text'])) {
        return;
    }
    let {message} = body

    let id = message['chat']['id']

    if (message['text'] === 'hello') {
        replyText('hello!', id, 'hello!')
        return;
    }

    let list = message['text'].split('\n')
    let urlList = []
    let caption = ''
    let re = /^https:\/\/h5.pipix.com\/s\/[A-z0-9]{7}\/$/
    for (let i = 0; i < list.length; i++) {
        if (re.test(list[i])) {
            urlList.push(list[i].replace('https', 'http'))
        } else {
            caption = message['text'].substring(message['text'].indexOf(list[i]))
            break;
        }
    }

    if (urlList.length === 0) {
        let text = `格式不正确
正确格式:
<code>https://h5.pipix.com/s/xxxxxxx/</code>
哈哈哈哈哈哈(描述文字 可选)
或者:
<code>https://h5.pipix.com/s/xxxxxxx/</code>
<code>https://h5.pipix.com/s/yyyyyyy/</code>
...
<code>https://h5.pipix.com/s/zzzzzzz/</code>
哈哈哈哈哈哈(描述文字 可选)

视频链接不能超过10个`
        replyText(text, id, '格式不正确')
        return;
    }

    if (urlList.length > 10) {
        replyText('最多解析10条', id, '超出10条')
        return;
    }

    if (id === AdministratorId) {
        let capRe = /https:\/\/h5.pipix.com\/s\/[A-z0-9]{7}\//g
        caption = caption.replaceAll(capRe, '')
        if (caption.indexOf('pipix.com') !== -1 || caption.indexOf('/s/') !== -1) {
            caption = ''
        }
    }

    //合法urlList
    console.log(urlList)

    if (urlList.length === 1) {
        sendNGroup(urlList[0], caption, id).then()
        return;
    }
    sendGroup(urlList, caption, id).then()
}

module.exports = main;