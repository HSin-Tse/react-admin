/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, message, Select, Modal, Card, Col, Popconfirm, Row, Input} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";

const Option = Select.Option;
const {TextArea} = Input;

class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            visibleOpM: false,
            date: new Date(),
            userList: [],
            leavgeList: [],
            nodeList: [],

            loading: false,
            searchPhone: '',
            totalPage: 1,
            modeState: 1,
            forbiddenValue: 0,
            current: 0,
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


        this.columns = [
            {
                align: 'center',

                title: '订单编号',
                dataIndex: '订单编号',
                key: '订单编号',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {

                title: '用户账号',
                dataIndex: '用户账号',
                key: '用户账号',
                render: (text, record) => (<span>{record.accountNo}</span>),
                align: 'center',
            }, {

                title: '账户类型',
                dataIndex: '账户类型',
                key: '账户类型',
                render: (text, record) => (
                    <span>{record.broker}</span>),
                align: 'center',
            }, {

                title: '用户姓名',
                dataIndex: '用户姓名',
                key: '用户姓名',
                render: (text, record) => (
                    <span>{record.accountType}</span>),
                align: 'center',
            }, {
                align: 'center',
                title: '申请时间',
                dataIndex: '申请时间',
                key: '申请时间',

                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                align: 'center',
                title: '转入金额',
                dataIndex: '转入金额',
                key: '转入金额',
                render: (text, record) => (
                    <span>{record.marginLevel}</span>)
            }, {
                align: 'center',

                title: '账户币种',
                dataIndex: '账户币种',
                key: '账户币种',
                render: (text, record) => (
                    <span>{record.cashBalance}</span>),
            }, {
                align: 'center',

                title: '执行金额',
                dataIndex: '执行金额',
                key: '执行金额',

                render: (text, record) => (
                    <span>{record.netEquity}</span>),
            }, {
                align: 'center',

                title: '执行币种',
                dataIndex: '执行币种',
                key: '执行币种',

                render: (text, record) => (
                    <span>{record.lastUpdateDate}</span>),
            }, {
                align: 'center',
                title: '账号类型',
                dataIndex: '账号类型',
                key: '账号类型',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                align: 'center',
                title: '使用汇率',
                dataIndex: '使用汇率',
                key: '使用汇率',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                align: 'center',
                title: '手续费',
                dataIndex: '手续费',
                key: '手续费',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                align: 'center',
                title: '入金渠道',
                dataIndex: '入金渠道',
                key: '入金渠道',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                align: 'center',
                title: '支付通道',
                dataIndex: '支付通道',
                key: '支付通道',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                align: 'center',
                title: '状态',
                dataIndex: '状态',
                key: '状态',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                align: 'center',
                title: '处理人',
                dataIndex: '处理人',
                key: '处理人',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                align: 'center',
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <Button onClick={() => this.showOPDAyModal2(record)}>查看详情</Button>
                    </div>
                ),
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
            console.log(response);

            self.setState({
                    nodeList: response.data.data.list
                }, () => {
                    self.showModal()
                }
            );


        })
    };
    handleChange = (value, record) => {
        let self = this
        self.setState({
                modeState: value,
                opRecord: record
            }, () => {
                self.showModalOP()
            }
        );

    };
    changePageComment = (page) => {
        page = page - 1
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
        window.Axios.post('star/getStarLiveAccountList', {
            'pageSize': self.state.pgsize,
            'pageNo': self.state.current,
        }).then(function (response) {
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
        this.setState({
            current: page - 1,
        }, () => {
            this.requestPage()
        })
    }


    handleOk = () => {
        var mStatus = this.state.modeState == '正常' ? 1 : this.state.modeState == '禁止登陆' ? 2 : 3;
        // var reasonType = mStatus ==2?
        let self = this;
        self.setState({
            loadFor: true
        })
        window.Axios.post('star/updateStarLiveAccount', {
            'id': self.state.opRecord.id,
            'status': mStatus,
            'reasonType': self.state.forbiddenValue,
        }).then(function (response) {
            console.log(response);
            self.setState({
                visibleOpM: false,
                loadFor: false,
            }, () => {
                self.state.forbiddenValue = 0
                self.requestPage()
            });
            message.success('操作成功');

        })
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('hcia', 'selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    render() {
        const {selectedRowKeys} = this.state;
        const hasSelected = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
                {/*<div>searchPhone query :{JSON.stringify(this.state.searchPhone)}</div>*/}
                {/*this.state.selectedRowKeys.length > 0*/}

                <h2 style={{marginTop: 15}}>
                    入金管理
                </h2>
                <BreadcrumbCustom first="交易管理" second="入金管理"/>

                <Card title="入金管理"
                      bodyStyle={{padding: 0, margin: 0}}
                >

                    <Table rowKey="id"
                           rowSelection={rowSelection}

                           columns={this.columns}
                           dataSource={this.state.userList}
                           scroll={{x: 2000}}
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
