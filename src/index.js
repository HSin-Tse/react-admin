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

// redux 注入操作
const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));
var Axios = axios.create({
    baseURL: 'http://mobile.nooko.cn:8090/'
});

window.Axios = Axios;

var hideLoading
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

                // Toast.success('加载完成')

                // console.log('hcia hideLoading' , hideLoading)

                if (hideLoading) {

                } else {
                    hideLoading = Toast.loading('加载中...', 0, () => {
                        // Toast.success('加载完成')
                    })
                }

                message.config({
                    top: '40%',
                    maxCount: 3,
                });
                // ss=   message.loading('Action in progress..', 0)
                // message.success('Loading finished', 2.5)
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

    // localStorage.removeItem('infor');
    // localStorage.removeItem('user');
    // localStorage.removeItem('too');
    // localStorage.removeItem('displayName');

    
    // console.log('hcia location.host' , window.location.host)
    // window.location ='http://'+ window.location.host+"/#/login";


    // this.props.history.push('/login')

    if (response.data.code != 1) {
        setTimeout(hideLoading, 0)

        message.error(response.data.msg)


        //

        if(response.data.msg == '无效的token'){
            
            
            console.log('hcia response.data.msg' , response.data.msg)
            // window.location ='http://'+ window.location.host+"/#/login";
            localStorage.removeItem('infor');
            localStorage.removeItem('user');
            localStorage.removeItem('too');
            localStorage.removeItem('displayName');



            // this.props.history.push('/login')
        }

        return Promise.reject(response)
    }
    setTimeout(hideLoading, 0)
    hideLoading = undefined
    // setTimeout(ss, 0);

    return response
}, function (error) {
    setTimeout(hideLoading, 0)

    message.error(error.toString())
    return Promise.reject(error)
})


ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Page store={store}/>

        </Provider>


    </AppContainer>
    ,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
