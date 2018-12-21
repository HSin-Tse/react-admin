import React, {Component} from 'react';
import {DatePicker, Input, Modal, Button, Table, message, Card, Layout, Icon, Popconfirm, Tooltip} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {ThemePicker} from '@/components/widget';
import classNames from "classnames";

const {RangePicker} = DatePicker;

export default class CustomerSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bklistA: [],
            operationDiaryHistory: [],
            currentA: 0,
            totalpageA: 0,
            switcherOn: false,
            pgsize: 20,
            visible: false,
            modal2Visible: false,
        };
    }

    componentDidMount() {
        this.requestData()
        this.modalColumns = [
            {
                title: '時間',
                dataIndex: 'createDate',
                key: 'operationDiary_Date',

                render: (text, record) => (
                    <Button>{record.createDate}</Button>),
            }, {
                title: '狀態',
                dataIndex: 'comment',
                key: 'operationDiary_Status',

                render: (text, record) => (
                    <Button>{record.comment}</Button>),
            }, {
                title: '操作人',
                dataIndex: 'bkUserName',
                key: 'operationDiary_User',

                render: (text, record) => (
                    <Button>{record.bkUserName}</Button>),
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
                title: '回访次数',
                dataIndex: '回访次数',
                key: '回访次数',
                align: 'center',
                render: (text, record) => (
                    <span>{record.commentNum}</span>),
            },
            {
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
                        <Button className="ant-dropdown-link" onClick={() => this.goToUserAccountInfo()}>备注</Button>
                        <Button className="ant-dropdown-link" onClick={() => this.goToUserAccountInfo()}>開戶</Button>
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

                        <Popconfirm title="确认当前用户开户申请通过"
                                    onConfirm={() => this.forzenAccount(record)} okText="Yes"
                                    cancelText="No">

                            <Button className="ant-dropdown-link">凍結</Button>

                        </Popconfirm>

                        <Button className="ant-dropdown-link"
                                onClick={() => this.requestUnbindAccount(record)}>解綁</Button>
                        <Button className="ant-dropdown-link" onClick={() => this.forzenAccount(record)}>重置密码</Button>
                    </div>
                ),
            }, {
                title: '其他',
                key: '其他',
                dataIndex: '其他',
                align: 'center',
                render: (text, record) => (
                    <div>
                        {/* <span className="ant-divider" />
						<Button className="ant-dropdown-link" onClick={() => this.handleremove(record)}>移除</Button> */}
                        <Button className="ant-dropdown-link" onClick={() => this.showModal(record)}>添加備註</Button>
                        <Button className="ant-dropdown-link" onClick={() => this.showModal2()}>操作日誌</Button>

                    </div>
                ),
            }];
    }


    render() {


        return (

            <div>
                {/*<div>selectMail :{this.state.selectMail}</div>*/}
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
                        scroll={{x: 1620}}
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
                    title="操作日誌"
                    visible={this.state.modal2Visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="確認"
                    cancelText="取消"
                >
                    <Table rowKey="id"
                           columns={this.modalColumns} dataSource={this.state.operationDiaryHistory}
                           scroll={{x: 1300}}
                    />
                </Modal>
            </div>

        )
    }

    showModal2 = () => {
        this.setState({
            modal2Visible: true,
            visible: false,

        });
    }
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
        }).then((response) => {


            console.log('yyx handleAddComment success', response.data.data)
        }).catch(function (error) {
            console.log(error);
        });

        this.setState({
            visible: false,
            modal2Visible: false,
        });
    }
    handleOk = () => {
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
        window.Axios.post('star/unBindStarLiveAccount', {
            "starClientAccount": record.accountNo,
            "belongUserId": record.belongUserId,
        }).then((response) => {

            console.log('yyx handleAddComment success', response.data.data)
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


    requestUserCommentList = () => {
        var tmp = this;
        window.Axios.post('auth/getUserCommentList', {
            'belongUserId': '4028b2a4631f770f01631f7770df0000',

        }).then(function (response) {
            tmp.setState({operationDiaryHistory: response.data.data.list});
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
    goToUserAccountInfo = () => {
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
        window.Axios.post('star/blockStarLiveAccount', {
            "starClientAccount": record.accountNo,
            "belongUserId": record.belongUserId,

        }).then((response) => {
            message.success(record.accountNo + '帳號凍結成功')
            self.requestData()
        })
    }
}

