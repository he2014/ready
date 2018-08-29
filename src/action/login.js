/**
 * 登录
 */
import axios from '../axios/utils';
import * as config from '../axios/config';

//用户登录
export function requestLogin(params){
    return axios.post('/manager/admin/user/login',params);
}
