/**
 * 提现_联系
 */
import React, { Component } from 'react';
import {Modal, Form, Input,Select,Radio,Button,Table} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class WithdrawContactForms extends Component {
    constructor(props){
        console.log(props)
        super(props)
        this.state = {

        }
        
        
    };
    

    render() {
        const { getFieldDecorator } = this.props.form;
        const state = this.state;
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
            <Modal width="760px" destroyOnClose={true} maskClosable={false} visible={this.props.isPop} title={this.props.type==1?'联系设置':'打款确认'} okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopOk}>
                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="状态">
                        {getFieldDecorator('state', {
                            rules: [{ required: true, message: '请选择状态!' }],
                        })(
                            <RadioGroup onChange={this.onRadioChange}>
                                <Radio value={2} style={{display:(this.props.type==1?'':'none')}}>联系通过</Radio>
                                <Radio value={1} style={{display:(this.props.type==1?'':'none')}}>联系不通过</Radio>
                                <Radio value={4} style={{display:(this.props.type==2?'':'none')}}>打款成功</Radio>
                                <Radio value={3} style={{display:(this.props.type==2?'':'none')}}>打款失败</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={this.props.type==1?'联系明细':'打款说明'}>
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: '请输入说明!' }],
                        })(
                            <TextArea />
                        )}
                    </FormItem>
                </Form>
                                
            </Modal>
        );
    }
}

const WithdrawContactForm = Form.create()(WithdrawContactForms);
export default WithdrawContactForm;

