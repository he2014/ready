/*

* */
import * as config from './config';

const TokenKey = 'USER-TOKEN';
const LocalUserKey = 'LOCAL-USER';
const UserRouteKey = 'USER-ROUTE';
const LanguageKey = 'LANGUAGE-KEY'
// 状态常量
export const STATUS_CODE= {
    'SUCCESS':'0',
    'FAILED' : '1' ,
    'SERVER_ERROR': '500',
    'USER_NOT_LOGIN':'99',//未登录
    'ACCOUT_BEN_BANNED': '10000004', //账号被禁用
    'LOGIN_SERVICE_ERROR': '10000001', //登录服务错误
    'WRONG_LOGIN_KEY':'10000002', //loginKey错误
    'WRONG_ACCOUNT_PASSWORD':'1000003', //帐号密码错误
    'EMPTY_ACCOUNT_ERROR':'1000004', //帐号为空错误
    'EMPTY_PASSWORD':'1000005' ,//密码为空错误
    'WRONG_OLdPASSWORD':'1000008',//旧密码错误
    'USER_NOT_EXIST1':'1000011',//用户不存在错误
    'USER_NOT_EXIST2':'2000004',//用户不存在
    'WRONG_NICKNAME':'2000011',  //2000011	昵称错误
    'WRONG_HEADPIC':'2000012',  //2000012	头像错误
    'NICKNAME_CONTAINS_KEYWORD':'2000009',  //2000009	昵称包含关键字
    'WRONG_BACK_OLDPASSWORD':'10000002',  //10000002	后台旧密码错误
    'WRONG_BACK_ROLE':'10000003',  // 10000003	后台权限错误
    'BANNED_BACK_USER':'10000004' , //10000004	后台用户禁用
    'BACK_DATA_EXIST':'10000005',  //10000005	后台数据已存在
    'FILE_OUTOF_MAXSIZE':'14000005',  //14000005    文件太大错误
    'WRONG_FILE_FORMAT':'14000006',  //14000006	文件格式错误
    'GIFT_NOT_FOUND':'9000001',  //9000001   礼物未找到
    'PRODUCT_NOT_FOUND':'9000002',  //9000002	商品未找到
    
};
// 提示信息
export const TIPS_INFO = {
    'SERVER_ERROR':'内部服务器错误',
    'USER_NOT_LOGIN' : '用户未登录',
    'PERMISSION_DENIED' : '没有权限！',
    'WRONG_OLdPASSWORD' :'旧密码错误',
    'ACCOUT_BEN_BANNED':'账号被禁用',
    'WRONG_ACCOUNT_PASSWORD':'账号密码错误',
    'WRONG_ACCOUNT_OR_PASSWORD':'用户名或者密码错误'

}

// 拿登录token
export function getToken(){
    return window.localStorage.getItem(TokenKey)
}
// 设置登录token
export function setToken(token){
    return localStorage.setItem(TokenKey,token)
}
//删除登录token
export function deleteToken(){
    return localStorage.removeItem(TokenKey);
}
//缓存用户信息
export function setUserInfoFromStorage(user){
    return localStorage.setItem(LocalUserKey,user);
}
//从缓存拿用户信息
export function getUserInfoFromStorage(){
    return localStorage.getItem(LocalUserKey);
}
//清空用户信息缓存
export function deleteUserInfoStorage(){
    return localStorage.removeItem(LocalUserKey)
}
//设置用户路由信息缓存
export function setRoutes(routes){
    return localStorage.setItem(UserRouteKey,routes)
}
//获取用户路由信息缓存
export function getRoutes(){
    return localStorage.getItem(UserRouteKey);
}
//清空用户路由信息
export function deleteRoutes(){
    return localStorage.removeItem(UserRouteKey);
}

// 获取语言
export function getLanguage(){
    return window.localStorage.getItem(LanguageKey)?JSON.parse(window.localStorage.getItem(LanguageKey)):''
}
// 设置语言
export function setLanguage(lgData){
    return localStorage.setItem(LanguageKey,JSON.stringify(lgData))
}

//根据语言Id获取语言
export function getLanguageNameById(id){
    let lg = getLanguage();
    let lgName = '';
    if(lg){
        lg.forEach(function(v,i){
            if(v["languageId"]==id){
                lgName=v['languageName'];
            }
        },this)
    }
    
    return lgName;
}

//根据语言获取内容数组
export function getDataObjsByLg(obj){

    let lg = getLanguage();
    let retObjs = [];
    if(lg){
        lg.forEach(function(v,i){
            var b = obj[v["languageId"]] || obj[v["languageId"]+''];
            if(b){
                var a = {
                    languageId:v["languageId"],
                    languageName:v["languageName"],
                    content:b
                }
                retObjs.push(a)
            }
        },this)
    }   
    return retObjs;
}

//获取上传地址
export function getUploadPath(){
    let path = config.MOCK_AUTH_UPLOAF+ 'manager/upload?r='+ (new Date().getTime())+'&token='+getToken()
    return path;
}
