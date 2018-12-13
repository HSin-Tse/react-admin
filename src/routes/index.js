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



    componentWillMount() {
        var bbRouter = {...routes}
        this.setState({config: bbRouter});
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