/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import {Row, Col, Card, Button, Icon, Input, message} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import {bindActionCreators} from "redux";
import {addTodo, setINFOR} from "../../action";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import ReactJson from 'react-json-view'

const {TextArea} = Input;


class Dashboard extends React.Component {
    getOption = () => {
        return {
            title: {
                text: '堆叠区域图'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告']
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
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[150, 232, 201, 154, 190, 330, 410]
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

    // Request URL: http://127.0.0.1:8080/open/getOpenApplyList60


    componentDidMount() {

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
        return (
            <div className="gutter-example button-demo">
                {/*{JSON.stringify(this.props.todps)}*/}
                {/*{JSON.stringify(this.props.infor)}*/}
                {/*{JSON.stringify(localStorage.getItem('infor'))}*/}


                <h2 style={{marginTop: 15}}>
                    个人待办事项
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


                </Card>
                {/*<Col className="gutter-row" md={8}>*/}
                    {/*<div className="gutter-box">*/}
                        {/*<Card bordered={false}>*/}
                            {/*<div className="pb-m">*/}
                                {/*<h3>访问量统计</h3>*/}
                                {/*<small>最近7天用户访问量</small>*/}
                            {/*</div>*/}
                            {/*<span className="card-tool"><Icon type="sync" /></span>*/}
                        {/*</Card>*/}
                    {/*</div>*/}
                {/*</Col>*/}
                <EchartsViews />

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
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);