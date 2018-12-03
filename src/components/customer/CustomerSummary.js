import React, { Component } from 'react';
import { DatePicker, Input, Modal, Button, Table, Tabs, message, Card, Layout, Icon } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { ThemePicker } from '@/components/widget';
import classNames from "classnames";

const TabPane = Tabs.TabPane;

export default class CustomerSummary extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			// mTags: [],
			bklistA: [],
			bklistB: [],
			bklistC: [],
			currentA: 0,
			currentB: 0,
			currentC: 0,
			totalpageA: 0,
			totalpageB: 0,
			totalpageC: 0,
			nowKey: "1",
			pgsize: 40,
			loadingA: false,
			loadingB: false,
			loadingC: false,
			selectMail: "",


		};
	}

	componentDidMount() {
		this.columns = [
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
				render: (text, record) => (
					<span>{record.name}</span>),
			}, {
				title: '开户状态',
				dataIndex: '开户状态',
				key: '开户状态',
				render: (text, record) => (<span>{record.activeFlag}</span>),
			}, {
				title: '最近登录时间',
				dataIndex: '最近登录时间',
				key: '最近登录时间',
				render: (text, record) => (<span>{record.date}</span>),
			}, {
				title: '客诉次数',
				dataIndex: '客诉次数',
				key: '客诉次数',
				render: (text, record) => (<span>{record.operator}</span>),
			}, {
				title: '回访次数',
				dataIndex: '回访次数',
				key: '回访次数',
				render: (text, record) => (
					<span>{record.comment}</span>),
			}, {
				title: '备注信息',
				dataIndex: '备注信息',
				key: '备注信息',
				render: (text, record) => (
					<span>{record.comment}</span>),
			}, {
				title: '查看',
				dataIndex: '查看',
				key: '查看',
				render: (text, record) => (
					<span>{record.comment}</span>),
			}, {
				title: '操作人',
				dataIndex: '操作人',
				key: '操作人',
				render: (text, record) => (
					<span>{record.comment}</span>),
			}, {
				title: '操作人',
				dataIndex: '操作人',
				key: '操作人',
				render: (text, record) => (
					<span>{record.comment}</span>),
			}, {
				title: '业务操作',
				dataIndex: '业务操作',
				key: '业务操作',
				render: (text, record) => (
					<span>{record.comment}</span>),
			},{
				title: '其他',
				key: '其他',
				fixed: '其他',
				width: 100,
				fixed: 'right',
				render: (text, record) => (
					<div>
						<span className="ant-divider" />
						<Button className="ant-dropdown-link" onClick={() => this.handleremove(record)}>移除</Button>
					</div>
				),
			}];
		this.requestPageA()//1:合规 2:开户 3:交易
		this.requestPageB()
		this.requestPageC()
	}

	handleremove = (record) => {

		let self = this
		window.Axios.post('auth/removeBlackUser', {
			'id': record.id//1:合规 2:开户 3:交易
		}).then((response) => {

			message.success('操作成功')
			if (self.state.nowKey == 1) {
				this.requestPageA()//1:合规 2:开户 3:交易
			}
			if (self.state.nowKey == 2) {
				this.requestPageB()//1:合规 2:开户 3:交易
			}
			if (self.state.nowKey == 3) {
				this.requestPageC()//1:合规 2:开户 3:交易
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
	requestPageA = () => {
		let self = this
		self.setState({
			loadingA: true
		})
		window.Axios.post('ixuser/getUserList', {
			pageNo: this.state.current,
			'loginName': 'admin',
			'listType': 4,//1: 2: 3:,4:分頁查詢用戶總表
			'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVUaW1lIjoxNTQ1NTI4ODM0MTk5LCJsb2dpbk5hbWUiOiJhZG1pbiJ9.F7moE4DsMUiajkKB1S_wemwsozlUW5VMxQKsg4KsSUQ'
		}).then((response) => {
			self.setState({
				totalpageA: response.data.data.totalPage,
				bklistA: response.data.data.list,
				loadingA: false
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
	requestPageB = () => {
		let self = this

		self.setState({
			loadingB: true
		})
		window.Axios.post('auth/getBlackList', {
			pageNo: this.state.current,
			'listType': 4,//1: 2: 3:,4:分頁查詢用戶總表
			'pageSize': this.state.pgsize,
		}).then((response) => {
			self.setState({
				totalpageB: response.data.data.totalPage,
				bklistB: response.data.data.list,
				loadingB: false
			});


		}).catch(function (error) {
			console.log(error);
		});
	}
	requestPageC = () => {
		let self = this
		self.setState({
			loadingC: true
		})
		window.Axios.post('auth/getBlackList', {
			pageNo: this.state.current,
			'listType': 3,//1:合规 2:开户 3:交易
			'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易
		}).then((response) => {

			self.setState({
				totalpageC: response.data.data.totalPage,
				bklistC: response.data.data.list,
				loadingC: false
			});
		}).catch(function (error) {
			console.log(error);
		});
	}


	changePageA = (page) => {
		this.setState({
			currentA: page,
		}, () => {
			this.requestPageA()
		})
	}
	changePageB = (page) => {
		this.setState({
			currentb: page,
		}, () => {
			this.requestPageB()
		})
	}
	changePageC = (page) => {
		this.setState({
			currentC: page,
		}, () => {
			this.requestPageC()
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

	searchSelect = () => {
		let self = this
		console.log('hcia self.state.nowKey', self.state.nowKey)
		if (self.state.nowKey == 1) {
			this.requestPageA()//1:合规 2:开户 3:交易
		}
		if (self.state.nowKey == 2) {
			this.requestPageB()//1:合规 2:开户 3:交易
		}
		if (self.state.nowKey == 3) {
			this.requestPageC()//1:合规 2:开户 3:交易
		}
	}

	render() {

		const { loading, selectedRowKeys } = this.state;
		const hasSelected = selectedRowKeys.length > 0;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		const { switcherOn, background } = this.state;

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
							extra={<Button type="primary" onClick={() => this.handleremoveList()}
							>清除條件</Button>}
						>
							<Input onChange={this.onChangeMail} style={{ marginBottom: 5 }} placeholder="邮箱" />
							<Input onChange={this.onChangePhone} style={{ marginBottom: 5 }} placeholder="手机号" />
							<Input onChange={this.onChangeID} style={{ marginBottom: 5 }} placeholder="身份证号" />
							<Input onChange={this.onChangeAccount} style={{ marginBottom: 5 }} placeholder="账户" />
							<Input onChange={this.onChangeKeyWord} style={{ marginBottom: 5 }} placeholder="关键词" />
							<Button onClick={() => this.searchSelect()} style={{ marginTop: 10 }} type="primary"
								icon="search">Search</Button>

						</Card>


					</div>
				</div>
				<BreadcrumbCustom first="用戶管理" second="黑名單" />
				<Button
					type="primary"
					onClick={() => this.handleremoveList()}
					disabled={!hasSelected}
					loading={loading}
				>
					批量移除
                            </Button>
				<Table rowKey="id"
					bordered
					rowSelection={rowSelection}
					columns={this.columns}
					dataSource={this.state.bklistA}
					scroll={{ x: 1300 }}
					loading={this.state.loading}
					pagination={{  // 分页
						total: this.state.totalpageA * this.state.pgsize,
						pageSize: this.state.pgsize,
						onChange: this.changePageA,
					}}
				/>
				
			</div>

		)
	}


}

