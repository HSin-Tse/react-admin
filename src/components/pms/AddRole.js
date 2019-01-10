import React, {Component} from 'react';
import {
    Col,
    Card,
    Row,
    Input,
    Collapse,
    Button,
    Table,
    Icon,
    Checkbox,
    Popconfirm,
    message,
    Form
} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {bindActionCreators} from "redux";
import {setINFOR} from "../../action";
import connect from "react-redux/es/connect/connect";

const {TextArea} = Input;
const Panel = Collapse.Panel;

class AddRole extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            idList: [],
            powerList: [],
            allMenu: [],
            modal2Visible: false,
            operationDiaryHistory: [],
            anyThing: 'asdasd',
            changeNoteV: '',
            name: '',
            seret: '',
            realp: ''
        };
    }

    componentDidMount() {
        this.columns = [
            {
                align: 'center',
                title: '时间',
                dataIndex: '时间',
                key: '时间',
                render: (text, record) => (
                    <span>{record.date}</span>),
            }, {
                title: 'ip',
                align: 'center',

                dataIndex: 'ip',
                key: 'ip',
                render: (text, record) => (
                    <span>{record.comment}</span>),
            }, {
                title: '操作人',
                align: 'center',
                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (
                    <span>{record.oprator}</span>),
            }, {
                title: '操作',
                align: 'center',
                dataIndex: '操作',
                key: '操作',
                render: (text, record) => (
                    <span>{record.comment}</span>),
            }];
        var self = this;
        window.Axios.post('back/getMenuList', {}).then(function (response) {
            self.setState({
                menuList: response.data.data
            });
        });
    }

    confirmSave = () => {
        var self = this;
        let list = this.state.powerList;
        var groupBy = (array, f) => {
            let ansList = [];
            var ids = array.filter((item, index, array) => {
                return item > 0;
            });
            var flasg = array.filter((item, index, array) => {
                return item < 0;
            });
            ids.forEach((item) => {
                var select = flasg.some(function (flagItem, index, array) {
                    return ((flagItem + item) === 0) // 當全部 age 大於 10 才能回傳 true
                });
                ansList.push([item, select ? 1 : 0])
            });
            return ansList
        }


        let sorted = groupBy(list, (item) => {
            return [item.name];
        });
        // console.log(sorted);
        console.log('hcia sorted', sorted)


        if (sorted.length == 0) {
            message.error('权限沒有配置')
            return
        }
        window.Axios.post('back/saveOrUpdateRole', {
            name: self.state.name,
            content: self.state.changeNoteV,
            multilevelList: sorted,
            password: self.state.realp,
        }).then(function (response) {
            console.log('hcia response', response)
            message.success('操作成功')
        });

    }

    changeScret = (e) => {
        this.setState({
            realp: e.target.value,
        });
    }

    changeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    }

    changeNote = (e) => {
        this.setState({
            changeNoteV: e.target.value,
        });

    }
    onChange = (checkedValues) => {
        console.log('hcia checkedValues', checkedValues)
        this.setState({
            powerList: checkedValues,
        });
    }


    render() {

        const {getFieldDecorator} = this.props.form;
        const setingBlok = this.state.menuList.map(function (item, index) {
                return (
                    <Card bodyStyle={{padding: 0, margin: 0, marginLeft: 10}} style={{marginTop: 15}} key={index}


                          title={<span style={{marginLeft: 15, fontSize: 14}}> {item.name} </span>}
                        // title={item.name}
                          bordered={true}>
                        {
                            item.childrenMenu.map(function (item1, number) {


                                // console.log('hcia item1' , item1)
                                return (


                                    <Card.Grid style={{maxWidth: 250, textAlign: 'center', display: 'flex'}}>
                                        <Checkbox key={number} value={item1.id} id={number}>{item1.name}</Checkbox>
                                        <Checkbox key={number} value={-item1.id} id={number}>可操作</Checkbox>
                                        {/*<Switch checkedChildren="可操作" unCheckedChildren="只讀" defaultChecked />*/}
                                    </Card.Grid>


                                );
                            })
                        }
                    </Card>
                );
            }
        )
        const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
        return (


            <div>
                <h2 style={{marginTop: 15}}>新增角色</h2>
                <Collapse  onChange={(key) => {
                    console.log(key);
                }}>
                    <Panel header="This is panel header 1" key="1">
                        <p>{text}</p>
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                        <p>{text}</p>
                    </Panel>

                </Collapse>

                <BreadcrumbCustom first="权限管理" second="内部人员配置" third="新增角色"/>

                <Card bodyStyle={{marginLeft: 10}} title={<span style={{fontSize: 18}}> 基本信息 </span>} bordered={true}
                      style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Col md={12}>

                            <div style={{fontWeight: 'bold', fontSize: 16, display: 'flex', minHeight: 50}}>
                                <span style={{width: 100}}>角色名称:</span>
                                <Input
                                    onChange={this.changeName}
                                    defaultValue={this.state.name}
                                    style={{width: 180}}/>
                            </div>
                            <div style={{fontWeight: 'bold', fontSize: 16, display: 'flex', minHeight: 50}}>
                                <span style={{width: 100}}>角色备注:</span>
                                <TextArea
                                    style={{width: 180}}
                                    value={this.state.changeNoteV}
                                    onChange={this.changeNote}
                                    rows={4}/>
                            </div>


                        </Col>
                    </Row>
                </Card>

                <Card bodyStyle={{padding: 0, margin: 0}} title={<span style={{fontSize: 18}}> 权限配置 </span>}
                      bordered={true}
                      style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Checkbox.Group style={{width: '100%'}} onChange={this.onChange}>
                            <Col md={24}>
                                {setingBlok}
                            </Col>
                        </Checkbox.Group>
                    </Row>
                </Card>

                <Card bodyStyle={{padding: 0, margin: 0}}
                      title={<span style={{fontSize: 18}}> 特殊权限配置 </span>} bordered={true}
                      style={{marginTop: 15}}>

                    {/*<Row gutter={8}>*/}
                    {/*<Checkbox.Group style={{width: '100%'}} onChange={this.onChange}>*/}
                    {/*<Col md={24}>*/}
                    {/*{setingBlok}*/}
                    {/*</Col>*/}
                    {/*</Checkbox.Group>*/}
                    {/*</Row>*/}
                    <Card bodyStyle={{marginLeft: 15}}
                          title={<span style={{marginLeft: 15, fontSize: 14}}> 电汇入金 </span>}
                          bordered={true}>

                        <Checkbox>创建</Checkbox>
                        <Checkbox>财务审核</Checkbox>
                        <Checkbox>入金完成（只读）</Checkbox>
                    </Card>
                    <Card bodyStyle={{marginLeft: 15}} title={<span style={{marginLeft: 15, fontSize: 14}}> 出金管理</span>}
                          bordered={true}>

                        <Checkbox>客维审核</Checkbox>
                        <Checkbox>后台审核</Checkbox>
                        <Checkbox>银行放款</Checkbox>
                        <Checkbox>入金完成（只读）</Checkbox>
                    </Card>
                </Card>


                <Card bodyStyle={{marginLeft: 10}} title={<span style={{fontSize: 18}}> 操作日志 </span>}
                      bordered={true}
                      style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Col md={24}>

                            <Table rowKey="id"
                                   columns={this.columns}
                                   dataSource={this.state.userList}
                                   bordered
                                   loading={this.state.loading}
                                   pagination={{  // 分页
                                       total: this.state.pgsize * this.state.totalPage,
                                       pageSize: this.state.pgsize,
                                       onChange: this.changePage,
                                   }}
                            />


                        </Col>
                    </Row>
                </Card>
                <Card bodyStyle={{marginLeft: 10}} title={<span style={{fontSize: 18}}> 安全验证 </span>} bordered={true}
                      style={{marginTop: 15}}>
                    <Row gutter={8}>
                        <Col md={24}>
                            <div style={{fontWeight: 'bold', fontSize: 16, display: 'flex', minHeight: 50}}>
                                <span style={{width: 200}}>請輸入你的密碼:</span>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: 'Please input your password!',
                                    }, {
                                        validator: this.validateToNextPassword,
                                    }],
                                })(
                                    <Input style={{width: 800}} addonAfter={<Icon style={{color: 'red'}} type="star"/>}
                                           onChange={this.changeScret} placeholder="請輸入你的密碼加以驗證:" type="password"/>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Card>


                <Row gutter={12}>
                    <Card style={{marginTop: 10}}>

                        <div>
                            <Popconfirm title="确认保存"
                                        onConfirm={this.confirmSave} okText="Yes"
                                        cancelText="No">
                                <Button type={"primary"} loading={this.state.iconLoading}>保存</Button>
                            </Popconfirm>

                            <Button onClick={this.props.history.goBack}
                                    loading={this.state.iconcanLoading}>返回</Button>
                        </div>
                    </Card>
                </Row>
            </div>
        )
    }


}

const mapStateToPorps = state => {
    const {auth} = state.httpData;
    const infor = state.infor;
    return {auth, infor};
};
const mapDispatchToProps = dispatch => ({
    setUSER: bindActionCreators(setINFOR, dispatch),
});

export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(AddRole));
