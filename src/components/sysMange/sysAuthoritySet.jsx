/**
 * 系统用户管理（新建、编辑）
 */
import React, { Component } from 'react';
import {Modal, Form, Input, Select, Upload, Icon, message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class SysAuthoritySetForms extends Component {
    constructor(props){
        console.log(props)
        super(props)
        this.state = {
           loading:false,
        }
    };
    
    selectHandleChange = (value) => {
      console.log(`selected ${value}`);
    }
    haaderBeforeUpload = (file) =>{
        const isLt2M = file.size / 1024 / 1024 < 4;
        if (!isLt2M) {
            message.error('图片必须小于4MB!');
        }
        return isLt2M;

    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };

    picHandleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }
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
        const uploadButton = (
            <div>
                <Icon type={this.props.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        const imageUrl = this.state.imageUrl;
        return (
            <Modal destroyOnClose={true} maskClosable={false} visible={this.props.isPop} title={this.props.title} okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopClose}>
                <Form layout="horizontal">
                    <FormItem {...formItemLayout} label="用户头像">
                        {getFieldDecorator('headerPic', {
                            rules: [{ required: true, message: '请上传头像!' }],
                        })(
                            <Upload
                                action="http://10.10.32.164:6021/"
                                name="headerPic"
                                listType="picture-card"
                                className="user-header-uploader"
                                showUploadList={false}
                                beforeUpload={this.haaderBeforeUpload}
                                onChange={this.picHandleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="用户名">
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="真是姓名">
                        {getFieldDecorator('realName', {
                            rules: [{ required: true, message: '请输入真是姓名!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="部门">
                        {getFieldDecorator('department', {
                            rules: [{ required: true, message: '请输入部门!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="用户类型">
                        {getFieldDecorator('userType', {
                            rules: [{ required: true, message: '选择用户类型!' }],
                        })(
                            <Select showSearch
                                style={{ width: 150 }}
                                placeholder="选择用户类型"
                                onChange={this.selectHandleChange} >
                                <Option value="tom">系统管理员</Option>
                                <Option value="jack">运营</Option>
                                <Option value="lucy">产品</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="手机号码">
                        {getFieldDecorator('birthday', {
                            
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="账户状态">
                        {getFieldDecorator('state', {
                            rules: [{ required: true, message: '请选择状态!' }],
                        })(
                            <Select showSearch
                                style={{ width: 200 }}
                                placeholder="选择状态"
                                onChange={this.selectHandleChange}
                            >
                                <Option value="tom">启用</Option>
                                <Option value="jack">禁用</Option>
                          </Select>,
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const SysAuthoritySetForm = Form.create()(SysAuthoritySetForms);
export default SysAuthoritySetForm;