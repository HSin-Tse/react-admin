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
        console.log('hcia  router componentDidMount')

    }

    componentWillMount() {
        console.log('hcia  router componentWillMount')

        // console.log('hcia  router this.state.infor', this.state.infor)
        if (this.state.infor == null) {
            console.log('hcia', 'Side ccc')

            this.setState({config: routes});

        } else if (this.state.infor.menuList.length == 0) {

            console.log('hcia', 'Side aaaa')

            var setrr = {
                ...routes,
                menus: [{key: "/app/dashboard/index", title: "歡迎", icon: "user", component: "Dashboard"}]
            }

            console.log('hcia setrr', setrr)
            this.setState({config: setrr});

        } else if (this.state.infor != null) {
            console.log('hcia', 'Side bbbbb')
            var nowRouter = routes.menus.filter((key, index, array) => {

                // console.log('hcia key', key)

                if (key.subs) {


                    var ssb = key.subs.filter((key, index, array) => {


                        var back = false


                        this.state.infor.menuList.forEach(function (item, index, array) {

                            console.log('hcia key.title', key.title, item.name, (key.title == item.name))

                            if (key.title == item.name) {
                                back = true
                            }

                        });
                        return back

                    })


                    key.subs = ssb


                    console.log('hcia key.subs', key.subs.length)

                }
                if (key.title == '歡迎') {
                    return true
                }


                return key.subs.length > 0;
            });
            var setrr = {...routes, menus: nowRouter}
            this.setState({config: setrr});

        }

    }


    requireLogin = (component) => {

        // console.log('hcia component', component)
        // const { auth } = this.props;
        // const { permissions } = auth.data;


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