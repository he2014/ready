/**
 * 充值管理编辑
 */
import React, { Component } from 'react';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import {Modal, Form, Input, Upload, Icon, message} from 'antd';
const FormItem = Form.Item;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class RechargeEditForms extends Component {
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

    picHandleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
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
        const uploadButton = (
            <div>
                <Icon type={this.props.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        const imageUrl = this.state.imageUrl;
        return (
            <Modal destroyOnClose={true} maskClosable={false} visible={this.props.isPop} title={this.props.title} okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopOk}>
                <Form layout="horizontal">
                    <FormItem {...formItemLayout} label="商品图">
                        {getFieldDecorator('pic', {
                            rules: [{ required: true, message: '请上传图片!' }],
                        })(
                            <Upload
                                action="http://10.10.32.164:6021/"
                                name="headerPic"
                                listType="picture-card"
                                className="user-header-uploader"
                                showUploadList={false}
                                beforeUpload={this.haaderBeforeUpload}
                                onChange={this.picHandleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="钻石数">
                        {getFieldDecorator('num', {
                            rules: [{ required: true, message: '请输入钻石数!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="钻石数对应金额">
                        {getFieldDecorator('numForMoney', {
                            rules: [{ required: true, message: '请输入钻石数对应金额!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="返金币数">
                        {getFieldDecorator('returnCoin', {
                            rules: [{ required: true, message: '请输入返金币数!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="列表排序">
                        {getFieldDecorator('sort', {
                            rules: [{ required: true, message: '请输入列表排序!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
const RechargeEditForm = Form.create()(RechargeEditForms);
export default RechargeEditForm;