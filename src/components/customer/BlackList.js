import React, {Component} from 'react';
import {DatePicker, Input, Modal, Button, Table, Tabs, message, Card, Tag, Layout, Icon} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {ThemePicker} from '@/components/widget';
import classNames from "classnames";

const TabPane = Tabs.TabPane;
const {CheckableTag} = Tag;
const {RangePicker} = DatePicker;

export default class BlackList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            // mTags: [],
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
            pgsize: 40,
            loadingA: false,
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
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                width: 150,
                fixed: 'left',
                render: (text, record) => (

                    <span>{record.mobile}</span>

                ),
            }, {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {
                title: '活跃度',
                dataIndex: '活跃度',
                key: '活跃度',
                render: (text, record) => (<span>{record.activeFlag}</span>),
            }, {
                title: 'APP注册时间',
                dataIndex: 'APP注册时间',
                key: 'APP注册时间',
                render: (text, record) => (<span>{record.date}</span>),
            }, {
                title: '操作人',
                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (<span>{record.operator}</span>),
            }, {
                title: '处理备注',
                dataIndex: '处理备注',
                key: '处理备注',
                render: (text, record) => (
                    <span>{record.comment}</span>),
            }, {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 100,
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
            selectTimeStart: '',
            selectTimeEnd: ''
        }, () => {
            self.searchSelect()
        })


    };
    requestPageA = () => {
        let self = this
        self.setState({
            loadingA: true
        })
        window.Axios.post('auth/getBlackList', {
            pageNo: this.state.current,
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
            }, () => {
                console.log('hcia self.state.bklistA', self.state.bklistA)
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
        window.Axios.post('auth/getBlackList', {
            pageNo: this.state.current,
            'listType': 2,//1:合规 2:开户 3:交易
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易
        }).then((response) => {
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
            loadingC: true
        })
        window.Axios.post('auth/getBlackList', {
            pageNo: this.state.current,
            'listType': 3,//1:合规 2:开户 3:交易
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易
        }).then((response) => {

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
            currentA: page,
        }, () => {
            this.requestPageA()
        })
    }
    changePageB = (page) => {
        this.setState({
            currentb: page,
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
        background: localStorage.getItem('@primary-color') || '#313653',
    }
    _switcherOn = () => {
        this.setState({
            switcherOn: !this.state.switcherOn
        })
    };
    _handleChangeComplete = color => {
        console.log(color);
        this.setState({background: color.hex});
        localStorage.setItem('@primary-color', color.hex);
        window.less.modifyVars({
            '@primary-color': color.hex,
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


        var selectTimeStart = value[0].unix()+'000'
        //1545275083
        //26582400000
        //27187200000
        var selectTimeEnd = value[1].unix()+'000'

        console.log('hcia selectTimeStart' , selectTimeStart)
        console.log('hcia selectTimeEnd' , selectTimeEnd)

        //1545448544000
        //1234567890123
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
                <div>nowKey :{this.state.nowKey}</div>
                <div>selectMail :{this.state.selectMail}</div>
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
                            <Input onChange={this.onChangePhone} style={{marginBottom: 5}} placeholder="手机号"/>
                            <Input onChange={this.onChangeID} style={{marginBottom: 5}} placeholder="身份证号"/>
                            <Input onChange={this.onChangeAccount} style={{marginBottom: 5}} placeholder="账户"/>
                            <Input onChange={this.onChangeKeyWord} style={{marginBottom: 5}} placeholder="关键词"/>
                            <RangePicker
                                showTime={{format: 'HH:mm'}}
                                format="YYYY-MM-DD HH:mm"
                                placeholder={['Start Time', 'End Time']}
                                onChange={this.onChangeDate}
                                onOk={this.onOk}
                            />

                            <Button onClick={() => this.searchSelect()} style={{marginTop: 10}} type="primary"
                                    icon="search">Search</Button>

                        </Card>


                    </div>
                </div>
                <BreadcrumbCustom first="用戶管理" second="黑名單"/>

                <Card>

                    <Tabs
                        onChange={this.callback}
                        type="card">
                        <TabPane tab="合规黑名单" key="1">
                            <Button
                                type="primary"
                                onClick={() => this.handleremoveList()}
                                disabled={!hasSelected}
                                loading={loading}
                            >
                                批量移除
                            </Button>
                            <Table rowKey="id"
                                   bordered
                                   rowSelection={rowSelection}
                                   columns={this.columns}
                                   dataSource={this.state.bklistA}
                                   scroll={{x: 1300}}
                                   loading={this.state.loading}
                                   pagination={{  // 分页
                                       total: this.state.totalpageA * this.state.pgsize,
                                       pageSize: this.state.pgsize,
                                       onChange: this.changePageA,
                                   }}
                            />
                        </TabPane>
                        <TabPane tab="开户黑名单" key="2">
                            <Table rowKey="id"
                                   columns={this.columns}
                                   dataSource={this.state.bklistB}
                                   scroll={{x: 1300}}
                                   loading={this.state.loading}
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
                                   loading={this.state.loading}
                                   pagination={{  // 分页
                                       total: this.state.totalpageC * this.state.pgsize,
                                       pageSize: this.state.pgsize,
                                       onChange: this.changePageC,
                                   }}
                            />
                        </TabPane>
                    </Tabs>
                </Card>


            </div>

        )
    }


}

