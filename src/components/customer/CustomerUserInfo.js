/* eslint-disable react/sort-comp */

import React, {Component} from 'react';
import {Card, Table} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';

const {Meta} = Card;

class CustomerUserInfo extends Component {
    state = {visible: false, modal2Visible: false}


    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            , userList: []
            , operationDiaryHistory: []
        };
    }

    showModal2 = () => {
        this.setState({
            modal2Visible: true,
            visible: false,

        });
    }
    showModal = () => {
        this.setState({
            visible: true,
            modal2Visible: false,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            modal2Visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            modal2Visible: false,
        });
    }

    componentDidMount() {


        this.requestListData()
        this.ediftModalColumn()
        this.requestUserCommentList()

    }

    render() {

        return (

            <div>


                <h2 style={{marginTop: 15}}>
                    行为信息
                </h2>

                <BreadcrumbCustom first="用户總表" second="行为信息"/>
                <Card
                    type="inner"
                    title="基本信息"
                >

                    < Meta title={this.state.userList.length == 0 ? '姓名：' : '姓名：' + this.state.userList.base.name}/>
                    < Meta
                        title={this.state.userList.length == 0 ? '手机：' : '手机：' + this.state.userList.base.mobile}/>
                    < Meta
                        title={this.state.userList.length == 0 ? '邮箱：' : '邮箱：' + this.state.userList.base.email}/>
                </Card>
                <Card
                    style={{marginTop: 16}}
                    type="inner"
                    title="數據信息"
                >
                    < Meta
                        title={this.state.userList.length == 0 ? '注册时间：' : '注册时间：' + this.state.userList.base.date}/>
                    < Meta
                        title={this.state.userList.length == 0 ? '上次访问时间：' : '上次访问时间：' + this.state.userList.base.lastLoginTime}/>
                    < Meta
                        title={this.state.userList.length == 0 ? '上次访问IP：' : '上次访问IP：' + this.state.userList.base.lastLoginIP}/>
                    < Meta
                        title={this.state.userList.length == 0 ? '地理位置：' : '地理位置：' + this.state.userList.base.location}/>

                </Card>
                <Card
                    style={{marginTop: 16}}
                    type="inner"
                    title="行为信息"
                >
                    < Meta
                        title={this.state.userList.length == 0 ? 'APP版本:' : 'APP版本:' + this.state.userList.base.versionInfo}/>
                    < Meta
                        title={this.state.userList.length == 0 ? '手机型号:' : '手机型号:' + this.state.userList.base.clientInfo}/>
                    < Meta
                        title={this.state.userList.length == 0 ? '操作系统型号:' : '操作系统型号:' + this.state.userList.base.systemInfo}/>
                    < Meta
                        title={this.state.userList.length == 0 ? '下载平台:' : '下载平台:' + this.state.userList.base.channelInfo}/>

                </Card>
                <Card
                    style={{marginTop: 16}}
                    type="inner"
                    title="其他"

                >
                    <Table rowKey="id"
                           columns={this.modalColumns} dataSource={this.state.operationDiaryHistory}
                    />
                </Card>


            </div>
        )
    }


    requestUserCommentList = () => {
        var self = this;

        window.Axios.post('auth/getUserCommentList', {
            'belongUserId': self.props.match.params.id,
        }).then((response) => {
            self.setState({operationDiaryHistory: response.data.data.list});
        })
    }

    ediftModalColumn = () => {
        this.modalColumns = [{
            title: '時間',
            align: 'center',
            dataIndex: 'createDate',
            key: 'operationDiary_Date',

            render: (text, record) => (
                <span>{this.timestampToTimeNI(record.createDate)}</span>),
        }, {
            title: 'ip',
            dataIndex: 'ip',
            key: 'ip',
            align: 'center',
            render: (text, record) => (
                <span>{record.ip}</span>),
        }, {
            align: 'center',
            title: '操作',
            dataIndex: '操作',
            key: '操作',
            render: (text, record) => (
                <span>{record.comment}</span>),
        }, {
            align: 'center',
            title: '操作人',
            dataIndex: 'bkUserName',
            key: 'operationDiary_User',
            render: (text, record) => (
                <span>{record.bkUserName}</span>),
        }]
    }

    timestampToTimeNI = (timestamp) => {
        const dateObj = new Date(+timestamp)
        const year = dateObj.getFullYear()
        const month = dateObj.getMonth() + 1
        const date = dateObj.getDate()
        const hours = this.pad(dateObj.getHours())
        const minutes = this.pad(dateObj.getMinutes())
        const seconds = this.pad(dateObj.getSeconds())
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
    };
    pad = (str) => {
        return +str >= 10 ? str : '0' + str
    };

    timestampToTime = (timestamp) => {
        const dateObj = new Date(+timestamp)
        const year = dateObj.getFullYear()
        const month = dateObj.getMonth() + 1 // 获取月，必须要加1，因为月份是从0开始计算的
        const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。

        return year + '-' + month + '-' + date
    };
    requestListData = () => {
        var self = this;
        window.Axios.post('ixuser/userOverView', {
            'belongUserId': self.props.match.params.id,
        }).then((response) => {

            if (response.data.data.base != null) {
                self.setState({userList: response.data.data});

            }
        });
    };
}

export default CustomerUserInfo;
