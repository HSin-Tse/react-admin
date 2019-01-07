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
        const gridStyle = {
            width: '14%',
            textAlign: 'left',
        };
        return (
            <div>
                {/*<div>id :{JSON.stringify(this.state.mDetail.id)}</div>*/}
                {/*<div>name :{JSON.stringify(this.state.mDetail.channelName)}</div>*/}
                {/*<div>code :{JSON.stringify(this.state.mDetail.channelCode)}</div>*/}
                {/*<div>0:可用（打开）1:不可用（关闭）| status :{JSON.stringify(this.state.mDetail.displayStatus)}</div>*/}
                {/*<div>multiMap :{JSON.stringify(this.state.mMultiMap)}</div>*/}
                {/*<div>content :{JSON.stringify(this.state.mContent)}</div>*/}


                <h2 style={{marginTop: 15}}>
                    汇率调整
                </h2>

                <BreadcrumbCustom first="财务审核" second="渠道管理" third="汇率调整"/>
                <Card title={'汇率设置'}>
                    <Card title={'入金'}>
                        <Card.Grid style={gridStyle}>
                            <div>

                                <h3>CNY</h3>
                                <Input

                                    // value={this.state.mDetail.channelCode}
                                    defaultValue={'123'}

                                    onChange={(e) => {
                                        this.setState({
                                            mDetail: {...this.state.mDetail, channelCode: e.target.value},
                                        });
                                    }} style={{ }} placeholder=""/>
                            </div>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
                        <Card.Grid style={gridStyle}>Content</Card.Grid>
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
            self.setState({mDetail: response.data.data});
        });
    };
}

export default EditCha;
