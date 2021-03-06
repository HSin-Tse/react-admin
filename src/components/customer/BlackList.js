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
    timestampToTime = (timestamp) => {
        const dateObj = new Date(+timestamp)
        const year = dateObj.getFullYear()
        const month = dateObj.getMonth() + 1
        const date = dateObj.getDate()
        const hours = this.pad(dateObj.getHours())
        const minutes = this.pad(dateObj.getMinutes())
        const seconds = this.pad(dateObj.getSeconds())
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
    };
    pad = (str) => {
        return +str >= 10 ? str : '0' + str
    };

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
            pgsize: 20,
            loadingA: false,
            showModaladdblack: false,
            modal2OPDAYVisible: false,
            modal3OPDAYVisible: false,
            loadingB: false,
            loadingC: false,
            modal2Visible1: false,
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
            addBlackType: "2",
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
        // page = page - 1
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


        window.Axios.post('/auth/addOperatorLogHistory', {
            moduleLog: '用户管理',
            pageLog: '黑名单',
            commentLog: '黑名单',
            typeLog: '2',
        })


        document.addEventListener("keydown", this.handleKeyPress, false);

        this.setState({
            nowKey: this.props.pg,
        })


        this.columnsA = [
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
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.showOPDAyModal3(record)}>备注</Button>
                    </div>
                ),
            }



        ];
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
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.showOPDAyModal3(record)}>备注</Button>
                    </div>
                ),
            }, {
                title: '操作',

                align: 'center',
                key: 'action',
                render: (text, record) => (
                    <div>
                        {/*<Button  size={'small'} style={{minWidth: 80, background: '#FDD000'}} onClick={() => this.showOPDAyModal2(record)}>日志</Button>*/}

                        <Popconfirm title="移除?" onConfirm={() => this.handleremove(record)} okText="Yes"
                                    cancelText="No">
                            <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}>移除</Button>
                        </Popconfirm>
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

        });
    }
    requestPageAS = () => {
        let self = this;
        self.setState({
            loadingA: true
        })
        window.Axios.post('auth/getBlackList', {
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
    requestPageBS = () => {
        let self = this

        self.setState({
            loadingB: true
        })
        window.Axios.post('auth/getBlackList', {
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
    requestPageCS = () => {
        let self = this
        self.setState({
            loadingC: true
        })
        window.Axios.post('auth/getBlackList', {
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
        // page = page - 1
        this.setState({
            currentA: page,
        }, () => {
            this.requestPageA()
        })
    }
    changePageB = (page) => {
        // page = page - 1

        this.setState({
            currentB: page,
        }, () => {
            this.requestPageB()
        })
    }
    changePageC = (page) => {
        // page = page - 1

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
        this.setState({selectedRowKeys});
    }

    _switcherOn = () => {
        this.setState({
            switcherOn: !this.state.switcherOn
        })
    };


    searchSelectS = () => {
        this.requestPageAS()
        this.requestPageBS()
        this.requestPageCS()
    }
    searchSelect = () => {
        this.requestPageA()
        this.requestPageB()
        this.requestPageC()
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
        var self = this

        return (
            <div>
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
                                    self.searchSelect()
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
                            }} style={{marginBottom: 10}} placeholder="交易账号"/>
                            <RangePicker

                                showToday
                                style={{width: '100%'}}
                                showTime={{format: 'YYYY-MM-DD HH:mm:ss'}}
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder={['开始时间', '结束时间']}
                                onChange={(value, dateString) => {
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

                            <Button onClick={() => this.searchSelectS()} style={{marginTop: 15}} type="primary"
                                    icon="search">Search</Button>

                        </Card>


                    </div>
                </div>
                <h2 style={{marginTop: 15}}>
                    黑名单
                </h2>
                <Modal
                    bodyStyle={{
                        background: 'white',
                        padding: 0,
                        margin: 0,
                    }}
                    width={370}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                            modal2Visible1: false,
                        });
                    }}
                    closable={false}
                    footer={null}
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
                            }}>{'添加黑名单'}
                            </span>
                        </div>
                        <Card bordered={true}>
                            <div style={{display: 'flex', minHeight: 40}}>
                                <span style={{minWidth: 100}}>类型：</span>
                                <Select value={this.state.addBlackType} style={{minWidth: 160}}
                                        onChange={(value) => {

                                            this.setState({
                                                addBlackType: value
                                            })
                                        }}>
                                    {/*<Option value="1">合规黑名单</Option>*/}
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

                        <div style={{
                            marginLeft: "20px", marginRight: "20px",
                            paddingBottom: '48px',
                            paddingTop: '48px',
                            justifyContent: 'space-between',
                            display: 'flex'
                        }}>

                            <Button

                                onClick={this.handleADdBlackListByType}
                                style={{
                                    borderRadius: '4px',
                                    background: '#F6D147',
                                    width: '180px',
                                    height: '40px'
                                }}> 提交 </Button>
                            <Button onClick={(e) => {
                                this.setState({
                                    modal2Visible1: false,
                                });
                            }} style={{borderRadius: '4px', width: '180px', height: '40px'}}> 取消 </Button>

                        </div>


                    </div>


                </Modal>

                <BreadcrumbCustom first="用户管理" second="黑名单"/>
                <Tabs
                    activeKey={this.state.nowKey}
                    onChange={this.callback}
                    type="card">
                    <TabPane type={'primary'} tab="合规黑名单" key="1">


                        <Card
                            bodyStyle={{padding: 0, margin: 0}}
                            title={'合规黑名单'}


                        >

                            <Table rowKey="id"
                                   bordered
                                // rowSelection={rowSelection}
                                   columns={this.columnsA}
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
                                    modal2Visible1: true,
                                });
                            }}>添加黑名单</Button>}
                        >
                            <Table rowKey="id"

                                   bordered

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
                                    modal2Visible1: true,
                                });
                            }}>添加黑名单</Button>}
                        >
                            <Table rowKey="id"
                                   bordered

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
                                {/*<Option value="1">合规黑名单</Option>*/}
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
                                       <span>{self.timestampToTime(record.createDate)}</span>),
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
                               }

                               , {
                                   title: '操作',
                                   dataIndex: 'comment',
                                   key: 'operationDiary_Status',
                                   render: (text, record) => (
                                       <span>{record.comment}</span>),
                               }]

                           }
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
                                       <span>{self.timestampToTime(record.createDate)}</span>),
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

        //
        // window.Axios.post('back/addLogHistory', {
        //     'moduleLog': '用户管理',
        //     'pageLog': '黑名单',
        //     'commentLog': '添加黑名单',
        //     'typeLog': 3,
        // });

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

