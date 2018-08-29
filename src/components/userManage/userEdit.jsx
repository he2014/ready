/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import {Modal, Form, Input, DatePicker, Select, Upload, Icon, message} from 'antd';
import {getTimes} from '../../utils/index';
import UploadFile from '../tools/uploadFile';

const FormItem = Form.Item;
const Option = Select.Option;

class UserEditForms extends Component {
    constructor(props){
        console.log(props)
        super(props)
        this.state = {
           loading:false,
        }
    };
    
    selectHandleChange = (value) => {
      console.log(`selected ${value}`);
    };

   

    render() {
        const { getFieldDecorator } = this.props.form;
        
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
       
        return (
            <Modal destroyOnClose={true} maskClosable={false} visible={this.props.isPop} title="编辑" okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopOk}>
                <Form layout="horizontal">
                    <UploadFile title="用户头像" imgUrl={this.props.infoData.headPic} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout}/>
                
                    <FormItem {...formItemLayout} label="用户昵称">
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: '请输入用户昵称!' }],
                            initialValue:this.props.infoData.nnList
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="用户生日">
                        {getFieldDecorator('birthday', {
                            rules: [{ required: true, message: '请输入用户生日!' }],
                            initialValue:moment(getTimes(this.props.infoData.birthday,false,1),'YYYY-MM-DD')
                        })(
                            <DatePicker locale={locale} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="账户状态">
                        {getFieldDecorator('state', {
                            rules: [{ required: true, message: '请选择状态!' }],
                            initialValue:this.props.infoData.state
                        })(
                            <Select showSearch
                                style={{ width: 200 }}
                                placeholder="选择状态"
                                onChange={this.selectHandleChange}
                            >
                                <Option value={0}>正常</Option>
                                <Option value={1}>封禁设备</Option>
                                <Option value={2}>封禁账号</Option>
                          </Select>,
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const UserEditForm = Form.create()(UserEditForms);
export default UserEditForm;