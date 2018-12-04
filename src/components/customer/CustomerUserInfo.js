/* eslint-disable react/sort-comp */

import React, { Component } from 'react';
import { Col, Card, Row, DatePicker, Input, Modal, Button, Table, Icon, Checkbox } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import axios from 'axios';
class CustomerUserInfo extends Component {
  state = { visible: false, modal2Visible: false }


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

  componentDidMount() {


    console.log('xxx',this.props.match.params.id)
    this.requestListData()

  }
  render() {
    const style1 = {
      padding: '8px',
    };
    const {
      Meta
    } = Card;

    return (

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
          <Card
            
            cover={<img alt="" src={this.state.userList.length == 0?'':this.state.userList.base.cellphone} />}
          >
            < Meta title={this.state.userList.length == 0 ? '姓名：' : '姓名：' + this.state.userList.base.name} />
            < Meta title={this.state.userList.length == 0 ? '手机：' : '手机：' + this.state.userList.base.cellphone} />
            < Meta title={this.state.userList.length == 0 ? '邮箱：' : '邮箱：' + this.state.userList.base.email} />
              
 
          </Card>
    </Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="數據信息"
        >
          < Meta title={this.state.userList.length == 0 ? '注册时间：' : '注册时间：' + this.state.userList.base.regDate} />
          < Meta title={this.state.userList.length == 0 ? '上次访问时间：' : '上次访问时间：' + this.state.userList.base.lastLoginTime} />
          < Meta title={this.state.userList.length == 0 ? '上次访问IP：' : '上次访问IP：' + this.state.userList.base.lastLoginIP} />
          < Meta title={this.state.userList.length == 0 ? '地理位置：' : '地理位置：' + this.state.userList.base.location} />

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


  hasChangeAll = () => {

  }
  hasChange = (status) => {
    console.log('yyx', status.target.checked)
  }
  checkDiary = () => {

  }
  selectDate = (date, dateString) => {
    console.log(dateString, 'yyx', date);
  }
  timestampToTime = (timestamp) => {
    const dateObj = new Date(+timestamp) // ps, 必须是数字类型，不能是字符串, +运算符把字符串转化为数字，更兼容
    const year = dateObj.getFullYear() // 获取年，
    const month = dateObj.getMonth() + 1 // 获取月，必须要加1，因为月份是从0开始计算的
    const date = dateObj.getDate() // 获取日，记得区分getDay()方法是获取星期几的。
    const hours = this.pad(dateObj.getHours())  // 获取时, this.pad函数用来补0
    const minutes = this.pad(dateObj.getMinutes()) // 获取分
    const seconds = this.pad(dateObj.getSeconds()) // 获取秒
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
  };
  requestListData = () => {
    var self = this;//props.match.params.id
    window.Axios.post('ixuser/userOverView', {
      'belongUserId': self.props.match.params.id,
      

    }).then(function (response) {
      var bb = response.data.data;
      self.setState({ anyThing: 'wwwww' });
      self.setState({ anyThing: response.data.code });
      self.setState({ userList: response.data.data });
      console.log('ooooo',bb)

    }).catch(function (error) {
      console.log(error);
    });
  };
}

export default CustomerUserInfo;
