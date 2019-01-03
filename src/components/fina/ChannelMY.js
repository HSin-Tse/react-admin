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
            visible: false,
            visibleOpM: false,
            date: new Date(),
            userList: [],
            leavgeList: [],
            nodeList: [],
            visibleB: false,
            loading: false,
            modal2OPDAYVisible: false,
            modal3OPDAYVisible: false,
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

    showOPDAyModal3 = (recodrd) => {
        this.requestUserCommentList(recodrd)
        this.setState({
            modal3OPDAYVisible: true,
            visible: false,
        });
    };
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

        console.log('hcia recodrd', recodrd)
        this.requestUserCommentList(recodrd)

        let self = this
        self.setState({
            loading: true,
        });

        window.Axios.post('finance/getLeverageApplyDetail', {
            'id': recodrd.id,
        }).then(function (response) {

            self.setState({
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


        this.columns = [
            {
                align: 'center',

                title: '客户姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {

                title: '账号',

                dataIndex: '申请序号',
                key: '申请序号',
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

                title: '交易组',

                dataIndex: '交易组',
                key: '交易组',
                render: (text, record) => (
                    <span>{record.accountType}</span>),
                align: 'center',
            }, {
                align: 'center',

                title: '开户时间',
                dataIndex: '开户时间',
                key: '开户时间',

                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                align: 'center',

                title: '保证金占比',
                dataIndex: '保证金占比',
                key: '保证金占比',
                render: (text, record) => (
                    <span>{record.marginLevel}</span>)
            }, {
                align: 'center',

                title: '浮动余额',
                dataIndex: '浮动余额',
                key: '浮动余额',
                render: (text, record) => (
                    <span>{record.cashBalance}</span>),
            }, {
                align: 'center',

                title: '账户净值',
                dataIndex: '账户净值',
                key: '账户净值',

                render: (text, record) => (
                    <span>{record.netEquity}</span>),
            }, {
                align: 'center',

                title: '刷新时间',
                dataIndex: '刷新时间',
                key: '刷新时间',

                render: (text, record) => (
                    <span>{record.lastUpdateDate}</span>),
            }, {
                align: 'center',

                title: '当前状态',
                dataIndex: '当前状态',
                key: '当前状态',
                render: (text, record) => (
                    <span>{record.accountStatus == 1 ? '正常' : (record.accountStatus == 2) ? '禁止登陆' : '禁止交易'}</span>
                )

            }, {
                align: 'center',
                title: '操作人',
                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                align: 'center',

                title: '当前杠杆',
                dataIndex: '当前杠杆',
                key: '当前杠杆',
                render: (text, record) => (

                    <Button style={{display: record.displayStatus == '审核通过' ? 'none' : ''}}
                            onClick={() => this.showModalB(record)}>{record.displayLeverage}</Button>
                )
                // <Select value={record.displayStatus} style={{width: 100}}
                //         onChange={(value) => this.handleChange(value, record)}>
                //     <Option key="1" value="正常">正常</Option>
                //     <Option key="2" value="禁止登陆">禁止登陆</Option>
                //     <Option key="3" value="禁止交易">禁止交易</Option>
                //
                // </Select>)
            }, {
                align: 'center',
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <Select value={record.displayStatus} style={{width: 100}}
                                onChange={(value) => this.handleChange(value, record)}>
                            <Option key="1" value="正常">正常</Option>
                            <Option key="2" value="禁止登陆">禁止登陆</Option>
                            <Option key="3" value="禁止交易">禁止交易</Option>

                        </Select>
                        {/*<Button style={{marginLeft: 12}} className="ant-dropdown-link"*/}
                        {/*onClick={() => this.seeDetail(record)}>备注</Button>*/}


                        <Button style={{marginLeft: 12}} onClick={() => this.showOPDAyModal3(record)}>备注</Button>

                        <Button onClick={() => this.showOPDAyModal2(record)}>操作日志</Button>

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
        console.log('hcia page', page)
        this.setState({
            current: page - 1,
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
            console.log(response);
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
                    渠道管理
                </h2>
                <BreadcrumbCustom first="交易管理" second="渠道管理"/>

                <Card title="渠道管理"
                      bodyStyle={{padding: 0, margin: 0}}

                      extra={[<Button type="primary"
                                      onClick={() => this.refleshNowpage()}>汇率调整
                      </Button>, <Button type="primary"
                                         onClick={() => this.refleshNowpage()}>新增渠道
                      </Button>]

                      }>

                    <Table rowKey="id"
                           rowSelection={rowSelection}

                           columns={this.columns}
                           dataSource={this.state.userList}
                           scroll={{x: 2000}}
                           bordered
                           footer={() => [<Button type="default" disabled={!hasSelected}
                                                  onClick={() => this.refleshNowpage()}>批量开启
                           </Button>,
                               <Button type="default" disabled={!hasSelected}
                                       onClick={() => this.refleshNowpage()}>批量关闭
                               </Button>]}
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
