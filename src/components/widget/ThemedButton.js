/**
 * Created by 叶子 on 2017/7/31.
 */
import { Component } from 'react';
import { connect } from 'react-redux';
import {Button} from "antd";
import React from "react";
export const ThemedButton = (props) => {
    return <Button type={props.theme}>{props.children}</Button>;
};


