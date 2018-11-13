/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, Icon} from 'antd';


import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import axios from 'axios';

class Basic extends Component {
    columns;

    componentWillUnmount() {
    }

    componentDidMount() {
        this.columns = [
            {
                title: '手机号',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                fixed: 'left',
                width: 100,
                render: (text, record) => (
                    <Button>{record.phoneNumber}</Button>),
            }, {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <Button>{record.cnName + record.lastName + record.firstName}</Button>),
            }, {
                title: '申请序号',
                dataIndex: '申请序号',
                key: '申请序号',
                render: (text, record) => (<Button>{record.id}</Button>),
            }, {
                title: '账号类型',
                dataIndex: '账号类型',
                key: '账号类型',
                render: (text, record) => (
                    <Button>{record.applySTAR == null ? "資料供待處理" : "BB" + record.stringify() + record.stringify()}</Button>),
            }, {
                title: '申请时间',
                dataIndex: '申请时间',
                key: '申请时间',
                render: (text, record) => (
                    <Button>{this.timestampToTime(record.updateDate)}</Button>),
            }, {
                title: '审核状态',
                dataIndex: '审核状态',
                key: '审核状态',
                render: (text, record) => (
                    <Button>审核状态</Button>),
            }, {
                title: '处理备注',
                dataIndex: '处理备注',
                key: '处理备注',
                render: (text, record) => (
                    <Button>{record.note}</Button>),
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
        this.test()
    }


    handleEdit = (record) => {

        console.log('hcia', 'ss', record);

        window.sss=JSON.stringify(record);
        this.props.history.push('/app/pass/passopen/detail' + record.id)
    };
    itemDeleteClick = (id) => console.log('hcia', 'itemDeleteClick', id);
    click = (recored, key, ww) => {

        console.log('hcia', recored);
        console.log('hcia', key);
        console.log('hcia', ww);

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
    }
    pad = (str) => {
        return +str >= 10 ? str : '0' + str
    }


    test = () => {
        this.setState({testtt: '123321'});
        var aa = this;
        axios.post('http://mobile.nooko.cn:8090/open/getOpenApplyList', {}).then(function (response) {
            console.log(response);
            aa.setState({testtt: 'wwwww'});
            aa.setState({testtt: response.data.code});
            aa.setState({userList: response.data.data.list});


        }).catch(function (error) {
            console.log(error);
            // message.warn(error);
        });
    };


    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            , userList: []
            , testtt: 'asdasd'

        };
    }


    render() {
        return (
            <div>
                <div>log: {this.state.testtt}</div>


                <BreadcrumbCustom first="审核管理" second="开户审核"/>
                <div>
                    <Button onClick={this.test} type="primary">Primary</Button>
                    <Button onClick={() => this.itemDeleteClick()}> Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                </div>

                <Table rowKey="id"
                       columns={this.columns} dataSource={this.state.userList}
                       scroll={{x: 1300}}
                    // onRow={(record,rowkey,ww)=>{
                    //
                    //     return{
                    //
                    //         onClick : this.click.bind(this,record,rowkey,ww)    //点击行 record 指的本行的数据内容，rowkey指的是本行的索引
                    //
                    //     }
                    //
                    // }}


                />
            </div>

        )
    }
}

export default Basic