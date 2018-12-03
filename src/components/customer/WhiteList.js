import React, {Component} from 'react';
import {DatePicker, Input, Modal, Button, Table, message, Card, Layout, Icon, Select, Col, Row} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import {ThemePicker} from '@/components/widget';
import classNames from "classnames";

const {RangePicker} = DatePicker;
const {TextArea} = Input;

export default class WhiteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            // mTags: [],
            bklistA: [],
            currentA: 0,
            totalpageA: 0,
            pgsize: 40,
            loadingA: false,
            showModaladdWhite: false,
            selectMail: "",
            selectPhone: "",
            selectID: "",
            selectTimeStart: "",
            selectTimeEnd: "",
            NameCn: "",
            phoneCn: "",
            changeNoteV: "",


        };
    }

    componentDidMount() {
        this.columns = [
            {
                title: '手机号',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
                width: 150,
                fixed: 'left',
                render: (text, record) => (

                    <span>{record.mobile}</span>

                ),
            }, {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (
                    <span>{record.name}</span>),
            }, {
                title: '活跃度',
                dataIndex: '活跃度',
                key: '活跃度',
                render: (text, record) => (<span>{record.activeFlag}</span>),
            }, {
                title: 'APP注册时间',
                dataIndex: 'APP注册时间',
                key: 'APP注册时间',
                render: (text, record) => (<span>{record.date}</span>),
            }, {
                title: '操作人',
                dataIndex: '操作人',
                key: '操作人',
                render: (text, record) => (<span>{record.operator}</span>),
            }, {
                title: '处理备注',
                dataIndex: '处理备注',
                key: '处理备注',
                render: (text, record) => (
                    <span>{record.comment}</span>),
            }, {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 100,
                render: (text, record) => (
                    <div>
                        <span className="ant-divider"/>
                        <Button className="ant-dropdown-link" onClick={() => this.handleremove(record)}>移除</Button>
                    </div>
                ),
            }];
        this.requestPageA()//1:合规 2:开户 3:交易
    }

    handleremove = (record) => {

        let self = this
        window.Axios.post('auth/removeWhiteUser', {
            'id': record.id//
        }).then((response) => {

            message.success('操作成功')
            this.requestPageA()//1:合规 2:开户 3:交易


        }).catch(function (error) {
            console.log(error);
        });

    };

    handleremoveSelect = () => {


        let self = this
        this.setState({
            selectMail: '',
            selectID: '',
            startTime: '',
            selectPhone: '',
            selectTimeStart: '',
            selectTimeEnd: ''
        }, () => {
            self.searchSelect()
        })


    };
    // addWhite = () => {
    //
    //
    //     let self = this
    //     window.Axios.post('auth/addWhiteUser', {
    //         name: this.state.NameCn,
    //         mobile: this.state.phoneCn,
    //         content: this.state.changeNoteV,
    //     }).then((response) => {
    //         console.log('hcia response', response)
    //         self.searchSelect()
    //
    //
    //     }).catch(function (error) {
    //         console.log(error);
    //     });
    //
    //
    // };


    requestPageA = () => {
        let self = this
        self.setState({
            loadingA: true
        })
        window.Axios.post('auth/getWhiteList', {
            pageNo: this.state.current,
            'listType': 1,//1:合规 2:开户 3:交易
            'email': this.state.selectMail,
            'nationalId': this.state.selectID,
            'startTime': this.state.selectTimeStart,
            'endTime': this.state.selectTimeEnd,
            'mobile': this.state.selectPhone,
            'pageSize': this.state.pgsize,//1:合规 2:开户 3:交易
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


    changePageA = (page) => {
        this.setState({
            currentA: page,
        }, () => {
            this.requestPageA()
        })
    }

    onChangelastNameCn = (e) => {
        this.state.NameCn = e.target.value
    }
    onChangePhone = (e) => {
        this.state.phoneCn = e.target.value
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('hcia', 'selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
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
        this.setState({background: color.hex});
        localStorage.setItem('@primary-color', color.hex);
        window.less.modifyVars({
            '@primary-color': color.hex,
        })
    };

    onChangeMail = (e) => {
        this.setState({
            selectMail: e.target.value,
        });
    }

    onChangeID = (e) => {
        this.setState({
            selectID: e.target.value,
        });
    }
    searchSelect = () => {
        this.requestPageA()//1:合规 2:开户 3:交易

    }

    onChangeDate = (value, dateString) => {
    }
    changeNote = (e) => {
        console.log('hcia e' , e)


        this.setState({
            changeNoteV: e.target.value,

        });
    }
    onOk = (value) => {
        console.log('hcia', 'onOk: ', value);


        var selectTimeStart = value[0].unix() + '000'
        //1545275083
        //26582400000
        //27187200000
        var selectTimeEnd = value[1].unix() + '000'

        console.log('hcia selectTimeStart', selectTimeStart)
        console.log('hcia selectTimeEnd', selectTimeEnd)


        this.setState({
            selectTimeStart: selectTimeStart,
            selectTimeEnd: selectTimeEnd,

        });
    }


    showModal = () => {
        this.setState({
            showModaladdWhite: true,
        });
    }

    handleOk = (e) => {
        // this.addWhite()
        let self = this
        window.Axios.post('auth/addWhiteUser', {
            name: this.state.NameCn,
            mobile: this.state.phoneCn,
            content: this.state.changeNoteV,
        }).then((response) => {
            console.log('hcia response', response)
            self.searchSelect()


        }).catch(function (error) {
            console.log(error);
        });
        // this.setState({
        //     showModaladdWhite: false,
        // });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            showModaladdWhite: false,
        });
    }

    render() {

        const {loading, selectedRowKeys} = this.state;
        const hasSelected = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const {switcherOn, background} = this.state;

        return (


            <div>
                <Modal
                    title="新增白名单成员"
                    visible={this.state.showModaladdWhite}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >

                    <Card bordered={true}>


                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{width: 120}}>*用户姓名：</span>
                            <Input defaultValue={this.state.NameCn}
                                   onChange={this.onChangelastNameCn}
                                   style={{width: 120}} placeholder="Basic usage" tagkey="lastNameCn"
                                   sdsd={'dd'}/>
                        </div>

                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{minWidth: 120}}>*手机号码：</span>
                            <Input defaultValue={this.state.phoneCn}
                                   onChange={this.onChangePhone}
                                   style={{width: 120}} placeholder="Basic usage"/>
                        </div>


                        <div style={{display: 'flex', minHeight: 40}}>
                            <span style={{minWidth: 100}}>操作备注</span>

                            <div style={{display: 'flex', minHeight: 40}}>
                                <TextArea value={this.state.changeNoteV} rows={4} onChange={this.changeNote}/>
                            </div>
                        </div>

                    </Card>
                </Modal>
                {/*<div>waitUpdate :{JSON.stringify(this.state)}</div>*/}
                <div>nowKey :{this.state.nowKey}</div>
                <div>selectMail :{this.state.selectMail}</div>
                <div>selectPhone :{this.state.selectPhone}</div>
                <div>changeNoteV :{this.state.changeNoteV}</div>
                {/*<ThemePicker />*/}
                <div className={classNames('switcher dark-white', {active: switcherOn})}>
                <span className="sw-btn dark-white" onClick={this._switcherOn}>
                    <Icon type="setting" className="text-dark"/>
                </span>
                    <div>

                        <Card title="當前表搜索"
                              extra={<Button type="primary" onClick={() => this.handleremoveSelect()}
                              >清除條件</Button>}
                        >
                            <Input onChange={this.onChangeMail} style={{marginBottom: 5}} placeholder="邮箱"/>
                            <Input value={this.state.selectPhone} onChange={this.onChangePhone}
                                   style={{marginBottom: 5}} placeholder="手机号"/>
                            <Input onChange={this.onChangeID} style={{marginBottom: 5}} placeholder="身份证号"/>
                            <Input onChange={this.onChangeAccount} style={{marginBottom: 5}} placeholder="账户"/>
                            <Input onChange={this.onChangeKeyWord} style={{marginBottom: 5}} placeholder="关键词"/>
                            <RangePicker
                                showTime={{format: 'YYYY-MM-DD HH:mm:ss'}}
                                format="YYYY-MM-DD HH:mm:ss fff"
                                placeholder={['Start Time', 'End Time']}
                                onChange={this.onChangeDate}
                                onOk={this.onOk}
                            />

                            <Button onClick={() => this.searchSelect()} style={{marginTop: 10}} type="primary"
                                    icon="search">Search</Button>

                        </Card>


                    </div>
                </div>
                <BreadcrumbCustom first="用戶管理" second="白名單"/>

                <Card
                    title={<div>白名单表</div>}
                    extra={<Button onClick={() => this.showModal()}>新增白名单用户</Button>}
                >
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
                           scroll={{x: 1300}}
                           loading={this.state.loading}
                           pagination={{  // 分页
                               total: this.state.totalpageA * this.state.pgsize,
                               pageSize: this.state.pgsize,
                               onChange: this.changePageA,
                           }}
                    />
                </Card>


            </div>

        )
    }


}

