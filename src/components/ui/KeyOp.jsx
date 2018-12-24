/**
 * Created by hao.cheng on 2017/4/23.
 */
import React from 'react';

export default class KeyOp extends React.Component {


    constructor(props) {
        super(props);
        console.log('hcia props', props)
        this.state = {
            count: 0
        };
    }

    render() {
        return (
            <div>
                <p>You clicked {this.state.mCount} times</p>
                <p>mCount: {this.props.mCount} ms</p>
                <button onClick={() => this.setState({count: this.state.count + 1})}>
                    Click me
                </button>


                <button onClick={() => this.props.transferMsg(this.props.mCount+ 1)}>
                    Click me
                </button>
            </div>
        );
    }
}
