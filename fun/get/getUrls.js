const axios = require("axios");

const {getUrl} = require("./getUrl");
const getUrls = async (originUrls) => {
    const getUrlFunList = (urls) => {
        let downloadUrls = []
        for (let i = 0; i < urls.length; i++) {
            downloadUrls[i] = getUrl(urls[i])
        }
        return downloadUrls
    }
    let res
    try {
        res = await axios.all(getUrlFunList(originUrls))
    } catch {
        return Promise.reject('getUrls err')
    }
    return res
}

module.exports = {
    getUrls
}