import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import {AppContainer} from 'react-hot-loader';
import Page from './Page';
import {} from './try'
import './style/lib/animate.css';
import './style/antd/index.less';
import './style/index.less';
import axios from "axios";
import {message} from 'antd';
import Toast from './components/widget/toast'
import {IntlProvider, addLocaleData} from 'react-intl';
import en from './locale/en_US'
import zh from './locale/zh_CN'

const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));


// var baseURL = 'https://crmapi.ixtrader.mobi:18107'
var baseURL = window.location.protocol + '//mobile.nooko.cn:8090/'

var Axios = axios.create({
    baseURL
});

var aaxios = axios.create({
    baseURL
});


message.config({
    top: '10%',
    maxCount: 1,
});
window.Axios = Axios;
window.PAxios = aaxios;// は「http:」


let loadCount = 0;

window.PAxios.interceptors.request.use(
    config => {
        var xtoken = localStorage.getItem('too')
        var loginName = localStorage.getItem('loginName')

        loginName = encodeURI(loginName)


        if (xtoken != null) {
            config.headers['X-Token'] = xtoken
            if (config.method == 'post') {


                config.headers = {
                    'Content-Type': 'multipart/form-data',
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


let pending = [];
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for (let p in pending) {


        if (pending[p].u === JSON.stringify(config.url) + JSON.stringify(config.data)) {
            pending[p].f();
            pending.splice(p, 1);
        }
    }
}


window.Axios.interceptors.request.use(
    config => {
        loadCount++;
        const request = JSON.stringify(config.url) + JSON.stringify(config.data)

        removePending(config);
        config.cancelToken = new cancelToken((c) => {
            pending.push({u: request, f: c});
        });


        var xtoken = localStorage.getItem('too')
        var loginName = localStorage.getItem('loginName')

        loginName = encodeURI(loginName)

        if (xtoken != null) {
            config.headers['X-Token'] = xtoken
            if (config.method == 'post') {


                window.hideLoading = Toast.loading('加载中...', 0, () => {

                })


                config.data = {
                    ...config.data,
                    'token': xtoken,
                    'loginName': loginName,
                    'language': 'zh-CN',

                }

                config.timeout = 60 * 1000

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
    loadCount--
    removePending(response.config);
    if (response.data.code != 1) {

        if (loadCount == 0) {
            setTimeout(window.hideLoading, 0)
        }
        // setTimeout(hideLoading, 0)
        message.error(response.data.msg)

        if (response.data.errorCode == 'ERROR_022' || response.data.errorCode == 'ERROR_020') {

            // console.log('hcia response.data.msg' , response.data.msg)
            localStorage.removeItem('infor');
            localStorage.removeItem('user');
            localStorage.removeItem('too');
            localStorage.removeItem('displayName');


            var isTESTServer = window.location.port == '8090'

            var pasub = ''
            if (isTESTServer) {
                pasub = '/build'
            } else {
                pasub = ''
            }

            var gogogo = window.location.protocol + '//' + window.location.host + pasub + "/#/login"
            window.location = gogogo;
        }

        return Promise.reject(response)
    }
    if (loadCount <= 0) {
        setTimeout(window.hideLoading, 0)
    }

    return response
}, function (error) {

    loadCount--

    if (error.toString() == 'Cancel') {
    } else {
        if (loadCount == 0) {
            setTimeout(window.hideLoading, 0)
        }
        message.error(error.toString())
    }
    return Promise.reject(error)
})

ReactDOM.render(
    <IntlProvider locale="en">
        <AppContainer>
            <Provider store={store}>
                <Page store={store}/>
            </Provider>
        </AppContainer>
    </IntlProvider>,
    document.getElementById('root')
);
serviceWorker.register();
