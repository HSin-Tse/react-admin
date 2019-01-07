/* eslint-disable react/sort-comp */

import React, {Component} from 'react';
import {Select, Card, Checkbox, DatePicker, Input, Modal, Button, Table} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {parse} from 'querystring';

const Option = Select.Option;

class EditCha extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mDetail: {},
            operationDiaryHistory: [],
            mName: '',
            mCode: '',
            mStatus: '',
            mMultiMap: {},
            mContent: '',
        };
    }

    componentDidMount() {
        this.requestD()
        // this.requestUserCommentList()
    }

    render() {

        return (
            <div>
                <div>id :{JSON.stringify(this.state.mDetail.id)}</div>
                <div>name :{JSON.stringify(this.state.mDetail.channelName)}</div>
                <div>code :{JSON.stringify(this.state.mDetail.channelCode)}</div>
                <div>status :{JSON.stringify(this.state.mDetail.displayStatus)}</div>
                <div>multiMap :{JSON.stringify(this.state.mMultiMap)}</div>
                <div>content :{JSON.stringify(this.state.mContent)}</div>


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
                    title="支付通道设置"
                >

                    {this.state.mDetail.subDepositChannelMODList ? this.state.mDetail.subDepositChannelMODList.map(pay =>
                        <div style={{display: 'flex', minHeight: 40, align: 'center'}}>
                            <Checkbox
                                value={pay.id}
                                style={{width: 160, marginBottom: 10}}
                                onChange={(changeValue) => {
                                    if(changeValue.target.checked){
                                        pay.checked=changeValue.target.checked

                                        this.state.mMultiMap[pay.id]=pay.max

                                    }else{
                                        pay.checked=undefined
                                        this.state.mMultiMap[pay.id]=undefined

                                    }

                                    this.setState({

                                    })
                                    console.log('hcia changeValue', changeValue.target.value)
                                    console.log('hcia e.target.checked', changeValue.target.checked)
                                    console.log('hcia e.target.checked', pay.max)

                                }}>{pay.channelName}</Checkbox>
                            <span>限额：</span>
                            <Input value={pay.max}
                                   onChange={(e) => {
                                       // pay.checked = true

                                       pay.max = e.target.value


                                       console.log('hcia pay.max' , pay.checked)
                                       if(pay.checked){

                                           this.state.mMultiMap[pay.id]=pay.max

                                       }else{
                                           this.state.mMultiMap[pay.id]=undefined

                                       }

                                       this.setState({

                                       })
                                   }}
                                   style={{width: 200, marginBottom: 10}}
                                   placeholder=""/>
                        </div>) : ''}


                </Card>

                <Card
                    style={{marginTop: 15}}
                    type="inner"
                    title="操作日志">
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

                <Button onClick={() => {
                    var self = this;

                    window.Axios.post('finance/updateDepositChannel', {
                        'id': this.state.mDetail.id,
                        'name': self.state.id,
                        'code': self.state.id,
                        'status': self.state.id,
                        'multiMap': self.state.id,
                        'content': self.props.mContent,
                    }).then((response) => {
                        // self.setState({operationDiaryHistory: response.data.data.list});
                    })

                }} style={{marginTop: 15}}>添加备注并保存 </Button>


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
