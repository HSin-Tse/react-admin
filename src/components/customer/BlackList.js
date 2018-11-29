import React, {Component} from 'react';
import {DatePicker, Input, Modal, Button, Table, Icon, Checkbox} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';

export default class BlackList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            res: {},
            bklistA: [],
            current: 0,
            totalpage: 0,
            pgsize: 10,
            loading: false,

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
                    <Button>{record.mobile}</Button>),
            }, {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <Button>{record.name}</Button>),
            },  {
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
                    <Button>{record.comment}</Button>),
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

        this.requestPage(0)


    }

    requestPage = (pg) => {
        let self = this
        this.setState({
            loading:true
        })
        window.Axios.post('auth/getBlackList', {
            'listType': '2',//1:合规 2:开户 3:交易
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易
        }).then((response) => {
            console.log('hcia response', response)

            self.setState({
                totalpage: response.data.data.totalPage,
                res: response.data.data,
                bklistA: response.data.data.list,
                loading:false
            });
        }).catch(function (error) {
            console.log(error);
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
    itemDeleteClick= ()=>{

    }

    render() {
        return (


            <div>
                <div>waitUpdate :{JSON.stringify(this.state)}</div>
                <BreadcrumbCustom first="用戶管理" second="黑名單"/>
                <div>
                    <Button onClick={() => this.itemDeleteClick()}> Default</Button>
                    <Button type="dashed">Dashed</Button>
                </div>

                <Table rowKey="id"
                       columns={this.columns}
                       dataSource={this.state.bklistA}
                       scroll={{x: 1300}}
                       loading={this.state.loading}
                       pagination={{  // 分页
                           total: this.state.totalpage * this.state.pgsize,
                           pageSize: this.state.pgsize,
                           onChange: this.changePage,
                       }}
                />
            </div>

        )
    }


}

