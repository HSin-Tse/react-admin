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
            rateList: [],
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
                {/*<div>name :{JSON.stringify(this.state.rateList)}</div>*/}
                <div>multiMap :{JSON.stringify(this.state.mMultiMap)}</div>
                {/*<div>content :{JSON.stringify(this.state.mContent)}</div>*/}


                <h2 style={{marginTop: 15}}>
                    汇率调整
                </h2>

                <BreadcrumbCustom first="财务审核" second="渠道管理" third="汇率调整"/>
                <Card title={'汇率设置'}>
                    <Card title={'入金'} bodyStyle={{padding: 0, margin: 0}}>

                        {this.state.rateList.filter(function (item, index, array) {
                            return item.type == 1;
                        }).map(pay =>
                            <Card.Grid style={{
                                width: 100 / this.state.rateList.length * 2 + '%',
                                textAlign: 'left',
                            }}>
                                <div>

                                    <h3>{pay.resourceCurrency}</h3>
                                    <Input

                                        // value={this.state.mDetail.channelCode}
                                        value={pay.rate}

                                        onChange={(changeValue) => {

                                            console.log('hcia changeValue', changeValue)
                                            pay.rate = changeValue.target.value
                                            this.state.mMultiMap[pay.id] = pay.rate

                                            this.setState({})
                                        }} style={{}} placeholder=""/>
                                </div>
                            </Card.Grid>)}


                    </Card>
                    <Card title={'出金'} bodyStyle={{padding: 0, margin: 0}}>

                        {this.state.rateList.filter(function (item, index, array) {
                            return item.type == 2;
                        }).map(pay =>
                            <Card.Grid style={{
                                width: 100 / this.state.rateList.length * 2 + '%',
                                textAlign: 'left',
                            }}>
                                <div>

                                    <h3>{pay.destnationCurrency}</h3>
                                    <Input

                                        // value={this.state.mDetail.channelCode}
                                        value={pay.rate}

                                        onChange={(changeValue) => {

                                            console.log('hcia changeValue', changeValue)
                                            pay.rate = changeValue.target.value
                                            this.state.mMultiMap[pay.id] = pay.rate

                                            this.setState({})
                                        }} style={{}} placeholder=""/>
                                </div>
                            </Card.Grid>)}


                    </Card>
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

                    this.setState({
                        CommentViSible: true,
                    });


                }} style={{marginTop: 15}}>添加备注并保存 </Button>

                <Modal
                    title="添加备注并保存"
                    visible={this.state.CommentViSible}
                    onOk={(e) => {
                        let self = this;
                        window.Axios.post('finance/updateChannelRate', {
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
            pageSize: 30,
        }).then(function (response) {
            self.setState({
                // totalpageComments: response.data.data.totalPage,
                operationDiaryHistory: response.data.data.list,
            });
        });


    }


    requestD = () => {
        var self = this;
        window.Axios.post('finance/getChannelRateList', {}).then((response) => {
            self.setState({rateList: response.data.data});
        });
    };
}

export default EditCha;
