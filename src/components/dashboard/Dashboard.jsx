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