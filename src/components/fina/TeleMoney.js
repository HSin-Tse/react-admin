/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, message, Select, Steps, Card, Col, Row, Input, Modal, Tooltip, Tag, DatePicker} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

const Step = Steps.Step;
const Option = Select.Option;

class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accountTxnCurryList: [],
            bkroleList: [],
            selectedRowKeys: [],
            date: new Date(),
            userList: [],
            loading: false,
            totalPage: 1,
            current: 0,
            mStarClientAccount: undefined,
            accrounRes: undefined,
            mBelongBkUserId: undefined,
            mNetEquity: '',
            mName: '',
            mRate: '',
            mExecTxnCurry: '',
            mNote: '',
            mAccountTxnCurry: '',
            mExpectTime: null,
            mExecTxnAmt: '',
            currentStep: 0,
            pgsize: 20,
            loadFor: false,
            dismissModal: true,
            dissmissRecodrd: true,

        };
    }


    componentDidMount() {

        var self = this
        window.Axios.post('back/addLogHistory', {
            'moduleLog': '财务管理',
            'pageLog': '入金审核',
            'commentLog': '查看了入金审核',
            'typeLog': 2,
        })
        this.columns = [
            {
                title: '序号',
                dataIndex: '序号',
                key: '序号',
                align: 'center',
                render: (text, record, index) => (
                    <span>{this.state.current * this.state.pgsize + index + 1}</span>
                ),
            },
            {
                align: 'center',
                title: '交易账号',
                dataIndex: '交易账号',
                key: '交易账号',
                render: (text, record) => (
                    <span>{record.accountNo}</span>),
            }, {

                title: '姓名',

                dataIndex: '姓名',
                key: '姓名',
                render: (text, record) => (<span>{record.name}</span>),
                align: 'center',
            }, {
                title: '账户类型',
                dataIndex: '账户类型',
                key: '账户类型',
                render: (text, record) => (
                    <span>{record.broker}</span>),
                align: 'center',
            }, {
                title: '添加时间',
                dataIndex: '添加时间',
                align: 'center',

                key: '添加时间',
                render: (text, record) => (
                    <span>{this.timestampToTime(record.comment_step1.createDate)}</span>)
            }, {
                align: 'center',
                title: '入金金额（￥）',
                dataIndex: '入金金额（￥）',
                key: '入金金额（￥）',
                render: (text, record) => (
                    <span>{record.accountAmount}</span>),
            }, {
                align: 'center',

                title: '入金币种',
                dataIndex: '入金币种',
                key: '入金币种',
                render: (text, record) => (
                    <span>{record.accountCurrency}</span>)
            }, {
                align: 'center',

                title: '执行金额（$)',
                dataIndex: '执行金额（$)',
                key: '执行金额（$)',
                render: (text, record) => (
                    <span>{record.execAmount}</span>),
            }, {
                align: 'center',

                title: '执行币种',
                dataIndex: '执行币种',
                key: '执行币种',

                render: (text, record) => (
                    <span>{record.execCurrency}</span>),
            }, {
                align: 'center',

                title: '使用汇率',
                dataIndex: '使用汇率',
                key: '使用汇率',

                render: (text, record) => (
                    <span>{record.rate}</span>),
            }, {
                align: 'center',

                title: '手续费',
                dataIndex: '手续费',
                key: '手续费',
                render: (text, record) => (
                    <span>{record.feeAmount}</span>
                )

            }, {
                align: 'center',
                title: '账户余额',
                dataIndex: '账户余额',
                key: '账户余额',
                render: (text, record) => (
                    <span>{record.cashBalance}</span>)
            }, {
                align: 'center',

                title: '期望到账时间',
                dataIndex: '期望到账时间',
                key: '期望到账时间',
                render: (text, record) => (
                    <span>{record.expectDate}</span>)
            }, {
                align: 'center',

                title: '创建人',
                dataIndex: '创建人',
                key: '创建人',
                render: (text, record) => (
                    <span>{record.bkUserName}</span>)
            }, {
                align: 'center',
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <div>

                        <Button
                            size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                            disabled={record.status == 3}


                            onClick={
                                () => this.showOPDAyModal3(record)
                            }>{record.status == 2 ? '取消' : record.status == 3 ? '审核成功' : '已取消'}


                        </Button>


                    </div>
                ),
            }];
        this.requestPage()


        window.Axios.post('dict/openDict', {
            'keys': 'finance_currency',

        }).then((response) => {
            self.setState({
                accountTxnCurryList: response.data.data.finance_currency
            })

        })


        window.Axios.post('back/getBackUserList', {
            'pageSize': 1000,
            'pageNo': 0,

        }).then((response) => {
            self.setState({
                bkroleList: response.data.data.list
            })

        })

    }


    showOPDAyModal3 = (recodrd) => {

        console.log('hcia recodrd', recodrd)


        // this.requestUserCommentList(recodrd)
        this.setState({
            dissmissRecodrd: recodrd,
            dismissModal: true,
        });


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
    requestPage = () => {

        let self = this
        self.setState({
                loading: true,
            }
        );


        window.Axios.post('finance/getDepositHistory', {
            'listType': 1,
            'pageSize': self.state.pgsize,
            'pageNo': self.state.current,
        }).then((response) => {
            console.log(response);

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
            current: page - 1,
        }, () => {
            this.requestPage()
        })
    }


    render() {
        const steps = [{
            title: '新增',
            content: 'First-content',
        }, {
            title: '财务审核',
            content: 'Second-content',
        }, {
            title: '完成入金',
            content: 'Last-content',
        }];

        const imgsTag = this.state.bkroleList.map(v1 => (

            <Option key={v1.id} value={v1.id}>{v1.displayName ? v1.displayName : 'null'}</Option>

        ))

        const accountTList = this.state.accountTxnCurryList.map(v1 => (

            <Option key={v1.value} value={v1.value}>{v1.name ? v1.name : 'null'}</Option>

        ))


        return (

            <div>

                {/*<div>accrounRes :{JSON.stringify(this.state.accrounRes)}</div>*/}
                {/*<div>live931773069</div>*/}
                {/*<div>mBelongBkUserId :{JSON.stringify(this.state.mBelongBkUserId)}</div>*/}
                {/*<div>mNetEquity :{JSON.stringify(this.state.mNetEquity)}</div>*/}
                {/*<div>mNote :{JSON.stringify(this.state.mNote)}</div>*/}
                {/*<div>mAccountTxnCurry :{JSON.stringify(this.state.mAccountTxnCurry)}</div>*/}
                {/*<div>mExpectTime :{JSON.stringify(this.state.mExpectTime)}</div>*/}
                {/*<div>mExecTxnAmt :{JSON.stringify(this.state.mExecTxnAmt)}</div>*/}
                {/*<div>mRate :{JSON.stringify(this.state.mRate)}</div>*/}
                {/*<div>mExecTxnCurry :{JSON.stringify(this.state.mExecTxnCurry)}</div>*/}
                {/*<div>mAccountTxnCurry :{JSON.stringify(this.state.mAccountTxnCurry)}</div>*/}


                <h2 style={{marginTop: 15}}>新增电汇入金</h2>
                <BreadcrumbCustom first="财务管理" second="电汇入金" third="新增"/>


                <Card style={{marginTop: 15}} title={null}
                      bodyStyle={{padding: '0px', margin: '0px'}}>

                    <div style={{transform: "scale(1.3,1.3)"}}>

                        <Steps
                            style={{
                                marginLeft: "30%",
                                marginBottom: "20px",
                                marginTop: "40px",
                                width: "40%",
                                height: 80
                            }}
                            labelPlacement={'vertical'} current={this.state.currentStep}>
                            {steps.map(item => <Step key={item.title} title={item.title}/>)}
                        </Steps>

                    </div>
                    <Card
                        bodyStyle={{padding: '0px', margin: '0px'}}
                        actions={[<Button

                            onClick={() => {

                                console.log('hcia this.state.mExpectTime', this.state.mExpectTime ? this.state.mExpectTime.getTime() : undefined)

                                window.Axios.post('finance/createDeposit', {
                                    'belongBkUserId': this.state.mBelongBkUserId,//
                                    'accountFrom': 1,//1 IXtrader
                                    'starClientAccount': this.state.mStarClientAccount,//
                                    'execTxnAmt': this.state.mExecTxnAmt,
                                    'execTxnCurry': this.state.mExecTxnCurry,
                                    'rate': this.state.mRate,
                                    'accountTxnCurry': this.state.mAccountTxnCurry,//this.state.mAccountTxnCurry
                                    'expectTime': this.state.mExpectTime ? this.state.mExpectTime.getTime() : undefined,
                                    'content': this.state.mNote,
                                }).then((response) => {


                                    message.success('操作成功')

                                    this.requestPage()
                                    // self.setState({
                                    //         totalPage: response.data.data.totalPage,
                                    //         loading: false,
                                    //         userList: response.data.data.list
                                    //     }
                                    // );


                                })

                            }}

                            style={{margin: '12px', background: '#F6D147', height: 40, width: 180}} block>创建 </Button>,
                            <Button
                                onClick={() => {

                                    this.setState({
                                        mStarClientAccount: undefined,
                                        mBelongBkUserId: undefined,
                                        mNetEquity: '',
                                        mName: '',
                                        mRate: '',
                                        mNote: '',
                                        mAccountTxnCurry: '',
                                        mExecTxnCurry: '',
                                        mExpectTime: null,
                                        mExecTxnAmt: '',
                                    })
                                }}
                                style={{margin: '12px', height: 40, width: 180}} block>重新输入 </Button>]}
                        title={null}
                        bordered={true}
                        headStyle={{textAlign: 'center', width: '100%'}}
                        style={{marginLeft: '16%', width: '68%'}}>


                        <div>
                            <div style={{padding: 12, textAlign: 'center', align: 'center', background: 'white'}}>
                                <p style={{
                                    fontSize: 18,
                                    fontFamily: 'PingFangSC-Medium',
                                    fontWeight: 500,
                                    color: 'rgba(51,51,51,1)'
                                }}>新增客户入金
                                </p>
                            </div>
                            <div>
                                <Row>
                                    <Col style={{textAlign: 'right', align: 'center', background: 'white'}} span={12}>


                                        <div style={{

                                            textAlign: 'left',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <span style={{

                                            textAlign: 'left',
                                            marginRight: '37px',


                                            width: '57px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px'


                                        }}>客户归属</span>

                                            <Select

                                                onChange={(value) => {


                                                    this.setState({mBelongBkUserId: value})
                                                    console.log('hcia value', value)
                                                }}
                                                value={this.state.mBelongBkUserId}
                                                style={{width: '200px', height: '36px'}}>

                                                {imgsTag}


                                            </Select>


                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <span style={{
                                                marginRight: '37px',
                                                fontFamily: 'PingFangSC-Medium',
                                                fontWeight: 500,
                                                color: '#292929',
                                                fontSize: '14px',
                                                width: '57px',


                                            }}>交易平台</span>


                                            <Select
                                                defaultValue={1}
                                                style={{width: '200px', height: '36px'}}>
                                                <Option key={1} value={1}>{'IXTrader'}</Option>
                                            </Select>

                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                                    <span style={{
                                                        marginRight: '37px',
                                                        fontFamily: 'PingFangSC-Medium',
                                                        fontWeight: 500,
                                                        color: '#292929',
                                                        fontSize: '14px',
                                                        width: '57px',
                                                    }}>交易账号</span>
                                            <Input value={this.state.mStarClientAccount}
                                                   onChange={(e) => {


                                                       var self = this
                                                       console.log('hcia e.target.value', e.target.value)
                                                       this.setState({
                                                           mStarClientAccount: e.target.value,
                                                       }, () => {

                                                           window.Axios.post('star/getStarLiveAccountDetail', {
                                                               'starClientAccount': self.state.mStarClientAccount,

                                                           }).then((response) => {

                                                               console.log('hcia response', response)


                                                               if (response.data.data) {
                                                                   self.setState({
                                                                       mNetEquity: response.data.data[0].netEquity,
                                                                       mName: response.data.data[0].name
                                                                   })
                                                               } else {

                                                                   self.setState({
                                                                       mNetEquity: '',
                                                                       mName: '',
                                                                   })
                                                               }


                                                           })

                                                       });


                                                   }}
                                                   style={{width: '200px', height: '36px'}}

                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                                    <span style={{
                                                        marginRight: '37px',
                                                        fontFamily: 'PingFangSC-Medium',
                                                        fontWeight: 500,
                                                        color: '#292929',
                                                        fontSize: '14px',
                                                        width: '57px',


                                                    }}>账户余额</span>
                                            <Input value={this.state.mNetEquity}

                                                   style={{width: '200px', height: '36px'}}
                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                                    <span style={{
                                                        marginRight: '37px',
                                                        fontFamily: 'PingFangSC-Medium',
                                                        fontWeight: 500,
                                                        color: '#292929',
                                                        fontSize: '14px',
                                                        width: '57px',


                                                    }}>执行金额</span>
                                            <Input value={this.state.mExecTxnAmt}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           mExecTxnAmt: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}

                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                                    <span style={{
                                                        marginRight: '37px',
                                                        fontFamily: 'PingFangSC-Medium',
                                                        fontWeight: 500,
                                                        color: '#292929',
                                                        fontSize: '14px',
                                                        width: '57px',


                                                    }}>汇率</span>
                                            <Input value={this.state.mRate}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           mRate: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}

                                            />
                                        </div>

                                    </Col>

                                    <Col style={{background: 'white'}} span={12}>

                                        <div style={{
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                                    <span style={{

                                                        marginRight: '5px',
                                                        fontFamily: 'PingFangSC-Medium',
                                                        fontWeight: 500,
                                                        color: '#FF4D4D',
                                                        fontSize: '14px'


                                                    }}>*</span>


                                                <span style={{
                                                    fontFamily: 'PingFangSC-Medium',
                                                    fontWeight: 500,
                                                    color: '#292929',
                                                    fontSize: '14px'

                                                }}>入金渠道</span>
                                            </div>
                                            <Input value={'电汇'}

                                                   style={{width: '200px', height: '36px'}}

                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                                    <span style={{

                                                        marginRight: '5px',
                                                        fontFamily: 'PingFangSC-Medium',
                                                        fontWeight: 500,
                                                        color: '#FF4D4D',
                                                        fontSize: '14px'


                                                    }}>*</span>


                                                <span style={{
                                                    fontFamily: 'PingFangSC-Medium',
                                                    fontWeight: 500,
                                                    color: '#292929',
                                                    fontSize: '14px'


                                                }}>支付通道</span>

                                            </div>

                                            <Input value={'电汇'}

                                                   style={{width: '200px', height: '36px'}}

                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                                    <span style={{
                                                        textAlign: 'left',
                                                        width: '87px',
                                                        height: '22px',
                                                        fontFamily: 'PingFangSC-Medium',
                                                        fontWeight: 500,
                                                        color: '#292929',
                                                        fontSize: '14px'


                                                    }}>期望到账时间</span>

                                            </div>


                                            <DatePicker
                                                style={{width: '200px', height: '36px'}}
                                                disabledDate={(current) => {
                                                    return current.valueOf() < (Date.now() - 86400000)
                                                }}

                                                value={this.state.mExpectTime ? moment(this.state.mExpectTime, dateFormat) : null}

                                                // value={this.state.mExpectTime}
                                                onChange={(date, dateString) => {

                                                    console.log('hcia date', date)
                                                    console.log('hcia dateString', dateString)


                                                    if (!date) {
                                                        this.setState({mExpectTime: null})
                                                        return

                                                    }
                                                    var date = new Date(dateString + ' 00:00:00:000');
                                                    console.log('hcia date', date)
                                                    var time1 = date.getTime();

                                                    // console.log('hcia time1', time1)

                                                    this.setState({mExpectTime: date})
                                                    // console.log('hcia date' , date)

                                                    // console.log('hcia ',date, dateString);
                                                    // console.log('hcia',date, dateString);
                                                }}/>

                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                                    <span style={{
                                                        textAlign: 'left',
                                                        width: '87px',
                                                        height: '22px',
                                                        fontFamily: 'PingFangSC-Medium',
                                                        fontWeight: 500,
                                                        color: '#292929',
                                                        fontSize: '14px'


                                                    }}>账号币种</span>

                                            </div>

                                            <Select

                                                onChange={(value) => {


                                                    this.setState({mAccountTxnCurry: value})
                                                    console.log('hcia value', value)
                                                }}
                                                value={this.state.mAccountTxnCurry}
                                                style={{width: '200px', height: '36px'}}>

                                                {accountTList}


                                            </Select>
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                                    <span style={{
                                                        textAlign: 'left',
                                                        width: '87px',
                                                        height: '22px',
                                                        fontFamily: 'PingFangSC-Medium',
                                                        fontWeight: 500,
                                                        color: '#292929',
                                                        fontSize: '14px'


                                                    }}>账户所有人</span>

                                            </div>


                                            <Input value={this.state.mName}
                                                   style={{width: '200px', height: '36px'}}

                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                                    <span style={{
                                                        textAlign: 'left',
                                                        width: '87px',
                                                        height: '22px',
                                                        fontFamily: 'PingFangSC-Medium',
                                                        fontWeight: 500,
                                                        color: '#292929',
                                                        fontSize: '14px'


                                                    }}>支付币种</span>

                                            </div>

                                            <Select

                                                onChange={(value) => {


                                                    this.setState({mExecTxnCurry: value})
                                                    console.log('hcia value', value)
                                                }}
                                                value={this.state.mExecTxnCurry}
                                                style={{width: '200px', height: '36px'}}>

                                                {accountTList}


                                            </Select>
                                            {/*<Input value={'CNY'}*/}

                                            {/*style={{width: '200px', height: '36px'}}*/}

                                            {/*/>*/}
                                        </div>


                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={{background: 'white'}} span={2}></Col>
                                    <Col span={20}>
                                        <div style={{
                                            marginTop: '24px',
                                            width: '737px',
                                            height: 1,
                                            background: '#E6E6E6',
                                        }}></div>
                                    </Col>
                                    <Col style={{background: 'white'}} span={2}></Col>
                                </Row>
                                <Row style={{marginTop: '24px', marginBottom: '24px'}}>
                                    <Col style={{textAlign: 'right', align: 'center', background: 'white'}} span={12}>


                                        <div style={{

                                            textAlign: 'left',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                                    <span style={{

                                                        textAlign: 'left',
                                                        marginRight: '37px',


                                                        width: '57px',
                                                        fontFamily: 'PingFangSC-Medium',
                                                        fontWeight: 500,
                                                        color: '#292929',
                                                        fontSize: '14px'


                                                    }}>创建备注</span>
                                            <Input value={this.state.mNote}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           mNote: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}

                                            />
                                        </div>


                                    </Col>

                                    <Col style={{background: 'white'}} span={12}>


                                    </Col>


                                </Row>


                            </div>

                        </div>


                    </Card>
                </Card>


                <Card style={{marginTop: 15}} title="电汇入金列表"
                      bodyStyle={{padding: 0, margin: 0}}

                >

                    <Table rowKey="id"

                           columns={this.columns}
                           dataSource={this.state.userList}
                           scroll={{x: 1600}}
                           bordered
                           loading={this.state.loading}
                           pagination={{  // 分页
                               total: this.state.pgsize * this.state.totalPage,
                               pageSize: this.state.pgsize,
                               onChange: this.changePage,
                           }}
                    />
                </Card>
                <Modal
                    title="是否取消本次入金"
                    visible={this.state.dismissModal}
                    onOk={this.handleOk}
                    onCancel={(e) => {
                        console.log(e);
                        this.setState({
                            dismissModal: false,
                        });
                    }}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>

        )
    }
}

const mapStateToProps = state => {
    const {auth = {data: {}}, responsive = {data: {}}} = state.httpData;
    return {auth, responsive};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Basic);
