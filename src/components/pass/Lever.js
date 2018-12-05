/**
 * Created by tse on 2017/7/31.
 */
import React, {Component} from 'react';
import {Row, Col, Button} from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import AuthWidget from '@/components/widget/AuthWidget';
import beauty from '@/style/imgs/beauty.jpg';
import {bindActionCreators} from "redux";
import {receiveData} from "../../action";
import {addTodo} from "../../action";
import connect from "react-redux/es/connect/connect";

class Basic extends Component {
    constructor(props) {
        super(props);
        this.state = {

            count: 0,
            user: '',


        };
    }

    seeDetail = () => {
        const { addTodo } = this.props;
        console.log('hcia seeDetail')
        addTodo('a')

    }

    render() {
        return (
            <div>
                {JSON.stringify(this.props.todps)}
                <BreadcrumbCustom first="权限管理" second="基础演示"/>
                <Button onClick={() => this.seeDetail()}
                >详情:{this.state.count}</Button>
                <Button
                    onClick={() => this.seeDetail()}
                >详情: </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const todps= state.todos;
    return { todps};
};
const mapDispatchToProps = dispatch => ({
    addTodo: bindActionCreators(addTodo, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Basic);