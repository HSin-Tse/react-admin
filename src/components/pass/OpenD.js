/**
 *
 * 添加注释
 * Created by tse on 2018/1/12
 *
 */
import React, {Component} from 'react';
import {Col, Card, Row, Button, Avatar, Modal, Select, Input} from 'antd';
import {Radio} from 'antd';
import { message } from 'antd';

import BreadcrumbCustom from '../BreadcrumbCustom';
import PhotoSwipe from "photoswipe";
import PhotoswipeUIDefault from "photoswipe/dist/photoswipe-ui-default";
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';


const RadioGroup = Radio.Group;
const {Meta} = Card;
const Option = Select.Option;

const options = [
    {label: 'Apple', value: 'Apple'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange'},
];
const optionsWithDisabled = [
    {label: 'Apple', value: 'Apple'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange', disabled: false},
];


class PassOpenD extends Component {


    componentDidMount() {

        console.log('hcia', this.props.match.params.id)

        var self = this

        window.Axios.post('http://mobile.nooko.cn:8090/open/getOpenApplyDetail', {
            'id': self.props.match.params.id,
            // 'loginName': this.props.match.params.id,
            // 'token': this.props.match.params.id,
            'language': "zh-CN"
        }).then(function (response) {
            console.log('hcia', response.data.code);

            self.setState({
                recordData: response.data.data,
            });

            console.log('hcia', self.state.recordData);

        }).catch(function (error) {
            console.log(error);
        });


    }

    componentWillUnmount = () => {
        this.closeGallery();
    };
    openOK = () => {
        this.showModal()
        var me = this;

        window.Axios.post('/open/passOpenApply', {
            'language': 'zh-CN',
            'id': me.state.recordData.id,
        }).then(function (response) {
            console.log(response);

        }).catch(function (error) {
            console.log(error);
        });


    };
    saveData = () => {
        message.success('ok 開戶成功')
        this.props.history.goBack()
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
    closeGallery = () => {
        if (!this.gallery) return;
        this.gallery.close();
    };
    handleChange = (value) => {
        console.log(value); // { key: "lucy", label: "Lucy (101)" }
    };

    state = {
        value3: 'Apple',
    }


    onChange3 = (e) => {
        console.log('radio3 checked', e.target.value);
        this.setState({
            value3: e.target.value,
        });
    }


    onChangeSSS = (e) => {
        console.log('radio3 checked', e.target.value);
        this.setState({
            sss: e.target.value,
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            , userList: []
            , visible: false
            , recordData: {}
            , sss: 'aa'
            , gallery: null
        };
    }

    render() {


        return (
            <div>

                <div>id: {this.state.recordData.id}</div>
                <div>idcard_0 :{this.state.recordData.idcard_0}</div>
                <div>sss :{this.state.sss}</div>

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

                    <Row gutter={16}>
                        <Col md={24}>
                            <Card bordered={true}>

                                <div>
                                    账户类型 :
                                    <RadioGroup options={optionsWithDisabled} onChange={this.onChange3}
                                                value={this.state.value3}/>
                                </div>
                            </Card>
                            <Card bordered={true}>
                                <div>
                                    {/*<p>服务器</p>*/}
                                    服务器 :
                                    <Select labelInValue defaultValue={{key: 'lucy'}} style={{width: 120}}
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
                                    <p>国家<Select  labelInValue defaultValue={{key: 'lucy'}} style={{marginLeft: 10 , width: 120}}
                                                  onChange={this.handleChange}>
                                        <Option value="jack">Jack (100)</Option>
                                        <Option value="lucy">a (101)</Option>
                                        <Option value="lucya">b (101)</Option>
                                        <Option value="lucyb">Lubcy (101)</Option>
                                        <Option value="lucyc">Lucdy (101)</Option>
                                        <Option value="lucyd">Lucys (101)</Option>
                                        <Option value="lucye">Lucy a(101)</Option>
                                    </Select></p>
                                </div>
                                <div>
                                    <p>*姓（中文）</p>
                                </div>
                                <div>
                                    <p>IX账户审核<Input defaultValue={this.state.sss}  onChange={this.onChangeSSS} style={{marginLeft: 10, width: 120}} placeholder="Basic usage"/></p>
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
}

export default PassOpenD;