/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Tabs, Checkbox, Select, Steps, Card, Col, Divider, Row, Input, Table} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";
import {steps} from "./model/Steps"

const {TextArea} = Input;

const TabPane = Tabs.TabPane;

const Option = Select.Option;
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
            current: 1,
            currentStep: 2,
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
                    {steps[0].title}
                </h2>
                <BreadcrumbCustom first="财务管理" second="出金管理" third={steps[this.state.currentStep].title}/>

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
                        <Col span={12}>
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
                                    <span style={{fontSize: '15px'}}>可用余额</span>
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
                                style={{marginTop: 15}}
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
                                    <span style={{fontSize: '15px'}}>成功交易</span>
                                    <span style={{fontSize: '15px'}}></span>
                                </div>
                                <Table rowKey="id"
                                       columns={[

                                           {
                                               title: '交易',
                                               align: 'center',
                                               dataIndex: 'bkUserName',
                                               key: 'operationDiary_User',
                                               render: (text, record) => (
                                                   <div>{record.bkUserName}</div>),
                                           }, {
                                               title: '入',
                                               align: 'center',
                                               dataIndex: 'createDate',
                                               key: 'operationDiary_Date',
                                               render: (text, record) => (
                                                   <span>{record.createDate}</span>),
                                           }, {
                                               title: '出',
                                               align: 'center',
                                               dataIndex: 'comment',
                                               key: 'operationDiary_Status',
                                               render: (text, record) => (
                                                   <span>{record.comment}</span>),
                                           }]}
                                       dataSource={this.state.operationDiaryHistory}
                                       loading={this.state.loadingComment}
                                       pagination={{
                                           total: this.state.totalpageComments * this.state.pgsize,
                                           pageSize: this.state.pgsize,
                                           onChange: this.changePageComment,
                                       }}
                                />
                                <div>
                                    <span>显示第1条到第5条，共10条</span>
                                </div>
                            </Card>

                        </Col>
                        <Col span={12}>

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
                                    <span style={{fontSize: '15px'}}>出金申请详情</span>
                                    <span style={{fontSize: '15px'}}>00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>请求出金金额:</span>
                                    <span style={{fontSize: '13px'}}>00.00</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}><span style={{color: 'red'}}>*</span>出金金额:</span>
                                    <span style={{fontSize: '13px'}}><Input style={{width: 220}} placeholder="100.00"/>USD</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>出金日期</span>
                                    <span style={{fontSize: '13px'}}>1900-10-10 10:10:10</span>
                                </div>

                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>用户名/帐号</span>
                                    <span style={{fontSize: '13px'}}>1900-10-10 10:10:10</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>订单号</span>
                                    <span style={{fontSize: '13px'}}>0001</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>经济商</span>
                                    <span style={{fontSize: '13px'}}>BBIX</span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>支付方式</span>

                                    <Select defaultValue="lucy" style={{margin: 5, width: 220}}>
                                        <Option value="jack">001</Option>
                                        <Option value="lucy">002</Option>
                                    </Select>

                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}><span style={{color: 'red'}}>*</span>银行名称</span>
                                    <span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}
                                                                            placeholder=""/></span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>收款银行预留手机号</span>
                                    <span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}
                                                                            placeholder=""/></span>
                                </div>

                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}><span style={{color: 'red'}}>*</span> 省</span>
                                    <span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}
                                                                            placeholder=""/></span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}><span style={{color: 'red'}}>*</span>城市</span>
                                    <span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}
                                                                            placeholder=""/></span>
                                </div>

                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}><span style={{color: 'red'}}>*</span>支行名称</span>
                                    <span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}
                                                                            placeholder=""/></span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}><span style={{color: 'red'}}>*</span>收款人姓名</span>
                                    <span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}
                                                                            placeholder=""/></span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}><span style={{color: 'red'}}>*</span>收款银行账户</span>
                                    <span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}
                                                                            placeholder=""/></span>
                                </div>
                                <div style={ssdds}>
                                    <span style={{fontSize: '13px'}}>备注:</span>
                                    <span style={{fontSize: '13px'}}><Input style={{margin: 5, width: 220}}
                                                                            placeholder=""/></span>
                                </div>
                                <div>
                                    <Tabs justify tabBarGutter={'0%'} tabBarStyle={{width: '100%'}} type="card">
                                        <TabPane tab={steps[0].title} key="1">


                                            <Card>
                                                <div><Checkbox>没有第三方资金</Checkbox></div>
                                                <div><Checkbox>没有未批准的信用金／奖励金</Checkbox></div>
                                                <div><Checkbox>初始入金至原始入金渠道</Checkbox></div>
                                                <div><Checkbox>盈利通过银行转账到同名交易账号</Checkbox></div>

                                                <div style={{
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                }}>请注意：</div>
                                                <div>
                                                    1.只有在提交此请求后才能将钱汇到客户银行账户。

                                                </div>
                                                <div>
                                                    2.当按下“批准出金”按钮时，出金金额将从客户的交易账户中自动扣除。
                                                </div>
                                                <div>
                                                    此请求将被关闭并可在归档中查看。
                                                </div>

                                                <TextArea
                                                    style={{
                                                        marginTop: 10,
                                                        marginBottom: 10,
                                                    }}
                                                    rows={4}
                                                          value={this.state.theComment}
                                                          onChange={(e) => {
                                                              let comment = e.target.value;
                                                              this.setState({
                                                                  theComment: comment
                                                              });
                                                          }}
                                                          placeholder="备注"/>

                                                <div style={{
                                                    margin: 5,
                                                    justifyContent: "space-around",
                                                    display: 'flex'
                                                }}>

                                                    <Button style={{
                                                        margin: 10,width:150
                                                    }}>确认扣款</Button>
                                                    <Button style={{
                                                        margin: 10,width:150
                                                    }}>挂起待确认</Button>
                                                    <Button style={{
                                                        margin: 10,width:150
                                                    }}>取消</Button>


                                                </div>
                                                <Table rowKey="id"
                                                       columns={[

                                                           {
                                                               title: '日期',
                                                               align: 'center',
                                                               dataIndex: 'bkUserName',
                                                               key: 'operationDiary_User',
                                                               render: (text, record) => (
                                                                   <div>{record.bkUserName}</div>),
                                                           }, {
                                                               title: '备注',
                                                               align: 'center',
                                                               dataIndex: 'createDate',
                                                               key: 'operationDiary_Date',
                                                               render: (text, record) => (
                                                                   <span>{record.createDate}</span>),
                                                           }, {
                                                               title: '审核类型',
                                                               align: 'center',
                                                               dataIndex: 'comment',
                                                               key: 'operationDiary_Status',
                                                               render: (text, record) => (
                                                                   <span>{record.comment}</span>),
                                                           }, {
                                                               title: '操作人',
                                                               align: 'center',
                                                               dataIndex: 'comment',
                                                               key: 'operationDiary_Status',
                                                               render: (text, record) => (
                                                                   <span>{record.comment}</span>),
                                                           }]}
                                                       dataSource={this.state.operationDiaryHistory}
                                                       loading={this.state.loadingComment}
                                                       pagination={{
                                                           total: this.state.totalpageComments * this.state.pgsize,
                                                           pageSize: this.state.pgsize,
                                                           onChange: this.changePageComment,
                                                       }}
                                                />
                                            </Card>


                                        </TabPane>
                                        <TabPane tab={steps[1].title} key="2">
                                            <p>Content of Tab Pane 2</p>
                                            <p>Content of Tab Pane 2</p>
                                            <p>Content of Tab Pane 2</p>
                                        </TabPane>
                                        <TabPane tab={steps[2].title} key="3">
                                            <p>Content of Tab Pane 3</p>
                                            <p>Content of Tab Pane 3</p>
                                            <p>Content of Tab Pane 3</p>
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </Card>
                        </Col>
                        <Col span={12}>

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
