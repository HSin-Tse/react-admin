import React, {Component} from 'react';
import {DatePicker, Input, Modal, Button, Table, Tabs, message} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';

const TabPane = Tabs.TabPane;
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
            }, {
                title: '活跃度',
                dataIndex: '活跃度',
                key: '活跃度',
                render: (text, record) => (<Button>{record.activeFlag}</Button>),
            }, {
                title: 'APP注册时间',
                dataIndex: 'APP注册时间',
                key: 'APP注册时间',
                render: (text, record) => (<Button>{record.date}</Button>),
            }, {
                title: '操作人',
                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (<Button>{record.operator}</Button>),
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
                        <Button className="ant-dropdown-link" onClick={() => this.handleremove(record)}>移除</Button>
                    </div>
                ),
            }];

        this.requestPage(0)


    }

    handleremove = (record) => {


        window.Axios.post('auth/removeBlackUser', {
            'id': record.id//1:合规 2:开户 3:交易
        }).then((response) => {
            console.log('hcia response', response)
            message.success('操作成功')


        }).catch(function (error) {
            console.log(error);
        });

    };
    requestPage = (pg) => {
        let self = this
        this.setState({
            loading: true
        })
        window.Axios.post('auth/getBlackList', {
            pageNo: this.state.current,
            'listType': '2',//1:合规 2:开户 3:交易
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易
        }).then((response) => {
            console.log('hcia response', response)

            self.setState({
                totalpage: response.data.data.totalPage,
                res: response.data.data,
                bklistA: response.data.data.list,
                loading: false
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

    callback(key) {
        console.log('hcia key', key)
    }

    render() {
        return (


            <div>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
                <BreadcrumbCustom first="用戶管理" second="黑名單"/>
                <Tabs onChange={this.callback} type="card">
                    <TabPane tab="Tab 1" key="1">
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
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>


            </div>

        )
    }


}

