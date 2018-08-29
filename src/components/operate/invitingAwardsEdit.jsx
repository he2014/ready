/**
 * 邀请奖励管理编辑
 */
import React, { Component } from 'react';
import {Modal, Form, Input} from 'antd';
const FormItem = Form.Item;

class InvitingAwardsEditForms extends Component {
    constructor(props){
        console.log(props)
        super(props)
        this.state = {
            loading:false,
            radioValue:2,
        }
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
            <Modal destroyOnClose={true} maskClosable={false} visible={this.props.isPop} title={this.props.title} okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopOk}>
                <Form layout="horizontal">
                    <FormItem {...formItemLayout} label="邀请人数">
                        {getFieldDecorator('invitNum', {
                            rules: [{ required: true, message: '请输入邀请人数!' }],
                            initialValue:this.props.editData.invitNum
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="对应奖励钻石数">
                        {getFieldDecorator('zuanNum', {
                            rules: [{ required: true, message: '请输入对应奖励钻石数!' }],
                            initialValue:this.props.editData.zuanNum
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const InvitingAwardsEditForm = Form.create()(InvitingAwardsEditForms);
export default InvitingAwardsEditForm;