const axios = require("axios");
const getFun = async (url, t = 800) => {
    try {
        await axios({
            method: "GET",
            url: url,
            headers: {
                'User-Agent': 'baiduboxapp'
            },
            timeout: t,
            maxRedirects: 0,
            proxy: {
                protocol: 'http',
                host: '14.215.179.244',
                port: 443
            }
        })
    } catch (e) {
        if (e?.response?.data.indexOf(`href="https://h5.pipix.com/item/`)) {
            let path = e.response.data
            let reTrue = /(?<=cell_id=).*?(?=&amp)/
            let reFalse = /(?<=\/item\/).*?(?=\?app_id=)/

            const isComment = path.indexOf('cell_id=') !== -1

            if (isComment) {
                return [path.toString().match(reTrue)[0], isComment]
            } else {
                return [path.toString().match(reFalse)[0], isComment]
            }
        }
        return Promise.resolve('err')
    }
}

const getId = async (url) => {
    let res
    // let start = performance.now()

    try {
        res = await Promise.any([1,2,3,4,5].map(() => getFun(url)))
        // let end = performance.now()
        // console.log('获取id用时', `${(end - start).toFixed(0)}ms`)
    } catch {
        return Promise.reject('err')
    }

    return res
}

module.exports = getId;