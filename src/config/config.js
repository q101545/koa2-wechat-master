// base config
const path = require('path')

module.exports = {
    port: 80,
    wx: {
        token: '101545',
        appid: 'wxabbab793adb34b72',
        appsecret: 'abeadee82eb235c7fad0556d66a7d272',
        encodingAESKey: 'xxx'
    },
    api:{
        prefix_access_token:'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&'
    },
    access_token_file:function () {
        return path.join(__dirname,'./accessTokenFile.txt')
    }
}