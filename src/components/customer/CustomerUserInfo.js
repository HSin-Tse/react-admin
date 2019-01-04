/* eslint-disable react/sort-comp */

import React, {Component} from 'react';
import {Col, Card, Row, DatePicker, Input, Modal, Button, Table, Icon, Checkbox} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import axios from 'axios';
import {parse} from 'querystring';
import avater from "../../style/imgs/b1.jpg";

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
        const style1 = {
            padding: '8px',
        };
        const {
            Meta
        } = Card;

        return (

            <div>


                <h2 style={{marginTop: 15}}>
                    行為信息
                </h2>

                <BreadcrumbCustom first="用户總表" second="行為信息"/>
                {/*<Card*/}
                {/*style={{ width: 240 }}*/}
                {/*cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}*/}
                {/*>*/}
                {/*<Meta*/}
                {/*title="Europe Street beat"*/}
                {/*description="www.instagram.com"*/}
                {/*/>*/}
                {/*</Card>*/}
                <Card
                    type="inner"
                    title="基本信息"
                >


                    <img style={{width: 100}} src={avater} alt="头像"/>
                    < Meta title={this.state.userList.length == 0 ? '姓名：' : '姓名：' + this.state.userList.base.name}/>
                    < Meta
                        title={this.state.userList.length == 0 ? '手机：' : '手机：' + this.state.userList.base.cellphone}/>
                    < Meta
                        title={this.state.userList.length == 0 ? '邮箱：' : '邮箱：' + this.state.userList.base.email}/>
                </Card>
                <Card
                    style={{marginTop: 16}}
                    type="inner"
                    title="數據信息"
                >
                    < Meta
                        title={this.state.userList.length == 0 ? '注册时间：' : '注册时间：' + this.timestampToTime(this.state.userList.base.regDate)}/>
                    < Meta
                        title={this.state.userList.length == 0 ? '上次访问时间：' : '上次访问时间：' + this.timestampToTime(this.state.userList.base.lastLoginTime)}/>
                    < Meta
                        title={this.state.userList.length == 0 ? '上次访问IP：' : '上次访问IP：' + this.state.userList.base.lastLoginIP}/>
                    < Meta
                        title={this.state.userList.length == 0 ? '地理位置：' : '地理位置：' + this.state.userList.base.location}/>

                </Card>
                <Card
                    style={{marginTop: 16}}
                    type="inner"
                    title="行為信息"
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
        var tmp = this;

        window.Axios.post('auth/getUserCommentList', {
            'belongUserId': '4028b2a4631f770f01631f7770df0000',
            'loginName': 'admin',
            'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNTQ1NTI4ODM0MTk5LCJsb2dpbk5hbWUiOiJhZG1pbiJ9.F7moE4DsMUiajkKB1S_wemwsozlUW5VMxQKsg4KsSUQ'
        }).then((response) => {
            tmp.setState({operationDiaryHistory: response.data.data.list});
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

    timestampToTime = (timestamp) => {
        const dateObj = new Date(+timestamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
        const year = dateObj.getFullYear() // 获取年，
        const month = dateObj.getMonth() + 1 // 获取月，必须要加1，因为月份是从0开始计算的
        const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。

        return year + '-' + month + '-' + date
    };
    requestListData = () => {
        var self = this;
        window.Axios.post('ixuser/userOverView', {
            'belongUserId': self.props.match.params.id,
        }).then((response) => {
            self.setState({userList: response.data.data});
        });
    };
}

export default CustomerUserInfo;
