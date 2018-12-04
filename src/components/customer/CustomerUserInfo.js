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
            
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            < Meta title = "姓名：张睿" />
            < Meta title = "手机：15921455446" />
            < Meta title = "邮箱：42342342@qq.com" />
              
 
          </Card>
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
