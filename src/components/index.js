/**
 * 路由组件出口文件
 * yezi 2018年6月24日
 */
import Loadable from 'react-loadable';
import Loading from './widget/Loading';
import BasicForm from './forms/BasicForm';
import AdvancedTable from './tables/AdvancedTables';
import AsynchronousTable from './tables/AsynchronousTable';
import Echarts from './charts/Echarts';
import Recharts from './charts/Recharts';
import Buttons from './ui/Buttons';
import Spins from './ui/Spins';
import Modals from './ui/Modals';
import Banners from './ui/banners';
import Drags from './ui/Draggable';
import Dashboard from './dashboard/Dashboard';
import DEVhboard from './dashboard/DEVhboard';
import Gallery from './ui/Gallery';
import BasicAnimations from './animation/BasicAnimations';
import AuthBasic from './auth/Basic';
import RouterEnter from './auth/RouterEnter';
import PassOpen from './pass/Open';
import PassOpenD from './pass/OpenD';
import PassOpenS from './pass/OpenS';
import PassOpenRS from './pass/OpenRS';
import PassLever from './pass/Lever';

import SimulatorUser from './customer/SimulatorUser';
import IntendingUser from './pass/IntendingUser';
import PotentialUser from './customer/PotentialUser'
import CustomerSummary from './customer/CustomerSummary'
import BlackList from './customer/BlackList'
import WhiteList from './customer/WhiteList'
import CustomerUserInfo from './customer/CustomerUserInfo'
import AddUser from './pms/AddUser'
import EditUser from './pms/EditUser'
import TradeAccount from './trade/Account'
import TradeDepart from './trade/Depart'
import RoleSet from './pms/RoleSet'
import AddRole from './pms/AddRole'
import EditRole from './pms/EditRole'
import InnerUserList from './pms/InnerUserList'


const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    BasicForm,
    InnerUserList,
    RoleSet,
    AdvancedTable,
    AsynchronousTable,
    Echarts,
    Recharts,
    Buttons,
    Spins,
    Modals,
    Banners,
    Drags,
    PassOpen,
    PassLever,
    Dashboard,
    Gallery,
    BasicAnimations,
    BlackList,
    WhiteList,
    AuthBasic,
    RouterEnter,
    WysiwygBundle,
    PassOpenD,
    PassOpenS,
    PotentialUser,
    SimulatorUser,
    IntendingUser,
    CustomerSummary,
    CustomerUserInfo,
    AddUser,
    EditUser,
    DEVhboard,
    AddRole,
    PassOpenRS,
    EditRole,
    TradeAccount,
    TradeDepart
}
