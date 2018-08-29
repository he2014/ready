/**
 * 启动页图片按语言编辑
 */
import React, { Component } from 'react';
import {Modal, Form, Input,Select,Button,Table,Upload,message,Icon} from 'antd';
import LanguageSelect from '../tools/languageSelect';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


class MessageEditLgForms extends Component {
    constructor(props){
        console.log(props)
        super(props)
        this.state = {
            selectVal:0,
            imageUrl:'',
            fileList : [],
        }
    };
    delLg= (e) => {
        console.log(e)
    };
    selectChange = (value) => {
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
            <Form layout="horizontal" onSubmit={this.props.onSub}>
                <LanguageSelect onMeg={this.selectChange} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout}/>
                <FormItem {...formItemLayout} label="活动标题"  style={{display:this.props.type==1?'':'none'}}>
                    {getFieldDecorator('title', {
                        rules: [],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} style={{display:this.props.type==1?'':'none'}} label="活动简介">
                    {getFieldDecorator('infos', {
                        rules: [],
                    })(
                        <TextArea rows={4} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} style={{display:(this.props.type==2 || this.props.type==3)?'':'none'}} label="活动内容">
                    {getFieldDecorator('content', {
                        rules: [],
                    })(
                        <TextArea rows={4} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} style={{display:this.props.type==2?'':'none'}} label="文字链接内容">
                    {getFieldDecorator('urlContent', {
                        rules: [],
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

const MessageEditLgForm = Form.create()(MessageEditLgForms);
export default MessageEditLgForm;

