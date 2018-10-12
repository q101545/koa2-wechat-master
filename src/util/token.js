/**
 * Created by 王云鹏 on 2018/10/7.
 */
const config = require('../config/config')
const fileUtil = require('./file_util')
const request = require('request')

'use strict'


const appId = config.wx.appid
const appSecret = config.wx.appsecret;

let access_token = '', expires_in = ''
const file_token = {access_token, expires_in}

//存储access_token
function saveLocal(data) {
    return new Promise((resolve, reject) => {
        if (data) {
            file_token.access_token = data.access_token;
            file_token.expires_in = data.expires_in;
            fileUtil.saveAccessToken(data);
            resolve(data);
        } else {
            reject(new Error('access_token未刷新'))
        }
    })
}

//获取access_token
async function fetchAccessToken() {
    if (file_token.access_token && file_token.expires_in) {
        if (isValidAccessToken(file_token)) {
            return file_token.access_token
        } else {
            let data = await updateAccessToken()
            await saveLocal(data)
            return data.access_token
        }
    } else {
        let data = ''
        try{
            data = await fileUtil.getAccessToken()
        }catch(e) {
            let data = await updateAccessToken()
            await saveLocal(data)
            return data.access_token
        }
        if (isValidAccessToken(data)) {
            let data = data
            try {
                data = JSON.parse(accessToken)
            } catch (e) {
                throw e
            }
            return data
        } else {
            let data = await updateAccessToken()
            await saveLocal(data)
            return data.access_token
        }
    }
}
//票据合法性检查
function isValidAccessToken(data) {
    if (!data || !data.access_token || !data.expires_in) {
        return false;
    }
    let access_token = data.access_token;
    let expires_in = data.expires_in;
    let now = (new Date().getTime());

    if (now < expires_in) {//判断是否过期
        return true;
    } else {
        return false;
    }
}
//更新票据
function updateAccessToken() {
    let url = config.api.prefix_access_token + "&appid=" + appId + "&secret=" + appSecret;
    return new Promise(function (resolve, reject) {
        //向url发出请求
        request({url: url, json: true}, function (error, response, body) {
            let data = body
            let now = new Date().getTime();
            //票据提前20秒刷新
            let expires_in = now + (data.expires_in - 20) * 1000
            data.expires_in = expires_in;
            resolve(data);
        })
    })
}

exports.getAvailToken = () => {
    return fetchAccessToken()
}
