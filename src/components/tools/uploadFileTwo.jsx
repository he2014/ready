/**
 * 获取语言
 */
import React, { Component } from 'react';
import {Upload,Form,message,Input,Icon} from 'antd';
import {getLanguages} from '../../action/common';
import {setLanguage,getLanguage} from '../../axios/system';
import {getUploadPath} from '../../axios/system';

const FormItem = Form.Item;

export default class UploadFileTwo extends Component {
    constructor(props){
        super(props)
        this.state = {
            posterUrl:'',
            iconUrl:''
        }
    };
    beforeUpload = (file) =>{
        const isLt2M = file.size / 1024 / 1024 < 4;
        if (!isLt2M) {
            message.error('图片必须小于4MB!');
        }
        return isLt2M;

    };
    uplodChangePoster = (fileLists) => {
        const data = fileLists.fileList[0].response
        console.log(data)        
        this.setState({
            posterUrl:'group1/M00/12/8E/CgogmFrEipyEagNKAAAAAGMybN8404.jpg'
        });

        if(data && data.code==0){
           
        }
        
    };
    uplodChangeIcon = (fileLists) => {
        const data = fileLists.fileList[0].response
        console.log(data)        
        this.setState({
            iconUrl:'group1/M00/12/8E/CgogmFrEipyEagNKAAAAAGMybN8404.jpg'
        });

        if(data && data.code==0){
           
        }
        
    };
    onRemove = (e) =>{
        return false; // Upload 删除回调 false 阻止删除 true正常删除
    };

    render() {
        const posterUrl = this.state.posterUrl;
        const iconUrl = this.state.iconUrl;
        
        const uploadButton = (
            <div>
                <Icon type={this.props.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        return (
            <div>
                <FormItem {...this.props.formItemLayout} label="游戏海报" style={{display:'none'}}>
                    {this.props.getFieldDecorator('posterUrl', {
                        rules: [],
                        initialValue:posterUrl
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...this.props.formItemLayout} label="游戏海报">
                    {this.props.getFieldDecorator('posterUpload', {
                        rules: [{ required: true, message: '请上传游戏海报!' }],
                    })(
                        <Upload
                            action={getUploadPath()}
                            name="headerPic"
                            listType="picture-card"
                            className="user-header-uploader"
                            showUploadList={false}
                            beforeUpload={this.beforeUpload}
                            onChange={this.uplodChangePoster}
                            onRemove={this.onRemove}
                        >
                            {posterUrl ? <img src={posterUrl} alt="avatar" /> : uploadButton}
                        </Upload>
                        
                    )}
                </FormItem>
                <FormItem {...this.props.formItemLayout} label="游戏Icon" style={{display:'none'}}>
                    {this.props.getFieldDecorator('iconUrl', {
                        rules: [],
                        initialValue:iconUrl
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...this.props.formItemLayout} label="游戏Icon">
                    {this.props.getFieldDecorator('iconUpload', {
                        rules: [{ required: true, message: '请上传游戏Icon!' }],
                    })(
                        <Upload
                            action={getUploadPath()}
                            name="headerPic"
                            listType="picture-card"
                            className="user-header-uploader"
                            showUploadList={false}
                            beforeUpload={this.beforeUpload}
                            onChange={this.uplodChangeIcon}
                            onRemove={this.onRemove}
                        >
                            {iconUrl ? <img src={iconUrl} alt="avatar" /> : uploadButton}
                        </Upload>
                        
                    )}
                </FormItem>
            </div>
        );
    }
}
