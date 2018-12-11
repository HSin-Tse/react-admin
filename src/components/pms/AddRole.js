/* eslint-disable react/sort-comp */

import React, {Component} from 'react';
import {Col, Card, Row, Radio, Input, Modal, Button, Table, Icon, Checkbox, Select, Popconfirm, message} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import axios from 'axios';
import {parse} from 'querystring';

const RadioGroup = Radio.Group;
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;

class AddRole extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            idList: [],
            powerList: [],
            modal2Visible: false,
            operationDiaryHistory: [],
            anyThing: 'asdasd',
            changeNoteV: '',
            name: '123',
            seret: ''
        };
    }


    componentDidMount() {


        this.columns = [
            {
                align: 'center',
                title: '时间',
                dataIndex: '时间',
                key: '时间',
                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                title: 'ip',
                align: 'center',

                dataIndex: 'ip',
                key: 'ip',
                render: (text, record) => (
                    <span>{record.comment}</span>),
            }, {
                title: '操作',
                align: 'center',

                dataIndex: '操作',
                key: '操作',
                render: (text, record) => (
                    <span>{record.comment}</span>),
            }];


        var self = this;


        window.Axios.post('back/getMenuList', {}).then(function (response) {
            console.log('hcia response', response)


            self.setState({
                menuList: response.data.data
            });


        });


    }

    confirmSave = () => {

        var self = this;

        window.Axios.post('back/saveOrUpdateRole', {
            name: self.state.name,
            content: self.state.changeNoteV,
            idList: self.state.powerList,
            password: self.state.seret,
        }).then(function (response) {
            console.log('hcia response', response)

            if(response.data.code==1){
                message.success('操作成功')

            }

            // self.setState();


        });

    }

    changeScret = (e) => {

        this.setState({
            seret: e.target.value,
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
    onChange = (checkedValues) => {
        console.log('hcia checkedValues', checkedValues)
        this.setState({
            powerList: checkedValues,
        });
    }


    render() {


        const ss = this.state.menuList.map(function (item, index) {
                return (


                    <Card bodyStyle={{marginLeft: 10}} style={{marginTop: 15}} key={index} title={item.name}
                          bordered={true}>
                        {
                            item.childrenMenu.map(function (item1, number) {
                                return (
                                    <Checkbox key={number} value={item1.id} id={number}>{item1.name}</Checkbox>
                                );
                            })
                        }

                    </Card>


                );
            }
        )


        return (

            <div>


                <h2 style={{marginTop: 15}}>
                    内部用户权限设置
                </h2>

                <div>changeNoteV :{JSON.stringify(this.state.changeNoteV)}</div>
                <div>name :{JSON.stringify(this.state.name)}</div>
                <div>powerList :{JSON.stringify(this.state.powerList)}</div>
                <div>seret :{JSON.stringify(this.state.seret)}</div>


                <div><BreadcrumbCustom first="内部成员列表" second="内部人员配置"/></div>


                <Card bodyStyle={{marginLeft: 10}} title={<span style={{fontSize: 18}}> 基本信息 </span>} bordered={true}
                      style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Col md={12}>

                            <div style={{fontWeight: 'bold', fontSize: 16, display: 'flex', minHeight: 50}}>
                                <span style={{width: 100}}>角色名称:</span>

                                <Input
                                    onChange={this.changeName}
                                    defaultValue={this.state.name}
                                    style={{width: 180}}/>
                            </div>
                            <div style={{fontWeight: 'bold', fontSize: 16, display: 'flex', minHeight: 50}}>
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

                <Card bodyStyle={{marginLeft: 10}} title={<span style={{fontSize: 18}}> 权限配置 </span>} bordered={true}
                      style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Checkbox.Group style={{width: '100%'}} onChange={this.onChange}>
                            <Col md={24}>
                                {ss}
                            </Col>
                        </Checkbox.Group>
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
                                <span style={{width: 300}}>請輸入你的密碼:</span>

                                <Input
                                    placeholder="請輸入你的密碼加以驗證:"
                                    onChange={this.changeScret}
                                    defaultValue={this.state.seret}
                                    style={{width: 800}}
                                    addonAfter={<Icon type="star" theme="twoTone"/>}
                                />

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
                            <Popconfirm
                                title="是否确认拒绝当前用户的开户申请？"
                                onConfirm={this.saveReject}
                                okText="Yes"
                                cancelText="No">
                                <Button loading={this.state.iconcanLoading}>返回</Button>
                            </Popconfirm>
                        </div>
                    </Card>
                </Row>
            </div>
        )
    }


}

export default AddRole;
