export default {
    menus: [ // 菜单相关路由
        {
            tk: 'dash', key: '/app/dashboard/index',
            title: '歡迎', icon: 'user', component: 'Dashboard'
        },
        {
            tk: 'SERVICE_GROUP_MGMT', key: '/app/customer', title: '用户管理', icon: 'team',
            subs: [
                {
                    tk: 'SERVICE_GROUP_MGMT',
                    key: '/app/customer/PotentialUser',
                    title: 'Leads管理',
                    component: 'PotentialUser'
                },
                {
                    tk: 'SERVICE_GROUP_MGMT',
                    key: '/app/customer/CustomerSummary',
                    title: '用户总表',
                    component: 'CustomerSummary'
                },
                {tk: 'SERVICE_GROUP_MGMT', key: '/app/customer/blacklist', title: '黑名单', component: 'BlackList'},
                {tk: 'SERVICE_GROUP_MGMT', key: '/app/customer/whitelist', title: '白名单', component: 'WhiteList'},
            ],
        },
        {
            tk: 'SERVICE_GROUP_MGMT', key: '/app/pass', title: '审核管理', icon: 'safety',
            subs: [
                {tk: 'OPEN_AUDIT_LIST', key: '/app/pass/open', title: '开户审核', component: 'PassOpen'},
                {tk: 'SERVICE_GROUP_MGMT', key: '/app/pass/lever', title: '杠杆审核', component: 'PassLever'},

            ],
        },

        {
            tk: 'SERVICE_GROUP_MGMT', key: '/app/trade', title: '交易管理', icon: 'safety',
            subs: [
                {tk: 'SERVICE_GROUP_MGMT', key: '/app/trade/account', title: '交易账户管理', component: 'TradeAccount'},
                // {tk: 'SERVICE_GROUP_MGMT', key: '/app/trade/depart', title: '組管理', component: 'TradeDepart'},
            ],
        },

        {
            tk: 'SERVICE_GROUP_MGMT', key: '/app/pms', title: '权限管理', icon: 'safety',
            subs: [
                {tk: 'SERVICE_GROUP_MGMT', key: '/app/pms/inneruserlist', title: '内部成员配置', component: 'InnerUserList'},
                {tk: 'SERVICE_GROUP_MGMT', key: '/app/pms/roleset', title: '角色配置', component: 'RoleSet'},
                // {tk:'SERVICE_GROUP_MGMT,key: '/app/pms/rolelog', title: '操作日志', component: 'RoleLog'},

            ],
        },

    ],

    others:
        [
            {
                route: '/app/pass/passopen/detail:id',
                tk: 'OPEN_AUDIT_LIST',
                title: 'PassOpenD',
                icon: 'star',
                component: 'PassOpenD'
            },
            {
                route: '/app/pass/passopenrs/detail:id',
                tk: 'tk',
                title: 'PassOpenRS',
                icon: 'star',
                component: 'PassOpenRS'
            },
            {route: '/app/pass/passopen/user:id', tk: 'tk', title: 'PassOpenS', icon: 'star', component: 'PassOpenS'},
            {
                route: '/app/customer/SimulatorUser',
                tk: 'tk',
                title: 'SimulatorUser',
                icon: 'star',
                component: 'SimulatorUser'
            },
            {
                route: '/app/pass/IntendingUser',
                tk: 'tk',
                title: 'IntendingUser',
                icon: 'star',
                component: 'IntendingUser'
            },

            {
                route: '/app/customer/CustomerUserInfo:id',
                tk: 'tk', title: 'CustomerUserInfo',
                icon: 'star',
                component: 'CustomerUserInfo'
            },
            {
                route: '/app/pms/adduser:id',
                tk: 'tk', title: 'AddUser',
                icon: 'star',
                component: 'AddUser'
            }, {
            route: '/app/pms/edituser:id',
            tk: 'tk', title: 'EditUser',
            icon: 'star',
            component: 'EditUser'
        }, {
            route: '/app/pms/addrole:id',
            tk: 'tk', title: 'AddRole',
            icon: 'star',
            component: 'AddRole'
        }, {
            route: '/app/pms/editrole:id',
            tk: 'tk', title: 'EditRole',
            icon: 'star',
            component: 'EditRole'
        },
        ]
}
