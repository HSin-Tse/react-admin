import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { AppContainer } from 'react-hot-loader';
import Page from './Page';
import './style/lib/animate.css';
import './style/antd/index.less';
import './style/index.less';
import axios from "axios";
import {message} from 'antd';

// redux 注入操作
const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));
var Axios = axios.create({
    baseURL: 'http://mobile.nooko.cn:8090/'
});

window.Axios=Axios;

window.Axios.interceptors.request.use(
    config => {
        var xtoken = localStorage.getItem('too')
        var loginName = localStorage.getItem('loginName')

        if(xtoken != null){
            config.headers['X-Token'] = xtoken
            if(config.method=='post'){
                config.data = {
                    ...config.data,
                    'token': xtoken,
                    'loginName': loginName,
                    'language': 'zh-CN',

                }
            }else if(config.method=='get'){
                config.params = {
                    _t: Date.parse(new Date())/1000,
                    ...config.params
                }
            }
        }

        return config
    },function(error){
        return Promise.reject(error)
    })



window.Axios.interceptors.response.use(function (response) {
    // token 已过期，重定向到登录页面
    // console.log('hcia response' , response)

    if (response.data.code != 1){

        // localStorage.clear()
        // router.replace({
        //     path: '/signin',
        //     query: {redirect: router.currentRoute.fullPath}
        // })
        message.error(response.data.msg)

    }
    return response
}, function (error) {
    // Do something with response error
    return Promise.reject(error)


})

console.log(store.getState());
// const render = Component => { // 增加react-hot-loader保持状态刷新操作，如果不需要可去掉并把下面注释的打开
//     ReactDOM.render(
//         <AppContainer>
//             <Provider store={store}>
//                 <Component store={store} />
//             </Provider>
//         </AppContainer>
//         ,
//         document.getElementById('root')
//     );
// };

// render(Page);

// Webpack Hot Module Replacement API
// if (module.hot) {
//     // 隐藏You cannot change <Router routes>; it will be ignored 错误提示
//     // react-hot-loader 使用在react-router 3.x上引起的提示，react-router 4.x不存在
//     // 详情可参照https://github.com/gaearon/react-hot-loader/issues/298
//     const orgError = console.error; // eslint-disable-line no-console
//     console.error = (...args) => { // eslint-disable-line no-console
//         if (args && args.length === 1 && typeof args[0] === 'string' && args[0].indexOf('You cannot change <Router routes>;') > -1) {
//             // React route changed
//         } else {
//             // Log the error as normally
//             orgError.apply(console, args);
//         }
//     };
//     module.hot.accept('./Page', () => {
//         render(Page);
//     })
// }

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Page store={store} />
        </Provider>
    </AppContainer>
 ,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
