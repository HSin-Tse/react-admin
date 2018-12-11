/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Layout} from 'antd';
import {withRouter} from 'react-router-dom';
import routes from '../routes/config';
import routesConfigadmin from '../routes/configadmin';
import SiderMenu from './SiderMenu';
import avater from "../style/imgs/ixlogo.png";

const {Sider} = Layout;

class SiderCustom extends Component {

    constructor(props) {
        super(props);

        this.state = {
            config: [],
            visible: false,
            gallery: null,
            infor: JSON.parse(localStorage.getItem('infor')),
        }
    }

    // componentWillMount() {
    //     console.log('hcia SiderCustom componentWillMount' )
    //     // this.setState({config: routesConfigadmin});
    //
    // }


    static getDerivedStateFromProps(props, state) {
        if (props.collapsed !== state.collapsed) {
            const state1 = SiderCustom.setMenuOpen(props);
            const state2 = SiderCustom.onCollapse(props.collapsed);
            return {
                ...state1,
                ...state2,
                firstHide: state.collapsed !== props.collapsed && props.collapsed, // 两个不等时赋值props属性值否则为false
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
        console.log(collapsed);
        return {
            collapsed,
            // firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        };
    };
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        displayName: '',
        selectedKey: '',
        firstHide: false, // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
    };

    componentWillMount() {
        // console.log('hcia componentWillMount' )
        // this.setState({
        //     displayName: localStorage.getItem('displayName'),
        //     infor: JSON.parse(localStorage.getItem('infor'))
        // });
    }

    componentDidMount() {

        this.setState({
            infor: JSON.parse(localStorage.getItem('infor'))
        });
        console.log('hcia componentDidMount')


        const state = SiderCustom.setMenuOpen(this.props);
        // console.log('hcia state', state)
        // console.log('hcia infor', this.state.infor)
        // console.log('hcia routes', routes)


        if (this.state.infor == null) {
            this.setState({config: routes});

        } else if (this.state.infor.menuList.length == 0) {
            console.log('hcia', 'aaaaa')


            var setrr = {
                ...routes,
                menus: [{key: "/app/dashboard/index", title: "歡迎", icon: "user", component: "Dashboard"}]
            }

            console.log('hcia setrr', setrr)
            this.setState({config: setrr});

        } else if (this.state.infor != null) {
            console.log('hcia', 'bbbbb')


            var nowRouter = routes.menus.filter((key, index, array) => {
                var back = false
                this.state.infor.menuList.forEach(function (item, index, array) {


                    if (key.title == item.name) {
                        back = true
                    } else if (key.title == '歡迎') {
                        back = true
                    }

                });
                return back;
            });
            // routes.menus = nowRouter
            var setrr = {...routes, menus: nowRouter}
            this.setState({config: setrr});

        }


    }

    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        console.log(this.state);
        const {popoverHide} = this.props; // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        console.log(v);
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
                    <img style={{height: 50, width: 50}} src={avater} alt="头像"/>


                    {this.props.collapsed ? '' : 'CRM操作系统v1.0'}

                </div>
                <SiderMenu
                    menus={this.state.config.menus}
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