import React from 'react';
import { Form, Icon, Input, Button,message} from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData } from '@/action';
import { STATUS_CODE, TIPS_INFO, getToken, setToken, deleteToken, getUserInfoFromStorage, setUserInfoFromStorage, deleteUserInfoStorage} from '../../axios/system';
import {requestLogin} from '../../action/login';


const FormItem = Form.Item;

class Login extends React.Component {
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { fetchData } = this.props;
                let params = {
                    loginName:values.userName,
                    password:values.password
                };

                requestLogin(params).then((response) => {
                    if(response.code == 0){
                        const data = response.dataInfo;
                        setToken(data.token);
                        setUserInfoFromStorage(JSON.stringify(data));
                        document.location.href='#/'
                    }else{
                        let mes = '';
                        switch(response.code){
                            case STATUS_CODE.ACCOUT_BEN_BANNED: //账号被禁用
                                mes = TIPS_INFO.ACCOUT_BEN_BANNED;
                                break;
                            case STATUS_CODE.SERVER_ERROR: // 服务器错误
                                mes = TIPS_INFO.SERVER_ERROR;
                                break;
                            default:
                                mes = TIPS_INFO.WRONG_ACCOUNT_OR_PASSWORD;  //用户名或者密码错误
                                break;   
                        }
                        message.error(mes,2);
                        
                    }
                    // resolve(response);
                }).catch(error =>{
                    // reject(error);
                });

            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>Ready 后台管理系统</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>

        );
    }
}

const mapStateToPorps = state => {
    const { auth } = state.httpData;
    return { auth };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));