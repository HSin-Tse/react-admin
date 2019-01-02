/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import {Row, Col, Button, Input, message} from 'antd';
import {bindActionCreators} from "redux";
import {addTodo, setINFOR} from "../../action";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import ReactJson from 'react-json-view'
import Base64  from 'base-64';


const {TextArea} = Input;


class DEVhboard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            resp: undefined,
            displayName: '',
            too: '',
            path: 'auth/getRecordCommentList',
            requestBody: '{"/a":1,"b":"aa"}',
            HOST: 'http://mobile.nooko.cn:8090/',

        };
    }

    getURL = (url) => {


        var promise = new Promise(function (resolve, reject) {

            JSON.parse(url)
            resolve(url)

        });

        return promise
    }

    componentDidMount() {


        console.log('hcia this.props', this.props)
        var ss = this.props.match.params.catch

        console.log('hcia catch', ss)

        if(ss==':catch'){

        }else{
            console.log('hcia  decode catch', Base64.decode(ss))

            if ((this.isJson(decodeURIComponent(Base64.decode(ss))))) {
                this.setState({

                    ...JSON.parse(decodeURIComponent(Base64.decode(ss)) )
                });

            } else {

            }



        }



        this.setState({displayName: localStorage.getItem('loginName')});
        this.setState({too: localStorage.getItem('too')});
        this.setState({HOST: window.Axios.defaults.baseURL});
    }

    isJson = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }


    render() {
        return (
            <div className="gutter-example button-demo">
                {/*{JSON.stringify(localStorage.getItem('infor'))}*/}

                <Row gutter={1}>
                    <Col md={24}>
                        <div style={{display: this.state.displayName == 'admin' ? '' : 'none'}}>
                            <h4>{localStorage.getItem('loginName')} tokon:</h4>
                            <TextArea style={{width: '100%'}}
                                      value={this.state.too}
                            />
                            <h1 style={{marginTop: 15}}>
                                Change your Base URL
                            </h1>

                            <h3>http://mobile.nooko.cn:8090/</h3>
                            <h3>http://127.0.0.1:8080/</h3>


                            <div style={{display: 'flex', minHeight: 40}}>
                                <span style={{width: 80}}>now host:</span>
                                <Input

                                    value={this.state.HOST}
                                    onChange={(e) => {

                                        var self = this
                                        this.setState({
                                            HOST: e.target.value,
                                        }, () => {
                                            var Axios = axios.create({
                                                baseURL: self.state.HOST
                                            });

                                            window.Axios = Axios;

                                            window.Axios.interceptors.request.use(
                                                config => {
                                                    var xtoken = localStorage.getItem('too')
                                                    var loginName = localStorage.getItem('loginName')

                                                    loginName = encodeURI(loginName)

                                                    // console.log('hcia loginName' , loginName)
                                                    // console.log('hcia xtoken' , xtoken)

                                                    if (xtoken != null) {
                                                        config.headers['X-Token'] = xtoken
                                                        if (config.method == 'post') {
                                                            config.data = {
                                                                ...config.data,
                                                                'token': xtoken,
                                                                'loginName': loginName,
                                                                'language': 'zh-CN',

                                                            }

                                                            config.timeout = 30 * 1000

                                                            config.headers = {
                                                                'token': xtoken,
                                                                'loginName': loginName,
                                                            }

                                                        } else if (config.method == 'get') {
                                                            config.params = {
                                                                _t: Date.parse(new Date()) / 1000,
                                                                ...config.params
                                                            }
                                                        }
                                                    }

                                                    return config
                                                }, function (error) {

                                                    console.log('hcia error', error)
                                                    return Promise.reject(error)
                                                })


                                            window.Axios.interceptors.response.use(function (response) {

                                                if (response.data.code != 1) {
                                                    message.error(response.data.msg)
                                                    return Promise.reject(response)
                                                }
                                                return response
                                            }, function (error) {
                                                message.error(error.toString())
                                                return Promise.reject(error)
                                            })
                                        });


                                    }}
                                    style={{width: 320}} placeholder="http://127.0.0.1:8080/"/>

                            </div>


                            <div style={{display: 'flex', minHeight: 40}}>
                                <span style={{width: 80}}>now path:</span>
                                <Input

                                    value={this.state.path}
                                    onChange={(e) => {
                                        var self = this
                                        this.setState({
                                            path: e.target.value,
                                        });
                                    }}
                                    style={{width: 320}} placeholder="a/b/c"/>
                            </div>


                            <div style={{display: 'flex', minHeight: 40}}>
                                <span style={{minWidth: 80}}>Request </span>
                                <TextArea style={{width: 180}}
                                          value={this.state.requestBody}
                                          rows={4}
                                          onChange={(e) => {

                                              var self = this

                                              // self.getURL(e.target.value).then(function onFulfilled(value) {
                                              //     console.log('hcia value', value)
                                              //
                                              // }, function onRejected(error) {
                                              //     console.log('hcia error', error)
                                              //
                                              // });

                                              self.setState({
                                                  requestBody: e.target.value
                                              });

                                          }}/>

                                <ReactJson
                                    onEdit={(edit) => {
                                        console.log('edit =======>', edit)
                                    }}
                                    src={
                                        (this.isJson(this.state.requestBody)) ? JSON.parse(this.state.requestBody) : '{error:a}'
                                    }/>
                            </div>


                            <Button
                                style={{marginBottom: 15}}

                                disabled={!this.isJson(this.state.requestBody)}
                                onClick={() => {

                                    var self = this

                                    console.log('hcia this.state.requestBody', this.state.requestBody)

                                    const isFirst = JSON.parse(self.state.requestBody);
                                    console.log('hcia isFirst', isFirst)

                                    window.Axios.post(this.state.path, isFirst)
                                        .then(function (response) {

                                            self.setState({
                                                resp: response.data,
                                            });

                                        }).catch(error => {

                                        console.log('hcia error', error)
                                        self.setState({
                                            resp: error,
                                        });

                                        // message.error(error)
                                    })
                                }}> send </Button>

                            <ReactJson src={this.state.resp}></ReactJson>


                        </div>

                    </Col>
                    {/*<Col md={12}>*/}
                    {/*<Iframe url="http://note.youdao.com/share/?id=28f19f75d6b6d7ae49c57a60be984f6b&type=note#/"></Iframe>*/}
                    {/*</Col>*/}
                </Row>


                <hr/>

                <Row gutter={1}>
                    <Col md={24}>
                        <div>URL to CHROME Copy all and Past</div>

                    <TextArea style={{width: 580}}
                              value={
                                  'http://mobile.nooko.cn:8090/#/app/devboard/index' + Base64.encode(encodeURIComponent(JSON.stringify(this.state))  )
                              }
                              rows={1}
                    />


                    </Col>
                </Row>

                <Row gutter={1}>
                    <Col md={24}>
                        <div>Cache Copy all and Past</div>


                        <TextArea style={{width: 180}}
                                  value={
                                      JSON.stringify(this.state)
                                  }
                                  rows={4}
                                  onChange={(e) => {

                                      if ((this.isJson(e.target.value))) {
                                          this.setState({

                                              ...JSON.parse(e.target.value)
                                          });

                                      } else {

                                      }

                                  }}/>

                    </Col>
                </Row>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const todps = state.todos;
    const infor = state.infor;
    return {todps, infor};
};
const mapDispatchToProps = dispatch => ({
    addTodo: bindActionCreators(addTodo, dispatch),
    setUSER: bindActionCreators(setINFOR, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(DEVhboard);