
import React, { Component } from 'react';
import {Button, Table, Icon} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import axios from 'axios';
class LeadManager extends Component {
	componentDidMount() {
        this.columns = [
            {
                title: '手机号',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                // fixed: 'left',
                // width: 100,
                render: (text, record) => (
                    <Button>{record.mobile}</Button>),
             }
            , {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <Button>{record.cnName + record.lastName + record.firstName}</Button>),
            }, {
                title: 'APP版本',
                dataIndex: '申请序号',
                key: '申请序号',
                render: (text, record) => (<Button>{record.id}</Button>),
            }, {
                title: '手机型号',
                dataIndex: '账号类型',
                key: '账号类型',
                render: (text, record) => (
                    <Button>{record.accountType}</Button>),
            }, {
                title: '操作系统型号',
                dataIndex: '申请时间',
                key: '申请时间',
              
            }, {
                title: '注册时间',
                dataIndex: '审核状态',
                key: '审核状态',
                render: (text, record) => (
                    <Button>待审核</Button>),
            }, {
                title: '下载平台',
                dataIndex: '处理备注',
                key: '处理备注',
                render: (text, record) => (
                    <Button>{record.note}</Button>),
            }, {
                title: '地理位置',
                dataIndex: '处理备注',
                key: '处理备注',
                render: (text, record) => (
                    <Button>{record.note}</Button>),
            }, {
                title: '备注',
                dataIndex: '处理备注',
                key: '处理备注',
                render: (text, record) => (
                    <Button>{record.note}</Button>),
            }, {
                title: '操作人',
                dataIndex: '处理备注',
                key: '处理备注',
                render: (text, record) => (
                    <Button>{record.note}</Button>),
            }
            , {
                title: '操作',
                key: 'action',
                // fixed: 'right',
                // width: 100,
                render: (text, record) => (
                    <div>
                        <span className="ant-divider"/>
                        <Button className="ant-dropdown-link" onClick={() => this.handleEdit(record)}>审核</Button>


                    </div>
                ),
            }
            ];
        this.test()
    }
    render() {
        return(
             <div>
                <div>log: {this.state.anyThing}</div>
                <div>FUcking log: Lead</div>
                <BreadcrumbCustom first="审核管理" second="开户审核"/>
                <div>
                    <Button onClick={this.test} type="primary">Primary</Button>
                    <Button onClick={() => this.itemDeleteClick()}> Default</Button>
                    <Button type="dashed">Dashed</Button>
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
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            , userList: []
            , anyThing: 'asdasd'

        };
    }
    test = () => {
        this.setState({is_tag: '123321'});
        var aa = this;
        axios.post('http://mobile.nooko.cn:8090/ixuser/getUserList', {
        	'listType' : '1',
        	'loginName' : 'admin',
        	'token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNTQ1NTI4ODM0MTk5LCJsb2dpbk5hbWUiOiJhZG1pbiJ9.F7moE4DsMUiajkKB1S_wemwsozlUW5VMxQKsg4KsSUQ'

        }).then(function (response) {
            console.log(response);
            aa.setState({anyThing: 'wwwww'});
            aa.setState({anyThing: response.data.code});
            aa.setState({userList: response.data.data.list});


        }).catch(function (error) {
            console.log(error);
            // message.warn(error);
        });
    };
}

export default LeadManager;