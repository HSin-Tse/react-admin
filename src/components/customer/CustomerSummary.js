import React, { Component } from 'react';
import { DatePicker, Input, Modal, Button, Table, Tabs, message, Card, Layout, Icon } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { ThemePicker } from '@/components/widget';
import classNames from "classnames";


export default class CustomerSummary extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			// mTags: [],
			bklistA: [],
			operationDiaryHistory: [],
			currentA: 0,
			totalpageA: 0,
			nowKey: "1",
			pgsize: 40,
			visible:false,
			modal2Visible:false,
			


		};
	}

	componentDidMount() {
		this.ediftModalColumn()
		this.editTableColumn()
		this.requestData()
		this.requestUserCommentList()
		
	}

	handleremove = (record) => {

		let self = this
		window.Axios.post('auth/removeBlackUser', {
			'id': record.id
		}).then((response) => {

			message.success('操作成功')
			if (self.state.nowKey == 1) {
				this.requestData()
			}

		}).catch(function (error) {
			console.log(error);
		});

	};

	handleremoveList = () => {
		console.log('hcia selectedRowKeys', this.state.selectedRowKeys)
		// window.Axios.post('auth/removeBlackUser', {
		//     'id': record.id//1:合规 2:开户 3:交易
		// }).then((response) => {
		//     message.success('操作成功')
		// }).catch(function (error) {
		//     console.log(error);
		// });

	};
	showModal2 = () => {
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
	requestData = () => {
		let self = this
	
		window.Axios.post('ixuser/getUserList', {
			pageNo: this.state.current,
			'loginName': 'admin',
			'listType': 4,//1: 2: 3:,4:分頁查詢用戶總表
			'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNTQ1NTI4ODM0MTk5LCJsb2dpbk5hbWUiOiJhZG1pbiJ9.F7moE4DsMUiajkKB1S_wemwsozlUW5VMxQKsg4KsSUQ'
		}).then((response) => {
			self.setState({
				totalpageA: response.data.data.totalPage,
				bklistA: response.data.data.list,
				
			}, () => {
				console.log('hcia self.state.bklistA', self.state.bklistA)
				// var tags = Object.keys(self.state.bklistA[0])
				// console.log('hcia tags', tags)
				// self.setState({
				//     mTags: tags
				// })

			});

		}).catch(function (error) {
			console.log(error);
		});
	}
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

			window.Axios.post(url, {
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


	changePageA = (page) => {
		this.setState({
			currentA: page,
		}, () => {
			this.requestData()
		})
	}

	callback = (key) => {

		this.setState({
			nowKey: key,
		})

	}

	onSelectChange = (selectedRowKeys) => {
		console.log('hcia', 'selectedRowKeys changed: ', selectedRowKeys);
		this.setState({ selectedRowKeys });
	}

	state = {
		switcherOn: true,
		background: localStorage.getItem('@primary-color') || '#313653',
	}
	_switcherOn = () => {
		this.setState({
			switcherOn: !this.state.switcherOn
		})
	};
	_handleChangeComplete = color => {
		console.log(color);
		this.setState({ background: color.hex });
		localStorage.setItem('@primary-color', color.hex);
		window.less.modifyVars({
			'@primary-color': color.hex,
		})
	};

	onChangeMail = (e) => {
		// this.state.selectMail = e.target.value

		this.setState({
			selectMail: e.target.value,
		});
	}

	onChangePhone = (e) => {
		// this.state.selectMail = e.target.value

		this.setState({
			selectMail: e.target.value,
		});
	}
	editTableColumn =() =>{this.columns = [
			{
				title: '手机号',
				dataIndex: '手机号',
				key: '手机号',
				width: 150,
				fixed: 'left',
				render: (text, record) => (

					<span>{record.mobile}</span>

				),
			}, {
				title: '姓名',
				dataIndex: '姓名',
				key: '姓名',
				align: 'center',
				width: 100,
				render: (text, record) => (
					<span>{record.name}</span>),
			}, {
				title: '开户状态',
				dataIndex: '开户状态',
				key: '开户状态',
				width: 100,

				render: (text, record) => (<span>已开户</span>),
			},
			{
				title: '账户类型',
				dataIndex: '账户类型',
				key: '账户类型',
				width: 100,

				render: (text, record) => (<span>{record.accountType}</span>),
			}, {
				title: '交易账号',
				dataIndex: '交易账号',
				key: '交易账号',
				width: 300,
				render: (text, record) => (
					<span>{record.accountNo}</span>),
			}, {
				title: '最近登录时间',
				dataIndex: '最近登录时间',
				key: '最近登录时间',
				width: 300,
				render: (text, record) => (<span>{record.date}</span>),
			}, {
				title: '客诉次数',
				dataIndex: '客诉次数',
				key: '客诉次数',
				width: 100,
				render: (text, record) => (<span>{record.complaintNum}</span>),
			}, {
				title: '回访次数',
				dataIndex: '回访次数',
				key: '回访次数',
				width: 100,
				render: (text, record) => (
					<span>{record.commentNum}</span>),
			}, {
				title: '备注信息',
				dataIndex: '备注信息',
				key: '备注信息',
				width: 100,
				render: (text, record) => (
					<span>{record.comment}</span>),
			}, {
				title: '查看',
				dataIndex: '查看',
				key: '查看',
				width: 300,
				align: 'center',
				render: (text, record) => (
					<div>
						<Button className="ant-dropdown-link" onClick={() => this.goToUserAccountInfo()}>開戶信息</Button>
						<Button className="ant-dropdown-link" onClick={() => this.goToUserInfo()}>行為信息</Button>
					</div>
					)
			}, {
				title: '操作人',
				dataIndex: '操作人',
				key: '操作人',
				width: 100,
				render: (text, record) => (
					<span>{record.operator}</span>),
			}, {
				title: '业务操作',
				dataIndex: '业务操作',
				key: '业务操作',
				width: 300,
				render: (text, record) => (
					<div>
						<Button className="ant-dropdown-link">凍結</Button>
						<Button className="ant-dropdown-link">手機號解綁</Button>
					</div>
					),
			},{
				title: '其他',
				key: '其他',
				fixed: '其他',
				width: 300,
				align:'center',
				render: (text, record) => (
					<div>
						{/* <span className="ant-divider" />
						<Button className="ant-dropdown-link" onClick={() => this.handleremove(record)}>移除</Button> */}
						<Button className="ant-dropdown-link" onClick={() => this.showModal()}>添加備註</Button>
						<Button className="ant-dropdown-link" onClick={() => this.showModal2()}>操作日誌</Button>

					</div>
				),
			}];}
	ediftModalColumn =() =>{
		this.modalColumns = [{
			title: '時間',
			dataIndex: 'createDate',
			key: 'operationDiary_Date',

			render: (text, record) => (
				<Button>{record.createDate}</Button>),
		}, {
			title: '狀態',
			dataIndex: 'comment',
			key: 'operationDiary_Status',

			render: (text, record) => (
				<Button>{record.comment}</Button>),
		}, {
			title: '操作人',
			dataIndex: 'bkUserName',
			key: 'operationDiary_User',

			render: (text, record) => (
				<Button>{record.bkUserName}</Button>),
		}]
	}
	searchSelect = () => {
		let self = this
		console.log('hcia self.state.nowKey', self.state.nowKey)
		if (self.state.nowKey == 1) {
			this.requestData()
		}
	}
	goToUserInfo = () => {
		this.props.history.push('/app/customer/CustomerUserInfo')

	}
	goToUserAccountInfo = () => {
		console.log('goToUserAccountInfo')
	}

	render() {

		const { loading, selectedRowKeys } = this.state;
		const hasSelected = selectedRowKeys.length > 0;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		const { switcherOn, background } = this.state;

		const hideStyle = {
			visibility: "hidden"
		};
		return (


			<div>
				{/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
				<div>nowKey :{this.state.nowKey}</div>
				<div>selectMail :{this.state.selectMail}</div>
				<div>log::CustomerSummary</div>
				{/*<ThemePicker />*/}
				<div className={classNames('switcher dark-white', { active: switcherOn })}>
					<span className="sw-btn dark-white" onClick={this._switcherOn}>
						<Icon type="setting" className="text-dark" />
					</span>
					<div>

						<Card title="當前表搜索"
							extra={<Button type="primary" onClick={() => this.handleremoveList()}>清除條件</Button>}
						>
							<Input onChange={this.onChangeMail} style={{ marginBottom: 5 }} placeholder="邮箱" />
							<Input onChange={this.onChangePhone} style={{ marginBottom: 5 }} placeholder="手机号" />
							<Input onChange={this.onChangeID} style={{ marginBottom: 5 }} placeholder="身份证号" />
							<Input onChange={this.onChangeAccount} style={{ marginBottom: 5 }} placeholder="账户" />
							<Input onChange={this.onChangeKeyWord} style={{ marginBottom: 5 }} placeholder="关键词" />
							<Button onClick={() => this.searchSelect()} style={{ marginTop: 10 }} type="primary"
								icon="search"
							>Search</Button>

						</Card>


					</div>
				</div>
				<BreadcrumbCustom first="用戶管理" second="用戶總表" />
				<Button
					type="primary"
					onClick={() => this.handleremoveList()}
					disabled={!hasSelected}
					loading={loading}
					style = {hideStyle}
				>
					批量移除
                            </Button>
				<Table rowKey="id"
					bordered
					rowSelection={rowSelection}
					columns={this.columns}
					dataSource={this.state.bklistA}
					scroll={{ x: 2500 }}
					loading={this.state.loading}
					pagination={{ // 分页
						total: this.state.totalpageA * this.state.pgsize,
						pageSize: this.state.pgsize,
						onChange: this.changePageA,
					}}
				/>
				<Modal
					title="添加備註"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					okText="確認"
					cancelText="取消"
				>
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
							scroll={{ x: 1300 }}
						/>
					</p>
				</Modal>
			</div>

		)
	}


}

