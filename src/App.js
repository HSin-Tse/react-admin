import React, {Component} from 'react';
import {Layout, notification, Icon} from 'antd';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import {receiveData} from './action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Routes from './routes';
import {ThemePicker} from './components/widget';

const {Content, Footer} = Layout;

class App extends Component {
    state = {
        collapsed: false,
    };

    componentWillMount() {
        // const {receiveData} = this.props;

        this.getClientWidth();
        window.onresize = () => {
            // console.log('屏幕变化了');
            this.getClientWidth();
        }
    }

    componentDidMount() {




        const openNotification = () => {
            localStorage.setItem('isFirst', JSON.stringify(true));
        };
        const isFirst = JSON.parse(localStorage.getItem('isFirst'));
        !isFirst && openNotification();
    }

    getClientWidth = () => { // 获取当前浏览器宽度并设置responsive管理响应式
        const {receiveData} = this.props;
        const clientWidth = window.innerWidth;
        receiveData({isMobile: clientWidth <= 992}, 'responsive');
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const {auth, responsive} = this.props;
        return (
            <Layout>
                {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed}/>}
                {/*<ThemePicker />*/}
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data || {}}/>
                    <Content style={{margin: '0 16px', overflow: 'initial', flex: '1 1 0'}}>
                        <Routes auth={auth}/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        IX-CRM ©{new Date().getFullYear()} All Right Reserved
                    </Footer>
                </Layout>


            </Layout>
        );
    }
}

const mapStateToProps = state => {
    const {auth = {data: {}}, responsive = {data: {}}} = state.httpData;
    return {auth, responsive};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
