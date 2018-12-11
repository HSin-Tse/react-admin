/* eslint-disable react/sort-comp */

import React, {Component} from 'react';
import {Col, Card, Row, DatePicker, Input, Modal, Button, Table, Icon, Checkbox, Select} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import axios from 'axios';
import {parse} from 'querystring';

class RoleAddUser extends Component {
    // state = {visible: false, modal2Visible: false}

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            , userList: []
            , visible: false
            , modal2Visible: false
            , operationDiaryHistory: []
            , anyThing: 'asdasd'
        };
    }

    showModal2 = () => {
        this.setState({
            modal2Visible: true,
            visible: false,

        });
    }
    showModal = () => {
        this.setState({
            visible: true,
            modal2Visible: false,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            modal2Visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            modal2Visible: false,
        });
    }

    componentDidMount() {


        // this.requestListData()
        // this.ediftModalColumn()
        // this.requestUserCommentList()

    }

    render() {
        const style1 = {
            padding: '8px',
        };
        const {
            Meta
        } = Card;

        return (

            <div>

                <h1>
                    权限管理表
                </h1>
                <div><BreadcrumbCustom first="内部成员列表" second="编辑资料"/></div>


                <Card title={<h2> 基本信息 </h2>} bordered={true} style={{marginTop: 15}}
                      bodyStyle={{padding: 0, margin: 0}}>

                    <Row gutter={8}>
                        <Col md={12}>


                            <div style={{display: 'flex', height: 50,justifyContent: 'flex-start', alignItems:'center', background: 'red'}}>
                                <h3 style={{  height: 50, background: 'blue',width: 70}}>国家:</h3>

                                <Input defaultValue={this.state.name} disabled={true}
                                       style={{width: 120}} placeholder="Basic usage"/>
                            </div>
                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 70}}>国家:</h3>

                                <Input defaultValue={this.state.name} disabled={true}
                                       style={{width: 120}} placeholder="Basic usage"/>
                            </div>


                        </Col>
                    </Row>
                </Card>
                <Card title={<h2> 基本信息 </h2>} bordered={true} style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Col md={12}>
                            <Card bordered={false}>


                                <div style={{display: 'flex', minHeight: 50}}>
                                    <h3 style={{width: 100}}>国家:</h3>

                                    <Input defaultValue={this.state.name} disabled={true}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                                <div style={{display: 'flex', minHeight: 50}}>
                                    <h3 style={{width: 100}}>国家:</h3>

                                    <Input defaultValue={this.state.name} disabled={true}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                            </Card>


                        </Col>
                    </Row>
                </Card>

            </div>
        )
    }


    hasChangeAll = () => {

    }
    requestUserCommentList = () => {
        // must request data:
        //belongUserId
        //loginName
        //token

        //refernce request data:
        //pageNo
        //pageSize
        //language
        const url = 'http://mobile.nooko.cn:8090/auth/getUserCommentList'

        var tmp = this;

        window.Axios.post(url, {
            'belongUserId': '4028b2a4631f770f01631f7770df0000',
            'loginName': 'admin',
            'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNTQ1NTI4ODM0MTk5LCJsb2dpbk5hbWUiOiJhZG1pbiJ9.F7moE4DsMUiajkKB1S_wemwsozlUW5VMxQKsg4KsSUQ'

        }).then(function (response) {

            tmp.setState({operationDiaryHistory: response.data.data.list});

        }).catch(function (error) {
            console.log(error);
            // message.warn(error);
        });
    }

    ediftModalColumn = () => {
        this.modalColumns = [{
            title: '時間',
            dataIndex: 'createDate',
            key: 'operationDiary_Date',

            render: (text, record) => (
                <Button>{record.createDate}</Button>),
        }, {
            title: '狀態',
            dataIndex: 'comment',
            key: 'operationDiary_Status',

            render: (text, record) => (
                <Button>{record.comment}</Button>),
        }, {
            title: '操作人',
            dataIndex: 'bkUserName',
            key: 'operationDiary_User',

            render: (text, record) => (
                <Button>{record.bkUserName}</Button>),
        }]
    }
    hasChange = (status) => {
        console.log('yyx', status.target.checked)
    }
    checkDiary = () => {

    }
    selectDate = (date, dateString) => {
        console.log(dateString, 'yyx', date);
    }
    timestampToTime = (timestamp) => {
        const dateObj = new Date(+timestamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
        const year = dateObj.getFullYear() // 获取年，
        const month = dateObj.getMonth() + 1 // 获取月，必须要加1，因为月份是从0开始计算的
        const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。

        return year + '-' + month + '-' + date
    };
    requestListData = () => {
        var self = this;//props.match.params.id
        window.Axios.post('ixuser/userOverView', {
            'belongUserId': self.props.match.params.id,


        }).then(function (response) {
            var bb = response.data.data;
            self.setState({anyThing: 'wwwww'});
            self.setState({anyThing: response.data.code});
            self.setState({userList: response.data.data});

        }).catch(function (error) {
            console.log(error);
        });
    };
}

export default RoleAddUser;
