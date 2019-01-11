/* eslint-disable react/sort-comp */

import React, {Component} from 'react';
import {
    Col,
    Card,
    Row,
    Radio,
    Input,
    Modal,
    Button,
    Table,
    Icon,
    Checkbox,
    Select,
    Popconfirm,
    message,
    Form
} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import axios from 'axios';
import {parse} from 'querystring';
import {bindActionCreators} from "redux";
import {setINFOR} from "../../action";
import connect from "react-redux/es/connect/connect";
import AllComponents from "../index";
import {Route} from "react-router-dom";

const RadioGroup = Radio.Group;
const {TextArea} = Input;
const CheckboxGroup = Checkbox.Group;

class EditRole extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            idList: [],
            powerList: [],
            allMenu: [],
            modal2Visible: false,
            operationDiaryHistory: [],
            anyThing: 'asdasd',
            changeNoteV: '',
            name: '',
            seret: '',
            realp: ''
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


        window.Axios.post('back/getRoleDetail', {
            id: this.props.match.params.id
        }).then(function (response) {
            console.log('hcia response', response)
            self.setState({
                name: response.data.data.name,
                changeNoteV: response.data.data.roleComment,
                allMenu: response.data.data.allMenu,
            }, () => {
                var sss = Object.keys(self.state.allMenu);
                var ss = Object.keys(self.state.allMenu).map(Number);

                sss.forEach(entry => {

                    console.log('hcia Bentry', entry)
                    console.log('hcia this', self.state.allMenu[entry].availableFlag)


                    if (self.state.allMenu[entry].availableFlag == 1) {

                        ss.push(-entry)
                    }

                });

                console.log('hcia ss', ss)


                self.setState({
                    powerList: ss
                });
            });


        });

        window.Axios.post('back/getMenuList', {}).then(function (response) {
            self.setState({
                menuList: response.data.data
            });
        });


    }

    confirmSave = () => {


        let list = this.state.powerList;

        var isOut1 = list.some(function (item, index, array) {
            return item == 25
        });
        var isOut2 = list.some(function (item, index, array) {
            return item == 41
        });

        if (!isOut1) {
            // list.

            list.remove(27)
            list.remove(28)
            list.remove(26)
            list.remove(40)
            // 27, 28, 26, 40

        }
        if (!isOut2) {
            // list.

            list.remove(23)
            list.remove(22)
            list.remove(36)
            // 27, 28, 26, 40

        }

        console.log('hcia isOut1', isOut1)
        console.log('hcia list', list)


        var groupBy = (array, f) => {
            let ansList = [];
            var ids = array.filter((item, index, array) => {
                return item > 0;
            });
            var flasg = array.filter((item, index, array) => {
                return item < 0;
            });
            ids.forEach((item) => {
                var select = flasg.some(function (flagItem, index, array) {
                    return ((flagItem + item) === 0)
                });
                ansList.push([item, select ? 1 : 0])
            });
            return ansList
        }


        let sorted = groupBy(list, (item) => {
            return [item.name];
        });
        // console.log(sorted);
        console.log('hcia sorted', sorted)


        if (sorted.length == 0) {
            message.error('权限沒有配置')
            return
        }
        var self = this
        window.Axios.post('back/saveOrUpdateRole', {
            id: this.props.match.params.id,
            name: self.state.name,
            content: self.state.changeNoteV,
            multilevelList: sorted,
            password: self.state.realp,
        }).then(function (response) {
            console.log('hcia response', response)
            message.success('操作成功')
        });

        // window.Axios.post('back/saveOrUpdateRole', {
        //     id: this.props.match.params.id,
        //     name: self.state.name,
        //     content: self.state.changeNoteV,
        //     multilevelList: sorted,
        //     password: self.state.realp,
        // }).then(function (response) {
        //     console.log('hcia response', response)
        //
        //     if (response.data.code == 1) {
        //         message.success('操作成功')
        //
        //     }
        // });

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

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
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


    render() {

        const {getFieldDecorator} = this.props.form;

        const self = this
        const setBlock = this.state.menuList.map(function (item, index) {
                const _childList = item.childrenMenu

                return (
                    <Card bodyStyle={{padding: 0, margin: 0, marginLeft: 0}} style={{marginTop: 0}} key={index}
                          title={<span style={{marginLeft: 0, fontSize: 14}}> {item.name} </span>}
                          bordered={true}>
                        {
                            _childList.map(function (item1, number) {

                                var isOut2 = self.state.powerList.some(function (_item, index, array) {
                                    return _item == item1.id
                                });

                                // console.log('hcia item1', item1)
                                item1.sscheck = isOut2

                                return (
                                    <Card.Grid style={{flexWrap: 'wrap', display: 'flex'}}>
                                        <Checkbox
                                            style={{whiteSpace: 'nowrap'}}
                                            onChange={(value) => {
                                                item1.sscheck = value.target.checked
                                            }}
                                            key={number}
                                            value={item1.id}
                                            id={number}>{item1.name}</Checkbox>

                                        <br/>
                                        <Checkbox
                                            style={{display: item1.childrenMenu.length == 0 ? '' : 'none'}}
                                            disabled={!item1.sscheck}
                                            key={number}
                                            value={-item1.id} id={number}>可操作</Checkbox>

                                        <div
                                            style={{display: (item1.sscheck || item1.childrenMenu.length == 0) ? 'none' : ''}}>

                                            <Checkbox
                                                disabled={true}
                                                id={number}>特殊权限配置</Checkbox>
                                        </div>

                                        <div style={{marginLeft: 0, width: '100%'}}>
                                            {/*<Icon type="arrow-down" />*/}
                                            <Icon
                                                style={{display: item1.childrenMenu.length == 0 ? 'none' : (item1.sscheck) ? '' : 'none'}}
                                                type="caret-right"/>
                                            {
                                                item1.childrenMenu.map((item2, num2) => {
                                                    return (
                                                        <Checkbox
                                                            style={{
                                                                whiteSpace: 'nowrap',
                                                                display: item1.sscheck ? '' : 'none'
                                                            }}
                                                            disabled={!item1.sscheck}
                                                            onChange={(value) => {
                                                                item2.sscheck = value.target.checked
                                                            }}
                                                            key={number}
                                                            value={item2.id}
                                                            id={number}>{item2.name}</Checkbox>
                                                    )
                                                })
                                            }

                                        </div>


                                    </Card.Grid>
                                );
                            })
                        }
                    </Card>
                );
            }
        )
        return (
            <div>
                <h2 style={{marginTop: 15}}>内部用户权限设置</h2>
                {/*<div>name :{JSON.stringify(this.state.name)}</div>*/}
                {/*<div>powerList :{JSON.stringify(this.state.powerList)}</div>*/}


                <BreadcrumbCustom first="内部成员列表" second="内部人员配置"/>


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

                                <TextArea
                                    style={{width: 180}}
                                    value={this.state.changeNoteV}
                                    onChange={this.changeNote}
                                    rows={4}></TextArea>
                            </div>


                        </Col>
                    </Row>
                </Card>

                <Card bodyStyle={{padding: 0, margin: 0}} title={<span style={{fontSize: 18}}> 权限配置 </span>}
                      bordered={true}
                      style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Checkbox.Group style={{width: '100%'}} value={this.state.powerList} onChange={this.onChange}>
                            <Col md={24}>
                                {setBlock}
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
                                <span style={{width: 200}}>請輸入你的密碼:</span>


                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true, message: 'Please input your password!',
                                    }, {
                                        validator: this.compareToFirstPassword,
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


}


const mapStateToPorps = state => {
    const {auth} = state.httpData;
    const infor = state.infor;
    return {auth, infor};
};
const mapDispatchToProps = dispatch => ({
    // fetchData: bindActionCreators(fetchData, dispatch),
    // receiveData: bindActionCreators(receiveData, dispatch),
    setUSER: bindActionCreators(setINFOR, dispatch),

});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(EditRole));
