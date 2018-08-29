/**
 * 菜单类别（新建、编辑）
 */
import React, { Component } from 'react';
import {Modal, Form, Input, Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class SysMenuModuleEditForms extends Component {
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
            <Modal destroyOnClose={true} maskClosable={false} visible={this.props.isPop} title={this.props.title} okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopClose}>
                <Form layout="horizontal">
                    <FormItem {...formItemLayout} label="类别">
                        {getFieldDecorator('typeCode', {
                            rules: [{ required: true, message: '请输入类别编号!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="类别名称">
                        {getFieldDecorator('userType', {
                            rules: [{ required: true, message: '选择用户类型!' }],
                        })(
                            <Select showSearch
                                style={{ width: 150 }}
                                placeholder="选择用户类型"
                                onChange={this.selectHandleChange} >
                                <Option value="tom">用户系统</Option>
                                <Option value="jack">运营管理</Option>
                                <Option value="lucy">系统管理</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="名称">
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: '请输入名称!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="key名称">
                        {getFieldDecorator('keyname', {
                            rules: [{ required: true, message: '请输入key名称!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="路径">
                        {getFieldDecorator('url', {
                            rules: [{ required: true, message: '请输入路径!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="图标">
                        {getFieldDecorator('icon', {
                            rules: [{ required: true, message: '请输入图标!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="排序">
                        {getFieldDecorator('sort', {
                            rules: [{ required: true, message: '请输入排序!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const SysMenuModuleEditForm = Form.create()(SysMenuModuleEditForms);
export default SysMenuModuleEditForm;