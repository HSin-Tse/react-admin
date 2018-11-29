export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '歡迎', icon: 'mobile', component: 'Dashboard' },
        {
            key: '/app/pass', title: '审核管理', icon: 'safety',
            subs: [
                { key: '/app/pass/open', title: '开户审核', component: 'PassOpen' },
                { key: '/app/pass/lever', title: '杠杆审核', component: 'PassLever', auth: 'auth/testPage' },
                // {
                //     key: '/app/auth', title: '權限測試', icon: 'safety',
                //     subs: [
                //         { key: '/app/auth/basic', title: '开户审核', component: 'AuthBasic' },
                //     ],
                // },
            ],
        },
        {
            key: '/app/customer', title: '用戶管理', icon: 'safety',
            subs: [
                { key: '/app/customer/PotentialUser', title: 'Lead管理', component: 'PotentialUser' },
                { key: '/app/customer/CustomerSummary', title: '用戶總表', component: 'CustomerSummary' },
                { key: '/app/customer/blacklist', title: '黑名單', component: 'BlackList' },
                { key: '/app/customer/whitelist', title: '白名單', component: 'WhiteList' },

                // {
                //     key: '/app/auth', title: '權限測試', icon: 'safety',
                //     subs: [
                //         { key: '/app/auth/basic', title: '开户审核', component: 'AuthBasic' },
                //     ],
                // },
            ],
        },

        // ,
        // {
        //     key: '/app/ui', title: 'UI', icon: 'scan',
        //     subs: [
        //         { key: '/app/ui/buttons', title: '按钮', component: 'Buttons'},
        //         { key: '/app/ui/icons', title: '图标', component: 'Icons'},
        //         { key: '/app/ui/spins', title: '加载中', component: 'Spins'},
        //         { key: '/app/ui/modals', title: '对话框', component: 'Modals'},
        //         { key: '/app/ui/notifications', title: '通知提醒框', component: 'Notifications'},
        //         { key: '/app/ui/tabs', title: '标签页', component: 'Tabs'},
        //         { key: '/app/ui/banners', title: '轮播图', component: 'Banners'},
        //         { key: '/app/ui/wysiwyg', title: '富文本', component: 'WysiwygBundle'},
        //         { key: '/app/ui/drags', title: '拖拽', component: 'Drags'},
        //         { key: '/app/ui/gallery', title: '画廊', component: 'Gallery'},
        //         { key: '/app/ui/map', title: '地图', component: 'MapUi'},
        //     ],
        // },
        // {
        //     key: '/app/animation', title: '动画', icon: 'rocket',
        //     subs: [
        //         { key: '/app/animation/basicAnimations', title: '基础动画', component: 'BasicAnimations'},
        //         { key: '/app/animation/exampleAnimations', title: '动画案例', component: 'ExampleAnimations'},
        //     ],
        // },
        // {
        //     key: '/app/form', title: '表单', icon: 'edit',
        //     subs: [
        //         { key: '/app/form/basicForm', title: '基础表单', component: 'BasicForm'},
        //     ],
        // },
        // {
        //     key: '/app/chart', title: '图表', icon: 'area-chart',
        //     subs: [
        //         { key: '/app/chart/echarts', title: 'echarts', component: 'Echarts' },
        //         { key: '/app/chart/recharts', title: 'recharts', component: 'Recharts' },
        //     ],
        // },
        // {
        //     key: '/subs4', title: '页面', icon: 'switcher',
        //     subs: [
        //         { key: '/login', title: '登录' },
        //         { key: '/404', title: '404' },
        //     ],
        // },
        // {
        //     key: '/app/auth', title: '權限測試', icon: 'safety',
        //     subs: [
        //         { key: '/app/auth/basic', title: '开户审核', component: 'AuthBasic' },
        //         { key: '/app/auth/routerEnter', title: '开户审核', component: 'RouterEnter', auth: 'auth/testPage' },
        //     ],
        // },
        //
        // {
        //     key: '/app/cssModule', title: 'cssModule', icon: 'star', component: 'Cssmodule'
        // },
    ],

    others: 
        [ 
            {route: '/app/pass/passopen/detail:id', title: 'PassOpenD', icon: 'star', component: 'PassOpenD'},
            {route: '/app/customer/SimulatorUser', title: 'SimulatorUser', icon: 'star', component: 'SimulatorUser'},
            {route: '/app/pass/IntendingUser', title: 'IntendingUser', icon: 'star', component: 'IntendingUser'},
            {route: '/app/customer/PotentialUser', title: 'PotentialUser', icon: 'star', component: 'PotentialUser'}

        ] // 非菜单相关路] // 非菜单相关路由
}
