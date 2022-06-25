const axios = require('axios')

const {ip} =require('../../config')

const getFun = async (id, t = 1200) => {
    let res
    try {
        res = await axios({
            method: 'get',
            url: 'http://h5.pipix.com/bds/webapi/cell/detail/',
            params: {
                'cell_id': id,
                'cell_type': 8,
                'source': 'share'
            },
            headers: {
                'User-Agent': 'baiduboxapp'
            },
            proxy: {
                protocol: 'http',
                host: ip,
                port: 443
            },
            timeout: t
        })
    } catch {
        return Promise.reject('err')
    }

    return res?.['data']?.['data']?.['comment']?.['video']?.['url_list']?.[0]['url'] || '非视频'
}

const getCommentVideoUrl = async (id) => {
    let res

    try {
        res = await Promise.any([1,2,3,4,5].map(() => getFun(id)))
    }catch {
        return Promise.reject('err')
    }

    if (res === '非视频') {
        console.log('非视频错误')
        return Promise.reject('非视频err')
    }
    return res
}

module.exports = getCommentVideoUrl;