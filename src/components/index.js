/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import BasicForm from './forms/BasicForm';
import BasicTable from './tables/BasicTables';
import AdvancedTable from './tables/AdvancedTables';
import AsynchronousTable from './tables/AsynchronousTable';
import Echarts from './charts/Echarts';
import Recharts from './charts/Recharts';
// import Icons from './ui/Icons';
import Buttons from './ui/Buttons';
import Spins from './ui/Spins';
import Modals from './ui/Modals';
import Notifications from './ui/Notifications';
import Tabs from './ui/Tabs';
import Banners from './ui/banners';
import Drags from './ui/Draggable';
import Dashboard from './dashboard/Dashboard';
import Gallery from './ui/Gallery';
import BasicAnimations from './animation/BasicAnimations';
import ExampleAnimations from './animation/ExampleAnimations';
import AuthBasic from './auth/Basic';
import RouterEnter from './auth/RouterEnter';
import PassOpen from './pass/Open';
import PassOpenD from './pass/OpenD';
import PassLever from './pass/Lever';

import SimulatorUser from './customer/SimulatorUser';
import IntendingUser from './pass/IntendingUser';
import PotentialUser from './customer/PotentialUser'
import CustomerSummary from './customer/CustomerSummary'
import BlackList from './customer/BlackList'
import WhiteList from './customer/WhiteList'
import CustomerUserInfo from './customer/CustomerUserInfo'
import TradeAccount from './trade/Account'
import TradeDepart from './trade/Depart'

//CustomerUserInfo
import Cssmodule from './cssmodule';
import MapUi from './ui/map';

const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    BasicForm, BasicTable, AdvancedTable, AsynchronousTable,
    Echarts, Recharts, Buttons, Spins, Modals, Notifications,
    Tabs, Banners, Drags,PassOpen,PassLever, Dashboard, Gallery, BasicAnimations,BlackList,WhiteList,
    ExampleAnimations, AuthBasic, RouterEnter, WysiwygBundle,PassOpenD,PotentialUser,SimulatorUser,IntendingUser,CustomerSummary
    ,CustomerUserInfo,TradeAccount,TradeDepart
}
