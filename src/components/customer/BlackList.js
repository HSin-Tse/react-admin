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
        };
    }

    componentDidMount() {
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
                title: '操作人',
                align: 'center',

                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (<span>{record.operator}</span>),
            }, {
                title: '处理备注',
                align: 'center',

                dataIndex: '处理备注',
                key: '处理备注',
                render: (text, record) => (
                    <span>{record.comment}</span>),
            }, {
                title: '操作',

                align: 'center',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <span className="ant-divider"/>
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
            currentb: page,
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
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
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
                        </TabPane>
                        <TabPane tab="交易黑名单" key="3">
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
                        </TabPane>
                    </Tabs>
                </Card>
                <Modal
                    width={370}
                    title="添加黑名单"
                    visible={this.state.showModaladdblack}
                    onOk={this.handleOk}
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
                            <Select defaultValue="0" style={{minWidth: 160}} onChange={this.handleChange}>
                                <Option value="0">合规黑名单</Option>
                                <Option value="1">开户黑名单</Option>
                                <Option value="2">交易黑名单</Option>
                            </Select>
                        </div>
                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{minWidth: 100}}>类型：</span>
                            <Input defaultValue={this.state.NameCn}
                                   onChange={this.onChangelastNameCn}
                                   style={{minWidth: 160}} tagkey="lastNameCn"
                                   sdsd={'dd'}/>
                        </div>

                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{minWidth: 100}}>用户姓名：</span>
                            <Input defaultValue={this.state.NameCn}
                                   onChange={this.onChangelastNameCn}
                                   style={{minWidth: 160}} tagkey="lastNameCn"
                                   sdsd={'dd'}/>
                        </div>

                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{minWidth: 100}}>手机号码：</span>
                            <Input defaultValue={this.state.phoneCn}
                                   onChange={this.onChangePhone}
                                   style={{minWidth: 160}}
                                   sdsd={'dd'}
                            />
                        </div>


                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{minWidth: 100}}>操作备注</span>
                            <TextArea style={{minWidth: 160}}
                                      value={this.state.changeNoteV}
                                      rows={4}
                                      onChange={(e) => {
                                          this.setState({
                                              changeNoteV: e.target.value,
                                          });
                                      }}/>
                        </div>

                    </Card>
                </Modal>

            </div>

        )
    }

    handleOk = (e) => {
        let me = this
        if (!me.state.changeNoteV) {
            message.error('備註必填')
            return
        }
        // window.Axios.post('auth/addBlackUser', {
        //     'content': me.state.changeNoteV,
        //     'id': me.state.recordData.id,
        //     'listType': 2,//1:合规 2:开户 3:交易
        // }).then(function (response) {
        //     if (response.data.code === 1) {
        //         // notification.close(key)
        //         message.success('added  open  black')
        //     }
        // });
    }
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }
}

