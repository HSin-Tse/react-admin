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
            , mStockRecordBEn: false
            , modal2OPDAYVisible: false
            , mStockRecordStatus: 0
            , isCanOP: 0
            , current: 0
            , searchPhone: ''
            , mStockRecord: {
                status: 1,
                ben: false
            }
            , totalPage: 1
            , pgsize: 10

        };
        // console.log('hcia  this.props', this.props)

    }

    handleSearch = (selectedKeys, confirm) => () => {
        confirm();
        this.setState({searchPhone: selectedKeys[0]});
    }

    handleReset = clearFilters => () => {
        clearFilters();
        this.setState({searchPhone: ''});
    }
    // sda = setInterval(() => {
    //     // console.log('hcia setInterval')
    //     // this.requestData()
    //     // this.requestPageWinoRe()
    //
    //
    // }, 5000)
    handleKeyPressOOP = (event) => {
        // console.log('hcia event' , event)
        if (event.metaKey || event.ctrlKey) {
            if (event.key === 'o' || event.key === 'ㄅ') {
                this.setState({
                    switcherOn: !this.state.switcherOn
                })
            }
        }
    }

    componentWillUnmount() {
        // clearInterval(this.sda);
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


        this.columnsLog = [
            {
                title: '时间',
                dataIndex: 'createDate',
                key: 'operationDiary_Date',
                render: (text, record) => (
                    <span>{
                        this.timestampToTime(record.createDate)
                    }</span>),
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
            }]

        document.addEventListener("keydown", this.handleKeyPressOOP, false);


        var self = this;


        if (localStorage.getItem('infor')) {


            var menuInfor = JSON.parse(localStorage.getItem('infor'))


            if (menuInfor.superFlag === 1) {
                self.setState({
                    availableFlag: true,
                    isCanOP: 1
                });
            } else {
                var isCanOp = menuInfor.menuList.find((item) => {
                    // console.log('hcia  this.props', this.props)
                    return this.props.tk === item.key;
                });

                // console.log('hcia isCanOp', isCanOp.availableFlag)
                // console.log('hcia isCanOp', isCanOp.availableFlag)
                self.setState({
                    availableFlag: isCanOp.availableFlag === 1,
                    isCanOP: isCanOp.availableFlag
                });
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
                width: 150,
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
                        <Button disabled={!this.state.availableFlag} size={'small'}
                                style={{minWidth: 80, background: record.displayStatus == '已授权' ? '' : '#FDD000'}}
                                onClick={() => this.handleAmStok(record)}>{record.displayStatus}</Button>
                    </div>
                ),
            }];
        this.requestPage()
    }

    requestUserCommentList = (record) => {


        var self = this;
        window.Axios.post('/auth/getRecordCommentList', {
            id: record.id,
            commentType: 2,
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
        this.requestUserCommentList(recodrd)
        this.setState({
            modal2OPDAYVisible: true,
        });
    };

    handleEdit = (record) => {

        if (!this.state.availableFlag) {
            this.props.history.push('/app/pass/passopen/user' + record.id)
            return
        }


        // if (this.state.availableFlag) {
        //     this.props.history.push('/app/pass/passopen/detail' + record.id)
        //     return
        // }


        // !this.state.availableFlag?'查看'


        var gogo = record.status === 0 ? 'detail' : (record.status === 1) ? 'user' : 'user'
        this.props.history.push('/app/pass/passopen/' + gogo + record.id)


    };


    handleAmStok = (record) => {
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
        page = page - 1
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
                {/*<div>this.state.availableFlag :{JSON.stringify(this.state.availableFlag)}</div>*/}
                {/*<div>isCanOP :{this.state.isCanOP}</div>*/}
                {/*<div>searchPhone query :{JSON.stringify(this.state.searchPhone)}</div>*/}
                {/*{JSON.stringify(this.props.todps)}*/}
                <h2 style={{marginTop: 15}}>
                    {/*开户审核{this.state.availableFlag}*/}
                    开户审核
                    {/*{this.state.availableFlag ? 'W' : 'R'}*/}
                </h2>
                <BreadcrumbCustom first="审核管理" second="开户审核"/>
                <Card bodyStyle={{padding: 0, margin: 0}}
                      title={'开户审核'}>
                    <Table rowKey="id"
                           columns={this.columns}
                           dataSource={this.state.userList}
                           scroll={{x: 1500}}
                           bordered
                           loading={this.state.loading}
                           pagination={{
                               total: this.state.pgsize * this.state.totalPage,
                               pageSize: this.state.pgsize,
                               onChange: this.changePage,
                           }}
                    />
                </Card>

                <Modal
                    title="美股授权审核"
                    visible={this.state.showAmeStockModla}
                    onOk={this.handleOk}
                    okType={((this.state.mStockRecordStatus == 1) && this.state.mStockRecordBEn) ? 'primary' : 'dashed'}
                    onCancel={(e) => {
                        this.setState({
                            showAmeStockModla: false,
                        });
                    }}
                >

                    <Card bordered={true}>
                        {/*record.status*/}
                        <div style={{display: 'flex', minHeight: 40, align: 'center'}}>


                            <Checkbox checked={this.state.mStockRecordStatus == 1}>已确认可以已正常开户</Checkbox>


                        </div>
                        <div style={{display: 'flex', minHeight: 40, align: 'center'}}>

                            <Checkbox

                                checked={this.state.mStockRecordBEn}

                                onChange={(e) => {

                                    console.log('hcia e.target.checked', e.target.checked)
                                    this.setState({
                                        mStockRecordBEn: e.target.checked,
                                    });
                                }}>已审核客户回传的W-8BEN表单</Checkbox>
                        </div>


                    </Card>
                </Modal>
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
                                    self.requestPage()
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

                            <Button onClick={() => this.requestPage()} style={{marginTop: 15}} type="primary"
                                    icon="search">Search</Button>

                        </Card>


                    </div>
                </div>
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
                           columns={this.columnsLog}
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

    changePageComment = (page) => {
        page = page - 1
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
                belongUserId: this.state.mStockRecord.belongUserId,
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