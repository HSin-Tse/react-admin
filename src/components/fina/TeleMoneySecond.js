/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';


import {
    Button,
    Table,
    message,
    Select,
    Card,
    Col,
    Row,
    Input,
    Modal,
} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";

const {TextArea} = Input;
const Option = Select.Option;

// First, you need to create the `numberMask` with your desired configurations

class Basic extends Component {
    changeNote = (e) => {
        this.setState({changeNoteV: e.target.value})
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
            mBelongBkUserName: undefined,
            mAccountCurrency: '',
            mNetEquity: '',
            mName: '',
            mExpectDate: '',
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


        window.Axios.post('finance/getDepositDetail', {
            'id': self.props.match.params.id
        }).then((response) => {

            self.setState({
                mBelongBkUserName: response.data.data.bkUserName,
                mStarClientAccount: response.data.data.accountNo,
                mNetEquity: response.data.data.netEquity,
                mExecTxnAmt: response.data.data.execAmount,
                mRate: response.data.data.rate,
                mExpectDate: response.data.data.expectDate,
                mAccountCurrency: response.data.data.accountCurrency,
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

            })
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
                            }>{record.status == 1 ? '支付成功' : record.status == 2 ? '审核中' : record.status == 3 ? '审核成功' : '取消'}

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
        var self = this
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
            color: 'fff'
        }

        var titleCo = {
            align: 'center',
            textAlign: 'center',

            fontSize: '18px',
            fontFamily: 'PingFang-HK-Medium',
            fontWeight: 'bold',
            color: '#7B7B7B'
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


                <h2 style={{marginTop: 15}}>入金审核</h2>


                <BreadcrumbCustom first="财务管理" second="电汇入金" third="入金审核"/>

                <div style={{
                    background: "white",
                    boxShadow: '0px 0px 20px 0px rgba(123,123,123,0.1)',
                    borderRadius: '4px',
                }}>

                    <div style={{
                        minWidth: '800px',
                        paddingTop: '36px', marginLeft: '150px', marginRight: '150px'
                    }}>


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
                                <span style={titleStule}>2</span>
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
                                color: 'white',

                                borderRadius: '50%'
                            }}>
                                <span style={titleStule}>3</span>

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

                    <div style={{
                        minWidth: '800px',
                        marginLeft: '150px',
                        marginRight: '150px',
                        padding: 12,
                        textAlign: 'center',
                        align: 'center',
                        background: 'white'
                    }}>
                        <p style={{
                            fontSize: 18,
                            fontFamily: 'PingFangSC-Medium',
                            fontWeight: 500,
                            color: 'rgba(51,51,51,1)'
                        }}>新增客户入金
                        </p>
                    </div>
                    <div style={{minWidth: '800px', marginLeft: '150px', marginRight: '150px', paddingBottom: '10px'}}>
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


                                    <Input value={this.state.mBelongBkUserName}
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
                                    {/*<Input value={this.state.mRate}*/}
                                    {/*onChange={(e) => {*/}
                                    {/*this.setState({*/}
                                    {/*mRate: e.target.value,*/}
                                    {/*});*/}
                                    {/*}}*/}
                                    {/*style={{width: '200px', height: '36px'}}*/}

                                    {/*/>*/}
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

                                    <Input value={this.state.mExpectDate}

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


                                                    }}>账号币种</span>

                                    </div>

                                    <Input value={this.state.mA}
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
                    <div style={{
                        minWidth: '800px', marginLeft: '150px', marginRight: '150px',
                        paddingBottom: '48px',
                        paddingTop: '48px',
                        justifyContent: 'space-around',
                        display: 'flex'
                    }}>

                        <Button
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
                            style={{background: '#F6D147', width: '180px', height: '40px'}}> 创建 </Button>
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


                            style={{width: '180px', height: '40px'}}> 重新输入 </Button>

                    </div>

                </div>


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
