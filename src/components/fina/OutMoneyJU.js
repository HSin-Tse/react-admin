/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, message, Select, Steps, Card, Col, Divider, Row, Input} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";

const Option = Select.Option;
const {TextArea} = Input;
const Step = Steps.Step;

class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            date: new Date(),
            userList: [],
            leavgeList: [],
            nodeList: [],
            loading: false,
            searchPhone: '',
            totalPage: 1,
            modeState: 1,
            forbiddenValue: 0,
            current: 0,
            currentStep: 0,
            pgsize: 10,
            loadFor: false,
            suspend_reason_type: []

        };
    }


    componentDidMount() {

        let self = this;
        window.Axios.post('dict/openDict', {
            'keys': 'suspend_reason_type',
        }).then(function (response) {
            self.setState({
                    suspend_reason_type: response.data.data.suspend_reason_type
                }
            );
        })

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
        window.Axios.post('star/getStarLiveAccountList', {
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
            title: '客维审核',
            content: 'Second-content',
        }, {
            title: '后台审核',
            content: 'Last-content',
        }, {
            title: '银行放款',
            content: 'Last-content',
        }];

        var ssdds={ paddingLeft:15,paddingRight:15,alignItems:'center',justifyContent:'space-between' , display: 'flex', minHeight: 30}
        return (
            <div>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
                {/*<div>searchPhone query :{JSON.stringify(this.state.searchPhone)}</div>*/}
                {/*this.state.selectedRowKeys.length > 0*/}

                <h2 style={{marginTop: 15}}>
                    新增电汇入金
                </h2>
                <BreadcrumbCustom first="财务管理" second="电汇入金"/>

                <div style={{transform: "scale(1.3,1.3)"}}>

                    <Steps
                        style={{marginLeft: "15%", marginBottom: "20px", marginTop: "40px", width: "70%", height: 90}}
                        labelPlacement={'vertical'} current={this.state.currentStep}>
                        {steps.map(item => <Step key={item.title} title={item.title}/>)}
                    </Steps>

                </div>
                {/*<div style="text-align:center;background-color:pink;width:200px;height:60">這裡是文字</div>*/}

                <Card
                    title={<h1>TOM WANG</h1>}
                    bordered={true}
                    bodyStyle={{padding: 0, margin: 0}}
                    headStyle={{textAlign: 'center', width: '100%'}}
                    style={{marginLeft: '0%', width: '100%'}}>
                    <Row gutter={30}>
                        <Col md={10}>
                            <Card
                                bodyStyle={{padding: 0, margin: 0}}
                                bordered={false}>


                                <div style={{ padding:15, color:'white', background:'#FF8800' ,alignItems:'center',justifyContent:'space-between' , display: 'flex', minHeight: 40}}>
                                    <span style={{fontSize:'15px'}} >可用余额:</span>
                                    <span style={{fontSize:'15px'}} >00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize:'13px'}} >余额:</span>
                                    <span style={{fontSize:'13px'}} >00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize:'13px'}} >奖励金:</span>
                                    <span style={{fontSize:'13px'}} >00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize:'13px'}} >出金待审核:</span>
                                    <span style={{fontSize:'13px'}} >00.00</span>
                                </div>
                                <Divider style={{paddingLeft:15,paddingRight:15}} />
                                <div style={ssdds}>
                                    <span style={{fontSize:'13px'}} >总入金:</span>
                                    <span style={{fontSize:'13px'}} >00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize:'13px'}} >出金:</span>
                                    <span style={{fontSize:'13px'}} >00.00</span>
                                </div>
                            </Card>


                        </Col>
                        <Col md={10}>

                            <Card
                                bodyStyle={{padding: 0, margin: 0}}
                                bordered={false}>


                                <div style={{ padding:15, color:'white', background:'#FF8800' ,alignItems:'center',justifyContent:'space-between' , display: 'flex', minHeight: 40}}>
                                    <span style={{fontSize:'15px'}} >可用余额:</span>
                                    <span style={{fontSize:'15px'}} >00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize:'13px'}} >余额:</span>
                                    <span style={{fontSize:'13px'}} >00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize:'13px'}} >奖励金:</span>
                                    <span style={{fontSize:'13px'}} >00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize:'13px'}} >出金待审核:</span>
                                    <span style={{fontSize:'13px'}} >00.00</span>
                                </div>
                                <Divider style={{paddingLeft:15,paddingRight:15}} />
                                <div style={ssdds}>
                                    <span style={{fontSize:'13px'}} >总入金:</span>
                                    <span style={{fontSize:'13px'}} >00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize:'13px'}} >出金:</span>
                                    <span style={{fontSize:'13px'}} >00.00</span>
                                </div>
                            </Card>
                        </Col>
                    </Row>



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
