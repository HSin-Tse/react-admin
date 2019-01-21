import React, {Component} from 'react';
import {DatePicker, Input, Modal, Button, Table, Tabs, message, Card, Icon, Popconfirm} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {ThemePicker} from '@/components/widget';
import classNames from "classnames";
// import yyx from '../utility/Utility';

const TabPane = Tabs.TabPane;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

export default class PotentialUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            bklistA: [],
            bklistB: [],
            bklistC: [],
            currentA: 0,
            currentB: 0,
            currentC: 0,
            currentComment: 0,
            totalpageA: 0,
            totalpageB: 0,
            totalpageC: 0,
            totalpageComments: 0,
            nowKey: '1',
            pgsize: 20,
            loadingA: false,
            loadingB: false,
            loadingC: false,
            loadingComment: false,
            selectMail: "",
            selectPhone: "",
            refID: "",
            selectID: "",
            selectTimeStart: "",
            selectTimeEnd: "",
            modal2OPDAYVisible: false,
            modal3NoteVisible: false,
            visible: false,
            operationDiaryHistory: [],
            operationLogHistory: [],
        };
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

    componentDidMount() {

        this.columnsLog = [
            {
                title: '时间',
                dataIndex: 'createDate',
                align: 'center',
                key: 'operationDiary_Date',
                render: (text, record) => (
                    <span>{
                        this.timestampToTime(record.date)
                    }</span>),
            }, {
                title: 'IP',
                dataIndex: 'IP',
                align: 'center',
                key: 'IP',
                render: (text, record) => (
                    <span>{record.userIP}</span>),
            }, {
                title: '操作人',
                align: 'center',
                dataIndex: 'bkUserName',
                key: 'operationDiary_User',
                render: (text, record) => (
                    <span>{record.loginName}</span>),
            }, {
                title: '操作',
                align: 'center',
                dataIndex: 'comment',
                key: 'operationDiary_Status',
                render: (text, record) => (
                    <span>{record.comment}</span>),
            }]
        window.Axios.post('back/addLogHistory', {
            'moduleLog': '用户管理',
            'pageLog': 'Leads管理',
            'commentLog': '查看了Leads管理',
            'typeLog': 2,
        })


        document.addEventListener("keydown", this.handleKeyPress, false);

        this.requestPageA()
        this.requestPageB()
        this.requestPageC()
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, false);
    }


    showOPDAyModal2 = (belongUserId) => {



        var self = this
        this.setState({
            currentComment: 0,
            refID: belongUserId
        }, () => {
            this.requestUserLogList(belongUserId)
            self.setState({
                modal2OPDAYVisible: true,


            })
        });

        // this.requestUserCommentList(belongUserId)
        // this.setState({
        //     modal2OPDAYVisible: true,
        //     visible: false,
        // });
    };
    shownoteModal = (belongUserId) => {
        this.setState({
            currentComment: 0,
            modal3NoteVisible: true,
            visible: false,
        },()=>{
            this.requestUserCommentList(belongUserId)

        });
    };

    showAddbAckModal = (record) => {


        var logRouter = ''

        if (this.state.nowKey === '1') {
            logRouter='/back/addLogPotentialUser'
        }
        if (this.state.nowKey === '2') {
            logRouter='/back/addLogDemoUser'

        }
        if (this.state.nowKey === '3') {
            logRouter='/back/addLogIntentUser'
        }


        window.Axios.post(logRouter, {
            referKey: record.belongUserId,
            commentLog: '添加回访',
            // mobile: this.state.phoneCn,
            // content: this.state.changeNoteV,
        })

        this.requestUserCommentList(record.belongUserId)
        this.setState({
            theBelongUserId: record.belongUserId,
            visible: true,
            modal2OPDAYVisible: false,
        });
    };

    modalColums = () => {
        return [

            {
                title: '操作人',
                width: 130,
                dataIndex: 'bkUserName',
                key: 'operationDiary_User',
                render: (text, record) => (
                    <span>{record.bkUserName}</span>),
            },
            {
                title: '操作时间',
                dataIndex: 'createDate',
                key: 'operationDiary_Date',
                render: (text, record) => (
                    <span>{this.timestampToTime(record.createDate)}</span>),
            }, {
                title: '备注',
                dataIndex: 'comment',
                key: 'operationDiary_Status',
                render: (text, record) => (
                    <span>{record.comment}</span>),
            }]
    }
    pageAColumns = () => {
        return [
            {
                title: '序号',
                dataIndex: '序号',
                key: '序号',
                align: 'center',
                render: (text, record, index) => (
                    <span>{this.state.currentA * this.state.pgsize + index + 1}</span>
                ),
            }, {
                title: '手机号',
                dataIndex: '手机号',
                key: '手机号',
                align: 'center',
                render: (text, record) => (

                    <span>{record.mobile}</span>

                ),
            }, {
                title: 'APP版本',
                dataIndex: 'APP版本',
                key: 'APP版本',
                align: 'center',
                render: (text, record) => (
                    <span>{record.versionInfo}</span>),
            }, {
                title: '手机型号',
                dataIndex: '手机型号',
                key: '手机型号',
                align: 'center',
                render: (text, record) => (<span>{record.clientInfo}</span>),
            }, {
                title: '操作系统型号',
                dataIndex: '操作系统型号',
                key: '操作系统型号',
                align: 'center',
                render: (text, record) => (<span>{record.systemInfo}</span>),
            }, {
                title: '注册时间',
                dataIndex: '注册时间',
                key: '注册时间',
                align: 'center',
                width: 150,
                render: (text, record) => (<span>{record.date}</span>),
            }, {
                title: '下载平台',
                dataIndex: '下载平台',
                key: '下载平台',
                align: 'center',
                render: (text, record) => (
                    <span>{record.channelInfo}</span>),
            }

            , {
                title: '地理位置',
                dataIndex: '地理位置',
                key: '地理位置',
                width: 150,

                align: 'center',
                render: (text, record) => (
                    <span>{record.location}</span>),
            }, {
                title: 'IP',
                dataIndex: 'IP',
                key: 'IP',
                align: 'center',
                render: (text, record) => (
                    <span>{record.lastLoginIP}</span>),
            }, {
                title: '回访状态',
                dataIndex: '回访状态',
                key: '回访状态',
                align: 'center',
                render: (text, record) => (<span>{record.feebackStatus}</span>),

            }, {
                title: '操作人',
                dataIndex: '操作人',
                key: '操作人',
                align: 'center',
                render: (text, record) => (
                    <span>{record.operator}</span>),
            }, {
                title: '查看',
                dataIndex: '查看',
                key: '查看',
                align: 'center',
                render: (text, record) => (
                    <div>
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.shownoteModal(record.belongUserId)}>备注</Button>
                    </div>
                )
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (

                    <div>
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.showAddbAckModal(record)}>添加回访</Button>
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.showOPDAyModal2(record.belongUserId)}>日志</Button>
                    </div>
                ),
            }];
    }
    pageBColumns = () => {
        return this.columns = [
            {
                title: '序号',
                dataIndex: '序号',
                key: '序号',
                align: 'center',
                render: (text, record, index) => (
                    <span>{this.state.currentB * this.state.pgsize + index + 1}</span>
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
                title: '模拟账号',
                dataIndex: '模拟账号',
                align: 'center',

                key: '模拟账号',
                render: (text, record) => (
                    <span>{record.accountNo}</span>),
            }, {
                title: '绑定时间',
                dataIndex: '绑定时间',
                width: 150,
                align: 'center',

                key: '绑定时间',
                render: (text, record) => (<span>{record.date}</span>),
            }, {
                title: '剩余天数',
                dataIndex: '剩余天数',
                key: '剩余天数',
                align: 'center',

                render: (text, record) => (<span>{record.remainDay}</span>),
            }, {
                title: '模拟账户状态',
                align: 'center',

                dataIndex: '模拟账户状态',
                key: '模拟账户状态',
                render: (text, record) => (<span>{record.expireStatus}</span>),
            }, {
                title: '延期次数',
                align: 'center',

                dataIndex: '延期次数',
                key: '延期次数',
                render: (text, record) => (<span>{record.delayNum}</span>),
            }, {
                title: '回访状态',
                dataIndex: '回访状态',
                align: 'center',

                key: '回访状态',
                render: (text, record) => (<span>{record.feebackStatus}</span>),
            }, {
                title: '活跃程度',
                dataIndex: '活跃程度',
                key: '活跃程度',
                align: 'center',

                render: (text, record) => (<span>{record.activeFlag}</span>),
            }, {
                title: '操作人',
                align: 'center',

                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (<span>{record.operator}</span>),
            },
            {
                title: '查看',
                dataIndex: '查看',
                key: '查看',
                align: 'center',
                render: (text, record) => (
                    <div>
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.shownoteModal(record.belongUserId)}>备注</Button>
                    </div>
                )
            }
            , {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <div>
                        <Popconfirm title="延期申请？" onConfirm={() => this.handleDelay(record)} okText="Yes"
                                    cancelText="No">
                            <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}>延期</Button>

                        </Popconfirm>

                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.showAddbAckModal(record)}>添加回访</Button>
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.showOPDAyModal2(record.belongUserId)}>操作日誌</Button>
                    </div>
                ),
            }];
    }
    pageCColumns = () => {
        return this.columns = [
            {
                title: '序号',
                dataIndex: '序号',
                key: '序号',
                align: 'center',
                render: (text, record, index) => (
                    <span>{this.state.currentC * this.state.pgsize + index + 1}</span>
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
                dataIndex: 'name',
                key: 'name',

                align: 'center',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {
                title: '当前账户',
                dataIndex: '当前账户',
                key: '当前账户',

                align: 'center',
                render: (text, record) => (<span>{record.accountType}</span>),
            }, {
                title: '模拟帐号',
                dataIndex: '模拟帐号',
                key: '模拟帐号',

                align: 'center',
                render: (text, record) => (<span>{record.accountNo}</span>),
            }, {
                title: '录入信息时间',
                dataIndex: '录入信息时间',
                width: 150,

                key: '录入信息时间',
                align: 'center',
                render: (text, record) => (<span>{record.date}</span>),
            }, {
                title: '活跃度',
                dataIndex: '活跃度',
                key: '活跃度',

                align: 'center',
                render: (text, record) => (<span>{record.activeFlag}</span>),
            }, {
                title: '回访状态',
                dataIndex: '回访状态',
                key: '回访状态',

                align: 'center',
                render: (text, record) => (<span>{record.feebackStatus}</span>),
            }, {
                title: '操作人',
                dataIndex: '操作人',
                key: '操作人',
                align: 'center',
                render: (text, record) => (
                    <span>{record.operator}</span>),
            }, {
                title: '查看',
                dataIndex: '查看',
                key: '查看',
                align: 'center',
                render: (text, record) => (
                    <div>
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.seeUSer(record)}>用户信息 </Button>
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.shownoteModal(record.belongUserId)}>备注</Button>
                    </div>
                )
            }, {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <div>
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.showAddbAckModal(record)}>添加回访</Button>
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.showOPDAyModal2(record.belongUserId)}>操作日誌</Button>
                    </div>
                ),
            }];
    }
    handleKeyPress = (event) => {
        if (event.metaKey || event.ctrlKey) {
            if (event.key === 'o' || event.key === 'ㄟ') {
                this.setState({
                    switcherOn: !this.state.switcherOn
                })
            }
        }
    }


    handleDelay = (record) => {

        var logRouter = ''

        if (this.state.nowKey === '1') {
            logRouter='back/addLogPotentialUser'
        }
        if (this.state.nowKey === '2') {
            logRouter='back/addLogDemoUser'

        }
        if (this.state.nowKey === '3') {
            logRouter='back/addLogIntentUser'
        }
        // console.log('hcia record.feebackStatus' , record.feebackStatus)
        window.Axios.post(logRouter, {
            referKey: record.belongUserId,
            commentLog: '延期申请',
            // mobile: this.state.phoneCn,
            // content: this.state.changeNoteV,
        })


        if (record.expireStatus == '未过期') {

            message.info('未过期')
            return
        }

        let belongUserId = record.belongUserId
        let accountNo = record.accountNo
        let self = this;


        window.Axios.post('back/addLogHistory', {
            'moduleLog': '用户管理',
            'pageLog': 'Leads管理',
            'commentLog': '延期申请',
            'typeLog': 3,
        });

        window.Axios.post('ixuser/delayDemoAccount', {
            "accountNo": accountNo,
            "belongUserId": belongUserId,
        }).then((response) => {
            message.success('操作成功')
            self.reflesh()
        })

    }

    seeUSer = (record) => {

        console.log('hcia record', record)
        window.Axios.post('back/addLogHistory', {
            'moduleLog': '用户管理',
            'pageLog': 'Leads管理',
            'commentLog': '查看用户',
            'typeLog': 3,
        });


        this.props.history.push('/app/pass/passopen/user' + record.leadId)
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            modal2OPDAYVisible: false,
        });
    }
    handleAddComment = (e) => {
        let self = this;

        window.Axios.post('back/addLogHistory', {
            'moduleLog': '用户管理',
            'pageLog': 'Leads管理',
            'commentLog': '添加回访',
            'typeLog': 3,
        });

        window.Axios.post('auth/addUserComment', {
            content: self.state.theComment,
            belongUserId: self.state.theBelongUserId,
        }).then(() => {
            message.success('提交成功')

            self.reflesh()
        });

        this.setState({
            visible: false,
            theComment: '',
            modal2OPDAYVisible: false,
        });
    }

    requestUserLogList = (record) => {
        var self = this;


        var logRouter = ''

        if (this.state.nowKey === '1') {
            logRouter='/back/getLogPotentialUser'
        }
        if (this.state.nowKey === '2') {
            logRouter='/back/getLogDemoUser'

        }
        if (this.state.nowKey === '3') {
            logRouter='/back/getLogIntentUser'
        }

        window.Axios.post(logRouter, {
            referKey: this.state.refID,
            pageNo: this.state.currentComment,
            pageSize: this.state.pgsize,
        }).then(function (response) {
            self.setState({
                totalpageComments: response.data.data.totalPage,
                operationLogHistory: response.data.data.list,
            });
        });


    }


    requestUserCommentList = (record) => {
        var self = this;

        window.Axios.post('back/addLogHistory', {
            'moduleLog': '用户管理',
            'pageLog': 'Leads管理',
            'commentLog': '查看备注',
            'typeLog': 3,
        });

        window.Axios.post('/auth/getUserCommentList', {
            belongUserId: record,
            pageNo: this.state.currentComment,
            pageSize: this.state.pgsize,

        }).then(function (response) {

            self.setState({
                totalpageComments: response.data.data.totalPage,
                operationDiaryHistory: response.data.data.list,
            });
        });
    }

    requestPageA = () => {
        let self = this
        self.setState({
            loadingA: true
        })
        window.Axios.post('ixuser/getUserList', {
            pageNo: this.state.currentA,
            'listType': 1,
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
    requestPageB = () => {

        console.log('hcia requestPageB')
        let self = this

        self.setState({
            loadingB: true
        })
        window.Axios.post('ixuser / getUserList', {
            pageNo: this.state.currentB,
            'pageSize': this.state.pgsize,
            'listType': 2,
            email: this.state.selectMail,
            mobile: this.state.selectPhoneF,
            nationalId: this.state.selectID,
            starClientAccount: this.state.starClientAccount,
            startTime: this.state.selectTimeStart,
            endTime: this.state.selectTimeEnd,

        }).then((response) => {
            console.log('kkk', response.data.data);
            self.setState({
                totalpageB: response.data.data.totalPage,
                bklistB: response.data.data.list,
                loadingB: false
            });


        })
    }
    requestPageC = () => {
        let self = this

        self.setState({
            loadingC: true
        })
        window.Axios.post('ixuser/getUserList', {
            pageNo: this.state.currentC,
            'listType': 3,
            'pageSize': this.state.pgsize,
            email: this.state.selectMail,
            mobile: this.state.selectPhoneF,
            nationalId: this.state.selectID,
            starClientAccount: this.state.starClientAccount,
            startTime: this.state.selectTimeStart,
            endTime: this.state.selectTimeEnd,

        }).then((response) => {
            self.setState({
                totalpageC: response.data.data.totalPage,
                bklistC: response.data.data.list,
                loadingC: false
            });
        })
    }


    changePageA = (page) => {
        this.setState({
            currentA: page - 1,
        }, () => {
            this.requestPageA()
        })
    }
    changePageB = (page) => {
        this.setState({
            currentB: page - 1,
        }, () => {
            this.requestPageB()
        })
    }
    changePageC = (page) => {
        this.setState({
            currentC: page - 1,
        }, () => {
            this.requestPageC()
        })
    }

    changePageLog = (page) => {
        page = page - 1
        this.setState({
            currentComment: page,
        }, () => {
            this.requestUserLogList()
        })
    }

    changePageComment = (page) => {
        page = page - 1
        this.setState({
            currentComment: page,
        }, () => {
            this.requestUserCommentList()
        })
    }

    addComment = (e) => {
        let comment = e.target.value;
        this.setState({
            theComment: comment
        });
    }

    state = {
        switcherOn: true,
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
            selectPhone: e.target.value,
        });
    }
    onChangeID = (e) => {
        this.setState({
            selectID: e.target.value,
        });
    }

    reflesh = () => {


        if (this.state.nowKey === '1') {
            this.requestPageA()//1:Potential 2:simulator 3:intend
        }
        if (this.state.nowKey === '2') {
            this.requestPageB()
        }
        if (this.state.nowKey === '3') {
            this.requestPageC()
        }
    }


    onOk = (value) => {
        var selectTimeStart = value[0].unix() + '000'
        var selectTimeEnd = value[1].unix() + '000'
        this.setState({
            selectTimeStart: selectTimeStart,
            selectTimeEnd: selectTimeEnd,
        });
    }

    render() {


        return (


            <div>
                <div>this.state.currentComment :{JSON.stringify(this.state.currentComment)}</div>

                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
                {/*<div>PotentialUser</div>*/}
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
                                    filterTimeFalue: undefined
                                }, () => {
                                    self.reflesh()
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


                                    console.log('hcia value', value)


                                    if (value.length === 0) {

                                        this.setState({
                                            filterTimeFalue: undefined,
                                            selectTimeStart: undefined,
                                            selectTimeEnd: undefined,

                                        });
                                    } else {
                                        var selectTimeStart = value[0].unix() + '000'
                                        var selectTimeEnd = value[1].unix() + '000'

                                        console.log('hcia selectTimeStart', selectTimeStart)
                                        console.log('hcia selectTimeEnd', selectTimeEnd)


                                        this.setState({
                                            filterTimeFalue: value,
                                            selectTimeStart: selectTimeStart,
                                            selectTimeEnd: selectTimeEnd,

                                        });
                                    }


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

                            <Button onClick={() => this.reflesh()} style={{marginTop: 15}} type="primary"
                                    icon="search">Search</Button>

                        </Card>


                    </div>
                </div>
                <h2 style={{marginTop: 15}}>Leads管理</h2>
                <BreadcrumbCustom first="用户管理" second="Leads管理"/>


                <Tabs
                    onChange={(key) => {

                        this.setState({
                            nowKey: key,
                        })
                    }}
                    type="card">
                    <TabPane tab="潜在用户" key="1">
                        <Card bodyStyle={{padding: 0, margin: 0}}
                              title={'潜在用户信息表'}>
                            <Table rowKey="id"
                                   bordered
                                // rowSelection={rowSelection}
                                   columns={this.pageAColumns()}
                                   dataSource={this.state.bklistA}
                                   scroll={{x: 1500}}
                                   loading={this.state.loadingA}
                                   pagination={{
                                       total: this.state.totalpageA * this.state.pgsize,
                                       pageSize: this.state.pgsize,
                                       onChange: this.changePageA,
                                   }}
                            />
                        </Card>

                    </TabPane>


                    <TabPane tab="模拟用户" key="2">
                        <Card bodyStyle={{padding: 0, margin: 0}} title={'模拟用户信息表'}>

                            <Table rowKey="id"
                                   bordered

                                // rowSelection={rowSelection}
                                   columns={this.pageBColumns()}
                                   dataSource={this.state.bklistB}
                                   scroll={{x: 1600}}
                                   loading={this.state.loading}
                                   pagination={{
                                       total: this.state.totalpageB * this.state.pgsize,
                                       pageSize: this.state.pgsize,
                                       onChange: this.changePageB,
                                   }}
                            />
                        </Card>

                    </TabPane>
                    <TabPane tab="意向用户" key="3">
                        <Card bodyStyle={{padding: 0, margin: 0}} title={'意向用户信息表'}>
                            <Table rowKey="id"
                                   bordered
                                   columns={this.pageCColumns()}
                                   dataSource={this.state.bklistC}
                                   scroll={{x: 1500}}
                                   loading={this.state.loading}
                                   pagination={{
                                       total: this.state.totalpageC * this.state.pgsize,
                                       pageSize: this.state.pgsize,
                                       onChange: this.changePageC,
                                   }}
                            />
                        </Card>
                    </TabPane>
                </Tabs>

                <Modal
                    title="添加回访"
                    visible={this.state.visible}
                    onOk={this.handleAddComment}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    align={'center'}>
                    <TextArea
                        value={this.state.theComment}
                        placeholder="填写回访次数以及结果"
                        onChange={this.addComment}
                        rows={4}/>

                    <Table style={{marginTop: 15}}
                           rowKey="id"
                           columns={this.modalColums()} dataSource={this.state.operationDiaryHistory}
                           loading={this.state.loadingComment}
                           pagination={{
                               total: this.state.totalpageComments * this.state.pgsize,
                               pageSize: this.state.pgsize,
                               onChange: this.changePageComment,
                           }}
                    />

                </Modal>
                <Modal
                    title="查看操作日志"
                    visible={this.state.modal2OPDAYVisible}
                    onCancel={this.handleCancel}
                    width={600}
                    footer={null}
                >
                    <Table rowKey="id"
                           columns={this.columnsLog}

                           dataSource={this.state.operationLogHistory}
                           loading={this.state.loadingComment}
                           pagination={{
                               current: this.state.currentComment,

                               total: this.state.totalpageComments * this.state.pgsize,
                               pageSize: this.state.pgsize,
                               onChange: this.changePageLog,
                           }}
                    />

                </Modal>
                <Modal
                    title="查看备注"
                    visible={this.state.modal3NoteVisible}
                    onCancel={(e) => {
                        this.setState({
                            modal3NoteVisible: false,
                        });
                    }}
                    width={600}
                    footer={null}
                >
                    <Table rowKey="id"
                           columns={[

                               {
                                   title: '操作人',
                                   width: 130,

                                   dataIndex: 'bkUserName',
                                   key: 'operationDiary_User',
                                   render: (text, record) => (
                                       <span>{record.bkUserName}</span>),
                               },
                               {
                                   title: '操作时间',
                                   dataIndex: 'createDate',
                                   key: 'operationDiary_Date',
                                   render: (text, record) => (
                                       <span>{this.timestampToTime(record.createDate)}</span>),
                               }, {
                                   title: '备注',
                                   dataIndex: 'comment',
                                   key: 'operationDiary_Status',
                                   render: (text, record) => (
                                       <span>{record.comment}</span>),
                               }]} dataSource={this.state.operationDiaryHistory}
                           loading={this.state.loadingComment}
                           pagination={{
                               total: this.state.totalpageComments * this.state.pgsize,
                               pageSize: this.state.pgsize,
                               onChange: this.changePageComment,
                           }}
                    />

                </Modal>
            </div>

        )
    }


}

