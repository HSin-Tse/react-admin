/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {
    Button,
    Table,
    message,
    Select,
    Steps,
    Card,
    Col,
    Row,
    Input,
    Modal,
    Tooltip,
    Tag,
    DatePicker,
    Divider, Tabs, Checkbox
} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";
import moment from 'moment';
import {steps} from "./model/Steps";

const {TextArea} = Input;

const dateFormat = 'YYYY-MM-DD';

const Step = Steps.Step;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

class Basic extends Component {
    changeNote = (e) => {


        console.log('hcia e.target.value', e.target.value)


        this.setState({
            changeNoteV: e.target.value
        })
        // this.state.changeNoteV = e.target.value
    }

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
            dismissModal: false,
            dissmissRecodrdID: '',
            changeNoteV: '',

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
                            disabled={record.status == 3 || record.status == 4}


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
        var self = this

        // this.requestUserCommentList(recodrd)
        this.setState({
            dissmissRecodrdID: recodrd.id,
        }, () => {
            self.setState({dismissModal: true})
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

        var titleStule = {
            fontSize: '20px',
            fontFamily: 'PingFang-HK-Medium',
            fontWeight: 'bold',
            color: 'rgba(33,33,33,1)'
        }

        var titleCo = {
            align: 'center',
            textAlign: 'center',

            fontSize: '18px',
            fontFamily: 'PingFang-HK-Medium',
            fontWeight: 'bold',
            color: '#7B7B7B'
        }


        var ssdds = {

            paddingLeft: 15,
            paddingRight: 15,
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'flex',
            height: '40px',
            borderRadius: '40px 40px 40px 40px'
        }
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

                <div style={{

                    minWidth: '1200px',
                    background: "white",
                    boxShadow: '0px 0px 20px 0px rgba(123,123,123,0.1)',
                    borderRadius: '4px',


                }}>

                    <div style={{paddingTop: '36px', marginLeft: '145px', marginRight: '145px'}}>


                        <div style={{
                            justifyContent: 'space-around',
                            display: "flex",
                            alignItems: 'center',
                            background: 'white'
                        }}>

                            <div style={{

                                display: "flex",
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                background: 'rgba(246,209,71,1)',
                                borderRadius: '50%'
                            }}>
                                <span style={titleStule}>1</span>
                            </div>
                            <div style={{

                                flexGrow: '1',
                                height: '2px',
                                background: 'rgba(246,209,71,1)'
                            }}>

                            </div>
                            <div style={{

                                display: "flex",
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                background: 'rgba(246,209,71,1)',
                                borderRadius: '50%'
                            }}>
                                <span style={titleStule}>3</span>
                            </div>
                            <div style={{

                                flexGrow: '1',
                                height: '2px',
                                background: '#CCCCCC'
                            }}>

                            </div>
                            <div style={{
                                marginRight: '16px',
                                display: "flex",
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                background: '#CCCCCC',
                                borderRadius: '50%'
                            }}>
                                <span style={titleStule}>4</span>

                            </div>

                        </div>


                        <div style={{
                            justifyContent: 'space-around',
                            display: "flex",
                            alignItems: 'center',
                            background: 'white'
                        }}>
                            <span style={titleCo}>{steps[0].title}</span>
                            <div style={{
                                flexGrow: '1',
                                height: '2px',
                                background: '#00000000'
                            }}/>
                            <span style={{
                                paddingLeft: '32px',
                                align: 'center',
                                textAlign: 'center',
                                fontSize: '18px',
                                fontFamily: 'PingFang-HK-Medium',
                                fontWeight: 'bold',
                                color: '#7B7B7B'
                            }}>{steps[1].title}</span>
                            <div style={{
                                flexGrow: '1',
                                height: '2px',
                                background: '#00000000'
                            }}/>
                            <span style={titleCo}>{steps[2].title}</span>
                        </div>
                    </div>


                    {/*<Row*/}
                    {/*style={{margin: '20px'}}*/}

                    {/*gutter={32}>*/}
                    {/*<Col span={12}>*/}
                    {/*<div*/}

                    {/*style={{*/}
                    {/*background: 'rgba(255,255,255,1)',*/}
                    {/*boxShadow: '20px 20px 20px 20px rgba(123,123,123,0.1)',*/}
                    {/*borderRadius: '4px 4px'*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*<div style={{*/}
                    {/*borderRadius: '4px 4px 0px 0px',*/}
                    {/*padding: 15,*/}
                    {/*color: 'white',*/}
                    {/*background: '#F6D147',*/}
                    {/*alignItems: 'center',*/}
                    {/*justifyContent: 'space-between',*/}
                    {/*display: 'flex',*/}
                    {/*minHeight: 48*/}
                    {/*}}>*/}
                    {/*<span style={{fontSize: '15px'}}>可用余额</span>*/}
                    {/*<span style={{fontSize: '15px'}}>00.00</span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}>余额:</span>*/}
                    {/*<span style={{fontSize: '13px'}}>00.00</span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}>奖励金:</span>*/}
                    {/*<span style={{fontSize: '13px'}}>00.00</span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}>出金待审核:</span>*/}
                    {/*<span style={{fontSize: '13px'}}>00.00</span>*/}
                    {/*</div>*/}
                    {/*<Divider style={{paddingLeft: 15, paddingRight: 15}}/>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}>总入金:</span>*/}
                    {/*<span style={{fontSize: '13px'}}>00.00</span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}>出金:</span>*/}
                    {/*<span style={{fontSize: '13px'}}>00.00</span>*/}
                    {/*</div>*/}
                    {/*</div>*/}


                    {/*<Card*/}
                    {/*style={{marginTop: 15}}*/}
                    {/*bodyStyle={{padding: 0, margin: 0}}*/}
                    {/*bordered={false}>*/}
                    {/*<div style={{*/}
                    {/*padding: 15,*/}
                    {/*color: 'white',*/}
                    {/*background: '#F6D147',*/}
                    {/*alignItems: 'center',*/}
                    {/*justifyContent: 'space-between',*/}
                    {/*display: 'flex',*/}
                    {/*minHeight: 40*/}
                    {/*}}>*/}
                    {/*<span style={{fontSize: '15px'}}>成功交易</span>*/}
                    {/*<span style={{fontSize: '15px'}}></span>*/}
                    {/*</div>*/}
                    {/*<Table rowKey="id"*/}
                    {/*columns={[*/}

                    {/*{*/}
                    {/*title: '交易',*/}
                    {/*align: 'center',*/}
                    {/*dataIndex: 'bkUserName',*/}
                    {/*key: 'operationDiary_User',*/}
                    {/*render: (text, record) => (*/}
                    {/*<div>{record.bkUserName}</div>),*/}
                    {/*}, {*/}
                    {/*title: '入',*/}
                    {/*align: 'center',*/}
                    {/*dataIndex: 'createDate',*/}
                    {/*key: 'operationDiary_Date',*/}
                    {/*render: (text, record) => (*/}
                    {/*<span>{record.createDate}</span>),*/}
                    {/*}, {*/}
                    {/*title: '出',*/}
                    {/*align: 'center',*/}
                    {/*dataIndex: 'comment',*/}
                    {/*key: 'operationDiary_Status',*/}
                    {/*render: (text, record) => (*/}
                    {/*<span>{record.comment}</span>),*/}
                    {/*}]}*/}
                    {/*dataSource={this.state.operationDiaryHistory}*/}
                    {/*loading={this.state.loadingComment}*/}
                    {/*pagination={{*/}
                    {/*total: this.state.totalpageComments * this.state.pgsize,*/}
                    {/*pageSize: this.state.pgsize,*/}
                    {/*onChange: this.changePageComment,*/}
                    {/*}}*/}
                    {/*/>*/}
                    {/*<div>*/}
                    {/*<span>显示第1条到第5条，共10条</span>*/}
                    {/*</div>*/}
                    {/*</Card>*/}

                    {/*</Col>*/}
                    {/*<Col span={12}>*/}

                    {/*<Card*/}
                    {/*bodyStyle={{padding: 0, margin: 0}}*/}
                    {/*bordered={false}>*/}


                    {/*<div style={{*/}
                    {/*padding: 15,*/}
                    {/*color: 'white',*/}
                    {/*background: '#F6D147',*/}
                    {/*alignItems: 'center',*/}
                    {/*justifyContent: 'space-between',*/}
                    {/*display: 'flex',*/}
                    {/*minHeight: 40*/}
                    {/*}}>*/}
                    {/*<span style={{fontSize: '15px'}}>出金申请详情</span>*/}
                    {/*<span style={{fontSize: '15px'}}>00.00</span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}>请求出金金额:</span>*/}
                    {/*<span style={{fontSize: '13px'}}>00.00</span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}><span*/}
                    {/*style={{color: 'red'}}>*</span>出金金额:</span>*/}
                    {/*<span style={{fontSize: '13px'}}><Input style={{width: 220}}*/}
                    {/*placeholder="100.00"/>USD</span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}>出金日期</span>*/}
                    {/*<span style={{fontSize: '13px'}}>1900-10-10 10:10:10</span>*/}
                    {/*</div>*/}

                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}>用户名/帐号</span>*/}
                    {/*<span style={{fontSize: '13px'}}>1900-10-10 10:10:10</span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}>订单号</span>*/}
                    {/*<span style={{fontSize: '13px'}}>0001</span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}>经济商</span>*/}
                    {/*<span style={{fontSize: '13px'}}>BBIX</span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}>支付方式</span>*/}

