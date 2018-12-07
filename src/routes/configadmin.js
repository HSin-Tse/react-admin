export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '歡迎', icon: 'mobile', component: 'Dashboard' },
        // {
        //     key: '/app/pass', title: '审核管理', icon: 'safety',
        //     subs: [
        //         { key: '/app/pass/open', title: '开户审核', component: 'PassOpen' },
        //         { key: '/app/pass/lever', title: '杠杆审核', component: 'PassLever', auth: 'auth/testPage' },
        //         // {
        //         //     key: '/app/auth', title: '權限測試', icon: 'safety',
        //         //     subs: [
        //         //         { key: '/app/auth/basic', title: '开户审核', component: 'AuthBasic' },
        //         //     ],
        //         // },
        //     ],
        // },
        // // {
        //     key: '/app/customer', title: '用戶管理', icon: 'safety',
        //     subs: [
        //         { key: '/app/customer/PotentialUser', title: 'Lead管理', component: 'PotentialUser' },
        //         { key: '/app/customer/CustomerSummary', title: '用戶總表', component: 'CustomerSummary' },
        //         { key: '/app/customer/blacklist', title: '黑名單', component: 'BlackList' },
        //         { key: '/app/customer/whitelist', title: '白名單', component: 'WhiteList' },
        //
        //         // {
        //         //     key: '/app/auth', title: '權限測試', icon: 'safety',
        //         //     subs: [
        //         //         { key: '/app/auth/basic', title: '开户审核', component: 'AuthBasic' },
        //         //     ],
        //         // },
        //     ],
        // },

    ],

    others: 
        [ 
            {route: '/app/pass/passopen/detail:id', title: 'PassOpenD', icon: 'star', component: 'PassOpenD'},
            {route: '/app/customer/SimulatorUser', title: 'SimulatorUser', icon: 'star', component: 'SimulatorUser'},
            {route: '/app/pass/IntendingUser', title: 'IntendingUser', icon: 'star', component: 'IntendingUser'},
            {route: '/app/customer/PotentialUser', title: 'PotentialUser', icon: 'star', component: 'PotentialUser'},
            { route: '/app/customer/CustomerUserInfo:id', title: 'CustomerUserInfo', icon: 'star', component: 'CustomerUserInfo'}

        ] // 非菜单相关路] // 非菜单相关路由//CustomerUserInfo
}
