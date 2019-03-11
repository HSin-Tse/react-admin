/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, message, Modal, Card, Input} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";

const {TextArea} = Input;

class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            operationDiaryHistory: [],
            visible: false,
            visibleOpM: false,
            NoteModalVisible2: true,
            date: new Date(),
            userList: [],
            loading: false,
            modal2OPDAYVisible: false,
            searchPhone: '',
            theComment: '',
            theBelongUserId: '',
            totalPage: 1,
            modeState: 1,
            isCanOPA: false,
            isCanOPB: false,
            isCanOPC: false,
            isCanOPD: false,
            forbiddenValue: 0,
            current: 1,
            pgsize: 20,
            loadFor: false,

        };
    }

    handleAddComment = (e) => {
        let self = this;
        window.Axios.post('auth/addRecordComment', {
            id: self.state.theBelongUserId,
            commentType: 6,
            content: self.state.theComment,
        }).then(() => {
            message.success('操作成功')
        })


        this.setState({
            modal2OPDAYVisible: false,
        });
    }


    requestUserCommentList = (record) => {


        var self = this;
        window.Axios.post('/auth/getRecordCommentList', {
            id: record.id,
            commentType: 6,
            pageNo: this.state.currentComment,
            pageSize: this.state.pgsize,
        }).then(function (response) {
            self.setState({
                totalpageComments: response.data.data.totalPage,
                operationDiaryHistory: response.data.data.list,
            });
        });
    }
    showOPDAyModal2 = (recodrd) => {
        this.requestUserCommentList(recodrd)

        var self = this

        let id = recodrd.id


        self.setState({
            theBelongUserId: id,
        });
        console.log('hcia id', id)

        this.setState({
            modal2OPDAYVisible: true,
            theComment: '',
        });
    };

    componentDidMount() {
        let self = this;
        this.modalOPDayL2 = [
            {
                title: '操作人',
                dataIndex: 'comment',
                key: 'operationDiary_Status',
                align: 'center',

                render: (text, record) => (
                    <span>{record.bkUserName}</span>),
            }, {
                title: '操作時間',
                dataIndex: 'bkUserName',
                key: 'operationDiary_User',
                align: 'center',

                render: (text, record) => (
                    <span>{this.timestampToTime(record.createDate)}</span>),
            }, {
                title: '备注',
                dataIndex: 'comment',
                key: 'operationDiary_Status',
                align: 'center',

                render: (text, record) => (
                    <span>{record.comment}</span>),
            }]

        if (localStorage.getItem('infor')) {


            var menuInfor = JSON.parse(localStorage.getItem('infor'))


            console.log('hcia menuInfor.superFlag', menuInfor.superFlag)

            if (menuInfor.superFlag === 1) {
                self.setState({
                    isCanOPA: true,
                    isCanOPB: true,
                    isCanOPC: true,
                    isCanOPD: true,
                });
            } else {


                var isCanOp = menuInfor.menuList.find((item) => {
                    // console.log('hcia  this.props', this.props)
                    return this.props.tk === item.key;
                });

                console.log('hcia isCanOp', isCanOp)

                var chA = isCanOp.childrenMenu.find((item) => {
                    // console.log('hcia  this.props', this.props)
                    return item.key === 'WITHDRAW_MASTER_CHECK';
                });
                var chB = isCanOp.childrenMenu.find((item) => {
                    // console.log('hcia  this.props', this.props)
                    return item.key === 'WITHDRAW_BANK_CHECK';
                });
                var chC = isCanOp.childrenMenu.find((item) => {
                    // console.log('hcia  this.props', this.props)
                    return item.key === 'WITHDRAW_SERVICE_CHECK';
                });
                var chD = isCanOp.childrenMenu.find((item) => {
                    // console.log('hcia  this.props', this.props)
                    return item.key === 'WITHDRAW_DETAIL';
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
                if (chD.availableFlag == 0) {
                    self.setState({
                        isCanOPD: true,
                    });
                } else {

                }


                console.log('hcia chA', this.state.isCanOPA)
                console.log('hcia chB', this.state.isCanOPB)
                console.log('hcia chC', this.state.isCanOPC)
                console.log('hcia chD', this.state.isCanOPD)
            }


        }

        // w
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
                title: '姓名',
                dataIndex: '姓名',
                key: '姓名',
                render: (text, record) => (
                    <span>{record.name}</span>),
                align: 'center',
            }, {
                align: 'center',
                title: '申请时间',
                dataIndex: '申请时间',
                key: '申请时间',
                width: 100,
                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                align: 'center',
                title: '支付渠道',
                dataIndex: '支付渠道',
                key: '支付渠道',
                render: (text, record) => (
                    <span>{record.channelName}</span>)
            }, {
                align: 'center',

                title: '账户币种',
                dataIndex: '账户币种',
                key: '账户币种',
                render: (text, record) => (
                    <span>{record.accountCurrency}</span>),
            }, {
                align: 'center',
                title: '出金金额',
                dataIndex: '出金金额',
                key: '出金金额',
                render: (text, record) => (
                    <span>{record.accountAmount}</span>),
            }, {
                align: 'center',
                title: '账号类型',
                dataIndex: '账号类型',
                key: '账号类型',
                render: (text, record) => (
                    <span>{record.broker}</span>),
            }, {
                align: 'center',
                title: '执行金额',
                dataIndex: '执行金额',
                key: '执行金额',
                render: (text, record) => (
                    <span>{record.execAmount}</span>
                )

            }, {
                align: 'center',
                title: '执行币种',
                dataIndex: '执行币种',
                key: '执行币种',
                render: (text, record) => (
                    <span>{record.execCurrency}</span>)
            }

            , {
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
                title: '出金状态',
                dataIndex: '出金状态',
                key: '出金状态',
                render: (text, record) => (
                    <span>{record.displayStatus}</span>)
            }, {
                align: 'center',
                title: '执行日期',
                dataIndex: '执行日期',
                key: '执行日期',
                render: (text, record) => (
                    <span>{record.completeDate}</span>)
            }, {
                align: 'center',
                title: '处理人',
                dataIndex: '处理人',
                key: '处理人',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                title: '操作',
                key: '操作',
                align: 'center',


                render: (text, record) => (
                    <div style={{whiteSpace: 'nowrap'}}>


                        <Button

                            size={'small'}
                            style={{width: '190px', background: '#FDD000'}}
                            onClick={() => {

                                console.log('hcia record.id', record.id)


                                var sss = record.status == 1 ? 'b' : record.status == 2 ? 'a' : record.status == 3 ? 'a' : record.status == 4 ? 'c' : record.status == 5 ? 'b' : record.status == 6 ? 'c' : record.status == 7 ? 'd' : record.status == 8 ? 'c' : record.status == 9 ? 'd' : 'a'


                                console.log('hcia sss', sss)
                                this.props.history.push('/app/fina/juoutm' + sss + record.id)


                            }}> {record.status == 0 ? '提交成功(Pending)' : record.status == 1 ? '结算审核通过(Accounts OK)' : record.status == 2 ? '结算审核暂停(Suspend)' : record.status == 3 ? '结算审核失败(Failure)' : record.status == 4 ? '风险审核通过(Accepted)' : record.status == 5 ? '风险审核暂停(Suspend)' : record.status == 6 ? '风险审核失败(Failure)' : record.status == 7 ? '渠道下发通过(Completed)' : record.status == 8 ? '渠道下发暂停(Suspend)' : record.status == 9 ? '渠道下发失败(Failure)' : '??'}

                        </Button>


                    </div>
                ),
            }, {
                align: 'center',
                title: '异常备注',
                key: '异常备注',
                render: (text, record) => (
                    <div>
                        <Button size={'small'} style={{minWidth: 70, background: '#FDD000'}}
                                onClick={() => this.showOPDAyModal2(record)}>添加</Button>

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
    changePageComment = (page) => {
        // page = page - 1
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

        window.Axios.post('finance/getWithdrawHistory', {
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

                {/*<div>isCanOPA :{JSON.stringify(this.state.isCanOPA)}</div>*/}
                {/*<div>isCanOPB :{JSON.stringify(this.state.isCanOPB)}</div>*/}
                {/*<div>isCanOPC :{JSON.stringify(this.state.isCanOPC)}</div>*/}
                {/*<div>isCanOPD :{JSON.stringify(this.state.isCanOPD)}</div>*/}

                <h2 style={{marginTop: 15}}>
                    出金管理
                </h2>
                <BreadcrumbCustom first="财务管理" second="出金管理"/>

                <Card title="出金管理"
                      bodyStyle={{padding: 0, margin: 0}}

                      extra={
                          <Button type="default" disabled={!hasSelected}
                                  onClick={() => this.refleshNowpage()}>刷新当前页面
                          </Button>
                      }>

                    <Table

                        titleStyle={{whiteSpace: 'nowrap'}}
                        style={{whiteSpace: 'nowrap'}}
                        rowKey="id"
                        rowSelection={rowSelection}

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
                    bodyStyle={{
                        width: '600px',
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
                            }}>{'异常备注'}
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
                            placeholder="异常备注"/>
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
                                    modal2OPDAYVisible: false,
                                });
                            }} style={{borderRadius: '4px', width: '180px', height: '40px'}}> 取消 </Button>

                        </div>

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
