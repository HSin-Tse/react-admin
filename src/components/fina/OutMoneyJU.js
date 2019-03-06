/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Tabs, Checkbox, Select, Card, Col, Divider, Row, Input, Table, message} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";
import {steps} from "./model/Steps"

const {TextArea} = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Basic extends Component {
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
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            date: new Date(),
            userList: [],
            powerList: [],
            leavgeList: [],
            commentList: [],
            mCashBalance: '',
            mBounty: '',
            status: '',
            bankCode: '',
            phoneNumber: '',
            totalProcessWithdraw: '',
            totalDeposit: '',
            mAccountAmount: '',
            accountAmount: '',
            accountCurrency: '',
            outdate: '',
            accountNo: '',
            name: '',
            orderNo: '',
            broker: '',
            province: '',
            city: '',
            bankName: '',
            receiver: '',
            cardNo: '',
            channelName: '',
            nodeList: [],
            loading: false,
            searchPhone: '',
            theComment: '',
            totalPage: 1,
            modeState: 1,
            forbiddenValue: 0,
            current: 1,
            currentStep: 0,
            pgsize: 20,
            loadFor: false,
            suspend_reason_type: []

        };
    }


    componentDidMount() {


        let self = this;







        // window.Axios.post('/auth/getRecordCommentList', {
        //     id: self.props.match.params.id,
        //     commentType: 13,
        //     pageNo: 1,
        //     pageSize: this.state.pgsize,
        // }).then(function (response) {
        //     self.setState({
        //         totalpageComments: response.data.data.totalPage,
        //         // operationDiaryHistory: response.data.data.list,
        //     },()=>{
        //
        //         // self.setState({
        //         //
        //         //     theComment: response.data.data.list[0] ? response.data.data.list[0].comment : ''
        //         // })
        //
        //     });
        // });


        window.Axios.post('finance/getWithdrawDetail', {
            'id': self.props.match.params.id,
        }).then((response) => {
            console.log('hcia response', response)
            self.setState({
                mCashBalance: response.data.data.cashBalance,
                mBounty: response.data.data.bounty,
                totalProcessWithdraw: response.data.data.totalProcessWithdraw,
                totalDeposit: response.data.data.totalDeposit,
                accountAmount: response.data.data.accountAmount,
                accountCurrency: response.data.data.accountCurrency,
                outdate: response.data.data.date,
                accountNo: response.data.data.accountNo,
                name: response.data.data.name,
                status: response.data.data.status,
                orderNo: response.data.data.orderNo,
                phoneNumber: response.data.data.phoneNumber,
                broker: response.data.data.broker,
                province: response.data.data.province,
                city: response.data.data.city,
                bankName: response.data.data.bankName,
                bankCode: response.data.data.bankCode,
                receiver: response.data.data.receiver,
                cardNo: response.data.data.cardNo,
                channelName: response.data.data.channelName,
                commentList: response.data.data.commentList,
                operationDiaryHistory: response.data.data.commentList,
            }, () => {




                window.Axios.post('finance/getDepositWithdrawReport', {
                    'starClientAccount': self.state.accountNo,
                    'pageSize': self.state.pgsize,
                    'pageNo': self.state.current,
                }).then(function (response) {


                    console.log('hcia response.data.data.list?[]:response.data.data.list' , response.data.data.list==null?[]:response.data.data.list)
                    self.setState({
                            totalPage: response.data.data.totalPage,
                            userList: response.data.data.list==null?[]:response.data.data.list
                        }
                    );


                })



                self.setState({

                    theComment: self.state.commentList[0] ? self.state.commentList[0].comment : ''
                })


                if ((this.state.status == 1 || this.state.status == 3 || this.state.status == 4 || this.state.status == 5 || this.state.status == 6 || this.state.status == 7 || this.state.status == 8 || this.state.status == 9)) {

                    self.setState({
                        powerList: [1, 2, 3, 4, 5, 6, 7,8]
                    })
                }

            });

        })


    }

    onChange = (checkedValues) => {
        console.log('hcia checkedValues', checkedValues)
        this.setState({
            powerList: checkedValues,
        });
    }

    render() {


        var ssdds = {
            paddingLeft: 15,
            paddingRight: 15,
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'flex',
            height: '40px',
            borderRadius: '40px 40px 40px 40px'
        }
        return (

            <div style={{
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                // height: '40px',
                // background: 'rgba(246,209,71,1)',
                // borderRadius: '50%'
            }}>


                <div style={{overflow: 'auto'}}>
                    {/*<div>commentList query :{JSON.stringify(this.state.commentList)}</div>*/}

                    <h2 style={{marginTop: 15}}>
                        {steps[0].title}-{this.state.status == 0 ? '提交成功(Pending)' : this.state.status == 1 ? '结算审核通过(Accounts OK)' : this.state.status == 2 ? '结算审核暂停(Suspend)' : this.state.status == 3 ? '结算审核失败(Failure)' : this.state.status == 4 ? '风险审核通过(Accepted)' : this.state.status == 5 ? '风险审核暂停(Suspend)' : this.state.status == 6 ? '风险审核失败(Failure)' : this.state.status == 7 ? '渠道下发通过(Completed)' : this.state.status == 8 ? '渠道下发暂停(Suspend)' : this.state.status == 9 ? '渠道下发失败(Failure)' : '??'}
                    </h2>
                    <BreadcrumbCustom first="财务管理" second="出金管理" third={steps[0].title}/>


                    <div style={{
                        width: '1200px',
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
                                    marginLeft: '16px',
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    background: 'rgba(246,209,71,1)',
                                    borderRadius: '50%'
                                }}>
                        <span style={{
                            fontSize: '20px',
                            fontFamily: 'PingFang-HK-Medium',
                            fontWeight: 'bold',
                            color: 'rgba(33,33,33,1)'
                        }}>
                            1
                        </span>
                                </div>
                                <div style={{
                                    flexGrow: '1',
                                    height: '2px',
                                    background: '#CCCCCC',
                                }}></div>
                                <div style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    background: '#CCCCCC',
                                    borderRadius: '50%'
                                }}>
                        <span style={{
                            fontSize: '20px',
                            fontFamily: 'PingFang-HK-Medium',
                            fontWeight: 'bold',
                            color: 'white'
                        }}>
                            2
                        </span>
                                </div>
                                <div style={{
                                    flexGrow: '1',
                                    height: '2px',
                                    background: '#CCCCCC',
                                }}></div>
                                <div style={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    background: '#CCCCCC',
                                    borderRadius: '50%'
                                }}>
                        <span style={{
                            fontSize: '20px',
                            fontFamily: 'PingFang-HK-Medium',
                            fontWeight: 'bold',
                            color: 'white'
                        }}>
                            3
                        </span>
                                </div>
                                <div style={{

                                    flexGrow: '1',
                                    height: '2px',
                                    background: '#CCCCCC'
                                }}></div>
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
                        <span style={{
                            fontSize: '20px',
                            fontFamily: 'PingFang-HK-Medium',
                            fontWeight: 'bold',
                            color: 'white'
                        }}>
                            4
                        </span>


                                </div>

                            </div>

                            <div style={{
                                justifyContent: 'space-around',
                                display: "flex",
                                alignItems: 'center',
                                background: 'white'
                            }}>
                    <span style={{
                        fontSize: '18px',
                        fontFamily: 'PingFang-HK-Medium',
                        fontWeight: 'bold',
                        color: '#7B7B7B'
                    }}>
                        {steps[0].title}
                        </span>
                                <div style={{
                                    flexGrow: '1',
                                    height: '2px',
                                    background: '#00000000'
                                }}/>
                                <span style={{
                                    fontSize: '18px',
                                    fontFamily: 'PingFang-HK-Medium',
                                    fontWeight: 'bold',
                                    color: '#7B7B7B'
                                }}>
                            {steps[1].title}
                        </span>
                                <div style={{
                                    flexGrow: '1',
                                    height: '2px',
                                    background: '#00000000'
                                }}/>
                                <span style={{
                                    fontSize: '18px',
                                    fontFamily: 'PingFang-HK-Medium',
                                    fontWeight: 'bold',
                                    color: '#7B7B7B'
                                }}>
                            {steps[2].title}
                        </span>
                                <div style={{
                                    flexGrow: '1',
                                    height: '2px',
                                    background: '#00000000'
                                }}/>
                                <span style={{
                                    fontSize: '18px',
                                    fontFamily: 'PingFang-HK-Medium',
                                    fontWeight: 'bold',
                                    color: '#7B7B7B'
                                }}>
                            {steps[3].title}
                        </span>
                            </div>
                        </div>


                        <div style={
                            {
                                margin: '24px',
                                fontSize: '24px',
                                display: 'flex',
                                justifyContent: 'center'

                            }}>

                            {this.state.name}
                        </div>
                        <Row
                            style={{margin: '20px'}}

                            gutter={32}>
                            <Col span={12}>
                                <div

                                    style={{
                                        background: 'rgba(255,255,255,1)',
                                        boxShadow: '20px 20px 20px 20px rgba(123,123,123,0.1)',
                                        borderRadius: '4px 4px'
                                    }}
                                >
                                    <div style={{
                                        borderRadius: '4px 4px 0px 0px',
                                        padding: 15,
                                        color: 'white',
                                        background: '#F6D147',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        display: 'flex',
                                        minHeight: 48
                                    }}>
                                        <span style={{fontSize: '15px'}}>可用余额</span>
                                        <span style={{fontSize: '15px'}}>{this.state.mCashBalance}</span>
                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}>余额:</span>
                                        <span style={{fontSize: '13px'}}>{this.state.mCashBalance}</span>
                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}>奖励金:</span>
                                        <span style={{fontSize: '13px'}}>{this.state.mBounty}</span>
                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}>出金待审核金额:</span>
                                        <span style={{fontSize: '13px'}}>{this.state.totalProcessWithdraw}</span>
                                    </div>
                                    <Divider style={{paddingLeft: 15, paddingRight: 15}}/>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}>总入金:</span>
                                        <span style={{fontSize: '13px'}}>{this.state.totalDeposit}</span>
                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}>出金:</span>
                                        <span style={{fontSize: '13px'}}>{this.state.accountCurrency}</span>
                                    </div>
                                </div>


                                <Card
                                    style={{marginTop: 15}}
                                    bodyStyle={{padding: 0, margin: 0}}
                                    bordered={false}>
                                    <div style={{
                                        padding: 15,
                                        color: 'white',
                                        background: '#F6D147',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        display: 'flex',
                                        minHeight: 40
                                    }}>
                                        <span style={{fontSize: '15px'}}>成功交易</span>
                                        <span style={{fontSize: '15px'}}></span>
                                    </div>
                                    <Table rowKey="id"
                                           bordered={true}
                                           columns={[

                                               {
                                                   title: '交易',
                                                   align: 'center',
                                                   dataIndex: 'bkUserName',
                                                   key: 'operationDiary_User',
                                                   render: (text, record) => (
                                                       <div>{record.createDate}    - {record.accountNo}</div>),
                                               }, {
                                                   title: '入',
                                                   align: 'center',
                                                   dataIndex: 'createDate',
                                                   key: 'operationDiary_Date',
                                                   render: (text, record) => (
                                                       <span>{record.execTxnAmt}</span>),
                                               }, {
                                                   title: '出',
                                                   align: 'center',
                                                   dataIndex: 'comment',
                                                   key: 'operationDiary_Status',
                                                   render: (text, record) => (
                                                       <span>{record.accountTxnAmt}</span>),
                                               }]}

                                           dataSource={this.state.userList}
                                           loading={this.state.loadingComment}
                                           pagination={{
                                               total: this.state.totalpageComments * this.state.pgsize,
                                               pageSize: this.state.pgsize,
                                               onChange: this.changePageComment,
                                           }}
                                    />
                                    <div>
                                        <span>显示第1条到第5条，共10条</span>
                                    </div>
                                </Card>

                            </Col>
                            <Col span={12}>

                                <Card
                                    bodyStyle={{padding: 0, margin: 0}}
                                    bordered={false}>


                                    <div style={{
                                        padding: 15,
                                        color: 'white',
                                        background: '#F6D147',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        display: 'flex',
                                        minHeight: 40
                                    }}>
                                        <span style={{fontSize: '15px'}}>出金申请详情</span>
                                        <span style={{fontSize: '15px'}}></span>
                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}>请求出金金额:</span>
                                        <span style={{fontSize: '13px'}}>{this.state.accountAmount}</span>
                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}>
                                            <span
                                                style={{color: 'red'}}>*
                                            </span>
                                            出金金额
                                            :</span>
                                        <span style={{fontSize: '13px'}}>
                                            <Input value={this.state.accountAmount}
                                                   style={{width: 220, marginRight: '16px'}}
                                                   placeholder="100.00"/>USD</span>
                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}>出金日期</span>
                                        <span style={{fontSize: '13px'}}>{this.state.outdate}</span>
                                    </div>

                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}>用户名/帐号</span>
                                        <span style={{fontSize: '13px'}}>{this.state.name}/{this.state.accountNo}</span>
                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}>订单号</span>
                                        <span style={{fontSize: '13px'}}>{this.state.orderNo}</span>
                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}>经纪商</span>
                                        <span style={{fontSize: '13px'}}>{this.state.broker}</span>
                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}>支付方式</span>

                                        <Select defaultValue="lucy" style={{margin: 5, width: 220}}>
                                            {/*<Option value="jack">{this.state.channelName}</Option>*/}
                                            <Option value="lucy">{this.state.channelName}</Option>
                                        </Select>

                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}><span
                                            style={{color: 'red'}}>*</span>银行名称</span>
                                        <span style={{fontSize: '13px'}}><Input

                                            value={this.state.bankCode}
                                            value={this.state.receiver}

                                            style={{margin: 5, width: 220}}
                                            placeholder=""/></span>
                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}>收款银行预留手机号</span>
                                        <span style={{fontSize: '13px'}}><Input
                                            value={this.state.phoneNumber} style={{margin: 5, width: 220}}
                                            placeholder=""/></span>
                                    </div>

                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}><span style={{color: 'red'}}>*</span> 省</span>
                                        <span style={{fontSize: '13px'}}><Input
                                            value={this.state.province}

                                            style={{margin: 5, width: 220}}
                                            placeholder=""/></span>
                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}><span style={{color: 'red'}}>*</span>城市</span>
                                        <span style={{fontSize: '13px'}}><Input
                                            value={this.state.city}
                                            style={{margin: 5, width: 220}}
                                            placeholder=""/></span>
                                    </div>

                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}><span
                                            style={{color: 'red'}}>*</span>支行名称</span>
                                        <span style={{fontSize: '13px'}}><Input
                                            value={this.state.bankName}
                                            style={{margin: 5, width: 220}}
                                            placeholder=""/></span>
                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}><span
                                            style={{color: 'red'}}>*</span>收款人姓名</span>
                                        <span style={{fontSize: '13px'}}><Input
                                            value={this.state.receiver}
                                            style={{margin: 5, width: 220}}
                                            placeholder=""/></span>
                                    </div>
                                    <div style={ssdds}>
                                        <span style={{fontSize: '13px'}}><span
                                            style={{color: 'red'}}>*</span>收款银行账户</span>
                                        <span style={{fontSize: '13px'}}><Input
                                            value={this.state.cardNo}
                                            style={{margin: 5, width: 220}}
                                            placeholder=""/></span>
                                    </div>
                                    {/*<div style={ssdds}>*/}
                                    {/*<span style={{fontSize: '13px'}}>备注:</span>*/}
                                    {/*<span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}*/}
                                    {/*placeholder=""/></span>*/}
                                    {/*</div>*/}


                                    <div style={{marginTop: '48px'}}>


                                        <div style={{display: 'flex'}}>
                                            <Button


                                                style={{
                                                    background: '#F6D147',
                                                    flexGrow: '1',
                                                    margin: 0, fontSize: '18px', height: '48px', width: 150
                                                }}>{steps[0].title}</Button>

                                            <Button
                                                onClick={() => {


                                                    console.log('hcia this.props.match.params.id', this.props.match.params.id)

                                                    this.props.history.push('/app/fina/juoutmb' + this.props.match.params.id)

                                                }}

                                                style={{

                                                    flexGrow: '1',
                                                    margin: 0, fontSize: '18px', height: '48px', width: 150
                                                }}>{steps[1].title}</Button>
                                            <Button
                                                onClick={() => {


                                                    console.log('hcia this.props.match.params.id', this.props.match.params.id)

                                                    this.props.history.push('/app/fina/juoutmc' + this.props.match.params.id)

                                                }}

                                                style={{

                                                    flexGrow: '1',
                                                    margin: 0, fontSize: '18px', height: '48px', width: 150
                                                }}>{steps[2].title}</Button>
                                            <Button

                                                onClick={() => {


                                                    console.log('hcia this.props.match.params.id', this.props.match.params.id)

                                                    this.props.history.push('/app/fina/juoutmd' + this.props.match.params.id)

                                                }}
                                                style={{
                                                    flexGrow: '1',
                                                    margin: 0, fontSize: '18px', height: '48px', width: 150
                                                }}>{steps[3].title}</Button>
                                        </div>

                                        <Checkbox.Group

                                            disabled={(this.state.status == 1 || this.state.status == 3 || this.state.status == 4 || this.state.status == 5 || this.state.status == 6 || this.state.status == 7 || this.state.status == 8 || this.state.status == 9)}
                                            value={this.state.powerList}

                                            style={{width: '100%'}} onChange={this.onChange}>

                                            <Card bodyStyle={{padding: 0, marginTop: '0px', marginLeft: '20px'}}>
                                                <div style={{marginTop: '25px'}}><Checkbox
                                                    value={1}>完整KYC（银行资讯、客户信息）</Checkbox></div>
                                                <div style={{marginTop: '25px'}}><Checkbox
                                                    value={2}>KYC文件在客户文件夹</Checkbox></div>
                                                <div style={{marginTop: '25px'}}><Checkbox value={3}>客户余额是否足够</Checkbox>
                                                </div>
                                                <div style={{marginTop: '25px'}}><Checkbox
                                                    value={4}>客户当日是否有入金记录</Checkbox></div>
                                                <div style={{marginTop: '25px'}}><Checkbox value={5}>检查合规性</Checkbox>
                                                </div>
                                                <div style={{marginTop: '25px'}}><Checkbox value={6}>由我批准的</Checkbox>
                                                </div>
                                                <div style={{marginTop: '25px'}}><Checkbox value={7}>完善备注</Checkbox>
                                                </div>
                                                <div style={{marginTop: '25px'}}><Checkbox value={8}>出金小于100USD
                                                    需扣除15元手续费，10000USD大额出金与risk确认</Checkbox>
                                                </div>


                                                <TextArea
                                                    style={{
                                                        marginTop: 10,
                                                        marginBottom: 10,
                                                    }}
                                                    rows={4}
                                                    disabled={(this.state.status == 1 || this.state.status == 3 || this.state.status == 4 || this.state.status == 5 || this.state.status == 6 || this.state.status == 7 || this.state.status == 8 || this.state.status == 9)}

                                                    value={this.state.theComment}
                                                    onChange={(e) => {
                                                        let comment = e.target.value;
                                                        this.setState({
                                                            theComment: comment
                                                        });
                                                    }}
                                                    placeholder="备注"/>

                                                <div style={{
                                                    margin: 5,
                                                    justifyContent: "space-around",
                                                    display: 'flex'
                                                }}>

                                                    <Button
                                                        disabled={this.state.powerList.length < 8}

                                                        onClick={() => {
                                                            // finance/serviceCheckWithdraw


                                                            if (!this.state.theComment) {
                                                                message.error('完善备注?')
                                                                return
                                                            }
                                                            let self = this;

                                                            window.Axios.post('finance/serviceCheckWithdraw', {
                                                                'id': self.props.match.params.id,
                                                                'content': this.state.theComment,
                                                                'status': '1',
                                                            }).then((response) => {
                                                                console.log('hcia response', response)

                                                                message.success('操作成功')

                                                                self.props.history.push('/app/fina/juoutmb' + this.props.match.params.id)


                                                            })

                                                        }}
                                                        style={{
                                                            background: '#F6D147',
                                                            margin: 10, fontSize: '18px', height: 40, width: 150
                                                        }}>审核通过</Button>
                                                    <Button
                                                        onClick={() => {
                                                            // finance/serviceCheckWithdraw


                                                            // if (!this.state.theComment) {
                                                            //     message.error('完善备注?')
                                                            //     return
                                                            // }
                                                            let self = this;

                                                            window.Axios.post('finance/serviceCheckWithdraw', {
                                                                'id': self.props.match.params.id,
                                                                'content': this.state.theComment,
                                                                'status': '2',
                                                            }).then((response) => {
                                                                console.log('hcia response', response)

                                                                message.success('操作成功')

                                                            })

                                                        }}

                                                        style={{
                                                            margin: 10, fontSize: '18px', height: 40, width: 150
                                                        }}>挂起待确认</Button>
                                                    <Button

                                                        onClick={() => {
                                                            // finance/serviceCheckWithdraw


                                                            // if (!this.state.theComment) {
                                                            //     message.error('完善备注?')
                                                            //     return
                                                            // }
                                                            let self = this;

                                                            window.Axios.post('finance/serviceCheckWithdraw', {
                                                                'id': self.props.match.params.id,
                                                                'content': this.state.theComment,
                                                                'status': '3',
                                                            }).then((response) => {
                                                                console.log('hcia response', response)

                                                                message.success('操作成功')

                                                            })

                                                        }}
                                                        style={{
                                                            margin: 10, fontSize: '18px', height: 40, width: 150
                                                        }}>取消</Button>


                                                </div>
                                                <Table rowKey="id"
                                                       columns={[

                                                           {
                                                               title: '日期',
                                                               align: 'center',
                                                               dataIndex: 'createDate',
                                                               key: 'operationDiary_User',
                                                               render: (text, record) => (
                                                                   <div>{this.timestampToTime(record.createDate)}</div>),
                                                           }, {
                                                               title: '备注',
                                                               align: 'center',
                                                               dataIndex: 'comment',
                                                               key: 'operationDiary_Date',
                                                               render: (text, record) => (
                                                                   <span>{record.comment}</span>),
                                                           }, {
                                                               title: '审核类型',
                                                               align: 'center',
                                                               dataIndex: 'comment',
                                                               key: 'operationDiary_Status',
                                                               render: (text, record) => (
                                                                   <span>{record.type == 0 ? '?' : record.type == 1 ? '用户' : record.type == 2 ? '开户申请' : record.type == 3 ? '交易账号' : record.type == 4 ? '杠杆申请' : record.type == 5 ? '入金记录' : record.type == 6 ? '出金记录' : record.type == 7 ? '黑名单' : record.type == 8 ? '白名单' : record.type == 9 ? '内部人员' : record.type == 10 ? '角色' : record.type == 11 ? '入金渠道' : record.type == 12 ? '汇率' : record.type == 13 ? '入金创建备注' : record.type == 14 ? '入金打款备注' : record.type == 15 ? '入金取消备注' : record.type == 16 ? '出金客维审核备注' : record.type == 17 ? '出金后台审核备注' : record.type == 18 ? '出金银行放款备注' : record.type == 19 ? '真实账户' : '??'}</span>),
                                                           }, {
                                                               title: '操作人',
                                                               align: 'center',
                                                               dataIndex: 'comment',
                                                               key: 'operationDiary_Status',
                                                               render: (text, record) => (
                                                                   <span>{record.bkUserName}</span>),
                                                           }]}

                                                       dataSource={this.state.operationDiaryHistory}
                                                       loading={this.state.loadingComment}
                                                       pagination={{
                                                           total: this.state.totalpageComments * this.state.pgsize,
                                                           pageSize: this.state.pgsize,
                                                           onChange: this.changePageComment,
                                                       }}
                                                />
                                            </Card>

                                        </Checkbox.Group>


                                    </div>
                                </Card>
                            </Col>
                            <Col span={12}>

                            </Col>


                        </Row>


                    </div>


                </div>
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
