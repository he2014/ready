/**
 * 日常任务管理编辑
 */
import React, { Component } from 'react';
import { Form, Input,Select,Button} from 'antd';
import LanguageSelect from '../tools/languageSelect';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class DailyTasksEditLgForms extends Component {
    constructor(props){
        console.log(props)
        super(props)
        this.state = {
            selectVal:0,
        }
    };
    delLg= (e) => {
        console.log(e)
    };
    selectChange = (value) => {
        console.log(`selected ${value}`);
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
            <Form layout="horizontal" onSubmit={this.props.onSub}>
                <LanguageSelect onMeg={this.selectChange} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout}/>
                
                <FormItem {...formItemLayout} label="更新弹窗标题">
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入更新弹窗标题!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="任务内容">
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: '请输入国家名(英文)!' }],
                    })(
                        <TextArea rows={4} />
                    )}
                </FormItem>
                <FormItem className="lgAddBtn">
                    <Button type="primary"  htmlType="submit" >添加</Button>
                </FormItem>
            </Form>
           
        );
    }
}

const DailyTasksEditLgForm = Form.create()(DailyTasksEditLgForms);
export default DailyTasksEditLgForm;

