/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Menu, Icon, Layout, Badge, Popover} from 'antd';
import screenfull from 'screenfull';
import {gitOauthToken, gitOauthInfo} from '../axios';
import {queryString} from '../utils';
import avater from '../style/imgs/b1.jpg';
import SiderCustom from './SiderCustom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
    state = {
        user: '',
        displayName: '',
        visible: false,
    };

    componentDidMount() {
        const QueryString = queryString();

        const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        if (!_user && QueryString.hasOwnProperty('code')) {
            gitOauthToken(QueryString.code).then(res => {
                gitOauthInfo(res.access_token).then(info => {
                    this.setState({
                        user: info
                    });
                    localStorage.setItem('user', JSON.stringify(info));
                });
            });
        } else {
            this.setState({
                user: _user
            });
        }


        // this.setState({displayName: localStorage.getItem('displayName')});
        this.setState({displayName: localStorage.getItem('loginName')});

    };

    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }

    };
    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        // localStorage.setItem('infor', JSON.stringify(response.data.data));
        // localStorage.setItem('displayName', response.data.data.displayName);
        // localStorage.setItem('loginName', response.data.data.loginName);
        // localStorage.setItem('too', response.data.data.token);
        localStorage.removeItem('infor');
        localStorage.removeItem('user');
        localStorage.removeItem('too');
        localStorage.removeItem('displayName');

        this.props.history.push('/login')
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({visible});
    };

    render() {
        const {responsive, path} = this.props;
        return (
            <Header className="custom-theme header">
                {
                    responsive.data.isMobile ? (
                        <Popover content={<SiderCustom path={path} popoverHide={this.popoverHide}/>} trigger="click"
                                 placement="bottomLeft" visible={this.state.visible}
                                 onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="header__trigger custom-trigger"/>
                        </Popover>
                    ) : (
                        <Icon
                            className="header__trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    )
                }
                <Menu
                    mode="horizontal"
                    style={{lineHeight: '64px', float: 'right'}}
                    onClick={this.menuClick}
                >

                    {/*<Menu.Item key="full" onClick={this.screenFull} >*/}
                    {/*<Icon type="arrows-alt" onClick={this.screenFull} />*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="1">*/}
                    {/*<Badge count={25} overflowCount={10} style={{marginLeft: 10}}>*/}
                    {/*<Icon type="notification" />*/}
                    {/*</Badge>*/}
                    {/*</Menu.Item>*/}
                    <SubMenu title={
                        <span className="avatar">
                        <img src={avater} alt="头像"/>

                        <i className="on bottom b-white"/></span>}>

                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <SubMenu title={
                        <span className="avatar">{this.state.displayName}</span>}>

                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>

                    {/*<Menu.Item>{this.state.displayName}</Menu.Item>*/}

                </Menu>
            </Header>
        )
    }
}

const mapStateToProps = state => {
    const {responsive = {data: {}}} = state.httpData;
    return {responsive};
};

export default withRouter(connect(mapStateToProps)(HeaderCustom));
