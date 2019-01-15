/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, message, Select, Steps, Card, Col, Row, Input, Modal} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";

const Step = Steps.Step;

class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            date: new Date(),
            userList: [],
            loading: false,
            totalPage: 1,
            current: 0,
            currentStep: 0,
            pgsize: 10,
            loadFor: false,

        };
    }


    componentDidMount() {
        window.Axios.post('back/addLogHistory', {
            'moduleLog': '财务管理',
            'pageLog': '入金审核',
            'commentLog': '查看了入金审核',
            'typeLog': 2,
        })
        let self = this;


        this.columns = [
            {
                title: '序号',
                dataIndex: '序号',
                key: '序号',
                align: 'center',
                render: (text, record, index) => (
                    <span>{this.state.current * this.state.pgsize + index + 1}</span>
                ),
            },
            {
                align: 'center',

                title: '交易账号',
                dataIndex: '交易账号',
                key: '交易账号',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {

                title: '姓名',

                dataIndex: '姓名',
                key: '姓名',
                render: (text, record) => (<span>{record.accountNo}</span>),
                align: 'center',
            }, {
                title: '账户类型',
                dataIndex: '账户类型',
                key: '账户类型',
                render: (text, record) => (
                    <span>{record.broker}</span>),
                align: 'center',
            }, {
                title: '添加时间',
                dataIndex: '添加时间',
                key: '添加时间',
                render: (text, record) => (
                    <span>{record.accountType}</span>),
                align: 'center',
            }, {
                align: 'center',
                title: '入金金额（￥）',
                dataIndex: '入金金额（￥）',
                key: '入金金额（￥）',
                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                align: 'center',

                title: '入金币种',
                dataIndex: '入金币种',
                key: '入金币种',
                render: (text, record) => (
                    <span>{record.marginLevel}</span>)
            }, {
                align: 'center',

                title: '执行金额（$)',
                dataIndex: '执行金额（$)',
                key: '执行金额（$)',
                render: (text, record) => (
                    <span>{record.cashBalance}</span>),
            }, {
                align: 'center',

                title: '执行币种',
                dataIndex: '执行币种',
                key: '执行币种',

                render: (text, record) => (
                    <span>{record.netEquity}</span>),
            }, {
                align: 'center',

                title: '使用汇率',
                dataIndex: '使用汇率',
                key: '使用汇率',

                render: (text, record) => (
                    <span>{record.lastUpdateDate}</span>),
            }, {
                align: 'center',

                title: '手续费',
                dataIndex: '手续费',
                key: '手续费',
                render: (text, record) => (
                    <span>{record.accountStatus == 1 ? '正常' : (record.accountStatus == 2) ? '禁止登陆' : '禁止交易'}</span>
                )

            }, {
                align: 'center',
                title: '账户余额',
                dataIndex: '账户余额',
                key: '账户余额',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                align: 'center',

                title: '期望到账时间',
                dataIndex: '期望到账时间',
                key: '期望到账时间',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                align: 'center',

                title: '创建人',
                dataIndex: '创建人',
                key: '创建人',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                align: 'center',
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <div>

                        <Button style={{marginLeft: 12}} onClick={() => this.showOPDAyModal3(record)}>取消</Button>

                        <Button onClick={() => this.showOPDAyModal2(record)}>已取消</Button>

                    </div>
                ),
            }];


        this.requestPage()
    }


    requestPage = () => {

        let self = this
        self.setState({
                loading: true,
            }
        );


        window.Axios.post('finance/getDepositHistory', {
            'listType': 1,
            'pageSize': self.state.pgsize,
            'pageNo': self.state.current,
        }).then((response) => {
            console.log(response);

            self.setState({
                    totalPage: response.data.data.totalPage,
                    loading: false,
                    userList: response.data.data.list
                }
            );


        })
    }
    changePage = (page) => {
        console.log('hcia page', page)
        this.setState({
            current: page - 1,
        }, () => {
            this.requestPage()
        })
    }
    refleshNowpage = () => {

        let self = this;
        var result = self.state.selectedRowKeys.map(Number);

        window.Axios.post('star/refreshStarLiveAccount', {
            idList: result,
        }).then(function (response) {
            console.log(response);
            self.setState({
                loadFor: false,
            }, () => {
                self.requestPage()
            });
            message.success('操作成功');

        })


    }


    render() {
        const steps = [{
            title: '新增',
            content: 'First-content',
        }, {
            title: '财务审核',
            content: 'Second-content',
        }, {
            title: '完成入金',
            content: 'Last-content',
        }];
        return (
            <div>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}

                <h2 style={{marginTop: 15}}>新增电汇入金</h2>
                <BreadcrumbCustom first="财务管理" second="电汇入金" third="新增"/>


                <Card style={{marginTop: 15}} title={null}
                      bodyStyle={{padding: '0px', margin: '0px'}}>

                    <div style={{transform: "scale(1.3,1.3)"}}>

                        <Steps
                            style={{
                                marginLeft: "30%",
                                marginBottom: "20px",
                                marginTop: "40px",
                                width: "40%",
                                height: 80
                            }}
                            labelPlacement={'vertical'} current={this.state.currentStep}>
                            {steps.map(item => <Step key={item.title} title={item.title}/>)}
                        </Steps>

                    </div>
                    <Card
                        bodyStyle={{padding: '0px', margin: '0px'}}
                        actions={[<Button style={{height: 40, width: 200}} block>创建 </Button>,
                            <Button style={{height: 40, width: 200}} block>重新输入 </Button>]}
                        title={null}
                        bordered={true}
                        headStyle={{textAlign: 'center', width: '100%'}}
                        style={{marginLeft: '20%', width: '60%'}}>


                        <div>
                            <div style={{padding: 12, textAlign: 'center', align: 'center', background: 'white'}}>
                                <p style={{
                                    fontSize: 18,
                                    fontFamily: 'PingFangSC-Medium',
                                    fontWeight: 500,
                                    color: 'rgba(51,51,51,1)'
                                }}>新增客户入金
                                </p>
                            </div>
                            <div>
                                <Row>
                                    <Col style={{textAlign: 'right', align: 'center', background: 'white'}} span={12}>


                                        <div style={{

                                            textAlign: 'left',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <span style={{

                                            textAlign: 'left',
                                            marginRight: '37px',


                                            width: '57px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px'


                                        }}>客户归属</span>
                                            <Input value={'1'}

                                                   style={{width: '200px', height: '36px'}}
                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <span style={{
                                            marginRight: '37px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px',
                                            width: '57px',


                                        }}>交易平台</span>
                                            <Input defaultValue={this.state.NameCn}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           NameCn: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <span style={{
                                            marginRight: '37px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px',
                                            width: '57px',


                                        }}>交易账号</span>
                                            <Input defaultValue={this.state.NameCn}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           NameCn: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <span style={{
                                            marginRight: '37px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px',
                                            width: '57px',


                                        }}>账户余额</span>
                                            <Input defaultValue={this.state.NameCn}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           NameCn: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <span style={{
                                            marginRight: '37px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px',
                                            width: '57px',


                                        }}>执行金额</span>
                                            <Input defaultValue={this.state.NameCn}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           NameCn: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <span style={{
                                            marginRight: '37px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px',
                                            width: '57px',


                                        }}>汇率</span>
                                            <Input value={'1'}

                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>

                                    </Col>

                                    <Col style={{background: 'white'}} span={12}>

                                        <div style={{
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                           <span style={{

                                               marginRight: '5px',
                                               fontFamily: 'PingFangSC-Medium',
                                               fontWeight: 500,
                                               color: '#FF4D4D',
                                               fontSize: '14px'


                                           }}>*</span>


                                                <span style={{
                                                    fontFamily: 'PingFangSC-Medium',
                                                    fontWeight: 500,
                                                    color: '#292929',
                                                    fontSize: '14px'

                                                }}>入金渠道</span>
                                            </div>
                                            <Input defaultValue={this.state.NameCn}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           NameCn: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                           <span style={{

                                               marginRight: '5px',
                                               fontFamily: 'PingFangSC-Medium',
                                               fontWeight: 500,
                                               color: '#FF4D4D',
                                               fontSize: '14px'


                                           }}>*</span>


                                                <span style={{
                                                    fontFamily: 'PingFangSC-Medium',
                                                    fontWeight: 500,
                                                    color: '#292929',
                                                    fontSize: '14px'


                                                }}>支付通道</span>

                                            </div>

                                            <Input defaultValue={this.state.NameCn}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           NameCn: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                        <span style={{
                                            textAlign: 'left',
                                            width: '87px',
                                            height: '22px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px'


                                        }}>期望到账时间</span>

                                            </div>


                                            <Input defaultValue={this.state.NameCn}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           NameCn: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                        <span style={{
                                            textAlign: 'left',
                                            width: '87px',
                                            height: '22px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px'


                                        }}>账户币种</span>

                                            </div>


                                            <Input defaultValue={this.state.NameCn}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           NameCn: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                        <span style={{
                                            textAlign: 'left',
                                            width: '87px',
                                            height: '22px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px'


                                        }}>账户所有人</span>

                                            </div>


                                            <Input defaultValue={this.state.NameCn}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           NameCn: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                        <span style={{
                                            textAlign: 'left',
                                            width: '87px',
                                            height: '22px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px'


                                        }}>支付币种</span>

                                            </div>


                                            <Input defaultValue={this.state.NameCn}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           NameCn: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>


                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={{background: 'white'}} span={2}></Col>
                                    <Col span={20}>
                                        <div style={{
                                            marginTop: '24px',
                                            width: '737px',
                                            height: 1,
                                            background: '#E6E6E6',
                                        }}></div>
                                    </Col>
                                    <Col style={{background: 'white'}} span={2}></Col>
                                </Row>
                                <Row style={{marginTop: '24px',marginBottom: '24px'}}>
                                    <Col style={{textAlign: 'right', align: 'center', background: 'white'}} span={12}>


                                        <div style={{

                                            textAlign: 'left',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <span style={{

                                            textAlign: 'left',
                                            marginRight: '37px',


                                            width: '57px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px'


                                        }}>客户备注</span>
                                            <Input defaultValue={this.state.NameCn}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           NameCn: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>


                                    </Col>

                                    <Col style={{background: 'white'}} span={12}>

                                        <div style={{
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                        <span style={{
                                            textAlign: 'left',
                                            width: '87px',
                                            height: '22px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px'


                                        }}>申请时间</span>

                                            </div>


                                            <Input defaultValue={this.state.NameCn}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           NameCn: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                        <span style={{
                                            textAlign: 'left',
                                            width: '87px',
                                            height: '22px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px'


                                        }}>渠道处理时间</span>

                                            </div>


                                            <Input defaultValue={this.state.NameCn}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           NameCn: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>
                                        <div style={{
                                            marginTop: '24px',
                                            textAlign: 'right',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>

                                            <div style={{
                                                width: '87px',
                                                marginRight: '37px',
                                            }}>
                                        <span style={{
                                            textAlign: 'left',
                                            width: '87px',
                                            height: '22px',
                                            fontFamily: 'PingFangSC-Medium',
                                            fontWeight: 500,
                                            color: '#292929',
                                            fontSize: '14px'


                                        }}>入金到账时间</span>

                                            </div>


                                            <Input defaultValue={this.state.NameCn}
                                                   onChange={(e) => {
                                                       this.setState({
                                                           NameCn: e.target.value,
                                                       });
                                                   }}
                                                   style={{width: '200px', height: '36px'}}
                                                   tagkey="lastNameCn"
                                            />
                                        </div>


                                    </Col>



                                </Row>



                            </div>

                        </div>


                    </Card>
                </Card>


                <Card style={{marginTop: 15}} title="电汇入金列表"
                      bodyStyle={{padding: 0, margin: 0}}

                >

                    <Table rowKey="id"

                           columns={this.columns}
                           dataSource={this.state.userList}
                           scroll={{x: 1600}}
                           bordered
                           loading={this.state.loading}
                           pagination={{  // 分页
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
    const {auth = {data: {}}, responsive = {data: {}}} = state.httpData;
    return {auth, responsive};
};
const mapDispatchToProps = dispatch => ({
    receiveData: bindActionCreators(receiveData, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Basic);
