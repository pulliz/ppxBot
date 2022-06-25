const getId = require("./getId");
const getNComVideoUrl = require("./getNCommentVideoUrl");
const getCommentVideoUrl = require("./getCommentVideoUrl");

const getUrl = async (url) => {
    //不做错误处理
    let [id, isComment] = await getId(url)

    let res
    try {
        if (!isComment) {
            res = await getNComVideoUrl(id)
        } else {
            res = await getCommentVideoUrl(id)
        }
    } catch {
        return Promise.reject('getUrl err')
    }
    return res
}

module.exports = {
    getUrl
}