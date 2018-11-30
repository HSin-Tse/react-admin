/* eslint-disable react/sort-comp */

import React, { Component } from 'react';
import {Col, Card, Row,DatePicker,Input,Modal,Button, Table, Icon,Checkbox} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import axios from 'axios';
class CustomerUserInfo extends Component {
	state = { visible: false,modal2Visible:false }


 showModal2 = () =>{
	 this.setState({
		 modal2Visible: true,
		 visible: false,

	 });
 }
 showModal = () => {
	 this.setState({
		 visible: true,
		 modal2Visible: false,
	 });
 }

 handleOk = (e) => {
	 console.log(e);
	 this.setState({
		 visible: false,
		 modal2Visible: false,
	 });
 }

 handleCancel = (e) => {
	 console.log(e);
	 this.setState({
		 visible: false,
		 modal2Visible: false,
	 });
 }

	componentDidMount() {
				


        this.requestListData("4")

	}
    render() {
		const style1 = {
			padding: '8px',
		  };
        return(
			
        <div>
            <div>yyxLog log: CustomerUserInfo</div>
            
      <p
      style={{
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.85)',
        marginBottom: 16,
        fontWeight: 500,
      }}>
     用戶管理
      </p>
    <div> <BreadcrumbCustom first="用户總表" second="行為信息" /></div>
    <Card
      type="inner"
      title="基本信息"
    >
      Inner Card content
    </Card>
    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title="數據信息"
    >
      Inner Card content
    </Card>
    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title="行為信息"
    >
      Inner Card content
    </Card>
    <Card
      style={{ marginTop: 16 }}
      type="inner"
      title="其他"
    >
      Inner Card content
    </Card>
           

              
			

        </div>
		    )
    }
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
            , userList: []
			, operationDiaryHistory: []
			, anyThing: 'asdasd'
        };
	}
	
	
	hasChangeAll = () =>{

	}
    hasChange = (status) =>{
		console.log('yyx',status.target.checked)
    }
	checkDiary = () => {

	}
	selectDate = (date, dateString) => {
  	       console.log(dateString,'yyx',date);
	}

    requestListData = (listType) => {
        var aa = this;
        axios.post('http://mobile.nooko.cn:8090/ixuser/getUserList', {
        	'listType' : listType,
        	'loginName' : 'admin',
        	'token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNTQ1NTI4ODM0MTk5LCJsb2dpbk5hbWUiOiJhZG1pbiJ9.F7moE4DsMUiajkKB1S_wemwsozlUW5VMxQKsg4KsSUQ'

        }).then(function (response) {
            var bb = response.data.data.list;
            aa.setState({anyThing: 'wwwww'});
            aa.setState({anyThing: response.data.code});
            aa.setState({userList: response.data.data.list});

        }).catch(function (error) {
            console.log(error);
        });
    };
}

export default CustomerUserInfo;
