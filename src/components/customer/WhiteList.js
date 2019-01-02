import React, {Component} from 'react';
import {DatePicker, Input, Modal, Button, Table, message, Card, Icon, Select, Popconfirm} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import classNames from "classnames";

const {RangePicker} = DatePicker;
const {TextArea} = Input;

export default class WhiteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            bklistA: [],
            currentA: 0,
            totalpageA: 0,
            opDayRecord: {},

            currentComment: 0,
            pgsize: 10,
            loadingA: false,
            modal3OPDAYVisible: false,
            modal2OPDAYVisible: false,
            NoteModalVisible2: false,
            showModaladdWhite: false,
            selectPhone: undefined,
            NameCn: undefined,
            phoneCn: undefined,
            changeNoteV: undefined,
        };
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, false);
    }

    showModalNote = (record) => {


        this.requestUserCommentList(record)

        let id = record.id
        var self = this

        self.setState({
            opDayRecord: record,
            theComment: ''
        }, () => {

            self.setState({
                theBelongUserId: id,
                NoteModalVisible2: true,
            });
        });


    }

    componentDidMount() {
        console.log('hcia componentDidMount')

        document.addEventListener("keydown", this.handleKeyPress, false);


        this.columns = [
            {
                align: 'center',
                title: '手机号',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                render: (text, record) => (
                    <span>{record.mobile}</span>
                ),
            }, {
                align: 'center',
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {
                align: 'center',
                title: '交易组',
                dataIndex: '交易组',
                key: '交易组',
                render: (text, record) => (<span>{record.activeFlag}?</span>),
            }, {
                align: 'center',
                title: '交易账户',
                dataIndex: '交易账户',
                key: '交易账户',
                render: (text, record) => (<span>{record.activeFlag}</span>),
            }, {
                width: 150,
                align: 'center',
                title: '操作时间',
                dataIndex: '操作时间',
                key: '操作时间',
                render: (text, record) => (<span>{record.date}</span>),
            }

            , {
                width: 150,
                align: 'center',
                title: '身份证号',
                dataIndex: '身份证号',
                key: '身份证号',
                render: (text, record) => (<span>{record.nationalId}</span>),
            }
            , {
                width: 150,
                align: 'center',
                title: '邮箱地址',
                dataIndex: '邮箱地址',
                key: '邮箱地址',
                render: (text, record) => (<span>{record.email}</span>),
            }, {
                align: 'center',
                title: '操作人',
                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (<span>{record.operator}</span>),
            }, {
                align: 'center',
                title: '查看',
                key: '查看',
                render: (text, record) => (
                    <div>
                        <Button onClick={() => this.showOPDAyModal3(record)}>备注</Button>

                    </div>
                ),
            }, {
                align: 'center',
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <div>
                        {/*<Button>添加备注</Button>*/}
                        <Button onClick={() => this.showModalNote(record)}>添加备注</Button>

                        <Popconfirm title="移除?"
                                    onConfirm={() => this.handleremove(record)} okText="Yes"
                                    cancelText="No">
                            <Button>移除</Button>
                        </Popconfirm>
                        <Button onClick={() => this.showOPDAyModal2(record)}>操作日志</Button>

                        {/*<Button onClick={() => this.handleremove(record)}>操作日志</Button>*/}
                    </div>
                ),
            }];
        this.requestPageA()//1:合规 2:开户 3:交易
    }

    showOPDAyModal2 = (recodrd) => {
        this.requestUserCommentList(recodrd)
        this.setState({
            modal2OPDAYVisible: true,
            visible: false,
        });
    };
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
            commentType: 8,
            pageNo: this.state.currentComment,
            pageSize: this.state.pgsize,
        }).then(function (response) {
            self.setState({
                totalpageComments: response.data.data.totalPage,
                operationDiaryHistory: response.data.data.list,
            });
        });
    }
    handleremove = (record) => {
        window.Axios.post('auth/removeWhiteUser', {
            'id': record.id//
        }).then(() => {
            message.success('操作成功')
            this.requestPageA()//1:合规 2:开户 3:交易
        });
    };


    requestPageA = () => {
        let self = this
        self.setState({
            loadingA: true
        })

        var param = {}
        window.Axios.post('auth/getWhiteList', {
            'pageNo': this.state.current,
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
        });
    }


    changePageA = (page) => {
        page = page - 1
        this.setState({
            currentA: page,
        }, () => {
            this.requestPageA()
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
    onChangelastNameCn = (e) => {
        this.state.NameCn = e.target.value
    }
    onChangePhone = (e) => {
        this.state.phoneCn = e.target.value
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('hcia', 'selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }


    _switcherOn = () => {
        this.setState({
            switcherOn: !this.state.switcherOn
        })
    };


    onChangeID = (e) => {
        this.setState({
            selectID: e.target.value,
        });
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
    onChangeDate = (value, dateString) => {


        var selectTimeStart = value[0].unix() + '000'
        var selectTimeEnd = value[1].unix() + '000'

        this.setState({
            filterTimeFalue: value,
            selectTimeStart: selectTimeStart,
            selectTimeEnd: selectTimeEnd,

        });
    }
    changeNote = (e) => {
        this.setState({
            changeNoteV: e.target.value,
        });
    }


    showModal = () => {
        this.setState({
            showModaladdWhite: true,
        });
    }
    handleAddComment = (e) => {
        let self = this;
        window.Axios.post('auth/addRecordComment', {
            id: self.state.theBelongUserId,
            commentType: 8,
            content: self.state.theComment,
        }).then(() => {
            message.success('操作成功')
        })

        this.setState({
            NoteModalVisible2: false,
            modal2Visible1: false,
        });
    }


    handleCancel = (e) => {
        this.setState({
            NoteModalVisible2: false,
        });
    }
    handleAddWhite = (e) => {
        let self = this

        if (!(self.state.TradeACcountCn || self.state.phoneCn)) {
            message.error('手机和交易账号必选1')
            return
        }
        if (!self.state.changeNoteVCN) {
            message.error('備註必填')
            return
        }


        window.Axios.post('auth/addWhiteUser', {
            'mobile': self.state.phoneCn,
            'email': self.state.MAilCn,
            'nationalId': self.state.IDCn,
            'name': self.state.NameCn,
            'starClientAccount': self.state.TradeACcountCn,
            content: self.state.changeNoteVCN,
        }).then((response) => {
            self.requestPageA()//1:合规 2:开户 3:交易
        });
    }
    handleremoveList = () => {

        window.Axios.post('auth/removeWhiteUserBulk', {
            'idList': this.state.selectedRowKeys//1:合规 2:开户 3:交易
        }).then((response) => {

            message.success('操作成功')
            this.requestPageA()
        });

    };


    render() {

        return (


            <div id="whiteL">
                {/*<Modal*/}
                {/*title="新增白名单成员"*/}
                {/*visible={this.state.showModaladdWhite}*/}
                {/*onOk={this.handleOk}*/}
                {/*onCancel={(e) => {*/}
                {/*this.setState({*/}
                {/*showModaladdWhite: false,*/}
                {/*});*/}
                {/*}}*/}
                {/*>*/}

                {/*<Card bordered={true}>*/}

                {/*<div style={{display: 'flex', minHeight: 40}}>*/}
                {/*<span style={{width: 120}}>*用户姓名：</span>*/}
                {/*<Input defaultValue={this.state.NameCn}*/}
                {/*onChange={this.onChangelastNameCn}*/}
                {/*style={{width: 120}} placeholder="Basic usage" tagkey="lastNameCn"*/}
                {/*sdsd={'dd'}/>*/}
                {/*</div>*/}

                {/*<div style={{display: 'flex', minHeight: 40}}>*/}
                {/*<span style={{minWidth: 120}}>*手机号码：</span>*/}
                {/*<Input defaultValue={this.state.phoneCn}*/}
                {/*onChange={this.onChangePhone}*/}
                {/*style={{width: 120}} placeholder="Basic usage"/>*/}
                {/*</div>*/}


                {/*<div style={{display: 'flex', minHeight: 40}}>*/}
                {/*<span style={{minWidth: 100}}>操作备注</span>*/}

                {/*<div style={{display: 'flex', minHeight: 40}}>*/}
                {/*<TextArea value={this.state.changeNoteV} rows={4} onChange={this.changeNote}/>*/}
                {/*</div>*/}
                {/*</div>*/}

                {/*</Card>*/}
                {/*</Modal>*/}

                <Modal
                    width={370}
                    title="添加白名单"
                    visible={this.state.showModaladdWhite}
                    onOk={this.handleAddWhite}
                    onCancel={(e) => {
                        this.setState({
                            showModaladdWhite: false,
                        });
                    }}
                >

                    <Card


                        bordered={true}>


                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{minWidth: 100}}>用户姓名：</span>
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

                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{minWidth: 100}}>手机号码：</span>
                            <Input defaultValue={this.state.phoneCn}
                                   onChange={(e) => {
                                       this.setState({
                                           phoneCn: e.target.value,
                                       });
                                   }} style={{minWidth: 160}}
                                   sdsd={'dd'}
                            />
                        </div>

                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{minWidth: 100}}>身份证</span>
                            <Input defaultValue={this.state.IDCn}
                                   onChange={(e) => {
                                       this.setState({
                                           IDCn: e.target.value,
                                       });
                                   }}
                                   style={{minWidth: 160}}
                                   sdsd={'dd'}
                            />
                        </div>

                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{minWidth: 100}}>邮箱</span>
                            <Input defaultValue={this.state.MAilCn}
                                   onChange={(e) => {
                                       this.setState({
                                           MAilCn: e.target.value,
                                       });
                                   }}
                                   style={{minWidth: 160}}
                                   sdsd={'dd'}
                            />
                        </div>
                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{minWidth: 100}}>交易账号</span>
                            <Input defaultValue={this.state.TradeACcountCn}
                                   onChange={(e) => {
                                       this.setState({
                                           TradeACcountCn: e.target.value,
                                       });
                                   }}
                                   style={{minWidth: 160}}
                                   sdsd={'dd'}
                            />
                        </div>

                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{minWidth: 100}}>操作备注</span>
                            <TextArea style={{minWidth: 160}}
                                      value={this.state.changeNoteVCN}
                                      rows={4}
                                      onChange={(e) => {
                                          this.setState({
                                              changeNoteVCN: e.target.value,
                                          });
                                      }}/>
                        </div>

                    </Card>
                </Modal>
                {/*<div>selectMail :{this.state.selectMail}</div>*/}
                {/*<div>selectID :{this.state.selectID}</div>*/}
                {/*<div>starClientAccount :{this.state.starClientAccount}</div>*/}
                {/*<div>selectPhoneF :{this.state.selectPhoneF}</div>*/}
                {/*<div>changeNoteV :{this.state.changeNoteV}</div>*/}
                {/*<div>selectTimeStart :{this.state.selectTimeStart}</div>*/}
                {/*<div>selectTimeEnd :{this.state.selectTimeEnd}</div>*/}
                {/*<div>NameCn :{JSON.stringify(this.state.NameCn)}</div>*/}
                {/*<div>phoneCn :{JSON.stringify(this.state.phoneCn)}</div>*/}
                {/*<div>IDCn :{JSON.stringify(this.state.IDCn)}</div>*/}
                {/*<div>MAilCn :{JSON.stringify(this.state.MAilCn)}</div>*/}
                {/*<div>TradeACcountCn :{JSON.stringify(this.state.TradeACcountCn)}</div>*/}
                {/*<div>changeNoteVCN :{JSON.stringify(this.state.changeNoteVCN)}</div>*/}

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
                                    selectMail: '',
                                    selectID: '',
                                    startTime: '',
                                    selectPhoneF: '',
                                    starClientAccount: '',
                                    selectTimeStart: '',
                                    selectTimeEnd: '',
                                    filterTimeFalue: null
                                }, () => {
                                    self.requestPageA()
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

                            <Button onClick={() => this.requestPageA()} style={{marginTop: 15}} type="primary"
                                    icon="search">Search</Button>

                        </Card>


                    </div>
                </div>


                <h2 style={{marginTop: 15}}>
                    白名单
                </h2>
                <BreadcrumbCustom first="用戶管理" second="白名單"/>

                <Card
                    bodyStyle={{padding: 0, margin: 0}}
                    title={'白名单'}
                    extra={<Button onClick={() => this.showModal()}>新增白名单用户</Button>}
                >
                    <Table rowKey="id"
                           bordered
                           columns={this.columns}
                           dataSource={this.state.bklistA}
                           scroll={{x: 1500}}
                           loading={this.state.loading}
                           pagination={{
                               total: this.state.totalpageA * this.state.pgsize,
                               pageSize: this.state.pgsize,
                               onChange: this.changePageA,
                           }}
                    />
                </Card>

                <Modal
                    title="备注"
                    visible={this.state.modal3OPDAYVisible}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                            modal3OPDAYVisible: false,
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
                               }, {
                                   title: '操作时间',
                                   dataIndex: 'createDate',
                                   key: 'operationDiary_Date',
                                   render: (text, record) => (
                                       <span>{record.createDate}</span>),
                               }, {
                                   title: '备注',
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

                </Modal>
                <Modal
                    title="查看操作日志"
                    visible={this.state.modal2OPDAYVisible}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                            modal2OPDAYVisible: false,
                        });
                    }}
                    width={600}
                    footer={null}>
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

                </Modal>


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
                    {/*<Table*/}
                    {/*bordered*/}
                    {/*rowKey="id"*/}
                    {/*columns={this.modalOPDayL2}*/}
                    {/*dataSource={this.state.operationDiaryHistory}*/}
                    {/*/>*/}

                    <Table rowKey="id"
                           style={{marginTop: 15}}

                           columns={[

                               {
                                   title: '操作人',
                                   width: 130,
                                   dataIndex: 'bkUserName',
                                   key: 'operationDiary_User',
                                   render: (text, record) => (
                                       <span>{record.bkUserName}</span>),
                               }, {
                                   title: '操作时间',
                                   dataIndex: 'createDate',
                                   key: 'operationDiary_Date',
                                   render: (text, record) => (
                                       <span>{record.createDate}</span>),
                               }, {
                                   title: '备注',
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
                </Modal>
            </div>
        )
    }
}

