/**
 * 启动页图片按语言编辑
 */
import React, { Component } from 'react';
import {Modal, Form, Input,Select,Button,Table,Upload,message,Icon} from 'antd';
import LanguageSelect from '../tools/languageSelect';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


class GameEditLgForms extends Component {
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
                <FormItem {...formItemLayout} label="游戏名">
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入游戏名!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} style={{display:this.props.isPay?'none':''}}  label="游戏简介">
                    {getFieldDecorator('content', {
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

const GameEditLgForm = Form.create()(GameEditLgForms);
export default GameEditLgForm;

