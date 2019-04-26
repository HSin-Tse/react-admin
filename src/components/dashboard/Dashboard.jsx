/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import {Row, Col, Card} from 'antd';
// import Appwww from './AppDD.js';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {bindActionCreators} from "redux";
import {addTodo, setINFOR} from "../../action";
import connect from "react-redux/es/connect/connect";
// import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { withNamespaces, NamespacesConsumer, Trans } from 'react-i18next';
import { FormattedDate ,FormattedMessage} from 'react-intl';
import  i18n from '../../i18n'
class Dashboard extends React.Component {

    getOption = () => {
        return {
            title: {
                text: '堆叠区域图'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [150, 232, 201, 154, 190, 330, 410]
                }
            ]
        };
    };

    seeDetail = () => {
        this.props.addTodo('a')
    }

    constructor(props) {
        super(props);
        this.state = {
            name       : 'Eric',
            unreadCount: 1000,
            menuList: [],
            resp: undefined,
            displayName: '',
            lastLoginIP: '',
            regDate: '',
            location: '',
            email: '',
            mobile: '',
            lastLoginTime: '',
            requestBody: '{"a":1,"b":"aa"}',
            HOST: 'http://mobile.nooko.cn:8090/',

        };
    }


    componentDidMount() {
        // const { t, i18n } = useTranslation();

        this.setState(
            {
                displayName: localStorage.getItem('loginName')
            });

        // var mImfor = localStorage.getItem('infor')


        var mImfor = JSON.parse(localStorage.getItem('infor')),
            // console.log('hcia mImfor', mImfor)
            console


        // if()


        if (mImfor) {
            this.setState({lastLoginIP: mImfor.lastLoginIP ? mImfor.lastLoginIP : ''});
            this.setState({regDate: mImfor.regDate ? mImfor.regDate : ''});
            this.setState({email: mImfor.email ? mImfor.email : ''});
            this.setState({location: mImfor.location ? mImfor.location : ''});
            this.setState({mobile: mImfor.mobile ? mImfor.mobile : ''});
            this.setState({lastLoginTime: mImfor.lastLoginTime});

        }
        // this.setState({lastLoginIP: mImfor.lastLoginIP ? mImfor.lastLoginIP : ''});


        // console.log('hcia window.Axios.baseURL' , window.Axios.config.baseURL)
        // console.log('hcia window.Axios.baseURL', JSON.stringify(window.Axios.baseURL))

        this.setState({HOST: window.Axios.defaults.baseURL});

    }


    render() {
        const { t, i18n } = this.props;
        const changeLanguage = lng => {
            i18n.changeLanguage(lng);
        };
        const {name, unreadCount} = this.state;


        return (

            <div className="gutter-example button-demo">
                {/*{JSON.stringify(localStorage.getItem('infor'))}*/}


                <h2 style={{marginTop: 15}}>
                    <FormattedMessage
                        id="个人待办事项"
                    />

                </h2>

                <BreadcrumbCustom first="" second="个人待办事项"/>

                <Card disabled={true} title="登陆信息 " bordered={true}>

                    <Row gutter={1}>
                        <Col md={6}>
                            <p>登录账户:</p>
                        </Col>
                        <Col md={6}>
                            <p>{this.state.displayName}</p>
                        </Col>
                    </Row>
                    <Row gutter={1}>
                        <Col md={6}>
                            <p>手机:</p>
                        </Col>
                        <Col md={6}>
                            <p>{this.state.mobile}</p>
                        </Col>

                    </Row>
                    <Row gutter={1}>

                        <Col md={6}>
                            <p>邮箱:</p>
                        </Col>
                        <Col md={6}>
                            <p>{this.state.email}</p>
                        </Col>


                    </Row>
                    <Row gutter={1}>
                        <Col md={6}>
                            <p>注册时间:</p>
                        </Col>
                        <Col md={6}>
                            <p>{this.state.regDate}</p>
                        </Col>


                    </Row>
                    <Row gutter={1}>
                        <Col md={6}>
                            <p>上次访问时间:</p>
                        </Col>

                        <Col md={6}>
                            <p>{this.state.lastLoginTime}</p>
                        </Col>

                    </Row>
                    <Row gutter={1}>
                        <Col md={6}>
                            <p>上次访问IP</p>
                        </Col>
                        <Col md={6}>
                            <p>{this.state.lastLoginIP}</p>
                        </Col>
                    </Row>
                    <Row gutter={1}>
                        <Col md={6}>
                            <p>地理位置:</p>
                        </Col>
                        <Col md={6}>
                            <p>{this.state.location}</p>
                        </Col>
                    </Row>
                </Card>
                <Card style={{marginTop: 15}} disabled={true} title="待办事项 " bordered={true}>
                    <FormattedDate value={Date.now()} />

                </Card>
                {/*<Appwww />*/}
                {/*<div>{this.t('description.part2')}</div>*/}

                {/*<button onClick={() => changeLanguage('de')}>de</button>*/}
                {/*<button onClick={() => changeLanguage('en')}>en</button>*/}
                {/*<div>{useTranslation.t('description.part2')}</div>*/}
                {/*<h1 >*/}
                    {/*<FormattedMessage*/}
                        {/*id="hello"*/}
                    {/*/>*/}
                {/*</h1>*/}
                {/*<h1 >*/}
                    {/*<FormattedMessage*/}
                        {/*id="hello"*/}
                        {/*values={"FormattedMessage"}*/}
                    {/*/>*/}
                {/*</h1>*/}


            </div>
        )
    }
}


const mapStateToProps = state => {
    const todps = state.todos;
    const infor = state.infor;
    return {todps, infor};
};
const mapDispatchToProps = dispatch => ({
    addTodo: bindActionCreators(addTodo, dispatch),
    setUSER: bindActionCreators(setINFOR, dispatch),
});
export default Dashboard;
