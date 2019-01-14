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
    onChangeLe = (value) => {
        // updateLeverageApply
        let self = this

        console.log('hcia value', value)
        window.Axios.post('finance/updateLeverageApply', {
            id: this.state.detail.id,
            leverageId: value,
        }).then((response) => {
            // self.setState({
            //     leavgeList: response.data.data,
            // })
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


        this.columns = [

            {
                title: '序号',
                label: '序号',
                dataIndex: '序号',
                key: 'index',
                align: 'center',
                render: (text, record, index) =>
                {

                    record.index =this.state.current * this.state.pgsize + index + 1
                   return (

                       <span>{this.state.current * this.state.pgsize + index + 1}</span>
                   )
                }
            },
            {
                align: 'center',

                title: '订单编号',
                label: '订单编号',
                dataIndex: '订单编号',
                key: '订单编号',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {

                title: '客户邮箱',
                label: '客户邮箱',
                dataIndex: '客户邮箱',
                key: '客户邮箱',
                render: (text, record) => (<span>{record.email}</span>),
                align: 'center',
            }, {

                title: '交易账户',
                label: '交易账户',
                dataIndex: '交易账户',
                key: '交易账户',
                render: (text, record) => (
                    <span>{record.broker}</span>),
                align: 'center',
            }, {

                title: '交易组',
                label: '交易组',
                dataIndex: '交易组',
                key: '交易组',
                render: (text, record) => (
                    <span>{record.accountType}</span>),
                align: 'center',
            }, {

                title: '类型',
                label: '类型',
                dataIndex: '类型',
                key: '类型',
                render: (text, record) => (
                    <span>{record.accountType}</span>),
                align: 'center',
            }, {
                align: 'center',

                title: '客户申请时间',
                label: '客户申请时间',
                dataIndex: '客户申请时间',
                key: '客户申请时间',

                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                align: 'center',

                title: '经纪商',
                label: '经纪商',
                dataIndex: '经纪商',
                key: '经纪商',
                render: (text, record) => (
                    <span>{record.marginLevel}</span>)
            }, {
                align: 'center',

                title: '出入金渠道',
                label: '出入金渠道',
                dataIndex: '出入金渠道',
                key: '出入金渠道',
                render: (text, record) => (
                    <span>{record.cashBalance}</span>),
            }, {
                align: 'center',

                title: '交易币种',
                label: '交易币种',
                dataIndex: '交易币种',
                key: '交易币种',

                render: (text, record) => (
                    <span>{record.netEquity}</span>),
            }, {
                align: 'center',

                title: '金额',
                label: '金额',
                dataIndex: '金额',
                key: '金额',

                render: (text, record) => (
                    <span>{record.lastUpdateDate}</span>),
            }, {
                align: 'center',

                title: '执行金额',
                label: '执行金额',
                dataIndex: '执行金额',
                key: '执行金额',

                render: (text, record) => (
                    <span>{record.lastUpdateDate}</span>),
            }, {
                align: 'center',

                title: '执行币种',
                label: '执行币种',
                dataIndex: '执行币种',
                key: '执行币种',

                render: (text, record) => (
                    <span>{record.lastUpdateDate}</span>),
            }, {
                align: 'center',

                title: '使用汇率',
                label: '使用汇率',
                dataIndex: '使用汇率',
                key: '使用汇率',

                render: (text, record) => (
                    <span>{record.lastUpdateDate}</span>),
            }, {
                align: 'center',

                title: '手续费',
                label: '手续费',
                dataIndex: '手续费',
                key: '手续费',

                render: (text, record) => (
                    <span>{record.lastUpdateDate}</span>),
            }, {
                align: 'center',

                title: '执行时间',
                label: '执行时间',
                dataIndex: '执行时间',
                key: '执行时间',

                render: (text, record) => (
                    <span>{record.lastUpdateDate}</span>),
            }, {
                align: 'center',
                title: '处理人',
                label: '处理人',
                dataIndex: '处理人',
                key: '处理人',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                align: 'center',

                title: '审核日志',
                dataIndex: '审核日志',
                key: '审核日志',
                render: (text, record) => (
                    <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}onClick={() => this.showModalB(record)}>详情</Button>
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
                <Modal
                    width={500}
                    title={this.state.modeState == '正常' ? '恢复正常' : this.state.modeState}
                    onCancel={(e) => {
                        this.setState({
                            visibleB: false,
                        });
                    }}
                    visible={this.state.visibleB}

                    footer={[
                        <Popconfirm title="确认？" onConfirm={this.handleOk}
                                    okText="Yes"
                                    cancelText="No">
                            <Button type="normal" key="submit">通過</Button>
                        </Popconfirm>,
                        <Popconfirm title="拒绝？"
                                    onConfirm={this.handleReject} e
                                    okText="Yes"
                                    cancelText="No">
                            <Button type="normal" key="back">拒絕</Button>
                        </Popconfirm>
                    ]}
                >
                    <Card

                        title={'账户：' + this.state.detail.accountNo}
                        bordered={true}>

                        <div>
                            <Row style={{marginTop: 20}}>
                                <Col style={{textAlign: 'right'}} span={10}>当前杠杆:</Col>
                                <Col style={{textAlign: 'center'}} span={14}>{this.state.detail.targetLeverage}</Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col style={{textAlign: 'right'}} span={10}>余额:</Col>
                                <Col style={{textAlign: 'center'}} span={14}>{this.state.detail.cashBalance}</Col>
                            </Row>

                            <Row style={{marginTop: 20}}>
                                <Col style={{textAlign: 'right'}} span={10}>杠杆修改:</Col>
                                <Col style={{textAlign: 'center'}} span={14}>
                                    <Select
                                        onChange={this.onChangeLe}
                                        defaultValue={this.state.detail.targetLeverage}
                                        style={{width: 100, marginLeft: 0}}>
                                        {this.state.leavgeList.map(ccty => <Option
                                            value={ccty.id} key={ccty.leverage}>1:{ccty.leverage}</Option>)}
                                    </Select>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col style={{textAlign: 'right'}} span={10}>保证金占比:</Col>
                                <Col style={{textAlign: 'center'}} span={14}>{this.state.detail.marginLevel}</Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col span={24}>处理备注：</Col>
                                <Col style={{marginTop: 20}} span={24}>
                                <TextArea value={this.state.detail.comment}
                                          onChange={this.changeNote}
                                          rows={4}></TextArea>
                                </Col>
                            </Row>

                            <Table rowKey="id"
                                   columns={[
                                       {
                                           title: '时间',
                                           dataIndex: 'createDate',
                                           key: 'operationDiary_Date',
                                           render: (text, record) => (
                                               <span>{record.createDate}</span>),
                                       }, {
                                           title: 'IP',
                                           dataIndex: 'IP',
                                           key: 'IP',
                                           render: (text, record) => (
                                               <span>{record.ipAddress}</span>),
                                       }, {
                                           title: '操作人',
                                           width: 130,
                                           dataIndex: 'bkUserName',
                                           key: 'operationDiary_User',
                                           render: (text, record) => (
                                               <span>{record.bkUserName}</span>),
                                       }, {
                                           title: '操作',
                                           dataIndex: 'comment',
                                           key: 'operationDiary_Status',
                                           render: (text, record) => (
                                               <span>{record.comment}</span>),
                                       }]}
                                   dataSource={this.state.operationDiaryHistory}
                                   loading={this.state.loadingComment}
                                   pagination={{
                                       total: this.state.totalpageComments * this.state.pgsize,
                                       pageSize: this.state.pgsize,
                                       onChange: this.changePageComment,
                                   }}
                            />
                        </div>
                    </Card>


                </Modal>
                <Modal
                    title={this.state.modeState == '正常' ? '恢复正常' : this.state.modeState}
                    onCancel={this.handleCancel}
                    visible={this.state.visibleOpM}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消操作</Button>,
                        <Button loading={this.state.loadFor} key="submit" type="primary"
                                onClick={() => this.handleOk()}>
                            提交
                        </Button>,
                    ]}
                >
                    <div>
                        {this.state.modeState == '正常' ? <span>确认当前用户账户恢复正常</span> : null}
                        {this.state.modeState == '禁止登陆' ? <span>请选择禁止登录原因</span> : null}
                        {this.state.modeState == '禁止交易' ? <span>禁止交易</span> : null}
                    </div>
                    <div>

                        {this.state.modeState == '禁止登陆' ?
                            <Select style={{width: 200, marginTop: 20}} defaultValue='无效的邮箱'
                                    onChange={(value) => this.forbitChange(value)}>
                                {this.state.suspend_reason_type.map(ccty => <Option
                                    value={ccty.value} key={ccty.value}>{ccty.name}</Option>)}
                            </Select> : null}
                    </div>


                </Modal>

                <Modal
                    title="备注详情"
                    onCancel={this.handleCancel}
                    visible={this.state.visible}
                    footer=''
                >
                    <Table rowKey="id"
                           columns={this.nodeColumns}
                           dataSource={this.state.nodeList}// nodeList
                    />


                </Modal>
                <h2 style={{marginTop: 15}}>
                    出入金报表
                </h2>
                <BreadcrumbCustom first="交易管理" second="出入金报表"/>

                <Card title="出入金报表"
                      bodyStyle={{padding: 0, margin: 0}}

                      extra={

                          <CSVLink filename={"出入金报表.csv"} data={this.state.userList} headers={this.columns}>
                              <Button>下载当前列表</Button>
                          </CSVLink>
                          // <Button type="default"
                          //         onClick={() => {
                          //
                          //
                          //
                          //         }
                          //         }>下载当前列表
                          // </Button>
                      }>

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
