import React, {Component} from 'react';
import {DatePicker, Input, Modal, Button, Table, message, Card, Icon, Popconfirm, Checkbox} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
// import Example from '@/components/ui/Example';
import KeyOp from '../ui/KeyOp';

import classNames from "classnames";

const {RangePicker} = DatePicker;
const {TextArea} = Input;

export default class CustomerSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bklistA: [],
            operationDiaryHistory: [],
            checkedValues: [],
            currentA: 0,
            otherComment: '',
            mCount: 0,
            otherCommentChecks: '',
            totalpageA: 0,
            switcherOn: false,
            showUnBindPhoneModal: false,
            pgsize: 20,
            opDayRecord: {},
            visible: false,
            modal2Visible: false,
        };
    }

    handleKeyPress = (event) => {


        if (event.metaKey || event.ctrlKey) {
            if (event.key === 'o') {
                this.setState({
                    switcherOn: !this.state.switcherOn
                })
            }
        }

    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, false);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress, false);

        this.requestData()
        this.modalOPDayColumns = [
            {
                title: '時間',
                dataIndex: 'createDate',
                key: 'operationDiary_Date',

                render: (text, record) => (
                    <Button>{this.timestampToTime(record.createDate)}</Button>),
            }, {
                title: 'IP',
                dataIndex: 'comment',
                key: 'operationDiary_Status',

                render: (text, record) => (
                    <Button>{record.ip}</Button>),
            }, {
                title: '操作人',
                dataIndex: 'comment',
                key: 'operationDiary_Status',

                render: (text, record) => (
                    <Button>{record.user}</Button>),
            }, {
                title: '操作',
                dataIndex: 'bkUserName',
                key: 'operationDiary_User',

                render: (text, record) => (
                    <Button>{record.comment}</Button>),
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
                title: '手机号',
                dataIndex: '手机号',
                key: '手机号',
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
                    <span>激活绑定</span>),
            },
            {
                title: '查看',
                dataIndex: '查看',
                key: '查看',
                align: 'center',
                render: (text, record) => (
                    <div>
                        <Button className="ant-dropdown-link" onClick={() => this.goToUserAccountInfo()}>备注</Button>
                        <Button className="ant-dropdown-link"
                                onClick={() => this.goToUserAccountInfo(record)}>開戶</Button>
                        <Button className="ant-dropdown-link"
                                onClick={() => this.goToUserInfo(record.belongUserId)}>行為</Button>
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

                            {/*<Button className="ant-dropdown-link">凍結</Button>*/}
                            <Button
                                className="ant-dropdown-link">{record.accountStatus === 1 ? '凍結' : record.accountStatus === 2 ? '禁止登陆:解冻'
                                : record.accountStatus === 3 ? '解冻' : '-'}</Button>

                        </Popconfirm>

                        <Button className="ant-dropdown-link"
                                onClick={() => this.requestUnbindAccount(record)}>解绑</Button>
                        <Button className="ant-dropdown-link" onClick={() => this.forzenAccount(record)}>重置密码</Button>
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
                        {/* <span className="ant-divider" />
						<Button className="ant-dropdown-link" onClick={() => this.handleremove(record)}>移除</Button> */}
                        <Button className="ant-dropdown-link" onClick={() => this.showModal(record)}>添加備註</Button>
                        <Button className="ant-dropdown-link" onClick={() => this.showModal2(record)}>操作日誌</Button>

                    </div>
                ),
            }];
    }


    render() {


        return (

            <div>

                {/*<KeyOp mCount={this.state.mCount}*/}
                {/*transferMsg={(mCount) => {*/}
                {/*this.setState({*/}
                {/*mCount*/}
                {/*});*/}
                {/*}}/>*/}
                {/*<div>mCount :{this.state.mCount}</div>*/}
                {/*<div>otherComment :{this.state.otherComment}</div>*/}
                {/*<div>otherComment :{this.state.otherCommentChecks}</div>*/}
                {/*<div>nowRECODE :{JSON.stringify(this.state.nowRECODE.liveAccountId)}</div>*/}
                {/*<div>nowRECODE :{JSON.stringify(this.state.nowRECODE)}</div>*/}


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
                            }}
                            >清除條件</Button>}
                        >
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

                                    console.log('hcia selectTimeStart', selectTimeStart)
                                    console.log('hcia selectTimeEnd', selectTimeEnd)


                                    this.setState({
                                        filterTimeFalue: value,
                                        selectTimeStart: selectTimeStart,
                                        selectTimeEnd: selectTimeEnd,

                                    });
                                }}
                                value={this.state.filterTimeFalue}
                                onOk={(value) => {
                                    console.log('hcia', 'onOk: ', value);


                                    var selectTimeStart = value[0].unix() + '000'
                                    var selectTimeEnd = value[1].unix() + '000'

                                    console.log('hcia selectTimeStart', selectTimeStart)
                                    console.log('hcia selectTimeEnd', selectTimeEnd)


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
                    title="添加備註"
                    visible={this.state.visible}
                    onOk={this.handleAddComment}
                    onCancel={this.handleCancel}
                    okText="確認"
                    cancelText="取消">
                    <Input onChange={this.addComment} placeholder="填写回访次数以及结果"/>

                </Modal>
                <Modal
                    width={'100%'}
                    title="操作日誌"
                    visible={this.state.modal2Visible}
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

                    title="解绑手机号"
                    visible={this.state.showUnBindPhoneModal}
                    onOk={() => {


                        var self = this

                        if (this.state.otherComment) {
                            this.state.checkedValues.push('其他:' + this.state.otherComment)
                        }

                        window.Axios.post('star/unBindStarLiveAccount', {
                            "starClientAccount": this.state.nowRECODE.liveAccountId,
                            "belongUserId": this.state.nowRECODE.belongUserId,
                            "content": this.state.checkedValues.toString(),
                        }).then((response) => {
                            message.success('操作成功')

                            self.setState({
                                showUnBindPhoneModal: false

                            })
                        })


                    }}
                    okType={((this.state.mStockRecordStatus == 1) && this.state.mStockRecordBEn) ? 'primary' : 'dashed'}
                    onCancel={(e) => {
                        this.setState({
                            showUnBindPhoneModal: false,
                        });
                    }}
                >

                    <Card title={'请确认客户信息：'} bordered={true}>
                        {/*record.status*/}

                        <Checkbox.Group style={{width: '100%'}} onChange={(checkedValues) => {

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
                </Modal>


            </div>

        )
    }

    showModal2 = (record) => {

        var self = this


        self.setState({
            opDayRecord: record
        }, () => {
            window.Axios.post('auth/getUserCommentList', {
                'belongUserId': this.state.opDayRecord.belongUserId,
            }).then(function (response) {
                self.setState({operationDiaryHistory: response.data.data.list});
            }, () => {
                self.setState({
                    modal2Visible: true,
                    visible: false,
                });
            })
            self.setState({
                modal2Visible: true,
                visible: false,
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
    showModal = (record) => {
        let belongUserId = record.belongUserId
        this.setState({
            theBelongUserId: belongUserId,
            visible: true,
            modal2Visible: false,
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
            visible: false,
            modal2Visible: false,
        });
    }
    handleNOteOPOk = () => {
        this.setState({
            visible: false,
            modal2Visible: false,
        });
    }


    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            modal2Visible: false,
        });
    }
    requestUnbindAccount = (record) => {
        this.state.checkedValues.length = 0
        this.setState({
            checkedValues: [],
            otherComment: '',
            otherCommentChecks: '',
            nowRECODE: record,
            showUnBindPhoneModal: true
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

        var gogo = 'user'
        this.props.history.push('/app/pass/passopen/' + gogo + record.liveAccountId)
        console.log('goToUserAccountInfo')
    }
    addComment = (e) => {
        let comment = e.target.value;
        this.setState({
            theComment: comment
        });
    }
    forzenAccount = (record) => {

        var self = this


        if (record.accountStatus === 1) {
            window.Axios.post('star/blockStarLiveAccount', {
                "starClientAccount": record.liveAccountId,
                "belongUserId": record.belongUserId,

            }).then(() => {
                message.success(record.accountNo + '帳號凍結成功')
                self.requestData()
            })
        } else {
            window.Axios.post('star/unblockStarLiveAccount', {
                "starClientAccount": record.liveAccountId,
                "belongUserId": record.belongUserId,

            }).then(() => {
                message.success(record.accountNo + '操作成功')
                self.requestData()
            })
        }


    }
}

