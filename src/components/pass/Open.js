/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, Input, Card, Modal, Checkbox, message, Icon, DatePicker} from 'antd';


import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import classNames from "classnames";

const {RangePicker} = DatePicker;

class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            , userList: []
            , loading: false
            , showAmeStockModla: false
            , availableFlag: false
            , availableJeffFlag: false
            , mStockRecordBEn: false
            , modal2OPDAYVisible: false
            , mStockRecordStatus: 0
            , isCanOP: 0
            , current: 1
            , searchPhone: ''
            , refID: ''
            , mStockRecord: {
                status: 1,
                ben: false
            }
            , totalPage: 1
            , pgsize: 20

        };

    }

    handleSearch = (selectedKeys, confirm) => () => {
        confirm();
        this.setState({searchPhone: selectedKeys[0]});
    }

    handleReset = clearFilters => () => {
        clearFilters();
        this.setState({searchPhone: ''});
    }
    handleKeyPressOOP = (event) => {
        if (event.metaKey || event.ctrlKey) {
            if (event.key === 'o' || event.key === 'ㄅ') {
                this.setState({
                    switcherOn: !this.state.switcherOn
                })
            }
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPressOOP, false);
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
            moduleLog: '审核管理',
            pageLog: '开户审核',
            commentLog: '开户审核',
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

        document.addEventListener("keydown", this.handleKeyPressOOP, false);


        var self = this;


        if (localStorage.getItem('infor')) {


            var menuInfor = JSON.parse(localStorage.getItem('infor'))

            if (menuInfor.superFlag === 1) {

                console.log('hcia menuInfor.superFlag', menuInfor.superFlag)
                self.setState({
                    availableFlag: true,
                    isCanOP: 1
                });
            } else {


                var isCanOp = menuInfor.menuList.find((item) => {
                    return this.props.tk === item.key;
                });

                self.setState({
                    availableFlag: isCanOp.availableFlag === 1,
                });


                var isCanOpJ = menuInfor.menuList.find((item) => {
                    // console.log('hcia  this.props', this.props)
                    return 'LIVE_ACCOUNT_MGMT' === item.key;
                });


                if (isCanOpJ != undefined) {

                    console.log('hcia isCanOpJ  in', isCanOpJ)
                    self.setState({
                        availableJeffFlag: true,
                    });
                } else {


                }
            }


        }

        this.columns = [
            {
                title: '申请序号',
                dataIndex: '申请序号',
                align: 'center',

                key: '申请序号',
                render: (text, record) => (<span>{record.id}</span>),
            },
            {
                title: '手机号',
                align: 'center',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                onFilter: (value, record) => {
                    return record.phoneNumber.includes(value)
                },
                filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={ele => this.searchInput = ele}
                            placeholder="Search name"
                            value={selectedKeys[0]}
                            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={this.handleSearch(selectedKeys, confirm)}
                        />
                        <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Search</Button>
                        <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
                    </div>
                ),
                render: (text, record) => (
                    <span>{record.phoneNumber}</span>),
            }, {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
                render: (text, record) => (
                    <span>{record.cnName}</span>),
            }, {
                title: '账户类型',
                dataIndex: '账户类型',
                align: 'center',

                key: '账户类型',
                render: (text, record) => (
                    <span>{record.displayApplyType}</span>),
            }, {
                align: 'center',
                width: 80,
                title: '申请时间',
                dataIndex: '申请时间',
                key: '申请时间',
                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                title: '身份证号',
                dataIndex: '身份证号',
                key: '身份证号',
                align: 'center',

                render: (text, record) => (
                    <span>{record.nationalID}</span>),
            }, {
                title: '邮箱地址',
                dataIndex: '邮箱地址',
                key: '邮箱地址',
                align: 'center',

                render: (text, record) => (
                    <span>{record.email}</span>),
            }, {
                title: '审核状态',
                dataIndex: '审核状态',
                align: 'center',
                filters: [
                    {text: '审核中', value: 0},
                    {text: '审核通过', value: 1},
                    {text: '审核拒绝', value: 2},
                ],
                onFilter: (value, record) => record.status == value,
                key: '审核状态',
                render: (text, record) => (
                    <span>{record.status == 0 ? '审核中' : (record.status == 1) ? '审核通过' : '审核拒绝'}</span>),
            }, {
                title: '处理人',
                dataIndex: '处理人',
                align: 'center',

                key: '处理人',
                render: (text, record) => (
                    <span>{record.operator}</span>),
            }, {
                title: '操作',
                key: '操作',
                align: 'center',
                render: (text, record) => (
                    <div style={{}}>
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}
                                onClick={() => this.showOPDAyModal2(record)}>日志</Button>
                        <Button
                            size={'small'} style={{
                            minWidth: 80,
                            background: !this.state.availableFlag ? '' : record.status == 0 ? '#FDD000' : ''
                        }}
                            onClick={() => this.handleEdit(record)}>{!this.state.availableFlag ? '查看' : record.status == 0 ? '审核' : (record.status == 1) ? '查看' : '查看'}
                        </Button>
                        <Button disabled={!this.state.availableFlag || record.displayStatus == '已授权'} size={'small'}
                                style={{minWidth: 80, background: record.displayStatus == '已授权' ? '' : '#FDD000'}}
                                onClick={() => this.handleAmStok(record)}>{record.displayStatus}</Button>
                    </div>
                ),
            }];
        this.requestPage()
    }

    requestUserCommentList = (record) => {


        var self = this;

        window.Axios.post('/back/getLogOpenAccountAudit', {
            referKey: this.state.refID,
            pageNo: this.state.currentComment,
            pageSize: this.state.pgsize,
        }).then(function (response) {
            self.setState({
                totalpageComments: response.data.data.totalPage,
                operationDiaryHistory: response.data.data.list,
            });
        });

    }
    _switcherOn = () => {
        this.setState({
            switcherOn: !this.state.switcherOn
        })
    };
    showOPDAyModal2 = (recodrd) => {


        this.setState({
            currentComment: 0,
            modal2OPDAYVisible: true,
            refID: recodrd.id,
        }, () => {
            this.requestUserCommentList(recodrd)

        });
    };

    handleEdit = (record) => {


        var op = !this.state.availableFlag ? '点击查看' : record.status == 0 ? '点击审核' : (record.status == 1) ? '点击查看' : '点击查看'
        // window.Axios.post('back/addLogOpenAccountAudit', {
        //     referKey: record.id,
        //     commentLog: op,
        //     // mobile: this.state.phoneCn,
        //     // content: this.state.changeNoteV,
        // })

        if (this.state.isCanOP == 1) {
            this.props.history.push('/app/pass/passopen/detail' + record.id)
            return
        }

        if (this.state.availableJeffFlag     ) {

           var ssdsd =  record.status == 0 ? 'passopen': 'passopenrs'

            this.props.history.push('/app/pass/'+ssdsd+'/detail' + record.id)
            return
        }


        if (!this.state.availableFlag) {
            this.props.history.push('/app/pass/passopen/user' + record.id)
            return
        }


        // if (this.state.availableFlag) {
        //     this.props.history.push('/app/pass/passopen/detail' + record.id)
        //     return
        // }


        var gogo = record.status === 0 ? 'detail' : (record.status === 1) ? 'user' : 'user'
        this.props.history.push('/app/pass/passopen/' + gogo + record.id)


    };


    handleAmStok = (record) => {

        // window.Axios.post('back/addLogOpenAccountAudit', {
        //     referKey: record.id,
        //     commentLog: "美股授权",
        //     // mobile: this.state.phoneCn,
        //     // content: this.state.changeNoteV,
        // })


        let self = this
        self.setState({

                mStockRecord: record,
                mStockRecordBEn: false,
                mStockRecordStatus: record.status,
            },
            () => {
                self.setState({
                        showAmeStockModla: true,
                    }
                );

            }
        );


    };


    requestPageWinoRe = () => {
        let self = this
        window.Axios.post('open/getOpenApplyList', {
            'pageSize': this.state.pgsize,
            'pageNo': this.state.current,
            email: this.state.selectMail,
            mobile: this.state.selectPhoneF,
            nationalId: this.state.selectID,
            starClientAccount: this.state.starClientAccount,
            startTime: this.state.selectTimeStart,
            endTime: this.state.selectTimeEnd,
        }).then((response) => {

            self.setState({
                    totalPage: response.data.data.totalPage,
                    loading: false,
                    userList: response.data.data.list
                }
            );

        })
    }

    requestPageS = () => {
        let self = this
        self.setState({
                loading: true,
                showAmeStockModla: false,
            }
        );
        window.Axios.post('open/getOpenApplyList', {
            'pageSize': this.state.pgsize,
            email: this.state.selectMail,
            mobile: this.state.selectPhoneF,
            nationalId: this.state.selectID,
            starClientAccount: this.state.starClientAccount,
            startTime: this.state.selectTimeStart,
            endTime: this.state.selectTimeEnd,
        }).then((response) => {

            self.setState({
                    totalPage: response.data.data.totalPage,
                    loading: false,
                    userList: response.data.data.list
                }
            );

        })
    }
    requestPage = () => {
        let self = this
        self.setState({
                loading: true,
                showAmeStockModla: false,
            }
        );
        window.Axios.post('open/getOpenApplyList', {
            'pageSize': this.state.pgsize,
            'pageNo': this.state.current,
            email: this.state.selectMail,
            mobile: this.state.selectPhoneF,
            nationalId: this.state.selectID,
            starClientAccount: this.state.starClientAccount,
            startTime: this.state.selectTimeStart,
            endTime: this.state.selectTimeEnd,
        }).then((response) => {

            self.setState({
                    totalPage: response.data.data.totalPage,
                    loading: false,
                    userList: response.data.data.list
                }
            );

        })
    }

    changePage = (page) => {
        // page = page - 1
        console.log('hcia page', page)
        this.setState({
            current: page,
        }, () => {

            this.requestPage()

        })
    }


    render() {

        var self = this
        return (
            <div>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}


                <h2 style={{marginTop: 15}}>
                    开户审核
                    {/*{this.state.availableFlag ? 'W' : 'R'}*/}
                </h2>
                <BreadcrumbCustom first="审核管理" second="开户审核"/>
                <Card bodyStyle={{padding: 0, margin: 0}}
                      extra={
                          <Button type="default"
                                  onClick={() => this.requestPage()}>刷新
                          </Button>
                      }
                      title={'开户审核'}>
                    <Table
                        titleStyle={{whiteSpace: 'nowrap'}}
                        bodyStyle={{whiteSpace: 'nowrap'}}
                        style={{whiteSpace: 'nowrap'}}
                        rowKey="id"
                        columns={this.columns}
                        dataSource={this.state.userList}
                        scroll={{x: 1600}}
                        bordered
                        loading={this.state.loading}
                        pagination={{
                            showQuickJumper: true,
                            total: this.state.pgsize * this.state.totalPage,
                            pageSize: this.state.pgsize,
                            onChange: this.changePage,
                        }}
                    />
                </Card>
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
                                    selectMail: '',
                                    selectID: '',
                                    startTime: '',
                                    selectPhoneF: '',
                                    starClientAccount: '',
                                    selectTimeStart: '',
                                    selectTimeEnd: '',
                                    filterTimeFalue: null
                                }, () => {
                                    self.requestPage()
                                })
                            }}
                            >清除条件</Button>}
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

                            {/*<Input value={this.state.starClientAccount} onChange={(e) => {*/}
                                {/*this.setState({*/}
                                    {/*starClientAccount: e.target.value,*/}
                                {/*});*/}
                            {/*}} style={{marginBottom: 10}} placeholder="账户"/>*/}
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

                            <Button onClick={() => this.requestPageS()} style={{marginTop: 15}} type="primary"
                                    icon="search">Search</Button>

                        </Card>


                    </div>
                </div>
                <Modal
                    bodyStyle={{
                        background: 'white',
                        padding: 0,
                        margin: 0,
                    }}

                    closable={false}
                    footer={null}
                    onCancel={this.handleCancel}
                    visible={this.state.showAmeStockModla}


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
                            }}>{'美股权限审核'}
                            </span>
                        </div>
                        <div style={{flexWrap: 'wrap', display: 'flex'}}>
                            <div style={{marginTop: '25px', width: 600, display: 'flex', justifyContent: 'center'}}>
                                <Checkbox
                                    style={{width: 250}}
                                    checked={this.state.mStockRecordStatus == 1}>已确认可以已正常开户</Checkbox>
                            </div>
                            <div style={{marginTop: '15px', width: 600, display: 'flex', justifyContent: 'center'}}>
                                <Checkbox
                                    style={{width: 250}}
                                    checked={this.state.mStockRecordBEn}
                                    onChange={(e) => {
                                        this.setState({
                                            mStockRecordBEn: e.target.checked,
                                        });
                                    }}>已审核客户回传的W-8BEN表单</Checkbox>
                            </div>


                        </div>
                        <div style={{
                            paddingBottom: '48px',
                            paddingTop: '48px',
                            justifyContent: 'space-around',
                            display: 'flex'
                        }}>

                            <Button
                                disabled={!((this.state.mStockRecordStatus == 1) && this.state.mStockRecordBEn)}
                                onClick={this.handleOk}
                                style={{background: '#F6D147', width: '180px', height: '40px'}}> 确认 </Button>
                            <Button onClick={(e) => {
                                this.setState({
                                    showAmeStockModla: false,
                                });
                            }} style={{width: '180px', height: '40px'}}> 取消 </Button>

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
                            modal2OPDAYVisible: false,
                        });
                    }}
                    closable={false}
                    footer={null}
                    // onCancel={this.handleCancel}
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
                            rowKey="id"
                            bordered
                            columns={this.columnsLog}
                            dataSource={this.state.operationDiaryHistory}
                            loading={this.state.loadingComment}
                            pagination={{
                                current: this.state.currentComment,
                                total: this.state.totalpageComments * this.state.pgsize,
                                pageSize: this.state.pgsize,
                                onChange: this.changePageComment,
                            }}
                        />


                    </div>


                </Modal>


            </div>

        )
    }

    changePageComment = (page) => {
        // page = page - 1
        this.setState({
            currentComment: page,
        }, () => {
            this.requestUserCommentList()
        })
    }
    handleOk = (e) => {

        if (((this.state.mStockRecordStatus == 1) && this.state.mStockRecordBEn)) {

            console.log('hcia this.state.mStockRecord', this.state.mStockRecord.id)
            console.log('hcia this.state.mStockRecord', this.state.mStockRecord.belongUserId)

            let self = this
            window.Axios.post('open/passUsStock', {
                id: this.state.mStockRecord.id,
                // mobile: this.state.phoneCn,
                // content: this.state.changeNoteV,
            }).then((response) => {
                self.requestPage()
                message.success('操作成功')
            });
        } else {
            message.error('檢查確定項')
        }


    }
}


const mapStateToProps = state => {
    const todps = state.todos;
    return {todps};
};
export default connect(mapStateToProps,)(Basic);