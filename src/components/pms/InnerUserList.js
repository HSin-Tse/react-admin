/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, message, Select, Modal, Card, Col, Popconfirm, Tag, Input, Form, Icon} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";

const Option = Select.Option;
const {TextArea} = Input;

class InnerUserList extends Component {
    changeScret = (e) => {
        this.setState({
            realp: e.target.value,
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visibleOpM: false,
            date: new Date(),
            userList: [],
            nodeList: [],
            loading: false,
            searchPhone: '',
            realp: '',
            freezecomment: '',
            totalPage: 1,
            modeState: 1,
            blockFlag: '',
            forbiddenValue: 0,
            current: 0,
            pgsize: 10,
            loadFor: false,
            suspend_reason_type: []

        };
    }

    handleFreeze = (record) => {
        let self = this;


        self.setState({
                blockFlag: record.blockFlag
            }, () => {
                this.showModalFrezz()
                console.log('hcia record', record)
            }
        );


    }

    componentDidMount() {

        let self = this;
        window.Axios.post('dict/openDict', {
            'keys': 'suspend_reason_type',
        }).then(function (response) {
            console.log(response);

            self.setState({
                    suspend_reason_type: response.data.data.suspend_reason_type
                }
            );


        }).catch(function (error) {
            console.log(error);
        });

        this.columns = [
            {
                title: '编号',
                fixed: 'left',
                width: 70,
                align: 'center',
                dataIndex: '编号',
                key: '编号',
                render: (text, record) => (
                    <span>{record.idNo}</span>),
            },
            {
                title: '真实姓名',
                width: 100,
                align: 'center',
                dataIndex: '真实姓名',
                key: '真实姓名',
                render: (text, record) => (
                    <span>{record.displayName}</span>),
            },
            {
                title: '登录名',
                width: 100,
                align: 'center',
                dataIndex: '登录名',
                key: '登录名',
                render: (text, record) => (
                    <span>{record.loginName}</span>),
            },
            {
                title: '角色',
                width: 100,
                dataIndex: '角色',
                align: 'center',
                key: '角色',
                render: (text, record) => (
                    <span>
                        {/*{record.allRole}*/}

                        {
                            record.allRole ?

                                Object.keys(record.allRole).map((item1, number) => {
                                    return (
                                        <span key={number} value={item1}>{record.allRole[item1]}</span>
                                    );
                                }) : 'admin'
                        }



                    </span>),
            },
            {
                title: '邮箱',
                width: 200,
                dataIndex: '邮箱',
                key: '邮箱',
                render: (text, record) => (<span>{record.email}</span>),
            }, {
                title: '性别',
                width: 70,
                align: 'center',
                dataIndex: '性别',
                key: '性别',
                render: (text, record) => (
                    <span>{record.gender}</span>),
            }, {
                align: 'center',
                title: '手机号',
                dataIndex: '手机号',
                key: '手机号',
                width: 120,

                render: (text, record) => (
                    <span>{record.mobile}</span>),
            }, {
                title: '微信号',
                dataIndex: '微信号',
                key: '微信号',
                align: 'center',
                width: 120,
                render: (text, record) => (
                    <span>{record.weChat ? record.weChat : 'testtest'}</span>)
            }, {
                title: '最后登录',
                dataIndex: '最后登录',
                key: '最后登录',
                width: 220,
                render: (text, record) => (
                    <span>{record.lastLoginTime}</span>),
            }, {
                title: '访问次数',
                dataIndex: '访问次数',
                key: '访问次数',
                align: 'center',
                width: 100,
                render: (text, record) => (
                    <span>{record.totalLoginNum == "null" ? 0 : record.totalLoginNum}</span>),
            }, {
                title: '状态',
                dataIndex: '状态',
                key: '状态',
                width: 100,
                align: 'center',
                render: (text, record) => (
                    <span>{record.blockFlag}</span>
                )

            }, {
                title: '日志',
                dataIndex: '日志',
                fixed: 'right',
                align: 'center',
                width: 120,
                key: '日志',
                render: (text, record) => (
                    <Button className="ant-dropdown-link"
                            onClick={() => this.seeDetail(record)}>查看</Button>)
            }, {

                title: '操作',
                key: 'action',
                fixed: 'right',
                align: 'center',
                width: 200,
                render: (text, record) => (

                    <div>

                        <Button className="ant-dropdown-link" onClick={() => this.newUSer(record)}>
                            编辑</Button>

                        <Button onClick={() => this.handleFreeze(record)} className="ant-dropdown-link">冻结</Button>

                    </div>
                ),
            }];

        this.nodeColumns = [
            {
                title: '日期',
                width: 140,
                dataIndex: '日期',
                key: '日期',
                render: (text, record) => (
                    <span>{this.timestampToTime(record.createDate)}</span>)
            },
            {
                title: '备注',
                dataIndex: '备注',
                key: '备注',
                width: 120,
                render: (text, record) => (
                    <span>{record.comment}</span>)
            }, {
                title: '操作人',
                dataIndex: '操作人',
                width: 120,
                key: '操作人',
                render: (text, record) => (
                    <span>{record.bkUserName}</span>)
            }];

        this.freezeColumns = [
            {
                title: '操作人',
                width: 140,
                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (
                    <span>{this.timestampToTime(record.bkUserName)}</span>)
            },
            {
                title: '操作详情',
                dataIndex: '操作详情',
                key: '操作详情',
                width: 120,
                render: (text, record) => (
                    <span>{record.comment}</span>)
            }, {
                title: '操作时间',
                dataIndex: '操作时间',
                width: 120,
                key: '操作时间',
                render: (text, record) => (
                    <span>{record.createDate}</span>)
            }];


        this.requestPage()
    }

    timestampToTime = (timestamp) => {
        const dateObj = new Date(+timestamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
        const year = dateObj.getFullYear() // 获取年，
        const month = dateObj.getMonth() + 1 // 获取月，必须要加1，因为月份是从0开始计算的
        const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。
        const hours = this.pad(dateObj.getHours())  // 获取时, this.pad函数用来补0
        const minutes = this.pad(dateObj.getMinutes()) // 获取分
        const seconds = this.pad(dateObj.getSeconds()) // 获取秒
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
    };
    pad = (str) => {
        return +str >= 10 ? str : '0' + str
    };

    seeDetail = (record) => {
        ///
        let self = this
        window.Axios.post('back/getBackUserDetail', {
            'id': record.id,
        }).then(function (response) {
            console.log(response);


            if (response.data.code == 1) {

            } else {
                return
            }
            self.setState({
                    // nodeList: response.data.data.list
                }, () => {
                    self.showModal()
                }
            );


        }).catch(function (error) {
            console.log(error);
        });

        ////
    };


    timestampToTime = (timestamp) => {
        const dateObj = new Date(+timestamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
        const year = dateObj.getFullYear() // 获取年，
        const month = dateObj.getMonth() + 1 // 获取月，必须要加1，因为月份是从0开始计算的
        const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。
        const hours = this.pad(dateObj.getHours())  // 获取时, this.pad函数用来补0
        const minutes = this.pad(dateObj.getMinutes()) // 获取分
        const seconds = this.pad(dateObj.getSeconds()) // 获取秒
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
    };
    pad = (str) => {
        return +str >= 10 ? str : '0' + str
    };
    requestPage = () => {

        let self = this
        self.setState({
                loading: true,
            }
        );
        window.Axios.post('back/getBackUserList', {
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
        this.setState({
            current: page - 1,
        }, () => {
            this.requestPage()
        })
    }
    newUSer = (record) => {
        // this.props.history.push('/app/pms/adduser' + 0)
        if (record) {
            console.log('hcia record', record)
            console.log('hcia record.id', record.id)
            this.props.history.push('/app/pms/edituser' + record.id)

        } else {
            this.props.history.push('/app/pms/adduser' + 0)

        }

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    showModalFrezz = () => {
        this.setState({
            visibleOpM: true,
        });
    }
    handleOk = () => {
        var mStatus = this.state.modeState == '正常' ? 1 : this.state.modeState == '禁止登陆' ? 2 : 3;
        // var reasonType = mStatus ==2?
        let self = this;
        self.setState({
            loadFor: true
        })
        window.Axios.post('star/updateStarLiveAccount', {
            'id': self.state.opRecord.id,
            'status': mStatus,
            'reasonType': self.state.forbiddenValue,
        }).then(function (response) {
            console.log(response);
            self.setState({
                visibleOpM: false,
                loadFor: false,
            }, () => {
                self.state.forbiddenValue = 0
                self.requestPage()
            });
            message.success('操作成功');

        }).catch(function (error) {
            console.log(error);
        });
    };
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            visibleOpM: false,
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
                {/*<div>searchPhone query :{JSON.stringify(this.state.searchPhone)}</div>*/}

                <Modal
                    width={600}
                    title={this.state.blockFlag == '正常' ? '冻结' : '解除'}
                    onCancel={this.handleCancel}
                    visible={this.state.visibleOpM}
                    footer={[

                        <Button key="back" onClick={this.handleCancel}>取消操作</Button>,
                        <Button loading={this.state.loadFor} key="submit" type="primary"
                                onClick={() => this.handleOk()}>
                            {this.state.blockFlag == '正常' ? '冻结' : '解除'}
                        </Button>,
                    ]}
                >
                    <div>
                        <h3>请输入原因：</h3>
                        <TextArea
                            value={this.state.freezecomment}
                            rows={4}></TextArea>
                    </div>
                    <div style={{marginTop: 15, display: 'flex'}}>
                        <h3 style={{width: 150}}>操作人员密码：</h3>

                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input
                                onChange={this.changeScret} placeholder="請輸入你的密碼加以驗證:" type="password"/>
                        )}
                    </div>
                    
                    <Table

                        style={{marginTop: 15}}
                        rowKey="id"
                        columns={this.freezeColumns}
                        dataSource={this.state.nodeList}// nodeList
                    />


                </Modal>

                <Modal
                    title="备注详情"
                    onCancel={this.handleCancel}
                    visible={this.state.visible}
                    footer=''
                >
                    <div>
                        <h3>处理备注：</h3>

                    </div>
                    <Table rowKey="id"
                           columns={this.nodeColumns}
                           dataSource={this.state.nodeList}// nodeList
                    />


                </Modal>
                <BreadcrumbCustom first="权限管理" second="内部成员列表"/>

                <Card title="内部成员列表"
                      extra={
                          <Button type="default"
                                  onClick={() => this.newUSer()}>新增
                          </Button>
                      }>

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
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(InnerUserList));


