import React, {Component} from 'react';
import PopupContainer from './hoc/PopupContainer';
import {
    DatePicker,
    Input,
    Modal,
    Button,
    Table,
    message,
    Card,
    Icon,
    Popconfirm,
    Checkbox,
    Row,
    Col,
    Select
} from 'antd';
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
            if (event.key === 'o' || event.key === 'ㄟ') {
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

        window.Axios.post('back/addLogHistory', {
            'moduleLog': '用户管理',
            'pageLog': 'Leads用户总表',
            'commentLog': '查看了Leads用户总表',
            'typeLog': 2,
        }).then(function (response) {


        });

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
                width: 100,
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


                    <div style={{
                        align: 'center',
                        display: record.bindedStatus == 1 ? 'flex' : '',
                        justifyContent: record.bindedStatus == 1 ? 'space-around' : ''
                    }}>
                        <span style={{
                            display: record.bindedStatus == 1 ? '' : 'none',
                            marginLeft: 10
                        }}>{record.bindedStatus != 1 ? '' : record.bindedPhoneNumber}</span>
                        {/*<Button style={{marginLeft: 15}}>解绑</Button>*/}


                        <Button size={'small'} style={{
                            background: '#FDD000',
                            display: record.bindedStatus != 1 ? 'none' : '',
                            marginLeft: 0
                        }}
                                onClick={() => this.requestUnbindAccount(record)}>解绑</Button>


                        <span style={{
                            display: record.bindedStatus == 1 ? 'none' : '',
                            marginLeft: 0,
                            alignSelf: 'center'
                        }}>未激活</span>
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
                        <Button disabled={!record.belongUserId} size={'small'} style={{background: '#FDD000'}}
                                onClick={() => this.justSeenote(record)}>备注</Button>
                        <Button size={'small'} style={{background: '#FDD000'}}
                                onClick={() => this.goToUserAccountInfo(record)}>開户</Button>
                        <Button disabled={!record.belongUserId} size={'small'} style={{background: '#FDD000'}}
                                onClick={() => this.goToUserInfo(record.belongUserId)}>行为</Button>
                    </div>
                )
            }, {
                title: '业务操作',
                dataIndex: '业务操作',
                key: '业务操作',
                align: 'center',
                render: (text, record) => (
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>

                        <Popconfirm style={{}} title={record.accountStatus === 1 ? '确认凍結' : '确认解冻'}
                                    onConfirm={() => this.forzenAccount(record)} okText="Yes"
                                    cancelText="No">
                            <Button disabled={!record.belongUserId} size={'small'}
                                    style={{
                                        display: !record.belongUserId ? 'none' : '',
                                        background: record.accountStatus === 1 ? '#FDD000' : '#FF6666'
                                    }}>{record.accountStatus === 1 ? '正常（可冻结)' : record.accountStatus === 2 ? '禁止登陆:解冻'
                                : record.accountStatus === 3 ? '禁止交易:解冻' : '-'}</Button>
                        </Popconfirm>


                        <Button disabled={!record.belongUserId} size={'small'}
                                style={{
                                    display: !record.belongUserId ? '' : 'none',
                                    background: record.accountStatus === 1 ? '#FDD000' : 'OrangeRed'
                                }}>{record.accountStatus === 1 ? '正常（可冻结)' : record.accountStatus === 2 ? '禁止登陆:解冻'
                            : record.accountStatus === 3 ? '禁止交易:解冻' : '-'}</Button>


                        <Button disabled={!record.belongUserId} size={'small'} style={{background: '#FDD000'}}
                                onClick={() => this.resetSeret(record)}>重置密码</Button>
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
                        <Button disabled={!record.belongUserId} size={'small'} style={{background: '#FDD000'}}
                                onClick={() => this.showModalNote(record)}>添加备注</Button>
                        <Button disabled={!record.belongUserId} size={'small'} style={{background: '#FDD000'}}
                                onClick={() => this.showModalOPDAY(record)}>日志</Button>
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
                                    filterTimeFalue: null
                                }, () => {
                                    self.requestData()
                                })
                            }}>清除条件</Button>}>
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
                                    var selectTimeStart = value[0].unix() + '000'
                                    var selectTimeEnd = value[1].unix() + '000'
                                    this.setState({
                                        filterTimeFalue: value,
                                        selectTimeStart: selectTimeStart,
                                        selectTimeEnd: selectTimeEnd,

                                    });
                                }}
                            />

                            <Button onClick={() => this.requestDataS()} style={{marginTop: 15}} type="primary"
                                    icon="search">Search</Button>

                        </Card>
                    </div>
                </div>
                <h2 style={{marginTop: 15}}>
                    用户总表
                </h2>
                <BreadcrumbCustom first="用户管理" second="用户总表"/>

                {/*<div>this.state.checkedValues :{JSON.stringify(this.state.checkedValues)}</div>*/}
                {/*<div>this.state.checkedValues :{JSON.stringify(this.state.checkedValues.length)}</div>*/}

                <Card
                    extra={[

                        <Button style={{marginLeft: 15}} onClick={() => this.requestData()}>刷新</Button>]}
                    bodyStyle={{padding: 0, margin: 0}}
                    title="用户总表">
                    <Table
                        scroll={{x: 1600}}

                        titleStyle={{whiteSpace: 'nowrap'}}
                        style={{whiteSpace: 'nowrap'}}
                        rowKey="id"
                        bordered
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


                {/*<Modal*/}
                    {/*// width={'100%'}*/}
                    {/*title="添加备注"*/}
                    {/*visible={this.state.NoteModalVisible2}*/}
                    {/*onOk={this.handleAddComment}*/}
                    {/*onCancel={this.handleCancel}*/}
                    {/*okText="提交"*/}
                    {/*cancelText="取消">*/}
                    {/*<TextArea rows={4}*/}
                              {/*value={this.state.theComment}*/}
                              {/*onChange={(e) => {*/}
                                  {/*let comment = e.target.value;*/}
                                  {/*this.setState({*/}
                                      {/*theComment: comment*/}
                                  {/*});*/}
                              {/*}}*/}
                              {/*placeholder="在这里填写回访次数以及备注信息"/>*/}
                    {/*<Table*/}
                        {/*style={{marginTop: 15}}*/}
                        {/*bordered*/}
                        {/*rowKey="id"*/}
                        {/*columns={this.modalOPDayL2}*/}
                        {/*dataSource={this.state.operationDiaryHistory}*/}
                    {/*/>*/}
                {/*</Modal>*/}

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
                            NoteModalVisible2: false,
                        });
                    }}
                    closable={false}
                    footer={null}
                    // onCancel={this.handleCancel}
                    visible={this.state.NoteModalVisible2}


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
                            }}>{'添加备注'}
                            </span>
                        </div>

                        <TextArea
                            style={{marginTop: "20px", width:'560px',marginLeft: "20px", marginRight: "20px"}}

                            rows={4}
                                  value={this.state.theComment}
                                  onChange={(e) => {
                                      let comment = e.target.value;
                                      this.setState({
                                          theComment: comment
                                      });
                                  }}
                                  placeholder="在这里填写回访次数以及备注信息"/>
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
                                    NoteModalVisible2: false,
                                });
                            }} style={{borderRadius: '4px', width: '180px', height: '40px'}}> 取消 </Button>

                        </div>

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
                            modal2Visible1: false,
                        });
                    }}
                    closable={false}
                    footer={null}
                    // onCancel={this.handleCancel}
                    visible={this.state.modal2Visible1}


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

                            rowKey="id"
                            bordered
                            columns={this.modalOPDayColumns}
                            dataSource={this.state.operationDiaryHistory}
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
                            resetSeretModal5: false,
                        });
                    }}
                    closable={false}
                    footer={null}
                    visible={this.state.resetSeretModal5}
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
                            }}>{'重置交易密码'}
                            </span>
                        </div>


                        <Card

                            style={{margin: '20px'}}
                            title={'请确认客户信息：'} bordered={true}>

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
                            </Checkbox.Group>

                        </Card>
                        <Table
                            style={{marginTop: "20px", marginLeft: "20px", marginRight: "20px"}}
                            bordered
                            rowKey="id"
                            columns={this.modalOPDayColumns}
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

                                disabled={this.state.checkedValues.length < 6   ||  !this.state.accountPassword}
                                onClick={
                                    () => {


                                        if (!this.state.accountPassword) {

                                            message.error("密码?")
                                            return
                                        }


                                        var self = this
                                        if (this.state.otherComment) {
                                            this.state.checkedValues.push('其他:' + this.state.otherComment)
                                        }
                                        if (!this.state.nowRECODE.belongUserId) {
                                            message.error('dev log belongUserId :' + this.state.nowRECODE.belongUserId)
                                            return
                                        }


                                        window.Axios.post('back/addLogHistory', {
                                            'moduleLog': '用户管理',
                                            'pageLog': '用户总表',
                                            'commentLog': '重置交易密码',
                                            'typeLog': 3,
                                        });


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
                                    }
                                }
                                style={{
                                    borderRadius: '4px',
                                    background: '#F6D147',
                                    width: '180px',
                                    height: '40px'
                                }}> 提交 </Button>
                            <Button onClick={(e) => {
                                this.setState({
                                    resetSeretModal5: false,
                                });
                            }} style={{borderRadius: '4px', width: '180px', height: '40px'}}> 取消 </Button>

                        </div>

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
                            showUnBindPhoneModal4: false,
                        });
                    }}
                    closable={false}
                    footer={null}
                    visible={this.state.showUnBindPhoneModal4}
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
                            }}>{'解绑手机号'}
                            </span>
                        </div>


                        <Card

                            style={{margin: '20px'}}
                            title={'请确认客户信息：'} bordered={true}>

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
                            style={{marginTop: "20px", marginLeft: "20px", marginRight: "20px"}}
                            bordered
                            rowKey="id"
                            columns={this.modalOPDayColumns}
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

                                disabled={this.state.checkedValues.length < 6}
                                onClick={() => {
                                    var self = this
                                    if (this.state.otherComment) {
                                        this.state.checkedValues.push('其他:' + this.state.otherComment)
                                    }
                                    if (!this.state.nowRECODE.belongUserId) {
                                        message.error('dev log belongUserId :' + this.state.nowRECODE.belongUserId)
                                        return
                                    }


                                    // return ;

                                    window.Axios.post('back/addLogHistory', {
                                        'moduleLog': '用户管理',
                                        'pageLog': '用户总表',
                                        'commentLog': '解绑手机号',
                                        'typeLog': 3,
                                    });


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
                                style={{
                                    borderRadius: '4px',
                                    background: '#F6D147',
                                    width: '180px',
                                    height: '40px'
                                }}> 提交 </Button>
                            <Button onClick={(e) => {
                                this.setState({
                                    showUnBindPhoneModal4: false,
                                });
                            }} style={{borderRadius: '4px', width: '180px', height: '40px'}}> 取消 </Button>

                        </div>

                    </div>
                </Modal>


            </div>

        )
    }

    showModalOPDAY = (record) => {

        var self = this

        self.setState({
            opDayRecord: record,
        }, () => {


            window.Axios.post('back/addLogHistory', {
                'moduleLog': '用户管理',
                'pageLog': '用户总表',
                'commentLog': '查看备注',
                'typeLog': 3,
            });

            window.Axios.post('auth/getUserCommentList', {
                'belongUserId': this.state.opDayRecord.belongUserId,
            }).then(function (response) {
                self.setState({operaftionDiaryHistory: response.data.data.list});
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


            window.Axios.post('back/addLogHistory', {
                'moduleLog': '用户管理',
                'pageLog': '用户总表',
                'commentLog': '查看备注',
                'typeLog': 3,
            });

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

        window.Axios.post('back/addLogHistory', {
            'moduleLog': '用户管理',
            'pageLog': '用户总表',
            'commentLog': '添加备注',
            'typeLog': 3,
        });


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


        window.Axios.post('back/addLogHistory', {
            'moduleLog': '用户管理',
            'pageLog': '用户总表',
            'commentLog': '解绑',
            'typeLog': 3,
        });


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



    requestDataS = () => {
        let self = this
        window.Axios.post('ixuser/getUserList', {
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
        page = page - 1
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
        this.props.history.push('/app/pass/passopen/' + gogo + record.leadId)

        // route: '/app/pass/passopenrs/detail:id',
        // var gogo = record.status === 0 ? 'detail' : (record.status === 1) ? 'user' : 'user'
        // this.props.history.push('/app/pass/passopen/' + gogo + record.id)

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
