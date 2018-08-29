/**
 * 游戏新建、编辑
 */
import React, { Component } from 'react';
import {Modal, Form, Input,Upload,Select,Radio, Icon, message,Table} from 'antd';
import GameEditLgForm from './gameEditLg';
import * as config  from '../../axios/config';
import {getLanguageNameById} from '../../axios/system';
import {getTimes} from '../../utils/index';
import UploadFileTwo from '../tools/uploadFileTwo';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
class GameEditForms extends Component {
    constructor(props){
        console.log(props)
        super(props)
        this.state = {
            loading:false,
            radioValue:2,
            tableLgDates:[],
        }
        this.columns = [{
            title: '语言',
            width:'100px',
            dataIndex: 'lgName', 
        }, {
            title: '标题',
            width:'100px',
            dataIndex: 'title', 
        }, {
            title: '内容',
            width:'100px',
            dataIndex: 'content', 
        }, {
            title: '操作',
            width:'120px',
            key: 'operatList',
            render: (text, record ,index) => (  //塞入内容
                <div className="list-btn">
                    <a onClick={this.delLg.bind(this,text)}>删除</a>
                </div>
            ),
        }]
    };
    delLg = (e) => {
        this.state.tableLgDates.forEach(function(v,i){
            if(e['key']===v['key']){
                this.state.tableLgDates.splice(i,1);
                return;
            }
        },this);
        this.setState({
            tableLgDates:this.state.tableLgDates
        })
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

    onDateChange = (value, dateString) => {
        console.log('radio checked',value);
        console.log('radio checked',dateString);
    }
    onDateOk = (e) => {
        console.log('radio checked', e);
    }
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
    };
    onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          radioValue: e.target.value,
        });
    };
    saveFormRef = (form) => {
        this.lgForm = form;
    };
    addLgSave= (e) => {
        const form = this.lgForm;
        const lg = (this.state.tableLgDates.length>0)?this.state.tableLgDates:this.props.LgDates;
        const i = this.state.tableLgDates.length>0?this.state.tableLgDates[this.state.tableLgDates.length-1]['key']+1:1;
        form.validateFields((err, values) => {
            if (err) {
              return;
            }
            console.log(values)
            const v = {
                key: i,
                lgId:values['versionLanguage'],
                lgName:getLanguageNameById(values['versionLanguage']),
                title: values['title'],
                content: values['content'],
            }
            lg.push(v)
            this.setState({
                tableLgDates:lg
            })
        });
        
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
        const uploadButton = (
            <div>
                <Icon type={this.props.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        const imageUrl = this.state.imageUrl;
        return (
            <Modal width="760px" destroyOnClose={true} maskClosable={false} visible={this.props.isPop} title={this.props.popTitle} okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopOk} >
                <Form layout="horizontal">
                    <FormItem {...formItemLayout} label="显示版本号" style={{display:'none'}}>
                        {getFieldDecorator('lgDatas', {
                            rules: [],
                            initialValue:this.state.tableLgDates.length>0?this.state.tableLgDates:this.props.LgDates
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <UploadFileTwo getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout}/>
                
                    <FormItem {...formItemLayout} label="游戏链接">
                        {getFieldDecorator('gameUrl', {
                            rules: [{ required: true, message: '请输入游戏链接!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    
                    <FormItem {...formItemLayout} label="游戏状态">
                        {getFieldDecorator('state', {
                            rules: [{ required: true, message: '请输入游戏状态!' }],
                        })(
                            <RadioGroup onChange={this.onRadioChange} defaultValue={1}>
                                <Radio value={1}>启用</Radio>
                                <Radio value={2}>未启用</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="币种">
                        {getFieldDecorator('moneyType', {
                            rules: [{ required: true, message: '请选择币种!' }],
                        })(
                            <Select showSearch
                                style={{ width: 300 }}
                                placeholder="请选择"
                                onChange={this.selectHandleChange}
                            >
                                <Option value={0}>金币</Option>
                                <Option value={1}>钻石</Option>
                          </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} style={{display:this.props.isPk?'none':''}} label="入场钻石数">
                        {getFieldDecorator('joinZuanNum', {
                            rules: [],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} style={{display:this.props.isPay?'none':''}} label="入场金币数（败扣除金币数)">
                        {getFieldDecorator('joinGoldNum', {
                            rules: [],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} style={{display:this.props.isPay?'none':''}} label="胜利奖励金币数">
                        {getFieldDecorator('winNum', {
                            rules: [],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="列表排序">
                        {getFieldDecorator('index', {
                            rules: [{ required: true, message: '请输入列表排序!' }],
                        })(
                            <Input placeholder="数字越大排序越靠前"/>
                        )}
                    </FormItem>
                </Form>
                <div className="lgAddTitle">按语言填写内容:</div>
                <GameEditLgForm ref={this.saveFormRef} onSub={this.addLgSave.bind(this)} isPay={this.props.isPay}/>
                <Table pagination={false} size="small" bordered columns={this.columns} dataSource={this.state.tableLgDates.length>0?this.state.tableLgDates:this.props.LgDates} />
                
            </Modal>
        );
    }
}
const GameEditForm = Form.create()(GameEditForms);
export default GameEditForm;