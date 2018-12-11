export default {
    menus: [ // 菜单相关路由
        {key: '/app/dashboard/index', title: '歡迎', icon: 'user', component: 'Dashboard'},
        {
            key: '/app/customer', title: '用户管理', icon: 'team',
            subs: [
                {key: '/app/customer/PotentialUser', title: 'Lead管理', component: 'PotentialUser'},
                {key: '/app/customer/CustomerSummary', title: '用戶總表', component: 'CustomerSummary'},

                {key: '/app/customer/blacklist', title: '黑名單', component: 'BlackList'},
                {key: '/app/customer/whitelist', title: '白名單', component: 'WhiteList'},
            ],
        },
        {
            key: '/app/pass', title: '审核管理', icon: 'safety',
            subs: [
                {key: '/app/pass/open', title: '开户审核', component: 'PassOpen'},
                {key: '/app/pass/lever', title: '杠杆审核', component: 'PassLever'},

            ],
        },

        {
            key: '/app/trade', title: '交易管理', icon: 'safety',
            subs: [
                {key: '/app/trade/account', title: '交易账户管理', component: 'TradeAccount'},
                {key: '/app/trade/depart', title: '組管理', component: 'TradeDepart'},

            ],
        },

        {
            key: '/app/pms', title: '权限管理', icon: 'safety',
            subs: [
                {key: '/app/pms/innerman', title: '内部成员配置', component: 'InnerMan'},
                {key: '/app/pms/roleset', title: '角色配置', component: 'RoleSet'},
                // {key: '/app/pms/rolelog', title: '操作日志', component: 'RoleLog'},

            ],
        },

    ],

    others:
        [
            {route: '/app/pass/passopen/detail:id', title: 'PassOpenD', icon: 'star', component: 'PassOpenD'},
            {route: '/app/pass/passopen/user:id', title: 'PassOpenS', icon: 'star', component: 'PassOpenS'},
            {route: '/app/customer/SimulatorUser', title: 'SimulatorUser', icon: 'star', component: 'SimulatorUser'},
            {route: '/app/pass/IntendingUser', title: 'IntendingUser', icon: 'star', component: 'IntendingUser'},
            {route: '/app/customer/PotentialUser', title: 'PotentialUser', icon: 'star', component: 'PotentialUser'},
            {
                route: '/app/customer/CustomerUserInfo:id',
                title: 'CustomerUserInfo',
                icon: 'star',
                component: 'CustomerUserInfo'
            },
            {
                route: '/app/pms/adduser:id',
                title: 'RoleAddUser',
                icon: 'star',
                component: 'RoleAddUser'
            },
        ]
}
