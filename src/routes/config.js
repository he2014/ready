export default {
    menus: [    // 菜单相关路由
        {
            key: '/app/userManage', title: '用户系统', icon: 'team',
            subs: [
                { key: '/app/userManage/user', title: '用户管理', component: 'User'},
                { key: '/app/userManage/opinion', title: '意见反馈', component: 'Opinion'},
                { key: '/app/userManage/robot', title: '机器人配置', component: 'Robot'},
            ],
        },
        {
            key: '/app/operate', title: '运营管理', icon: 'rocket',
            subs: [
                { key: '/app/operate/nationalCompetitionArea', title: '国家赛区管理', component: 'NationalCompetitionArea'},
                { key: '/app/operate/startPage', title: '启动页管理', component: 'StartPage'},
                { key: '/app/operate/dailyTasks', title: '日常任务管理', component: 'DailyTasks'},
                { key: '/app/operate/game', title: '游戏配置管理', component: 'Game'},
                { key: '/app/operate/invitingAwards', title: '邀请奖励管理', component: 'InvitingAwards'},
                { key: '/app/operate/message', title: '消息管理', component: 'Message'},
                { key: '/app/operate/appEdition', title: 'app版本管理', component: 'AppEdition'},
            ],
        },
        {
            key: '/app/recharge', title: '货币配置', icon: 'pay-circle-o',
            subs: [
                { key: '/app/recharge/recharge', title: '充值管理', component: 'Recharge'},
                { key: '/app/recharge/goldForDiamonds', title: '金币兑换钻石', component: 'GoldForDiamonds'},
                { key: '/app/recharge/diamondsForGold', title: '钻石兑换金币', component: 'DiamondsForGold'},
            ],
        },
        {
            key: '/app/cash', title: '提现管理', icon: 'trademark',
            subs: [
                { key: '/app/cash/withdrawCash', title: '提现处理', component: 'WithdrawCash'},
                { key: '/app/cash/ratioSet', title: '兑换比率配置', component: 'RatioSet'},
            ],
        },
        {
            key: '/app/customerService', title: '客服管理', icon: 'customer-service',
            subs: [
                { key: '/app/customerService/sensitiveLexicon', title: '敏感词库', component: 'SensitiveLexicon'},
                 { key: '/app/customerService/report', title: '举报管理', component: 'Report'},
            ],
        },
        {
            key: '/app/sysMange', title: '系统管理', icon: 'setting',
            subs: [
                { key: '/app/sysMange/sysUser', title: '系统用户管理', component: 'SysUser' },
                { key: '/app/sysMange/sysAuthority', title: '权限管理', component: 'SysAuthority' },
                { key: '/app/sysMange/sysMenuTypes', title: '菜单类别', component: 'SysMenuTypes' },
                { key: '/app/sysMange/sysMenuModule', title: '菜单模块', component: 'SysMenuModule' },
                
            ],
        },
    ],
    others: []  // 非菜单相关路由
}