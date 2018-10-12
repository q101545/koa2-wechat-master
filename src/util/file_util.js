/**
 * Created by 王云鹏 on 2018/10/7.
 */
const fs = require('fs')
const config  = require('../config/config')
'use strict'

//本地存储accesstoken
exports.saveAccessToken = (data) => {
    data = JSON.stringify(data);
    return writeFileAsync(config.access_token_file(), data);
};

//本地读取accesstoken
exports.getAccessToken = ()=>{
    return readFileAsync(config.access_token_file())
}



/*读取access_token*/
function readFileAsync(fpath, encoding){
    return new Promise(function(resolve , reject){
        fs.readFile(fpath,encoding,function(err,content){
            if(err)
                reject(err);
            else
                resolve(content);
        })
    })
}

/*写入access_token*/
function writeFileAsync(fpath, content){
    return new Promise(function(resolve , reject){
        fs.writeFile(fpath,content,function(err){
            if(err)
                reject(err);
            else
                resolve();
        })
    })
}