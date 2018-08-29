/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import {Modal, Form, Button, Input, Select, Upload, Icon, Radio, message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;



class SensitiveLexiconEditForms extends Component {
    constructor(props){
        console.log(props)
        super(props)
        this.state = {
           loading:false,
           isCreate:true,
           writeInType:1,
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
    
    onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            writeInType: e.target.value,
            isCreate:e.target.value===1?true:false,
        });
        console.log(this.state)
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
        const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                  console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                  message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <Modal destroyOnClose={true} maskClosable={false} visible={this.props.isPop} title="编辑" okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopClose}>
                <Form layout="horizontal">
                     <FormItem {...formItemLayout} label="选择语言">
                        {getFieldDecorator('lg', {
                            rules: [{ required: true, message: '请选择语言!' }],
                        })(
                            <Select showSearch
                                style={{ width: 200 }}
                                placeholder="请选择语言"
                                onChange={this.selectHandleChange}
                            >
                                <Option value={0}>英语</Option>
                                <Option value={1}>马来语</Option>
                                <Option value={2}>泰语</Option>
                                <Option value={3}>越南语</Option>
                                <Option value={4}>印尼语</Option>
                          </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="录入方式">
                        {getFieldDecorator('writeInType', {
                            rules: [{ required: true, message: '请选择录入方式!' }],
                        })(
                            <RadioGroup onChange={this.onRadioChange} defaultValue={1}>
                                <Radio value={1}>创建</Radio>
                                <Radio value={2}>Excel导入</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} style={{display:this.state.isCreate?'none':''}} label="Excel导入">
                        {getFieldDecorator('excel', {
                            rules: [{ required: true, message: '请上传Excel导入!' }],
                        })(
                            <Upload {...props}>
                                <Button>选择文件</Button>
                            </Upload>
                        )}
                    </FormItem>
                   
                    <FormItem {...formItemLayout} style={{display:this.state.isCreate?'':'none'}} label="录入敏感词">
                        {getFieldDecorator('words', {
                            rules: [{ required: true, message: '请输入录入敏感词!' }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="严重级别">
                        {getFieldDecorator('state', {
                            rules: [{ required: true, message: '请选择严重级别!' }],
                        })(
                            <Select showSearch
                                style={{ width: 200 }}
                                placeholder="请选择严重级别"
                                onChange={this.selectHandleChange}
                            >
                                <Option value="tom">一级</Option>
                                <Option value="jack">二级</Option>
                          </Select>,
                          <div>二级用于过滤用户名</div>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const SensitiveLexiconEditForm = Form.create()(SensitiveLexiconEditForms);
export default SensitiveLexiconEditForm;