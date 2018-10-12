// some wx fn
const encode = require('../util/encode')
const config = require('../config/config')
const xml = require('./xml')

// 返回 true ／ false
exports.auth = (ctx) => {
    const token = config.wx.token,
        signature = ctx.query.signature,
        timestamp = ctx.query.timestamp,
        nonce = ctx.query.nonce

    // 字典排序
    const arr = [token, timestamp, nonce].sort()
    const result = encode.sha1(arr.join(''))

    if (result === signature) {
        return true
    } else {
        return false
    }
}

exports.message = {
    //回复文本消息
    text (msg, content) {
        return xml.jsonToXml({
            xml: {
                ToUserName: msg.FromUserName,
                FromUserName: msg.ToUserName,
                CreateTime: Date.now(),
                MsgType: 'text',
                Content: content
            }
        })
    },
    //回复图片消息
    image (msg, media_id){
        return xml.jsonToXml({
            xml: {
                ToUserName: msg.FromUserName,
                FromUserName: msg.ToUserName,
                CreateTime: Date.now(),
                MsgType: 'image',
                Image: {MediaId: media_id}
            }
        })
    },
    //回复语音消息
    voice(msg, media_id){
        return xml.jsonToXml({
            xml: {
                ToUserName: msg.FromUserName,
                FromUserName: msg.ToUserName,
                CreateTime: Date.now(),
                MsgType: 'voice',
                Voice: {MediaId: media_id}
            }
        })
    },
    // 回复视频消息
    video(msg, {media_id, title, description}){
        return xml.jsonToXml({
            xml: {
                ToUserName: msg.FromUserName,
                FromUserName: msg.ToUserName,
                CreateTime: Date.now(),
                MsgType: 'video',
                Video: {
                    MediaId: media_id,
                    Title: title,
                    Description: description
                }
            }
        })
    },
    //回复音乐消息
    music(msg, {TITLE, DESCRIPTION, MUSIC_Url, HQ_MUSIC_Url, media_id}){
        return xml.jsonToXml({
            xml: {
                ToUserName: msg.FromUserName,
                FromUserName: msg.ToUserName,
                CreateTime: Date.now(),
                MsgType: 'video',
                Music: {
                    Title: TITLE,
                    Description: DESCRIPTION,
                    MusicUrl: MUSIC_Url,
                    HQMusicUrl:HQ_MUSIC_Url,
                    ThumbMediaId:media_id
                }
            }
        })
    },
    //回复图文消息
    /*
    * @param obj的对象格式
     Articles: {
     item: [
     {
     Title: title1,
     Description: description1,
     PicUrl: picurl,
     Url: url
     }
     ]
    * */
    articles(msg, obj={}){
        return xml.jasonToXml({
            xml: {
                ToUserName: msg.FromUserName,
                FromUserName: msg.ToUserName,
                CreateTime: Date.now(),
                MsgType: 'news',
                ArticleCount:obj.item.length,
                obj
            }
        })
    }
}