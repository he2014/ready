/**
 * 运营管理
 */
import axios from '../axios/utils';
import * as config from '../axios/config';

/*
  *------------------国家赛区管理-------------------------------------
 */

//获取国家赛区管理列表
export const getCountryZoneLists = params => { return axios.get(`/manager/gameCountryZone/page`,{params: params } ); };
// 新建国家赛区管理保存
export const addCountryZoneSave = params => {return axios.post(`/manager/gameCountryZone/add`, params) };
// 编辑国家赛区管理保存
export const updateCountryZoneSave = params => {return axios.post(`/manager/gameCountryZone/update`, params) };
// 删除国家赛区管理保存
export const deleteCountryZoneSave = params => {return axios.post(`/manager/gameCountryZone/delete`, params) };


/*
  *------------------启动页-------------------------------------
 */

//获取启动页列表
export const getStartLists = params => { return axios.get(`/manager/start/page`,{params: params } ); };
// 新建启动页保存
export const addStartSave = params => {return axios.post(`/manager/start/add`, params) };
// 编辑启动页保存
export const updateStartSave = params => {return axios.post(`/manager/start/update`, params) };
// 删除启动页保存
export const deleteStartSave = params => {return axios.post(`/manager/start/delete`, params) };
// 发布
export const publishStart = params => {return axios.post(`/manager/start/publish`, params) };

/*
  *------------------日常任务-------------------------------------
 */

//获取日常任务列表
export const getDailyTaskLists = params => { return axios.get(`/manager/dailyTask/page`,{params: params } ); };
// 新建日常任务保存
export const addDailySave = params => {return axios.post(`/manager/dailyTask/add`, params) };
// 编辑日常任务保存
export const updateDailySave = params => {return axios.post(`/manager/dailyTask/update`, params) };
// 删除日常任务保存
export const deleteDailySave = params => {return axios.post(`/manager/dailyTask/delete`, params) };
// 新建每日签到
export const addDailySetSave = params => {return axios.post(`/manager/dailyTask/add`, params) };
// 新建日常任务保存
export const getDailySetInfo = params => { return axios.get(`/manager/dailyTask/getInfo`,{params: params } ); };

/*
  *------------------游戏配置管理-------------------------------------
 */

//获取游戏配置管理列表
export const getGameLists = params => { return axios.get(`/manager/game/page`,{params: params } ); };
// 新建游戏配置管理保存
export const addGameSave = params => {return axios.post(`/manager/game/add`, params) };
// 编辑游戏配置管理保存
export const updateGameSave = params => {return axios.post(`/manager/game/update`, params) };
// 删除游戏配置管理保存
export const deleteGameSave = params => {return axios.post(`/manager/game/delete`, params) };
// 发布
export const publishGame = params => {return axios.post(`/manager/game/publish`, params) };

/*
  *------------------邀请奖励管理-------------------------------------
 */

//获取邀请奖励管理列表
export const getInvitLists = params => { return axios.get(`/manager/invit/page`,{params: params } ); };
// 新建邀请奖励管理保存
export const addInvitSave = params => {return axios.post(`/manager/invit/add`, params) };
// 编辑邀请奖励管理保存
export const updateInvitSave = params => {return axios.post(`/manager/invit/update`, params) };
// 删除邀请奖励管理保存
export const deleteInvitSave = params => {return axios.post(`/manager/invit/delete`, params) };


/**
 *  --------------------站内信管理-------------------------------------------------
 *
 */
//获取站内信列表
export const getMessage = params => {return axios.get(`/manager/inMailJobInfo/listQueryInMailJoBInfo`, {params: params})}
//新建站内消息
export const addMessageSave = params => {return axios.post(`/manager/inMailJobInfo/createInMailJoBInfo`, params)}
//编辑站内消息
export const updateMessageSave = params => {return axios.post
(`/manager/inMailJobInfo/editInMailJoBInfo` ,params)}
//查看站内消息
export const getMessageInfo = params => {return axios.post
(`/manager/inMailJobInfo/selectInMailJobInfoEntityById` ,params)}
//删除消息
export const delMessage = params => {return axios.post(`/manager/inMailJobInfo/deleteInMailJobInfo`, params)}
//发送消息
export const sendMessage = params => {return axios.post(`/manager/inMailJobInfo/sendInMail`, params)}

/**
 *  --------------------app版本管理-------------------------------------------------
 *
 */
//查询版本列表
export const getVersions = params => {return axios.get(`/manager/app_version/search` ,{params: params})}
//添加版本
export const addVersions = params => {return axios.post(`/manager/app_version/add` , params)}
//修改版本
export const updateVersions = params => {return axios.post(`/manager/app_version/update` , params)}
//删除版本
export const delVersions = params => {return axios.post(`/manager/app_version/delete` , params)}