/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from '../axios/utils';
import * as config from '../axios/config';

//用户管理
export const getUsers= params => {return axios.get(`/manager/user/page` ,{params: params})};
//修改用户昵称
export const changeUserName = params => {return axios.post(`/manager/user/update/nick/${params.userId}`,params)};
//修改用户生日
export const changeBday = params => {return axios.post(`/manager/user/update/birthday/${params.userId}`,params)};
//修改用户头像
export const changeUserHeaderPic = params => {return axios.post(`/manager/user/update/headpic/${params.userId}`,params)};
