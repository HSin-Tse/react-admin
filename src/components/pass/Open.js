/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, Input, Card, Modal, Checkbox, message} from 'antd';


import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";

const {TextArea} = Input;

class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            , userList: []
            , loading: false
            , availableFlag: false
            , mStockRecordBEn: false
            , mStockRecordStatus: 0
            , isCanOP: 0
            , current: 0
            , searchPhone: ''
            , mStockRecord: {
                status: 1,
                ben: false
            }
            , totalPage: 1
            , pgsize: 10

        };
        console.log('hcia  this.props', this.props)

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


        var self = this;


        if (localStorage.getItem('infor')) {


            var menuInfor = JSON.parse(localStorage.getItem('infor'))


            if (menuInfor.superFlag === 1) {
                self.setState({
                    availableFlag: true,
                    isCanOP: 1
                });
            } else {
                var isCanOp = menuInfor.menuList.find((item) => {
                    console.log('hcia  this.props', this.props)
                    return this.props.tk === item.key;
                });

                console.log('hcia isCanOp', isCanOp.availableFlag)
                console.log('hcia isCanOp', isCanOp.availableFlag)
                self.setState({
                    availableFlag: isCanOp.availableFlag === 1,
                    isCanOP: isCanOp.availableFlag
                });
            }


        }

        this.columns = [
            {
                title: '手机号',
                align: 'center',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                onFilter: (value, record) => {
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
                align: 'center',
                render: (text, record) => (
                    <span>{record.cnName}</span>),
            }, {
                title: '申请序号',
                dataIndex: '申请序号',
                align: 'center',

                key: '申请序号',
                render: (text, record) => (<span>{record.id}</span>),
            }, {
                title: '账号类型',
                dataIndex: '账号类型',
                align: 'center',

                key: '账号类型',
                render: (text, record) => (
                    <span>{record.displayApplyType}</span>),
            }, {
                align: 'center',
                width: 150,
                title: '申请时间',
                dataIndex: '申请时间',
                key: '申请时间',
                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                title: '身份证号',
                dataIndex: '身份证号',
                key: '身份证号',
                align: 'center',

                render: (text, record) => (
                    <span>{record.nationalID}</span>),
            }, {
                title: '邮箱地址',
                dataIndex: '邮箱地址',
                key: '邮箱地址',
                align: 'center',

                render: (text, record) => (
                    <span>{record.email}</span>),
            }, {
                title: '审核状态',
                dataIndex: '审核状态',
                align: 'center',

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
                title: '处理人',
                dataIndex: '处理人',
                align: 'center',

                key: '处理人',
                render: (text, record) => (
                    <span>{record.operator}</span>),
            }, {
                title: '操作',
                key: '操作',
                align: 'center',
                render: (text, record) => (
                    <div>

                        <Button className="ant-dropdown-link"
                                onClick={() => this.handleEdit(record)}>操作日志</Button>
                        <Button className="ant-dropdown-link"
                                onClick={() => this.handleEdit(record)}>{record.status == 0 ? '审核' : (record.status == 1) ? '查看' : '查看'}</Button>
                        <Button className="ant-dropdown-link"
                                onClick={() => this.handleAmStok(record)}>{record.displayStatus}</Button>
                    </div>
                ),
            }];
        this.requestPage()
    }

    handleEdit = (record) => {

        if (this.state.availableFlag) {
            this.props.history.push('/app/pass/passopen/detail' + record.id)
            return
        }


        var gogo = record.status === 0 ? 'detail' : (record.status === 1) ? 'user' : 'user'
        this.props.history.push('/app/pass/passopen/' + gogo + record.id)
    };


    handleAmStok = (record) => {
        let self = this
        self.setState({

                mStockRecord: record,
                mStockRecordBEn: false,
                mStockRecordStatus: record.status,
            },
            () => {
                self.setState({
                        showAmeStockModla: true,
                    }
                );

            }
        );
    };


    requestPage = () => {
        let self = this
        self.setState({
                loading: true,
            }
        );
        window.Axios.post('open/getOpenApplyList', {
            'pageSize': this.state.pgsize,
            'pageNo': this.state.current,
        }).then((response) => {

            self.setState({
                    totalPage: response.data.data.totalPage,
                    loading: false,
                    userList: response.data.data.list
                }
            );

        })
    }

    changePage = (page) => {
        page = page - 1
        console.log('hcia page', page)
        this.setState({
            current: page,
        }, () => {

            this.requestPage()

        })
    }


    render() {
        return (
            <div>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
                {/*<div>this.state.availableFlag :{JSON.stringify(this.state.availableFlag)}</div>*/}
                {/*<div>isCanOP :{this.state.isCanOP}</div>*/}
                {/*<div>searchPhone query :{JSON.stringify(this.state.searchPhone)}</div>*/}
                {/*{JSON.stringify(this.props.todps)}*/}
                <h2 style={{marginTop: 15}}>
                    开户审核
                </h2>
                <BreadcrumbCustom first="审核管理" second="开户审核"/>
                <Card bodyStyle={{padding: 0, margin: 0}}
                      title={'开户审核'}>
                    <Table rowKey="id"
                           columns={this.columns}
                           dataSource={this.state.userList}
                           scroll={{x: 2000}}
                           bordered
                           loading={this.state.loading}
                           pagination={{
                               total: this.state.pgsize * this.state.totalPage,
                               pageSize: this.state.pgsize,
                               onChange: this.changePage,
                           }}
                    />
                </Card>

                <Modal
                    title="美股授权审核"
                    visible={this.state.showAmeStockModla}
                    onOk={this.handleOk}
                    okType={((this.state.mStockRecordStatus == 1) && this.state.mStockRecordBEn) ? 'primary' : 'dashed'}
                    onCancel={(e) => {
                        this.setState({
                            showAmeStockModla: false,
                        });
                    }}
                >

                    <Card bordered={true}>
                        {/*record.status*/}
                        <div style={{display: 'flex', minHeight: 40, align: 'center'}}>


                            <Checkbox checked={this.state.mStockRecordStatus == 1}>已确认可以已正常开户</Checkbox>


                        </div>
                        <div style={{display: 'flex', minHeight: 40, align: 'center'}}>

                            <Checkbox
                                checked={this.state.mStockRecordBEn}

                                onChange={(e) => {

                                    console.log('hcia e.target.checked', e.target.checked)
                                    this.setState({
                                        mStockRecordBEn: e.target.checked,
                                    });
                                }}>已审核客户回传的W-8BEN表单</Checkbox>
                        </div>


                    </Card>
                </Modal>

            </div>

        )
    }

    handleOk = (e) => {


        if (((this.state.mStockRecordStatus == 1) && this.state.mStockRecordBEn)) {

            console.log('hcia this.state.mStockRecord', this.state.mStockRecord.id)
            console.log('hcia this.state.mStockRecord', this.state.mStockRecord.belongUserId)

            let self = this
            window.Axios.post('open/passUsStock', {
                belongUserId: this.state.mStockRecord.belongUserId,
                // mobile: this.state.phoneCn,
                // content: this.state.changeNoteV,
            }).then((response) => {
                self.requestPage()//1:合规 2:开户 3:交易
            });
        } else {
            message.error('檢查確定項')
        }


    }
}


const mapStateToProps = state => {
    const todps = state.todos;
    return {todps};
};
export default connect(mapStateToProps,)(Basic);