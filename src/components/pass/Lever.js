/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {message, Input, Button, Card, Table, Select, Modal, Popconfirm, Row, Col, Icon, DatePicker} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {bindActionCreators} from "redux";
import {addTodo} from "../../action";
import connect from "react-redux/es/connect/connect";
import classNames from "classnames";

const {TextArea} = Input;
const Option = Select.Option;
const {RangePicker} = DatePicker;

class Basic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            current: 0,
            pgsize: 20,
            modal2OPDAYVisible: false,
            visibleA: false,
            visibleB: false,
            user: '',
            userList: [],
            leavgeList: [{
                "id": 21,
                "status": 1,
                "clientGroupId": 404,
                "leverage": 100,
                "brokerCode": "BahamaIX",
                "maxBalance": 500000.0,
                "minBalance": 200001.0,
                "maxLots": null,
                "clientGroupName": "L_100",
                "delFlag": 0
            }, {
                "id": 22,
                "status": 1,
                "clientGroupId": 406,
                "leverage": 200,
                "brokerCode": "BahamaIX",
                "maxBalance": 200000.0,
                "minBalance": 100001.0,
                "maxLots": null,
                "clientGroupName": "L_200",
                "delFlag": 0
            }, {
                "id": 23,
                "status": 1,
                "clientGroupId": 405,
                "leverage": 300,
                "brokerCode": "BahamaIX",
                "maxBalance": 100000.0,
                "minBalance": 50001.0,
                "maxLots": null,
                "clientGroupName": "L_300",
                "delFlag": 0
            }, {
                "id": 24,
                "status": 1,
                "clientGroupId": 304,
                "leverage": 400,
                "brokerCode": "BahamaIX",
                "maxBalance": 50000.0,
                "minBalance": 0.0,
                "maxLots": null,
                "clientGroupName": "L_400",
                "delFlag": 0
            }, {
                "id": 25,
                "status": 0,
                "clientGroupId": 707,
                "leverage": 50,
                "brokerCode": "BahamaIX",
                "maxBalance": 0.0,
                "minBalance": 0.0,
                "maxLots": null,
                "clientGroupName": "L_50",
                "delFlag": 0
            }],
            detail: {
                "name": null,
                "id": "27",
                "date": "",
                "comment": null,
                "status": 0,
                "currentLeverage": "1 : 100",
                "targetLeverage": "1 : 200",
                "operator": null,
                "email": null,
                "mobile": null,
                "nationalId": null,
                "accountNo": "live545491475",
                "marginLevel": "N/A",
                "displayStatus": "审核中",
                "broker": null,
                "cashBalance": "0.0"
            },
            loading: false

        };
    }

    requestUserCommentList = (record) => {


        var self = this;
        window.Axios.post('/auth/getRecordCommentList', {
            id: record.id,
            commentType: 4,
            pageNo: this.state.currentComment,
            pageSize: this.state.pgsize,
        }).then(function (response) {
            self.setState({
                totalpageComments: response.data.data.totalPage,
                operationDiaryHistory: response.data.data.list,
            });
        });
    }
    showOPDAyModal2 = (recodrd) => {
        this.requestUserCommentList(recodrd)
        this.setState({
            modal2OPDAYVisible: true,
        });
    };
    requestPage = () => {

        let self = this
        self.setState({
                loading: true,
            }
        );
        window.Axios.post('finance/getLeverageApplyList', {
            'pageSize': self.state.pgsize,
            'pageNo': self.state.current,
            email: this.state.selectMail,
            mobile: this.state.selectPhoneF,
            nationalId: this.state.selectID,
            starClientAccount: this.state.starClientAccount,
            startTime: this.state.selectTimeStart,
            endTime: this.state.selectTimeEnd,
        }).then(function (response) {
            self.setState({
                    totalPage: response.data.data.totalPage,
                    loading: false,
                    userList: response.data.data.list
                }
            );
        })
    }
    changePage = (page) => {
        console.log('hcia page', page)
        this.setState({
            current: page - 1,
        }, () => {
            this.requestPage()
        })
    }

    componentDidMount() {

        window.Axios.post('back/addLogHistory', {
            'moduleLog': '审核管理',
            'pageLog': '杠杆审核',
            'commentLog': '查看了杠杆审核',
            'typeLog': 2,
        }).then(function (response) {


        });


        this.columnsLog =[
            {
                title: '时间',
                dataIndex: 'createDate',
                key: 'operationDiary_Date',
                align:'center',
                render: (text, record) => (
                    <span>{
                        this.timestampToTime(record.createDate)
                    }</span>),



            }, {
                title: 'IP',
                dataIndex: 'IP',
                key: 'IP',
                align:'center',

                render: (text, record) => (
                    <span>{record.ipAddress}</span>),
            }, {
                title: '操作人',
                align:'center',
                dataIndex: 'bkUserName',
                key: 'operationDiary_User',
                render: (text, record) => (
                    <span>{record.bkUserName}</span>),
            }, {
                title: '操作',
                align:'center',
                dataIndex: 'comment',
                key: 'operationDiary_Status',
                render: (text, record) => (
                    <span>{record.comment}</span>),
            }]
        let self = this

        window.Axios.post('dict/leverageList', {
            'keys': 'IX_Income,IX_Percentage,IX_FundsSource,IX_UStax,IX_Trading_Experience,IX_Trading_Objectives,IX_Risk_Tolerance,open_type_ix,account_type',
        }).then((response) => {
            console.log('hcia response', response)
            self.setState({
                leavgeList: response.data.data,
            })
        });

        this.columns = [
            {
                align: 'center',
                title: '申请序号',
                dataIndex: '申请序号',
                key: '申请序号',
                render: (text, record) => (
                    <span>{record.id}</span>),
            },
            {
                align: 'center',
                title: '手机号',
                dataIndex: '手机号',
                key: '手机号',
                render: (text, record) => (
                    <span>{record.mobile}</span>),
            },
            {
                align: 'center',
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }
            , {
                align: 'center',
                title: '邮箱地址',
                dataIndex: '邮箱地址',
                key: '邮箱地址',
                render: (text, record) => (
                    <span>{record.email}</span>),
            }
            , {
                align: 'center',
                title: '交易组',
                dataIndex: '交易组',
                key: '交易组',
                render: (text, record) => (
                    <span>{record.accountType}</span>),
            }, {
                align: 'center',
                title: '交易账号',
                dataIndex: '交易账号',
                key: '交易账号',
                render: (text, record) => (
                    <span>{record.accountNo}</span>),
            }, {
                align: 'center',
                title: '账号类型',
                dataIndex: '账号类型',
                key: '账号类型',
                render: (text, record) => (
                    <span>{record.broker}</span>),
            }, {
                align: 'center',

                title: '申请时间',
                dataIndex: '申请时间',
                key: '申请时间',

                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                align: 'center',

                title: '审核状态',
                dataIndex: '审核状态',
                key: '审核状态',
                render: (text, record) => (
                    <span>{record.displayStatus}</span>
                )

            }, {
                align: 'center',

                title: '操作人',
                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <div>
                        <Button size={'small'} style={{minWidth: 80, background: '#FDD000'}}  onClick={() => this.showOPDAyModal2(record)}>日志</Button>
                        <Button  size={'small'} style={{minWidth: 80, background: '#FDD000', display:record.displayStatus=='审核通过'?'none':''}}  onClick={() => this.showModalB(record)}>审核</Button>
                        <Button  size={'small'}  style={{minWidth: 80, background: '#FDD000',display:record.displayStatus!='审核通过'?'none':''}} onClick={() => this.showModalA(record)}>已审核</Button>
                    </div>
                ),
            }];
        this.requestPage()

    }

    changePageComment = (page) => {
        page = page - 1
        this.setState({
            currentComment: page,
        }, () => {
            this.requestUserCommentList()
        })
    }
    seeDetail = () => {
        const {addTodo} = this.props;
        console.log('hcia seeDetail')
        addTodo('a')

    }
    showModalA = (recodrd) => {
        this.requestUserCommentList(recodrd)

        let self = this

        self.setState({
            loading: true,
        });

        window.Axios.post('finance/getLeverageApplyDetail', {
            'id': recodrd.id,
        }).then(function (response) {
            console.log('hcia response', response)

            self.setState({
                detail: response.data.data,
                visibleA: true,
                loading: false,
            });

        });


    }
    showModalB = (recodrd) => {
        this.requestUserCommentList(recodrd)

        let self = this
        self.setState({
            loading: true,
        });

        window.Axios.post('finance/getLeverageApplyDetail', {
            'id': recodrd.id,
        }).then(function (response) {
            console.log('hcia response', response)

            self.setState({
                detail: response.data.data,
                visibleB: true,
                loading: false,

            });

        });


    }


    handleOk = () => {
        let self = this
        window.Axios.post('finance/passLeverageApply', {
            'id': this.state.detail.id,
            'content': this.state.detail.comment,
        }).then(function (response) {


            if (response.data.code == 1) {
                message.success('操作成功')
                self.requestPage()
            }
            self.setState({
                visibleB: false,
            });
        });
    }

    handleCancel = (e) => {
        this.setState({
            visibleA: false,
            visibleB: false,
        });
    };

    handleReject = (e) => {
        let self = this

        window.Axios.post('finance/cancelLeverageApply', {
            'id': this.state.detail.id,
            'content': this.state.detail.comment,
        }).then(function (response) {


            if (response.data.code == 1) {
                message.success('操作成功')
                self.requestPage()
            }
            self.setState({
                visibleB: false,
            });


        });
    };

    changeNote = (e) => {
        this.setState({
            detail: {...this.state.detail, comment: e.target.value},
        });

    }
    onChangeLe = (value) => {
        // updateLeverageApply
        let self = this

        console.log('hcia value', value)
        window.Axios.post('finance/updateLeverageApply', {
            id: this.state.detail.id,
            leverageId: value,
        }).then((response) => {
            console.log('hcia response', response)
            // self.setState({
            //     leavgeList: response.data.data,
            // })
        });


    }
    _switcherOn = () => {
        this.setState({
            switcherOn: !this.state.switcherOn
        })
    };

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

    render() {
        const gridStyle = {
            width: '50%',
            textAlign: 'center',
        };
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

                            <Button onClick={() => this.requestPage()} style={{marginTop: 15}} type="primary"
                                    icon="search">Search</Button>

                        </Card>


                    </div>
                </div>
                {/*{JSON.stringify(this.props.todps)}*/}
                <Modal
                    width={500}
                    title={this.state.modeState == '正常' ? '恢复正常' : this.state.modeState}
                    onCancel={this.handleCancel}
                    visible={this.state.visibleB}

                    footer={[
                        <Popconfirm title="确认？" onConfirm={this.handleOk}
                                    okText="Yes"
                                    cancelText="No">
                            <Button type="normal" key="submit">通過</Button>
                        </Popconfirm>,
                        <Popconfirm title="拒绝？"
                                    onConfirm={this.handleReject} e
                                    okText="Yes"
                                    cancelText="No">
                            <Button type="normal" key="back">拒絕</Button>
                        </Popconfirm>
                    ]}
                >
                    <Card

                        title={'账户：' + this.state.detail.accountNo}
                        bordered={true}>

                        <div>
                            <Row style={{marginTop: 20}}>
                                <Col style={{textAlign: 'right'}} span={10}>当前杠杆:</Col>
                                <Col style={{textAlign: 'center'}} span={14}>{this.state.detail.targetLeverage}</Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col style={{textAlign: 'right'}} span={10}>余额:</Col>
                                <Col style={{textAlign: 'center'}} span={14}>{this.state.detail.cashBalance}</Col>
                            </Row>

                            <Row style={{marginTop: 20}}>
                                <Col style={{textAlign: 'right'}} span={10}>杠杆修改:</Col>
                                <Col style={{textAlign: 'center'}} span={14}>
                                    <Select
                                        onChange={this.onChangeLe}
                                        defaultValue={this.state.detail.targetLeverage}
                                        style={{width: 100, marginLeft: 0}}>
                                        {this.state.leavgeList.map(ccty => <Option
                                            value={ccty.id} key={ccty.leverage}>1:{ccty.leverage}</Option>)}
                                    </Select>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col style={{textAlign: 'right'}} span={10}>保证金占比:</Col>
                                <Col style={{textAlign: 'center'}} span={14}>{this.state.detail.marginLevel}</Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col span={24}>处理备注：</Col>
                                <Col style={{marginTop: 20}} span={24}>
                                <TextArea value={this.state.detail.comment}
                                          onChange={this.changeNote}
                                          rows={4}></TextArea>
                                </Col>
                            </Row>

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
                        </div>
                    </Card>


                </Modal>
                <Modal
                    title="详情查看"
                    onCancel={this.handleCancel}
                    visible={this.state.visibleA}
                    footer=''
                >

                    <Card bordered={false}>
                        <h3>当前杠杆 :{this.state.detail.currentLeverage}</h3>
                        <h3>余额 :{this.state.detail.cashBalance}</h3>
                        <h3>杠杆修改 :{this.state.detail.targetLeverage}</h3>
                        <h3>保证金占比:{this.state.detail.marginLevel}</h3>
                        <div>
                            <h3>处理备注：</h3>
                            <TextArea value={this.state.detail.comment} rows={4}></TextArea>
                        </div>
                    </Card>

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
                <h2 style={{marginTop: 15}}>
                    杠杆审核
                </h2>
                <BreadcrumbCustom first="审核管理" second="杠杆审核"/>


                <Card title="杠杆审核"
                      bodyStyle={{padding: 0, margin: 0}}
                >

                    <Table rowKey="id"

                           columns={this.columns}
                           dataSource={this.state.userList}
                           scroll={{x: 1600}}
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
                    title="查看操作日志"
                    visible={this.state.modal2OPDAYVisible}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                            modal2OPDAYVisible: false,
                        });
                    }}
                    width={800}
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
}

const mapStateToProps = state => {
    const todps = state.todos;
    return {todps};
};
const mapDispatchToProps = dispatch => ({
    addTodo: bindActionCreators(addTodo, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Basic);


