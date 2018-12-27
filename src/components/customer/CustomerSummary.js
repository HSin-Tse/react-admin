import React, {Component} from 'react';
import PopupContainer from './hoc/PopupContainer';
import {DatePicker, Input, Modal, Button, Table, message, Card, Icon, Popconfirm, Checkbox} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';

import classNames from "classnames";
// import CustomerUserInfo from "./CustomerUserInfo";

const {RangePicker} = DatePicker;
const {TextArea} = Input;

class CustomerSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bklistA: [],
            operationDiaryHistory: [],
            checkedValues: [],
            currentA: 0,
            otherComment: '',
            accountPassword: '',
            mCount: 0,
            otherCommentChecks: '',
            totalpageA: 0,
            switcherOn: false,
            pgsize: 20,
            opDayRecord: {},
            showUnBindPhoneModal4: false,
            resetSeretModal5: false,
            NoteModalVisible2: false,
            modal2Visible1: false,
        };
    }

    handleKeyPressOOP = (event) => {
        // console.log('hcia event' , event)
        if (event.metaKey || event.ctrlKey) {
            if (event.key === 'o') {
                this.setState({
                    switcherOn: !this.state.switcherOn
                })
            }
        }
    }

    sda = setInterval(() => {
        // console.log('hcia setInterval')
        // this.requestData()

    }, 1000)


    componentWillUnmount() {
        clearInterval(this.sda);
        document.removeEventListener("keydown", this.handleKeyPressOOP, false);
    }

    componentDidMount() {


        document.addEventListener("keydown", this.handleKeyPressOOP, false);

        this.requestData()
        this.modalOPDayColumns = [
            {
                align: 'center',
                title: '時間',
                dataIndex: '時間',
                key: '時間',

                render: (text, record) => (
                    <span>{this.timestampToTime(record.createDate)}</span>),
            }, {
                align: 'center',
                title: 'IP',
                dataIndex: 'comment',
                key: 'operationDiary_Status',

                render: (text, record) => (
                    <span>{record.ipAddress}</span>),
            }, {
                align: 'center',
                title: '操作人',
                dataIndex: 'comment',
                key: 'operationDiary_Status',

                render: (text, record) => (
                    <span>{record.bkUserName}</span>),
            }, {
                align: 'center',
                title: '操作',
                dataIndex: 'bkUserName',
                key: 'operationDiary_User',

                render: (text, record) => (
                    <span>{record.comment}</span>),
            }]
        this.modalOPDayL2 = [
            {
                title: '操作人',
                dataIndex: 'comment',
                key: 'operationDiary_Status',

                render: (text, record) => (
                    <span>{record.bkUserName}</span>),
            }, {
                title: '操作時間',
                dataIndex: 'bkUserName',
                key: 'operationDiary_User',

                render: (text, record) => (
                    <span>{this.timestampToTime(record.createDate)}</span>),
            }, {
                title: '备注',
                dataIndex: 'comment',
                key: 'operationDiary_Status',

                render: (text, record) => (
                    <span>{record.comment}</span>),
            }]
        this.columns = [
            {
                title: '序号',
                dataIndex: '序号',
                key: '序号',
                align: 'center',
                render: (text, record, index) => (
                    <span>{this.state.currentA * this.state.pgsize + index + 1}</span>
                ),
            },
            {
                title: '开户手机号',
                dataIndex: '开户手机号',
                key: '开户手机号',
                align: 'center',
                render: (text, record) => (
                    <span>{record.mobile}</span>
                ),
            }, {
                title: '姓名',
                dataIndex: '姓名',
                key: '姓名',
                align: 'center',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {
                title: '邮箱',
                dataIndex: '邮箱',
                key: '邮箱',
                align: 'center',
                render: (text, record) => (<span>{record.email}</span>),
            },
            {
                title: '交易组',
                dataIndex: '交易组',
                key: '交易组',
                align: 'center',
                render: (text, record) => (<span>{record.accountType}</span>),
            }, {
                title: '交易账号',
                dataIndex: '交易账号',
                key: '交易账号',
                align: 'center',
                render: (text, record) => (
                    <span>{record.accountNo}</span>),
            }, {
                width: 150,
                align: 'center',
                title: '最近登录时间',
                dataIndex: '最近登录时间',
                key: '最近登录时间',
                render: (text, record) => (<span>{record.date}</span>),
            }, {
                title: '激活绑定',
                dataIndex: '激活绑定',
                key: '激活绑定',
                align: 'center',
                render: (text, record) => (
                    <div>
                        <span>{!record.belongUserId ? '-' : record.mobile}</span>
                        {/*<Button style={{marginLeft: 15}}>解绑</Button>*/}


                        <Button style={{display: !record.belongUserId ? 'none' : '', marginLeft: 15}}
                                onClick={() => this.requestUnbindAccount(record)}>解绑</Button>


                        <span style={{display: record.belongUserId ? 'none' : '', marginLeft: 15}}>未激活</span>
                    </div>
                ),
            },
            {
                title: '查看',
                dataIndex: '查看',
                key: '查看',
                align: 'center',
                render: (text, record) => (
                    <div>
                        <Button onClick={() => this.justSeenote(record)}>备注</Button>
                        <Button onClick={() => this.goToUserAccountInfo(record)}>開戶</Button>
                        <Button onClick={() => this.goToUserInfo(record.belongUserId)}>行為</Button>
                    </div>
                )
            }, {
                title: '业务操作',
                dataIndex: '业务操作',
                key: '业务操作',
                align: 'center',
                render: (text, record) => (
                    <div>

                        <Popconfirm title={record.accountStatus === 1 ? '确认凍結' : '确认解冻'}
                                    onConfirm={() => this.forzenAccount(record)} okText="Yes"
                                    cancelText="No">
                            <Button>{record.accountStatus === 1 ? '凍結' : record.accountStatus === 2 ? '禁止登陆:解冻'
                                : record.accountStatus === 3 ? '解冻' : '-'}</Button>
                        </Popconfirm>
                        <Button onClick={() => this.resetSeret(record)}>重置密码</Button>
                    </div>
                ),
            }, {
                //账户状态：1:正常（可冻结） 2:禁止登陆（可解冻） 3:禁止交易（可解冻）
                title: '其他',
                key: '其他',
                dataIndex: '其他',
                align: 'center',
                render: (text, record) => (
                    <div>
                        <Button onClick={() => this.showModalNote(record)}>添加备注</Button>
                        <Button onClick={() => this.showModalOPDAY(record)}>操作日誌</Button>
                    </div>
                ),
            }];
    }

    render() {
        return (
            <div>
                {/*<div>otherComment query :{JSON.stringify(this.state.otherComment)}</div>*/}

                {/*<KeyOp mCount={this.state.mCount}*/}

                <div className={classNames('switcher dark-white', {active: this.state.switcherOn})}>
                    <span className="sw-btn dark-white" onClick={this._switcherOn}>
                     <Icon type="setting" className="text-dark"/>
                    </span>
                    <div style={{width: 270}}>
                        <Card
                            title="當前表搜索"
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
                                    self.requestData()
                                })
                            }}>清除條件</Button>}>
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
                            }} style={{marginBottom: 10}} placeholder="账户"/>
                            <RangePicker
                                showToday
                                style={{width: '100%'}}
                                showTime={{format: 'YYYY-MM-DD HH:mm:ss'}}
                                format="YYYY-MM-DD HH:mm:ss fff"
                                placeholder={['開始時間', '結束時間']}
                                onChange={(value, dateString) => {
                                    var selectTimeStart = value[0].unix() + '000'
                                    var selectTimeEnd = value[1].unix() + '000'
                                    this.setState({
                                        filterTimeFalue: value,
                                        selectTimeStart: selectTimeStart,
                                        selectTimeEnd: selectTimeEnd,

                                    });
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

                            <Button onClick={() => this.requestData()} style={{marginTop: 15}} type="primary"
                                    icon="search">Search</Button>

                        </Card>
                    </div>
                </div>
                <h2 style={{marginTop: 15}}>
                    用戶總表
                </h2>
                <BreadcrumbCustom first="用戶管理" second="用戶總表"/>
                <Card
                    bodyStyle={{padding: 0, margin: 0}}
                    title="用戶總表">
                    <Table
                        rowKey="id"
                        bordered
                        scroll={{x: 1800}}
                        columns={this.columns}
                        dataSource={this.state.bklistA}
                        loading={this.state.loading}
                        pagination={{ // 分页
                            total: this.state.totalpageA * this.state.pgsize,
                            pageSize: this.state.pgsize,
                            onChange: this.changePageA,
                        }}
                    />
                </Card>
                <Modal
                    // width={'100%'}
                    title="添加备注"
                    visible={this.state.NoteModalVisible2}
                    onOk={this.handleAddComment}
                    onCancel={this.handleCancel}
                    okText="提交"
                    cancelText="取消">
                    <TextArea rows={4}
                              value={this.state.theComment}
                              onChange={(e) => {
                                  let comment = e.target.value;
                                  this.setState({
                                      theComment: comment
                                  });
                              }}
                              placeholder="在这里填写回访次数以及备注信息"/>
                    <Table
                        style={{marginTop: 15}}
                        bordered
                        rowKey="id"
                        columns={this.modalOPDayL2}
                        dataSource={this.state.operationDiaryHistory}
                    />
                </Modal>
                <Modal
                    // width={'100%'}
                    title="查看操作日志"
                    visible={this.state.modal2Visible1}
                    onOk={this.handleNOteOPOk}
                    onCancel={this.handleCancel}
                    okText="確認"
                    cancelText="取消"
                >
                    <Table rowKey="id"
                           columns={this.modalOPDayColumns}
                           dataSource={this.state.operationDiaryHistory}
                    />
                </Modal>


                <Modal
                    bodyStyle={{padding: 0, margin: 15}}
                    title="重置交易密码"
                    visible={this.state.resetSeretModal5}
                    onOk={() => {
                        var self = this
                        if (this.state.otherComment) {
                            this.state.checkedValues.push('其他:' + this.state.otherComment)
                        }
                        if (!this.state.nowRECODE.belongUserId) {
                            message.error('dev log belongUserId :' + this.state.nowRECODE.belongUserId)
                            return
                        }
                        window.Axios.post('star/updateStarLiveAccount', {
                            "id": this.state.nowRECODE.starAccountId,
                            "accountPassword": this.state.accountPassword,
                            // "belongUserId": this.state.nowRECODE.belongUserId,
                            "content": this.state.checkedValues.toString(),
                        }).then(() => {
                            message.success('操作成功')
                            self.setState({
                                resetSeretModal5: false,
                                otherComment: '',
                                accountPassword: ''
                            })
                            this.state.checkedValues.length = 0
                            self.requestData()
                        })
                    }}
                    okType={((this.state.mStockRecordStatus == 1) && this.state.mStockRecordBEn) ? 'primary' : 'dashed'}
                    onCancel={(e) => {
                        this.setState({
                            resetSeretModal5: false,
                        });
                    }}
                >

                    <Card title={'请确认客户信息：'} bordered={true}>

                        <Checkbox.Group style={{width: '100%'}} value={this.state.checkedValues}
                                        onChange={(checkedValues) => {

                                            this.setState({
                                                checkedValues: checkedValues,
                                                otherCommentChecks: checkedValues.toString(),
                                            });

                                        }}>

                            <div style={{display: 'flex', minHeight: 40, align: 'center'}}>
                                <Checkbox value={"手机号"}>手机号</Checkbox>
                                <Checkbox value={"邮箱"}>邮箱</Checkbox>
                                <Checkbox value={"账号"}>账号</Checkbox>
                                <Checkbox value={"地址"}>地址</Checkbox>
                                <Checkbox value={"身份证号"}>身份证号</Checkbox>
                            </div>
                            <div style={{display: 'flex', minHeight: 40, align: 'center'}}>
                                <Checkbox value={"身份证正本"}>身份证正本</Checkbox>
                            </div>

                        </Checkbox.Group>
                        <div style={{display: 'flex', minHeight: 40, align: 'center'}}>
                            <span style={{minWidth: 80}}>其他：</span>
                            <Input value={this.state.otherComment}
                                   onChange={(e) => {
                                       this.setState({
                                           otherComment: e.target.value,
                                       });
                                   }} style={{marginBottom: 10}} placeholder=""/>
                        </div>
                        <div style={{display: 'flex', minHeight: 40, align: 'center'}}>
                            <span style={{minWidth: 80}}>交易密码：</span>
                            <Input value={this.state.accountPassword}
                                   onChange={(e) => {
                                       this.setState({
                                           accountPassword: e.target.value,
                                       });
                                   }} style={{marginBottom: 10}} placeholder=""/>
                        </div>
                    </Card>

                    <Table
                        style={{marginTop: 15}}
                        rowKey="id"
                        columns={this.modalOPDayColumns}
                        dataSource={this.state.operationDiaryHistory}
                    />
                </Modal>




                <Modal
                    bodyStyle={{padding: 0, margin: 15}}
                    title="解绑手机号"
                    visible={this.state.showUnBindPhoneModal4}
                    onOk={() => {
                        var self = this
                        if (this.state.otherComment) {
                            this.state.checkedValues.push('其他:' + this.state.otherComment)
                        }
                        if (!this.state.nowRECODE.belongUserId) {
                            message.error('dev log belongUserId :' + this.state.nowRECODE.belongUserId)
                            return
                        }
                        window.Axios.post('star/unBindStarLiveAccount', {
                            "id": this.state.nowRECODE.starAccountId,
                            "belongUserId": this.state.nowRECODE.belongUserId,
                            "content": this.state.checkedValues.toString(),
                        }).then(() => {
                            message.success('操作成功')
                            self.setState({
                                showUnBindPhoneModal4: false,
                                otherComment: ''
                            })
                            this.state.checkedValues.length = 0
                            self.requestData()
                        })
                    }}
                    okType={((this.state.mStockRecordStatus == 1) && this.state.mStockRecordBEn) ? 'primary' : 'dashed'}
                    onCancel={(e) => {
                        this.setState({
                            showUnBindPhoneModal4: false,
                        });
                    }}
                >

                    <Card title={'请确认客户信息：'} bordered={true}>

                        <Checkbox.Group style={{width: '100%'}} value={this.state.checkedValues}
                                        onChange={(checkedValues) => {

                                            this.setState({
                                                checkedValues: checkedValues,
                                                otherCommentChecks: checkedValues.toString(),
                                            });

                                        }}>

                            <div style={{display: 'flex', minHeight: 40, align: 'center'}}>
                                <Checkbox value={"手机号"}>手机号</Checkbox>
                                <Checkbox value={"邮箱"}>邮箱</Checkbox>
                                <Checkbox value={"账号"}>账号</Checkbox>
                                <Checkbox value={"地址"}>地址</Checkbox>
                                <Checkbox value={"身份证号"}>身份证号</Checkbox>
                            </div>
                            <div style={{display: 'flex', minHeight: 40, align: 'center'}}>
                                <Checkbox value={"身份证正本"}>身份证正本</Checkbox>
                            </div>

                        </Checkbox.Group>
                        <div style={{display: 'flex', minHeight: 40, align: 'center'}}>
                            <span style={{minWidth: 60}}>其他：</span>
                            <Input value={this.state.otherComment}
                                   onChange={(e) => {
                                       this.setState({
                                           otherComment: e.target.value,
                                       });
                                   }} style={{marginBottom: 10}} placeholder=""/>
                        </div>
                    </Card>

                    <Table
                        style={{marginTop: 15}}
                        rowKey="id"
                        columns={this.modalOPDayColumns}
                        dataSource={this.state.operationDiaryHistory}
                    />
                </Modal>


            </div>

        )
    }

    showModalOPDAY = (record) => {

        var self = this

        self.setState({
            opDayRecord: record,
        }, () => {
            window.Axios.post('auth/getUserCommentList', {
                'belongUserId': this.state.opDayRecord.belongUserId,
            }).then(function (response) {
                self.setState({operationDiaryHistory: response.data.data.list});
            })
            self.setState({
                modal2Visible1: true,
                NoteModalVisible2: false,
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
    showModalNote = (record) => {
        let belongUserId = record.belongUserId
        var self = this

        self.setState({
            opDayRecord: record,
            theComment: ''
        }, () => {
            window.Axios.post('auth/getUserCommentList', {
                'belongUserId': this.state.opDayRecord.belongUserId,
            }).then(function (response) {
                self.setState({operationDiaryHistory: response.data.data.list});
            })
            self.setState({
                theBelongUserId: belongUserId,
                NoteModalVisible2: true,
                modal2Visible1: false,
            });
        });


    }
    handleAddComment = (e) => {
        let self = this;
        window.Axios.post('auth/addUserComment', {
            content: self.state.theComment,
            belongUserId: self.state.theBelongUserId,
        }).then(() => {
            message.success('操作成功')
        })

        this.setState({
            NoteModalVisible2: false,
            modal2Visible1: false,
        });
    }
    handleNOteOPOk = () => {
        this.setState({
            theComment: '',
            NoteModalVisible2: false,
            modal2Visible1: false,
        });
    }


    handleCancel = (e) => {
        this.setState({
            NoteModalVisible2: false,
            modal2Visible1: false,
        });
    }
    requestUnbindAccount = (record) => {
        let belongUserId = record.belongUserId

        var self = this


        window.Axios.post('auth/getUserCommentList', {
            'belongUserId': belongUserId,
        }).then(function (response) {
            self.setState({operationDiaryHistory: response.data.data.list});
        })


        console.log('hcia record', record)

        this.state.checkedValues.length = 0
        this.setState({
            checkedValues: [],
            otherComment: '',
            otherCommentChecks: '',
            nowRECODE: record,
            showUnBindPhoneModal4: true
        })


    }


    requestData = () => {
        let self = this
        window.Axios.post('ixuser/getUserList', {
            pageNo: this.state.currentA,
            'listType': 4,
            'pageSize': this.state.pgsize,
            email: this.state.selectMail,
            mobile: this.state.selectPhoneF,
            nationalId: this.state.selectID,
            starClientAccount: this.state.starClientAccount,
            startTime: this.state.selectTimeStart,
            endTime: this.state.selectTimeEnd,
        }).then((response) => {
            self.setState({
                totalpageA: response.data.data.totalPage,
                bklistA: response.data.data.list,
                loadingA: false

            });
        })

    }


    changePageA = (page) => {
        this.setState({
            currentA: page,
        }, () => {
            this.requestData()
        })
    }


    _switcherOn = () => {
        this.setState({
            switcherOn: !this.state.switcherOn
        })
    };


    onChangeMail = (e) => {
        this.setState({
            selectMail: e.target.value,
        });
    }

    onChangePhone = (e) => {
        this.setState({
            selectMail: e.target.value,
        });
    }
    searchSelect = () => {
        this.requestData()
    }
    goToUserInfo = (belongUserId) => {
        this.props.history.push('/app/customer/CustomerUserInfo' + belongUserId)

    }
    goToUserAccountInfo = (record) => {
        console.log('hcia record', record)

        var gogo = 'detail'
        this.props.history.push('/app/pass/passopenrs/' + gogo + record.liveAccountId)
        console.log('goToUserAccountInfo')

        // route: '/app/pass/passopenrs/detail:id',

    }

    forzenAccount = (record) => {

        var self = this


        if (record.accountStatus === 1) {
            window.Axios.post('star/blockStarLiveAccount', {
                "id": record.starAccountId,
                "belongUserId": record.belongUserId,

            }).then(() => {
                message.success(record.accountNo + '帳號凍結成功')
                self.requestData()
            })
        } else {
            window.Axios.post('star/unBlockStarLiveAccount', {
                "id": record.starAccountId,
                "belongUserId": record.belongUserId,

            }).then(() => {
                message.success(record.accountNo + '操作成功')
                self.requestData()
            })
        }


    }
    resetSeret = (record) => {

        // resetSeretModal5
        console.log('hcia record', record)

        let belongUserId = record.belongUserId

        var self = this


        window.Axios.post('auth/getUserCommentList', {
            'belongUserId': belongUserId,
        }).then(function (response) {
            self.setState({operationDiaryHistory: response.data.data.list});
        })


        console.log('hcia record', record)

        this.state.checkedValues.length = 0
        this.setState({
            checkedValues: [],
            otherComment: '',
            otherCommentChecks: '',
            nowRECODE: record,
            resetSeretModal5: true
        })
    }


    justSeenote = (record) => {

        let belongUserId = record.belongUserId
        var self = this

        self.setState({
            opDayRecord: record,
            theComment: ''
        }, () => {
            window.Axios.post('auth/getUserCommentList', {
                'belongUserId': this.state.opDayRecord.belongUserId,
            }).then(function (response) {
                self.setState({operationDiaryHistory: response.data.data.list});
            })
            self.setState({
                theBelongUserId: belongUserId,
                NoteModalVisible2: false,
                modal2Visible1: true,
            });
        });

    }
}

export default PopupContainer(CustomerSummary);
