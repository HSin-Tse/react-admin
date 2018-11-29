/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, Icon, Input} from 'antd';


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
                title: '手机号',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                fixed: 'left',
                onFilter: (value, record) => {
                    if (!record.phoneNumber)
                        return false
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
                render: (text, record) => (
                    <span>{record.cnName + record.lastName + record.firstName}</span>),
            }, {
                title: '申请序号',
                dataIndex: '申请序号',
                key: '申请序号',
                render: (text, record) => (<span>{record.id}</span>),
            }, {
                title: '账号类型',
                dataIndex: '账号类型',
                key: '账号类型',
                render: (text, record) => (
                    <span>{record.accountType}</span>),
            }, {
                title: '申请时间',
                dataIndex: '申请时间',
                key: '申请时间',
                render: (text, record) => (
                    <span>{this.timestampToTime(record.updateDate)}</span>),
            }, {
                title: '审核状态',
                dataIndex: '审核状态',
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
                        <Button className="ant-dropdown-link" onClick={() => this.handleEdit(record)}>审核</Button>
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
        window.Axios.post('open/getOpenApplyList', {
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

