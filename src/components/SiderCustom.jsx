/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Layout} from 'antd';
import {withRouter} from 'react-router-dom';
import routesAD from '@/routes/config';
import SiderMenu from './SiderMenu';
import avaters from "../style/imgs/ixlogo.png";
import avater from "../style/imgs/ixlogolong.png";
import * as Immutable from 'immutable';

const {Sider} = Layout;

class SiderCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cconfig: [],
            visible: false,
            gallery: null,
            infor: JSON.parse(localStorage.getItem('infor')),
            collapsed: false,
            mode: 'inline',
            openKey: '',
            displayName: '',
            selectedKey: '',
            firstHide: false,
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.collapsed !== state.collapsed) {
            const state1 = SiderCustom.setMenuOpen(props);
            const state2 = SiderCustom.onCollapse(props.collapsed);
            return {
                ...state1,
                ...state2,
                firstHide: state.collapsed !== props.collapsed && props.collapsed,
                openKey: state.openKey || (!props.collapsed && state1.openKey)
            }
        }
        return null;
    }

    static setMenuOpen = props => {
        const {pathname} = props.location;
        return {
            openKey: pathname.substr(0, pathname.lastIndexOf('/')),
            selectedKey: pathname
        };
    };
    static onCollapse = (collapsed) => {
        // console.log(collapsed);
        return {
            collapsed,
            // firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        };
    };

    isObject = (obj) => {
        return typeof obj === 'object';
    }

    isArray = (arr) => {
        return Array.isArray(arr);
    }
    deepClone = (obj) => {
        if (!this.isObject(obj)) return obj;
        var cloneObj = this.isArray(obj) ? [] : {};

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var value = obj[key];
                var copy = value;

                if (this.isObject(value)) {
                    cloneObj[key] = this.deepClone(value);
                } else {
                    cloneObj[key] = value;
                }
            }
        }
        return cloneObj;
    }
    handleKeyPress = (event) => {

        // console.log('hcia event' , event)

        var self = this

        if (event.metaKey || event.ctrlKey) {
            if (event.key === '1') {
                this.setState({
                    openKey: '/app/customer',
                    selectedKey: '/app/customer/PotentialUser'

                })
                this.props.history.replace('/app/customer/PotentialUser')

            }
            if (event.key === '2') {
                this.setState({
                    openKey: '/app/customer',
                    selectedKey: '/app/customer/CustomerSummary'

                })
                this.props.history.replace('/app/customer/CustomerSummary')
            }
            if (event.key === '3') {
                this.setState({
                    openKey: '/app/customer',
                    selectedKey: '/app/customer/blacklist'

                })
                this.props.history.replace('/app/customer/blacklist')
            }

            if (event.key === '4') {
                this.setState({
                    openKey: '/app/customer',
                    selectedKey: '/app/customer/whitelist'

                })
                this.props.history.replace('/app/customer/whitelist')
            }
            if (event.key === '5') {
                this.setState({
                    openKey: '/app/pass',
                    selectedKey: '/app/pass/open'

                })
                this.props.history.replace('/app/pass/open')
            }
            if (event.key === '6') {
                this.setState({
                    openKey: '/app/pass',
                    selectedKey: '/app/pass/lever'

                })
                this.props.history.replace('/app/pass/lever')
            }
            if (event.key === '7') {
                this.setState({
                    openKey: '/app/trade',
                    selectedKey: '/app/trade/account'

                })
                this.props.history.replace('/app/trade/account')
            }

            if (event.key === '8') {
                this.setState({
                    openKey: '/app/pms',
                    selectedKey: '/app/pms/inneruserlist'

                })
                this.props.history.replace('/app/pms/inneruserlist')
            }
            if (event.key === '9') {
                this.setState({
                    openKey: '/app/pms',
                    selectedKey: '/app/pms/roleset'

                })
                this.props.history.replace('/app/pms/roleset')
            }


            if (event.key === 'a') {
                this.setState({
                    openKey: '/app/customer'
                })
            }
            if (event.key === 's') {
                this.setState({
                    openKey: '/app/pass'
                })
            }
            if (event.key === 'd') {
                this.setState({
                    openKey: '/app/trade'
                })
            }
            if (event.key === 'f') {
                this.setState({
                    openKey: '/app/pms'
                })
            }
            if (event.key === 'c') {
                this.setState({
                    openKey: ''
                })
            }
        }
        // console.log('hcia event' , event)


    }
    sda = setInterval(() => {
        // console.log('hcia setInterval' + new Date().getTime())
        // this.requestData()
        // this.requestPageWinoRe()


        // localStorage.removeItem('infor');

        localStorage.setItem('liveecho', new Date().getTime());
        var lastLoginTime = localStorage.getItem('logint');


        var loginDura = new Date().getTime() - lastLoginTime
        // var loginDura=  nowTime-lastLoginTime
        //   console.log('hcia window.location.host' , window.location.host)
        //   console.log('hcia loginDura' , loginDura)


        if (loginDura > 86400000) {
            localStorage.removeItem('infor');
            localStorage.removeItem('user');
            localStorage.removeItem('too');
            localStorage.removeItem('displayName');
            this.props.history.push('/login')

        }

        // if()

    }, 1000)

    jugeTime = setInterval(() => {
        //   console.log('hcia setInterval'+new Date().getTime())
        //   // this.requestData()
        //   // this.requestPageWinoRe()
        //
        //
        //   // localStorage.removeItem('infor');
        //
        //   // localStorage.setItem('liveecho', new Date().getTime()-);
        //
        // var  liveTag=localStorage.getItem('liveecho')
        //
        // var inttevar = new Date().getTime()-liveTag
        //
        //   console.log('hcia inttevar' , inttevar)


    }, 1000)

    // componentWillUnmount() {
    // document.removeEventListener("keydown", this.handleKeyPressOOP, false);
    // }
    logout = () => {
        // localStorage.setItem('infor', JSON.stringify(response.data.data));
        // localStorage.setItem('displayName', response.data.data.displayName);
        // localStorage.setItem('loginName', response.data.data.loginName);
        // localStorage.setItem('too', response.data.data.token);

        var self = this

        window.Axios.post('back/addLogHistory', {
            'moduleLog': 'logout',
            'pageLog': 'logout',
            'commentLog': 'logout',
            'typeLog': 1,
        }).then(function (response) {
            localStorage.removeItem('infor');
            localStorage.removeItem('user');
            localStorage.removeItem('too');
            localStorage.removeItem('displayName');

            self.props.history.push('/login')


        }).catch(error => {
            localStorage.removeItem('infor');
            localStorage.removeItem('user');
            localStorage.removeItem('too');
            localStorage.removeItem('displayName');

            self.props.history.push('/login')

            console.log('Error', error);
        })


    };

    componentWillUnmount() {
        // console.log('hcia componentWillUnmount')
        clearInterval(this.sda);
        clearInterval(this.jugeTime);

        document.removeEventListener("keydown", this.handleKeyPress, false);


        this.props.history.push('/login')
        // document.removeEventListener("keyup", this.handleKeyPress, false);
    }

    componentDidMount() {


        var gogogo = window.location.protocol + '//' + window.location.host + "/build/#/login"
        var liveTag = localStorage.getItem('liveecho')

        var inttevar = new Date().getTime() - liveTag

        console.log('hcia inttevar', inttevar)


        if (inttevar > 7 * 1000) {

            // console.log('hcia inttevar', inttevar)

            localStorage.removeItem('infor');
            localStorage.removeItem('user');
            localStorage.removeItem('too');
            localStorage.removeItem('displayName');
            // self.props.history.push('/login')

        } else {
            // console.log('hcia inttevar', inttevar)

        }


        document.addEventListener("keydown", this.handleKeyPress, false);
        if (!this.state.infor) {
            return
        }
        var inforSuperFlag = this.state.infor.superFlag

        var inforMenuList = this.state.infor.menuList

        if (inforSuperFlag === 1) {
            var imuRou = Immutable.Map(routesAD).toObject()
            this.setState({cconfig: imuRou});
            return
        }

        var bbRouter = this.deepClone(routesAD);


        var aaaaa = [...bbRouter.menus]
        var nowRouter = aaaaa.filter((key, index, array) => {
            if (key.title == '欢迎') {
                return true
            }
            if (key.title == 'dev') {
                return false
            }
            if (key.subs) {

                var ssb = key.subs.filter((sbkey, index, array) => {
                    var back = false

                    inforMenuList.forEach((item, index, array) => {

                        if (sbkey.tk == item.key) {
                            back = true
                        }
                    });
                    return back
                })

                key.subs = ssb

            }
            return key.subs.length > 0;
        });

        var setrr = {...bbRouter, menus: nowRouter}
        this.setState({cconfig: setrr});

    }

    menuClick = e => {


        this.setState({
            selectedKey: e.key
        });
        const {popoverHide} = this.props;
        popoverHide && popoverHide();
    };
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };

    render() {
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{overflowY: 'auto'}}
            >


                <div className="logo">
                    <img style={{height: 18 * 1.3, width: 130 * (this.props.collapsed ? 0 : 1.3)}} src={avater}
                         alt="头像"/>
                    <img style={{height: 45, width: 45 * (this.props.collapsed ? 1 : 0)}} src={avaters} alt="头像"/>

                    {this.props.collapsed ? '' : ''}


                </div>
                <SiderMenu
                    menus={this.state.cconfig.menus}
                    onClick={this.menuClick}
                    mode="inline"
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.firstHide ? null : [this.state.openKey]}
                    onOpenChange={this.openMenu}
                />
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

export default withRouter(SiderCustom);