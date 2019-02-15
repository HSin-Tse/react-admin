/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {message, Input, Button, Card, Table, Select, Modal, Popconfirm, Row, Col, Icon, DatePicker} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {bindActionCreators} from "redux";
import {addTodo} from "../../action";
import connect from "react-redux/es/connect/connect";
import classNames from "classnames";
import {getCookie, setCookie} from "../../try";
import { useState } from 'react';

const {TextArea} = Input;
const Option = Select.Option;
const {RangePicker} = DatePicker;

class Basic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            current: 1,
            pgsize: 20,
            modal2OPDAYVisible: false,
            visibleA: false,
            visibleB: false,
            user: '',
            mComment: '',
            mLeverageId: '',
            userList: [],
            leavgeList: [{
                "id": 21,
                "status": 1,
                "clientGroupId": 404,
                "leverage": 100,
                "brokerCode": "BahamaIX",
                "maxBalance": 500000.0,
                "minBalance": 200001.0,
                "maxLots": null,
                "clientGroupName": "L_100",
                "delFlag": 0
            }, {
                "id": 22,
                "status": 1,
                "clientGroupId": 406,
                "leverage": 200,
                "brokerCode": "BahamaIX",
                "maxBalance": 200000.0,
                "minBalance": 100001.0,
                "maxLots": null,
                "clientGroupName": "L_200",
                "delFlag": 0
            }, {
                "id": 23,
                "status": 1,
                "clientGroupId": 405,
                "leverage": 300,
                "brokerCode": "BahamaIX",
                "maxBalance": 100000.0,
                "minBalance": 50001.0,
                "maxLots": null,
                "clientGroupName": "L_300",
                "delFlag": 0
            }, {
                "id": 24,
                "status": 1,
                "clientGroupId": 304,
                "leverage": 400,
                "brokerCode": "BahamaIX",
                "maxBalance": 50000.0,
                "minBalance": 0.0,
                "maxLots": null,
                "clientGroupName": "L_400",
                "delFlag": 0
            }, {
                "id": 25,
                "status": 0,
                "clientGroupId": 707,
                "leverage": 50,
                "brokerCode": "BahamaIX",
                "maxBalance": 0.0,
                "minBalance": 0.0,
                "maxLots": null,
                "clientGroupName": "L_50",
                "delFlag": 0
            }],
            detail: {
                "name": null,
                "id": "27",
                "date": "",
                "comment": '',
                "status": 0,
                "currentLeverage": "1 : 100",
                "targetLeverage": "1 : 200",
                "operator": null,
                "email": null,
                "mobile": null,
                "nationalId": null,
                "accountNo": "live545491475",
                "marginLevel": "N/A",
                "displayStatus": "审核中",
                "broker": null,
                "cashBalance": "0.0"
            },
            loading: false

        };
    }

    requestUserCommentList = (record) => {
        var self = this;
        window.Axios.post('/auth/getRecordCommentList', {
            id: record.id,
            commentType: 4,
            pageNo: this.state.currentComment,
            pageSize: this.state.pgsize,
        }).then(function (response) {
            self.setState({
                totalpageComments: response.data.data.totalPage,
                operationDiaryHistory: response.data.data.list,
            });
        });
    }
    showOPDAyModal2 = (recodrd) => {
        this.requestUserCommentList(recodrd)
        this.setState({
            modal2OPDAYVisible: true,
        });
    };
    requestPage = () => {
        let self = this
        self.setState({
                loading: true,
            }
        );
        window.Axios.post('finance/getLeverageApplyList', {
            'pageSize': self.state.pgsize,
            'pageNo': self.state.current,
            email: this.state.selectMail,
            mobile: this.state.selectPhoneF,
            nationalId: this.state.selectID,
            starClientAccount: this.state.starClientAccount,
            startTime: this.state.selectTimeStart,
            endTime: this.state.selectTimeEnd,
        }).then(function (response) {
            self.setState({
                    totalPage: response.data.data.totalPage,
                    loading: false,
                    userList: response.data.data.list
                }
            );
        })
    }
    changePage = (page) => {
        console.log('hcia page', page)
        this.setState({
            current: page,
        }, () => {
            this.requestPage()
        })
    }

    componentDidMount() {

        window.Axios.post('back/addLogHistory', {
            'moduleLog': '审核管理',
            'pageLog': '杠杆审核',
            'commentLog': '查看了杠杆审核',
            'typeLog': 2,
        })


        this.columnsLog = [
            {
                title: '时间',
                dataIndex: 'createDate',
                key: 'operationDiary_Date',
                align: 'center',
                render: (text, record) => (
                    <span>{
                        this.timestampToTime(record.createDate)
                    }</span>),


            }, {
                title: 'IP',
                dataIndex: 'IP',
                key: 'IP',
                align: 'center',
                render: (text, record) => (
                    <span>{record.ipAddress}</span>),
            }, {
                title: '操作人',
                align: 'center',
                dataIndex: 'bkUserName',
                key: 'operationDiary_User',
                render: (text, record) => (
                    <span>{record.bkUserName}</span>),
            }, {
                title: '操作',
                align: 'center',
                dataIndex: 'comment',
                key: 'operationDiary_Status',
                render: (text, record) => (
                    <span>{record.comment}</span>),
            }]
        let self = this

        window.Axios.post('dict/leverageList', {
            'keys': 'IX_Income,IX_Percentage,IX_FundsSource,IX_UStax,IX_Trading_Experience,IX_Trading_Objectives,IX_Risk_Tolerance,open_type_ix,account_type',
        }).then((response) => {
            self.setState({
                leavgeList: response.data.data,
            })
        });


        this.columns = [
            {
                align: 'center',
                title: '申请序号',
                dataIndex: '申请序号',
                key: '申请序号',
                render: (text, record) => (
                    <span>{record.id}</span>),
            },
            {
                align: 'center',
                title: '手机号',
                dataIndex: '手机号',
                key: '手机号',
                render: (text, record) => (
                    <span>{record.mobile}</span>),
            },
            {
                align: 'center',
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }
            , {
                align: 'center',
                title: '邮箱地址',
                dataIndex: '邮箱地址',
                key: '邮箱地址',
                render: (text, record) => (
                    <span>{record.email}</span>),
            }
            , {
                align: 'center',
                title: '交易组',
                dataIndex: '交易组',
                key: '交易组',
                render: (text, record) => (
                    <span>{record.accountType}</span>),
            }, {
                align: 'center',
                title: '交易账号',
                dataIndex: '交易账号',
                key: '交易账号',
                render: (text, record) => (
                    <span>{record.accountNo}</span>),
            }, {
                align: 'center',
                title: '账号类型',
                dataIndex: '账号类型',
                key: '账号类型',
                render: (text, record) => (
                    <span>{record.broker}</span>),
            }, {
                align: 'center',

                title: '申请时间',
                dataIndex: '申请时间',
                key: '申请时间',

                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                align: 'center',

                title: '审核状态',
                dataIndex: '审核状态',
                key: '审核状态',
                render: (text, record) => (
                    <span>{record.displayStatus}</span>
                )

            }, {
                align: 'center',

                title: '操作人',
                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <div>
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.showOPDAyModal2(record)}>日志</Button>
                        <Button size={'small'} style={{
                            minWidth: 80,
                            background: '#FDD000',
                            display: record.displayStatus == '待审核' ? '' : 'none'
                        }} onClick={() => this.showModalB(record)}>审核</Button>


                        <Button size={'small'} style={{
                            minWidth: 80,
                            display: record.displayStatus != '待审核' ? '' : 'none'
                        }} onClick={() => this.showModalA(record)}>查看</Button>


                    </div>
                ),
            }];
        this.requestPage()

    }

    changePageComment = (page) => {
        let self = this

        // page = page - 1
        this.setState({
            currentComment: page,
        }, () => {
            self.requestUserCommentList()
        })
    }

    showModalA = (recodrd) => {

        let self = this

        self.setState({
            mComment: '',
        });


        window.Axios.post('finance/getLeverageApplyDetail', {
            'id': recodrd.id,
        }).then(function (response) {

            self.setState({
                detail: response.data.data,
                visibleA: true,
                loading: false,
            });

            self.requestUserCommentList(recodrd)


        });


    }
    showModalB = (recodrd) => {

        let self = this
        self.setState({
            mComment: '',

        });

        window.Axios.post('finance/getLeverageApplyDetail', {
            'id': recodrd.id,
        }).then(function (response) {

            self.setState({
                detail: response.data.data,
                visibleB: true,
                loading: false,

            });
            self.requestUserCommentList(recodrd)


        });


    }

    // targetLeverage
    onChangeLe = (value) => {
        this.setState({
            detail: {...this.state.detail, targetLeverageId: value},
            mLeverageId: value,

        });
    }

    handleOk = () => {
        let self = this


        
        console.log('hcia this.state.detail.targetLeverage' , this.state.detail.targetLeverage)
        console.log('hcia this.state.mLeverageId' , this.state.mLeverageId)


        // return
        window.Axios.post('finance/updateLeverageApply', {
            id: this.state.detail.id,
            leverageId: this.state.detail.targetLeverageId,
        }).then((response) => {
            message.success('杠杆修改操作成功')
            window.Axios.post('finance/passLeverageApply', {
                'id': this.state.detail.id,
                'content': this.state.mComment,
            }).then(() => {

                message.success('审核通过杠杆申请操作成功')
                self.requestPage()
                self.setState({
                    visibleB: false,
                });
            });
        });


    }

    handleCancel = (e) => {
        this.setState({
            visibleA: false,
            visibleB: false,
        });
    };

    handleReject = (e) => {
        let self = this

        window.Axios.post('finance/cancelLeverageApply', {
            'id': this.state.detail.id,
            'content': this.state.detail.comment,
        }).then(function (response) {


            message.success('操作成功')
            self.requestPage()

            self.setState({
                visibleB: false,
            });


        });
    };

    changeNote = (e) => {
        this.setState({
            mComment: e.target.value,
            detail: {...this.state.detail, comment: e.target.value},
        });

    }

    _switcherOn = () => {
        this.setState({
            switcherOn: !this.state.switcherOn
        })
    };

    timestampToTime = (timestamp) => {
        const dateObj = new Date(+timestamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
        const year = dateObj.getFullYear() // 获取年，
        const month = dateObj.getMonth() + 1 // 获取月，必须要加1，因为月份是从0开始计算的
        const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。
        const hours = this.pad(dateObj.getHours())  // 获取时, this.pad函数用来补0
        const minutes = this.pad(dateObj.getMinutes()) // 获取分
        const seconds = this.pad(dateObj.getSeconds()) // 获取秒
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
    };

    pad = (str) => {
        return +str >= 10 ? str : '0' + str
    };
     Example=()=> {
        // Declare a new state variable, which we'll call "count"
        const [count, setCount] = useState(0);

        return (
            <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>
                    Click me
                </button>
            </div>
        );
    }
    render() {
        const gridStyle = {
            width: '50%',
            textAlign: 'center',
        };
        return (
            <div>

                <div className={classNames('switcher dark-white', {active: this.state.switcherOn})}>
                    <span className="sw-btn dark-white" onClick={this._switcherOn}>
                     <Icon type="setting" className="text-dark"/>
                    </span>
                    <div style={{width: 270}}>

                        <Card
                            title="当前表搜索"
                            extra={<Button type="primary" onClick={() => {
                                let self = this
                                this.setState({
                                    selectMail: '',
                                    selectID: '',
                                    startTime: '',
                                    selectPhoneF: '',
                                    starClientAccount: '',
                                    selectTimeStart: '',
                                    selectTimeEnd: '',
                                    filterTimeFalue: null
                                }, () => {
                                    self.requestPage()
                                })
                            }}
                            >清除条件</Button>}
                        >
                            <Input value={this.state.selectMail} onChange={(e) => {
                                this.setState({selectMail: e.target.value})
                            }} style={{marginBottom: 10}} placeholder="邮箱"/>

                            <Input value={this.state.selectPhoneF} onChange={(e) => {
                                this.setState({
                                    selectPhoneF: e.target.value,
                                });
                            }} style={{marginBottom: 10}} placeholder="手机号"/>


                            <Input value={this.state.selectID} onChange={(e) => {
                                this.setState({
                                    selectID: e.target.value,
                                });
                            }} style={{marginBottom: 10}} placeholder="身份证号"/>

                            <Input value={this.state.starClientAccount} onChange={(e) => {
                                this.setState({
                                    starClientAccount: e.target.value,
                                });
                            }} style={{marginBottom: 10}} placeholder="账户"/>
                            <RangePicker

                                showToday
                                style={{width: '100%'}}
                                showTime={{format: 'YYYY-MM-DD HH:mm:ss'}}
                                format="YYYY-MM-DD HH:mm:ss fff"
                                placeholder={['开始时间', '结束时间']}
                                onChange={(value, dateString) => {




                                    if (value.length === 0) {

                                        this.setState({
                                            filterTimeFalue: undefined,
                                            selectTimeStart: undefined,
                                            selectTimeEnd: undefined,

                                        });
                                    } else {
                                        var selectTimeStart = value[0].unix() + '000'
                                        var selectTimeEnd = value[1].unix() + '000'

                                        console.log('hcia selectTimeStart', selectTimeStart)
                                        console.log('hcia selectTimeEnd', selectTimeEnd)


                                        this.setState({
                                            filterTimeFalue: value,
                                            selectTimeStart: selectTimeStart,
                                            selectTimeEnd: selectTimeEnd,

                                        });
                                    }


                                }}
                                value={this.state.filterTimeFalue}
                                onOk={(value) => {
                                    console.log('hcia', 'onOk: ', value);


                                    var selectTimeStart = value[0].unix() + '000'
                                    var selectTimeEnd = value[1].unix() + '000'



                                    this.setState({
                                        filterTimeFalue: value,
                                        selectTimeStart: selectTimeStart,
                                        selectTimeEnd: selectTimeEnd,

                                    });
                                }}
                            />

                            <Button onClick={() => this.requestPage()} style={{marginTop: 15}} type="primary"
                                    icon="search">Search</Button>

                        </Card>


                    </div>
                </div>

                <Modal
                    bodyStyle={{
                        background: 'white',
                        padding: 0,
                        margin: 0,
                        width: 600
                    }}
                    closable={false}
                    footer={null}
                    onCancel={this.handleCancel}
                    visible={this.state.visibleB}


                >

                    <div>
                        <div style={{
                            alignItems: 'center',
                            justifyContent: 'center', height: 48, display: 'flex', padding: 0, background: '#FDD000'
                        }}>
                            <span style={{
                                fontSize: 18,
                                fontFamily: 'PingFangSC-Medium',
                                fontWeight: 500,
                                color: 'rgba(51,51,51,1)'
                            }}>{'账户：' + this.state.detail.accountNo}
                            </span>
                        </div>
                        <div>
                            <Row style={{marginTop: "24px"}}>
                                <Col style={{textAlign: 'right'}} span={9}>当前杠杆:</Col>
                                <Col style={{textAlign: 'center'}} span={11}>{this.state.detail.currentLeverage}</Col>
                            </Row>
                            <Row style={{marginTop: "24px"}}>
                                <Col style={{textAlign: 'right'}} span={9}>余额:</Col>
                                <Col style={{textAlign: 'center'}} span={11}>{this.state.detail.cashBalance}</Col>
                            </Row>
                            <Row style={{marginTop: "24px"}}>
                                <Col style={{textAlign: 'right'}} span={9}>杠杆修改:</Col>
                                <Col style={{textAlign: 'center'}} span={11}>
                                    <Select
                                        onChange={this.onChangeLe}
                                        value={this.state.detail.targetLeverageId}
                                        style={{width: 100, marginLeft: 0}}>
                                        {this.state.leavgeList.map(ccty => <Option
                                            value={ccty.id} key={ccty.leverage}>1:{ccty.leverage}</Option>)}
                                    </Select>
                                </Col>
                            </Row>
                            {/*<Row style={{marginTop: "24px"}}>*/}
                                {/*<Col style={{textAlign: 'right'}} span={9}>杠杆修改:</Col>*/}
                                {/*<Col style={{textAlign: 'center'}} span={11}>*/}
                                    {/*<Select*/}
                                        {/*onChange={this.onChangeLe}*/}
                                        {/*value={this.state.detail.targetLeverageID}*/}
                                        {/*style={{width: 100, marginLeft: 0}}>*/}
                                        {/*{this.state.leavgeList.map(ccty => <Option*/}
                                            {/*value={ccty.id} key={ccty.leverage}>1:{ccty.leverage}</Option>)}*/}
                                    {/*</Select>*/}
                                {/*</Col>*/}
                            {/*</Row>*/}
                            <Row style={{marginTop: "24px"}}>
                                <Col style={{textAlign: 'right'}} span={9}>保证金占比:</Col>
                                <Col style={{textAlign: 'center'}} span={11}>{this.state.detail.marginLevel}</Col>
                            </Row>
                            <Row style={{marginTop: "24px", marginRight: "80px", marginLeft: "80px"}}>
                                <Col style={{textAlign: 'center'}} span={24}>处理备注</Col>
                                <Col style={{marginTop: 20}} span={24}>
                                <TextArea value={this.state.mComment}
                                          onChange={this.changeNote}
                                          rows={4}></TextArea>
                                </Col>
                            </Row>

                            <Table
                                style={{marginTop: "20px", marginLeft: "80px", marginRight: "80px"}}
                                rowKey="id"
                                bordered

                                columns={[
                                    {
                                        title: '操作人',
                                        width: 130,
                                        align: 'center',
                                        dataIndex: 'bkUserName',
                                        key: 'operationDiary_User',

                                        render: (text, record) => (
                                            <span>{record.bkUserName}</span>),
                                    },
                                    {
                                        title: '操作时间',
                                        align: 'center',

                                        dataIndex: 'createDate',
                                        key: 'operationDiary_Date',
                                        render: (text, record) => (


                                            <span>{this.timestampToTime(record.createDate)}</span>),
                                    }, {
                                        title: '备注',
                                        align: 'center',

                                        dataIndex: 'comment',
                                        key: 'operationDiary_Status',
                                        render: (text, record) => (
                                            <span>{record.comment}</span>),
                                    }]}
                                dataSource={this.state.operationDiaryHistory}
                                loading={this.state.loadingComment}
                                pagination={{
                                    total: this.state.totalpageComments * this.state.pgsize,
                                    pageSize: this.state.pgsize,
                                    onChange: this.changePageComment,
                                }}
                            />


                        </div>
                        <div style={{
                            marginLeft: "80px",
                            marginRight: "80px",
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingBottom: "48px",
                            paddingTop: "48px",
                        }}>
                            <Popconfirm title="确认？" onConfirm={this.handleOk}
                                        okText="Yes"
                                        cancelText="No">
                                <Button style={{
                                    width: "120px",
                                    height: "40px",
                                    borderRadius: "4px", background: '#F6D147'
                                }} type="normal" key="submit">通過</Button>
                            </Popconfirm>
                            <Popconfirm title="拒绝？"
                                        onConfirm={this.handleReject} e
                                        okText="Yes"
                                        cancelText="No">
                                <Button style={{
                                    width: "120px",
                                    height: "40px",
                                    borderRadius: "4px", background: '#FF6666'
                                }} type="normal" key="back">拒絕</Button>
                            </Popconfirm>


                            <Button

                                style={{
                                    width: "120px",
                                    height: "40px",
                                    borderRadius: "4px"
                                }}
                                onClick={() => {

                                    this.setState({visibleB: false})

                                }} type="normal" key="back">取消</Button>

                        </div>

                    </div>


                </Modal>
                <Modal
                    bodyStyle={{
                        background: 'white',
                        padding: 0,
                        margin: 0,
                        width: 600
                    }}
                    closable={false}
                    footer={null}
                    onCancel={this.handleCancel}
                    visible={this.state.visibleA}


                >

                    <div>
                        <div style={{
                            alignItems: 'center',
                            justifyContent: 'center', height: 48, display: 'flex', padding: 0, background: '#FDD000'
                        }}>
                            <span style={{
                                fontSize: 18,
                                fontFamily: 'PingFangSC-Medium',
                                fontWeight: 500,
                                color: 'rgba(51,51,51,1)'
                            }}>{'详情查看：' + this.state.detail.accountNo}
                            </span>
                        </div>
                        <div>
                            <Row style={{marginTop: "24px"}}>
                                <Col style={{textAlign: 'right'}} span={9}>当前杠杆:</Col>
                                <Col style={{textAlign: 'center'}} span={11}>{this.state.detail.currentLeverage}</Col>
                            </Row>
                            <Row style={{marginTop: "24px"}}>
                                <Col style={{textAlign: 'right'}} span={9}>余额:</Col>
                                <Col style={{textAlign: 'center'}} span={11}>{this.state.detail.cashBalance}</Col>
                            </Row>

                            <Row style={{marginTop: "24px"}}>
                                <Col style={{textAlign: 'right'}} span={9}>杠杆修改:</Col>
                                <Col style={{textAlign: 'center'}} span={11}>
                                    <Select
                                        disabled={true}
                                        // onChange={this.onChangeLe}
                                        value={this.state.detail.targetLeverageId}
                                        style={{width: 100, marginLeft: 0}}>
                                        {this.state.leavgeList.map(ccty => <Option
                                            value={ccty.id} key={ccty.leverage}>1:{ccty.leverage}</Option>)}
                                    </Select>
                                </Col>
                            </Row>
                            <Row style={{marginTop: "24px"}}>
                                <Col style={{textAlign: 'right'}} span={9}>保证金占比:</Col>
                                <Col style={{textAlign: 'center'}} span={11}>{this.state.detail.marginLevel}</Col>
                            </Row>
                            {/*<Row style={{marginTop: "24px", marginRight: "80px", marginLeft: "80px"}}>*/}
                                {/*<Col style={{textAlign: 'center'}} span={24}>处理备注</Col>*/}
                                {/*<Col style={{marginTop: 20}} span={24}>*/}
                                {/*<TextArea value={this.state.mComment}*/}
                                          {/*onChange={this.changeNote}*/}
                                          {/*rows={4}></TextArea>*/}
                                {/*</Col>*/}
                            {/*</Row>*/}

                            <Table
                                style={{marginTop: "20px", marginLeft: "80px", marginRight: "80px"}}
                                rowKey="id"
                                bordered

                                columns={[
                                    {
                                        title: '操作人',
                                        width: 130,
                                        align: 'center',
                                        dataIndex: 'bkUserName',
                                        key: 'operationDiary_User',

                                        render: (text, record) => (
                                            <span>{record.bkUserName}</span>),
                                    },
                                    {
                                        title: '操作时间',
                                        align: 'center',

                                        dataIndex: 'createDate',
                                        key: 'operationDiary_Date',
                                        render: (text, record) => (


                                            <span>{this.timestampToTime(record.createDate)}</span>),
                                    }, {
                                        title: '备注',
                                        align: 'center',

                                        dataIndex: 'comment',
                                        key: 'operationDiary_Status',
                                        render: (text, record) => (
                                            <span>{record.comment}</span>),
                                    }]}
                                dataSource={this.state.operationDiaryHistory}
                                loading={this.state.loadingComment}
                                pagination={{
                                    total: this.state.totalpageComments * this.state.pgsize,
                                    pageSize: this.state.pgsize,
                                    onChange: this.changePageComment,
                                }}
                            />


                        </div>

                    </div>


                </Modal>

                <h2 style={{marginTop: 15}}>杠杆审核</h2>
                {/*<div>this.state.detail :{JSON.stringify(this.state.detail)}</div>*/}


                <BreadcrumbCustom first="审核管理" second="杠杆审核"/>



                <Card title="杠杆审核"
                      extra={
                          <Button type="default"
                                  onClick={() => this.requestPage()}>刷新
                          </Button>
                      }
                      bodyStyle={{padding: 0, margin: 0}}
                >

                    <Table


                        rowKey="id"

                           columns={this.columns}
                           dataSource={this.state.userList}
                           scroll={{x: 1600}}
                           bordered
                           loading={this.state.loading}
                           pagination={{
                               showQuickJumper: true,
                               total: this.state.pgsize * this.state.totalPage,
                               pageSize: this.state.pgsize,
                               onChange: this.changePage,
                           }}
                    />
                </Card>
                {/*<Modal*/}
                    {/*title="查看操作日志"*/}
                    {/*visible={this.state.modal2OPDAYVisible}*/}
                    {/*onCancel={() => {*/}
                        {/*this.setState({*/}
                            {/*visible: false,*/}
                            {/*modal2OPDAYVisible: false,*/}
                        {/*});*/}
                    {/*}}*/}
                    {/*width={'80%'}*/}
                    {/*footer={null}>*/}
                    {/*<Table rowKey="id"*/}
                           {/*bordered*/}
                           {/*columns={this.columnsLog}*/}
                           {/*dataSource={this.state.operationDiaryHistory}*/}
                           {/*loading={this.state.loadingComment}*/}
                           {/*pagination={{*/}
                               {/*total: this.state.totalpageComments * this.state.pgsize,*/}
                               {/*pageSize: this.state.pgsize,*/}
                               {/*onChange: this.changePageComment,*/}
                           {/*}}*/}
                    {/*/>*/}

                {/*</Modal>*/}

                <Modal
                    bodyStyle={{
                        background: 'white',
                        padding: 0,
                        margin: 0,
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                            modal2OPDAYVisible: false,
                        });
                    }}
                    closable={false}
                    footer={null}
                    // onCancel={this.handleCancel}
                    visible={this.state.modal2OPDAYVisible}


                >

                    <div style={{borderRadius: '4px'}}>
                        <div style={{
                            alignItems: 'center',
                            justifyContent: 'center', height: 48, display: 'flex', padding: 0, background: '#FDD000'
                        }}>
                            <span style={{
                                fontSize: 18,
                                fontFamily: 'PingFangSC-Medium',
                                fontWeight: 500,
                                color: 'rgba(51,51,51,1)'
                            }}>{'查看操作日志'}
                            </span>
                        </div>
                        <Table
                            style={{marginTop: "20px", marginLeft: "20px", marginRight: "20px"}}
                            rowKey="id"
                            bordered
                            columns={this.columnsLog}
                            dataSource={this.state.operationDiaryHistory}
                            loading={this.state.loadingComment}
                            pagination={{
                                current: this.state.currentComment,
                                total: this.state.totalpageComments * this.state.pgsize,
                                pageSize: this.state.pgsize,
                                onChange: this.changePageComment,
                            }}
                        />


                    </div>


                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const todps = state.todos;
    return {todps};
};
const mapDispatchToProps = dispatch => ({
    addTodo: bindActionCreators(addTodo, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Basic);


