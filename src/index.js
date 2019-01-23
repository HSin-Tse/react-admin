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

// redux 注入操作
const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));
var Axios = axios.create({
    baseURL: 'http://mobile.nooko.cn:8090/'
});

var aaxios = axios.create({
    baseURL: 'http://mobile.nooko.cn:8090/'
});


// addLocaleData([...en, ...zh]);

message.config({
    top: '10%',
    maxCount: 1,
});
window.Axios = Axios;
window.PAxios = aaxios;

var hideLoading

// 请求列表
// 取消列表
const CancelToken = axios.CancelToken
let sources = []


window.PAxios.interceptors.request.use(
    config => {
        var xtoken = localStorage.getItem('too')
        var loginName = localStorage.getItem('loginName')

        loginName = encodeURI(loginName)

        // console.log('hcia loginName' , loginName)
        // console.log('hcia xtoken' , xtoken)

        if (xtoken != null) {
            config.headers['X-Token'] = xtoken
            if (config.method == 'post') {


                // config.data = {
                //     ...config.data,
                //     'token': xtoken,
                //     'loginName': loginName,
                //     'language': 'zh-CN',
                //
                // }

                // config.timeout = 30 * 1000

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


let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for (let p in pending) {


        if (pending[p].u === JSON.stringify(config.url) + JSON.stringify(config.data)) { //当当前请求在数组中存在时执行函数体
            pending[p].f(); //执行取消操作
            pending.splice(p, 1); //把这条记录从数组中移除
        }
    }
}


window.Axios.interceptors.request.use(
    config => {

        const request = JSON.stringify(config.url) + JSON.stringify(config.data)

        removePending(config); //在一个ajax发送前执行一下取消操作
        config.cancelToken = new cancelToken((c) => {
            // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
            pending.push({u: request, f: c});
        });

        // const request = JSON.stringify(config.url) + JSON.stringify(config.data)

        // config.cancelToken = new CancelToken((cancel) => {
        //     sources[request] = cancel
        // })

        //1.判断请求是否已存在请求列表，避免重复请求，将当前请求添加进请求列表数组；
        // if(requestList.includes(request)){
        //
        //     // sources[request]('取消重复请求'+config.url)
        //
        //     // sources.remove(request)
        // }else{
        //     //2.请求开始，改变loading状态供加载动画使用
        //     // store.dispatch('changeGlobalState', {loading: true})
        // }
        //
        // requestList.push(request)

        var xtoken = localStorage.getItem('too')
        var loginName = localStorage.getItem('loginName')

        loginName = encodeURI(loginName)

        // console.log('hcia loginName' , loginName)
        // console.log('hcia xtoken' , xtoken)


        if (xtoken != null) {
            config.headers['X-Token'] = xtoken
            if (config.method == 'post') {

                // Toast.success('加载完成')

                // console.log('hcia hideLoading' , hideLoading)


                // console.log('hcia config' , config)

                if (hideLoading) {

                } else {
                    hideLoading = Toast.loading('加载中...', 0, () => {
                        // Toast.success('加载完成')
                    })
                }


                // ss=   message.loading('Action in progress..', 0)
                // message.success('Loading finished', 2.5)
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

    // localStorage.removeItem('infor');
    // localStorage.removeItem('user');
    // localStorage.removeItem('too');
    // localStorage.removeItem('displayName');


    // console.log('hcia location.host' , window.location.host)
    // window.location ='http://'+ window.location.host+"/#/login";


    // this.props.history.push('/login')

    // const request = JSON.stringify(response.url) + JSON.stringify(response.data)

    // console.log('hcia request' , request)

    // sources.remove(request)
    removePending(response.config);
    if (response.data.code != 1) {
        setTimeout(hideLoading, 0)
        message.error(response.data.msg)

        if (response.data.msg == '无效的token') {

            // console.log('hcia response.data.msg' , response.data.msg)
            localStorage.removeItem('infor');
            localStorage.removeItem('user');
            localStorage.removeItem('too');
            localStorage.removeItem('displayName');


            // var isMe =window.location.port== ''

            var isTESTServer = window.location.port == '8090'

            var pasub = ''
            if (isTESTServer) {
                pasub = '/build'
            } else {
                pasub = ''
            }

            var gogogo = window.location.protocol + '//' + window.location.host + pasub + "/#/login"
            window.location = gogogo;
            // this.props.history.push('/login')
        }

        return Promise.reject(response)
    }
    setTimeout(hideLoading, 0)
    hideLoading = undefined
    // setTimeout(ss, 0);

    return response
}, function (error) {
    console.log('hcia error.toString()', error.toString())

    if (error.toString() == 'Cancel') {
        // message.error(error.toString()+'TEST')
    } else {
        setTimeout(hideLoading, 0)

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
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
