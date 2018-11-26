/**
 *
 * 添加注释
 * Created by tse on 2018/1/12
 *
 */
import React, {Component} from 'react';
import {Col, Card, Row, Button, Avatar, Modal, Select, Input, Checkbox} from 'antd';
import {Radio} from 'antd';
import {message} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import PhotoSwipe from "photoswipe";
import PhotoswipeUIDefault from "photoswipe/dist/photoswipe-ui-default";
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

const CheckboxGroup = Checkbox.Group;

const RadioGroup = Radio.Group;
const {Meta} = Card;
const Option = Select.Option;


const accountType = [
    {label: 'MT4', value: 'MT4'},
    {label: 'MT5', value: 'MT5'},
    {label: 'TRADER', value: 'TRADER', disabled: false},
];
const tradeType = [
    {label: 'CFD', value: 'CFD'},
    {label: 'CFD_2', value: 'CFD_2'},
    {label: 'CFD_3', value: 'CFD_3'},
];

class PassOpenD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: []
            , recordData: {}
            , visible: false
            , tradrType: 'CFD'
            , sss: 'aa'
            , acTypes: 'MT4'
            , accountTypeCheckList: [
                'MT4', 'MT5'
            ]
            , gallery: null

        };
    }

    componentDidMount() {

        console.log('hcia', this.props.match.params.id)

        var self = this

        window.Axios.post('http://mobile.nooko.cn:8090/open/getOpenApplyDetail', {
            'id': self.props.match.params.id,
            // 'loginName': this.props.match.params.id,
            // 'token': this.props.match.params.id,
            'language': "zh-CN"
        }).then(function (response) {
            console.log('hcia', response);

            console.log('hcia', response.data.code);

            self.setState({
                recordData: response.data.data,
            });

            console.log('hcia', self.state.recordData);

        }).catch(function (error) {
            console.log(error);
        });


    }


    render() {

        return (
            <div>

                <div>id: {this.state.recordData.id}</div>
                <div>idcard_0 :{this.state.recordData.idcard_0}</div>
                <div>test check :{this.state.sss}</div>

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
                <Card title="IX账户设置" bordered={true}>

                    <Row gutter={16} >
                        <Col md={24}>
                            <Card bordered={false}>

                                <div>
                                    账户类型:
                                    <CheckboxGroup onChange={this.onChangeActypes} options={accountType}
                                                   value={this.state.accountTypeCheckList}
                                                   style={{marginLeft: 20, width: 520}}
                                    />
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
                                    交易组 :
                                    <Select labelInValue defaultValue={{key: 'lucy'}}
                                            style={{marginLeft: 20, width: 120}}
                                            onChange={this.handleChange}>
                                        <Option value="jack">Jack (100)</Option>
                                        <Option value="lucy">Lucy (101)</Option>
                                    </Select>
                                </div>
                            </Card>
                        </Col>

                    </Row>
                    <Row gutter={16} >

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
                <Card title="IX账户申请表单" bordered={true}>

                    <Row gutter={8}>
                        <Col md={12}>
                            <Card title="基本信息" bordered={true}>
                                <div>
                                    <p>国家: {this.state.recordData.country} </p>

                                </div>
                                <div>
                                    <p>*姓（中文）</p>
                                </div>
                                <div>
                                    <p>IX账户审核<Input defaultValue={this.state.sss} onChange={this.onChangeSSS}
                                                    style={{marginLeft: 10, width: 120}} placeholder="Basic usage"/></p>
                                </div>
                            </Card>
                            <Card bordered={true}>
                                <div>

                                    <p>*姓（中文）</p>
                                </div>
                            </Card>

                        </Col>
                        <Col md={12}>
                            <Card title="资产&风险审核" bordered={true}>
                                <div>
                                    <p>IX账户审核</p>
                                </div>
                                <Meta
                                    avatar={<Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <Card title="IX账户身份信息" bordered={true}>
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
                                    <h3>身份证正面照片</h3>
                                    <small><a href={this.state.recordData.idcard_2} target="_blank"
                                              rel="noopener noreferrer">手持身份证照片</a></small>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                </Card>
                <Card title="IX账户身份查重" bordered={true}>

                    <Row gutter={12}>
                        <Col md={12}>
                            <Card title="cssModule" bordered={true}>
                                <div>
                                    <p>IX账户审核</p>
                                </div>
                            </Card>
                        </Col>
                        <Col md={12}>
                            <Card title="cssModule" bordered={true}>
                                <div>
                                    <p>IX账户审核</p>
                                </div>
                                <Meta
                                    avatar={<Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <Card title="IX账户审核备注" bordered={true}>
                    <div>
                        <Button onClick={() => this.openOK()}>开户通过</Button>
                        <Button onClick={() => this.saveData()}>保存</Button>
                        <Button onClick={() => this.saveReject()}>拒绝</Button>
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
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <p>Bla bla ...</p>
                    <p>Bla bla ...</p>
                    <p>Bla bla ...</p>
                </Modal>
            </div>
        )
    }


    openOK = () => {
        var me = this;

        window.Axios.post('/open/passOpenApply', {
            'language': 'zh-CN',
            'belongUserId': me.state.recordData.belongUserId,
            'id': me.state.recordData.id,
        }).then(function (response) {
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

        message.success('ok 開戶成功')
    };
    saveReject = () => {


        var me = this;

        window.Axios.post('/open/cancelOpenApply', {
            // "language":"zh-CN","userId":"#############################"
            'language': 'zh-CN',
            'id': me.state.recordData.id
        }).then(function (response) {
            console.log('hcia response', response);

            console.log('hcia', response);

        }).catch(function (error) {
            console.log(error);
            // message.warn(error);
        });


    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }
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


    onChangeActypes = (checkedValues) => {
        console.log('hcia', 'radio3 checked', checkedValues);
        this.setState({
            accountTypeCheckList: checkedValues,
        });
    };


    onChangetradeType = (e) => {
        console.log('radio3 checked', e.target.value);
        this.setState({
            tradrType: e.target.value,
        });
    }


    onChangeSSS = (e) => {
        console.log('radio3 checked', e.target.value);
        this.setState({
            sss: e.target.value,
        });
    }
}

export default PassOpenD;