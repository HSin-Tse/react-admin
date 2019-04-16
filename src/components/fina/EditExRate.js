/* eslint-disable react/sort-comp */

import React, {Component} from 'react';
import { Card, Input, Modal, Button, Table} from 'antd';
import {message} from 'antd';

import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {parse} from 'querystring';
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const {TextArea} = Input;
const numberMask = createNumberMask({
    includeThousandsSeparator: false,
    allowLeadingZeroes: true,
    requireDecimal: true,
    decimalLimit: 6,
    integerLimit: 6,
    prefix: '',
    // suffix: ' $' // This will put the dollar sign at the end, with a space.
})

class EditCha extends Component {
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

    constructor(props) {
        super(props);
        this.state = {
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

    }

    render() {

        return (
            <div>
                {/*<div>name :{JSON.stringify(this.state.rateList)}</div>*/}
                {/*<div>multiMap :{JSON.stringify(this.state.mMultiMap)}</div>*/}
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
                                    {/*<Input*/}

                                    {/*value={pay.rate}*/}

                                    {/*onChange={(changeValue) => {*/}

                                    {/*console.log('hcia changeValue', changeValue)*/}
                                    {/*pay.rate = changeValue.target.value*/}
                                    {/*this.state.mMultiMap[pay.id] = pay.rate*/}

                                    {/*this.setState({})*/}
                                    {/*}} style={{}} placeholder=""/>*/}

                                    <MaskedInput
                                        defaultValue={pay.rate}
                                        // style={{width: '200px', height: '36px'}}
                                        mask={numberMask}

                                        className="ant-input"
                                        placeholder="汇率"
                                        guide={true}
                                        // id="my-input-id"
                                        onChange={(changeValue) => {

                                            console.log('hcia changeValue', changeValue)
                                            pay.rate = changeValue.target.value
                                            this.state.mMultiMap[pay.id] = pay.rate

                                            this.setState({})
                                        }}

                                        // onBlur={() => {}}
                                        // onChange={() => {}}
                                    />
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
                                    {/*<Input*/}

                                        {/*value={pay.rate}*/}

                                        {/*onChange={(changeValue) => {*/}

                                            {/*console.log('hcia changeValue', changeValue)*/}
                                            {/*pay.rate = changeValue.target.value*/}
                                            {/*this.state.mMultiMap[pay.id] = pay.rate*/}

                                            {/*this.setState({})*/}
                                        {/*}} style={{}} placeholder=""/>*/}

                                    <MaskedInput
                                        defaultValue={pay.rate}
                                        // style={{width: '200px', height: '36px'}}
                                        mask={numberMask}

                                        className="ant-input"
                                        placeholder="汇率"
                                        guide={true}
                                        // id="my-input-id"
                                        onChange={(changeValue) => {

                                            console.log('hcia changeValue', changeValue)
                                            pay.rate = changeValue.target.value
                                            this.state.mMultiMap[pay.id] = pay.rate

                                            this.setState({})
                                        }}

                                        // onBlur={() => {}}
                                        // onChange={() => {}}
                                    />

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
                                       <span>{this.timestampToTime(record.createDate)}</span>),
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

                            self.requestD()

                        })
                    }}
                    onCancel={(e) => {
                        this.setState({
                            CommentViSible: false,
                        });
                    }}
                    okText="确认"
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
        console.log('hcia requestUserCommentList')

        var ssss = this.state.rateList.map(function (item, index, array) {
            return item.id
        })

        console.log('hcia ssss', ssss)
        var self = this;
        window.Axios.post('/auth/getRecordCommentList', {
            commentType: 12,
            idList: ssss,
            pageSize: 30,
        }).then(function (response) {
            self.setState({
                // totalpageComments: response.data.data.totalPage,
                operationDiaryHistory: response.data.data.list,
            });
        });


    }


    requestD = () => {
        console.log('hcia requestD')
        var self = this;
        window.Axios.post('finance/getChannelRateList', {}).then((response) => {
            self.setState({rateList: response.data.data}, () => {


                self.requestUserCommentList()

            });
        });
    };
}

export default EditCha;
