/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, message, Select, Modal, Card, Col, Popconfirm, Row, Input} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";
import {CSVLink} from "react-csv";

const Option = Select.Option;
const {TextArea} = Input;

class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            visible: false,
            visibleOpM: false,
            date: new Date(),
            userList: [],
            leavgeList: [],
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
            modal3OPDAYVisible: false,
            searchPhone: '',
            totalPage: 1,
            modeState: 1,
            forbiddenValue: 0,
            current: 1,
            pgsize: 10,
            loadFor: false,
            suspend_reason_type: []

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

    showModalB = (recodrd) => {

        this.requestUserCommentList(recodrd)

        let self = this
        self.setState({
            loading: true,
        });

        window.Axios.post('finance/getLeverageApplyDetail', {
            'id': recodrd.id,
        }).then(function (response) {

            self.setState({
                // detail: response.data.data,
                visibleB: true,
                loading: false,

            });

        });


    }
    showOPDAyModal2 = (recodrd) => {
        this.requestUserCommentList(recodrd)

        this.setState({
            modal2OPDAYVisible: true,
        });

    };

    componentDidMount() {


        let self = this;
        window.Axios.post('dict/openDict', {
            'keys': 'suspend_reason_type',
        }).then(function (response) {
            self.setState({
                    suspend_reason_type: response.data.data.suspend_reason_type
                }
            );
        })

        window.Axios.post('dict/leverageList', {
            'keys': 'IX_Income,IX_Percentage,IX_FundsSource,IX_UStax,IX_Trading_Experience,IX_Trading_Objectives,IX_Risk_Tolerance,open_type_ix,account_type',
        }).then((response) => {
            console.log('hcia response', response)
            self.setState({
                leavgeList: response.data.data,
            })
        });


        this.columnss = [
            {
                align: 'center',
                title: '订单编号',
                label: '订单编号',
                dataIndex: 'merOrderNo',
                key: 'merOrderNo',
                render: (text, record) => (
                    <span>{record.merOrderNo}</span>),
            }
            , {

                title: '客户邮箱',
                label: '客户邮箱',
                dataIndex: 'email',
                key: 'email',
                render: (text, record) => (<span>{record.email}</span>),
                align: 'center',
            }
            , {

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

                title: '经纪商',
                label: '经纪商',
                dataIndex: 'broker',
                key: 'broker',
                render: (text, record) => (
                    <span>{record.broker}</span>)
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
            }
            , {

                title: '客户邮箱',
                label: '客户邮箱',
                dataIndex: 'email',
                key: 'email',
                render: (text, record) => (<span>{record.email}</span>),
                align: 'center',
            }
            , {

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

                title: '经纪商',
                label: '经纪商',
                dataIndex: 'broker',
                key: 'broker',
                render: (text, record) => (
                    <span>{record.broker}</span>)
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
            },
            {
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

        console.log('hcia record', record)
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
    forbitChange = (value) => {
        let self = this
        self.setState({
                forbiddenValue: value,
            }
        );
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
        window.Axios.post('finance/getDepositWithdrawReport', {
            'pageSize': self.state.pgsize,
            'pageNo': self.state.current,
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
        this.setState({
            current: page,
        }, () => {
            this.requestPage()
        })
    }
    refleshNowpage = () => {

        let self = this;
        var result = self.state.selectedRowKeys.map(Number);

        window.Axios.post('star/refreshStarLiveAccount', {
            idList: result,
        }).then(function (response) {
            self.setState({
                visibleOpM: false,
                loadFor: false,
            }, () => {
                self.requestPage()
            });
            message.success('操作成功');

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
        console.log(e);
        this.setState({
            visible: false,
            visibleOpM: false,
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('hcia', 'selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    render() {
        return (
            <div>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
                {/*<div>userList query :{JSON.stringify(this.state.userList)}</div>*/}


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
                            }}>{'查看审核日志'}
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


                <h2 style={{marginTop: 15}}>
                    出入金报表
                </h2>
                <BreadcrumbCustom first="交易管理" second="出入金报表"/>

                <Card title="出入金报表"
                      bodyStyle={{padding: 0, margin: 0}}

                      extra={
                          <CSVLink filename={new Date() + "出入金报表.csv"} data={this.state.userList}
                                   headers={this.columnss}>
                              <Button>下载当前列表</Button>
                          </CSVLink>
                      }>

                    <Table rowKey="id"
                           titleStyle={{whiteSpace: 'nowrap'}}
                           bodyStyle={{whiteSpace: 'nowrap'}}
                           style={{whiteSpace: 'nowrap'}}
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
