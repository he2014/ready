/**
 * 获取语言
 */
import React, { Component } from 'react';
import {Upload,Form,message,Input,Icon,Button} from 'antd';
import {getLanguages} from '../../action/common';
import {setLanguage,getLanguage} from '../../axios/system';
import {getUploadPath} from '../../axios/system';

const FormItem = Form.Item;

export default class UploadFileExcel extends Component {
    constructor(props){
        super(props)
        this.state = {
            imageUrl:'',
            imageName:''
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
        console.log(fileLists)
        const data = fileLists.fileList[0].response
        console.log(data)        
        this.setState({
            imageUrl:'group1/M00/12/8E/CgogmFrEipyEagNKAAAAAGMybN8404.jpg',
            imageName:fileLists.fileList[0].name,
        });

        if(data && data.code==0){
           
        }
        
    };
    onRemove = (e) =>{
        return false; // Upload 删除回调 false 阻止删除 true正常删除
    };

    render() {
        const imageUrl = this.state.imageUrl?this.state.imageUrl:this.props.imgUrl;
        const imgName = this.state.imageName;
        const uploadButton = (
            <Button>
                <Icon type="upload" /> 点击上传
            </Button>
        )
        return (
            <div>
                <FormItem {...this.props.formItemLayout} label="上传图片地址" style={{display:'none'}}>
                    {this.props.getFieldDecorator('uploadExcel', {
                        rules: [],
                        initialValue:imageUrl
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem style={{display:this.props.isHidden?'none':''}} {...this.props.formItemLayout} label={this.props.title}>
                    {this.props.getFieldDecorator('excelUpload', {
                        rules: [],
                    })(
                        <Upload
                            action={getUploadPath()}
                            name="headerPic"
                            listType="text"
                            showUploadList={false}
                            beforeUpload={this.beforeUpload}
                            onChange={this.uplodChange}
                            onRemove={this.onRemove}
                            multiple={false}
                        >
                        {imageUrl ? <div>{imgName}</div> : uploadButton}
                        </Upload>
                        
                    )}
                </FormItem>
            </div>
        );
    }
}
