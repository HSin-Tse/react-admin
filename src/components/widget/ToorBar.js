/**
 * Created by 叶子 on 2017/7/31.
 */
import {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button, Input, message, Divider} from 'antd';
import {ThemedButton} from "./ThemedButton";
import React from "react";


// 中间组件
export const Toolbar = (props) => {
    return (
        <div>
            <ThemedButton > 333</ThemedButton>
            {/*<ThemedButton>333 sss</ThemedButton>*/}
        </div>
    );
}