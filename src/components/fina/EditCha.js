/* eslint-disable react/sort-comp */

import React, {Component} from 'react';
import {Col, Card, Row, DatePicker, Input, Modal, Button, Table} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {parse} from 'querystring';
import avater from "../../style/imgs/b1.jpg";

const {Meta} = Card;

class EditCha extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            , userList: []
            , operationDiaryHistory: []
        };
    }

    componentDidMount() {

        this.requestD()
        // this.requestUserCommentList()

    }

    render() {

        return (
            <div>

                <h2 style={{marginTop: 15}}>
                    渠道设置
                </h2>

                <BreadcrumbCustom first="财务审核" second="渠道管理" third="渠道设置"/>
                <Card title="某渠道设置">

                    <img style={{width: 100}} src={avater} alt="头像"/>
                    {/*< Meta title={this.state.userList.length == 0 ? '姓名：' : '姓名：' + this.state.userList.base.name}/>*/}

                </Card>
                <Card
                    style={{marginTop: 16}}
                    type="inner"
                    title="數據信息"
                >
                    < Meta
                        title={'123'}/>


                </Card>
                <Card
                    style={{marginTop: 16}}
                    type="inner"
                    title="行為信息"
                >
                    {/*< Meta title={this.state.userList.length == 0 ? 'APP版本:' : 'APP版本:' + this.state.userList.base.versionInfo}/>*/}


                </Card>
                <Card
                    style={{marginTop: 16}}
                    type="inner"
                    title="其他"

                >
                    <Table rowKey="id"
                           columns={[{
                               title: '時間',
                               align: 'center',
                               dataIndex: 'createDate',
                               key: 'operationDiary_Date',

                               render: (text, record) => (
                                   <span>{record.date}</span>),
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
                           }]} dataSource={this.state.operationDiaryHistory}
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


    requestD = () => {
        var self = this;
        window.Axios.post('finance/updateDepositChannel', {
            'id': self.props.match.params.id,
        }).then((response) => {
            self.setState({userList: response.data.data});
        });
    };
}

export default EditCha;
