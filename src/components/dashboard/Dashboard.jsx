/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import {Row, Col, Card, Timeline, Icon} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';
import b1 from '../../style/imgs/b1.jpg';
import {bindActionCreators} from "redux";
import {addTodo, setINFOR} from "../../action";
import connect from "react-redux/es/connect/connect";


class Dashboard extends React.Component {


    seeDetail = () => {
        this.props.addTodo('a')
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
                <Card style={{marginTop:15}} disabled={true} title="待办事项 " bordered={true}>


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