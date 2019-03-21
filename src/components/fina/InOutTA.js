/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, Modal, Card, Input, Icon, DatePicker} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";
import {CSVLink} from "react-csv";
import classNames from "classnames";

const {RangePicker} = DatePicker;

const {TextArea} = Input;

class Basic extends Component {
    _switcherOn = () => {
        this.setState({
            switcherOn: !this.state.switcherOn
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            visible: false,
            visibleOpM: false,
            date: new Date(),
            userList: [],
            nodeList: [],
            detail: {
                "name": null,
                "id": "27",
                "date": "",
                "comment": null,
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

            visibleB: false,
            loading: false,
            modal2OPDAYVisible: false,
            totalPage: 1,
            modeState: 1,
            forbiddenValue: 0,
            current: 1,
            pgsize: 20,
            loadFor: false,

        };
        this.columnsLogV2 = [
            {
                title: '时间',
                dataIndex: 'createDate',
                key: 'operationDiary_Date',
                align: 'center',
                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                title: 'IP',
                dataIndex: 'IP',
                key: 'IP',
                align: 'center',
                render: (text, record) => (
                    <span>{record.userIP}</span>),
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

    showModalB = (recodrd) => {
        // this.requestUserCommentList(recodrd)
        this.getOPLog(recodrd)

        let self = this
        self.setState({
            loading: true,
        });
        // window.Axios.post('finance/getLeverageApplyDetail', {
        //     'id': recodrd.id,
        // }).then(function (response) {
        //     self.setState({
        //         visibleB: true,
        //         loading: false,
        //     });
        // });
    }
    showOPDAyModal2 = (recodrd) => {
        // this.requestUserCommentList(recodrd)
        this.getOPLog(recodrd)

        this.setState({
            modal2OPDAYVisible: true,
        });
    };

    componentDidMount() {


        this.columnss = [
            {
                align: 'center',
                title: '订单编号',
                label: '订单编号',
                dataIndex: 'merOrderNo',
                key: 'merOrderNo',
                render: (text, record) => (
                    <span>{record.merOrderNo}</span>),
            }, {

                title: '客户邮箱',
                label: '客户邮箱',
                dataIndex: 'email',
                key: 'email',
                render: (text, record) => (<span>{record.email}</span>),
                align: 'center',
            }, {

                title: '交易账户',
                label: '交易账户',
                dataIndex: 'accountNo',
                key: 'accountNo',
                render: (text, record) => (
                    <span>{record.accountNo}</span>),
                align: 'center',
            }, {

                title: '交易组',
                label: '交易组',
                dataIndex: 'accountType',
                key: 'accountType',
                render: (text, record) => (
                    <span>{record.accountType}</span>),
                align: 'center',
            }, {

                title: '类型',
                label: '类型',
                dataIndex: 'typeDesc',
                key: 'typeDesc',
                render: (text, record) => (
                    <span>{record.typeDesc}</span>),
                align: 'center',
            }, {
                align: 'center',

                title: '客户申请时间',
                label: '客户申请时间',
                dataIndex: 'createDate',
                key: 'createDate',

                render: (text, record) => (
                    <span>{record.createDate}</span>),
            }, {
                align: 'center',

                title: '出入金渠道',
                label: '出入金渠道',
                dataIndex: 'channelName',
                key: 'channelName',
                render: (text, record) => (
                    <span>{record.channelName}</span>),
            }, {
                align: 'center',

                title: '交易币种',
                label: '交易币种',
                dataIndex: 'accountTxnCurry',
                key: 'accountTxnCurry',

                render: (text, record) => (
                    <span>{record.accountTxnCurry}</span>),
            }, {
                align: 'center',

                title: '金额',
                label: '金额',
                dataIndex: 'accountTxnAmt',
                key: 'accountTxnAmt',

                render: (text, record) => (
                    <span>{record.accountTxnAmt}</span>),
            }, {
                align: 'center',

                title: '执行金额',
                label: '执行金额',
                dataIndex: 'execTxnAmt',
                key: 'execTxnAmt',

                render: (text, record) => (
                    <span>{record.execTxnAmt}</span>),
            }, {
                align: 'center',

                title: '执行币种',
                label: '执行币种',
                dataIndex: 'execTxnCurry',
                key: 'execTxnCurry',

                render: (text, record) => (
                    <span>{record.execTxnCurry}</span>),
            }, {
                align: 'center',

                title: '使用汇率',
                label: '使用汇率',
                dataIndex: 'rate',
                key: 'rate',

                render: (text, record) => (
                    <span>{record.rate}</span>),
            }, {
                align: 'center',

                title: '手续费',
                label: '手续费',
                dataIndex: '手续费',
                key: 'commission',

                render: (text, record) => (
                    <span>{record.commission}</span>),
            }, {
                align: 'center',

                title: '执行时间',
                label: '执行时间',
                dataIndex: '执行时间',
                key: 'completeDate',

                render: (text, record) => (
                    <span>{record.completeDate}</span>),
            }

            , {
                align: 'center',
                title: '处理人',
                label: '处理人',
                dataIndex: '处理人',
                key: 'accountName',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }


            , {
                align: 'center',
                title: '客户归属',
                label: '客户归属',
                dataIndex: '客户归属',
                key: 'belongBkUserName',
                render: (text, record) => (
                    <span>{record.belongBkUserName}</span>)
            }
            , {
                align: 'center',
                title: '户名',
                label: '户名',
                dataIndex: '户名',
                key: 'bankCode',
                render: (text, record) => (
                    <span>{record.bankCode}</span>)
            }, {
                align: 'center',
                title: '开户行',
                label: '开户行',
                dataIndex: '开户行',
                key: 'bankName',
                render: (text, record) => (
                    <span>{record.bankName}</span>)
            }, {
                align: 'center',
                title: '支行信息',
                label: '支行信息',
                dataIndex: '支行信息',
                key: 'accountName',
                render: (text, record) => (
                    <span>{record.accountName}</span>)
            }, {
                align: 'center',
                title: '开户行所在省',
                label: '开户行所在省',
                dataIndex: '开户行所在省',
                key: 'bankProvince',
                render: (text, record) => (
                    <span>{record.bankProvince}</span>)
            }
            , {
                align: 'center',
                title: '开户行所在市',
                label: '开户行所在市',
                dataIndex: '开户行所在市',
                key: 'bankCity',
                render: (text, record) => (
                    <span>{record.bankCity}</span>)
            }
            , {
                align: 'center',
                title: '银行卡绑定手机号码',
                label: '银行卡绑定手机号码',
                dataIndex: '银行卡绑定手机号码',
                key: 'accountPhoneNumber',
                render: (text, record) => (
                    <span>{record.accountPhoneNumber}</span>)
            }, {
                align: 'center',
                title: '银行卡号',
                label: '银行卡号',
                dataIndex: '银行卡号',
                key: 'bankCardNo',
                render: (text, record) => (
                    <span>{record.bankCardNo}</span>)
            }];
        this.columns = [
            {
                title: '序号',
                label: '序号',
                dataIndex: '序号',
                key: '序号',
                align: 'center',
                render: (text, record, index) => {
                    record.index = this.state.current * this.state.pgsize + index + 1
                    return (
                        <span>{this.state.current * this.state.pgsize + index + 1}</span>
                    )
                }
            },
            {
                align: 'center',
                title: '订单编号',
                label: '订单编号',
                dataIndex: 'merOrderNo',
                key: 'merOrderNo',
                render: (text, record) => (
                    <span>{record.merOrderNo}</span>),
            }, {

                title: '客户邮箱',
                label: '客户邮箱',
                dataIndex: 'email',
                key: 'email',
                render: (text, record) => (<span>{record.email}</span>),
                align: 'center',
            }, {

                title: '交易账户',
                label: '交易账户',
                dataIndex: 'accountNo',
                key: 'accountNo',
                render: (text, record) => (
                    <span>{record.accountNo}</span>),
                align: 'center',
            }, {

                title: '交易组',
                label: '交易组',
                dataIndex: 'accountType',
                key: 'accountType',
                render: (text, record) => (
                    <span>{record.accountType}</span>),
                align: 'center',
            }, {

                title: '类型',
                label: '类型',
                dataIndex: 'typeDesc',
                key: 'typeDesc',
                render: (text, record) => (
                    <span>{record.typeDesc}</span>),
                align: 'center',
            }, {
                align: 'center',

                title: '客户申请时间',
                label: '客户申请时间',
                dataIndex: 'createDate',
                key: 'createDate',

                render: (text, record) => (
                    <span>{record.createDate}</span>),
            }, {
                align: 'center',

                title: '出入金渠道',
                label: '出入金渠道',
                dataIndex: 'channelName',
                key: 'channelName',
                render: (text, record) => (
                    <span>{record.channelName}</span>),
            }, {
                align: 'center',

                title: '交易币种',
                label: '交易币种',
                dataIndex: 'accountTxnCurry',
                key: 'accountTxnCurry',

                render: (text, record) => (
                    <span>{record.accountTxnCurry}</span>),
            }, {
                align: 'center',

                title: '金额',
                label: '金额',
                dataIndex: 'accountTxnAmt',
                key: 'accountTxnAmt',

                render: (text, record) => (
                    <span>{record.accountTxnAmt}</span>),
            }, {
                align: 'center',

                title: '执行金额',
                label: '执行金额',
                dataIndex: 'execTxnAmt',
                key: 'execTxnAmt',

                render: (text, record) => (
                    <span>{record.execTxnAmt}</span>),
            }, {
                align: 'center',

                title: '执行币种',
                label: '执行币种',
                dataIndex: 'execTxnCurry',
                key: 'execTxnCurry',

                render: (text, record) => (
                    <span>{record.execTxnCurry}</span>),
            }, {
                align: 'center',

                title: '使用汇率',
                label: '使用汇率',
                dataIndex: 'rate',
                key: 'rate',

                render: (text, record) => (
                    <span>{record.rate}</span>),
            }, {
                align: 'center',

                title: '手续费',
                label: '手续费',
                dataIndex: '手续费',
                key: 'commission',

                render: (text, record) => (
                    <span>{record.commission}</span>),
            }, {
                align: 'center',

                title: '执行时间',
                label: '执行时间',
                dataIndex: '执行时间',
                key: 'completeDate',

                render: (text, record) => (
                    <span>{record.completeDate}</span>),
            }, {
                align: 'center',
                title: '处理人',
                label: '处理人',
                dataIndex: '处理人',
                key: 'operator',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                align: 'center',

                title: '查看',
                dataIndex: '查看',
                key: '查看',
                render: (text, record) => (
                    <Button size={'small'} style={{background: '#FDD000'}}
                            onClick={() => this.showOPDAyModal2(record)}>日志</Button>
                )

            }];
        this.nodeColumns = [
            {
                align: 'center',
                title: '日期',
                width: 140,
                dataIndex: '日期',
                key: '日期',
                render: (text, record) => (
                    <span>{this.timestampToTime(record.createDate)}</span>)
            }, {
                align: 'center',

                title: '备注',
                dataIndex: '备注',
                key: '备注',
                width: 120,
                render: (text, record) => (
                    <span>{record.comment}</span>)
            }, {
                align: 'center',

                title: '操作人',
                dataIndex: '操作人',
                width: 120,
                key: '操作人',
                render: (text, record) => (
                    <span>{record.bkUserName}</span>)
            }];
        this.requestPage()
    }

    getOPLog = (record) => {
        var self = this;
        window.Axios.post('/auth/getOperatorLogHistoryList', {
            moduleLog: '交易管理',
            pageLog: '出入金报表',
            commentLog: 'test',
            typeLog: '18',
        }).then(function (response) {

            self.setState({
                totalpageComments: response.data.data.totalPage,
                operationDiaryHistory: response.data.data.list,
            }, () => {

                self.setState({
                    visibleB: true,
                    loading: false,
                });
            });

        });
    }

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
    seeDetail = (record) => {
        let self = this
        window.Axios.post('star/getStarLiveAccountCommentList', {
            'pageSize': 100,
            'id': record.id,
        }).then(function (response) {
            self.setState({
                    nodeList: response.data.data.list
                }, () => {
                    self.showModal()
                }
            );
        })
    };


    changePageComment = (page) => {
        this.setState({
            currentComment: page,
        }, () => {
            this.requestUserCommentList()
        })
    }


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

    requestPageS = () => {
        let self = this
        window.Axios.post('finance/getDepositWithdrawReport', {
            'pageSize': self.state.pgsize,
            'pageNo': self.state.current,
            email: this.state.selectMail,
            mobile: this.state.selectPhoneF,
            nationalId: this.state.selectID,
            accountNo: this.state.starClientAccount,
            startTime: this.state.selectTimeStart,
            endTime: this.state.selectTimeEnd,
        }).then((response) => {
            self.setState({
                    totalPage: response.data.data.totalPage,
                    loading: false,
                    userList: response.data.data.list == null ? [] : response.data.data.list
                }
            );
        })

    }
    requestPage = () => {

        let self = this
        self.setState({
                loading: true,
            }
        );
        window.Axios.post('finance/getDepositWithdrawReport', {
            'pageSize': self.state.pgsize,
            'pageNo': self.state.current,
        }).then(function (response) {
            self.setState({
                    totalPage: response.data.data.totalPage,
                    loading: false,
                    userList: response.data.data.list == null ? [] : response.data.data.list
                }
            );
        })
    }
    changePage = (page) => {
        this.setState({
            current: page,
        }, () => {
            this.requestPage()
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    showModalOP = () => {
        this.setState({
            visibleOpM: true,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
            visibleOpM: false,
        });
    };
    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    }

    render() {
        return (
            <div>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
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
                                    selectMail: undefined,
                                    selectID: undefined,
                                    startTime: undefined,
                                    selectPhoneF: undefined,
                                    starClientAccount: undefined,
                                    selectTimeStart: undefined,
                                    selectTimeEnd: undefined,
                                    filterTimeFalue: null
                                }, () => {
                                    self.requestPage()
                                })
                            }}>清除条件</Button>}>
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
                            }} style={{marginBottom: 10}} placeholder="交易账号"/>
                            <RangePicker
                                showToday
                                style={{width: '100%'}}
                                showTime={{format: 'YYYY-MM-DD HH:mm:ss'}}
                                format="YYYY-MM-DD HH:mm:ss"
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


                                        this.setState({
                                            filterTimeFalue: value,
                                            selectTimeStart: selectTimeStart,
                                            selectTimeEnd: selectTimeEnd,

                                        });
                                    }


                                }}
                                value={this.state.filterTimeFalue}
                                onOk={(value) => {
                                    var selectTimeStart = value[0].unix() + '000'
                                    var selectTimeEnd = value[1].unix() + '000'
                                    this.setState({
                                        filterTimeFalue: value,
                                        selectTimeStart: selectTimeStart,
                                        selectTimeEnd: selectTimeEnd,

                                    });
                                }}
                            />

                            <Button onClick={() => this.requestPageS()} style={{marginTop: 15}} type="primary"
                                    icon="search">Search</Button>

                        </Card>
                    </div>
                </div>


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
                            }}>{'查看出入金报表日志'}
                            </span>
                        </div>
                        <Table
                            style={{marginTop: "20px", marginLeft: "20px", marginRight: "20px"}}
                            rowKey="id"
                            bordered
                            columns={this.columnsLogV2}
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


                <Modal
                    bodyStyle={{
                        width: '600px',

                        background: 'white',
                        padding: 0,
                        margin: 0,
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                            NoteModalVisible2: false,
                        });
                    }}
                    closable={false}
                    footer={null}
                    // onCancel={this.handleCancel}
                    visible={this.state.NoteModalVisible2}


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
                            }}>{'添加备注'}
                            </span>
                        </div>

                        <TextArea
                            style={{marginTop: "20px", width: '560px', marginLeft: "20px", marginRight: "20px"}}

                            rows={4}
                            value={this.state.theComment}
                            onChange={(e) => {
                                let comment = e.target.value;
                                this.setState({
                                    theComment: comment
                                });
                            }}
                            placeholder="在这里填写回访次数以及备注信息"/>
                        <Table
                            style={{marginTop: "20px", marginLeft: "20px", marginRight: "20px"}}
                            bordered
                            rowKey="id"
                            columns={this.modalOPDayL2}
                            dataSource={this.state.operationDiaryHistory}
                        />

                        <div style={{
                            marginLeft: "80px", marginRight: "80px",
                            paddingBottom: '48px',
                            paddingTop: '48px',
                            justifyContent: 'space-between',
                            display: 'flex'
                        }}>

                            <Button

                                onClick={
                                    this.handleAddComment
                                }
                                style={{
                                    borderRadius: '4px',
                                    background: '#F6D147',
                                    width: '180px',
                                    height: '40px'
                                }}> 提交 </Button>
                            <Button onClick={(e) => {
                                this.setState({
                                    NoteModalVisible2: false,
                                });
                            }} style={{borderRadius: '4px', width: '180px', height: '40px'}}> 取消 </Button>
                        </div>
                    </div>
                </Modal>


                <h2 style={{marginTop: 15}}>
                    出入金报表
                </h2>
                <BreadcrumbCustom first="交易管理" second="出入金报表"/>

                <Card title="出入金报表"
                      bodyStyle={{padding: 0, margin: 0}}

                      extra={
                          <CSVLink filename={new Date() + "出入金管理报表.csv"} data={this.state.userList}
                                   headers={this.columnss}>
                              <Button onClick={() => {
                                  window.Axios.post('/auth/addOperatorLogHistory', {
                                      moduleLog: '交易管理',
                                      pageLog: '出入金报表',
                                      commentLog: '下载当前列表',
                                      typeLog: '18',
                                  })
                              }
                              }>下载当前列表</Button>
                          </CSVLink>
                      }
                >

                    <Table rowKey="id"
                           titleStyle={{whiteSpace: 'nowrap'}}
                           bodyStyle={{whiteSpace: 'nowrap'}}
                           style={{whiteSpace: 'nowrap'}}
                           columns={this.columns}
                           dataSource={this.state.userList}
                           scroll={{x: 1600}}
                           bordered
                           loading={this.state.loading}
                           pagination={{
                               total: this.state.pgsize * this.state.totalPage,
                               pageSize: this.state.pgsize,
                               onChange: this.changePage,
                           }}
                    />
                </Card>
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
