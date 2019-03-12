/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, Select, Modal, Card, Col, Row, Input, DatePicker} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";
import moment from 'moment';
import {CSVLink} from "react-csv";

const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';

class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bkroleList: [],
            mStarClientAccount: undefined,
            accrounRes: undefined,
            mBelongBkUserId: undefined,
            mNetEquity: '',
            mName: '',
            mRate: '',
            mExecTxnCurry: '',
            mNote: '',
            date: new Date(),
            userList: [],
            loading: false,
            totalPage: 1,
            current: 1,
            pgsize: 20,
            loadFor: false,
            detailMoVisible: false,
            depositDetail: {
                comment_step1: {

                    "id": 311,
                    "type": 13,
                    "belongUserId": "-1",
                    "ipAddress": null,
                    "delFlag": 0,
                    "bkUserName": null,
                    "createDate": 1547187714000,
                    "bkUserId": null,
                    "updateDate": null,
                    "recordId": 10,
                    "comment": "????????"
                }
            },

        };
    }


    requestUserCommentList = (record) => {


        var self = this;
        window.Axios.post('/auth/getRecordCommentList', {
            id: record.id,
            commentType: 3,
            pageNo: this.state.currentComment,
            pageSize: this.state.pgsize,
        }).then(function (response) {
            self.setState({
                totalpageComments: response.data.data.totalPage,
                operationDiaryHistory: response.data.data.list,
            });
        });
    }


    componentDidMount() {


        // window.Axios.post('back/addLogHistory', {
        //     'moduleLog': '财务管理',
        //     'pageLog': '入金管理',
        //     'commentLog': '查看了入金管理',
        //     'typeLog': 2,
        // })


        this.columnss = [
            {

                label: '订单编号',
                key: 'orderNo',

                align: 'center',
                title: '订单编号',
                dataIndex: '订单编号',
                render: (text, record) => (
                    <span>{record.orderNo}</span>),
            }, {
                label: '用户账号',
                dataIndex: '用户账号',
                key: 'accountNo',
                render: (text, record) => (<span>{record.accountNo}</span>),
                align: 'center',
            }, {
                label: '用户姓名',
                dataIndex: '用户姓名',
                key: 'name',
                align: 'center',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {
                align: 'center',
                label: '申请时间',
                dataIndex: '申请时间',
                key: 'creatDate',
                width: '100px',
                render: (text, record) => (
                    <span>{this.timestampToTime(record.comment_step1.createDate)}</span>)
            }, {
                align: 'center',
                label: '转入金额',
                dataIndex: '转入金额',
                key: 'accountAmount',
                render: (text, record) => (
                    <span>{record.accountAmount}</span>)
            }, {
                align: 'center',
                label: '账户币种',
                dataIndex: '账户币种',
                key: 'accountCurrency',
                render: (text, record) => (
                    <span>{record.accountCurrency}</span>),
            }, {
                align: 'center',
                label: '执行金额',
                dataIndex: '执行金额',
                key: 'execAmount',
                render: (text, record) => (
                    <span>{record.execAmount}</span>),
            }, {
                align: 'center',
                label: '执行币种',
                dataIndex: '执行币种',
                key: 'execCurrency',
                render: (text, record) => (
                    <span>{record.execCurrency}</span>),
            }, {
                align: 'center',
                label: '账号类型',
                dataIndex: '账号类型',
                key: 'broker',
                render: (text, record) => (
                    <span>{record.broker}</span>)
            }, {
                align: 'center',
                label: '使用汇率',
                dataIndex: '使用汇率',
                key: 'rate',
                render: (text, record) => (
                    <span>{record.rate}</span>)
            }, {
                align: 'center',
                label: '手续费',
                dataIndex: '手续费',
                key: 'feeAmount',
                render: (text, record) => (
                    <span>{record.feeAmount}</span>)
            }, {
                align: 'center',
                label: '入金渠道',
                dataIndex: '入金渠道',
                key: 'channelName',
                render: (text, record) => (
                    <span>{record.channelName}</span>)
            }, {
                align: 'center',
                label: '支付通道',
                dataIndex: '支付通道',
                key: 'tradeChannelName',
                render: (text, record) => (
                    <span>{record.tradeChannelName}</span>)
            }, {
                align: 'center',
                label: '状态',
                dataIndex: '状态',
                key: 'displayStatus',
                render: (text, record) => (
                    <span>{record.displayStatus}</span>)
            }, {
                align: 'center',
                label: '处理人',
                dataIndex: '处理人',
                key: 'bkUserName',
                render: (text, record) => (
                    <span>{record.bkUserName}</span>)
            }];


        this.columns = [
            {
                align: 'center',
                title: '订单编号',
                dataIndex: '订单编号',
                key: '订单编号',
                render: (text, record) => (
                    <span>{record.orderNo}</span>),
            }, {
                title: '用户账号',
                dataIndex: '用户账号',
                key: '用户账号',
                render: (text, record) => (<span>{record.accountNo}</span>),
                align: 'center',
            }, {
                title: '用户姓名',
                dataIndex: '用户姓名',
                key: '用户姓名',
                align: 'center',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {
                align: 'center',
                title: '申请时间',
                dataIndex: '申请时间',
                key: '申请时间',
                width: '100px',
                render: (text, record) => (
                    <span>{this.timestampToTime(record.comment_step1.createDate)}</span>)
            }, {
                align: 'center',
                title: '转入金额',
                dataIndex: '转入金额',
                key: '转入金额',
                render: (text, record) => (
                    <span>{record.accountAmount}</span>)
            }, {
                align: 'center',
                title: '账户币种',
                dataIndex: '账户币种',
                key: '账户币种',
                render: (text, record) => (
                    <span>{record.accountCurrency}</span>),
            }, {
                align: 'center',
                title: '执行金额',
                dataIndex: '执行金额',
                key: '执行金额',
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
                title: '账号类型',
                dataIndex: '账号类型',
                key: '账号类型',
                render: (text, record) => (
                    <span>{record.broker}</span>)
            }, {
                align: 'center',
                title: '使用汇率',
                dataIndex: '使用汇率',
                key: '使用汇率',
                render: (text, record) => (
                    <span>{record.rate}</span>)
            }, {
                align: 'center',
                title: '手续费',
                dataIndex: '手续费',
                key: '手续费',
                render: (text, record) => (
                    <span>{record.feeAmount}</span>)
            }, {
                align: 'center',
                title: '入金渠道',
                dataIndex: '入金渠道',
                key: '入金渠道',
                render: (text, record) => (
                    <span>{record.channelName}</span>)
            }, {
                align: 'center',
                title: '支付通道',
                dataIndex: '支付通道',
                key: '支付通道',
                render: (text, record) => (
                    <span>{record.tradeChannelName}</span>)
            }, {
                align: 'center',
                title: '状态',
                dataIndex: '状态',
                key: '状态',
                render: (text, record) => (
                    <span>{record.displayStatus}</span>)
            }, {
                align: 'center',
                title: '处理人',
                dataIndex: '处理人',
                key: '处理人',
                render: (text, record) => (
                    <span>{record.bkUserName}</span>)
            }, {
                align: 'center',
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.showDetailM(record)}>查看详情</Button>
                    </div>
                ),
            }];

        this.requestPage()
        var self = this

        window.Axios.post('back/getBackUserList', {
            'pageSize': 1000,
            'pageNo': 0,

        }).then((response) => {
            self.setState({
                bkroleList: response.data.data.list
            })

        })
    }

    showDetailM = (recodrd) => {
        console.log('hcia recodrd', recodrd)


        var self = this
        window.Axios.post('/finance/getDepositDetail', {
            id: recodrd.id,
        }).then((response) => {

            console.log('hcia response', response)
            // self.setState({
            //     totalpageComments: response.data.data.totalPage,
            //     operationDiaryHistory: response.data.data.list,
            // });

            self.setState({
                depositDetail: response.data.data,
                detailMoVisible: true,
            });
        });


        window.Axios.post('finance/getDepositDetail', {
            'id': recodrd.id
        }).then((response) => {

            console.log('hcia response', response)

            self.setState({
                mID: response.data.data.orderNo,
                mBelongBkUserId: response.data.data.belongBkUserId,
                mStarClientAccount: response.data.data.accountNo,
                mNetEquity: response.data.data.netEquity,
                mExecTxnAmt: response.data.data.execAmount,
                mExecTxnCurry: response.data.data.execCurrency,
                mRate: response.data.data.rate,
                mIndate: response.data.data.completeDate,
                mName: response.data.data.name,
                mCashBalance: response.data.data.cashBalance,
                mExpectDate: response.data.data.expectDate,
                commenS1: response.data.data.comment_step1.comment,
                commenBk1: response.data.data.comment_step1.bkUserName,
                commenDate1: response.data.data.comment_step1.createDate,
                mNote: response.data.data.comment_step2 ? response.data.data.comment_step2.comment : '',
                commenDate2: response.data.data.comment_step2 ? response.data.data.comment_step2.createDate : '',
                commenBk2: response.data.data.comment_step2 ? response.data.data.comment_step2.bkUserName : '',
                mAccountCurrency: response.data.data.accountCurrency,
            }, () => {

                console.log('hcia response', response)


                // message.success('request client data')
                setTimeout(self.requestStart, 300)


            })
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
    requestPage = () => {

        let self = this
        self.setState({
                loading: true,
            }
        );
        window.Axios.post('finance/getDepositHistory', {
            'pageSize': self.state.pgsize,
            'pageNo': self.state.current,
        }).then(function (response) {
            console.log(response);

            self.setState({
                    totalPage: response.data.data.totalPage,
                    loading: false,
                    userList: response.data.data.list
                }, () => {
                    self.state.userList.forEach(function (item, index, array) {
                        item.creatDate = self.timestampToTime(item.comment_step1.createDate);         // forEach 就如同 for，不過寫法更容易
                    });
                }
            );

            // Toast.loading('加载中...', 0, () => {
            //     // Toast.success('加载完成')
            // })
        })
    }
    changePage = (page) => {
        this.setState({
            current: page,
        }, () => {
            this.requestPage()
        })
    }


    render() {
        const imgsTag = this.state.bkroleList.map(v1 => (

            <Option key={v1.id} value={v1.id}>{v1.displayName ? v1.displayName : 'null'}</Option>

        ))
        return (
            <div>
                {/*<div>depositDetail :{JSON.stringify(this.state.depositDetail)}</div>*/}

                <h2 style={{marginTop: 15}}>
                    入金管理
                </h2>
                <BreadcrumbCustom first="交易管理" second="入金管理"/>

                <Card


                    extra={
                        <CSVLink filename={new Date() + "出入金报表.csv"} data={this.state.userList}
                                 headers={this.columnss}>
                            <Button onClick={() => {

                                console.log('hcia Button')

                                window.Axios.post('/auth/addOperatorLogHistory', {
                                    moduleLog: '交易管理',
                                    pageLog: '出入金报表',
                                    commentLog: '下载当前列表',
                                    typeLog: '18',
                                }).then(function (response) {

                                    console.log('hcia response', response)

                                });


                            }
                            }>下载当前列表</Button>
                        </CSVLink>
                    }
                    title="入金管理" bodyStyle={{padding: 0, margin: 0}}>

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
                    width={1000}

                    style={{width: '1000'}}
                    bodyStyle={{
                        background: 'white',
                        padding: 0,
                        margin: 0,
                        align: 'center',

                        width: '1000',
                        height: 780
                    }}
                    title={null}
                    closable={false}
                    footer={null}
                    visible={this.state.detailMoVisible}
                >


                    <div style={{
                        minWidth: '800px',
                        padding: '18px',
                        textAlign: 'center',
                        align: 'center',
                        background: 'white'
                    }}>
                        <p style={{
                            fontSize: 18,
                            fontFamily: 'PingFangSC-Medium',
                            fontWeight: 500,
                            color: 'rgba(51,51,51,1)'
                        }}>订单号:{this.state.mID}
                        </p>
                    </div>
                    <div style={{
                        align: 'center',
                        minWidth: '800px',
                        marginLeft: '90px',
                        marginRight: '100px',
                        paddingBottom: '10px'
                    }}>
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
                                        value={1}
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
                                    <Input value={this.state.mCashBalance}

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
                                    <Input
                                        value={this.state.mRate}
                                        style={{width: '200px', height: '36px'}}
                                        // mask={numberMask}

                                        className="ant-input"
                                        placeholder="汇率"
                                        guide={true}
                                        id="my-input-id"
                                        // onChange={(e) => {
                                        //     this.setState({
                                        //         mRate: e.target.value,
                                        //     });
                                        // }}

                                        // onBlur={() => {}}
                                        // onChange={() => {}}
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

                                    {/*<Input value={this.state.mExpectDate}*/}

                                    {/*style={{width: '200px', height: '36px'}}*/}

                                    {/*/>*/}
                                    <DatePicker
                                        disabled={true}
                                        style={{width: '200px', height: '36px'}}
                                        disabledDate={(current) => {
                                            return current.valueOf() < (Date.now() - 86400000)
                                        }}

                                        value={this.state.mExpectDate ? moment(this.state.mExpectDate, dateFormat) : null}

                                        // value={this.state.mExpectTime}
                                        onChange={(date, dateString) => {

                                            console.log('hcia date', date)
                                            console.log('hcia dateString', dateString)


                                            if (!date) {
                                                this.setState({mExpectDate: null})
                                                return

                                            }
                                            var date = new Date(dateString + ' 00:00:00:000');
                                            console.log('hcia date', date)
                                            var time1 = date.getTime();

                                            // console.log('hcia time1', time1)

                                            this.setState({mExpectDate: date})
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

                                    <Input value={this.state.mAccountCurrency}
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

                                    <Input value={this.state.mExecTxnCurry}
                                           style={{width: '200px', height: '36px'}}

                                    />
                                </div>


                            </Col>


                        </Row>


                        <div style={{
                            marginTop: '24px',
                            height: '1px',
                            background: 'rgba(230,230,230,1)'
                        }}>
                        </div>


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
                                    <Input value={this.state.commenS1}

                                           style={{width: '200px'}}

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


                                                    }}>打款备注</span>
                                    <Input value={this.state.mNote}

                                           style={{width: '200px'}}

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
                                                        textAlign: 'left',
                                                        width: '87px',
                                                        height: '22px',
                                                        fontFamily: 'PingFangSC-Medium',
                                                        fontWeight: 500,
                                                        color: '#292929',
                                                        fontSize: '14px'


                                                    }}>操作人</span>

                                    </div>


                                    <Input value={this.state.commenBk1}
                                           style={{width: '200px', height: '36px'}}

                                    />
                                </div>
                                <div style={{
                                    marginTop: '3px',

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


                                                    }}></span>

                                    </div>


                                    <span
                                        style={{
                                            color: '#292929',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            textAlign: 'center',
                                            width: '200px',
                                            height: '36px'
                                        }}

                                    >{this.state.commenDate1 ? this.timestampToTime(this.state.commenDate1) : ''}</span>
                                </div>
                                <div style={{
                                    // marginTop: '24px',
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


                                                    }}>操作人</span>

                                    </div>


                                    <Input value={this.state.commenBk2}
                                           style={{width: '200px', height: '36px'}}

                                    />
                                </div>
                                <div style={{
                                    marginTop: '3px',

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


                                                    }}></span>

                                    </div>


                                    <span
                                        style={{
                                            color: '#292929',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            textAlign: 'center',
                                            width: '200px',
                                            height: '36px'
                                        }}

                                    >{this.state.commenDate2 ? this.timestampToTime(this.state.commenDate2) : ''}</span>
                                </div>

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
                                                        textAlign: 'left',
                                                        width: '87px',
                                                        height: '22px',
                                                        fontFamily: 'PingFangSC-Medium',
                                                        fontWeight: 500,
                                                        color: '#292929',
                                                        fontSize: '14px'


                                                    }}>入金到账时间</span>

                                    </div>


                                    <Input value={this.state.mIndate}
                                           style={{width: '200px', height: '36px'}}

                                    />
                                </div>

                            </Col>


                        </Row>


                    </div>


                    <div style={{padding: 48, textAlign: 'center', align: 'center', background: 'white'}}>
                        <Button
                            onClick={() => {

                                console.log('hcia 关闭')


                                this.setState({
                                    detailMoVisible: false
                                })

                            }}

                            style={{
                                width: '180px',
                                height: '40px',
                                borderRadius: 'px',
                                background: '#FDD000',
                                fontSize: '20px',
                                fontWeight: '400px'

                            }}>关闭
                        </Button>
                    </div>


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
