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
				this.modalColumns = [{
						title: '時間',
						dataIndex: 'createDate',
						key: 'operationDiary_Date',

						render: (text, record) => (
								<Button>{record.createDate}</Button>),
				 },{
 						title: '狀態',
 						dataIndex: 'comment',
 						key: 'operationDiary_Status',
 						
						render: (text, record) => (
								<Button>{record.comment}</Button>),
 				 },{
 						title: '操作人',
 						dataIndex: 'bkUserName',
 						key: 'operationDiary_User',
 						
						render: (text, record) => (
								<Button>{record.bkUserName}</Button>),
 				 }]


		this.editTableType1Columns()
		//
        this.requestListData("4")
		this.requestUserCommentList()

	}
	editTableType1Columns =() =>{
		this.columns = [
	{
		title: '選擇',
		dataIndex: 'aaaaa',
		key: 'aasasasas',
		render: (text, record) => (
			<Checkbox onChange={this.hasChange}/>)				
	}
	,{
		title: '手机号',
		dataIndex: 'phoneNumber',
		key: 'phoneNumber',
		
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
		title: '账户类型',
		dataIndex: 'accountType',
		key: 'accountType',
		render: (text, record) => (<Button>{record.accountType}</Button>),
	}, {
		title: '交易账号',
		dataIndex: '11账号类型',
		key: '11账号类型',
		render: (text, record) => (
			<Button>{record.accountNo}</Button>),
	}, {
		title: '最近登录时间',
		dataIndex: 'date',
		key: 'date',
		render: (text, record) => (
			<Button>{record.date}</Button>)
	}, {
		title: '客诉次数',
		dataIndex: 'complaintNum',
		key: 'complaintNum',
		render: (text, record) => (
			<Button>{record.complaintNum}</Button>)
	}, {
		title: '回访次数',
		dataIndex: 'commentNum',
		key: 'commentNum',
		render: (text, record) => (
			<Button>{record.commentNum}</Button>),
	}, {
		title: '备注信息',
		dataIndex: '地理位置xxzxzx',
		key: '地理位置zxzxxzx',
		render: (text, record) => (
			<Button>{record.comment}</Button>),
	}, {
		title: '查看',
		dataIndex: 'asas备注',
		key: '备asasas注',
		render: (text, record) => (
			<div>
				<Button className="ant-dropdown-link" onClick={() => this.goToUserAccountInfo()}>開戶信息</Button>
				<Button className="ant-dropdown-link" onClick={() => this.goToUserInfo()}>行為信息</Button>
			</div>
		),
	},
	 {
		title: '操作人',
		dataIndex: 'operator',
		key: 'operator',
		render: (text, record) => (
			<Button>{record.operator}</Button>),
	}
	, {
		title: '业务操作',
		key: 'action',
		align: 'center',
		render: (text, record) => (
			<div>
				<Button className="ant-dropdown-link" onClick={() => this.showModal()}>添加備註</Button>
				<Button className="ant-dropdown-link" onClick={() => this.showModal2()}>操作日誌</Button>
			</div>
		)
	}
	, {
		title: '其他',
		key: 'action',
		align: 'center',
		render: (text, record) => (
			<div>
				<span className="ant-divider" />
				<Button className="ant-dropdown-link" onClick={() => this.showModal()}>添加備註</Button>
				<Button className="ant-dropdown-link" onClick={() => this.showModal2()}>操作日誌</Button>


			</div>
		)
	}
	];
	}
    render() {
		const style1 = {
			padding: '8px',
		  };
        return(
			
            <div>
                <div>yyxLog log: CustomerUserInfo</div>
			<div />

                <div>
                    <Button>用戶總表</Button>
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
	goToUserInfo =() =>{
        console.log('xxx')
        this.props.history.push('/app/customer/CustomerUserInfo')

	}
	goToUserAccountInfo =() =>{
		
	}
	goToSimulator = () => {
		this.props.history.push('/app/customer/SimulatorUser')
	}
	goToIntend =() =>{
		this.props.history.push('/app/pass/IntendingUser')
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

export default CustomerUserInfo;
