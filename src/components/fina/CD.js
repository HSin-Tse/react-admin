import React, {Component} from 'react';
import {DatePicker, Input, Modal, Button, Table, Tabs, message, Card, Icon, Popconfirm} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {ThemePicker} from '@/components/widget';
import classNames from "classnames";

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
            currentA: 1,
            currentB: 1,
            currentC: 1,
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

        window.Axios.post('/auth/addOperatorLogHistory', {
            moduleLog: '用户管理',
            pageLog: 'Leads管理',
            commentLog: 'Leads管理',
            typeLog: '2',
        })
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


        document.addEventListener("keydown", this.handleKeyPress, false);

        this.requestPageA()
        // this.requestPageB()
        // this.requestPageC()
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, false);
    }


    showOPDAyModal2 = (belongUserId) => {

        var logRouter = ''
        if (this.state.nowKey === '1') {
            logRouter = '/back/addLogPotentialUser'
        }
        if (this.state.nowKey === '2') {
            logRouter = '/back/addLogDemoUser'
        }
        if (this.state.nowKey === '3') {
            logRouter = '/back/addLogIntentUser'
        }

        window.Axios.post(logRouter, {
            referKey: belongUserId,
            commentLog: '点击日志',
        })
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

    };
    shownoteModal = (belongUserId) => {

        var logRouter = ''
        if (this.state.nowKey === '1') {
            logRouter = '/back/addLogPotentialUser'
        }
        if (this.state.nowKey === '2') {
            logRouter = '/back/addLogDemoUser'
        }
        if (this.state.nowKey === '3') {
            logRouter = '/back/addLogIntentUser'
        }

        window.Axios.post(logRouter, {
            referKey: belongUserId,
            commentLog: '点击备注',
        })

        this.setState({
            currentComment: 0,
            modal3NoteVisible: true,
            visible: false,
        }, () => {
            this.requestUserCommentList(belongUserId)
        });
    };

    showAddbAckModal = (record) => {
        var logRouter = ''
        if (this.state.nowKey === '1') {
            logRouter = '/back/addLogPotentialUser'
        }
        if (this.state.nowKey === '2') {
            logRouter = '/back/addLogDemoUser'
        }
        if (this.state.nowKey === '3') {
            logRouter = '/back/addLogIntentUser'
        }

        window.Axios.post(logRouter, {
            referKey: record.belongUserId,
            commentLog: '点击添加回访',
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
                align: 'center',
                dataIndex: 'bkUserName',
                key: 'operationDiary_User',
                render: (text, record) => (
                    <span>{record.bkUserName}</span>),
            },
            {
                title: '操作时间',
                dataIndex: 'createDate',
                key: 'operationDiary_Date',
                align: 'center',

                render: (text, record) => (
                    <span>{this.timestampToTime(record.createDate)}</span>),
            }, {
                title: '备注',
                dataIndex: 'comment',
                align: 'center',

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
                    <span>{(this.state.currentA - 1) * this.state.pgsize + index + 1}</span>
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
            }, {
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
                title: '跟踪状态',
                dataIndex: '跟踪状态',
                key: '跟踪状态',
                align: 'center',
                render: (text, record) => (<span>{record.feebackStatus}</span>),

            }, {
                title: '客户归属',
                dataIndex: '客户归属',
                key: '客户归属',
                align: 'center',
                render: (text, record) => (<span>{record.feebackStatus}</span>),

            }, {
                title: '模拟用户',
                dataIndex: '模拟用户',
                key: '模拟用户',
                align: 'center',
                render: (text, record) => (<span>{record.feebackStatus}</span>),

            }, {
                title: '开户资料',
                dataIndex: '开户资料',
                key: '开户资料',
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
            }, {
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
                    <span>{(this.state.currentB - 1) * this.state.pgsize + index + 1}</span>
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
            }, {
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
                    <span>{(this.state.currentC - 1) * this.state.pgsize + index + 1}</span>
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
            logRouter = 'back/addLogPotentialUser'
        }
        if (this.state.nowKey === '2') {
            logRouter = 'back/addLogDemoUser'

        }
        if (this.state.nowKey === '3') {
            logRouter = 'back/addLogIntentUser'
        }
        window.Axios.post(logRouter, {
            referKey: record.belongUserId,
            commentLog: '操作延期申请',
        })


        if (record.expireStatus == '未过期') {

            message.info('未过期')
            return
        }

        let belongUserId = record.belongUserId
        let accountNo = record.accountNo
        let self = this;


        window.Axios.post('ixuser/delayDemoAccount', {
            "accountNo": accountNo,
            "belongUserId": belongUserId,
        }).then(() => {
            message.success('操作成功')
            self.reflesh()


            if (this.state.nowKey === '1') {
                logRouter = 'back/addLogPotentialUser'
            }
            if (this.state.nowKey === '2') {
                logRouter = 'back/addLogDemoUser'

            }
            if (this.state.nowKey === '3') {
                logRouter = 'back/addLogIntentUser'
            }
            window.Axios.post(logRouter, {
                referKey: record.belongUserId,
                commentLog: '操作延期申请',
            })

        }).catch(error => {


            var logRouter = ''

            if (this.state.nowKey === '1') {
                logRouter = 'back/addLogPotentialUser'
            }
            if (this.state.nowKey === '2') {
                logRouter = 'back/addLogDemoUser'

            }
            if (this.state.nowKey === '3') {
                logRouter = 'back/addLogIntentUser'
            }
            // console.log('hcia record.feebackStatus' , record.feebackStatus)
            window.Axios.post(logRouter, {
                referKey: record.belongUserId,
                commentLog: '延期申请失败',
            })
        });

    }
    seeUSer = (record) => {


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
            logRouter = '/back/getLogPotentialUser'
        }
        if (this.state.nowKey === '2') {
            logRouter = '/back/getLogDemoUser'

        }
        if (this.state.nowKey === '3') {
            logRouter = '/back/getLogIntentUser'
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

    requestPageAS = () => {
        let self = this
        self.setState({
            loadingA: true
        })
        window.Axios.post('ib/getIBLeadsList', {
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
    requestPageA = () => {


        var mImfor = JSON.parse(localStorage.getItem('infor'))
        console.log('hcia mImfor', mImfor)


        var iidd = {backUserId: mImfor.backUserId ? mImfor.backUserId : ''}
        console.log('hcia iidd', iidd)
        console.log('hcia iidd', iidd)
        let self = this
        self.setState({
            loadingA: true
        })
        window.Axios.post('ib/getIBLeadsList', {
            'id': mImfor.backUserId ? mImfor.backUserId : '',

            pageNo: this.state.currentA,
            'filterLeadsType': 1,
            'pageSize': this.state.pgsize,

        }).then((response) => {
            self.setState({
                totalpageA: response.data.data.totalPage,
                bklistA: response.data.data.list,
                loadingA: false

            });

        })
    }

    requestPageBS = () => {

        let self = this

        self.setState({
            loadingB: true
        })
        window.Axios.post('ib/getIBLeadsList', {
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
    requestPageB = () => {

        let self = this

        self.setState({
            loadingB: true
        })
        window.Axios.post('ib/getIBLeadsList', {
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

    requestPageCS = () => {
        let self = this

        self.setState({
            loadingC: true
        })
        window.Axios.post('ib/getIBLeadsList', {
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
    requestPageC = () => {
        let self = this

        self.setState({
            loadingC: true
        })
        window.Axios.post('ib/getIBLeadsList', {
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
            currentA: page,
        }, () => {
            this.requestPageA()
        })
    }
    changePageB = (page) => {
        this.setState({
            currentB: page,
        }, () => {
            this.requestPageB()
        })
    }
    changePageC = (page) => {
        this.setState({
            currentC: page,
        }, () => {
            this.requestPageC()
        })
    }

    changePageLog = (page) => {
        // page = page - 1
        this.setState({
            currentComment: page,
        }, () => {
            this.requestUserLogList()
        })
    }

    changePageComment = (page) => {
        // page = page - 1
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


    refleshS = () => {


        if (this.state.nowKey === '1') {
            this.requestPageAS()//1:Potential 2:simulator 3:intend
        }
        if (this.state.nowKey === '2') {
            this.requestPageBS()
        }
        if (this.state.nowKey === '3') {
            this.requestPageCS()
        }
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
                {/*<div>this.state.currentComment :{JSON.stringify(this.state.currentComment)}</div>*/}

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
                                    filterTimeFalue: undefined
                                }, () => {
                                    self.reflesh()
                                })
                            }}
                            >清除条件</Button>}
                        >

                            <Input value={this.state.selectPhoneF} onChange={(e) => {
                                this.setState({
                                    selectPhoneF: e.target.value,
                                });
                            }} style={{marginBottom: 10}} placeholder="手机号"/>


                            <Input value={this.state.starClientAccount} onChange={(e) => {
                                this.setState({
                                    starClientAccount: e.target.value,
                                });
                            }} style={{marginBottom: 10}} placeholder="模拟账户"/>
                            <RangePicker

                                showToday
                                style={{width: '100%'}}
                                showTime={{format: 'YYYY-MM-DD HH:mm:ss'}}
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder={['开始时间', '结束时间']}
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

                            <Button onClick={() => this.refleshS()} style={{marginTop: 15}} type="primary"
                                    icon="search">Search</Button>

                        </Card>


                    </div>
                </div>
                <h2 style={{marginTop: 15}}>客维LEADS管理</h2>
                <BreadcrumbCustom first="营销管理" second="客维管理" third={"客维统计"} four={"客维LEADS管理"}/>


                <Tabs
                    onChange={(key) => {

                        this.setState({
                            nowKey: key,
                        })
                    }}
                    tabBarStyle={{}}
                    type="card">
                    <TabPane tab="已分配" key="1">
                        <Card


                            bodyStyle={{padding: 0, margin: 0}}
                            title={'某某的LEADS列表'}>
                            <Table
                                titleStyle={{whiteSpace: 'nowrap'}}
                                style={{whiteSpace: 'nowrap'}}
                                rowKey="id"
                                bordered
                                columns={this.pageAColumns()}
                                dataSource={this.state.bklistA}
                                scroll={{x: 1600}}
                                loading={this.state.loadingA}
                                pagination={{
                                    total: this.state.totalpageA * this.state.pgsize,
                                    pageSize: this.state.pgsize,
                                    onChange: this.changePageA,
                                }}
                            />
                        </Card>

                    </TabPane>


                    <TabPane tab="已跟踪" key="2">
                        <Card


                            bodyStyle={{padding: 0, margin: 0}} title={'某某的LEADS列表'}>

                            <Table rowKey="id"
                                   bordered
                                   titleStyle={{whiteSpace: 'nowrap'}}
                                   style={{whiteSpace: 'nowrap'}}

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
                    <TabPane tab="未跟踪" key="3">
                        <Card


                            bodyStyle={{padding: 0, margin: 0}} title={'某某的LEADS列表'}>
                            <Table rowKey="id"
                                   titleStyle={{whiteSpace: 'nowrap'}}
                                   style={{whiteSpace: 'nowrap'}}
                                   bordered
                                   columns={this.pageCColumns()}
                                   dataSource={this.state.bklistC}
                                   scroll={{x: 1600}}
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
                            }}>{'查看操作日志'}
                            </span>
                        </div>

                        <Table
                            style={{marginTop: "20px", marginLeft: "20px", marginRight: "20px"}}
                            bordered
                            rowKey="id"
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


                    </div>
                </Modal>


                <Modal
                    bodyStyle={{
                        background: 'white',
                        padding: 0,
                        margin: 0,
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                            modal3NoteVisible: false,
                        });
                    }}
                    closable={false}
                    footer={null}
                    visible={this.state.modal3NoteVisible}
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
                            }}>{'查看备注'}
                            </span>
                        </div>

                        <Table

                            style={{paddingBottom: "20px", marginTop: "20px", marginLeft: "20px", marginRight: "20px"}}
                            bordered
                            rowKey="id"
                            columns={[

                                {
                                    title: '操作人',
                                    width: 130,
                                    align: 'center',

                                    dataIndex: 'bkUserName',
                                    key: 'operationDiary_User',
                                    render: (text, record) => (
                                        <span>{record.bkUserName}</span>),
                                },
                                {
                                    title: '操作时间',
                                    align: 'center',
                                    dataIndex: 'createDate',
                                    key: 'operationDiary_Date',
                                    render: (text, record) => (
                                        <span>{this.timestampToTime(record.createDate)}</span>),
                                }, {
                                    title: '备注',
                                    align: 'center',
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


                    </div>
                </Modal>
                <Modal
                    bodyStyle={{
                        background: 'white',
                        padding: 0,
                        width: '600px',
                        margin: 0,
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                            modal3NoteVisible: false,
                        });
                    }}
                    closable={false}
                    footer={null}
                    visible={this.state.visible}
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
                            }}>{'添加回访'}
                            </span>
                        </div>

                        <TextArea
                            style={{width: '440px', marginTop: "20px", marginLeft: "80px", marginRight: "20px"}}

                            value={this.state.theComment}
                            placeholder="在这里填写回访次数以及备注信息"
                            onChange={this.addComment}
                            rows={4}/>

                        <Table

                            style={{marginTop: "20px", marginLeft: "80px", marginRight: "80px"}}
                            bordered
                            rowKey="id"
                            columns={[

                                {
                                    title: '操作人',
                                    width: 130,
                                    align: 'center',

                                    dataIndex: 'bkUserName',
                                    key: 'operationDiary_User',
                                    render: (text, record) => (
                                        <span>{record.bkUserName}</span>),
                                },
                                {
                                    title: '操作时间',
                                    align: 'center',
                                    dataIndex: 'createDate',
                                    key: 'operationDiary_Date',
                                    render: (text, record) => (
                                        <span>{this.timestampToTime(record.createDate)}</span>),
                                }, {
                                    title: '备注',
                                    align: 'center',
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


                        <div style={{
                            marginLeft: "80px", marginRight: "80px",
                            paddingBottom: '48px',
                            paddingTop: '48px',
                            justifyContent: 'space-between',
                            display: 'flex'
                        }}>

                            <Button
                                onClick={this.handleAddComment}
                                style={{
                                    borderRadius: '4px',
                                    background: '#F6D147',
                                    width: '180px',
                                    height: '40px'
                                }}> 提交 </Button>
                            <Button onClick={(e) => {
                                this.setState({
                                    visible: false,
                                });
                            }} style={{borderRadius: '4px', width: '180px', height: '40px'}}> 取消 </Button>

                        </div>

                    </div>
                </Modal>


            </div>

        )
    }


}

