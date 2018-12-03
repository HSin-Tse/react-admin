/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, Input} from 'antd';


import BreadcrumbCustom from '@/components/BreadcrumbCustom';

export default class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            , userList: []
            , loading: false
            , searchPhone: ''
            , totalPage: 1
            , pgsize: 10

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
                dataIndex: '申请序号',
                key: '申请序号',
                render: (text, record) => (<span>{record.accountNo}</span>),
            }, {
                title: '账号类型',
                dataIndex: '账号类型',
                key: '账号类型',
                render: (text, record) => (
                    <span>{record.broker}</span>),
            }, {
                title: '开户时间',
                dataIndex: '开户时间',
                key: '开户时间',
                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                title: '保证金占比',
                dataIndex: '保证金占比',
                key: '保证金占比',
                render: (text, record) => (
                    <span>{record.marginLevel}</span>)
            }, {
                title: '浮动余额',
                dataIndex: '浮动余额',
                key: '浮动余额',
                render: (text, record) => (
                    <span>{record.cashBalance}</span>),
            }, {
                title: '账户净值',
                dataIndex: '账户净值',
                key: '账户净值',
                render: (text, record) => (
                    <span>{record.netEquity}</span>),
            }, {
                title: '当前状态',
                dataIndex: '当前状态',
                key: '当前状态',
                render: (text, record) => (
                    <span>{record.accountStatus == 1 ? '正常' : (record.accountStatus == 2) ? '禁止登陆' : '禁止交易'}</span>
                )

            }, {
                title: '备注',
                dataIndex: '备注',
                key: '备注',
                render: (text, record) => (
                    <span>{record.comment}</span>)
            }, {
                title: '刷新时间',
                dataIndex: '刷新时间',
                key: '刷新时间',
                render: (text, record) => (
                    <span>{record.lastUpdateDate}</span>)
            }, {
                title: '操作人',
                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                title: '操作',
                fixed: 'right',
                width: 200,
                key: 'action',
                // fixed: 'right',
                // width: 100,
                render: (text, record) => (
                    <div>
                        <span className="ant-divider"/>
                        <Button className="ant-dropdown-link"
                                onClick={() => this.handleEdit(record)}>{record.status == 0 ? '审核' : (record.status == 1) ? '查看' : '查看'}</Button>    <Button className="ant-dropdown-link"
                                onClick={() => this.handleEdit(record)}>详情</Button>


                    </div>
                ),
            }];
        this.requestPage(1)
    }

    handleEdit = (record) => {
        this.props.history.push('/app/pass/passopen/detail' + record.id)
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


    render() {
        return (
            <div>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
                {/*<div>searchPhone query :{JSON.stringify(this.state.searchPhone)}</div>*/}

                <BreadcrumbCustom first="审核管理" second="开户审核"/>

                <Table rowKey="id"
                       columns={this.columns}
                       dataSource={this.state.userList}
                       scroll={{x: 1300}}
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

