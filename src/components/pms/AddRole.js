/* eslint-disable react/sort-comp */

import React, {Component} from 'react';
import {Col, Card, Row, Radio, Input, Modal, Button, Table, Icon, Checkbox, Select} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import axios from 'axios';
import {parse} from 'querystring';

const RadioGroup = Radio.Group;
const {TextArea} = Input;

class AddRole extends Component {

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

                <h2 style={{marginTop: 15}}>
                    内部用户权限设置
                </h2>

                {/*<Card disabled={true} title="IX账户审核 " bordered={true}>*/}

                    {/*<Row gutter={1}>*/}
                        {/*<Col md={8}>*/}
                            {/*<p>客户姓名:</p>*/}
                        {/*</Col>*/}
                        {/*<Col md={8}>*/}
                            {/*<p>客户邮箱</p>*/}
                        {/*</Col>*/}
                        {/*<Col md={8}>*/}
                            {/*<p>手机号码：</p>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*</Card>*/}

                <div><BreadcrumbCustom first="内部成员列表" second="内部人员配置"/></div>
                <Row>

                </Row>

                <Card title={<span style={{fontSize: 20}}> 基本信息 </span>} bordered={true} style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Col md={12}>

                            <div style={{fontWeight:'bold',fontSize: 18,display: 'flex', minHeight: 50}}>
                                <span style={{width: 100}}>角色名称:</span>

                                <Input defaultValue={this.state.name}
                                       style={{width: 180}}/>
                            </div>
                            <div style={{fontWeight:'bold',fontSize: 18,display: 'flex', minHeight: 50}}>
                                <span style={{width: 100}}>角色备注:</span>

                                {/*<Input defaultValue={this.state.name}*/}
                                {/*style={{width: 180}}/>*/}
                                <TextArea
                                    style={{width: 180}}
                                    value={this.state.theComment}
                                    onChange={this.addComment}
                                    rows={4}></TextArea>
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
                                <h3 style={{marginLeft: 80, width: 120}}>请重复密码:</h3>

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


}

export default AddRole;
