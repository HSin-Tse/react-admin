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
            , changeNoteV: ''
            , name: '123'
        };
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
    changeName = (e) => {

        this.setState({
            name: e.target.value,
        });

    }
    changeNote = (e) => {

        this.setState({
            changeNoteV: e.target.value,
        });

    }

    render() {


        return (

            <div>

                <h2 style={{marginTop: 15}}>
                    内部用户权限设置
                </h2>

                <div>changeNoteV :{JSON.stringify(this.state.changeNoteV)}</div>
                <div>name :{JSON.stringify(this.state.name)}</div>


                <div><BreadcrumbCustom first="内部成员列表" second="内部人员配置"/></div>


                <Card bodyStyle={{marginLeft: 10}} title={<span style={{fontSize: 20}}> 基本信息 </span>} bordered={true}
                      style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Col md={12}>

                            <div style={{fontWeight: 'bold', fontSize: 18, display: 'flex', minHeight: 50}}>
                                <span style={{width: 100}}>角色名称:</span>

                                <Input
                                    onChange={this.changeName}
                                    defaultValue={this.state.name}
                                    style={{width: 180}}/>
                            </div>
                            <div style={{fontWeight: 'bold', fontSize: 18, display: 'flex', minHeight: 50}}>
                                <span style={{width: 100}}>角色备注:</span>

                                {/*<Input defaultValue={this.state.name}*/}
                                {/*style={{width: 180}}/>*/}
                                <TextArea
                                    style={{width: 180}}
                                    value={this.state.changeNoteV}
                                    onChange={this.changeNote}
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