                    {/*<Select defaultValue="lucy" style={{margin: 5, width: 220}}>*/}
                    {/*<Option value="jack">001</Option>*/}
                    {/*<Option value="lucy">002</Option>*/}
                    {/*</Select>*/}

                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}><span*/}
                    {/*style={{color: 'red'}}>*</span>银行名称</span>*/}
                    {/*<span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}*/}
                    {/*placeholder=""/></span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}>收款银行预留手机号</span>*/}
                    {/*<span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}*/}
                    {/*placeholder=""/></span>*/}
                    {/*</div>*/}

                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}><span style={{color: 'red'}}>*</span> 省</span>*/}
                    {/*<span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}*/}
                    {/*placeholder=""/></span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}><span style={{color: 'red'}}>*</span>城市</span>*/}
                    {/*<span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}*/}
                    {/*placeholder=""/></span>*/}
                    {/*</div>*/}

                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}><span*/}
                    {/*style={{color: 'red'}}>*</span>支行名称</span>*/}
                    {/*<span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}*/}
                    {/*placeholder=""/></span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}><span*/}
                    {/*style={{color: 'red'}}>*</span>收款人姓名</span>*/}
                    {/*<span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}*/}
                    {/*placeholder=""/></span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}><span*/}
                    {/*style={{color: 'red'}}>*</span>收款银行账户</span>*/}
                    {/*<span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}*/}
                    {/*placeholder=""/></span>*/}
                    {/*</div>*/}
                    {/*<div style={ssdds}>*/}
                    {/*<span style={{fontSize: '13px'}}>备注:</span>*/}
                    {/*<span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}*/}
                    {/*placeholder=""/></span>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*<Tabs justify tabBarGutter={'0%'} tabBarStyle={{width: '100%'}} type="card">*/}
                    {/*<TabPane tab={'客维审核'} key="1">*/}


                    {/*<Card>*/}
                    {/*<div><Checkbox>没有第三方资金</Checkbox></div>*/}
                    {/*<div><Checkbox>没有未批准的信用金／奖励金</Checkbox></div>*/}
                    {/*<div><Checkbox>初始入金至原始入金渠道</Checkbox></div>*/}
                    {/*<div><Checkbox>盈利通过银行转账到同名交易账号</Checkbox></div>*/}

                    {/*<div style={{*/}
                    {/*marginTop: 10,*/}
                    {/*marginBottom: 10,*/}
                    {/*}}>请注意：*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*1.只有在提交此请求后才能将钱汇到客户银行账户。*/}

                    {/*</div>*/}
                    {/*<div>*/}
                    {/*2.当按下“批准出金”按钮时，出金金额将从客户的交易账户中自动扣除。*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*此请求将被关闭并可在归档中查看。*/}
                    {/*</div>*/}

                    {/*<TextArea*/}
                    {/*style={{*/}
                    {/*marginTop: 10,*/}
                    {/*marginBottom: 10,*/}
                    {/*}}*/}
                    {/*rows={4}*/}
                    {/*value={this.state.theComment}*/}
                    {/*onChange={(e) => {*/}
                    {/*let comment = e.target.value;*/}
                    {/*this.setState({*/}
                    {/*theComment: comment*/}
                    {/*});*/}
                    {/*}}*/}
                    {/*placeholder="备注"/>*/}

                    {/*<div style={{*/}
                    {/*margin: 5,*/}
                    {/*justifyContent: "space-around",*/}
                    {/*display: 'flex'*/}
                    {/*}}>*/}

                    {/*<Button style={{*/}
                    {/*margin: 10, width: 150*/}
                    {/*}}>确认扣款</Button>*/}
                    {/*<Button style={{*/}
                    {/*margin: 10, width: 150*/}
                    {/*}}>挂起待确认</Button>*/}
                    {/*<Button style={{*/}
                    {/*margin: 10, width: 150*/}
                    {/*}}>取消</Button>*/}


                    {/*</div>*/}
                    {/*<Table rowKey="id"*/}
                    {/*columns={[*/}

                    {/*{*/}
                    {/*title: '日期',*/}
                    {/*align: 'center',*/}
                    {/*dataIndex: 'bkUserName',*/}
                    {/*key: 'operationDiary_User',*/}
                    {/*render: (text, record) => (*/}
                    {/*<div>{record.bkUserName}</div>),*/}
                    {/*}, {*/}
                    {/*title: '备注',*/}
                    {/*align: 'center',*/}
                    {/*dataIndex: 'createDate',*/}
                    {/*key: 'operationDiary_Date',*/}
                    {/*render: (text, record) => (*/}
                    {/*<span>{record.createDate}</span>),*/}
                    {/*}, {*/}
                    {/*title: '审核类型',*/}
                    {/*align: 'center',*/}
                    {/*dataIndex: 'comment',*/}
                    {/*key: 'operationDiary_Status',*/}
                    {/*render: (text, record) => (*/}
                    {/*<span>{record.comment}</span>),*/}
                    {/*}, {*/}
                    {/*title: '操作人',*/}
                    {/*align: 'center',*/}
                    {/*dataIndex: 'comment',*/}
                    {/*key: 'operationDiary_Status',*/}
                    {/*render: (text, record) => (*/}
                    {/*<span>{record.comment}</span>),*/}
                    {/*}]}*/}
                    {/*dataSource={this.state.operationDiaryHistory}*/}
                    {/*loading={this.state.loadingComment}*/}
                    {/*pagination={{*/}
                    {/*total: this.state.totalpageComments * this.state.pgsize,*/}
                    {/*pageSize: this.state.pgsize,*/}
                    {/*onChange: this.changePageComment,*/}
                    {/*}}*/}
                    {/*/>*/}
                    {/*</Card>*/}


                    {/*</TabPane>*/}
                    {/*<TabPane tab={steps[1].title} key="2">*/}
                    {/*<p>Content of Tab Pane 2</p>*/}
                    {/*<p>Content of Tab Pane 2</p>*/}
                    {/*<p>Content of Tab Pane 2</p>*/}
                    {/*</TabPane>*/}
                    {/*<TabPane tab={steps[2].title} key="3">*/}
                    {/*<p>Content of Tab Pane 3</p>*/}
                    {/*<p>Content of Tab Pane 3</p>*/}
                    {/*<p>Content of Tab Pane 3</p>*/}
                    {/*</TabPane>*/}
                    {/*</Tabs>*/}
                    {/*</div>*/}
                    {/*</Card>*/}
                    {/*</Col>*/}
                    {/*<Col span={12}>*/}

                    {/*</Col>*/}


                    {/*</Row>*/}


                </div>

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
                    style={{borderRadius: '4px 4px 0px 0px'}}
                    bodyStyle={{
                        background: 'white',
                        padding: 0,
                        margin: 0,
                        width: 600,
                        height: 317
                    }}
                    title={null}
                    closable={false}
                    footer={null}
                    visible={this.state.dismissModal}
                    // onOk={this.handleOk}
                    // onCancel={(e) => {
                    //     console.log(e);
                    //     this.setState({
                    //         dismissModal: false,
                    //     });
                    // }}
                >
                    <div style={{lineHeight: '48px', textAlign: 'center', background: '#FDD000', height: '48px'}}>
                        <span style={{
                            fontSize: '18px',
                            fontFamily: 'PingFangSC-Medium',
                            fontWeight: '500px',
                            color: 'rgba(51,51,51,1)'
                        }}>是否取消本次入金</span>

                    </div>
                    <div style={{marginTop: '48px', textAlign: 'center'}}>
                        <span style={{
                            fontSize: '14px',
                            fontFamily: 'PingFangSC-Medium',
                            fontWeight: '500px',
                            color: 'rgba(41,41,41,1)'
                        }}>请输入原因</span>
                    </div>
                    <div style={{
                        marginTop: '12px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '600px',
                        display: 'flex'
                    }}>
                        <TextArea

                            onChange={this.changeNote}
                            style={{minHeight: '60px', maxHeight: '60px', marginLeft: '80px', marginRight: '80px'}}


                            value={this.state.changeNoteV}/>
                    </div>
                    <div style={{
                        marginLeft: '45px',
                        marginRight: '45px',
                        height: '120px', justifyContent: 'space-around',
                        alignItems: 'center', display: 'flex'
                    }}>

                        <Button onClick={() => {


                            if (!this.state.changeNoteV) {

                                message.error('备注必填')
                            }

                            var self = this
                            window.Axios.post('finance/updateDeposit', {
                                'id': this.state.dissmissRecodrdID,
                                'content': this.state.changeNoteV,
                                'status': '4',

                            }).then((response) => {

                                message.success('操作成功')
                                this.requestPage()

                                self.setState({dissmissRecodrdID: '', changeNoteV: '', dismissModal: false})


                            })


                        }} style={{background: '#F6D147', width: 180, height: 40}}> 确定</Button>
                        <Button onClick={() => {
                            this.setState({
                                dismissModal: false,
                            });
                        }} style={{background: 'rgba(255,255,255,1)', width: 180, height: 40}}> 取消</Button>


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
