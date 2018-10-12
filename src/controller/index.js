// index controller
'use strict'

const wx = require('../util/wx')
const token = require('../util/token')

exports.getHandle = async (ctx, next) => {
    const result = wx.auth(ctx)
    if (result) {
        ctx.body = ctx.query.echostr
    } else {
        ctx.body = {code: -1, msg: "You aren't wechat server !"}
    }
}

exports.postHandle = (ctx, next) => {
    token.getAvailToken().then((access_token)=>{
        console.log(access_token)
    })

    const isresult = wx.auth(ctx)
    if (isresult) {
        let msg,
            MsgType,
            result

        msg = ctx.req.body ? ctx.req.body.xml : ''

        if (!msg) {
            ctx.body = 'error request.'
            return;
        }

        MsgType = msg.MsgType[0]

        switch (MsgType) {
            case 'text':
                result = wx.message.text(msg, msg.Content)
                break;
            default:
                result = 'success'
        }
        ctx.res.setHeader('Content-Type', 'application/xml')
        ctx.body=result
    } else {
        ctx.body = {code: -1, msg: "You aren't wechat server !"}
    }
}
