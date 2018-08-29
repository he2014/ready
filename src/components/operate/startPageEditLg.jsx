/**
 * 启动页图片按语言编辑
 */
import React, { Component } from 'react';
import {Modal, Form, Input,Select,Button,Table,Upload,message,Icon} from 'antd';
import LanguageSelect from '../tools/languageSelect';
import UploadFile from '../tools/uploadFile';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


class StartPageEditLgForms extends Component {
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
                <UploadFile getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout}/>
                
                <FormItem className="lgAddBtn">
                    <Button type="primary"  htmlType="submit" >添加</Button>
                </FormItem>
            </Form>
           
        );
    }
}

const StartPageEditLgForm = Form.create()(StartPageEditLgForms);
export default StartPageEditLgForm;

