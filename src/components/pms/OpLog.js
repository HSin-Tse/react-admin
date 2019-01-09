import React, {Component} from 'react';
import {
    DatePicker,
    Input,
    Modal,
    Button,
    Table,
    Tabs,
    message,
    Card,
    Select,
    Icon,
    Popconfirm
} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import classNames from "classnames";

const Option = Select.Option;
const TabPane = Tabs.TabPane;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

export default class BlackList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            bklistA: [],
            bklistB: [],
            bklistC: [],
            currentComment: 0,
            currentA: 0,
            currentB: 0,
            currentC: 0,
            totalpageA: 0,
            totalpageB: 0,
            totalpageC: 0,
            nowKey: "1",
            pgsize: 10,
            loadingA: false,
            showModaladdblack: false,
            modal2OPDAYVisible: false,
            modal3OPDAYVisible: false,
            loadingB: false,
            loadingC: false,
            selectMail: "",
            selectPhone: "",
            selectID: "",
            selectTimeStart: "",
            selectTimeEnd: "",
            NameCn: undefined,
            phoneCn: undefined,
            IDCn: undefined,
            MAilCn: undefined,
            TradeACcountCn: undefined,
            changeNoteVCN: undefined,
            addBlackType: "1",
        };
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
    showOPDAyModal3 = (recodrd) => {
        this.requestUserCommentList(recodrd)
        this.setState({
            modal3OPDAYVisible: true,
            visible: false,
        });
    };
    showOPDAyModal2 = (recodrd) => {
        this.requestUserCommentList(recodrd)
        this.setState({
            modal2OPDAYVisible: true,
            visible: false,
        });
    };
    changePageComment = (page) => {
        page = page - 1
        this.setState({
            currentComment: page,
        }, () => {
            this.requestUserCommentList()
        })
    }
    requestUserCommentList = (record) => {
        var self = this;
        window.Axios.post('/auth/getRecordCommentList', {
            id: record.id,
            commentType: 7,
            pageNo: this.state.currentComment,
            pageSize: this.state.pgsize,
        }).then(function (response) {
            self.setState({
                totalpageComments: response.data.data.totalPage,
                operationDiaryHistory: response.data.data.list,
            });
        });
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, false);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress, false);


        console.log('hcia  Black this.props', this.props.pg)

        this.setState({
            nowKey: '3',
        })


        this.columns = [
            {
                title: '日期/时间',
                align: 'center',
                dataIndex: '日期/时间',
                key: '日期/时间',
                render: (text, record) => (
                    <span>{record.mobile}</span>
                ),
            }, {
                title: '使用者',
                align: 'center',
                dataIndex: '使用者',
                key: '使用者',
                render: (text, record) => (
                    <span>{record.name}</span>
                ),
            }, {
                title: '模块',
                align: 'center',
                dataIndex: '模块',
                key: '模块',
                render: (text, record) => (<span>{record.email}</span>),
            }, {
                title: '详细内容',
                align: 'center',
                dataIndex: '详细内容',
                key: '详细内容',
                render: (text, record) => (<span>{record.operator}</span>),
            }];
        this.requestPageA()//1:合规 2:开户 3:交易
        this.requestPageB()
        this.requestPageC()
    }

    handleremove = (record) => {
        let self = this
        window.Axios.post('auth/removeBlackUser', {
            'id': record.id//1:合规 2:开户 3:交易
        }).then((response) => {
            message.success('操作成功')
            self.searchSelect()
        });
    };
    handleremoveList = () => {

        let self = this
        window.Axios.post('auth/removeBlackUserBulk', {
            'idList': this.state.selectedRowKeys//1:合规 2:开户 3:交易
        }).then(() => {
            message.success('操作成功')
            self.searchSelect()
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
    requestPageA = () => {
        let self = this;
        self.setState({
            loadingA: true
        })
        window.Axios.post('auth/getBlackList', {
            pageNo: this.state.currentA,
            'listType': 1,//1:合规 2:开户 3:交易
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易,
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
    requestPageB = () => {
        let self = this

        self.setState({
            loadingB: true
        })
        window.Axios.post('auth/getBlackList', {
            pageNo: this.state.currentB,
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易,
            'listType': 2,//1:合规 2:开户 3:交易
            email: this.state.selectMail,
            mobile: this.state.selectPhoneF,
            nationalId: this.state.selectID,
            starClientAccount: this.state.starClientAccount,
            startTime: this.state.selectTimeStart,
            endTime: this.state.selectTimeEnd,
        }).then((response) => {
            self.setState({
                totalpageB: response.data.data.totalPage,
                bklistB: response.data.data.list,
                loadingB: false
            });

        });
    }
    requestPageC = () => {
        let self = this
        self.setState({
            loadingC: true
        })
        window.Axios.post('auth/getBlackList', {
            pageNo: this.state.currentC,
            'listType': 3,//1:合规 2:开户 3:交易
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易,
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
    changePageB = (page) => {
        page = page - 1

        this.setState({
            currentB: page,
        }, () => {
            this.requestPageB()
        })
    }
    changePageC = (page) => {
        page = page - 1

        this.setState({
            currentC: page,
        }, () => {
            this.requestPageC()
        })
    }

    callback = (key) => {

        this.setState({
            nowKey: key,
        })

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


    searchSelect = () => {

        let self = this
        if (self.state.nowKey === '1') {
            this.requestPageA()//1:合规 2:开户 3:交易
        }
        if (self.state.nowKey === '2') {
            this.requestPageB()//1:合规 2:开户 3:交易
        }
        if (self.state.nowKey === '3') {
            this.requestPageC()//1:合规 2:开户 3:交易
        }
    }


    onOk = (value) => {
        console.log('hcia', 'onOk: ', value);
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
                                    self.searchSelect()
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

                            <Button onClick={() => this.searchSelect()} style={{marginTop: 15}} type="primary"
                                    icon="search">Search</Button>

                        </Card>


                    </div>
                </div>
                <h2 style={{marginTop: 15}}>
                    操作日志
                </h2>
                <BreadcrumbCustom first="权限管理" second="操作日志"/>

                <Card bodyStyle={{padding: 0, margin: 0}}>

                    <Tabs
                        activeKey={this.state.nowKey}
                        onChange={this.callback}
                        type="card">
                        <TabPane tab="登录记录" key="1">


                            <Card
                                bodyStyle={{padding: 0, margin: 0}}
                                title={'登录记录'}
                            >

                                <Table rowKey="id"
                                       bordered
                                    // rowSelection={rowSelection}
                                       columns={this.columns}
                                       dataSource={this.state.bklistA}
                                       loading={this.state.loadingA}
                                       pagination={{  // 分页
                                           // showQuickJumper:true,
                                           total: this.state.totalpageA * this.state.pgsize,
                                           pageSize: this.state.pgsize,
                                           onChange: this.changePageA,
                                       }}
                                />
                            </Card>
                        </TabPane>
                        <TabPane tab="浏览记录" key="2">
                            <Card
                                bodyStyle={{padding: 0, margin: 0}}
                                title={'浏览记录'}

                            >
                                <Table rowKey="id"
                                       columns={this.columns}
                                       dataSource={this.state.bklistB}
                                       loading={this.state.loadingB}
                                       pagination={{  // 分页
                                           total: this.state.totalpageB * this.state.pgsize,
                                           pageSize: this.state.pgsize,
                                           onChange: this.changePageB,
                                       }}
                                />
                            </Card>

                        </TabPane>
                        <TabPane tab="操作记录" key="3">
                            <Card
                                bodyStyle={{padding: 0, margin: 0}}
                                title={'操作记录'}

                            >
                                <Table rowKey="id"
                                       columns={this.columns}
                                       dataSource={this.state.bklistC}
                                       loading={this.state.loadingC}
                                       pagination={{  // 分页
                                           total: this.state.totalpageC * this.state.pgsize,
                                           pageSize: this.state.pgsize,
                                           onChange: this.changePageC,
                                       }}
                                />
                            </Card>

                        </TabPane>
                    </Tabs>
                </Card>
                <Modal
                    width={370}
                    title="添加黑名单"
                    visible={this.state.showModaladdblack}
                    onOk={this.handleADdBlackListByType}
                    onCancel={(e) => {
                        this.setState({
                            showModaladdblack: false,
                        });
                    }}>

                    <Card bordered={true}>
                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{minWidth: 100}}>类型：</span>
                            <Select value={this.state.addBlackType} style={{minWidth: 160}}
                                    onChange={(value) => {

                                        this.setState({
                                            addBlackType: value
                                        })
                                    }}>
                                <Option value="1">合规黑名单</Option>
                                <Option value="2">开户黑名单</Option>
                                <Option value="3">交易黑名单</Option>
                            </Select>
                        </div>

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
            </div>

        )
    }

    handleADdBlackListByType = (e) => {

        let me = this

        if (!(me.state.TradeACcountCn || me.state.phoneCn || me.state.MAilCn || me.state.IDCn)) {
            message.error('交易账号与手机/邮箱/身份证必选一')
            return

        }
        if (!me.state.changeNoteVCN) {
            message.error('備註必填 ex:信息不真实')
            return
        }

        window.Axios.post('auth/addBlackUser', {
            'listType': me.state.addBlackType,//1:合规 2:开户 3:交易,
            'content': me.state.changeNoteVCN,
            'mobile': me.state.phoneCn,
            'email': me.state.MAilCn,
            'nationalId': me.state.IDCn,
            'name': me.state.NameCn,
            'starClientAccount': me.state.TradeACcountCn,
        }).then(() => {
            message.success('操作成功')
            me.searchSelect()
        });
    }


}
