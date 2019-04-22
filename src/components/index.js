/**
 * 路由组件出口文件
 * tse 2019年4月22日
 */
import {lazy} from "react";

import Loadable from 'react-loadable';
import Loading from './widget/Loading';


const BasicForm = lazy(() => import('./forms/BasicForm'));
const AdvancedTable = lazy(() => import('./tables/AdvancedTables'));
const AsynchronousTable = lazy(() => import('./tables/AsynchronousTable'));
const Echarts = lazy(() => import('./charts/Echarts'));
const Recharts = lazy(() => import('./charts/Recharts'));
const Buttons = lazy(() => import('./ui/Buttons'));
const Spins = lazy(() => import('./ui/Spins'));
const Modals = lazy(() => import('./ui/Modals'));
const Banners = lazy(() => import('./ui/banners'));
const Drags = lazy(() => import('./ui/Draggable'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const DEVhboard = lazy(() => import('./dashboard/DEVhboard'));
const Gallery = lazy(() => import('./ui/Gallery'));
const BasicAnimations = lazy(() => import('./animation/BasicAnimations'));
const AuthBasic = lazy(() => import('./auth/Basic'));
const RouterEnter = lazy(() => import('./auth/RouterEnter'));
const SimulatorUser = lazy(() => import('./customer/SimulatorUser'));
const IntendingUser = lazy(() => import('./pass/IntendingUser'));
const PotentialUser = lazy(() => import('./customer/PotentialUser'));
const CustomerSummary = lazy(() => import('./customer/CustomerSummary'));
const BlackList = lazy(() => import('./customer/BlackList'));
const AddUser = lazy(() => import('./pms/AddUser'));
const EditUser = lazy(() => import('./pms/EditUser'));
const TradeAccount = lazy(() => import('./trade/Account'));
const InComeMoney = lazy(() => import('./fina/IncomeMoney'));
const EditCha = lazy(() => import('./fina/EditCha'));
const EditExRate = lazy(() => import('./fina/EditExRate'));
const TeleMoney = lazy(() => import('./fina/TeleMoney'));
const TeleMoneySecond = lazy(() => import('./fina/TeleMoneySecond'));
const TeleMoneyThird = lazy(() => import('./fina/TeleMoneyThird'));
const OutMoneyJU = lazy(() => import('./fina/OutMoneyJU'));
const OutMoneyJUB = lazy(() => import('./fina/OutMoneyJUB'));
const OutMoneyJUC = lazy(() => import('./fina/OutMoneyJUC'));
const OutMoneyJUD = lazy(() => import('./fina/OutMoneyJUD'));
const OutMoney = lazy(() => import('./fina/OutMoney'));
const InOutTA = lazy(() => import('./fina/InOutTA'));
const ChannelMY = lazy(() => import('./fina/ChannelMY'));
const TradeDepart = lazy(() => import('./trade/Depart'));
const RoleSet = lazy(() => import('./pms/RoleSet'));
const OpLog = lazy(() => import('./pms/OpLog'));
const AddRole = lazy(() => import('./pms/AddRole'));
const EditRole = lazy(() => import('./pms/EditRole'));
const InnerUserList = lazy(() => import('./pms/InnerUserList'));
const CA = lazy(() => import('./fina/CA'));
const CAA = lazy(() => import('./fina/CAA'));
const CB = lazy(() => import('./fina/CB'));
const CC = lazy(() => import('./fina/CC'));
const CD = lazy(() => import('./fina/CD'));

const CustomerUserInfo = lazy(() => import('./customer/CustomerUserInfo'));

const PassOpen = lazy(() => import( './pass/Open'));
const PassOpenD = lazy(() => import( './pass/OpenD'));
const PassOpenS = lazy(() => import( './pass/OpenS'));
const PassOpenRS = lazy(() => import( './pass/OpenRS'));
const PassLever = lazy(() => import( './pass/Lever'));

const WhiteList = lazy(() => import('./customer/WhiteList'));


const WysiwygBundle = Loadable({ // 按需加载富文本配置
    loader: () => import('./ui/Wysiwyg'),
    loading: Loading,
});

export default {
    BasicForm,
    InnerUserList,
    CA,
    CAA,
    CB,
    CC,
    CD,
    RoleSet,
    OpLog,
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
    EditCha,
    EditExRate,
    AddRole,
    PassOpenRS,
    EditRole,
    OutMoneyJU,
    OutMoneyJUB,
    OutMoneyJUC,
    OutMoneyJUD,
    TradeAccount,
    InComeMoney,
    TeleMoney,
    TeleMoneySecond,
    TeleMoneyThird,
    OutMoney,
    InOutTA,
    ChannelMY,
    TradeDepart
}
