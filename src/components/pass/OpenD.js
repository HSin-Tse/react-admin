/**
 *
 * 添加注释
 * Created by tse on 2018/1/12
 *
 */
import React, {Component} from 'react';
import {Col, Card, Row, Button, Avatar, Modal} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import PhotoSwipe from "photoswipe";
import PhotoswipeUIDefault from "photoswipe/dist/photoswipe-ui-default";
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

const {Meta} = Card;

class PassOpenD extends Component {


    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            , userList: []
            , testtt: 'asdasd'
            , visible: false
            , recordData: {}
            , gallery: null

        };
    }


    componentDidMount() {

        console.log('hcia',this.props.match.params.id)

        // http://mobile.nooko.cn:8090/open/getOpenApplyList
       var self = this

        window.Axios.post('http://mobile.nooko.cn:8090/open/getOpenApplyDetail', {
            // "language":"zh-CN","userId":"#############################"
            'id': self.props.match.params.id,
            // 'loginName': this.props.match.params.id,
            // 'token': this.props.match.params.id,
            'language': "zh-CN"
        }).then(function (response) {
            console.log('hcia',response.data.data);
            console.log('hcia',response.data.code);

            self.setState({
                recordData: response.data.data,
            });


            console.log('hcia',self.state.recordData);


        }).catch(function (error) {
            console.log(error);
            // message.warn(error);
        });





        // if (window.sss) {
        //     console.log('window.sss AAA', window.sss)
        //     var record = window.sss;
        //     // this.setState({
        //     //     recordData: JSON.parse(record),
        //     // });
        //
        // } else {
        //     console.log('window.sss VVVV', window.sss)
        //     var recordData = {'id': 0};
        //
        // }




    }

    componentWillUnmount = () => {
        this.closeGallery();
    };
    openOK = () => {
        this.showModal()
        var me = this;

        window.Axios.post('/open/passOpenApply', {
            // "language":"zh-CN","userId":"#############################"
            'language': 'zh-CN',
            'id': me.state.recordData.id,
        }).then(function (response) {
            console.log(response);

        }).catch(function (error) {
            console.log(error);
            // message.warn(error);
        });

        // window.Axios.post('/open/passOpenApply', {
        //     // "language":"zh-CN","userId":"#############################"
        //     'language': 'zh-CN',
        //     'id': 111
        // }).then(function (response) {
        //     console.log(response);
        //
        // }).catch(function (error) {
        //     console.log(error);
        //     // message.warn(error);
        // });

    };
    saveData = () => {

        // this.showModal()
        this.props.history.goBack()
    };
    saveReject = () => {


        console.log(this.state.recordData)
        var me = this;
        console.log(me.state.recordData.id)


        window.Axios.post('/open/cancelOpenApply', {
            // "language":"zh-CN","userId":"#############################"
            'language': 'zh-CN',
            'id': me.state.recordData.id
        }).then(function (response) {
            console.log('hcia response',response);

            console.log('hcia',response);

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


    render() {

        const imgs = [
            [
                'http://mobile.nooko.cn:9080/MediaCenter/data/REGISTER/2c902bd8661e123f016676ea1fb10013/idcard_0-203906pgP2t.jpg',
                'http://mobile.nooko.cn:9080/MediaCenter/data/REGISTER/2c902bd8661e123f016676ea1fb10013/idcard_0-203906pgP2t.jpg',
                'http://mobile.nooko.cn:9080/MediaCenter/data/REGISTER/2c902bd8661e123f016676ea1fb10013/idcard_0-203906pgP2t.jpg',
                'http://mobile.nooko.cn:9080/MediaCenter/data/REGISTER/2c902bd8661e123f016676ea1fb10013/idcard_0-203906pgP2t.jpg',
                'http://mobile.nooko.cn:9080/MediaCenter/data/REGISTER/2c902bd8661e123f016676ea1fb10013/idcard_0-203906pgP2t.jpg',

            ]
        ];
        const imgsTag = imgs.map(v1 => (
            v1.map(v2 => (
                <Row gutter={8}>
                    <Col md={6}>
                        <Card className="gutter-box" key={v2} bordered={true} bodyStyle={{padding: 0}}>
                            <div>
                                <img onClick={() => this.openGallery(v2)} alt="example" width="100%" src={v2}/>
                            </div>
                            <div className="pa-m">
                                <h3>React Admin</h3>
                                <small><a href="https://yezihaohao.github.io/" target="_blank"
                                          rel="noopener noreferrer">https://yezihaohao.github.io/</a></small>
                            </div>
                        </Card>
                    </Col>
                </Row>
            ))
        ));

        return (
            <div>
                <div>log: {this.state.testtt}</div>

                <div>log: {this.state.recordData.id}</div>
                <div>{this.state.recordData.id}</div>

                <BreadcrumbCustom first="审核管理" second="开户审核"/>
                <Card title="IX账户审核 {this.state.recordData.data.id} " bordered={true}>

                    <Row gutter={8}>
                        <Col md={6}>
                            <Card title="cssModule" bordered={true}>
                                <div>

                                    <p>IX账户审核</p>
                                    <p>IX账户审核</p>
                                </div>
                            </Card>
                        </Col>
                        <Col md={6}>
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
                        <Col md={6}>
                            <Card className="gutter-box" bordered={true} bodyStyle={{padding: 0}}>
                                <div>
                                    <img
                                        onClick={() => this.openGallery('http://mobile.nooko.cn:9080/MediaCenter/data/REGISTER/2c902bd8661e123f016676ea1fb10013/idcard_0-203906pgP2t.jpg')}
                                        alt="example" width="100%"
                                        src={'http://mobile.nooko.cn:9080/MediaCenter/data/REGISTER/2c902bd8661e123f016676ea1fb10013/idcard_0-203906pgP2t.jpg'}/>
                                </div>
                                <div className="pa-m">
                                    <h3>React Admin</h3>
                                    <small><a href="https://yezihaohao.github.io/" target="_blank"
                                              rel="noopener noreferrer">https://yezihaohao.github.io/</a></small>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Card>
                <Card title="IX账户审核" bordered={true}>

                    <Row gutter={8}>
                        <Col md={6}>
                            <Card title="cssModule" bordered={true}>
                                <div>
                                    <p>IX账户审核</p>
                                </div>
                            </Card>
                        </Col>
                        <Col md={6}>
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
                <Card title="IX账户审核" bordered={true}>
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