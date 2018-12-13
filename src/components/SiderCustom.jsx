/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Layout} from 'antd';
import {withRouter} from 'react-router-dom';
import routes from '@/routes/config';
import SiderMenu from './SiderMenu';
import avater from "../style/imgs/ixlogo.png";

const {Sider} = Layout;

class SiderCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cconfig: [],
            visible: false,
            gallery: null,
            infor: JSON.parse(localStorage.getItem('infor')),
        }
    }

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
        // console.log(collapsed);
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
        // console.log('hcia  SiderCustom componentWillMount')
    }

    componentDidMount() {
        // console.log('hcia  SiderCustom componentDidMount')


        var bbRouter = {...routes}
        // var bbRouter = Immutable.fromJS(routes);

        if (this.state.infor == null) {
            // console.log('hcia', 'Side ccc')

            this.setState({cconfig: bbRouter});

        } else if (this.state.infor.menuList.length == 0) {

            // console.log('hcia', 'Side aaaa')

            var setrr = {
                ...bbRouter,
                menus: [{key: "/app/dashboard/index", title: "歡迎", icon: "user", component: "Dashboard"}]
            }

            // console.log('hcia setrr', setrr)
            this.setState({cconfig: setrr});

        } else if (this.state.infor != null) {


            // this.setState({cconfig: bbRouter});

            // console.log('hcia routes' , routes)
            // console.log('hcia bbRouter' , bbRouter)

            // console.log('hcia', 'Side bbbbb',this.state.infor)
            var nowRouter = bbRouter.menus.filter((key, index, array) => {


                if (key.subs) {
                    // console.log('hcia key A', key.title)


                    var ssb = key.subs.filter((sbkey, index, array) => {
                        // console.log('hcia sbkey' , sbkey.title)


                        var back = false


                        this.state.infor.menuList.forEach(function (item, index, array) {

                            // console.log('hcia sbkey.title', sbkey.title, item.name, (sbkey.title == item.name))

                            if (sbkey.title == item.name) {
                                back = true
                            }

                        });
                        return back

                    })
                    var repk = {...key, subs: ssb}
                    key=repk

                }else{
                    // console.log('hcia key B', key.title)
                }
                if (key.title == '歡迎') {
                    return true
                }


                return key.subs.length > 0;
            });


            var setrr = {...bbRouter, menus: nowRouter}
            this.setState({cconfig: setrr});


        }
        // this.setState({cconfig: bbRouter});


    }

    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        // console.log(this.state);
        const {popoverHide} = this.props; // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        // console.log(v);
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