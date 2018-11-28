import React, {Component} from 'react';
import {DatePicker, Input, Modal, Button, Table, Icon, Checkbox} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';

export default class BlackList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bklistA: {}
        };
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
                render: (text, record) => (<Button>{record.accountType}</Button>),
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
                    <Button>{record.status == 0 ? '审核中' : (record.status == 1) ? '审核通过' : '审核拒绝'}</Button>),
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
                        {/*<Button className="ant-dropdown-link" onClick={() => this.handleEdit(record)}>审核</Button>*/}
                    </div>
                ),
            }];
        let self = this
        window.Axios.post('auth/getBlackList', {
            'listType': '2',//1:合规 2:开户 3:交易
        }).then((response) => {
            console.log('hcia response', response)

            self.setState({
                bklistA: response.data.data,
            });
        }).catch(function (error) {
            console.log(error);
        });

    }


    render() {
        return (


            <div>
                <div>waitUpdate :{JSON.stringify(this.state.bklistA)}</div>
                <BreadcrumbCustom first="用戶管理" second="黑名單"/>
                <div>
                    <Button onClick={this.test} type="primary">Primary</Button>
                    <Button onClick={() => this.itemDeleteClick()}> Default</Button>
                    <Button type="dashed">Dashed</Button>
                </div>

                <Table rowKey="id"
                       columns={this.columns} dataSource={this.state.bklistA.list}
                       scroll={{x: 1300}}
                       loading={this.state.loading}
                       total={this.state.totalPage}
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
                BlackList

            </div>

        )
    }


}

// export default BlackList;
