/**
 *
 * 添加注释
 * Created by tse on 2018/1/12
 *
 */
import React, {Component} from 'react';
import {Col, Card, Row, Button, Avatar ,Modal} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import axios from "axios";
import PhotoSwipe from "photoswipe";
import PhotoswipeUIDefault from "photoswipe/dist/photoswipe-ui-default";
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

const {Meta} = Card;

// import styles from './index.module.less';

class PassOpenD extends Component {


    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            , userList: []
            , testtt: 'asdasd'
            ,visible: false

        };
    }

    state = {
        gallery: null
    };

    componentDidMount() {

        console.log(this.props.match.params.id)
        // var record = JSON.parse(window.sss==null?{id:0}:window.sss);
        // console.log('sss',record.id)
        // console.log('sss',record.id)
        // console.log('sss',record.id)

        if (window.sss) {
            console.log('window.sss AAA', window.sss)
            var record = window.sss;

        } else {
            console.log('window.sss VVVV', window.sss)
            var record = {'id': 0};

        }


        // axios.post('http://mobile.nooko.cn:8090/open/getExistOpenAccount', {
        //     // "language":"zh-CN","userId":"#############################"
        //     'language': 'zh-CN',
        //     'userId': '21057'
        // }).then(function (response) {
        //     console.log(response);
        //
        // }).catch(function (error) {
        //     console.log(error);
        //     // message.warn(error);
        // });

    }

    componentWillUnmount = () => {
        this.closeGallery();
    };
    openOK = () =>{
        this.showModal()

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
                <BreadcrumbCustom first="审核管理" second="开户审核"/>
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
                        <Button>保存</Button>
                        <Button>拒绝</Button>
                    </div>
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