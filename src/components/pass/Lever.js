/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {message, Input, Button, Card, Table, Select, Modal, Popconfirm, Row, Col} from 'antd';
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
            leavgeList: [{
                "id": 21,
                "status": 1,
                "clientGroupId": 404,
                "leverage": 100,
                "brokerCode": "BahamaIX",
                "maxBalance": 500000.0,
                "minBalance": 200001.0,
                "maxLots": null,
                "clientGroupName": "L_100",
                "delFlag": 0
            }, {
                "id": 22,
                "status": 1,
                "clientGroupId": 406,
                "leverage": 200,
                "brokerCode": "BahamaIX",
                "maxBalance": 200000.0,
                "minBalance": 100001.0,
                "maxLots": null,
                "clientGroupName": "L_200",
                "delFlag": 0
            }, {
                "id": 23,
                "status": 1,
                "clientGroupId": 405,
                "leverage": 300,
                "brokerCode": "BahamaIX",
                "maxBalance": 100000.0,
                "minBalance": 50001.0,
                "maxLots": null,
                "clientGroupName": "L_300",
                "delFlag": 0
            }, {
                "id": 24,
                "status": 1,
                "clientGroupId": 304,
                "leverage": 400,
                "brokerCode": "BahamaIX",
                "maxBalance": 50000.0,
                "minBalance": 0.0,
                "maxLots": null,
                "clientGroupName": "L_400",
                "delFlag": 0
            }, {
                "id": 25,
                "status": 0,
                "clientGroupId": 707,
                "leverage": 50,
                "brokerCode": "BahamaIX",
                "maxBalance": 0.0,
                "minBalance": 0.0,
                "maxLots": null,
                "clientGroupName": "L_50",
                "delFlag": 0
            }],
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

        let self = this

        window.Axios.post('dict/leverageList', {
            'keys': 'IX_Income,IX_Percentage,IX_FundsSource,IX_UStax,IX_Trading_Experience,IX_Trading_Objectives,IX_Risk_Tolerance,open_type_ix,account_type',
        }).then((response) => {
            console.log('hcia response', response)
            self.setState({
                leavgeList: response.data.data,
            })
        });

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
                    <span>{record.displayStatus}</span>
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

        let self = this

        self.setState({
            loading: true,
        });

        window.Axios.post('finance/getLeverageApplyDetail', {
            'id': id,
        }).then(function (response) {
            console.log('hcia response', response)

            self.setState({
                detail: response.data.data,
                visibleA: true,
                loading: false,
            });

        });


    }
    showModalB = (id) => {

        let self = this
        self.setState({
            loading: true,
        });

        window.Axios.post('finance/getLeverageApplyDetail', {
            'id': id,
        }).then(function (response) {
            console.log('hcia response', response)

            self.setState({
                detail: response.data.data,
                visibleB: true,
                loading: false,

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
        });
    }

    handleCancel = (e) => {
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
        this.setState({
            detail: {...this.state.detail, comment: e.target.value},
        });
    }

    render() {
        const gridStyle = {
            width: '50%',
            textAlign: 'center',
        };
        return (
            <div>
                {/*{JSON.stringify(this.props.todps)}*/}
                <Modal
                    width={500}
                    title={this.state.modeState == '正常' ? '恢复正常' : this.state.modeState}
                    onCancel={this.handleCancel}
                    visible={this.state.visibleB}

                    footer={[
                        <Popconfirm title="拒绝？" onConfirm={this.handleReject} okText="Yes"
                                    cancelText="No">
                            <Button type="normal" key="back">拒絕</Button>

                        </Popconfirm>,

                        <Popconfirm title="确认？" onConfirm={this.handleOk} okText="Yes"
                                    cancelText="No">
                            <Button type="normal" key="submit">
                                確認
                            </Button>

                        </Popconfirm>
                    ]}
                >
                    <Card
                        title={'账户：'+this.state.detail.accountNo}
                        bordered={true}>

                        <div>
                            <Row style={{marginTop: 20}}>
                                <Col style={{textAlign: 'right'}} span={10}>当前杠杆:</Col>
                                <Col style={{textAlign: 'center'}} span={14}>{this.state.detail.currentLeverage}</Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col style={{textAlign: 'right'}} span={10}>余额:</Col>
                                <Col style={{textAlign: 'center'}} span={14}>{this.state.detail.cashBalance}</Col>
                            </Row>

                            <Row style={{marginTop: 20}}>
                                <Col style={{textAlign: 'right'}} span={10}>杠杆修改:</Col>
                                <Col style={{textAlign: 'center'}} span={14}><Select
                                    defaultValue={this.state.detail.targetLeverage}
                                    style={{marginLeft: 0}}>
                                    {this.state.leavgeList.map(ccty => <Option
                                        key={ccty.leverage}>1:{ccty.leverage}</Option>)}
                                </Select></Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col style={{textAlign: 'right'}} span={10}>保证金占比:</Col>
                                <Col style={{textAlign: 'center'}} span={14}>{this.state.detail.marginLevel}</Col>
                            </Row>
                            <Row style={{marginTop: 20}}>
                            <Col span={24}>处理备注：</Col>
                            <Col style={{marginTop: 20}} span={24}>
                                <TextArea value={this.state.detail.comment}
                                          onChange={this.changeNote}
                                          rows={4}></TextArea>
                            </Col>
                        </Row>
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
                            <TextArea value={this.state.detail.comment} rows={4}></TextArea>
                        </div>
                    </Card>
                </Modal>

                <BreadcrumbCustom first="审核管理" second="杠杆审核"/>
                {/*<Button onClick={() => this.seeDetail()}*/}
                {/*>详情:{this.state.count}</Button>*/}
                {/*<Button*/}
                {/*onClick={() => this.seeDetail()}*/}
                {/*>详情: </Button>*/}


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


