/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, message, Modal, Card, Input, Icon} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";
import {CSVLink} from "react-csv";
import classNames from "classnames";
import EchartsViews from "../dashboard/EchartsViews";

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
            availableFlag: false,
            forbiddenValue: 0,
            current: 1,
            pgsize: 20,
            loadFor: false,

        };
    }

    handleAddComment = () => {
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
        this.setState({
            modal2OPDAYVisible: true,
            theComment: '',
        });
    };

    componentDidMount() {


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


        this.columnss = [

            {
                align: 'center',
                label: '订单编号',
                dataIndex: '订单编号',
                key: 'orderNo',
                render: (text, record) => (
                    <span>{record.orderNo}</span>),
            }, {

                label: '用户账号',
                dataIndex: '用户账号',
                key: 'accountNo',
                render: (text, record) => (<span>{record.accountNo}</span>),
                align: 'center',
            }, {
                label: '姓名',
                dataIndex: '姓名',
                key: 'name',
                render: (text, record) => (
                    <span>{record.name}</span>),
                align: 'center',
            }, {
                align: 'center',
                label: '申请时间',
                dataIndex: '申请时间',
                key: 'date',
                width: 100,
                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                align: 'center',
                label: '支付渠道',
                dataIndex: '支付渠道',
                key: 'channelName',
                render: (text, record) => (
                    <span>{record.channelName}</span>)
            }, {
                align: 'center',

                label: '账户币种',
                dataIndex: '账户币种',
                key: 'accountCurrency',
                render: (text, record) => (
                    <span>{record.accountCurrency}</span>),
            }, {
                align: 'center',
                label: '出金金额',
                dataIndex: '出金金额',
                key: 'accountAmount',
                render: (text, record) => (
                    <span>{record.accountAmount}</span>),
            }, {
                align: 'center',
                label: '账号类型',
                dataIndex: '账号类型',
                key: 'broker',
                render: (text, record) => (
                    <span>{record.broker}</span>),
            }, {
                align: 'center',
                label: '执行金额',
                dataIndex: '执行金额',
                key: 'execAmount',
                render: (text, record) => (
                    <span>{record.execAmount}</span>
                )

            }, {
                align: 'center',
                label: '执行币种',
                dataIndex: '执行币种',
                key: 'execCurrency',
                render: (text, record) => (
                    <span>{record.execCurrency}</span>)
            }

            , {
                align: 'center',
                label: '使用汇率',
                dataIndex: '使用汇率',
                key: 'rate',
                render: (text, record) => (
                    <span>{record.rate}</span>)
            }, {
                align: 'center',
                label: '手续费',
                dataIndex: '手续费',
                key: 'feeAmount',
                render: (text, record) => (
                    <span>{record.feeAmount}</span>)
            }, {
                align: 'center',
                label: '出金状态',
                dataIndex: '出金状态',
                key: 'displayStatus',
                render: (text, record) => (
                    <span>{record.displayStatus}</span>)
            }, {
                align: 'center',
                label: '执行日期',
                dataIndex: '执行日期',
                key: 'completeDate',
                render: (text, record) => (
                    <span>{record.completeDate}</span>)
            }, {
                align: 'center',
                label: '处理人',
                dataIndex: '处理人',
                key: 'operator',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }

        ];
        this.columns = [
            {
                title: '序号',
                dataIndex: '序号',
                key: '序号',
                align: 'center',
                render: (text, record, index) => (
                    <span>{(this.state.current - 1) * this.state.pgsize + index + 1}</span>
                ),
            },
            {
                align: 'center',
                title: '渠道列表',
                dataIndex: '渠道列表',
                key: '渠道列表',
                render: (text, record) => (
                    <span>{record.orderNo}</span>),
            }, {

                title: '点击次数',
                dataIndex: '点击次数',
                key: '点击次数',
                render: (text, record) => (<span>{record.accountNo}</span>),
                align: 'center',
            }, {
                title: '浏览次数',
                dataIndex: '浏览次数',
                key: '浏览次数',
                render: (text, record) => (
                    <span>{record.name}</span>),
                align: 'center',
            }, {
                align: 'center',
                title: '下载次数',
                dataIndex: '下载次数',
                key: '下载次数',
                width: 100,
                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                align: 'center',
                title: '注册账号',
                dataIndex: '注册账号',
                key: '注册账号',
                render: (text, record) => (
                    <span>{record.channelName}</span>)
            }, {
                align: 'center',

                title: '新增开户数',
                dataIndex: '新增开户数',
                key: '新增开户数',
                render: (text, record) => (
                    <span>{record.accountCurrency}</span>),
            }, {
                align: 'center',
                title: '累计开户数',
                dataIndex: '累计开户数',
                key: '累计开户数',
                render: (text, record) => (
                    <span>{record.accountAmount}</span>),
            }, {
                align: 'center',
                title: 'DAU',
                dataIndex: 'DAU',
                key: 'DAU',
                render: (text, record) => (
                    <span>{record.broker}</span>),
            }, {
                align: 'center',
                title: 'MAU',
                dataIndex: 'MAU',
                key: 'MAU',
                render: (text, record) => (
                    <span>{record.execAmount}</span>
                )

            }, {
                align: 'center',
                title: '总用户',
                dataIndex: '总用户',
                key: '总用户',
                render: (text, record) => (
                    <span>{record.execCurrency}</span>)
            }

            , {
                align: 'center',
                title: '次日留存',
                dataIndex: '次日留存',
                key: '次日留存',
                render: (text, record) => (
                    <span>{record.rate}</span>)
            }, {
                align: 'center',
                title: '周留存',
                dataIndex: '周留存',
                key: '周留存',
                render: (text, record) => (
                    <span>{record.feeAmount}</span>)
            }, {
                align: 'center',
                title: '月留存',
                dataIndex: '月留存',
                key: '月留存',
                render: (text, record) => (
                    <span>{record.displayStatus}</span>)
            }, {
                align: 'center',
                title: '操作',
                key: '操作',
                render: (text, record) => (
                    <div>
                        <Button size={'small'} style={{minWidth: 70, background: '#FDD000'}}
                                onClick={() => this.showOPDAyModal2(record)}>删除</Button>

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

    requestPageR = () => {

        let self = this
        self.setState({
                loading: true,
            }
        );

        window.Axios.post('finance/getWithdrawHistory', {
            'pageSize': self.state.pgsize,

            merOrderNo: this.state.selectOrderNo,
            name: this.state.selectName,
            starClientAccount: this.state.accountNo,
            startTime: this.state.selectTimeStart,
            endTime: this.state.selectTimeEnd,


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
            self.setState({
                    totalPage: response.data.data.totalPage,
                    loading: false,
                    userList: response.data.data.list
                }
            );
        })
    };


    changePage = (page) => {
        this.setState({
            current: page,
        }, () => {
            this.requestPage()
        })
    };
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
            // To disabled submit button at the beginning.

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
        return (
            <div>

                <div className={classNames('switcher dark-white', {active: this.state.switcherOn})}>
                    <span className="sw-btn dark-white" onClick={() => {
                        this.setState({
                            switcherOn: !this.state.switcherOn
                        })
                    }}>
                     <Icon type="setting" className="text-dark"/>
                    </span>
                    <div style={{width: 270}}>
                        <Card
                            title="当前表搜索"
                            extra={<Button type="primary" onClick={() => {
                                let self = this
                                this.setState({
                                    selectOrderNo: undefined,
                                    selectName: undefined,
                                    accountNo: undefined,
                                    selectTimeStart: undefined,
                                    selectTimeEnd: undefined,
                                    filterTimeFalue: null
                                }, () => {
                                    self.requestPage()
                                })
                            }}
                            >清除条件</Button>}
                        >


                            <Input value={this.state.selectName} onChange={(e) => {
                                this.setState({
                                    selectName: e.target.value,
                                });
                            }} style={{marginBottom: 10}} placeholder="渠道名称"/>


                            <Button onClick={() => this.requestPageR()} style={{marginTop: 15}} type="primary"
                                    icon="search">Search</Button>

                        </Card>


                    </div>
                </div>

                <h2 style={{marginTop: 15}}>
                    客维管理
                </h2>
                <BreadcrumbCustom first="营销管理" second="渠道管理" third={"客维主页"}/>

                <Card
                    style={{marginTop: 15}}
                    title="返佣账户"
                    bodyStyle={{padding: 0, margin: 0}}
                >


                    <div className="gutter-example button-demo">


                        <Card>
                            <div style={{display: 'flex', minHeight: 40, width: 200}}>
                                <span style={{minWidth: 100}}>渠道名称：</span>
                                <Input defaultValue={this.state.NameCn}
                                       onChange={(e) => {
                                           this.setState({
                                               NameCn: e.target.value,
                                           });
                                       }}
                                       style={{minWidth: 160}}
                                       tagkey="lastNameCn"
                                       sdsd={'dd'}/>
                            </div>

                            <div style={{display: 'flex', minHeight: 40, width: 200}}>
                                <span style={{minWidth: 100}}>渠道链接：</span>
                                <Input defaultValue={this.state.NameCn}
                                       onChange={(e) => {
                                           this.setState({
                                               NameCn: e.target.value,
                                           });
                                       }}
                                       style={{minWidth: 160}}
                                       tagkey="lastNameCn"
                                       sdsd={'dd'}/>
                            </div>
                            <div style={{display: 'flex', minHeight: 40, width: 200}}>
                                <span style={{minWidth: 100}}>渠道状态：</span>
                                <Input defaultValue={this.state.NameCn}
                                       onChange={(e) => {
                                           this.setState({
                                               NameCn: e.target.value,
                                           });
                                       }}
                                       style={{minWidth: 160}}
                                       tagkey="lastNameCn"
                                       sdsd={'dd'}/>
                            </div>

                            <Button onClick={(e) => {


                            }} style={{borderRadius: '4px', height: '30px'}}> 添加备注并保存 </Button>


                        </Card>

                    </div>
                </Card>
                <Card
                    style={{marginTop: 15}}
                    title="数据统计"
                    bodyStyle={{padding: 0, margin: 0}}
                >


                    <div className="gutter-example button-demo">


                        <Card>
                            <div style={{display: 'flex', minHeight: 40, width: 200}}>
                                <span style={{minWidth: 100}}>渠道名称：</span>
                                <Input defaultValue={this.state.NameCn}
                                       onChange={(e) => {
                                           this.setState({
                                               NameCn: e.target.value,
                                           });
                                       }}
                                       style={{minWidth: 160}}
                                       tagkey="lastNameCn"
                                       sdsd={'dd'}/>
                            </div>

                            <div style={{display: 'flex', minHeight: 40, width: 200}}>
                                <span style={{minWidth: 100}}>渠道链接：</span>
                                <Input defaultValue={this.state.NameCn}
                                       onChange={(e) => {
                                           this.setState({
                                               NameCn: e.target.value,
                                           });
                                       }}
                                       style={{minWidth: 160}}
                                       tagkey="lastNameCn"
                                       sdsd={'dd'}/>
                            </div>
                            <div style={{display: 'flex', minHeight: 40, width: 200}}>
                                <span style={{minWidth: 100}}>渠道状态：</span>
                                <Input defaultValue={this.state.NameCn}
                                       onChange={(e) => {
                                           this.setState({
                                               NameCn: e.target.value,
                                           });
                                       }}
                                       style={{minWidth: 160}}
                                       tagkey="lastNameCn"
                                       sdsd={'dd'}/>
                            </div>
                            <EchartsViews/>


                            <Button onClick={(e) => {


                            }} style={{borderRadius: '4px', height: '30px'}}> 添加备注并保存 </Button>


                        </Card>

                    </div>
                </Card>
                <Card
                    style={{marginTop: 15}}

                    title="我的状态"
                      bodyStyle={{padding: 0, margin: 0}}

                      extra={[
                          <Button style={{marginRight: '10px'}} type="default" disabled={!hasSelected}
                                  onClick={() => this.refleshNowpage()}>渠道列表
                          </Button>,

                          <CSVLink filename={new Date() + "出金管理报表.csv"} data={this.state.userList}
                                   headers={this.columnss}>
                              <Button onClick={() => {

                                  console.log('hcia Button')

                                  window.Axios.post('/auth/addOperatorLogHistory', {
                                      moduleLog: '交易管理',
                                      pageLog: '出金报表',
                                      commentLog: '下载当前列表',
                                      typeLog: '18',
                                  }).then(function (response) {

                                      console.log('hcia response', response)

                                  });


                              }
                              }>下载当前列表</Button>
                          </CSVLink>]
                      }>

                    <Table

                        titleStyle={{whiteSpace: 'nowrap'}}
                        style={{whiteSpace: 'nowrap'}}
                        rowKey="id"

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
