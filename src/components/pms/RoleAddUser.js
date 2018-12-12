/* eslint-disable react/sort-comp */

import React, {Component} from 'react';
import {Col, Card, Row, Radio, Input, Modal, Button, Table, Icon, Checkbox, Select, Popconfirm, Form} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import axios from 'axios';
import {parse} from 'querystring';
import {bindActionCreators} from "redux";
import {setINFOR} from "../../action";
import connect from "react-redux/es/connect/connect";

const RadioGroup = Radio.Group;
const Option = Select.Option;

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
            , menuList: []
            , anyThing: 'asdasd'
            , name: '123'
            , email: 'aaa@'
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

        var self = this;//props.match.params.id

        window.Axios.post('back/getRoleList', {
            'pageSize': 100,
            'pageNo': 0,
        }).then(function (response) {
            console.log('hcia response', response)

            self.setState({
                    menuList: response.data.data.list
                }
            );

        }).catch(function (error) {
            console.log(error);
        });


    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            gender: e.target.value,
        });
    }

    changeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }
        return (
            <div>
                <div>姓名 name:{JSON.stringify(this.state.name)}</div>
                <div>邮箱 email:{JSON.stringify(this.state.email)}</div>
                <div>手机 mobile:{JSON.stringify(this.state.mobile)}</div>
                <div>性别 gender:{JSON.stringify(this.state.gender)}</div>
                <div>新的登陆名 newLoginName:{JSON.stringify(this.state.newLoginName)}</div>
                <div>新的密码 newPassword:{JSON.stringify(this.state.newPassword)}</div>
                <div>角色 idList:{JSON.stringify(this.state.idList)}</div>
                <div>内部人员备注 content:{JSON.stringify(this.state.content)}</div>
                <div>当前操作人员的密码 password:{JSON.stringify(this.state.password)}</div>

                <h2 style={{marginTop: 15}}>权限管理表</h2>
                <div><BreadcrumbCustom first="内部成员列表" second="编辑资料"/></div>

                <Card title={<span style={{fontSize: 18}}> 基本信息 </span>} bordered={true} style={{marginTop: 15}}>
                    <Row gutter={8}>
                        <Col md={12}>

                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>姓名:</h3>
                                <Input
                                    onChange={this.changeName}
                                    defaultValue={this.state.name}/>
                            </div>


                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>邮箱:</h3>

                                <Input defaultValue={this.state.email}
                                       onChange={(e) => this.setState({
                                           email: e.target.value,
                                       })}

                                       style={{width: 180}}/>
                            </div>
                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>手机:</h3>

                                <Input
                                    onChange={(e) => this.setState({
                                        mobile: e.target.value,
                                    })}

                                    defaultValue={this.state.name}
                                    style={{width: 180}}/>
                            </div>
                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>性别:</h3>

                                <RadioGroup onChange={this.onChange}
                                            value={this.state.gender}>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            </div>

                        </Col>
                    </Row>
                </Card>


                <Card title={<span style={{fontSize: 18}}> 账号信息 </span>} bordered={true} style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Col md={24}>

                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>登录名:</h3>

                                <Input defaultValue={this.state.newLoginName}
                                       onChange={(e) => this.setState({
                                           newLoginName: e.target.value,
                                       })}
                                       style={{width: 180}}/>
                            </div>
                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>密码:</h3>

                                <Input defaultValue={this.state.newPassword}
                                       onChange={(e) => this.setState({
                                           newPassword: e.target.value,
                                       })}
                                       style={{width: 180}}/>
                                <h3 style={{marginLeft: 80, width: 120}}>请重复密码:</h3>

                                <Input defaultValue={this.state.name}
                                       style={{width: 180}}/>
                            </div>
                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>角色:</h3>
                                <Select
                                    mode="multiple"
                                    style={{width: '100%'}}
                                    placeholder="Please select"
                                    // defaultValue={}
                                    // onChange={handleChange}
                                >
                                    {children}
                                </Select>

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
                <Card bodyStyle={{marginLeft: 10}} title={<span style={{fontSize: 18}}> 操作日志 </span>}
                      bordered={true}
                      style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Col md={24}>

                            <Table rowKey="id"
                                   columns={this.columns}
                                   dataSource={this.state.userList}
                                   bordered
                                   loading={this.state.loading}
                                   pagination={{  // 分页
                                       total: this.state.pgsize * this.state.totalPage,
                                       pageSize: this.state.pgsize,
                                       onChange: this.changePage,
                                   }}
                            />


                        </Col>
                    </Row>
                </Card>
                <Card bodyStyle={{marginLeft: 10}} title={<span style={{fontSize: 18}}> 安全验证 </span>} bordered={true}
                      style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Col md={24}>

                            <div style={{fontWeight: 'bold', fontSize: 16, display: 'flex', minHeight: 50}}>
                                <span style={{width: 200}}>請輸入你的密碼:</span>


                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: 'Please input your password!',
                                    }, {
                                        validator: this.validateToNextPassword,
                                    }],
                                })(
                                    <Input style={{width: 800}} addonAfter={<Icon type="star" theme="twoTone"/>}
                                           onChange={this.changeScret} placeholder="請輸入你的密碼加以驗證:" type="password"/>
                                )}


                            </div>


                        </Col>
                    </Row>
                </Card>


                <Row gutter={12}>
                    <Card style={{marginTop: 10}}>

                        <div>
                            <Popconfirm title="确认保存"
                                        onConfirm={this.confirmSave} okText="Yes"
                                        cancelText="No">
                                <Button type={"primary"} loading={this.state.iconLoading}>保存</Button>
                            </Popconfirm>

                            <Button onClick={this.props.history.goBack}
                                    loading={this.state.iconcanLoading}>返回</Button>
                        </div>
                    </Card>
                </Row>

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
            self.setState({anyThing: 'wwwww'});
            self.setState({anyThing: response.data.code});
            self.setState({userList: response.data.data});

        }).catch(function (error) {
            console.log(error);
        });
    };
}


export default connect()(Form.create()(RoleAddUser));