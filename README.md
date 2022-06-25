# ppxBot
皮皮虾解析机器人

### 功能
- 支持一次解析多个视频,Tg上限为10
- 支持关联Tg频道,管理员解析的视频将自动发送到关联频道
- 支持携带视频描述(caption)

所以需要: `一个Tg账户`, `一个机器人`, `一个频道`

### 配置
`config.js`
- `AdministratorId` Tg账户 id
- `Token` Tg机器人 token
- `ChannelId` Tg频道 id,如 `https://t.me/ppxjx` => `@ppxjx`
- `ip` 百度直连ip,为了快速解析. 从[这里](https://www.itdog.cn/ping/cloudnproxy.baidu.com "")查询. 请实际测试筛选使用最快的一个

### 使用方式
1. `npm i axios` 安装依赖
2. 从 `ppxFun.js` 导入main函数,将Tg消息体传给main函数并调用

### BOT使用
- 格式形如: `https://h5.pipix.com/s/xxxxxxx/`
- 多个链接,一行一个,最多10个
- 视频描述(caption)放在最后一行  
- 视频上传Tg超时时(16s)和视频体积超出20M时,直接发送下载链接

------
[皮皮虾解析机器人](https://t.me/PpxWithoutWatermark_bot "跳转到Bot")

[关注频道](https://t.me/ppxjx "关注频道")
