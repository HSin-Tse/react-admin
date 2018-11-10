/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Row, Col, Card, Button, message, Table, Icon} from 'antd';


import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {get, post} from '../../axios/tools';
import axios from 'axios';

const columns = [
   {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (text, record) => (
        <span>
            <Button>{record.id}</Button>

        </span>
    ),
}, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
        render: (text, record) => (
            <span>
            <Button>{record.cnName}</Button>

        </span>
        ),

}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
            <Button>Action 一 {record.city}</Button>
            <span className="ant-divider"/>
            <Button>Delete</Button>
            <span className="ant-divider"/>
            <Button className="ant-dropdown-link">
                More actions <Icon type="down"/>
            </Button>
        </span>
    ),
}];

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];

class Basic extends Component {


    test = () => {
        this.setState({testtt: '123321'});
        var aa=this
        axios.post('http://mobile.nooko.cn:8090/open/getOpenApplyList', {
            // firstName: 'Fred',
            // lastName: 'Flintstone'
        }).then(function (response) {
            console.log(response);
            aa.setState({testtt : 'wwwww'});



            aa.setState({testtt : response.data.code});
            aa.setState({userList : response.data.data.list});

            //
            // this.state.data = response;
            //
            // this.state.userList  =response.data.data.list;
            // this.setState({userList: response.data.data.list});

            // this.set
            // message.info(response);

        }).catch(function (error) {
            console.log(error);
            // message.warn(error);

        });
    };


    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            // , data: []
            ,userList:[]
            ,testtt:'asdasd'

        };


    }

    componentDidMount() {
        console.log("hcia", " componentDidMount ")

        // axios.post('http://mobile.nooko.cn:8090/open/getOpenApplyList', {
        //     firstName: 'Fred',
        //     lastName: 'Flintstone'
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        this.test()

        // this.setState({testtt: '123321'});
        // var aa=this
        // axios.post('http://mobile.nooko.cn:8090/open/getOpenApplyList', {
        //     // firstName: 'Fred',
        //     // lastName: 'Flintstone'
        // }).then(function (response) {
        //     console.log(response);
        //     aa.setState({testtt : 'wwwww'});
        //
        //
        //
        //     aa.setState({testtt : response.data.code});
        //     aa.setState({userList : response.data.data.list});
        //
        //     //
        //     // this.state.data = response;
        //     //
        //     // this.state.userList  =response.data.data.list;
        //     // this.setState({userList: response.data.data.list});
        //
        //     // this.set
        //     // message.info(response);
        //
        // }).catch(function (error) {
        //     console.log(error);
        //     // message.warn(error);
        //
        // });
    }

    componentWillUnmount() {
        console.log("hcia", " componentWillUnmount ")

    }

    render() {
        return (
            <div>
                <div>log:  {this.state.testtt}</div>
                {/*<div>  {this.state.date}</div>*/}


                {/*<div>  {this.state.userList}</div>*/}

                <BreadcrumbCustom first="审核管理" second="开户审核"/>
                <div>
                    <Button onClick={this.test} type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                </div>

                <Table columns={columns} dataSource={this.state.userList}/>
            </div>

        )
    }
}

export default Basic