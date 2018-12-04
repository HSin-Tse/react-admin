/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, Input, Select, Modal} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';

const Option = Select.Option;

export default class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            date: new Date(),
            userList: [],
            nodeList: [],
            loading: false,
            searchPhone: '',
            totalPage: 1,
            pgsize: 10,
            suspend_reason_type: [{
                "name": "无效的邮箱",
                "value": "1",
                "key": null,
                "parentCode": null,
                "parentName": null,
                "code": null
            }, {
                "name": "诈骗",
                "value": "2",
                "key": null,
                "parentCode": null,
                "parentName": null,
                "code": null
            }, {
                "name": "拒绝付款",
                "value": "3",
                "key": null,
                "parentCode": null,
                "parentName": null,
                "code": null
            }, {
                "name": "正在联系",
                "value": "4",
                "key": null,
                "parentCode": null,
                "parentName": null,
                "code": null
            }, {
                "name": "驳回",
                "value": "5",
                "key": null,
                "parentCode": null,
                "parentName": null,
                "code": null
            }, {
                "name": "等待处理文件",
                "value": "6",
                "key": null,
                "parentCode": null,
                "parentName": null,
                "code": null
            }, {"name": "不活跃", "value": "7", "key": null, "parentCode": null, "parentName": null, "code": null}]

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

    componentDidMount() {

        let self = this;
        window.Axios.post('dict/openDict', {
            'keys': 'suspend_reason_type',
        }).then(function (response) {
            console.log(response);

            self.setState({

                    // suspend_reason_type:response.data.data.suspend_reason_type
                }
            );


        }).catch(function (error) {
            console.log(error);
        });

        this.columns = [
            {
                title: '客户姓名',
                fixed: 'left',
                width: 100,
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {
                title: '账号',
                width: 150,

                dataIndex: '申请序号',
                key: '申请序号',
                render: (text, record) => (<span>{record.accountNo}</span>),
            }, {
                title: '账号类型',
                width: 150,

                dataIndex: '账号类型',
                key: '账号类型',
                render: (text, record) => (
                    <span>{record.broker}</span>),
            }, {
                title: '开户时间',
                dataIndex: '开户时间',
                key: '开户时间',
                width: 240,

                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                title: '保证金占比',
                dataIndex: '保证金占比',
                key: '保证金占比',
                width: 120,

                render: (text, record) => (
                    <span>{record.marginLevel}</span>)
            }, {
                title: '浮动余额',
                dataIndex: '浮动余额',
                key: '浮动余额',
                width: 120,

                render: (text, record) => (
                    <span>{record.cashBalance}</span>),
            }, {
                title: '账户净值',
                dataIndex: '账户净值',
                key: '账户净值',
                width: 120,

                render: (text, record) => (
                    <span>{record.netEquity}</span>),
            }, {
                title: '当前状态',
                dataIndex: '当前状态',
                key: '当前状态',
                width: 120,

                render: (text, record) => (
                    <span>{record.accountStatus == 1 ? '正常' : (record.accountStatus == 2) ? '禁止登陆' : '禁止交易'}</span>
                )

            }, {
                title: '备注',
                dataIndex: '备注',
                key: '备注',
                width: 120,

                render: (text, record) => (
                    <span>{record.comment}</span>)
            }, {
                title: '刷新时间',
                width: 140,

                dataIndex: '刷新时间',
                key: '刷新时间',
                render: (text, record) => (
                    <span>{record.lastUpdateDate}</span>)
            }, {
                title: '操作人',
                dataIndex: '操作人',
                width: 120,

                key: '操作人',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                title: '操作详情',
                dataIndex: '操作详情',
                fixed: 'right',

                width: 120,
                key: '操作详情',
                render: (text, record) => (
                    <Button className="ant-dropdown-link"
                            onClick={() => this.seeDetail(record)}>详情</Button>)
            }, {
                title: '操作',
                fixed: 'right',
                width: 120,
                key: 'action',
                // fixed: 'right',
                // width: 100,
                render: (text, record) => (
                    <div>
                        <span className="ant-divider"/>
                        <Button className="ant-dropdown-link"
                                onClick={() => this.handleEdit(record)}>{record.accountStatus == 1 ? '正常' : (record.accountStatus == 2) ? '禁止登陆' : '禁止交易'}</Button>
                    </div>
                ),
            }];
        this.nodeColumns = [
            {
                title: '日期',
                width: 140,
                dataIndex: '日期',
                key: '日期',
                render: (text, record) => (
                    <span>{this.timestampToTime(record.createDate)}</span>)
            },
            {
                title: '备注',
                dataIndex: '备注',
                key: '备注',
                width: 120,
                render: (text, record) => (
                    <span>{record.comment}</span>)
            }, {
                title: '操作人',
                dataIndex: '操作人',
                width: 120,
                key: '操作人',
                render: (text, record) => (
                    <span>{record.bkUserName}</span>)
            }];
        this.requestPage(1)
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
    seeDetail = (record) => {
        console.log('hcia record', record)

        //
        let self = this
        window.Axios.post('star/getStarLiveAccountCommentList', {
            'pageSize': 100,
            'id': record.id,
        }).then(function (response) {
            console.log(response);

            self.setState({
                    nodeList: response.data.data.list
                }, () => {
                    self.showModal()
                }
            );


        }).catch(function (error) {
            console.log(error);
            // message.warn(error);
        });
        // this.props.history.push('/app/pass/passopen/detail' + record.id)
    };
    handleEdit = (record) => {
        console.log('hcia record', record)
        // this.props.history.push('/app/pass/passopen/detail' + record.id)
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

    requestPage = (pg) => {


        pg = pg - 1
        let self = this
        self.setState({
                loading: true,
            }
        );
        console.log('hcia pg', pg)
        window.Axios.post('star/getStarLiveAccountList', {
            'pageSize': this.state.pgsize,
            'pageNo': pg,
        }).then(function (response) {
            console.log(response);

            self.setState({
                    totalPage: response.data.data.totalPage,
                    loading: false,
                    userList: response.data.data.list
                }
            );


        }).catch(function (error) {
            console.log(error);
            // message.warn(error);
        });
    }

    changePage = (page) => {
        console.log('hcia page', page)
        this.setState({
            current: page,
        }, () => {

            this.requestPage(page)

        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }


    render() {
        return (
            <div>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
                {/*<div>searchPhone query :{JSON.stringify(this.state.searchPhone)}</div>*/}
                <Modal
                    title="备注详情"
                    onCancel={this.handleCancel}
                    visible={this.state.visible}
                    footer=''
                >
                    <Table rowKey="id"
                           columns={this.nodeColumns}
                           dataSource={this.state.nodeList}// nodeList
                    />


                </Modal>
                <BreadcrumbCustom first="审核管理" second="开户审核"/>

                <Table rowKey="id"
                       columns={this.columns}
                       dataSource={this.state.userList}
                       scroll={{x: 1600}}
                       bordered
                       loading={this.state.loading}
                       pagination={{  // 分页
                           total: this.state.pgsize * this.state.totalPage,
                           pageSize: this.state.pgsize,
                           onChange: this.changePage,
                       }}
                />
            </div>

        )
    }
}

