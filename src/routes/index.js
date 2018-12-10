/**
 * Created by 叶子 on 2017/8/13.
 */
import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import AllComponents from '../components';
import routes from './config';
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
        console.log('hcia componentWillMount')

        // console.log('hcia this.state.infor', this.state.infor)
        if (this.state.infor.menuList.length == 0) {
            console.log('hcia','aaaaa')

            this.setState({config: routes});

        } else if (this.state.infor != null) {
            console.log('hcia','bbbbb')



            var nowRouter = routes.menus.filter((key, index, array) => {
                var back = false
                this.state.infor.menuList.forEach(function (item, index, array) {



                    if (key.title == item.name) {
                        back = true
                    } else if (key.title == '歡迎') {
                        back = true
                    }

                });
                return back;
            });
            // routes.menus = nowRouter
            var setrr = {...routes, menus: nowRouter}
            this.setState({config: routes});

        } else {
            console.log('hcia','cccc')

            this.setState({config: routes});

        }




        // if ('超级管理员' == localStorage.getItem('displayName')) {
        //     this.setState({config: routes});
        // } else {
        //     // this.setState({config: routesConfigadmin});
        //     this.setState({config: routes});
        // }

    }


    // requireAuth = (permission, component) => {
    //     const {auth} = this.props;
    //     const {permissions} = auth.data;
    //     console.log('hcia permissions', permissions)
    //     // const { auth } = store.getState().httpData;
    //     // if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
    //     return component;
    // };
    requireLogin = (component) => {
        // const { auth } = this.props;
        // const { permissions } = auth.data;


        if (!localStorage.getItem('too')) { // 线上环境判断是否登录
            
            console.log('hcia localStorage.getItem too' , localStorage.getItem('too'))
            return <Redirect to={'/login'}/>;
        } else {
            console.log('hcia component' , component)
            
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