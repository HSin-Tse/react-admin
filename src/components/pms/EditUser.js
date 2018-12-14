/* eslint-disable react/sort-comp */

import React, {PureComponent} from 'react';
import {Col, Card, Row, Radio, Input, Tag, Button, Tooltip, Table, Icon, Checkbox, Select, Popconfirm, Form, message} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";

const FormItem = Form.Item;

const RadioGroup = Radio.Group;
const Option = Select.Option;

class EditUser extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            , userList: []
            , visible: false
            , modal2Visible: false
            , operationDiaryHistory: []
            , idList: []
            , mRoleList: []
            , anyThing: ''
            , name: ''
            , allRoleV: 0
            , email: '@'
            , newPassword: ''
            , secondPassword: ''
            , password: ''
            , allRole: {}
        };
    }


    confirmSave = () => {
        var self = this;

        window.Axios.post('back/saveOrUpdateBackUser', {
            id: this.props.match.params.id,
            name: self.state.name,
            email: self.state.email,
            mobile: self.state.mobile,
            gender: self.state.gender == 1 ? '男' : '女',
            newLoginName: self.state.newLoginName,
            newPassword: self.state.newPassword,
            idList: self.state.idList,
            password: self.state.password,
        }).then((response) => {
            // console.log('hcia response', response)

            if (response.data.code == 1) {
                message.success('操作成功')

            }
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


        window.Axios.post('back/getBackUserDetail', {
            id: this.props.match.params.id
        }).then((response) => {

            if (response.data.code === 1) {
                console.log('hcia response', response)
                self.setState({
                    name: response.data.data.displayName,
                    email: response.data.data.email,
                    mobile: response.data.data.mobile,
                    gender: response.data.data.gender == '女' ? 2 : 1,
                    newLoginName: response.data.data.loginName,
                    // changeNoteV: response.data.data.roleComment,
                    allRole: response.data.data.allRole,
                }, () => {


                    var value = Object.keys(this.state.allRole).map(Number).map((item1, number) => {
                        return (
                            item1
                        );
                    })
                    var aa = []
                    aa.push(value)
                    this.setState({
                        idList: aa,
                        allRoleV: value,
                    });


                });
            } else {
                self.props.history.goBack()

            }


        }).catch((error) => {
            console.log('hcia error', error)
            this.props.history.goBack()
        });


        window.Axios.post('back/getRoleList', {
            'pageSize': 100,
            'pageNo': 0,
        }).then((response) => {
            self.setState({
                    mRoleList: response.data.data.list
                }
            );

        }).catch(function (error) {
            console.log(error);
        });


    }

    newScret = (e) => {
        console.log('hcia e.target.value', e.target.value)
        this.setState({
            newPassword: e.target.value,
        });

    }

    secondScret = (e) => {
        // console.log(' secondScret hcia e.target.value', e.target.value)
        this.setState({
            secondPassword: e.target.value,
        });

    }

    checkScret = (e) => {
        this.setState({
            password: e.target.value,
        });

    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            gender: e.target.value,
        });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('1')) {

            callback('Two passwords that you enter is inconsistent!');
        } else {

            callback();
        }
    }


    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }
    changeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    handleChangeIDList = (value) => {
        console.log('hcia value', value)


        var aa = []
        aa.push(value)
        this.setState({
            idList: aa,
            allRoleV: value,
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const children = [];
        for (let i = 0; i < this.state.mRoleList.length; i++) {
            children.push(<Option value={this.state.mRoleList[i].id}
                                  key={this.state.mRoleList[i].id}>{this.state.mRoleList[i].name}</Option>);
        }

        const ssss = this.state.mRoleList.filter(
            (item) => {

                return this.state.idList.some((itemS) => {
                    return itemS == item.id
                })
            }).map((item) => {

                console.log('hcia item', item)
                console.log('hcia  Object.keys(item.allMenu)', Object.keys(item.allMenu))

                return (
                    <div style={{display: 'flex', minHeight: 50}}>
                        <h3 style={{minWidth: 80}}>{item.name}:</h3>
                        {

                            Object.keys(item.allMenu).map((item1, number) => {

                                var isCanOP = item.allMenu[item1].availableFlag == 1

                                console.log('hcia isCanOP', isCanOP)
                                return (

                                    <Tooltip style={{maxWidth: '80%'}} placement="top" title={isCanOP ? "可操作" : "只讀"}>
                                        <Tag color={isCanOP ? "magenta" : "green"} key={number}
                                             value={item1}>{item.allMenu[item1].name}</Tag>
                                    </Tooltip>

                                );
                            })
                        }
                    </div>
                );
            }
        )

        return (
            <div>
                {/*<div>姓名 name:{JSON.stringify(this.state.name)}</div>*/}
                {/*<div>邮箱 email:{JSON.stringify(this.state.email)}</div>*/}
                {/*<div>手机 mobile:{JSON.stringify(this.state.mobile)}</div>*/}
                {/*<div>性别 gender:{JSON.stringify(this.state.gender)}</div>*/}
                {/*<div>新的登陆名 newLoginName:{JSON.stringify(this.state.newLoginName)}</div>*/}
                {/*<div>新的密码 newPassword:{JSON.stringify(this.state.newPassword)}</div>*/}
                {/*<div>驗證密码 secondPassword:{JSON.stringify(this.state.secondPassword)}</div>*/}
                {/*<div>角色 idList:{JSON.stringify(this.state.idList)}</div>*/}
                {/*<div>内部人员备注 content:{JSON.stringify(this.state.content)}</div>*/}
                {/*<div>当前操作人员的密码 password:{JSON.stringify(this.state.password)}</div>*/}
                {/*<div> allRole:{JSON.stringify(this.state.allRole)}</div>*/}
                {/*<div> mRoleList:{JSON.stringify(this.state.mRoleList)}</div>*/}

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

                                    defaultValue={this.state.mobile}
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


                                {getFieldDecorator('1', {
                                    rules: [{
                                        required: true, message: 'Please input your password!',
                                    }, {
                                        validator: this.validateToNextPassword,
                                    }],
                                })(
                                    <Input style={{width: 180}}
                                           onChange={this.newScret}
                                           placeholder="密码"
                                           type="password"/>
                                )}

                                <h3 style={{marginLeft: 80, width: 120}}>请重复密码:</h3>

                                <FormItem
                                >
                                    {getFieldDecorator('2', {
                                        rules: [{
                                            required: true, message: 'Please input your password!',
                                        }, {
                                            validator: this.compareToFirstPassword,
                                        }],
                                    })(
                                        <Input style={{width: 180}}
                                               onChange={this.secondScret}
                                               placeholder="请重复密码:"
                                               type="password"/>
                                    )}
                                </FormItem>


                            </div>
                            <div style={{display: 'flex', minHeight: 50}}>
                                <h3 style={{width: 60}}>角色:</h3>
                                <Select
                                    // mode="multiple"
                                    style={{width: 180}}
                                    placeholder="角色"
                                    value={

                                        this.state.allRoleV


                                    }
                                    onChange={this.handleChangeIDList}
                                >
                                    {children}
                                </Select>

                            </div>
                            <div style={{marginTop: 20, display: 'flex', minHeight: 50}}>
                                <h3 style={{minWidth: 60}}>权限:</h3>
                                <Row gutter={0}>
                                    <Checkbox.Group style={{maxWidth: '80%'}} value={[]}
                                        // onChange={this.onChange}
                                    >
                                        <Col md={24}>
                                            {ssss}
                                        </Col>
                                    </Checkbox.Group>
                                </Row>

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
                                    <Input style={{width: 800}}
                                           addonAfter={<Icon type="star" theme="twoTone"/>}
                                           onChange={this.checkScret} placeholder="請輸入你的密碼加以驗證:" type="password"/>
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


}


export default connect()(Form.create()(EditUser));