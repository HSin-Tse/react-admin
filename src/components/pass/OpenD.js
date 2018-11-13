/**
 *
 * 添加注释
 * Created by tse on 2018/1/12
 *
 */
import React, {Component} from 'react';
import {Col, Card, Row, Button} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import axios from "axios";

// import styles from './index.module.less';

class PassOpenD extends Component {


    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            , userList: []
            , testtt: 'asdasd'
        };
    }

    componentWillUnmount() {
    }

    componentDidMount() {

        console.log(this.props.match.params.id)
        console.log(this.props.match.params.id)
        console.log(this.props.match.params.id)
        console.log(this.props.match.params.id)
        console.log(this.props.match.params.id)
        // var record = JSON.parse(window.sss==null?{id:0}:window.sss);
        // console.log('sss',record.id)
        // console.log('sss',record.id)
        // console.log('sss',record.id)

        if (window.sss){
            console.log('window.sss AAA',window.sss)
            var record =window.sss;

        }else{
            console.log('window.sss VVVV',window.sss)
            var record ={'id':0};

        }


        axios.post('http://mobile.nooko.cn:8090/open/getExistOpenAccount', {
            // "language":"zh-CN","userId":"#############################"
            'language': 'zh-CN',
            'userId': record.id
        }).then(function (response) {
            console.log(response);

        }).catch(function (error) {
            console.log(error);
            // message.warn(error);
        });
    }

    render() {
        return (
            <div>
                <BreadcrumbCustom first="审核管理" second="开户审核"/>
                <Row gutter={16}>
                    <Col md={24}>
                        <Card title="cssModule" bordered={false}>
                            <div>
                                <p>OPEN D</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default PassOpenD;