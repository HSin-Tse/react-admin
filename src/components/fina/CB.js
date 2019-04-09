/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, message, Modal, Card, Input, Icon} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";
import {CSVLink} from "react-csv";
import classNames from "classnames";
import EchartsViews from "../dashboard/EchartsViews";

const {TextArea} = Input;

class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            operationDiaryHistory: [],
            visible: false,
            visibleOpM: false,
            NoteModalVisible2: true,
            date: new Date(),
            userList: [],
            loading: false,
            modal2OPDAYVisible: false,
            searchPhone: '',
            theComment: '',
            theBelongUserId: '',
            totalPage: 1,
            modeState: 1,
            isCanOPA: false,
            isCanOPB: false,
            isCanOPC: false,
            isCanOPD: false,
            availableFlag: false,
            forbiddenValue: 0,
            current: 1,
            pgsize: 20,
            loadFor: false,

        };
    }


    requestUserCommentList = (record) => {
        var self = this;
        window.Axios.post('/auth/getRecordCommentList', {
            id: record.id,
            commentType: 6,
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
        var self = this
        let id = recodrd.id
        self.setState({
            theBelongUserId: id,
        });
        this.setState({
            modal2OPDAYVisible: true,
            theComment: '',
        });
    };

    componentDidMount() {


        this.columns = [

            {
                align: 'center',
                title: '渠道列表',
                dataIndex: '渠道列表',
                key: '渠道列表',
                render: (text, record) => (
                    <span>{record.orderNo}</span>),
            }, {

                title: '点击次数',
                dataIndex: '点击次数',
                key: '点击次数',
                render: (text, record) => (<span>{record.accountNo}</span>),
                align: 'center',
            }, {
                title: '浏览次数',
                dataIndex: '浏览次数',
                key: '浏览次数',
                render: (text, record) => (
                    <span>{record.name}</span>),
                align: 'center',
            }, {
                align: 'center',
                title: '下载次数',
                dataIndex: '下载次数',
                key: '下载次数',
                width: 100,
                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                align: 'center',
                title: '注册账号',
                dataIndex: '注册账号',
                key: '注册账号',
                render: (text, record) => (
                    <span>{record.channelName}</span>)
            }, {
                align: 'center',

                title: '新增开户数',
                dataIndex: '新增开户数',
                key: '新增开户数',
                render: (text, record) => (
                    <span>{record.accountCurrency}</span>),
            }, {
                align: 'center',
                title: '累计开户数',
                dataIndex: '累计开户数',
                key: '累计开户数',
                render: (text, record) => (
                    <span>{record.accountAmount}</span>),
            }, {
                align: 'center',
                title: 'DAU',
                dataIndex: 'DAU',
                key: 'DAU',
                render: (text, record) => (
                    <span>{record.broker}</span>),
            }, {
                align: 'center',
                title: 'MAU',
                dataIndex: 'MAU',
                key: 'MAU',
                render: (text, record) => (
                    <span>{record.execAmount}</span>
                )

            }, {
                align: 'center',
                title: '总用户',
                dataIndex: '总用户',
                key: '总用户',
                render: (text, record) => (
                    <span>{record.execCurrency}</span>)
            }

            , {
                align: 'center',
                title: '次日留存',
                dataIndex: '次日留存',
                key: '次日留存',
                render: (text, record) => (
                    <span>{record.rate}</span>)
            }, {
                align: 'center',
                title: '周留存',
                dataIndex: '周留存',
                key: '周留存',
                render: (text, record) => (
                    <span>{record.feeAmount}</span>)
            }, {
                align: 'center',
                title: '月留存',
                dataIndex: '月留存',
                key: '月留存',
                render: (text, record) => (
                    <span>{record.displayStatus}</span>)
            }];

        this.requestPage()
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
    changePageComment = (page) => {
        // page = page - 1
        this.setState({
            currentComment: page,
        }, () => {
            this.requestUserCommentList()
        })
    }
    forbitChange = (value) => {
        let self = this
        self.setState({
                forbiddenValue: value,
            }
        );
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

    requestPageR = () => {

        let self = this
        self.setState({
                loading: true,
            }
        );

        window.Axios.post('finance/getWithdrawHistory', {
            'pageSize': self.state.pgsize,

            merOrderNo: this.state.selectOrderNo,
            name: this.state.selectName,
            starClientAccount: this.state.accountNo,
            startTime: this.state.selectTimeStart,
            endTime: this.state.selectTimeEnd,


        }).then(function (response) {
            console.log(response);
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
            }
        );

        window.Axios.post('finance/getWithdrawHistory', {
            'pageSize': self.state.pgsize,
            'pageNo': self.state.current,
        }).then(function (response) {
            self.setState({
                    totalPage: response.data.data.totalPage,
                    loading: false,
                    userList: response.data.data.list
                }
            );
        })
    };


    changePage = (page) => {
        this.setState({
            current: page,
        }, () => {
            this.requestPage()
        })
    };
    refleshNowpage = () => {

        let self = this;
        var result = self.state.selectedRowKeys.map(Number);

        window.Axios.post('star/refreshStarLiveAccount', {
            idList: result,
        }).then(function (response) {
            self.setState({
                visibleOpM: false,
                loadFor: false,
            }, () => {
                self.requestPage()
            });
            message.success('操作成功');
            // To disabled submit button at the beginning.

        })


    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('hcia', 'selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    render() {
        return (
            <div>


                <h2 style={{marginTop: 15}}>
                    客维管理
                </h2>
                <BreadcrumbCustom first="营销管理" second="渠道管理" third={"客维主页"}/>

                <Card
                    style={{marginTop: 15}}
                    title="返佣账户"
                    bodyStyle={{padding: 0, margin: 0}}
                >


                    <div className="gutter-example button-demo">


                        <Card>
                            <h3>某某客维返佣账户</h3>

                            <div style={{marginTop: 15, display: 'flex', minHeight: 40, width: 200}}>
                                <span style={{minWidth: 100}}>总佣金：a</span>
                            </div>

                            <div style={{display: 'flex', minHeight: 40, width: 200}}>
                                <span style={{minWidth: 100}}>已返佣：b</span>
                            </div>
                            <div style={{display: 'flex', minHeight: 40, width: 200}}>
                                <span style={{minWidth: 100}}>未返佣：c</span>
                            </div>


                        </Card>

                    </div>
                </Card>
                <Card
                    style={{marginTop: 15}}
                    title="数据统计"

                    bodyStyle={{padding: 0, margin: 0}}

                    extra={[

                        <Button

                            onClick={() => {
                                this.props.history.push('/app/fina/editexrate')


                            }}>当日</Button>, <Button
                            // style={{background: '#F6D147'}}

                            onClick={() => {
                                this.props.history.push('/app/fina/editexrate')


                            }}>当周
                        </Button>, <Button

                            onClick={() => {
                                this.props.history.push('/app/fina/editexrate')


                            }}>当月</Button>,


                    ]}
                >


                    <div className="gutter-example button-demo">


                        <Card>
                            <div style={{display: 'flex', minHeight: 40, width: 200}}>
                                <span style={{minWidth: 100}}>总佣金$：</span>
                                <span style={{minWidth: 100}}>外汇交易量：</span>
                                <span style={{minWidth: 100}}>股票交易量：</span>
                                <span style={{minWidth: 100}}>净入金$：</span>
                                <span style={{minWidth: 100}}>新增直客数：</span>

                            </div>


                            <EchartsViews
                                style={{marginTop: 15}}
                            ></EchartsViews>


                        </Card>

                    </div>
                </Card>
                <Card
                    style={{marginTop: 15}}
                    title="我的状态"
                    bodyStyle={{padding: 0, margin: 0}}
                >

                    <Table

                        titleStyle={{whiteSpace: 'nowrap'}}
                        style={{whiteSpace: 'nowrap'}}
                        rowKey="id"

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


            </div>

        )
    }
}

const mapStateToProps = state => {
    const {auth = {data: {}}, responsive = {data: {}}} = state.httpData;
    return {auth, responsive};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Basic);
