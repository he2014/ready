/**
 * 国家赛区编辑
 */
import React, { Component } from 'react';
import {Modal, Form, Input, Upload, Icon, message, Radio} from 'antd';
import UploadFile from '../tools/uploadFile';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class NationalEditForms extends Component {
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
    saveFormRef = (form) => {
        this.form = form;
    };

    onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          radioValue: e.target.value,
        });
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
            <Modal destroyOnClose={true} maskClosable={false} visible={this.props.isPop}  title={this.props.title} okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopOk}>
                <Form layout="horizontal">
                    <UploadFile title="国旗上传" getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout}/>
                
                    <FormItem {...formItemLayout} label="国家名(中文)">
                        {getFieldDecorator('znName', {
                            rules: [{ required: true, message: '请输入国家名(中文)!' }],
                            initialValue:this.props.editData.zhNameList
                        })(
                            <Input />
                        )}
                    </FormItem>
                     <FormItem {...formItemLayout} label="国家名(英文)">
                        {getFieldDecorator('enName', {
                            rules: [{ required: true, message: '请输入国家名(英文)!' }],
                            initialValue:this.props.editData.usNameList
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="是否热门">
                        {getFieldDecorator('isHot', {
                            rules: [{ required: true, message: '请设置是否热门!' }],
                            initialValue:this.props.editData.isHot
                        })(
                        <RadioGroup onChange={this.onRadioChange}>
                            <Radio value={1}>是</Radio>
                            <Radio value={2}>否</Radio>
                        </RadioGroup>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const NationalEditForm = Form.create()(NationalEditForms);
export default NationalEditForm;