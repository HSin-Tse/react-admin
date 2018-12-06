/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Row, Input, Button, Card, Table, Select, Modal} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import beauty from '@/style/imgs/beauty.jpg';
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";
import {addTodo} from "../../action";
import connect from "react-redux/es/connect/connect";

const {TextArea} = Input;
const Option = Select.Option;

class Basic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            current: 0,
            pgsize: 10,
            visibleA: false,
            visibleB: false,
            user: '',
            userList: [],
            loading: false

        };
    }

    requestPage = () => {

        let self = this
        self.setState({
                loading: true,
            }
        );

        window.Axios.post('finance/getLeverageApplyList', {
            'pageSize': self.state.pgsize,
            'pageNo': self.state.current,
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
        });
    }
    changePage = (page) => {
        console.log('hcia page', page)
        this.setState({
            current: page - 1,
        }, () => {
            this.requestPage()
        })
    }

    componentDidMount() {
        this.columns = [
            {
                title: '手机号',
                fixed: 'left',
                width: 150,
                dataIndex: '手机号',
                key: '手机号',
                render: (text, record) => (
                    <span>{record.mobile}</span>),
            },
            {
                title: '申请人',
                width: 100,
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {
                title: '申请账号',
                width: 160,

                dataIndex: '申请序号',
                key: '申请序号',
                render: (text, record) => (<span>{record.accountNo}</span>),
            }, {
                title: '账号类型',
                width: 150,

                dataIndex: '账号类型',
                key: '账号类型',
                render: (text, record) => (
                    <span>{record.broker}</span>),
            }, {
                title: '申请时间',
                dataIndex: '申请时间',
                key: '申请时间',
                width: 240,

                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                title: '审核状态',
                dataIndex: '审核状态',
                key: '审核状态',
                width: 120,
                render: (text, record) => (
                    <span>{record.accountStatus == 1 ? '正常' : (record.accountStatus == 2) ? '禁止登陆' : '禁止交易'}</span>
                )

            }, {
                title: '身份证号',
                dataIndex: '身份证号',
                key: '身份证号',
                width: 120,
                render: (text, record) => (
                    <span>{record.nationalId}</span>)
            }, {
                title: '邮箱地址',
                width: 140,
                dataIndex: '邮箱地址',
                key: '邮箱地址',
                render: (text, record) => (
                    <span>{record.email}</span>)
            }, {
                title: '处理备注',
                dataIndex: '处理备注',
                key: '处理备注',
                width: 120,
                render: (text, record) => (
                    <span>{record.comment}</span>)
            }, {
                title: '操作人',
                dataIndex: '操作人',
                width: 120,

                key: '操作人',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                title: '操作',
                key: 'action',
                fixed: 'right',
                align: 'center',
                width: 200,
                render: (text, record) => (
                    <div>
                        <Button onClick={() => this.showModalA(record.id)}>审核</Button>
                        <Button onClick={() => this.showModalB(record.belongUserId)}>查看</Button>
                    </div>
                ),
            }];
        this.requestPage()

    }

    seeDetail = () => {
        const {addTodo} = this.props;
        console.log('hcia seeDetail')
        addTodo('a')

    }
    showModalA = (id) => {

        console.log('hcia record', id)

        let self = this


        window.Axios.post('finance/getLeverageApplyDetail', {
            'id': id,
        }).then(function (response) {
            console.log('hcia response', response)
            self.setState({
                visibleA: true,
            });

        });


    }
    showModalB = () => {
        this.setState({
            visibleB: true,
        });
    }

    handleOk = () => {
        this.setState({
            visibleB: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visibleA: false,
            visibleB: false,
        });
    };

    render() {
        return (
            <div>
                {JSON.stringify(this.props.todps)}
                <Modal
                    title={this.state.modeState == '正常' ? '恢复正常' : this.state.modeState}
                    onCancel={this.handleCancel}
                    visible={this.state.visibleA}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消操作</Button>,
                        <Button loading={this.state.loadFor} key="submit" type="primary"
                                onClick={() => this.handleOk()}>
                            提交
                        </Button>,
                    ]}
                >
                    <div>
                        {this.state.modeState == '正常' ? <span>确认当前用户账户恢复正常</span> : null}
                        {this.state.modeState == '禁止登陆' ? <span>请选择禁止登录原因</span> : null}
                        {this.state.modeState == '禁止交易' ? <span>禁止交易</span> : null}
                    </div>
                    <div>

                        {this.state.modeState == '禁止登陆' ?
                            <Select style={{width: 200, marginTop: 20}} defaultValue='无效的邮箱'
                                    onChange={(value) => this.forbitChange(value)}>
                                {this.state.suspend_reason_type.map(ccty => <Option
                                    value={ccty.value} key={ccty.value}>{ccty.name}</Option>)}
                            </Select> : null}
                    </div>


                </Modal>

                <Modal
                    title="详情查看"
                    onCancel={this.handleCancel}
                    visible={this.state.visibleB}
                    footer=''
                >

                    <Card bordered={false}>
                        <h3>当前杠杆</h3>
                        <h3>当前杠杆</h3>
                        <h3>当前杠杆</h3>
                        <h3>当前杠杆</h3>
                        <div>
                            <h3>处理备注：</h3>

                            <TextArea value={'ssss'} rows={4}>
                            客户已爆仓，拒绝申请

                        </TextArea>
                        </div>


                    </Card>


                </Modal>

                <BreadcrumbCustom first="权限管理" second="杠杆审核"/>
                <Button onClick={() => this.seeDetail()}
                >详情:{this.state.count}</Button>
                <Button
                    onClick={() => this.seeDetail()}
                >详情: </Button>


                <Card title="杠杆审核"

                >

                    <Table rowKey="id"

                           columns={this.columns}
                           dataSource={this.state.userList}
                           scroll={{x: 1600}}
                           bordered
                           loading={this.state.loading}
                           pagination={{
                               total: this.state.pgsize * this.state.totalPage,
                               pageSize: this.state.pgsize,
                               onChange: this.changePage,
                           }}
                    />
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const todps = state.todos;
    return {todps};
};
const mapDispatchToProps = dispatch => ({
    addTodo: bindActionCreators(addTodo, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Basic);


