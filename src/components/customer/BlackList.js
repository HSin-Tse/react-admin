import React, {Component} from 'react';
import {DatePicker, Input, Modal, Button, Table, Tabs, message} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';

const TabPane = Tabs.TabPane;
export default class BlackList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            bklistA: [],
            bklistB: [],
            bklistC: [],
            currentA: 0,
            currentB: 0,
            currentC: 0,
            totalpageA: 0,
            totalpageB: 0,
            totalpageC: 0,
            nowKey: 0,
            pgsize: 20,
            loadingA: false,
            loadingB: false,
            loadingC: false,

        };
    }

    componentDidMount() {
        this.columns = [
            {
                title: '手机号',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                fixed: 'left',
                render: (text, record) => (

                    <span>{record.mobile}</span>

                ),
            }, {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {
                title: '活跃度',
                dataIndex: '活跃度',
                key: '活跃度',
                render: (text, record) => (<span>{record.activeFlag}</span>),
            }, {
                title: 'APP注册时间',
                dataIndex: 'APP注册时间',
                key: 'APP注册时间',
                render: (text, record) => (<span>{record.date}</span>),
            }, {
                title: '操作人',
                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (<span>{record.operator}</span>),
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
                        <Button className="ant-dropdown-link" onClick={() => this.handleremove(record)}>移除</Button>
                    </div>
                ),
            }];
        this.requestPageA()//1:合规 2:开户 3:交易
        this.requestPageB()
        this.requestPageC()
    }

    handleremove = (record) => {

        window.Axios.post('auth/removeBlackUser', {
            'id': record.id//1:合规 2:开户 3:交易
        }).then((response) => {

            message.success('操作成功')

        }).catch(function (error) {
            console.log(error);
        });

    };

    handleremoveList = () => {
        console.log('hcia selectedRowKeys', this.state.selectedRowKeys)
        // window.Axios.post('auth/removeBlackUser', {
        //     'id': record.id//1:合规 2:开户 3:交易
        // }).then((response) => {
        //     message.success('操作成功')
        // }).catch(function (error) {
        //     console.log(error);
        // });

    };
    requestPageA = () => {
        let self = this
        self.setState({
            loadingA: true
        })
        window.Axios.post('auth/getBlackList', {
            pageNo: this.state.current,
            'listType': 1,//1:合规 2:开户 3:交易
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易
        }).then((response) => {
            self.setState({
                totalpageA: response.data.data.totalPage,
                bklistA: response.data.data.list,
                loadingA: false
            });

        }).catch(function (error) {
            console.log(error);
        });
    }
    requestPageB = () => {
        let self = this

        self.setState({
            loadingB: true
        })
        window.Axios.post('auth/getBlackList', {
            pageNo: this.state.current,
            'listType': 2,//1:合规 2:开户 3:交易
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易
        }).then((response) => {
            self.setState({
                totalpageB: response.data.data.totalPage,
                bklistB: response.data.data.list,
                loadingB: false
            });


        }).catch(function (error) {
            console.log(error);
        });
    }
    requestPageC = () => {
        let self = this
        self.setState({
            loadingC: true
        })
        window.Axios.post('auth/getBlackList', {
            pageNo: this.state.current,
            'listType': 3,//1:合规 2:开户 3:交易
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易
        }).then((response) => {

            self.setState({
                totalpageC: response.data.data.totalPage,
                bklistC: response.data.data.list,
                loadingC: false
            });
        }).catch(function (error) {
            console.log(error);
        });
    }


    changePageA = (page) => {
        this.setState({
            currentA: page,
        }, () => {
            this.requestPageA()
        })
    }
    changePageB = (page) => {
        this.setState({
            currentb: page,
        }, () => {
            this.requestPageB()
        })
    }
    changePageC = (page) => {
        this.setState({
            currentC: page,
        }, () => {
            this.requestPageC()
        })
    }

    callback(key) {
        console.log('hcia key', key)
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('hcia', 'selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    render() {

        const {loading, selectedRowKeys} = this.state;
        const hasSelected = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (


            <div>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
                <BreadcrumbCustom first="用戶管理" second="黑名單"/>

                <Tabs onChange={this.callback} type="card">
                    <TabPane tab="合规黑名单" key="1">
                        <Button
                            type="primary"
                            onClick={() => this.handleremoveList()}
                            disabled={!hasSelected}
                            loading={loading}
                        >
                            批量移除
                        </Button>
                        <Table rowKey="id"
                               bordered
                               rowSelection={rowSelection}
                               columns={this.columns}
                               dataSource={this.state.bklistA}
                               scroll={{x: 1300}}
                               loading={this.state.loading}
                               pagination={{  // 分页
                                   total: this.state.totalpageA * this.state.pgsize,
                                   pageSize: this.state.pgsize,
                                   onChange: this.changePageA,
                               }}
                        />
                    </TabPane>
                    <TabPane tab="开户黑名单" key="2">
                        <Table rowKey="id"
                               columns={this.columns}
                               dataSource={this.state.bklistB}
                               scroll={{x: 1300}}
                               loading={this.state.loading}
                               pagination={{  // 分页
                                   total: this.state.totalpageB * this.state.pgsize,
                                   pageSize: this.state.pgsize,
                                   onChange: this.changePageB,
                               }}
                        />
                    </TabPane>
                    <TabPane tab="交易黑名单" key="3">
                        <Table rowKey="id"
                               columns={this.columns}
                               dataSource={this.state.bklistC}
                               scroll={{x: 1300}}
                               loading={this.state.loading}
                               pagination={{  // 分页
                                   total: this.state.totalpageC * this.state.pgsize,
                                   pageSize: this.state.pgsize,
                                   onChange: this.changePageC,
                               }}
                        />
                    </TabPane>
                </Tabs>


            </div>

        )
    }


}

