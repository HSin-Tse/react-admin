/* eslint-disable react/sort-comp */

import React, {Component} from 'react';
import {Select, Card, Checkbox, DatePicker, Input, Modal, Button, Table} from 'antd';
import {message} from 'antd';

import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {parse} from 'querystring';

const Option = Select.Option;
const {TextArea} = Input;

class EditCha extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mDetail: {},
            operationDiaryHistory: [],
            mName: '',
            mCode: '',
            mStatus: '',
            CommentViSible: false,
            mMultiMap: {},
            mContent: '',
        };
    }

    componentDidMount() {
        this.requestD()

        this.requestUserCommentList()
    }

    render() {

        return (
            <div>
                {/*<div>id :{JSON.stringify(this.state.mDetail.id)}</div>*/}
                {/*<div>name :{JSON.stringify(this.state.mDetail.channelName)}</div>*/}
                {/*<div>code :{JSON.stringify(this.state.mDetail.channelCode)}</div>*/}
                {/*<div>0:可用（打开）1:不可用（关闭）| status :{JSON.stringify(this.state.mDetail.displayStatus)}</div>*/}
                {/*<div>multiMap :{JSON.stringify(this.state.mMultiMap)}</div>*/}
                {/*<div>content :{JSON.stringify(this.state.mContent)}</div>*/}


                <h2 style={{marginTop: 15}}>
                    渠道设置
                </h2>

                <BreadcrumbCustom first="财务审核" second="渠道管理" third="渠道设置"/>
                <Card title={this.state.mDetail.channelName + '设置'}>
                    <div style={{display: 'flex', minHeight: 40, align: 'center'}}>
                        <span style={{minWidth: 80}}>渠道KEY：</span>
                        <Input

                            value={this.state.mDetail.channelCode}

                            onChange={(e) => {
                                this.setState({
                                    mDetail: {...this.state.mDetail, channelCode: e.target.value},
                                });
                            }} style={{width: 200, marginBottom: 10}} placeholder=""/>
                        <span style={{ marginLeft:16, minWidth: 80}}>后台配置,不可修改</span>

                    </div>
                    <div style={{display: 'flex', minHeight: 40, align: 'center'}}>


                        <span style={{minWidth: 80}}>渠道名称：</span>
                        <Input value={this.state.mDetail.channelName}
                               onChange={(e) => {
                                   this.setState({
                                       mDetail: {...this.state.mDetail,channelName : e.target.value},
                                   });
                               }} style={{width: 200, marginBottom: 10}} placeholder=""/>
                        <span style={{ marginLeft:16, minWidth: 80}}>输入APP显示的渠道名称,可修改</span>

                    </div>
                    <div style={{display: 'flex', minHeight: 40, align: 'center'}}>
                        <span style={{minWidth: 80}}>渠道状态：</span>
                        <Select onChange={(valu) => {
                            this.setState({
                                mDetail: {...this.state.mDetail, displayStatus: valu},
                            });
                        }} value={this.state.mDetail.displayStatus} style={{width: 200}}>
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
                                    if (changeValue.target.checked) {
                                        pay.checked = changeValue.target.checked

                                        this.state.mMultiMap[pay.id] = pay.max

                                    } else {
                                        pay.checked = undefined
                                        this.state.mMultiMap[pay.id] = undefined

                                    }

                                    this.setState({})
                                    console.log('hcia changeValue', changeValue.target.value)
                                    console.log('hcia e.target.checked', changeValue.target.checked)
                                    console.log('hcia e.target.checked', pay.max)

                                }}>{pay.channelName}</Checkbox>
                            <span>限额：</span>
                            <Input value={pay.max}
                                   onChange={(e) => {
                                       // pay.checked = true

                                       pay.max = e.target.value


                                       console.log('hcia pay.max', pay.checked)
                                       if (pay.checked) {
                                           this.state.mMultiMap[pay.id] = pay.max
                                       } else {
                                           this.state.mMultiMap[pay.id] = undefined
                                       }

                                       this.setState({})
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
                                   title: '操作备注',
                                   width:600,
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

                    this.setState({
                        CommentViSible: true,
                    });


                }} style={{marginTop: 15}}>添加备注并保存 </Button>

                <Modal
                    title="添加备注并保存"
                    visible={this.state.CommentViSible}
                    onOk={(e) => {
                        let self = this;
                        window.Axios.post('finance/updateDepositChannel', {
                            'id': this.state.mDetail.id,
                            'name': this.state.mDetail.channelName,
                            'code': this.state.mDetail.channelCode,
                            'status': this.state.mDetail.displayStatus == '可用' ? 0 : 1,
                            'multiMap': JSON.stringify(this.state.mMultiMap) == "{}" ? undefined : this.state.mMultiMap,
                            'content': self.state.mContent,
                        }).then((response) => {
                            message.success('操作成功')
                            self.setState({mContent: '', CommentViSible: false});
                        })
                    }}
                    onCancel={(e) => {
                        this.setState({
                            CommentViSible: false,
                        });
                    }}
                    okText="確認"
                    cancelText="取消"
                    align={'center'}>
                    <TextArea
                        value={this.state.mContent}
                        placeholder="请输入备注"
                        onChange={(e) => {
                            this.setState({
                                mContent: e.target.value
                            });
                        }}
                        rows={4}/>


                </Modal>
            </div>
        )
    }


    requestUserCommentList = () => {

        var self = this;
        window.Axios.post('/auth/getRecordCommentList', {
            id: self.props.match.params.id,
            commentType: 11,
            // pageNo: this.state.currentComment,
            pageSize: 300,
        }).then(function (response) {
            self.setState({
                // totalpageComments: response.data.data.totalPage,
                operationDiaryHistory: response.data.data.list,
            });
        });


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
