import React, {Component} from 'react';
import {DatePicker, Input, Modal, Button, Table, Tabs, message, Card, Tag, Layout, Icon, Col, Popconfirm} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {ThemePicker} from '@/components/widget';
import classNames from "classnames";
import yyx from '../utility/Utility';

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
            currentA: 0,//潜在用户
            currentB: 0,//SimulatorUser
            currentC: 0,//IntendingUser
            currentComment: 0,
            totalpageA: 0,
            totalpageB: 0,
            totalpageC: 0,
            totalpageComments: 0,
            nowKey: "1",
            pgsize: 10,
            loadingA: false,
            loadingB: false,
            loadingC: false,
            loadingComment: false,
            selectMail: "",
            selectPhone: "",
            selectID: "",
            selectTimeStart: "",
            selectTimeEnd: "",
            modal2Visible: false,
            visible: false,
            operationDiaryHistory: [],


        };
    }

    componentDidMount() {
        this.requestPageA()
        this.requestPageB()
        this.requestPageC()
    }


    showModal2 = (belongUserId) => {
        this.requestUserCommentList(belongUserId)
        this.setState({
            // theComment: comment
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
            theComment: record.comment,
        });

    }


    modalColums = () => {
        return [{
            title: '時間',
            dataIndex: 'createDate',
            key: 'operationDiary_Date',
            render: (text, record) => (
                <span>{record.createDate}</span>),
        }, {
            title: '狀態',
            dataIndex: 'comment',
            key: 'operationDiary_Status',
            render: (text, record) => (
                <span>{record.comment}</span>),
        }, {
            title: '操作人',
            width: 130,

            dataIndex: 'bkUserName',
            key: 'operationDiary_User',
            render: (text, record) => (
                <span>{record.bkUserName}</span>),
        }]
    }
    pageAColumns = () => {
        return [
            {
                title: '序号',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                width: 70,
                fixed: 'left',
                align: 'center',
                render: (text, record, index) => (
                    <span>{this.state.currentA * this.state.pgsize + index + 1}</span>
                ),
            }, {
                title: '手机号',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                width: 160,
                fixed: 'left',
                align: 'center',
                render: (text, record) => (

                    <span>{record.mobile}</span>

                ),
            }, {
                title: 'APP版本',
                width: 120,
                dataIndex: 'APP版本',
                key: 'APP版本',
                align: 'center',
                render: (text, record) => (
                    <span>{record.versionInfo}</span>),
            }, {
                width: 120,
                title: '手机型号',
                dataIndex: '手机型号',
                key: '手机型号',
                align: 'center',
                render: (text, record) => (<span>{record.clientInfo}</span>),
            }, {
                width: 130,

                title: '操作系统型号',
                dataIndex: '操作系统型号',
                key: '操作系统型号',
                align: 'center',
                render: (text, record) => (<span>{record.systemInfo}</span>),
            }, {
                width: 160,
                title: '注册时间',
                dataIndex: '注册时间',
                key: '注册时间',
                align: 'center',
                render: (text, record) => (<span>{record.date}</span>),
            }, {
                width: 120,
                title: '下载平台',
                dataIndex: '下载平台',
                key: '下载平台',
                align: 'center',
                render: (text, record) => (
                    <span>{record.channelInfo}</span>),
            }, {
                width: 120,
                title: '地理位置',
                dataIndex: '地理位置',
                key: '地理位置',
                align: 'center',
                render: (text, record) => (
                    <span>{record.location}</span>),
            }, {
                width: 120,
                title: '回访状态',
                dataIndex: '回访状态',
                key: '回访状态',
                align: 'center',
                render: (text, record) => (<span>{record.feebackStatus}</span>),

            }, {
                title: '备注',
                width: 120,

                dataIndex: '备注',
                key: '备注',
                align: 'center',
                render: (text, record) => (
                    <span>{record.comment}</span>),
            }, {
                width: 130,
                title: '操作人',
                dataIndex: '操作人',
                key: '操作人',
                align: 'center',
                render: (text, record) => (
                    <span>{record.operator}</span>),
            }, {

                title: '操作',
                key: 'action',
                fixed: 'right',
                align: 'center',
                width: 250,
                render: (text, record) => (

                    <div>

                        <Button className="ant-dropdown-link" onClick={() => this.showModal(record)}>添加備註</Button>
                        <Button className="ant-dropdown-link"
                                onClick={() => this.showModal2(record.belongUserId)}>操作日誌</Button>
                    </div>
                ),
            }];
    }
    pageBColumns = () => {
        return this.columns = [
            {
                title: '手机号',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                width: 150,
                fixed: 'left',
                align: 'center',
                render: (text, record) => (
                    <span>{record.mobile}</span>
                ),
            }, {
                title: '模拟账号',
                dataIndex: '模拟账号',
                width: 120,

                key: '模拟账号',
                render: (text, record) => (
                    <span>{record.accountNo}</span>),
            }, {
                title: '绑定时间',
                dataIndex: '绑定时间',
                width: 120,

                key: '绑定时间',
                render: (text, record) => (<span>{record.date}</span>),
            }, {
                title: '剩余天数',
                dataIndex: '剩余天数',
                key: '剩余天数',
                width: 120,

                render: (text, record) => (<span>{record.remainDay}</span>),
            }, {
                title: '模拟账户状态',
                width: 150,

                dataIndex: '模拟账户状态',
                key: '模拟账户状态',
                render: (text, record) => (<span>{record.expireStatus}</span>),
            }, {
                title: '延期次数',
                width: 100,

                dataIndex: '延期次数',
                key: '延期次数',
                render: (text, record) => (<span>{record.delayNum}</span>),
            }, {
                title: '回访状态',
                dataIndex: '回访状态',
                width: 120,

                key: '回访状态',
                render: (text, record) => (<span>{record.feebackStatus}</span>),
            }, {
                title: '备注',
                width: 120,

                dataIndex: '备注',
                key: '备注',
                render: (text, record) => (<span>{record.comment}</span>),
            }, {
                title: '活跃程度',
                dataIndex: '活跃程度',
                key: '活跃程度',
                width: 120,

                render: (text, record) => (<span>{'ssssss'}</span>),
            }, {
                title: '操作人',
                width: 130,

                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (<span>{record.operator}</span>),
            }, {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 300,
                align: 'center',
                render: (text, record) => (
                    <div>
                        <Popconfirm title="延期申请？" onConfirm={() => this.handleDelay(record)} okText="Yes"
                                    cancelText="No">
                            <Button className="ant-dropdown-link" >延期</Button>

                        </Popconfirm>

                        <Button className="ant-dropdown-link" onClick={() => this.showModal(record)}>添加備註</Button>
                        <Button className="ant-dropdown-link"
                                onClick={() => this.showModal2(record.belongUserId)}>操作日誌</Button>
                    </div>
                ),
            }];
    }


    pageCColumns = () => {
        return this.columns = [
            {
                title: '手机号',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                width: 160,
                fixed: 'left',
                align: 'center',
                render: (text, record) => (

                    <span>{record.mobile}</span>

                ),
            }, {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: 120,

                align: 'center',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {
                title: '当前账户',
                dataIndex: '当前账户',
                key: '当前账户',
                width: 120,

                align: 'center',
                render: (text, record) => (<span>{record.accountType}</span>),
            }, {
                title: '模拟帐号',
                dataIndex: '模拟帐号',
                key: '模拟帐号',
                width: 120,

                align: 'center',
                render: (text, record) => (<span>{record.accountNo}</span>),
            }, {
                title: '录入信息时间',
                dataIndex: '录入信息时间',
                width: 160,

                key: '录入信息时间',
                align: 'center',
                render: (text, record) => (<span>{record.date}</span>),
            }, {
                title: '活跃度',
                dataIndex: '活跃度',
                key: '活跃度',
                width: 110,

                align: 'center',
                render: (text, record) => (<span>{record.activeFlag}</span>),
            }, {
                title: '回访状态',
                dataIndex: '回访状态',
                key: '回访状态',
                width: 120,

                align: 'center',
                render: (text, record) => (<span>{record.feebackStatus}</span>),
            }, {
                title: '备注',
                dataIndex: '备注',
                key: '备注',
                width: 160,

                align: 'center',
                render: (text, record) => (
                    <span>{record.comment}</span>),
            }, {
                title: '操作人',
                dataIndex: '操作人',
                key: '操作人',
                width: 120,

                align: 'center',
                render: (text, record) => (
                    <span>{record.operator}</span>),
            }, {
                title: '查看',
                dataIndex: '查看',
                key: '查看',
                fixed: 'right',
                width: 120,

                align: 'center',
                render: (text, record) => (
                    <span><Button onClick={() => this.seeUSer(record)}
                                  className="ant-dropdown-link">查看信息 </Button></span>),
            }, {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 250,
                align: 'center',
                render: (text, record) => (
                    <div>
                        <Button className="ant-dropdown-link" onClick={() => this.showModal(record)}>添加備註</Button>
                        <Button className="ant-dropdown-link"
                                onClick={() => this.showModal2(record.belongUserId)}>操作日誌</Button>
                    </div>
                ),
            }];
    }
    handleDelay = (record) => {
        let belongUserId = record.belongUserId
        let accountNo = record.accountNo
        console.log('yyx', record);
        let self = this;
        window.Axios.post('ixuser/delayDemoAccount', {
            "accountNo": accountNo,
            "belongUserId": belongUserId,
        }).then((response) => {
            if (response.data.code === 1) {
                message.success('操作成功')
                if (self.state.nowKey == 1) {
                    this.requestPageA()//1:合规 2:开户 3:交易
                }
                if (self.state.nowKey == 2) {
                    this.requestPageB()//1:合规 2:开户 3:交易
                }
                if (self.state.nowKey == 3) {
                    this.requestPageC()//1:合规 2:开户 3:交易
                }
            }
        }).catch(function (error) {
            console.log(error);
        });

    }

    seeUSer = (record) => {

        console.log('hcia record.id', record.id)
        console.log('hcia record.id', record.id)
        console.log('hcia record.id', record.leadId)

        this.props.history.push('/app/pass/passopen/user' + record.leadId)

    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            modal2Visible: false,
        });
    }
    handleAddComment = (e) => {
        let self = this;
        window.Axios.post('auth/addUserComment', {
            content: self.state.theComment,
            belongUserId: self.state.theBelongUserId,
        }).then((response) => {
            if (yyx.checkResponseCode(response)) {
                message.success('提交成功')
                self.state.theComment = ''
                if (self.state.nowKey == 1) {
                    this.requestPageA()//1:合规 2:开户 3:交易
                }
                if (self.state.nowKey == 2) {
                    this.requestPageB()//1:合规 2:开户 3:交易
                }
                if (self.state.nowKey == 3) {
                    this.requestPageC()//1:合规 2:开户 3:交易
                }
            }
        })

        this.setState({
            visible: false,
            modal2Visible: false,
        });
    }
    handleremove = (record) => {

        let self = this
        window.Axios.post('auth/removeBlackUser', {
            'id': record.id//1:合规 2:开户 3:交易
        }).then((response) => {

            message.success('操作成功')
            if (self.state.nowKey == 1) {
                this.requestPageA()
            }
            if (self.state.nowKey == 2) {
                this.requestPageB()//1:合规 2:开户 3:交易
            }
            if (self.state.nowKey == 3) {
                this.requestPageC()//1:合规 2:开户 3:交易
            }

        }).catch(function (error) {
            console.log(error);
        });

    };
    handleremoveList = () => {

        let self = this
        window.Axios.post('auth/removeBlackUserBulk', {
            'idList': this.state.selectedRowKeys//1:合规 2:开户 3:交易
        }).then((response) => {

            message.success('操作成功')
            if (self.state.nowKey == 1) {
                this.requestPageA()//1:合规 2:开户 3:交易
            }
            if (self.state.nowKey == 2) {
                this.requestPageB()//1:合规 2:开户 3:交易
            }
            if (self.state.nowKey == 3) {
                this.requestPageC()//1:合规 2:开户 3:交易
            }

        }).catch(function (error) {
            console.log(error);
        });

    };

    handleremoveSelect = () => {


        let self = this
        this.setState({
            selectMail: '',
            selectID: '',
            startTime: '',
            selectPhone: '',
            selectTimeStart: '',
            selectTimeEnd: ''
        }, () => {
            self.searchSelect()
        })


    };
    requestUserCommentList = (record) => {
        var self = this;
        window.Axios.post('/auth/getUserCommentList', {
            belongUserId: record,
            pageNo: this.state.currentComment,
            pageSize: this.state.pgsize,

        }).then(function (response) {

            if (response.data.code != 1) {
                message.warn('request User CommentList error')
                console.log('yyx requestUserCommentList error');
            }

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
            'nationalId': this.state.selectID,
            'startTime': this.state.selectTimeStart,
            'endTime': this.state.selectTimeEnd,
            'pageSize': this.state.pgsize,

        }).then((response) => {
            console.log("ggggg", response.data.data)
            self.setState({
                totalpageA: response.data.data.totalPage,
                bklistA: response.data.data.list,
                loadingA: false

            }, () => {
                console.log('yyx requestPageA state.bklistA', self.state.bklistA)
                // var tags = Object.keys(self.state.bklistA[0])
                // console.log('hcia tags', tags)
                // self.setState({
                //     mTags: tags
                // })

            });

        }).catch(function (error) {
            console.log(error);
        });
    }
    requestPageB = () => {
        let self = this

        self.setState({
            loadingB: true
        })
        window.Axios.post('ixuser / getUserList', {
            pageNo: this.state.currentA,
            'listType': 2,
            'nationalId': this.state.selectID,
            'startTime': this.state.selectTimeStart,
            'endTime': this.state.selectTimeEnd,
            'pageSize': this.state.pgsize,

        }).then((response) => {
            console.log('kkk', response.data.data);
            self.setState({
                totalpageB: response.data.data.totalPage,
                bklistB: response.data.data.list,
                loadingB: false
            });


        }).catch(function (error) {
            console.log(error);
        });
    }
    requestPageC = () => {
        let self = this

        self.setState({
            loadingB: true
        })
        window.Axios.post('ixuser/getUserList', {
            pageNo: this.state.currentA,
            'listType': 3,
            'nationalId': this.state.selectID,
            'startTime': this.state.selectTimeStart,
            'endTime': this.state.selectTimeEnd,
            'pageSize': this.state.pgsize,

        }).then((response) => {
            console.log('iii', response.data.data);
            self.setState({
                totalpageC: response.data.data.totalPage,
                bklistC: response.data.data.list,
                loadingC: false
            });


        }).catch(function (error) {
            console.log(error);
        });
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
            currentb: page - 1,
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
    changePageComment = (page) => {
        page = page - 1
        this.setState({
            currentComment: page,
        }, () => {
            this.requestUserCommentList()
        })
    }

    callback = (key) => {

        this.setState({
            nowKey: key,
        })

    }
    addComment = (e) => {
        let comment = e.target.value;
        this.setState({
            theComment: comment
        });
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('hcia', 'selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
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
    searchSelect = () => {
        let self = this
        console.log('hcia self.state.nowKey', self.state.nowKey)
        if (self.state.nowKey == 1) {
            this.requestPageA()//1:Potential 2:simulator 3:intend
        }
        if (self.state.nowKey == 2) {
            this.requestPageB()
        }
        if (self.state.nowKey == 3) {
            this.requestPageC()
        }
    }

    onChangeDate = (value, dateString) => {
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

        const {loading, selectedRowKeys} = this.state;
        const hasSelected = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const {switcherOn, background} = this.state;

        return (


            <div>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
                {/*<div>PotentialUser</div>*/}
                {/*<ThemePicker />*/}
                <div className={classNames('switcher dark-white', {active: switcherOn})}>
					<span className="sw-btn dark-white" onClick={this._switcherOn}>
						<Icon type="setting" className="text-dark"/>
					</span>
                    <div>

                        <Card title="當前表搜索"
                              extra={<Button type="primary" onClick={() => this.handleremoveSelect()}
                              >清除條件</Button>}
                        >
                            <Input onChange={this.onChangeMail} style={{marginBottom: 5}} placeholder="邮箱"/>
                            <Input value={this.state.selectPhone} onChange={this.onChangePhone}
                                   style={{marginBottom: 5}} placeholder="手机号"/>
                            <Input onChange={this.onChangeID} style={{marginBottom: 5}} placeholder="身份证号"/>
                            <Input onChange={this.onChangeAccount} style={{marginBottom: 5}} placeholder="账户"/>
                            <Input onChange={this.onChangeKeyWord} style={{marginBottom: 5}} placeholder="关键词"/>
                            <RangePicker
                                showTime={{format: 'YYYY-MM-DD HH:mm:ss'}}
                                format="YYYY-MM-DD HH:mm:ss fff"
                                placeholder={['Start Time', 'End Time']}
                                onChange={this.onChangeDate}
                                onOk={this.onOk}
                            />

                            <Button onClick={() => this.searchSelect()} style={{marginTop: 10}} type="primary"
                                    icon="search">Search</Button>

                        </Card>


                    </div>
                </div>
                <BreadcrumbCustom first="用户管理" second="Leads管理"/>


                <Tabs
                    onChange={this.callback}
                    type="card">
                    <TabPane tab="潛在用戶" key="1">
                        <Card title={'潜在用户信息表'}>
                            <Table rowKey="id"
                                   bordered
                                // rowSelection={rowSelection}
                                   columns={this.pageAColumns()}
                                   dataSource={this.state.bklistA}
                                   scroll={{x: 1500}}
                                   loading={this.state.loadingA}
                                   pagination={{  // 分页
                                       total: this.state.totalpageA * this.state.pgsize,
                                       pageSize: this.state.pgsize,
                                       onChange: this.changePageA,
                                   }}
                            />
                        </Card>

                    </TabPane>

                    <TabPane tab="模擬用戶" key="2">
                        <Card title={'模拟用户信息表'}>

                            <Table rowKey="id"
                                // rowSelection={rowSelection}
                                   columns={this.pageBColumns()}
                                   dataSource={this.state.bklistB}
                                   scroll={{x: 1500}}
                                   loading={this.state.loading}
                                   pagination={{  // 分页
                                       total: this.state.totalpageB * this.state.pgsize,
                                       pageSize: this.state.pgsize,
                                       onChange: this.changePageB,
                                   }}
                            />
                        </Card>

                    </TabPane>
                    <TabPane tab="意向用戶" key="3">
                        <Card title={'意向用户信息表'}>
                            <Table rowKey="id"
                                // rowSelection={rowSelection}
                                   columns={this.pageCColumns()}
                                   dataSource={this.state.bklistC}
                                   scroll={{x: 1500}}
                                   loading={this.state.loading}
                                   pagination={{  // 分页
                                       total: this.state.totalpageC * this.state.pgsize,
                                       pageSize: this.state.pgsize,
                                       onChange: this.changePageC,
                                   }}
                            />
                        </Card>

                    </TabPane>
                </Tabs>

                <Modal
                    title="添加備註"
                    visible={this.state.visible}
                    onOk={this.handleAddComment}
                    onCancel={this.handleCancel}
                    okText="確認"
                    cancelText="取消"
                >
                    {/*<p><Input onChange={this.addComment} placeholder="填写回访次数以及结果"/></p>*/}

                    <TextArea
                        value={this.state.theComment}
                        placeholder="填写回访次数以及结果"
                        onChange={this.addComment}
                        rows={4}></TextArea>
                </Modal>
                <Modal
                    title="操作日誌"
                    visible={this.state.modal2Visible}
                    // onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    // okText="確認"
                    width={600}
                    // cancelText="取消"
                    footer={null}
                >
                    <p>
                        <Table rowKey="id"
                               columns={this.modalColums()} dataSource={this.state.operationDiaryHistory}
                               loading={this.state.loadingComment}
                               pagination={{  // 分页
                                   total: this.state.totalpageComments * this.state.pgsize,
                                   pageSize: this.state.pgsize,
                                   onChange: this.changePageComment,
                               }}
                        />

                    </p>
                </Modal>
            </div>

        )
    }


}

