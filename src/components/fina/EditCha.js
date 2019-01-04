/* eslint-disable react/sort-comp */

import React, {Component} from 'react';
import {Select, Card, Row, DatePicker, Input, Modal, Button, Table} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {parse} from 'querystring';

const Option = Select.Option;
const {Meta} = Card;

class EditCha extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            mDetail: {},
            operationDiaryHistory: []
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
                    <div style={{display: 'flex', minHeight: 40, align: 'center'}}>
                        <span style={{minWidth: 80}}>渠道名称：</span>
                        <Input

                            value={this.state.mDetail.channelName}

                            onChange={(e) => {
                                this.setState({
                                    mDetail: {...this.state.mDetail, channelName: e.target.value},
                                });
                            }} style={{width: 200, marginBottom: 10}} placeholder=""/>
                    </div>
                    <div style={{display: 'flex', minHeight: 40, align: 'center'}}>
                        <span style={{minWidth: 80}}>渠道编号：</span>
                        <Input value={this.state.mDetail.channelCode}
                               onChange={(e) => {
                                   this.setState({
                                       mDetail: {...this.state.mDetail, channelCode: e.target.value},
                                   });
                               }} style={{width: 200, marginBottom: 10}} placeholder=""/>
                    </div>
                    <div style={{display: 'flex', minHeight: 40, align: 'center'}}>
                        <span style={{minWidth: 80}}>渠道状态：</span>
                        <Select value={this.state.mDetail.displayStatus} style={{width: 200}}>
                            <Option value="可用">打开</Option>
                            <Option value="不可用">关闭</Option>
                        </Select>
                    </div>

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
                           columns={[
                               {
                                   align: 'center',
                                   title: '操作人',
                                   dataIndex: 'bkUserName',
                                   key: 'operationDiary_User',
                                   render: (text, record) => (
                                       <span>{record.bkUserName}</span>),
                               }, {
                                   align: 'center',
                                   title: '操作备注',
                                   dataIndex: '操作备注',
                                   key: '操作备注',
                                   render: (text, record) => (
                                       <span>{record.comment}</span>),
                               }, {
                                   title: '操作時間',
                                   align: 'center',
                                   dataIndex: 'createDate',
                                   key: 'operationDiary_Date',

                                   render: (text, record) => (
                                       <span>{record.date}</span>),
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
        window.Axios.post('finance/getDepositChannelDetail', {
            'id': self.props.match.params.id,
        }).then((response) => {
            self.setState({mDetail: response.data.data});
        });
    };
}

export default EditCha;
