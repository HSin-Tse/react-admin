/* eslint-disable react/sort-comp */

import React, {Component} from 'react';
import {Col, Card, Row, Radio, Input, Modal, Button, Table, Icon, Checkbox, Select} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import axios from 'axios';
import {parse} from 'querystring';

const RadioGroup = Radio.Group;

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

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            gender: e.target.value,
        });
    }

    render() {


        return (

            <div>

                <h2>
                    权限管理表
                </h2>

                <div><BreadcrumbCustom first="内部成员列表" second="编辑资料"/></div>
                <Row>

                </Row>

                <Card title={<h2> 基本信息 </h2>} bordered={true} style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Col md={12}>

                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>姓名:</h3>

                                <Input defaultValue={this.state.name}
                                       style={{width: 180}}/>
                            </div>
                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>邮箱:</h3>

                                <Input defaultValue={this.state.name}
                                       style={{width: 180}}/>
                            </div>
                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>手机:</h3>

                                <Input defaultValue={this.state.name}
                                       style={{width: 180}}/>
                            </div>
                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>性别:</h3>

                                <RadioGroup onChange={this.onChange} value={this.state.gender}>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            </div>

                        </Col>
                    </Row>
                </Card>


                <Card title={<h2> 账号信息 </h2>} bordered={true} style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Col md={24}>

                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>登录名:</h3>

                                <Input defaultValue={this.state.name}
                                       style={{width: 180}}/>
                            </div>
                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>密码:</h3>

                                <Input defaultValue={this.state.name}
                                       style={{width: 180}}/>
                                <h3 style={{marginLeft:80,width: 120}}>请重复密码:</h3>

                                <Input defaultValue={this.state.name}
                                       style={{width: 180}}/>
                            </div>
                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>角色:</h3>

                                <Input defaultValue={this.state.name}
                                       style={{width: 180}}/>
                            </div>
                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>权限:</h3>

                                <RadioGroup onChange={this.onChange} value={this.state.gender}>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            </div>

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
