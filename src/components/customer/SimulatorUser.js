/* eslint-disable react/sort-comp */

import React, { Component } from 'react';
import {Col, Card, Row,DatePicker,Input,Modal,Button, Table, Icon,Checkbox} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import axios from 'axios';
class SimulatorUser extends Component {
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
				this.modalColumns = [{
						title: '時間',
						dataIndex: 'createDate',
						key: 'operationDiary_Date',
						// fixed: 'left',
						// width: 100,
						render: (text, record) => (
								<Button>{record.createDate}</Button>),
				 },{
 						title: '狀態',
 						dataIndex: 'comment',
 						key: 'operationDiary_Status',
 						// fixed: 'left',
 						// width: 100,
						render: (text, record) => (
								<Button>{record.comment}</Button>),
 				 },{
 						title: '操作人',
 						dataIndex: 'bkUserName',
 						key: 'operationDiary_User',
 						// fixed: 'left',
 						// width: 100,
						render: (text, record) => (
								<Button>{record.bkUserName}</Button>),
 				 }]


		this.editTableType2Columns()
		//
        this.requestListData("2")
		this.requestUserCommentList()

	}
	editTableType2Columns =() =>{
		this.columns = [
			{
					title: '選擇',
					dataIndex: 'phoneNumber',
					key: 'phoneNumber',
					// fixed: 'left',
					// width: 100,
					render: (text, record) => (
					<Checkbox
						 // checked={this.state.checked}
						 // disabled={this.state.disabled}
						 onChange={this.hasChange}
					/>),
			 }
				,{
		title: '手机号',
		dataIndex: 'phoneNumber',
		key: 'phoneNumber',
		// fixed: 'left',
		// width: 100,
		render: (text, record) => (
			<Button>{record.mobile}</Button>),
	 }
	, {
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
		render: (text, record) => (

			<Button>{record.name}</Button>),
	}, {
		title: 'APP版本',
		dataIndex: '11申请序号',
		key: '11申请序号',
		render: (text, record) => (<Button>{record.versionInfo}</Button>),
	}, {
		title: '手机型号',
		dataIndex: '11账号类型',
		key: '11账号类型',
		render: (text, record) => (
			<Button>{record.systemInfo}</Button>),
	}, {
		title: '操作系统型号',
		dataIndex: '11申请时间',
		key: '11申请时间',

	}, {
		title: '注册时间',
		dataIndex: '11审核状态',
		key: '11审核状态',
		render: (text, record) => (

			<Button>{record.date}</Button>)
	}, {
		title: '下载平台',
		dataIndex: '下载平台',
		key: '下载平台',
		render: (text, record) => (
			<Button>{record.channelInfo}</Button>),
	}, {
		title: '地理位置',
		dataIndex: '地理位置',
		key: '地理位置',
		render: (text, record) => (
			<Button>{record.location}</Button>),
	}, {
		title: '备注',
		dataIndex: '备注',
		key: '备注',
		render: (text, record) => (
			<Button>{record.comment}</Button>),
	}, {
		title: '操作人',
		dataIndex: '操作人',
		key: '操作人',
		render: (text, record) => (
			<Button>{record.operator}</Button>),
	}
	, {
		title: '操作',
		key: 'action',
						align: 'center',
		width: 300,
		render: (text, record) => (
			<div>
				<span className="ant-divider" />
				<Button className="ant-dropdown-link" onClick={() => this.showModal()}>添加備註</Button>
										<Button className="ant-dropdown-link" onClick={() => this.showModal2()}>操作日誌</Button>


			</div>
		),
	}
	];
	// this.columns = null
	}
    render() {
		const style1 = {
			padding: '8px',
		  };
        return(
             <div>
                <div>log: {this.state.anyThing}</div>
                <div>yyxLog log: SimulatorUser</div>
								<div />
                <BreadcrumbCustom first="用户管理" second="Leads管理" />

                <div>

                    <Button onClick={() => this.goToPotential()} type="primary">潛在用戶</Button>
                    <Button  type="primary">模擬用戶</Button>
                    <Button onClick={() => this.goToIntend()} type="primary">意向用戶</Button>
                </div>

                <Table rowKey="id"
                       columns={this.columns} dataSource={this.state.userList}
                       scroll={{x: 1300}}
                />
					<div style={style1}>
					 <Row gutter={16} >
                        <Col md={8}>
                                     <Checkbox onChange={this.hasChangeAll}/>
									  <Button>批量分組</Button>
									 <Button>批量延期</Button>
									 <Button>刪除</Button>
                        </Col>
                    </Row>
				
				</div>
				

								<Modal
				          title="添加備註"
				          visible={this.state.visible}
				          onOk={this.handleOk}
				          onCancel={this.handleCancel}
									okText="確認"
									cancelText="取消"
								>
				          <p><DatePicker onChange={this.selectDate} /></p>
				          <p><Input placeholder="填写回访次数以及结果" /></p>
				        </Modal>
								<Modal
									title="操作日誌"
									visible={this.state.modal2Visible}
									onOk={this.handleOk}
									onCancel={this.handleCancel}
									okText="確認"
									cancelText="取消"
								>
									<p>
									<Table rowKey="id"
												 columns={this.modalColumns} dataSource={this.state.operationDiaryHistory}
												 scroll={{x: 1300}}
									/>
									</p>
								</Modal>

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
	goToIntend =() =>{
		//
		this.props.history.push('/app/pass/IntendingUser')

	}
	goToPotential = () =>{
		this.props.history.push('/app/customer/PotentialUser')

	}
    hasChange = (status) =>{
			console.log('yyx',status.target.checked)

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
            for (var i = bb.length - 1; i >= 0; i--) {
            	let userInfo = bb[i]
            	if (userInfo.name == null || " ") {
            		userInfo.name = '沒資料'
            	}
            }
            aa.setState({anyThing: 'wwwww'});
            aa.setState({anyThing: response.data.code});
            aa.setState({userList: response.data.data.list});

        }).catch(function (error) {
            console.log(error);
            // message.warn(error);
        });
    };
		requestUserCommentList = () =>{
			// must request data:
			//belongUserId
			//loginName
			//token

			//refernce request data:
			//pageNo
			//pageSize
			//language
			const url = 'http://mobile.nooko.cn:8090/auth/getUserCommentList'

			var tmp = this;

			axios.post(url, {
				'belongUserId':'4028b2a4631f770f01631f7770df0000',
				'loginName' : 'admin',
				'token' : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNTQ1NTI4ODM0MTk5LCJsb2dpbk5hbWUiOiJhZG1pbiJ9.F7moE4DsMUiajkKB1S_wemwsozlUW5VMxQKsg4KsSUQ'

			}).then(function (response) {

					tmp.setState({operationDiaryHistory: response.data.data.list});

			}).catch(function (error) {
					console.log(error);
					// message.warn(error);
			});
		}
}

export default SimulatorUser;
