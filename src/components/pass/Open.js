/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Button, Table, Icon} from 'antd';


import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import axios from 'axios';


class Basic extends Component {

    columns = [
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
            <Button onClick={()=>this.handleEdit(record)}>Delete</Button>
            <span className="ant-divider"/>
            <Button className="ant-dropdown-link">
                More actions <Icon type="down"/>
            </Button>

        </span>
            ),
        }];
    handleEdit = (record) => {

        console.log('hcia', 'ss',record);

    };
    itemDeleteClick = (id) => console.log('hcia', 'itemDeleteClick', id);
    click = (recored, key, ww) => {

        console.log('hcia', recored);

        console.log('hcia', key);
        console.log('hcia', ww);

    };
    test = () => {
        this.setState({testtt: '123321'});
        var aa = this;
        axios.post('http://mobile.nooko.cn:8090/open/getOpenApplyList', {
            // firstName: 'Fred',
            // lastName: 'Flintstone'
        }).then(function (response) {
            console.log(response);
            aa.setState({testtt: 'wwwww'});


            aa.setState({testtt: response.data.code});
            aa.setState({userList: response.data.data.list});


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
            , userList: []
            , testtt: 'asdasd'

        };


    }

    componentDidMount() {
        console.log("hcia", " componentDidMount ")


        this.test()

    }

    componentWillUnmount() {
        console.log("hcia", " componentWillUnmount ")
    }

    render() {
        return (
            <div>
                <div>log: {this.state.testtt}</div>
                {/*<div>  {this.state.date}</div>*/}


                {/*<div>  {this.state.userList}</div>*/}

                <BreadcrumbCustom first="审核管理" second="开户审核"/>
                <div>
                    <Button onClick={this.test} type="primary">Primary</Button>
                    <Button onClick={() => this.itemDeleteClick()}> Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                </div>

                <Table
                    columns={this.columns} dataSource={this.state.userList}

                    // onRow={(record,rowkey,ww)=>{
                    //
                    //     return{
                    //
                    //         onClick : this.click.bind(this,record,rowkey,ww)    //点击行 record 指的本行的数据内容，rowkey指的是本行的索引
                    //
                    //     }
                    //
                    // }}


                />
            </div>

        )
    }
}

export default Basic