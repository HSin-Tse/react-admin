/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import {message} from 'antd';
import {addTodo, setINFOR} from "../../action";
import avater from '@/style/imgs/ixlogo.png';
import ReactCanvasNest from 'react-canvas-nest';

const FormItem = Form.Item;


// var cn = new CanvasNest(document.getElementById('Loggin'), config);

class Login extends React.Component {
    componentWillMount() {
        const {receiveData} = this.props;
        receiveData(null, 'auth');
    }


    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps


    }

    handleSubmit = (e) => {
        e.preventDefault();

        let self = this;

        this.props.form.validateFields((err, values) => {


            if (!err) {

                localStorage.removeItem('infor');
                localStorage.removeItem('user');
                localStorage.removeItem('too');
                localStorage.removeItem('displayName');

                window.Axios.post('auth/login', {
                    'loginName': values.userName,
                    'password': values.password,
                    'language': "zh-CN"
                }).then(function (response) {
                    localStorage.setItem('liveecho', new Date().getTime());

                    if ((response.data.code == 1) && response.data.data.token) {
                        // 判断是否登陆
                        message.success('welcome~' + response.data.data.displayName)
                        // message.success(response.data.data.token)


                        localStorage.setItem('infor', JSON.stringify(response.data.data));
                        localStorage.setItem('displayName', response.data.data.displayName);
                        localStorage.setItem('loginName', response.data.data.loginName);
                        localStorage.setItem('too', response.data.data.token);


                        const ssss = localStorage.getItem('too');
                        
                        console.log('hcia ssss' , ssss)

                        if (ssss) {


                            self.props.history.push('/app/dashboard/index');
                        } else {
                            // message.error('等待跳轉~'+ssss )

                        }
                        // self.props.setUSER(response.data.data)

                        window.Axios.post('back/addLogHistory', {
                            'moduleLog': 'loging',
                            'pageLog': 'loging',
                            'commentLog': '登入',
                            'typeLog': 1,
                        });

                    }


                }).catch(function (error) {
                    console.log('hcia error', error)
                    console.log(error);
                });


            }

        });


    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (

            <dic id="Loggin" className="login">

                <div style={{zIndex: 10}} className="login-form">

                    <div className="login-logoa">
                        <img style={{height: 35, width: 35}} src={avater} alt="头像"/>
                    </div>
                    {/*<div className="login-logo">*/}
                    {/*<span>IX TRADER CRM</span>*/}
                    {/*</div>*/}
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: '请输入用户名!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder=""/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>}
                                       type="password"
                                       placeholder=""/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <span className="login-form-forgot" href="" style={{float: 'right'}}></span>
                            <Button type="primary" htmlType="submit" className="login-form-button"
                                    style={{width: '100%'}}>
                                登录
                            </Button>

                        </FormItem>
                    </Form>
                </div>

                <ReactCanvasNest className='canvasNest' config={{pointColor: ' 255, 255, 255 ', count: 100}}
                                 style={{zIndex: 0}}/>

            </dic>
        );
    }
}

const mapStateToPorps = state => {
    const {auth} = state.httpData;
    const infor = state.infor;
    return {auth, infor};
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch),
    setUSER: bindActionCreators(setINFOR, dispatch),

});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));

