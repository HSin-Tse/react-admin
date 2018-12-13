/**
 * Created by 叶子 on 2017/8/13.
 */
import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import AllComponents from '../components';
import * as Immutable from 'immutable';
import routes from './config';
import routesAD from '@/routes/configadmin';

export default class CRouter extends Component {


    constructor(props) {
        super(props);
        this.state = {
            cconfig: [],
            infor: JSON.parse(localStorage.getItem('infor')),
            visible: false,
            gallery: null
        };


        // localStorage.setItem('@primary-color', '#0000ff');
        // window.less.modifyVars({
        //     '@primary-color': '#000000',
        // })
    }


    isObject = (obj) => {
        return typeof obj === 'object';
    }

    isArray = (arr) => {
        return Array.isArray(arr);
    }
    deepClone = (obj) => {
        if (!this.isObject(obj)) return obj;
        var cloneObj = this.isArray(obj) ? [] : {};

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var value = obj[key];
                var copy = value;

                if (this.isObject(value)) {
                    cloneObj[key] = this.deepClone(value);
                } else {
                    cloneObj[key] = value;
                }
            }
        }
        return cloneObj;
    }

    componentWillMount() {



        console.log('hcia  SiderCustom index componentWillMount')


        var inforSuperFlag = this.state.infor.superFlag
        var inforMenuList = this.state.infor.menuList

        if (inforSuperFlag === 1) {
            this.setState({cconfig: {...routesAD}});
            return
        }
        // var bbRouter = {...routes}

        var bbRouter = this.deepClone(routesAD);
        
        console.log('hcia bbRouter' , bbRouter)


        var aaaaa = [...bbRouter.menus]
        var nowRouter = aaaaa.filter((key, index, array) => {
            if (key.title == '歡迎') {
                return true
            }
            if (key.subs) {


                var ssb = key.subs.filter((sbkey, index, array) => {
                    var back = false
                    inforMenuList.forEach((item, index, array) => {
                        if (sbkey.title == item.name) {
                            console.log('hcia sbkey.title', sbkey.title, item.name, (sbkey.title == item.name))
                            back = true
                        }
                    });
                    return back
                })

                key.subs = ssb

            }
            return key.subs.length > 0;
        });

        var setrr = {...bbRouter, menus: nowRouter}
        this.setState({cconfig: setrr});

    }


    requireLogin = (component) => {

        if (!localStorage.getItem('too')) { // 线上环境判断是否登录

            // console.log('hcia requireLogin localStorage.getItem too', localStorage.getItem('too'))
            return <Redirect to={'/login'}/>;
        } else {
            // console.log('hcia requireLogin component', component)

            return component
        }
        // return permission ? this.requireAuth(permission, component) : component;
    };

    render() {
        return (
            <Switch>
                {
                    Object.keys(this.state.cconfig).map(key =>
                        this.state.cconfig[key].map(r => {
                            const route = r => {
                                const Component = AllComponents[r.component];
                                return (
                                    <Route
                                        key={r.route || r.key}
                                        exact path={r.route || r.key}
                                        render={props => r.login ?
                                            <Component {...props} />
                                            : this.requireLogin(<Component {...props} />)}
                                    />
                                )
                            }
                            return r.component ? route(r) : r.subs.map(r => route(r));
                        })
                    )
                }

                <Route render={() => <Redirect to="/"/>}/>
            </Switch>
        )
    }
}