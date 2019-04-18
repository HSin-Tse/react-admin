/**
 * Created by 叶子 on 2017/8/13.
 */
import React, {Component,Suspense} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import AllComponents from '../components';
import * as Immutable from 'immutable';
// import routes from './config';
import routesAD from '@/routes/config';







export default class CRouter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cconfig: [],
            infor: JSON.parse(localStorage.getItem('infor')),
            visible: false,
            gallery: null
        };


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


        if (!this.state.infor) {

            var bbRouter = this.deepClone(routesAD);
            this.setState({cconfig: bbRouter});

            // this.props.history.push('/app')

            return
        }

        var inforSuperFlag = this.state.infor.superFlag
        var inforMenuList = this.state.infor.menuList

        if (inforSuperFlag === 1) {
            // this.setState({cconfig: {...routesAD}});
            var imuRou = Immutable.Map(routesAD).toObject()
            this.setState({cconfig: imuRou});
            // console.log('hcia imuRou', imuRou)
            return
        }
        var bbRouter = this.deepClone(routesAD);

        var _menu = [...bbRouter.menus]
        var nowRouter = _menu.filter((key, index, array) => {
            if (key.title == '欢迎') {
                return true
            }
            if (key.title == 'dev') {
                return false
            }
            if (key.subs) {


                var ssb = key.subs.filter((sbkey, index, array) => {
                    var back = false
                    inforMenuList.forEach((item, index, array) => {
                        // console.log('hcia sbkey.tk', sbkey.tk, item.key, item.availableFlag, (sbkey.tk == item.key))

                        if (sbkey.tk == item.key) {
                            // console.log('hcia sbkey.tk', sbkey.tk, item.key, item.availableFlag, (sbkey.tk == item.key))
                            back = true
                            sbkey.op = item.availableFlag

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
            console.log('hcia component ！！！', component)

            // console.log('hcia requireLogin localStorage.getItem too', localStorage.getItem('too'))
            return <Redirect to={'/login'}/>;
        } else {
            // console.log('hcia requireLogin component', component)
            // console.log('hcia component ！！！', component)

            return component
        }
        // return permission ? this.requireAuth(permission, component) : component;
    };
     WaitingComponent=(Component)=> {
        return props => (
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...props} />
            </Suspense>
        );
    }
    render() {
        return (
            <Switch>
                {
                    Object.keys(this.state.cconfig).map(key =>
                        
                        
                        
                        

                        this.state.cconfig[key].map(r => {

                            console.log('hcia key' , r)

                            const route = r => {
                                const Component = AllComponents[r.component];
                                // console.log('hcia r', r)

                                return (
                                    <Route
                                        key={r.route || r.key}
                                        exact path={r.route || r.key}
                                        render={props => r.login ?
                                            <Component {...props} />
                                            : this.requireLogin(<Component opau={r.op} pg={r.pg}
                                                                           tk={r.tk} {...props} />)}
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