/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Menu, Icon, Layout, Button, Popover} from 'antd';
import screenfull from 'screenfull';
import {gitOauthToken, gitOauthInfo} from '../axios';
import {queryString} from '../utils';
import avater from '../style/imgs/icon_admin_1.png';
import SiderCustom from './SiderCustom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import actions from '../actions/index.js';

const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {

    changeLanguage() {
        let lang = this.props.responsive.locale;
        lang = lang === 'zh' ? 'en' : 'zh';
        this.props.changeLanguage(lang);
    }
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
        
        console.log('hcia this.state.responsive' , this.props.responsive.locale)

    };

    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }

    };
    menuClick = e => {
        console.log(e);
        // e.key === 'logout' && this.logout();
    };
    logout = () => {
        // localStorage.setItem('infor', JSON.stringify(response.data.data));
        // localStorage.setItem('displayName', response.data.data.displayName);
        // localStorage.setItem('loginName', response.data.data.loginName);
        // localStorage.setItem('too', response.data.data.token);


        var self = this
        window.Axios.post('auth/logout', {}).then(function (response) {
            localStorage.removeItem('infor');
            localStorage.removeItem('user');
            localStorage.removeItem('too');
            localStorage.removeItem('displayName');
            self.props.history.push('/login')

        })


        localStorage.removeItem('infor');
        localStorage.removeItem('user');
        localStorage.removeItem('too');
        localStorage.removeItem('displayName');
        self.props.history.push('/login')


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
                    style={{lineHeight: '68px', float: 'right',width: 240}}
                    // onClick={this.menuClick}
                >


                    <SubMenu

                        title={

                        <span className="avatar">
                        <img src={avater} alt="头像"/>
                        </span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                        </MenuItemGroup>

                    </SubMenu>
                    <SubMenu

                        title={
                        <span className="avatar">{this.state.displayName}</span>}>

                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>




                    <Button
                        onClick={() => this.changeLanguage()}>{this.props.responsive.locale === 'zh' ? 'zh' : 'cn'}</Button>

                </Menu>
            </Header>
        )
    }
}

const mapStateToProps = state => {

    console.log('hcia state', state)
    const {responsive = {data: {}}} = state.httpData;
    responsive.locale = state.root.language
    console.log('hcia responsive', responsive)


    return {responsive};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeLanguage: (val) => dispatch(actions.changeLanguage(val))
});
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderCustom));
