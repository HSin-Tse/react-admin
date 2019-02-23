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
    DatePicker,
} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";
import moment from 'moment';

const {TextArea} = Input;

const dateFormat = 'YYYY-MM-DD';

const Option = Select.Option;

class Basic extends Component {
    changeNote = (e) => {
        console.log('hcia e.target.value', e.target.value)
        this.setState({
            changeNoteV: e.target.value
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            bkroleList: [],
            selectedRowKeys: [],
            date: new Date(),
            mIndate: '',
            userList: [],
            loading: false,
            isCanOPA: false,
            isCanOPB: false,
            isCanOPC: false,
            totalPage: 1,
            current: 1,
            mStarClientAccount: undefined,
            accrounRes: undefined,
            mBelongBkUserId: undefined,
            mNetEquity: '',
            mCashBalance: '',
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
        if (localStorage.getItem('infor')) {

            let self = this;

            var menuInfor = JSON.parse(localStorage.getItem('infor'))


            console.log('hcia menuInfor.superFlag', menuInfor.superFlag)

            if (menuInfor.superFlag === 1) {
                self.setState({
                    isCanOPA: true,
                    isCanOPB: true,
                    isCanOPC: true,
                });
            } else {


                var isCanOp = menuInfor.menuList.find((item) => {
                    // console.log('hcia  this.props', this.props)
                    return this.props.tk === item.key;
                });

                console.log('hcia isCanOp', isCanOp)

                console.log('hcia isCanOp', isCanOp)

                var chA = isCanOp.childrenMenu.find((item) => {
                    // console.log('hcia  this.props', this.props)
                    return item.key === 'DEPOSIT_MANNUAL_CREATE';
                });
                var chB = isCanOp.childrenMenu.find((item) => {
                    // console.log('hcia  this.props', this.props)
                    return item.key === 'DEPOSIT_FINANCE_CHECK';
                });
                var chC = isCanOp.childrenMenu.find((item) => {
                    // console.log('hcia  this.props', this.props)
                    return item.key === 'DEPOSIT_DETAIL';
                });

                if (chA.availableFlag == 0) {
                    self.setState({
                        isCanOPA: true,
                    });
                } else {

                }
                if (chB.availableFlag == 0) {
                    self.setState({
                        isCanOPB: true,
                    });
                } else {

                }
                if (chC.availableFlag == 0) {
                    self.setState({
                        isCanOPC: true,
                    });
                } else {

                }


            }


        }

        window.Axios.post('finance/getDepositDetail', {
            'id': self.props.match.params.id
        }).then((response) => {

            console.log('hcia response', response)

            self.setState({
                mID: response.data.data.orderNo,
                mNote: response.data.data.comment_step2.comment,
                mBelongBkUserId: response.data.data.belongBkUserId,
                mStarClientAccount: response.data.data.accountNo,
                mNetEquity: response.data.data.netEquity,
                mExecTxnAmt: response.data.data.execAmount,
                mExecTxnCurry: response.data.data.execCurrency,
                mRate: response.data.data.rate,
                mIndate: response.data.data.completeDate,
                mExpectDate: response.data.data.expectDate,
                commenS1: response.data.data.comment_step1.comment,
                commenBk1: response.data.data.comment_step1.bkUserName,
                commenDate1: response.data.data.comment_step1.createDate,
                commenDate2: response.data.data.comment_step2.createDate,
                commenBk2: response.data.data.comment_step2.bkUserName,
                mAccountCurrency: response.data.data.accountCurrency,
            }, () => {

                console.log('hcia response', response)


                // message.success('request client data')
                setTimeout(self.requestStart, 300)


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
                title: '入金金额',
                dataIndex: '入金金额',
                key: '入金金额',
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
            },

            {
                align: 'center',
                title: '财务审核',
                key: 'action',
                render: (text, record) => (
                    <div>

                        <Button
                            size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                            disabled={record.status == 4 }


                            // onClick={
                            //
                            //
                            //
                            //     () => this.showOPDAyModal3(record)
                            // }
                            onClick={
                                () => {


                                    if(record.status==3){
                                        // this.props.history.pop()
                                        this.props.history.push('/app/fina/d/ter' + record.id)

                                        this.componentDidMount()

                                    }else if(record.status==2){
                                        this.props.history.push('/app/fina/d/tes' + record.id)

                                    }

                                }
                            }



                        >{record.status == 1 ? '支付成功' : record.status == 2 ? '审核中' : record.status == 3 ? '审核成功' : '取消'}


                        </Button>


                    </div>
                ),
            },
            {
                align: 'center',
                title: '入金完成',
                key: 'action',
                render: (text, record) => (
                    <div>

                        <Button
                            size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                            disabled={ record.status == 4}
                            onClick={
                                () => {


                                    if(record.status==3){
                                        // this.props.history.pop()
                                        this.props.history.push('/app/fina/d/ter' + record.id)

                                        this.componentDidMount()

                                    }else if(record.status==2){
                                        this.props.history.push('/app/fina/d/tes' + record.id)
                                        this.componentDidMount()

                                    }

                                }
                            }
                        >{record.status == 4 ? '已取消' : record.status == 2 ? '审核中' : (record.status == 7  && !record.completeDate)  ? '已完成' : '审核中'}

                        </Button>


                    </div>
                ),
            },

        ];
        this.requestPage()

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
    requestStart = () => {
        let self = this

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

    }
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
            current: page,
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
            width: '72px',

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


        return (

            <div>

                {/*<div>accrounRes :{JSON.stringify(this.state.accrounRes)}</div>*/}


                <h2 style={{marginTop: 15}}>入金完成</h2>
                <BreadcrumbCustom first="财务管理" second="电汇入金" third="入金完成"/>

                <div style={{
                    display: "flex",
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    background: "white",
                    boxShadow: '0px 0px 20px 0px rgba(123,123,123,0.1)',
                    borderRadius: '4px',
                }}>

                    <div style={{
                        display: "flex",
                        justifyContent: 'center',
                        flexWrap: 'wrap',

                        width: '100%',
                        paddingTop: '36px'
                    }}>


                        <div style={{

                            width: '600px',
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
                                background: 'rgba(246,209,71,1)',
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
                                background: 'rgba(246,209,71,1)',
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

                        </div>

                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: 'center',
                        flexWrap: 'wrap',

                        width: '100%',
                        paddingTop: '6px'
                    }}>


                        <div style={{
                            width: '630px',

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
                        }}>订单号:{this.state.mID}
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


                                    {/*<Input value={this.state.mBelongBkUserName}*/}
                                    {/*style={{width: '200px', height: '36px'}}*/}

                                    {/*/>*/}
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
                                    <Input value={this.state.commenS1}
                                           onChange={(e) => {
                                               this.setState({
                                                   commenS1: e.target.value,
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


                                                    }}>打款备注</span>
                                    <Input value={this.state.mNote}
                                        // onChange={(e) => {
                                        //     this.setState({
                                        //         mNote: e.target.value,
                                        //     });
                                        // }}
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
