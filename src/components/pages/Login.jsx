/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import {message} from 'antd';
import axios from "axios";

const FormItem = Form.Item;

class Login extends React.Component {
    componentWillMount() {
        const {receiveData} = this.props;
        receiveData(null, 'auth');
    }

    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        const {auth: nextAuth = {}, history} = this.props;

        var ssss = localStorage.getItem('too');
        // console.log('hcia ssss', ssss);

        // console.log('hcia nextAuth', nextAuth)
        if (nextAuth.data && nextAuth.data.uid) { // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
        }
        if (ssss) {
            message.info('ok go  等待跳轉~')
            history.push('/');


        } else {
            // message.error('等待跳轉~'+ssss )

        }



    }

    handleSubmit = (e) => {
        e.preventDefault();

        let self = this;

        this.props.form.validateFields((err, values) => {


            console.log('hcia err', err)

            console.log('hcia', values.userName)
            console.log('hcia', values.password)
            localStorage.removeItem('too')

            if (!err) {
                axios.post('http://mobile.nooko.cn:8090/auth/login', {
                    'loginName': values.userName,
                    'password': values.password,
                    // 'loginName': this.props.match.params.id,
                    // 'token': this.props.match.params.id,
                    'language': "zh-CN"
                }).then(function (response) {
                    console.log('hcia', response.data.code);
                    console.log('hcia response.data.data.token', response.data.data.token)
                    // self.setState({
                    //     recordData: response.data.data,
                    // });


                    console.log('hcia', response.data);
                    // self.prop.history.push('/');

                    if ((response.data.code == 1) && response.data.data.token) {
                        // 判断是否登陆
                        message.success('welcome~' + response.data.data.displayName)
                        // message.success(response.data.data.token)


                        const {fetchData} = self.props;
                        fetchData({funcName: 'admin', stateName: 'auth'});
                        localStorage.setItem('too', response.data.data.token);
                        localStorage.setItem('displayName', response.data.data.displayName);
                        localStorage.setItem('loginName', response.data.data.loginName);

                        // localStorage.setItem('user', JSON.stringify(nextAuth.data));
                        // self.prop.history.push('/');


                        //
                        // if (values.userName === 'admin' && values.password === 'admin')
                        // if (values.userName === 'guest' && values.password === 'guest')
                        //     fetchData({funcName: 'guest', stateName: 'auth'});


                    }


                }).catch(function (error) {
                    console.log(error);
                });


            }


        });


    };
    // gitHub = () => {
    //     window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
    // };
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <div className="login-form">
                    <div className="login-logo">
                        <span>IX TRADER Admin</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: '请输入用户名!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="--admin--"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="-- 123456 --"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>
                            <Button type="primary" htmlType="submit" className="login-form-button"
                                    style={{width: '100%'}}>
                                登录
                            </Button>

                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToPorps = state => {
    const {auth} = state.httpData;
    return {auth};
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));