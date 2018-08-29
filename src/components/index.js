/**
 * 路由组件出口文件
 *
 */
import React from 'react';

import User from './userManage/user';
import Opinion from './userManage/opinion';
import Robot from './userManage/robot';

import NationalCompetitionArea from './operate/nationalCompetitionArea';
import StartPage from './operate/startPage';
import DailyTasks from './operate/dailyTasks';
import Game from './operate/game';
import InvitingAwards from './operate/invitingAwards';
import Message from './operate/message';
import AppEdition from './operate/appEdition';

import Recharge from './recharge/recharge';
import GoldForDiamonds from './recharge/goldForDiamonds';
import DiamondsForGold from './recharge/diamondsForGold';

import SensitiveLexicon from './customerService/sensitiveLexicon';
import Report from './customerService/report';

import SysUser from './sysMange/sysUser';
import SysAuthority from './sysMange/sysAuthority';
import SysMenuTypes from './sysMange/sysMenuTypes';
import SysMenuModule from './sysMange/sysMenuModule';

import WithdrawCash from './cash/withdrawCash';
import RatioSet from './cash/ratioSet';

export default {
    User,Opinion,Robot,
    NationalCompetitionArea,StartPage,DailyTasks,Game,InvitingAwards,Message,AppEdition,
    Recharge,GoldForDiamonds,DiamondsForGold,
    SensitiveLexicon,Report,
    SysUser,SysAuthority,SysMenuTypes,SysMenuModule,
    WithdrawCash,RatioSet,
}