/**
 * 获取语言
 */
import React, { Component } from 'react';
import {Upload,Form,message,Input,Icon} from 'antd';
import {getLanguages} from '../../action/common';
import {setLanguage,getLanguage} from '../../axios/system';
import {getUploadPath} from '../../axios/system';
import * as config  from '../../axios/config';

const FormItem = Form.Item;

export default class UploadFile extends Component {
    constructor(props){
        super(props)
        this.state = {
            imageUrl:''
        }
    };
    beforeUpload = (file) =>{
        const isLt2M = file.size / 1024 / 1024 < 4;
        if (!isLt2M) {
            message.error('图片必须小于4MB!');
        }
        return isLt2M;

    };
    uplodChange = (fileLists) => {
        const data = fileLists.fileList[0].response
        console.log(data)        
        this.setState({
            imageUrl:'group1/M00/12/8E/CgogmFrEipyEagNKAAAAAGMybN8404.jpg'
        });

        if(data && data.code==0){
           
        }
        
    };
    onRemove = (e) =>{
        return false; // Upload 删除回调 false 阻止删除 true正常删除
    };

    render() {
        const imageUrl = this.state.imageUrl?this.state.imageUrl:this.props.imgUrl;
        const uploadButton = (
            <div>
                <Icon type={this.props.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return (
            <div>
                <FormItem {...this.props.formItemLayout} label="上传图片地址" style={{display:'none'}}>
                    {this.props.getFieldDecorator('uploadImg', {
                        rules: [],
                        initialValue:imageUrl
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...this.props.formItemLayout} label={this.props.title}>
                    {this.props.getFieldDecorator('imgUpload', {
                        rules: [{ required: true, message: '请上传附件!' }],
                        initialValue:imageUrl
                    })(
                        <Upload
                            action={getUploadPath()}
                            name="headerPic"
                            listType="picture-card"
                            className="user-header-uploader"
                            showUploadList={false}
                            beforeUpload={this.beforeUpload}
                            onChange={this.uplodChange}
                            onRemove={this.onRemove}
                        >
                            {imageUrl ? <img src={config.MOCK_AUTH_IMAGE+imageUrl} alt="avatar" /> : uploadButton}
                        </Upload>
                        
                    )}
                </FormItem>
            </div>
        );
    }
}
