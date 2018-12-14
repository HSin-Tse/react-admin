/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, message, Select, Modal, Card, Col, Popconfirm} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";

const Option = Select.Option;

class Basic extends Component {

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
            totalPage: 1,
            modeState: 1,
            forbiddenValue: 0,
            current: 0,
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


        }).catch(function (error) {
            console.log(error);
        });
        // comment: null
        // createBackUserName: null
        // createDate: ""
        // operator: null
        // roleComment: null
        this.columns = [
            {
                title: '编号',
                width: 70,
                align: 'center',
                dataIndex: '编号',
                key: '编号',
                render: (text, record) => (
                    <span>{record.idNo}</span>),
            },

            {
                title: '角色名称',
                dataIndex: '角色名称',
                align: 'center',
                key: '角色名称',
                width: 240,

                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {
                title: '创建时间',
                dataIndex: '创建时间',
                key: '创建时间',
                width: 240,
                align: 'center',
                render: (text, record) => (
                    <span>{record.createDate}</span>),
            }, {
                title: '创建人',
                dataIndex: '创建人',
                width: 120,
                align: 'center',
                key: '创建人',
                render: (text, record) => (
                    <span>{record.operator}</span>)
            }, {
                title: '角色备注',
                dataIndex: '角色备注',
                width: 420,
                align: 'center',
                key: '角色备注',
                render: (text, record) => (
                    <span>{record.roleComment}</span>)
            }, {
                title: '操作日志',
                dataIndex: '操作日志',
                width: 120,
                align: 'center',
                key: '操作日志',
                render: (text, record) => (
                    <Button
                        // style={{ width: 200}}
                        className="ant-dropdown-link"
                        onClick={() => this.seeDetail(record)}>详情</Button>)
            }, {
                title: '操作',
                width: 200,
                align: 'center',
                key: 'action',
                render: (text, record) => (
                    <div
                        // style={{ width: 240}}
                    >
                        <Button className="ant-dropdown-link"
                                onClick={() => this.addRole(record)}>编辑</Button>


                        <Popconfirm title="删除"
                                    onConfirm={() => this.deleteRole(record)} okText="Yes"
                                    cancelText="No">
                            <Button className="ant-dropdown-link"
                            >删除</Button>
                        </Popconfirm>
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
        let self = this
        window.Axios.post('star/getStarLiveAccountCommentList', {
            'pageSize': 100,
            'id': record.id,
        }).then(function (response) {
            console.log(response);

            self.setState({
                    nodeList: response.data.data.list
                }, () => {
                    self.showModal()
                }
            );


        }).catch(function (error) {
            console.log(error);
        });
    };
    handleChange = (value, record) => {
        let self = this
        self.setState({
                modeState: value,
                opRecord: record
            }, () => {
                self.showModalOP()
            }
        );

    };
    forbitChange = (value) => {
        let self = this
        self.setState({
                forbiddenValue: value,
            }
        );
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
        let self = this;

        self.setState({
                loading: true,
            }
        );


        window.Axios.post('back/getRoleList', {
            'pageSize': self.state.pgsize,
            'pageNo': self.state.current,
        }).then(function (response) {
            // console.log(response);

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
    addRole = (record) => {

        if (record) {
            console.log('hcia record', record)
            console.log('hcia record.id', record.id)
            this.props.history.push('/app/pms/editrole' + record.id)

        } else {
            this.props.history.push('/app/pms/addrole' + 0)

        }


    }
    deleteRole = (record) => {
        console.log('hcia record', record)
        let self = this;

        window.Axios.post('back/removeRole', {
            'idList': [record.id],
        }).then(function (response) {
            console.log(response);

            if (response.data.code == 1) {
                message.success('操作成功');
                self.requestPage()

            }

        }).catch(function (error) {
            console.log(error);
        });


    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    showModalOP = () => {
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
        return (
            <div>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
                {/*<div>searchPhone query :{JSON.stringify(this.state.searchPhone)}</div>*/}
                {/*this.state.selectedRowKeys.length > 0*/}

                <Modal
                    title={this.state.modeState == '正常' ? '恢复正常' : this.state.modeState}
                    onCancel={this.handleCancel}
                    visible={this.state.visibleOpM}
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
                    title="备注详情"
                    onCancel={this.handleCancel}
                    visible={this.state.visible}
                    footer=''
                >
                    <Table rowKey="id"
                           columns={this.nodeColumns}
                           dataSource={this.state.nodeList}// nodeList
                    />


                </Modal>
                <h2 style={{marginTop: 15}}>
                    内部角色配置
                </h2>

                <BreadcrumbCustom first="权限管理" second="内部角色配置"/>

                <Card title="角色配置表"
                      extra={<Button type="default" onClick={() => this.addRole()}>新增</Button>}>
                    <Table

                        rowKey="id"

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
