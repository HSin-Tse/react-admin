/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {message, Input, Button, Card, Table, Select, Modal, Upload, Icon} from 'antd';
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
            detail: {
                "name": null,
                "id": "27",
                "date": "",
                "comment": null,
                "status": 0,
                "currentLeverage": "1 : 100",
                "targetLeverage": "1 : 200",
                "operator": null,
                "email": null,
                "mobile": null,
                "nationalId": null,
                "accountNo": "live545491475",
                "marginLevel": "N/A",
                "displayStatus": "审核中",
                "broker": null,
                "cashBalance": "0.0"
            },
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
                        <Button onClick={() => this.showModalA(record.id)}>查看</Button>
                        <Button onClick={() => this.showModalB(record.id)}>审核</Button>
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
                detail: response.data.data,
                visibleA: true,
            });

        });


    }
    showModalB = (id) => {

        console.log('hcia record', id)

        let self = this


        window.Axios.post('finance/getLeverageApplyDetail', {
            'id': id,
        }).then(function (response) {
            console.log('hcia response', response)

            self.setState({
                detail: response.data.data,
                visibleB: true,
            });

        });


    }


    handleOk = () => {

        let self = this

        window.Axios.post('finance/passLeverageApply', {
            'id': this.state.detail.id,
            'content': this.state.detail.comment,
        }).then(function (response) {


            if (response.data.code == 1) {
                message.success('操作成功')
                self.requestPage()
            }
            self.setState({
                visibleB: false,
            });
            // self.setState({
            //     detail: response.data.data,
            //     visibleB: true,
            // });

        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visibleA: false,
            visibleB: false,
        });
    };

    handleReject = (e) => {
        let self = this

        window.Axios.post('finance/cancelLeverageApply', {
            'id': this.state.detail.id,
            'content': this.state.detail.comment,
        }).then(function (response) {


            if (response.data.code == 1) {
                message.success('操作成功')
                self.requestPage()
            }
            self.setState({
                visibleB: false,
            });


        });
    };

    changeNote = (e) => {
        // this.state.changeNoteV = e.target.value
        // this.state.changeNoteB = true
        this.setState({
            detail: {...this.state.detail, comment: e.target.value},
        });
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.props.todps)}
                <Modal
                    title={this.state.modeState == '正常' ? '恢复正常' : this.state.modeState}
                    onCancel={this.handleCancel}
                    visible={this.state.visibleB}

                    footer={[
                        <Button type="normal" key="back" onClick={this.handleReject}>拒絕</Button>,
                        <Button type="normal" loading={this.state.loadFor} key="submit"
                                onClick={() => this.handleOk()}>
                            確認
                        </Button>,
                    ]}
                >
                    <Card bordered={false}

                    >

                        <h3>当前杠杆 :{this.state.detail.currentLeverage}</h3>
                        <h3>余额 :{this.state.detail.cashBalance}</h3>
                        <h3>杠杆修改 :{this.state.detail.targetLeverage}</h3>
                        <h3>保证金占比:{this.state.detail.marginLevel}</h3>
                        <div>
                            <h3>处理备注：</h3>

                            <TextArea value={this.state.detail.comment} onChange={this.changeNote} rows={4}>

                        </TextArea>
                        </div>


                    </Card>


                </Modal>

                <Modal
                    title="详情查看"
                    onCancel={this.handleCancel}
                    visible={this.state.visibleA}
                    footer=''
                >

                    <Card bordered={false}>
                        <h3>当前杠杆 :{this.state.detail.currentLeverage}</h3>
                        <h3>余额 :{this.state.detail.cashBalance}</h3>
                        <h3>杠杆修改 :{this.state.detail.targetLeverage}</h3>
                        <h3>保证金占比:{this.state.detail.marginLevel}</h3>
                        <div>
                            <h3>处理备注：</h3>

                            <TextArea value={this.state.detail.comment} rows={4}>

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


