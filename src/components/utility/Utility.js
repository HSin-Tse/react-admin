import { DatePicker, Input, Modal, Button, Table, Tabs, message, Card, Tag, Layout, Icon } from 'antd';
export default class yyx {
    static checkResponseCode =(response) =>{
        if (response.data.code != 1) {
            message.error("error")
            console.log('yyx error', response)
            return false
        }
        return true
    }

}