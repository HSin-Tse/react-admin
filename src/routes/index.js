/**
 * Created by 叶子 on 2017/8/13.
 */
import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import AllComponents from '../components';
import routes from './config';
import routesConfigadmin from "./configadmin";
// import routesConfigadmin from './configadmin';
//
export default class CRouter extends Component {


    constructor(props) {
        super(props);
        // console.log('hcia constructor' )

        this.state = {
            config: [],
            infor: JSON.parse(localStorage.getItem('infor')),
            visible: false,
            gallery: null
        };
    }


    componentDidMount() {

    }

    componentWillMount() {
        // console.log('hcia componentWillMount')

        console.log('hcia this.state.infor', this.state.infor)
        if (this.state.infor!= null) {
            var nowRouter = routes.menus.filter((key, index, array) => {
                var back = false
                this.state.infor.menuList.forEach(function (item, index, array) {


                    // console.log('hcia key.title' , key.title,item.name,(key.title==item.name))

                    if (key.title == item.name) {
                        back = true
                    } else if (key.title == '歡迎') {
                        back = true
                    }

                });
                // if (index % 2 !== 0) {
                //     return false;
                // }
                return back;
            });
            // console.log('hcia nowRouter', nowRouter)
            // routes.menus = nowRouter
            // console.log('hcia routes', routes)
            var setrr = {...routes, menus: nowRouter}
            // console.log('hcia routes', routes)
            this.setState({config: setrr});
        } else {
            this.setState({config: routes});

        }


        // if ('超级管理员' == localStorage.getItem('displayName')) {
        //     this.setState({config: routes});
        // } else {
        //     // this.setState({config: routesConfigadmin});
        //     this.setState({config: routes});
        // }

    }


    requireAuth = (permission, component) => {
        const {auth} = this.props;
        const {permissions} = auth.data;
        console.log('hcia permissions', permissions)
        // const { auth } = store.getState().httpData;
        // if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };
    requireLogin = (component) => {
        // const { auth } = this.props;
        // const { permissions } = auth.data;


        if (!localStorage.getItem('too')) { // 线上环境判断是否登录
            return <Redirect to={'/login'}/>;
        } else {
            return component
        }
        // return permission ? this.requireAuth(permission, component) : component;
    };

    render() {
        return (
            <Switch>
                {


                    Object.keys(this.state.config).map(key =>
                        this.state.config[key].map(r => {
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