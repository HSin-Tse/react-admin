/**
 *
 * 添加注释
 * Created by tse on 2018/1/12
 *
 */
import React, {Component} from 'react';
import {Col, Card, Row, Button, Modal, Select, Input, Checkbox, DatePicker, Popconfirm} from 'antd';
import {Radio} from 'antd';
import {message} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import PhotoSwipe from "photoswipe";
import PhotoswipeUIDefault from "photoswipe/dist/photoswipe-ui-default";
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import moment from 'moment';

const CheckboxGroup = Checkbox.Group;

const RadioGroup = Radio.Group;
const Option = Select.Option;


const tradeType = [
    {label: 'CFD', value: 'CFD'},
    {label: 'CFD_2', value: 'CFD_2'},
    {label: 'CFD_3', value: 'CFD_3'},
];
const dateFormat = 'YYYY-MM-DD';

class PassOpenD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNeedSave: false
            , recordData: {}
            , recordDictirys: {}
            , waitUpdate: {}
            , iconLoading: false
            , iconcanLoading: false
            , visible: false
            , tradrType: 'CFD'
            , testeee: '1976-11-23'
            , mGender: ''
            , mAnnualIncome: ''
            , sss: 'aa'
            , IXIncomeList: []
            , IXPercentage: []
            , IXFundsSource: []
            , IXUStax: []
            , IXTradingExperience: []
            , IXTradingObjectives: []
            , IXRisk_Tolerance: []
            , gallery: null

        };
    }


    componentDidMount() {
        var self = this;
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

            });
        }).catch(function (error) {
            console.log(error);
        });


        window.Axios.post('open/getOpenApplyDetail', {
            'id': self.props.match.params.id,
        }).then(function (response) {

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
            });
        }).catch(function (error) {
            console.log(error);
        });


    }


    render() {
        this.mIncomesOPS = this.state.IXIncomeList.map(d => <Option key={d.name}>{d.name}</Option>);
        this.mIXPercentage = this.state.IXPercentage.map(d => <Option key={d.name}>{d.name}</Option>);
        this.mIXFundsSource = this.state.IXFundsSource.map(d => <Option key={d.name}>{d.name}</Option>);
        this.mIXUStax = this.state.IXUStax.map(d => <Option key={d.name}>{d.name}</Option>);
        this.mIXTradingExperience = this.state.IXTradingExperience.map(d => <Option key={d.name}>{d.name}</Option>);
        this.mIXTradingObjectives = this.state.IXTradingObjectives.map(d => <Option key={d.name}>{d.name}</Option>);
        this.mIXRisk_Tolerance = this.state.IXRisk_Tolerance.map(d => <Option key={d.name}>{d.name}</Option>);


        return (
            <div>

                <div>id: {this.state.recordData.id}</div>
                <div>gender: {this.state.recordData.gender}</div>
                <div>isNeedSave :{this.state.isNeedSave.toString()}</div>
                <div>waitUpdate :{JSON.stringify(this.state.waitUpdate)}</div>
                {/*<div>recordDictirys :{JSON.stringify(this.state.recordDictirys)}</div>*/}

                <BreadcrumbCustom first="审核管理" second="开户审核"/>
                <Card title="IX账户审核 " bordered={true}>

                    <Row gutter={16}>
                        <Col md={8}>
                            <Card bordered={true}>
                                <div>

                                    <p>客户姓名:{this.state.recordData.cnName}</p>

                                </div>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card bordered={true}>
                                <div>

                                    <p>客户邮箱：{this.state.recordData.email}</p>

                                </div>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card bordered={true}>
                                <div>

                                    <p>手机号码：{this.state.recordData.phoneNumber} </p>

                                </div>
                            </Card>
                        </Col>


                    </Row>
                </Card>
                <Card title="IX账户设置" bordered={true} style={{marginTop: 30}}>

                    <Row gutter={16}>
                        <Col md={24}>
                            <Card bordered={false}>

                                <div>


                                    账户类型:
                                    <Checkbox style={{marginLeft: 20}} checked={this.state.recordData.applyMT4}
                                              disabled={true}>MT4</Checkbox>
                                    <Checkbox checked={this.state.recordData.applyMT5} disabled={true}>MT5</Checkbox>
                                    <Checkbox checked={this.state.recordData.applySTAR}
                                              disabled={true}>TRADER</Checkbox>

                                </div>
                            </Card>
                            <Card bordered={false}>

                                <div>
                                    交易类型:
                                    <RadioGroup onChange={this.onChangetradeType} options={tradeType}
                                                value={this.state.tradrType} style={{marginLeft: 20, width: 520}}
                                    />
                                </div>
                            </Card>


                        </Col>
                        <Col md={8}>
                            <Card bordered={false}>
                                <div>

                                    服务器 :
                                    <Select labelInValue defaultValue={{key: 'jack'}}
                                            style={{marginLeft: 20, width: 120}}
                                            onChange={this.handleChange}>
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
                                    <Select labelInValue defaultValue={{key: 'lucy'}}
                                            style={{marginLeft: 20, width: 120}}
                                            onChange={this.handleChange}>
                                        <Option value="jack">Jack (100)</Option>
                                        <Option value="lucy">S-STP</Option>
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
                                    <Select labelInValue defaultValue={{key: 'lucy'}}
                                            style={{marginLeft: 20, width: 120}}
                                            onChange={this.handleChange}>
                                        <Option value="jack">Jack (100)</Option>
                                        <Option value="lucy">Lucy (101)</Option>
                                    </Select>
                                </div>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card bordered={false}>
                                <div>
                                    <Select labelInValue defaultValue={{key: 'lucy'}}
                                            style={{marginLeft: 20}}
                                            onChange={this.handleChange}>
                                        <Option value="jack">Jack (100)</Option>
                                        <Option value="lucy">Lucy (101)</Option>
                                    </Select>
                                </div>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card bordered={false}>
                                <div>
                                    <Select labelInValue defaultValue={{key: 'lucy'}}
                                            style={{marginLeft: 20}}
                                            onChange={this.handleChange}>
                                        <Option value="jack">Jack (100)</Option>
                                        <Option value="lucy">Lucy (101)</Option>
                                    </Select>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <Card title="IX账户申请表单" bordered={true} style={{marginTop: 30}}>

                    <Row gutter={8}>
                        <Col md={12}>
                            <h2> 基本信息 </h2>
                            <Card bordered={true}>

                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{width: 120}}>国家:</span>

                                    <Input defaultValue={this.state.recordData.country} disabled={true}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{width: 120}}>*姓（中文）</span>
                                    <Input defaultValue={this.state.recordData.lastNameCn}
                                           onChange={this.onChangelastNameCn}
                                           style={{width: 120}} placeholder="Basic usage" tagkey="lastNameCn"
                                           sdsd={'dd'}/>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{width: 120}}>*名（中文）</span>
                                    <Input defaultValue={this.state.recordData.firstNameCn}
                                           onChange={this.onChangefirstNameCn}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{width: 120}}>*姓</span>
                                    <Input defaultValue={this.state.recordData.lastName}
                                           onChange={this.onChangelastName}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}> *名</span>
                                    <Input defaultValue={this.state.recordData.firstName}
                                           onChange={this.onChangefirstName}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*出生日期</span>
                                    <DatePicker value={moment(this.state.testeee, dateFormat)}
                                                onChange={this.onChangeBirth}
                                                format={dateFormat}/>

                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*性别</span>
                                    <Select value={this.state.mGender}
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
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*城市</span>
                                    <Select defaultValue="上海" style={{width: 120}}>
                                        <Option value="0">上海</Option>
                                        <Option value="1">？</Option>
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*详细地址</span>
                                    <Input defaultValue={this.state.recordData.street} onChange={this.onChangestreet}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*联系电话</span>
                                    <Input defaultValue={this.state.recordData.phoneNumber} disabled={true}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*邮箱地址</span>
                                    <Input defaultValue={this.state.recordData.email} onChange={this.onChangeemail}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*邮编</span>
                                    <Input defaultValue={this.state.recordData.postalCode}
                                           onChange={this.onChangepostalCode}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                            </Card>


                        </Col>
                        <Col md={12}>
                            <h2> 资产&风险审核 </h2>

                            <Card bordered={true}>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>当前年收入</span>
                                    <Select value={this.state.mAnnualIncome}
                                            onChange={this.onChangeannualIncome}
                                            style={{width: 120}}>
                                        {this.mIncomesOPS}
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>初始入金金额占比</span>
                                    <Select value={this.state.mInitialDepositToYourNetLiquidAssets}
                                            onChange={this.onChangemInitialDepositToYourNetLiquidAssets}
                                    >
                                        {this.mIXPercentage}
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>交易本金来源</span>
                                    <Select value={this.state.mfundsSource}
                                            onChange={this.onChangemfundsSource}
                                    >
                                        {this.mIXFundsSource}
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*是否美国公民</span>
                                    <Select value={this.state.musCitizenOrResidentForTaxPurpposes}
                                            onChange={this.onChangemusCitizenOrResidentForTaxPurpposes}
                                    >
                                        {this.mIXUStax}
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>交易经验</span>
                                    <Select value={this.state.myearsTrading}
                                            onChange={this.onChangemyearsTrading}

                                    >
                                        {this.mIXTradingExperience}
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>交易目的</span>
                                    <Select
                                        onChange={this.onChangemtradingObjectives}
                                        value={this.state.mtradingObjectives}>
                                        {this.mIXTradingObjectives}
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*风险承受力</span>
                                    <Select
                                        style={{maxWidth: 220}}
                                        onChange={this.onChangemriskTolerance}
                                        value={this.state.mriskTolerance}>
                                        {this.mIXRisk_Tolerance}
                                    </Select>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{width: 120}}>账户类型</span>
                                    <Input defaultValue={this.state.recordData.country} disabled={true}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{width: 120}}>交易货币</span>
                                    <Input defaultValue={this.state.recordData.country} disabled={true}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                                <div style={{display: 'flex', minHeight: 40}}>
                                    <span style={{minWidth: 120}}>*交易密码</span>
                                    <Input defaultValue={this.state.sss} onChange={this.onChangeSSS}
                                           style={{width: 120}} placeholder="Basic usage"/>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <Card title="IX账户身份信息" bordered={true} style={{marginTop: 30}}>
                    <Row gutter={16}>

                        <Col md={8}>
                            <Card className="gutter-box" bordered={true} bodyStyle={{padding: 0}}>
                                <div>
                                    <img
                                        onClick={() => this.openGallery(this.state.recordData.idcard_0)}
                                        alt="example" width="100%"
                                        src={this.state.recordData.idcard_0}/>
                                </div>
                                <div className="pa-m">
                                    <h3>身份证正面照片</h3>
                                    <small><a href={this.state.recordData.idcard_0} target="_blank"
                                              rel="noopener noreferrer">身份证正面照片</a></small>
                                </div>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card className="gutter-box" bordered={true} bodyStyle={{padding: 0}}>
                                <div>
                                    <img
                                        onClick={() => this.openGallery(this.state.recordData.idcard_1)}
                                        alt="example" width="100%"
                                        src={this.state.recordData.idcard_1}/>
                                </div>
                                <div className="pa-m">
                                    <h3>身份证反面照片</h3>
                                    <small><a href={this.state.recordData.idcard_1} target="_blank"
                                              rel="noopener noreferrer">身份证反面照片</a></small>
                                </div>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card className="gutter-box" bordered={true} bodyStyle={{padding: 0}}>
                                <div>
                                    <img
                                        onClick={() => this.openGallery(this.state.recordData.idcard_2)}
                                        alt="example" width="100%"
                                        src={this.state.recordData.idcard_2}/>
                                </div>
                                <div className="pa-m">
                                    <h3>手持身份证照片</h3>
                                    <small><a href={this.state.recordData.idcard_2} target="_blank"
                                              rel="noopener noreferrer">手持身份证照片</a></small>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                </Card>
                <Card title="IX账户身份查重" bordered={true} style={{marginTop: 30}}>

                    <Row gutter={12}>
                        <Col md={4}>
                            <div style={{display: 'flex', minHeight: 40}}>
                                <Select defaultValue="聯繫電話" style={{width: 120}}>
                                    <Option value="0">聯繫電話</Option>
                                    <Option value="1">女</Option>
                                </Select>
                            </div>

                        </Col>
                        <Col md={8}>
                            <div style={{display: 'flex', minHeight: 40}}>

                                <Input defaultValue={this.state.recordData.country}
                                       style={{width: 220}} placeholder="输入要查询的内容"/>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div style={{display: 'flex', minHeight: 40}}>
                                <Button onClick={() => this.openOK()}>本库查询</Button>

                            </div>
                        </Col>
                        <Col md={4}>
                            <div style={{display: 'flex', minHeight: 40}}>
                                <Button onClick={() => this.openOK()}>异库查询</Button>

                            </div>
                        </Col>
                        <Col md={24}>
                            <div style={{display: 'flex', minHeight: 40}}>
                                <h3 style={{margin: 'auto'}}>本库查询结果：本库有1条信息重合</h3>
                            </div>
                        </Col>
                    </Row>
                </Card>
                <Card title="IX账户审核备注" bordered={true} style={{marginTop: 30}}>
                    <div>
                        <Button disabled={this.state.isNeedSave} loading={this.state.iconLoading}
                                onClick={() => this.openOK()}>开户通过</Button>
                        {/*<Popconfirm placement="top" title={'save data'} onConfirm={this.confirm} okText="Yes" cancelText="No">*/}
                        {/*<Button>Top</Button>*/}
                        {/*</Popconfirm>*/}
                        <Button disabled={!this.state.isNeedSave} onClick={() => this.saveData()}>保存</Button>
                        <Button disabled={this.state.isNeedSave} loading={this.state.iconcanLoading}
                                onClick={() => this.saveReject()}>拒绝</Button>
                    </div>
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
                    title="Modal"
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
                    <p>城市 :{this.state.recordData.nationalID}-->{this.state.waitUpdate.nationalId}</p>
                    <p>详细地址 :{this.state.recordData.street}-->{this.state.waitUpdate.street}</p>
                    <p>邮箱地址 :{this.state.recordData.email}-->{this.state.waitUpdate.email}</p>
                    <p>*邮编 :{this.state.recordData.postalCode}-->{this.state.waitUpdate.postalCode}</p>
                    <p>*当前年收入:{this.state.recordData.annualIncome}-->{this.state.ix_IncomeNAME}:{this.state.waitUpdate.ix_Income}</p>
                    <p>*初始入金金额占流动资产净值比:{this.state.recordData.initialDepositToYourNetLiquidAssets}-->{this.state.ix_PercentageNAME}:{this.state.waitUpdate.ix_Percentage}</p>
                    <p>*初始入金金额占流动资产净值比:{this.state.recordData.fundsSource}-->{this.state.ix_FundsSourceNAME}:{this.state.waitUpdate.ix_FundsSource}</p>
                    <p>*是否美国公民 :{this.state.recordData.usCitizenOrResidentForTaxPurpposes}-->{this.state.ix_UStaxNAME}:{this.state.waitUpdate.ix_UStax}</p>
                    <p>*交易经验 :{this.state.recordData.yearsTrading}-->{this.state.ix_Trading_ExperienceNAME}:{this.state.waitUpdate.ix_Trading_Experience}</p>
                    <p>*交易目的 :{this.state.recordData.tradingObjectives}-->{this.state.ix_Trading_ObjectivesNAME}:{this.state.waitUpdate.ix_Trading_Objectives}</p>
                    <p>*风险承受力 :{this.state.recordData.riskTolerance}-->{this.state.ix_Risk_ToleranceNAME}:{this.state.waitUpdate.ix_Risk_Tolerance}</p>
                </Modal>
            </div>


        )
    }

    confirm = () => {
        message.info('Clicked on Yes.');
    };
    timestampToTime = (timestamp) => {
        const dateObj = new Date(+timestamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
        const year = dateObj.getFullYear() // 获取年，
        const month = dateObj.getMonth() + 1 // 获取月，必须要加1，因为月份是从0开始计算的
        const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。
        const hours = this.pad(dateObj.getHours())  // 获取时, this.pad函数用来补0
        const minutes = this.pad(dateObj.getMinutes()) // 获取分
        const seconds = this.pad(dateObj.getSeconds()) // 获取秒
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
            'language': 'zh-CN',
            'belongUserId': me.state.recordData.belongUserId,
            'id': me.state.recordData.id,
        }).then(function (response) {


            me.setState({
                iconLoading: false,
            });
            console.log(response);

            if (response.data.code == 1) {

                message.success('開戶通過')
                me.props.history.goBack()

            }

        }).catch(function (error) {
            console.log(error);
        });


    };
    saveData = () => {
        this.showModal()
    };
    saveReject = () => {

        this.setState({
            iconcanLoading: true,
        });
        var me = this;

        window.Axios.post('/open/cancelOpenApply', {
            // "language":"zh-CN","userId":"#############################"
            'language': 'zh-CN',
            'id': me.state.recordData.id
        }).then(function (response) {

            me.setState({
                iconcanLoading: false,
            });

            if (response.data.code == 1) {
                message.info('拒絕成功')
            }

        }).catch(function (error) {
            console.log(error);
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
    handleChange = (value) => {
        console.log(value); // { key: "lucy", label: "Lucy (101)" }
    };
    onChangetradeType = (e) => {
        console.log('radio3 checked', e.target.value);
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
                ...self.state.waitUpdate
            }
        ).then(function (response) {

            console.log('hcia response', response)
            if (response.data.code === 1) {
                message.success('save ok!')
                self.setState({
                    isNeedSave: false,
                });
            }


        }).catch(function (error) {
            console.log(error);
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
    onChangeBirth = (value, dateString) => {
        console.log('hcia dateString', dateString)
        var date = new Date(dateString + ' 00:00:00:000');
        // 有三种方式获取
        var time1 = date.getTime();
        var time2 = date.valueOf();
        var time3 = Date.parse(date);
        console.log('hcia', time1);//1398250549123
        console.log('hcia', time2);//1398250549123
        console.log('hcia', time3);//1398250549000

        this.state.waitUpdate.dateOfBirth = time1;

        this.setState({
            testeee: dateString,
            isNeedSave: true,

        });

    }
    onChangegender = (value) => {

        console.log('hcia value', value)
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
        //
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
        //
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
        //
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
        //
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
        //
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
        //
        this.setState({
            mtradingObjectives: value,
            isNeedSave: true,
        });

    }
    onChangemriskTolerance = (value) => {


        var tmpv = ''
        this.state.IXRisk_Tolerance.forEach(function (element) {
            if (element.name == value) {
                tmpv = element.value
            }
        });

        this.state.waitUpdate.ix_Risk_Tolerance = tmpv;
        this.state.ix_Risk_ToleranceNAME = value;
        //
        this.setState({
            mriskTolerance: value,
            isNeedSave: true,
        });

    }


    onChangeSSS = (e) => {
        console.log('hcia', e.target.getAttribute('tagkey'));
        console.log('hcia', 'radio3 checked', e.target.value);


        this.state.waitUpdate.lastNameCn = e.target.value
        this.setState({
            isNeedSave: true,
        });
    };
}

export default PassOpenD;