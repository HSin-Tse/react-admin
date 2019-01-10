/**
 * Created by tse on 2018/1/12
 */
import React, {Component} from 'react';
import {
    Tooltip, Popconfirm, Col, Card, Row, Button, Modal, Select, Input, Checkbox, DatePicker, notification, Table
} from 'antd';
import {message} from 'antd';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf'
import BreadcrumbCustom from '../BreadcrumbCustom';
import PhotoSwipe from "photoswipe";
import PhotoswipeUIDefault from "photoswipe/dist/photoswipe-ui-default";
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import moment from 'moment';
import axios from "axios";

const Search = Input.Search;
const {TextArea} = Input;
const Option = Select.Option;

const dateFormat = 'YYYY-MM-DD';
var aaxios = axios.create({
    baseURL: 'http://mobile.nooko.cn:8090/'
});

class PassOpenD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNeedSave: false
            , provinceDatAarra: []
            , cityDatAarra: []
            , recordData: {}
            , recordDictirys: {}
            , waitUpdate: {}
            , changeNoteV: ''
            , cardid2: ''
            , leverageId: ''
            , leverageName: ''
            , changeNoteB: false
            , mIsNeedAddBlack: false
            , showREJECTmodel: false
            , waitSearchDb: {}
            , iconLoading: false
            , checkderesb: null
            , checkderesa: null
            , icondbALoading: false
            , iconcanLoading: false
            , visible: false
            , secondCheckOpen: false
            , selectedLeaf: false
            , tradrType: 'CFD'
            , testeee: '1976-11-23'
            , mGender: ''
            , checkfromdbName: ''
            , mState: ''
            , mCity: ''
            , checkfromdbTypeV: 0
            , mAnnualIncome: ''
            , sss: 'aa'
            , IXIncomeList: []
            , leverageList: []
            , IXPercentage: []
            , IXFundsSource: []
            , IXUStax: []
            , IXTradingExperience: []
            , IXTradingObjectives: []
            , IXRisk_Tolerance: []
            , accountType: []
            , gallery: null

        };
    }

    componentDidMount() {
        var self = this;




        window.Axios.post('dict/leverageList', {
            'keys': 'IX_Income,IX_Percentage,IX_FundsSource,IX_UStax,IX_Trading_Experience,IX_Trading_Objectives,IX_Risk_Tolerance,open_type_ix,account_type',
        }).then((response) => {
            self.setState({
                leverageList: response.data.data,
            });
        });

        window.Axios.post('dict/openDict', {
            'keys': 'IX_Income,IX_Percentage,IX_FundsSource,IX_UStax,IX_Trading_Experience,IX_Trading_Objectives,IX_Risk_Tolerance,open_type_ix,account_type',
        }).then(function (response) {
            self.setState({
                recordDictirys: response.data.data,
                IXIncomeList: response.data.data.IX_Income,
                IXPercentage: response.data.data.IX_Percentage,
                IXFundsSource: response.data.data.IX_FundsSource,
                IXUStax: response.data.data.IX_UStax,
                IXTradingExperience: response.data.data.IX_Trading_Experience,
                IXTradingObjectives: response.data.data.IX_Trading_Objectives,
                IXRisk_Tolerance: response.data.data.IX_Risk_Tolerance,
                accountType: response.data.data.account_type,

            });
        });


        window.Axios.post('open/getOpenApplyDetail', {
            'id': self.props.match.params.id,
        }).then(function (response) {

            if (!response.data.data.state) {

                return
            }

            self.setState({
                recordData: response.data.data,
                testeee: self.timestampToTime(response.data.data.dateOfBirth),
                mGender: response.data.data.gender,
                mAnnualIncome: response.data.data.annualIncome,//当前年收入
                mInitialDepositToYourNetLiquidAssets: response.data.data.initialDepositToYourNetLiquidAssets,
                mfundsSource: response.data.data.fundsSource,
                musCitizenOrResidentForTaxPurpposes: response.data.data.usCitizenOrResidentForTaxPurpposes,
                myearsTrading: response.data.data.yearsTrading,
                mtradingObjectives: response.data.data.tradingObjectives,
                mriskTolerance: response.data.data.riskTolerance,
                mState: response.data.data.state,
                mCity: response.data.data.city,
                leverageId: response.data.data.leverage,
                changeNoteV: response.data.data.comment,
                checkfromdbName: response.data.data.phoneNumber,
            }, () => {


                window.Axios.post('dict/openDict', {
                    'keys': 'div_type',
                    'division': 'province',
                    'code': '1',
                }).then(function (response) {
                    // console.log('hcia response', response)

                    self.setState({
                        provinceDatAarra: response.data.data.div_type,
                    }, () => {

                        var nowCity = self.state.provinceDatAarra.filter(function (item, index, array) {
                            return item.value == self.state.mState;
                        });

                        window.Axios.post('dict/openDict', {
                            'keys': 'div_type',
                            'division': 'city',
                            'code': nowCity[0].code
                        }).then((ress) => {

                            // console.log('hcia ress', ress)
                            self.setState({
                                cityDatAarra: ress.data.data.div_type
                            })
                        });
                    });


                });


            });
        });


    }

    onTodoChange(value) {
        this.setState({
            checkfromdbName: value
        });
    }

    render() {

        var isSetL = this.state.leverageId ? this.state.leverageId.length > 0 : false


        // console.log('hcia isSetL', isSetL)
        var self = this;

        this.mIncomesOPS = this.state.IXIncomeList.map(d => <Option key={d.name}>{d.name}</Option>);
        this.mIXPercentage = this.state.IXPercentage.map(d => <Option key={d.name}>{d.name}</Option>);
        this.mIXFundsSource = this.state.IXFundsSource.map(d => <Option key={d.name}>{d.name}</Option>);
        this.mIXUStax = this.state.IXUStax.map(d => <Option key={d.name}>{d.name}</Option>);
        this.mIXTradingExperience = this.state.IXTradingExperience.map(d => <Option key={d.name}>{d.name}</Option>);
        this.mIXTradingObjectives = this.state.IXTradingObjectives.map(d => <Option key={d.name}>{d.name}</Option>);
        this.mIXRisk_Tolerance = this.state.IXRisk_Tolerance.map(d => <Option key={d.name}>{d.name}</Option>);

        return (
            <div id="openD">

                {/*<div>id: {this.state.recordData.id}</div>*/}
                {/*<div>status: {this.state.recordData.status}</div>*/}
                {/*<div>isNeedSave :{this.state.isNeedSave.toString()}</div>*/}
                {/*<div>waitUpdate :{JSON.stringify(this.state.waitUpdate)}</div>*/}
                {/*<div>this.state.availableFlag :{JSON.stringify(this.state.availableFlag)}</div>*/}
                <h2 style={{marginTop: 15}}>
                    开户信息
                </h2>
                <BreadcrumbCustom first="审核管理" second="用户开户信息"/>
                <Card disabled={true} title="IX账户审核 " bordered={true}>

                    <Row gutter={1}>
                        <Col md={8}>
                            <p>客户姓名:{this.state.recordData.cnName}</p>
                        </Col>
                        <Col md={8}>
                            <p>客户邮箱：{this.state.recordData.email}</p>
                        </Col>
                        <Col md={8}>
                            <p>手机号码：{this.state.recordData.phoneNumber} </p>
                        </Col>
                    </Row>
                </Card>
                <Card title="IX账户设置" bordered={true} style={{marginTop: 15}}>
                    <Row>
                        <Col>
                            <Card bordered={false}>
                                <div>
                                    账户类型:
                                    <Checkbox style={{marginLeft: 20}} checked={this.state.recordData.applyMT4}
                                              disabled={true}>MT4</Checkbox>
                                    <Checkbox checked={this.state.recordData.applyMT5} disabled={true}>MT5</Checkbox>
                                    <Checkbox checked={this.state.recordData.applySTAR}
                                              disabled={true}>IX-TRADER</Checkbox>

                                </div>
                            </Card>


                        </Col>
                        <Col md={8}>
                            <Card bordered={false}>
                                <div>
                                    服务器 :
                                    <Select
                                        disabled={true}
                                        labelInValue defaultValue={{key: 'jack'}}
                                        style={{marginLeft: 20, width: 120}}
                                    >
                                        <Option value="jack">服务器地址</Option>
                                        <Option value="lucy">Lucy (101)</Option>
                                    </Select>

                                </div>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card bordered={false}>
                                <div>
                                    交易组 :
                                    <Select
                                        disabled={true}
                                        value={this.state.recordData.accountType}
                                            style={{marginLeft: 20, width: 120}}
                                            onChange={(v, key) => this.handleACType(v, key)}>
                                        {this.state.accountType.map(acType => <Option
                                            key={acType.name} kk={acType.id}>{acType.name}</Option>)}
                                    </Select>

                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16}>

                        <Col md={8}>
                            <Card bordered={false}>
                                <div>
                                    杠杆组 :
                                    <Select
                                        disabled={true}
                                        value={this.state.leverageId}
                                        style={{marginLeft: 20, width: 120}}
                                        onChange={(v, key) => this.handleChangeLeavage(v, key)}>
                                        {this.state.leverageList.map(leaf => <Option
                                            key={leaf.id}>{leaf.clientGroupName}</Option>)}

                                    </Select>
                                </div>
                            </Card>
                        </Col>

                    </Row>
                </Card>
                <Card title="IX账户申请表单" bordered={true} style={{marginTop: 15}}>

                    <Row gutter={8}>
                        <Col md={12}>
                            <h2> 基本信息 </h2>
                            <Card bordered={true}>

                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{width: 120}}>国家</span>

                                    <Input defaultValue={this.state.recordData.country} disabled={true}
                                           style={{width: 120}} placeholder=""
                                    disabled={true}
                                    />
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{width: 120}}>*姓（中文）</span>
                                    <Input defaultValue={this.state.recordData.lastNameCn}
                                           onChange={this.onChangelastNameCn}
                                           style={{width: 120}} placeholder=""
                                           disabled={true}
                                           tagkey="lastNameCn"
                                           sdsd={'dd'}/>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{width: 120}}>*名（中文）</span>
                                    <Input defaultValue={this.state.recordData.firstNameCn}
                                           onChange={this.onChangefirstNameCn}
                                           style={{width: 120}} placeholder=""
                                    disabled={true}
                                    />
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{width: 120}}>*姓</span>
                                    <Input defaultValue={this.state.recordData.lastName}
                                           onChange={this.onChangelastName}
                                           style={{width: 120}} placeholder=""
                                    disabled={true}
                                    />
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}> *名</span>
                                    <Input defaultValue={this.state.recordData.firstName}
                                           onChange={this.onChangefirstName}
                                           style={{width: 120}} placeholder=""
                                    disabled={true}
                                    />
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*出生日期</span>
                                    <DatePicker
                                        disabled={true}
                                        value={moment(this.state.testeee, dateFormat)}
                                                onChange={this.onChangeBirth}
                                                format={dateFormat}/>

                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*性别</span>
                                    <Select value={this.state.mGender}
                                            disabled={true}
                                            onChange={this.onChangegender}
                                            style={{width: 120}}>
                                        <Option value="Male">男</Option>
                                        <Option value="Female">女</Option>
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*身份证号码</span>
                                    <Input defaultValue={this.state.recordData.nationalID}
                                           onChange={this.onChangenationalId}
                                           style={{width: 120}} placeholder=""
                                    disabled={true}
                                    />
                                </div>

                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*城市</span>

                                    <Select
                                        disabled={true}
                                        value={this.state.mState}
                                        style={{width: 120}}
                                        onChange={this.handleProvinceChange}
                                    >
                                        {this.state.provinceDatAarra.map(province => <Option
                                            key={province.name}>{province.name}</Option>)}

                                    </Select>
                                    <Select
                                        disabled={true}
                                        style={{width: 120}}
                                        value={this.state.mCity}
                                        onChange={this.onSecondCityChange}
                                    >
                                        {this.state.cityDatAarra.map(ccty => <Option
                                            key={ccty.name}>{ccty.name}</Option>)}
                                    </Select>
                                </div>


                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*详细地址</span>
                                    <Input defaultValue={this.state.recordData.street} onChange={this.onChangestreet}
                                           style={{width: 120}} placeholder=""
                                    disabled={true}
                                    />
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*联系电话</span>
                                    <Input defaultValue={this.state.recordData.phoneNumber} disabled={true}
                                           style={{width: 130}} placeholder=""
                                    disabled={true}
                                    />
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*邮箱地址</span>
                                    <Input defaultValue={this.state.recordData.email} onChange={this.onChangeemail}
                                           style={{width: 120}} placeholder=""
                                    disabled={true}
                                    />
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*邮编</span>
                                    <Input defaultValue={this.state.recordData.postalCode}
                                           onChange={this.onChangepostalCode}
                                           style={{width: 120}} placeholder=""
                                    disabled={true}
                                    />
                                </div>
                            </Card>


                        </Col>
                        <Col md={12}>
                            <h2> 资产&风险审核 </h2>

                            <Card bordered={true}>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>当前年收入</span>
                                    <Select value={this.state.mAnnualIncome}
                                            disabled={true}
                                            onChange={this.onChangeannualIncome}
                                            style={{width: 120}}>
                                        {this.mIncomesOPS}
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>初始入金金额占比</span>
                                    <Select value={this.state.mInitialDepositToYourNetLiquidAssets}
                                            disabled={true}
                                            onChange={this.onChangemInitialDepositToYourNetLiquidAssets}
                                    >
                                        {this.mIXPercentage}
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>交易本金来源</span>
                                    <Select value={this.state.mfundsSource}
                                            disabled={true}
                                            onChange={this.onChangemfundsSource}
                                    >
                                        {this.mIXFundsSource}
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*是否美国公民</span>
                                    <Select value={this.state.musCitizenOrResidentForTaxPurpposes}
                                            disabled={true}
                                            onChange={this.onChangemusCitizenOrResidentForTaxPurpposes}
                                    >
                                        {this.mIXUStax}
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>交易经验</span>
                                    <Select value={this.state.myearsTrading}
                                            disabled={true}
                                            onChange={this.onChangemyearsTrading}

                                    >
                                        {this.mIXTradingExperience}
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>交易目的</span>
                                    <Select
                                        disabled={true}
                                        onChange={this.onChangemtradingObjectives}
                                        value={this.state.mtradingObjectives}>
                                        {this.mIXTradingObjectives}
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*风险承受力</span>
                                    <Select
                                        disabled={true}
                                        style={{maxWidth: 220}}
                                        onChange={this.onChangemriskTolerance}
                                        value={this.state.mriskTolerance}>
                                        {this.mIXRisk_Tolerance}
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{width: 120}}>交易类型</span>
                                    <Input defaultValue={this.state.recordData.accountType} disabled={true}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{width: 120}}>交易货币</span>
                                    <Input defaultValue={this.state.recordData.currency} disabled={true}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*交易密码</span>
                                    <Input defaultValue={this.state.recordData.accountPassword}
                                           disabled={true}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <Card title="IX账户身份信息" bordered={true} style={{marginTop: 15}}>
                    <Row gutter={16}>

                        <Col md={8}>
                            <Card bordered={true} bodyStyle={{padding: 10}}
                                  actions={[
                                      <h3 className="pa-m">
                                          <a href={this.state.recordData.idcard_0}
                                             target="_blank"
                                             rel="noopener noreferrer">身份证反面照片</a>
                                      </h3>]
                                  }>
                                <img
                                    onClick={() => this.openGallery(this.state.recordData.idcard_0)}
                                    alt="example" width="100%"
                                    src={this.state.recordData.idcard_0}/>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card bordered={true} bodyStyle={{padding: 10}}
                                  actions={[
                                      <h3 className="pa-m">
                                          <a href={this.state.recordData.idcard_1}
                                             target="_blank"
                                             rel="noopener noreferrer">身份证反面照片</a>
                                      </h3>]
                                  }>
                                <img
                                    onClick={() => this.openGallery(this.state.recordData.idcard_1)}
                                    alt="example" width="100%"
                                    src={this.state.recordData.idcard_1}/>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card bordered={true} bodyStyle={{padding: 10}}
                                  actions={[
                                      <h3 className="pa-m">
                                          <a href={this.state.recordData.idcard_2}
                                             target="_blank"
                                             rel="noopener noreferrer">身份证反面照片</a>
                                      </h3>]
                                  }>
                                <img
                                    onClick={() => this.openGallery(this.state.recordData.idcard_2)}
                                    alt="example" width="100%"
                                    src={this.state.recordData.idcard_2}/>
                            </Card>
                        </Col>
                    </Row>

                </Card>


                <Card title="IX账户身份查重" bordered={true} style={{marginTop: 15}}>

                    <Row gutter={12}>
                        <Col md={4}>
                            <div style={{display: 'flex', minHeight: 40}}>
                                <Select
                                    onChange={this.checkfromdbType}
                                    defaultValue="0"
                                    style={{width: 120}}>
                                    <Option value="0">手机号</Option>
                                    <Option value="1">身份证</Option>
                                    <Option value="2">邮箱</Option>
                                </Select>
                            </div>

                        </Col>
                        <Col md={8}>
                            <div style={{display: 'flex', maxHeight: 40}}>
                                <Search
                                    value={this.state.checkfromdbName}
                                    onChange={e => this.onTodoChange(e.target.value)}
                                    style={{width: 220}} placeholder="输入要查询的内容"/>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div style={{display: 'flex', minHeight: 40}}>
                                <Button loading={this.state.icondbALoading}
                                        onClick={() => this.searchFromLocalDB()}>本库查询</Button>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div style={{display: 'flex', minHeight: 40}}>
                                <Button loading={this.state.icondbALoadingA}
                                        onClick={() => this.searchFromOtherDB()}>异库查询</Button>

                            </div>
                        </Col>
                        <Col md={24}>
                            <div style={{display: 'flex', minHeight: 40}}>
                                {this.state.checkderesb == null ? null :
                                    <h3 style={{margin: 'auto'}}>本库查询结果：{this.state.checkderesb ? '有' : '無'}重合</h3>}
                                {this.state.checkderesa == null ? null :
                                    <h3 style={{margin: 'auto'}}>异库查询结果：{this.state.checkderesa ? '有' : '無'}重合</h3>}
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card title="IX账户开户备注" bordered={true} style={{marginTop: 15}}>
                    <Row gutter={12}>

                        <Col md={24}>


                            <Table rowKey="id"
                                   columns={[
                                       {
                                           title: '操作人',
                                           dataIndex: 'createDate',
                                           key: 'operationDiary_Date',
                                           render: (text, record) => (
                                               <span>{record.createDate}</span>),
                                       }, {
                                           title: '操作时间',
                                           dataIndex: '操作时间',
                                           key: '操作时间',
                                           render: (text, record) => (
                                               <span>{record.ipAddress}</span>),
                                       }, {
                                           title: '操作',
                                           width: 130,
                                           dataIndex: 'bkUserName',
                                           key: 'operationDiary_User',
                                           render: (text, record) => (
                                               <span>{record.bkUserName}</span>),
                                       }, {
                                           title: '备注内容',
                                           dataIndex: 'comment',
                                           key: 'operationDiary_Status',
                                           render: (text, record) => (
                                               <span>{record.comment}</span>),
                                       }]}
                                   dataSource={this.state.operationDiaryHistory}
                                   loading={this.state.loadingComment}
                                   pagination={{
                                       total: this.state.totalpageComments * this.state.pgsize,
                                       pageSize: this.state.pgsize,
                                       onChange: this.changePageComment,
                                   }}
                            />
                            {/*<div style={{display: 'flex', minHeight: 40}}>*/}
                                {/*<TextArea value={this.state.changeNoteV} rows={4} onChange={this.changeNote}/>*/}
                            {/*</div>*/}
                        </Col>


                    </Row>
                    <Row gutter={12}>
                        <Card style={{marginTop: 10}}>

                            <div>
                                <Button
                                    disabled={true}
                                >
                                    开户通过
                                </Button>

                                <Button
                                    disabled={!this.state.isNeedSave}
                                    onClick={() => this.saveData()}>更新客户资料</Button>


                                <Button onClick={() => this.saveNote()}>下载</Button>

                                <Button

                                    disabled={true}

                                    onClick={() => {
                                        this.setState({
                                            showREJECTmodel: true,
                                        });
                                    }} loading={this.state.iconcanLoading}>拒绝</Button>

                            </div>
                        </Card>
                    </Row>

                </Card>

                <div className="gutter-example button-demo">

                    <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true" ref={(div) => {
                        this.pswpElement = div;
                    }}>

                        <div className="pswp__bg"/>

                        <div className="pswp__scroll-wrap">

                            <div className="pswp__container">
                                <div className="pswp__item"/>
                                <div className="pswp__item"/>
                                <div className="pswp__item"/>
                            </div>

                            <div className="pswp__ui pswp__ui--hidden">

                                <div className="pswp__top-bar">

                                    <div className="pswp__counter"/>

                                    <button className="pswp__button pswp__button--close" title="Close (Esc)"/>


                                    <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"/>

                                    <button className="pswp__button pswp__button--zoom" title="Zoom in/out"/>

                                    <div className="pswp__preloader">
                                        <div className="pswp__preloader__icn">
                                            <div className="pswp__preloader__cut">
                                                <div className="pswp__preloader__donut"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                                    <div className="pswp__share-tooltip"/>
                                </div>

                                <button className="pswp__button pswp__button--arrow--left"
                                        title="Previous (arrow left)"/>

                                <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)"/>

                                <div className="pswp__caption">
                                    <div className="pswp__caption__center"/>
                                </div>

                            </div>

                        </div>

                    </div>
                    <style>{`
                    .ant-card-body img {
                        cursor: pointer;
                    }
                `}</style>
                </div>

                <Modal
                    title="拒絕"
                    visible={this.state.showREJECTmodel}
                    onOk={this.saveReject}
                    okType={'primary'}
                    onCancel={(e) => {
                        this.setState({
                            showREJECTmodel: false,
                        });
                    }}
                >

                    <Card bordered={true}>
                        <div style={{display: 'flex', minHeight: 40, align: 'center'}}>

                            <Checkbox
                                checked={this.state.mIsNeedAddBlack}

                                onChange={(e) => {

                                    console.log('hcia e.target.checked', e.target.checked)
                                    this.setState({
                                        mIsNeedAddBlack: e.target.checked,
                                    });
                                }}>是否同时加入开户黑名单</Checkbox>
                        </div>


                    </Card>
                </Modal>

                <Modal
                    title="已对用户资料进行修改，是否保存？"
                    visible={this.state.visible}
                    onOk={this.checkSaveData}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >

                    {/*{ this.state.waitUpdate.lastNameCn == null ? null : <p >*姓（中文）:{this.state.recordData.lastNameCn}-->{this.state.waitUpdate.lastNameCn}</p> }*/}

                    <p>*姓（中文）:{this.state.recordData.lastNameCn}-->{this.state.waitUpdate.lastNameCn}</p>
                    <p>*名（中文）:{this.state.recordData.firstNameCn}-->{this.state.waitUpdate.firstNameCn}</p>
                    <p>*名 :{this.state.recordData.firstName}-->{this.state.waitUpdate.firstName}</p>
                    <p>*名 :{this.state.recordData.lastName}-->{this.state.waitUpdate.lastName}</p>
                    <p>出生日期
                        :{this.timestampToTime(this.state.recordData.dateOfBirth)}-->{this.timestampToTime(this.state.waitUpdate.dateOfBirth)}</p>
                    <p>性别 :{this.state.recordData.gender}-->{this.state.waitUpdate.gender == 0 ? 'Female' : 'Male'}</p>
                    <p>身份证号码 :{this.state.recordData.nationalID}-->{this.state.waitUpdate.nationalId}</p>
                    <p>城市 省:{this.state.recordData.state}-->{this.state.waitUpdate.state}</p>
                    <p>城市 市:{this.state.recordData.city}-->{this.state.waitUpdate.city}</p>
                    <p>详细地址 :{this.state.recordData.street}-->{this.state.waitUpdate.street}</p>
                    <p>邮箱地址 :{this.state.recordData.email}-->{this.state.waitUpdate.email}</p>
                    <p>*邮编 :{this.state.recordData.postalCode}-->{this.state.waitUpdate.postalCode}</p>
                    <p>*当前年收入:{this.state.recordData.annualIncome}-->{this.state.ix_IncomeNAME}:{this.state.waitUpdate.ix_Income}</p>
                    <p>*初始入金金额占流动资产净值比:{this.state.recordData.initialDepositToYourNetLiquidAssets}-->{this.state.ix_PercentageNAME}:{this.state.waitUpdate.ix_Percentage}</p>
                    <p>*初始入金金额占流动资产净值比:{this.state.recordData.fundsSource}-->{this.state.ix_FundsSourceNAME}:{this.state.waitUpdate.ix_FundsSource}</p>
                    <p>*是否美国公民
                        :{this.state.recordData.usCitizenOrResidentForTaxPurpposes}-->{this.state.ix_UStaxNAME}:{this.state.waitUpdate.ix_UStax}</p>
                    <p>*交易经验
                        :{this.state.recordData.yearsTrading}-->{this.state.ix_Trading_ExperienceNAME}:{this.state.waitUpdate.ix_Trading_Experience}</p>
                    <p>*交易目的
                        :{this.state.recordData.tradingObjectives}-->{this.state.ix_Trading_ObjectivesNAME}:{this.state.waitUpdate.ix_Trading_Objectives}</p>
                    <p>*风险承受力
                        :{this.state.recordData.riskTolerance}-->{this.state.ix_Risk_ToleranceNAME}:{this.state.waitUpdate.ix_Risk_Tolerance}</p>
                    <p>*外汇杠杆ID(操作人員必填寫)
                        :{this.state.leverageName}{this.state.leverageId}</p>
                    <p>*账户类型
                        :{this.state.recordData.accountType}</p>
                </Modal>
            </div>


        )
    }

    confirmOpen = () => {
        this.openOK()
    };


    timestampToTime = (timestamp) => {
        const dateObj = new Date(+timestamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
        const year = dateObj.getFullYear() // 获取年，
        const month = dateObj.getMonth() + 1 // 获取月，必须要加1，因为月份是从0开始计算的
        const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。
        return year + '-' + month + '-' + date
    };
    pad = (str) => {
        return +str >= 10 ? str : '0' + str
    };
    openOK = () => {

        this.setState({
            iconLoading: true,
        });
        var me = this;

        window.Axios.post('/open/passOpenApply', {
            'content': me.state.changeNoteV,
            // 'belongUserId': me.state.recordData.belongUserId,
            'id': me.state.recordData.id,
        }).then(() => {
            me.setState({
                iconLoading: false,
            });
            message.success('開戶通過')
            me.props.history.goBack()
        }).catch(() => {
            me.setState({
                iconLoading: false,
            });
        })


    }

    searchFromLocalDB = () => {
        this.setState({
            icondbALoading: true,
        });
        var me = this;

        if (this.state.checkfromdbTypeV == 0) {
            window.Axios.post('open/localExistOpenAccount', {
                'phoneNumber': me.state.checkfromdbName,
            }).then(function (response) {
                // console.log('hcia response', response)
                me.setState({
                    icondbALoading: false,
                    checkderesb: response.data.data.isExist

                });
            });
        } else if (this.state.checkfromdbTypeV == 1) {
            window.Axios.post('open/localExistOpenAccount', {
                'nationalId': me.state.checkfromdbName,
            }).then(function (response) {
                me.setState({
                    icondbALoading: false,
                    checkderesb: response.data.data.isExist
                });
            });
        } else if (this.state.checkfromdbTypeV == 2) {
            window.Axios.post('open/localExistOpenAccount', {
                'email': me.state.checkfromdbName,
            }).then(function (response) {
                me.setState({
                    icondbALoading: false,
                    checkderesb: response.data.data.isExist

                });
            });
        }


    };
    searchFromOtherDB = () => {
        this.setState({
            icondbALoadingA: true,
        });
        var me = this;

        if (this.state.checkfromdbTypeV == 0) {
            window.Axios.post('open/remoteExistOpenAccount', {
                'phoneNumber': me.state.checkfromdbName,
            }).then(function (response) {
                // console.log('hcia response', response)
                me.setState({
                    icondbALoadingA: false,
                    checkderesa: response.data.data.isExist

                });
            });
        } else if (this.state.checkfromdbTypeV == 1) {
            window.Axios.post('open/remoteExistOpenAccount', {
                'nationalId': me.state.checkfromdbName,
            }).then(function (response) {
                // console.log('hcia response', response)
                me.setState({
                    icondbALoadingA: false,
                    checkderesa: response.data.data.isExist
                });
            });
        } else if (this.state.checkfromdbTypeV == 2) {
            window.Axios.post('open/remoteExistOpenAccount', {
                'email': me.state.checkfromdbName,
            }).then(function (response) {
                // console.log('hcia response', response.data.data.isExist)
                me.setState({
                    checkderesa: response.data.data.isExist,
                    icondbALoadingA: false,
                });
            });
        }

    };
    saveData = () => {
        this.showModal()
    };
    saveNote = () => {
        this.printDocument()
    };
    printDocument = () => {
        const input = document.getElementById('openD');
        // console.log('hcia input', input)
        html2canvas(input,
            {
                scale: 4,
                logging: false,
                imageTimeout: 60000,
                useCORS: true
            })
            .then((canvas) => {
                var contentWidth = canvas.width;
                var contentHeight = canvas.height;
                var pageHeight = contentWidth / 592.28 * 841.89;
                var leftHeight = contentHeight;
                //页面偏移
                var position = 0;
                //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                var imgWidth = 555.28;
                var imgHeight = 595.28 / contentWidth * contentHeight;

                var pageData = canvas.toDataURL('image/jpeg', 1.0);
                var pdf = new jsPDF('', 'pt', 'a4');
                pdf.internal.scaleFactor = 2.00;
                if (leftHeight < pageHeight) {
                    pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);
                } else {
                    while (leftHeight > 0) {
                        pdf.addImage(pageData, 'JPEG', 20, position + 40, imgWidth, imgHeight)
                        leftHeight -= pageHeight;
                        position -= 841.89;
                        if (leftHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }
                pdf.save(this.state.recordData.cnName + `user.pdf`);
            })
        ;
    }
    saveReject = () => {
        this.setState({
            iconcanLoading: true,
        });
        var me = this;


        if (this.state.mIsNeedAddBlack) {
            this.addBlackRequest()
        }


        window.Axios.post('/open/cancelOpenApply', {
            'content': me.state.changeNoteV,
            'id': me.state.recordData.id
        }).then(function (response) {

            me.setState({
                iconcanLoading: false,
            });

            if (response.data.code == 1) {
                message.info('拒絕成功')

                me.setState({
                    showREJECTmodel: false,
                });
            }

        });


    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };
    openGallery = (item) => {
        const items = [
            {
                src: item,
                w: 0,
                h: 0,
            }
        ];
        const pswpElement = this.pswpElement;
        const options = {index: 0};
        this.gallery = new PhotoSwipe(pswpElement, PhotoswipeUIDefault, items, options);
        this.gallery.listen('gettingData', (index, item) => {
            const _this = this;
            if (item.w < 1 || item.h < 1) { // unknown size
                var img = new Image();
                img.onload = function () { // will get size after load
                    item.w = this.width; // set image width
                    item.h = this.height; // set image height
                    _this.gallery.invalidateCurrItems(); // reinit Items
                    _this.gallery.updateSize(true); // reinit Items
                };
                img.src = item.src; // let's download image
            }
        });
        this.gallery.init();
    };


    handleACType = (value, label) => {


        var self = this

        self.setState({
            recordData: {...self.state.recordData, accountType: value}
        })

    };

    handleChangeLeavage = (value, label) => {

        var self = this
        this.state.leverageName = value.label


        self.setState({
            isNeedSave: true,
            leverageId: value,
            leverageName: label.props.children
        })


    };
    checkfromdbType = (value) => {
        this.setState({
            checkfromdbName: (value == 0 ? this.state.recordData.phoneNumber : value == 1 ? this.state.recordData.nationalID : this.state.recordData.email),
            checkfromdbTypeV: value
        });
    };
    onChangetradeType = (e) => {
        this.setState({
            tradrType: e.target.value,
        });
    }
    checkSaveData = () => {
        let self = this
        this.setState({
            visible: false,
        });
        window.Axios.post('open/prestore',
            {
                id: self.state.recordData.id,
                leverageId: this.state.leverageId,
                accountType: this.state.recordData.accountType,
                ...self.state.waitUpdate
            }
        ).then(function (response) {
            // console.log('hcia response', response)
            if (response.data.code === 1) {
                message.success('save ok!')
                self.setState({
                    isNeedSave: false,
                });
            }
        });
    }
    changeNote = (e) => {
        this.state.changeNoteV = e.target.value
        this.state.changeNoteB = true
        this.setState({
            changeNoteB: true,
        });
    }
    onChangelastNameCn = (e) => {
        this.state.waitUpdate.lastNameCn = e.target.value
        this.setState({
            isNeedSave: true,
        });
    }
    onChangefirstNameCn = (e) => {
        this.state.waitUpdate.firstNameCn = e.target.value
        this.setState({
            isNeedSave: true,
        });
    }
    onChangelastName = (e) => {
        this.state.waitUpdate.lastName = e.target.value
        this.setState({
            isNeedSave: true,
        });
    }
    onChangenationalId = (e) => {
        this.state.waitUpdate.nationalId = e.target.value
        this.setState({
            isNeedSave: true,
        });
    }
    onChangefirstName = (e) => {
        this.state.waitUpdate.firstName = e.target.value
        this.setState({
            isNeedSave: true,
        });
    }
    onChangestreet = (e) => {
        this.state.waitUpdate.street = e.target.value
        this.setState({
            isNeedSave: true,
        });
    }
    onChangeemail = (e) => {
        this.state.waitUpdate.email = e.target.value
        this.setState({
            isNeedSave: true,
        });
    }
    onChangepostalCode = (e) => {
        this.state.waitUpdate.postalCode = e.target.value
        this.setState({
            isNeedSave: true,
        });
    }
    handleProvinceChange = (value) => {


        this.state.waitUpdate.state = value

        this.setState({
            mState: value,
            mCity: '',
            isNeedSave: true,
        });
        let self = this
        window.Axios.post('dict/openDict', {
            'keys': 'div_type',
            'division': 'province',
            'code': '1',
        }).then(function (response) {
            self.setState({
                provinceDatAarra: response.data.data.div_type,
            }, () => {
                var nowCity = self.state.provinceDatAarra.filter(function (item, index, array) {
                    return item.value == self.state.mState;
                });
                window.Axios.post('dict/openDict', {
                    'keys': 'div_type',
                    'division': 'city',
                    'code': nowCity[0].code
                }).then((ress) => {
                    self.setState({
                        cityDatAarra: ress.data.data.div_type
                    })
                });
            });
        });
    };

    onSecondCityChange = (value) => {
        this.state.waitUpdate.city = value

        this.setState({
            mCity: value,
            isNeedSave: true,

        });
    }

    onChangeBirth = (value, dateString) => {
        var date = new Date(dateString + ' 00:00:00:000');
        var time1 = date.getTime();
        this.state.waitUpdate.dateOfBirth = time1;
        this.setState({
            testeee: dateString,
            isNeedSave: true,
        });
    }
    onChangegender = (value) => {
        // console.log('hcia value', value)
        this.state.waitUpdate.gender = (value === 'Male' ? 1 : 0);
        this.setState({
            mGender: value,//1:male 0:female
            isNeedSave: true,
        });
    }
    onChangeannualIncome = (value) => {
        var tmpv = ''
        this.state.IXIncomeList.forEach(function (element) {
            if (element.name == value) {
                tmpv = element.value
            }
        });
        this.state.waitUpdate.ix_Income = tmpv;
        this.state.ix_IncomeNAME = value;
        this.setState({
            mAnnualIncome: value,//1:male 0:female
            isNeedSave: true,
        });
    }
    onChangemInitialDepositToYourNetLiquidAssets = (value) => {
        var tmpv = ''
        this.state.IXPercentage.forEach(function (element) {
            if (element.name == value) {
                tmpv = element.value
            }
        });
        this.state.waitUpdate.ix_Percentage = tmpv;
        this.state.ix_PercentageNAME = value;
        this.setState({
            mInitialDepositToYourNetLiquidAssets: value,
            isNeedSave: true,
        });
    }
    onChangemfundsSource = (value) => {
        var tmpv = ''
        this.state.IXFundsSource.forEach(function (element) {
            if (element.name == value) {
                tmpv = element.value
            }
        });
        this.state.waitUpdate.ix_FundsSource = tmpv;
        this.state.ix_FundsSourceNAME = value;
        this.setState({
            mfundsSource: value,
            isNeedSave: true,
        });
    }
    onChangemusCitizenOrResidentForTaxPurpposes = (value) => {
        var tmpv = ''
        this.state.IXUStax.forEach(function (element) {
            if (element.name == value) {
                tmpv = element.value
            }
        });
        this.state.waitUpdate.ix_UStax = tmpv;
        this.state.ix_UStaxNAME = value;
        this.setState({
            musCitizenOrResidentForTaxPurpposes: value,
            isNeedSave: true,
        });
    }
    onChangemyearsTrading = (value) => {
        var tmpv = ''
        this.state.IXTradingExperience.forEach(function (element) {
            if (element.name == value) {
                tmpv = element.value
            }
        });
        this.state.waitUpdate.ix_Trading_Experience = tmpv;
        this.state.ix_Trading_ExperienceNAME = value;
        this.setState({
            myearsTrading: value,
            isNeedSave: true,
        });
    }
    onChangemtradingObjectives = (value) => {
        var tmpv = ''
        this.state.IXTradingObjectives.forEach(function (element) {
            if (element.name == value) {
                tmpv = element.value
            }
        });
        this.state.waitUpdate.ix_Trading_Objectives = tmpv;
        this.state.ix_Trading_ObjectivesNAME = value;
        this.setState({
            mtradingObjectives: value,
            isNeedSave: true,
        });
    };
    onChangemriskTolerance = (value) => {
        var tmpv = ''
        this.state.IXRisk_Tolerance.forEach(function (element) {
            if (element.name == value) {
                tmpv = element.value
            }
        });
        this.state.waitUpdate.ix_Risk_Tolerance = tmpv;
        this.state.ix_Risk_ToleranceNAME = value;
        this.setState({
            mriskTolerance: value,
            isNeedSave: true,
        });
    }

    addBlackRequest() {
        let me = this
        if (!me.state.changeNoteV) {
            message.error('備註必填')
            return
        }
        window.Axios.post('auth/addBlackUser', {
            'content': me.state.changeNoteV,
            'id': me.state.recordData.id,
            'listType': 2,//1:合规 2:开户 3:交易
        }).then(function (response) {
            if (response.data.code === 1) {
                message.success('added  open  black ')
            }
        });
    }

    openTipBlack() {

        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={(key) => this.addBlackRequest(key)}>
                Confirm
            </Button>
        );
        const close = (e) => {
            // console.log('hcia e', e)
        };

        notification.open({
            message: '是否同时加入开户黑名单',
            description: '是否同时加入开户黑名单',
            btn,
            key,
            placement: 'bottomRight',
            onClose: close,
        });


    }
}

export default PassOpenD;