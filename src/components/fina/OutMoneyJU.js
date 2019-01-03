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

        var ssdds = {
            paddingLeft: 15,
            paddingRight: 15,
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'flex',
            minHeight: 30
        }
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
                    <Row

                        gutter={32}>
                        <Col  span={12}>
                            <Card
                                bodyStyle={{padding: 0, margin: 0}}
                                bordered={false}>
                                <div style={{
                                    padding: 15,
                                    color: 'white',
                                    background: '#FF8800',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    display: 'flex',
                                    minHeight: 40
                                }}>
                                    <span style={{fontSize: '15px'}}>可用余额:</span>
                                    <span style={{fontSize: '15px'}}>00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>余额:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>奖励金:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>出金待审核:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                                <Divider style={{paddingLeft: 15, paddingRight: 15}}/>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>总入金:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>出金:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                            </Card>
                            <Card
                                style={{marginTop:15}}
                                bodyStyle={{padding: 0, margin: 0}}
                                bordered={false}>
                                <div style={{
                                    padding: 15,
                                    color: 'white',
                                    background: '#FF8800',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    display: 'flex',
                                    minHeight: 40
                                }}>
                                    <span style={{fontSize: '15px'}}>可用余额:</span>
                                    <span style={{fontSize: '15px'}}>00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>余额:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>奖励金:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>出金待审核:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                                <Divider style={{paddingLeft: 15, paddingRight: 15}}/>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>总入金:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>出金:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                            </Card>

                        </Col>
                        <Col  span={12}>

                            <Card
                                bodyStyle={{padding: 0, margin: 0}}
                                bordered={false}>


                                <div style={{
                                    padding: 15,
                                    color: 'white',
                                    background: '#FF8800',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    display: 'flex',
                                    minHeight: 40
                                }}>
                                    <span style={{fontSize: '15px'}}>可用余额:</span>
                                    <span style={{fontSize: '15px'}}>00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>余额:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>奖励金:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>出金待审核:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                                <Divider style={{paddingLeft: 15, paddingRight: 15}}/>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>总入金:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>出金:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
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
