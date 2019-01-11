import React, {Component} from 'react';
import {
    Col,
    Card,
    Row,
    Input,
    Button,
    Table,
    Icon,
    Checkbox,
    Popconfirm,
    Select,
    message,
    Form
} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {bindActionCreators} from "redux";
import {setINFOR} from "../../action";
import connect from "react-redux/es/connect/connect";

const {TextArea} = Input;
const Option = Select.Option;

class AddRole extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            idList: [],
            powerList: [],
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


    changeNote = (e) => {
        this.setState({
            changeNoteV: e.target.value,
        });

    }


    render() {

        const {getFieldDecorator} = this.props.form;
        const {powerList} = this.state;
        const setingBlok = this.state.menuList.map(function (item, index) {
                // console.log('hcia item', item)
                var _childList = item.childrenMenu

                return (
                    <Card bodyStyle={{padding: 0, margin: 0, marginLeft: 0}} style={{marginTop: 0}} key={index}
                          title={<span style={{marginLeft: 0, fontSize: 14}}> {item.name} </span>}
                          bordered={true}>
                        {
                            _childList.map(function (item1, number) {
                                console.log('hcia item1', item1)


                                return (
                                    <Card.Grid style={{textAlign: 'center', display: 'flex'}}>
                                        <Checkbox onChange={(value) => {
                                            item1.sscheck = value.target.checked

                                        }} key={number} value={item1.id} id={number}>{item1.name}</Checkbox>


                                        <Checkbox
                                            style={{display: item1.childrenMenu.length == 0 ? '' : 'none'}}
                                            disabled={!item1.sscheck}
                                            key={number}
                                            value={-item1.id} id={number}>可操作</Checkbox>


                                        <Select
                                            disabled={!item1.sscheck}

                                            onChange={(value)=>{
                                                console.log('hcia value' , value)

                                            }}
                                            style={{width: '80%', display: item1.childrenMenu.length == 0 ? 'none' : ''}}
                                            mode="tags"
                                            // style={{ width: '100%' }}
                                            placeholder="特殊权限配置"
                                            // onChange={handleChange}
                                        >
                                            {
                                                item1.childrenMenu.map((item2, num2) => {

                                                    return (

                                                        <Option
                                                            key={item2.id}
                                                            id={number}>{item2.name}
                                                        </Option>
                                                    )
                                                })
                                            }

                                        </Select>
                                        {/*{*/}
                                        {/*item1.childrenMenu.map((item2,num2)=>{*/}

                                        {/*return(*/}

                                        {/*<Checkbox onChange={(value) => {*/}
                                        {/*item2.sscheck = value.target.checked*/}

                                        {/*}} key={number} value={item2.id} id={number}>{item2.name}</Checkbox>*/}
                                        {/*)*/}
                                        {/*})*/}
                                        {/*}*/}


                                    </Card.Grid>
                                );
                            })
                        }
                    </Card>
                );
            }
        )

        return (


            <div>
                <h2 style={{marginTop: 15}}>新增角色</h2>

                <BreadcrumbCustom first="权限管理" second="内部人员配置" third="新增角色"/>

                <Card bodyStyle={{marginLeft: 10}} title={<span style={{fontSize: 18}}> 基本信息 </span>} bordered={true}
                      style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Col md={12}>

                            <div style={{fontWeight: 'bold', fontSize: 16, display: 'flex', minHeight: 50}}>
                                <span style={{width: 100}}>角色名称:</span>
                                <Input
                                    onChange={(e) => {
                                        this.setState({
                                            name: e.target.value,
                                        });
                                    }}
                                    defaultValue={this.state.name}
                                    style={{width: 180}}/>
                            </div>
                            <div style={{fontWeight: 'bold', fontSize: 16, display: 'flex', minHeight: 50}}>
                                <span style={{width: 100}}>角色备注:</span>
                                <TextArea
                                    style={{width: 180}}
                                    value={this.state.changeNoteV}
                                    onChange={(e) => {
                                        this.setState({
                                            changeNoteV: e.target.value,
                                        });

                                    }}
                                    rows={4}/>
                            </div>


                        </Col>
                    </Row>
                </Card>

                <Card bodyStyle={{padding: 0, margin: 0}} title={<span style={{fontSize: 18}}> 权限配置 </span>}
                      bordered={true}
                      style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Checkbox.Group style={{width: '100%'}} onChange={(checkedValues) => {
                            console.log('hcia checkedValues', checkedValues)
                            this.setState({
                                powerList: checkedValues,
                            });
                        }}>
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
                                   columns={[
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
                                       }]}
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
                                           onChange={(e) => {
                                               this.setState({
                                                   realp: e.target.value,
                                               });
                                           }} placeholder="請輸入你的密碼加以驗證:" type="password"/>
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
