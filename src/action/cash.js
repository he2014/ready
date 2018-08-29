/**
 * 提现设置
 */
import axios from '../axios/utils';
import * as config from '../axios/config';
/*
  *------------------提现管理-------------------------------------
 */

//获取提现管理列表
export const getCashLists = params => { return axios.get(`/manager/cash/flow/query`,{params: params } ); };
//获取提现详情
export const getCashInfo = params => { return axios.get(`/manager/cash/flow/detail`,{params: params } ); };
// 设置提现状态
export const setCashSave = params => {return axios.post(`/manager/cash/flow/update`, params) };

/*
  *------------------提现比率配置-------------------------------------
 */
//获取提现比率配置详情
export const getRatioInfo = params => { return axios.get(`/manager/cash/base/query` ); };
// 删除提现管理保存
export const updateRatioSave = params => {return axios.post(`/manager/cash/base/update`, params) };

