import { message} from 'antd';
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