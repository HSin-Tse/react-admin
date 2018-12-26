import React, {Component} from 'react';
import {DatePicker, Input, Modal, Button, Table, Tabs, message, Card, Select, Layout, Icon, notification} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {ThemePicker} from '@/components/widget';
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
            loadingB: false,
            loadingC: false,
            selectMail: "",
            selectPhone: "",
            selectID: "",
            selectTimeStart: "",
            selectTimeEnd: "",
            NameCn: '',
            phoneCn: '',
            IDCn: '',
            MAilCn: '',
            TradeACcountCn: '',
            changeNoteVCN: '',
            addBlackType: "1",
        };
    }

    componentDidMount() {


        console.log('hcia  Black this.props', this.props.pg)

        this.setState({
            nowKey: this.props.pg,
        })


        this.columns = [
            {
                title: '手机号',
                align: 'center',

                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                render: (text, record) => (
                    <span>{record.mobile}</span>
                ),
            }, {
                title: '姓名',
                align: 'center',

                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <span>{record.name}</span>
                ),
            }, {
                title: '邮箱地址',
                align: 'center',
                dataIndex: '邮箱地址',
                key: '邮箱地址',
                render: (text, record) => (<span>{record.email}</span>),
            }, {
                title: '身份证号',
                align: 'center',
                dataIndex: '身份证号',
                key: '身份证号',
                render: (text, record) => (<span>{record.nationalId}</span>),
            }, {
                title: '操作时间',
                align: 'center',

                dataIndex: '操作时间',
                key: '操作时间',
                render: (text, record) => (<span>{record.date}</span>),
            }, {
                title: '操作人',
                align: 'center',
                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (<span>{record.operator}</span>),
            }, {
                align: 'center',
                title: '查看',
                key: '查看',
                render: (text, record) => (
                    <div>
                        <Button className="ant-dropdown-link">备注
                        </Button>

                    </div>
                ),
            }, {
                title: '操作',

                align: 'center',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <span className="ant-divider"/>
                        <Button className="ant-dropdown-link">操作日志</Button>
                        <Button className="ant-dropdown-link" onClick={() => this.handleremove(record)}>移除</Button>
                    </div>
                ),
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
            if (self.state.nowKey == 1) {
                this.requestPageA()//1:合规 2:开户 3:交易
            }
            if (self.state.nowKey == 2) {
                this.requestPageB()//1:合规 2:开户 3:交易
            }
            if (self.state.nowKey == 3) {
                this.requestPageC()//1:合规 2:开户 3:交易
            }

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
            'email': this.state.selectMail,
            'nationalId': this.state.selectID,
            'startTime': this.state.selectTimeStart,
            'endTime': this.state.selectTimeEnd,
            'mobile': this.state.selectPhone,
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易
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
            'listType': 2,//1:合规 2:开户 3:交易
            'email': this.state.selectMail,
            'nationalId': this.state.selectID,
            'startTime': this.state.selectTimeStart,
            'endTime': this.state.selectTimeEnd,
            'mobile': this.state.selectPhone,
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易
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
            'email': this.state.selectMail,
            'nationalId': this.state.selectID,
            'startTime': this.state.selectTimeStart,
            'endTime': this.state.selectTimeEnd,
            'mobile': this.state.selectPhone,
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易
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
            this.requestPageA()//1:合规 2:开户 3:交易
        }
        if (self.state.nowKey == 2) {
            this.requestPageB()//1:合规 2:开户 3:交易
        }
        if (self.state.nowKey == 3) {
            this.requestPageC()//1:合规 2:开户 3:交易
        }
    }

    onChangeDate = (value, dateString) => {
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

        const {loading, selectedRowKeys} = this.state;
        const hasSelected = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const {switcherOn, background} = this.state;

        return (


            <div>


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
                <h2 style={{marginTop: 15}}>
                    黑名單
                </h2>
                <BreadcrumbCustom first="用戶管理" second="黑名單"/>

                <Card
                    bodyStyle={{padding: 0, margin: 0}}
                >

                    <Tabs
                        activeKey={this.state.nowKey}
                        onChange={this.callback}
                        type="card">
                        <TabPane tab="合规黑名单" key="1">
                            {/*<Button*/}


                            {/*style={{marginBottom: 10}}*/}
                            {/*type="primary"*/}
                            {/*onClick={() => this.handleremoveList()}*/}
                            {/*disabled={!hasSelected}*/}
                            {/*loading={loading}*/}
                            {/*>*/}
                            {/*批量移除*/}
                            {/*</Button>*/}


                            <Card
                                bodyStyle={{padding: 0, margin: 0}}
                                title={'合规黑名单'}
                                extra={<Button onClick={() => {
                                    this.setState({
                                        showModaladdblack: true,
                                    });
                                }}>添加黑名单</Button>}
                            >

                                <Table rowKey="id"
                                       bordered
                                    // rowSelection={rowSelection}
                                       columns={this.columns}
                                       dataSource={this.state.bklistA}
                                       scroll={{x: 1300}}
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
                        <TabPane tab="开户黑名单" key="2">
                            <Card
                                bodyStyle={{padding: 0, margin: 0}}
                                title={'开户黑名单'}
                                extra={<Button onClick={() => {
                                    this.setState({
                                        showModaladdblack: true,
                                    });
                                }}>添加黑名单</Button>}
                            >
                                <Table rowKey="id"
                                       columns={this.columns}
                                       dataSource={this.state.bklistB}
                                       scroll={{x: 1300}}
                                       loading={this.state.loadingB}
                                       pagination={{  // 分页
                                           total: this.state.totalpageB * this.state.pgsize,
                                           pageSize: this.state.pgsize,
                                           onChange: this.changePageB,
                                       }}
                                />
                            </Card>

                        </TabPane>
                        <TabPane tab="交易黑名单" key="3">
                            <Card
                                bodyStyle={{padding: 0, margin: 0}}
                                title={'交易黑名单'}
                                extra={<Button onClick={() => {
                                    this.setState({
                                        showModaladdblack: true,
                                    });
                                }}>添加黑名单</Button>}
                            >
                                <Table rowKey="id"
                                       columns={this.columns}
                                       dataSource={this.state.bklistC}
                                       scroll={{x: 1300}}
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
                    }}
                >

                    <Card


                        bordered={true}>

                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{minWidth: 100}}>类型：</span>
                            <Select value={this.state.addBlackType} style={{minWidth: 160}}
                                    onChange={this.handleADDBalckType}>
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
        }).then((response) => {
            message.success('操作成功')

            me.searchSelect()
        });
    }


    handleADDBalckType = (value) => {
        console.log('hcia value', value)


        this.setState({
            addBlackType: value
        })
    }
}

