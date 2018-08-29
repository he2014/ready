/**
 * 登录
 */
import axios from '../axios/utils';
import * as config from '../axios/config';

// 语言列表
export const getLanguages = params => {return axios.get(`/manager/language`,{params: params})}