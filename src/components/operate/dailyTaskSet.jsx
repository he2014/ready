/**
 * 日常任务管理设置
 */
import React, { Component } from 'react';
import {Modal, Form, Input,DatePicker,Select, message} from 'antd';
import moment from 'moment';
import {getTimes} from '../../utils/index';
const FormItem = Form.Item;
const Option = Select.Option;

class DailyTaskSetForms extends Component {
    constructor(props){
        console.log(props)
        super(props)
        this.state = {
            loading:false,
            radioValue:2,
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

    onDateChange = (value, dateString) => {
        console.log('radio checked',value);
        console.log('radio checked',dateString);
    }
    onDateOk = (e) => {
        console.log('radio checked', e);
    }
    disabledStartDate = (current) => {
        return current && current < moment().endOf('day');
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
        return (
            <Modal destroyOnClose={true} maskClosable={false} visible={this.props.isPop} title="配置每日签到" okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopOk}>
                <Form layout="horizontal">
                    <FormItem {...formItemLayout} label="选择起始时间">
                        {getFieldDecorator('startTime', {
                            rules: [{ required: true, message: '请选择起始时间!' }],
                        })(
                            <Select showSearch
                                style={{ width: 200 }}
                                placeholder="请选择"
                                onChange={this.selectHandleChange}
                            >
                                <Option value={0}>星期一</Option>
                                <Option value={1}>星期二</Option>
                                <Option value={2}>星期三</Option>
                                <Option value={3}>星期四</Option>
                                <Option value={4}>星期五</Option>
                                <Option value={5}>星期六</Option>
                                <Option value={6}>星期日</Option>
                          </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="选择币种">
                        {getFieldDecorator('moneyType', {
                            rules: [{ required: true, message: '请选择币种!' }],
                        })(
                            <Select showSearch
                                style={{ width: 200 }}
                                placeholder="请选择"
                                onChange={this.selectHandleChange}
                            >
                                <Option value={0}>金币</Option>
                                <Option value={1}>钻石</Option>
                          </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="第1天奖励金币数">
                        {getFieldDecorator('rewardNum1', {
                            rules: [{ required: true, message: '请输入第1天奖励金币数!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="第2天奖励金币数">
                        {getFieldDecorator('rewardNum2', {
                            rules: [{ required: true, message: '请输入第2天奖励金币数!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="第3天奖励金币数">
                        {getFieldDecorator('rewardNum3', {
                            rules: [{ required: true, message: '请输入第3天奖励金币数!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="第4天奖励金币数">
                        {getFieldDecorator('rewardNum4', {
                            rules: [{ required: true, message: '请输入第4天奖励金币数!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="第5天奖励金币数">
                        {getFieldDecorator('rewardNum5', {
                            rules: [{ required: true, message: '请输入第5天奖励金币数!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="第6天奖励金币数">
                        {getFieldDecorator('rewardNum6', {
                            rules: [{ required: true, message: '请输入第6天奖励金币数!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="第7天奖励金币数">
                        {getFieldDecorator('rewardNum7', {
                            rules: [{ required: true, message: '请输入第7天奖励金币数!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="生效时间">
                        {getFieldDecorator('effectTime', {
                            rules: [{ required: true, message: '请选择生效时间!' }],
                        })(
                            <DatePicker disabledDate={this.disabledStartDate} onChange={this.onDateChange} placeholder="生效时间" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const DailyTaskSetForm = Form.create()(DailyTaskSetForms);
export default DailyTaskSetForm;