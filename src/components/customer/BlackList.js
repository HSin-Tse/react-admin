import React, {Component} from 'react';
import {DatePicker, Input, Modal, Button, Table, Icon, Checkbox} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';

export default class BlackList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bklistA: {},
            current: 0,
            totalpage: 0,
            pgsize: 2,
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

        this.requestPage(0)


    }

    requestPage = (pg) => {
        let self = this

        window.Axios.post('auth/getBlackList', {
            'listType': '2',//1:合规 2:开户 3:交易
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易
        }).then((response) => {
            console.log('hcia response', response)

            self.setState({
                pageNO: pg,
                totalpage: response.data.data.totalPage,
                bklistA: response.data.data,
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

            // console.log('hcia current' , current)
            // let param = JSON.parse(JSON.stringify(this.state.param))
            // param = {
            //     ...param,
            //     pageNum: this.state.current,
            //     pageSize: 10,
            // }
            // this.getActivityRestDetailList(param)
        })
    }

    render() {
        return (


            <div>
                <div>waitUpdate :{JSON.stringify(this.state)}</div>
                <BreadcrumbCustom first="用戶管理" second="黑名單"/>
                <div>
                    <Button onClick={this.test} type="primary">Primary</Button>
                    <Button onClick={() => this.itemDeleteClick()}> Default</Button>
                    <Button type="dashed">Dashed</Button>
                </div>

                <Table rowKey="id"
                       columns={this.columns}
                       dataSource={this.state.bklistA.list}
                       scroll={{x: 1300}}
                       loading={this.state.loading}
                       defaultCurrent={1}
                       total={1}
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

// export default BlackList;
