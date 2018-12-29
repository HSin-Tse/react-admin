/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import {Row, Col, Card, Button, Icon, Input, message} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';
import b1 from '../../style/imgs/b1.jpg';
import {bindActionCreators} from "redux";
import {addTodo, setINFOR} from "../../action";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import ReactJson from 'react-json-view'

const {TextArea} = Input;


class Dashboard extends React.Component {


    seeDetail = () => {
        this.props.addTodo('a')
    }

    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            resp: undefined,
            displayName: '',
            requestBody: '{"a":1,"b":"aa"}',
            HOST: 'http://mobile.nooko.cn:8090/',

        };
    }

    // Request URL: http://127.0.0.1:8080/open/getOpenApplyList


    componentDidMount() {
        this.setState({displayName: localStorage.getItem('loginName')});


        // console.log('hcia window.Axios.baseURL' , window.Axios.config.baseURL)
        console.log('hcia window.Axios.baseURL', JSON.stringify(window.Axios.baseURL))

        this.setState({HOST: window.Axios.defaults.baseURL});

    }


    render() {
        return (
            <div className="gutter-example button-demo">
                {/*{JSON.stringify(this.props.todps)}*/}
                {/*{JSON.stringify(this.props.infor)}*/}
                {/*{JSON.stringify(localStorage.getItem('infor'))}*/}


                <div style={{display: this.state.displayName == 'admin' ? '' : 'none'}}>

                    <h1 style={{marginTop: 15}}>
                        Change your Base URL
                    </h1>

                    <div style={{display: 'flex', minHeight: 40}}>
                        <span style={{width: 120}}>now host:</span>
                        <Input

                            value={this.state.HOST}
                            onChange={(e) => {

                                var self = this
                                this.setState({
                                    HOST: e.target.value,
                                }, () => {
                                    var Axios = axios.create({
                                        baseURL: self.state.HOST
                                    });

                                    window.Axios = Axios;

                                    window.Axios.interceptors.request.use(
                                        config => {
                                            var xtoken = localStorage.getItem('too')
                                            var loginName = localStorage.getItem('loginName')

                                            loginName = encodeURI(loginName)

                                            // console.log('hcia loginName' , loginName)
                                            // console.log('hcia xtoken' , xtoken)

                                            if (xtoken != null) {
                                                config.headers['X-Token'] = xtoken
                                                if (config.method == 'post') {
                                                    config.data = {
                                                        ...config.data,
                                                        'token': xtoken,
                                                        'loginName': loginName,
                                                        'language': 'zh-CN',

                                                    }

                                                    config.timeout = 30 * 1000

                                                    config.headers = {
                                                        'token': xtoken,
                                                        'loginName': loginName,
                                                    }

                                                } else if (config.method == 'get') {
                                                    config.params = {
                                                        _t: Date.parse(new Date()) / 1000,
                                                        ...config.params
                                                    }
                                                }
                                            }

                                            return config
                                        }, function (error) {

                                            console.log('hcia error', error)
                                            return Promise.reject(error)
                                        })


                                    window.Axios.interceptors.response.use(function (response) {

                                        if (response.data.code != 1) {
                                            message.error(response.data.msg)
                                            return Promise.reject(response)
                                        }
                                        return response
                                    }, function (error) {
                                        message.error(error.toString())
                                        return Promise.reject(error)
                                    })
                                });


                            }}
                            style={{width: 620}} placeholder="http://127.0.0.1:8080/"/>
                    </div>
                    <h3>you can set like below </h3>
                    <p>http://mobile.nooko.cn:8090/</p>
                    <p>http://127.0.0.1:8080/</p>
                    <h4>loginName:{localStorage.getItem('loginName')}</h4>
                    <h4>token:{localStorage.getItem('too')}</h4>

                    <div style={{display: 'flex', minHeight: 40}}>
                        <span style={{minWidth: 100}}>Request </span>
                        <TextArea style={{minWidth: 160}}
                                  value={this.state.requestBody}
                                  rows={4}
                                  onChange={(e) => {
                                      this.setState({
                                          requestBody: e.target.value,
                                      });
                                  }}/>
                    </div>


                    <Button onClick={() => {

                        var self = this

                        console.log('hcia this.state.requestBody', this.state.requestBody)

                        const isFirst = JSON.parse(self.state.requestBody);
                        console.log('hcia isFirst', isFirst)

                        window.Axios.post('/auth/getRecordCommentList', isFirst)
                            .then(function (response) {

                                self.setState({
                                    resp: response.data,
                                });

                            }).catch(error => {

                            console.log('hcia error', error)
                            self.setState({
                                resp: error,
                            });

                            // message.error(error)
                        })
                    }}> send </Button>

                    <ReactJson src = {this.state.resp}></ReactJson>


                </div>

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

                    </Row>
                    <Row gutter={1}>

                        <Col md={6}>
                            <p>邮箱:</p>
                        </Col>

                    </Row>
                    <Row gutter={1}>
                        <Col md={6}>
                            <p>注册时间:</p>
                        </Col>

                    </Row>
                    <Row gutter={1}>
                        <Col md={6}>
                            <p>上次访问时间:</p>
                        </Col>

                    </Row>
                    <Row gutter={1}>
                        <Col md={6}>
                            <p>上次访问IP</p>
                        </Col>

                    </Row>
                    <Row gutter={1}>
                        <Col md={6}>
                            <p>地理位置:</p>
                        </Col>

                    </Row>
                </Card>
                <Card style={{marginTop: 15}} disabled={true} title="待办事项 " bordered={true}>


                </Card>
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