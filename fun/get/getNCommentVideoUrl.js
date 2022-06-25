const axios = require('axios')

const {ip} =require('../../config')

const getFun = async (id, t = 1300) => {
    let res
    try {
        res = await axios({
            method: 'get',
            url: 'http://is-hl.snssdk.com/bds/cell/detail/',
            params: {
                'api_version': 1,
                'app_name': 'super',
                'cell_type': 1,
                'aid': 1319,
                'cell_id': id,
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

    return res?.['data']?.['data']?.['data']?.['item']?.['origin_video_download']?.['url_list']?.[0]?.['url'] || '非视频'
}

const getNCommentVideoUrl = async (id) => {
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

module.exports = getNCommentVideoUrl;
