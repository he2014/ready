/**
 * app版本管理
 */
import React, { Component } from 'react';
import {Modal, Form, Input,Select,Radio,Button,Table} from 'antd';
import AppEditionLgForm from './appEditionLg';
import {getLanguageNameById} from '../../axios/system';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;

class AppEditionEditForms extends Component {
    constructor(props){
        console.log(props)
        super(props)
        this.state = {
            loading:false,
            radioValue:2,
            tableLgDates:this.props.LgDates,
        }
        this.columns = [{
            title: '语言',
            width:'100px',
            dataIndex: 'lgName', 
        }, {
            title: '标题',
            width:'150px',
            dataIndex: 'versionName',
        }, {
            title: '内容',
            width:'100px',
            dataIndex: 'versionDesc',
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
    
    selectHandleChange = (value) => {
      console.log(`selected ${value}`);
    };
    
    addLgSubmit = (e) => {
        e.preventDefault();
        this.props.form1.validateFields((err, values) => {
            console.log(values)
        });
    };
    saveFormRef = (form) => {
        this.lgForm = form;
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
    addLgSave= (e) => {
        const form = this.lgForm;
        const lg = (this.state.tableLgDates.length>0)?this.state.tableLgDates:this.props.LgDates;
        console.log(this.props.LgDates)
        console.log(lg)
        const i = this.state.tableLgDates.length>0?this.state.tableLgDates[this.state.tableLgDates.length-1]['key']+1:1;
        form.validateFields((err, values) => {
            if (err) {
              return;
            }
            const v = {
                key: i,
                versionLanguage:values['versionLanguage'],
                versionName:values['versionName'],
                lgName:getLanguageNameById(values['versionLanguage']),
                versionDesc: values['versionDesc'],  
            }
            lg.push(v)
            this.setState({
                tableLgDates:lg
            })
        });
        
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const state = this.state;
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
            <Modal width="760px" destroyOnClose={true} maskClosable={false} visible={this.props.isPop} title={this.props.title} okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopOk}>
                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="显示版本号" style={{display:'none'}}>
                        {getFieldDecorator('lgDatas', {
                            rules: [],
                            initialValue:this.state.tableLgDates.length>0?this.state.tableLgDates:this.props.LgDates
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="请选择升级方式">
                        {getFieldDecorator('versionState', {
                            rules: [{ required: true, message: '请选择任务事件!' }],
                            initialValue:this.props.editData.versionState
                        })(
                            <Select showSearch
                                style={{ width: 300 }}
                                placeholder="请选择"
                                onChange={this.selectHandleChange}
                            >
                                <Option value={1}>非强制升级</Option>
                                <Option value={2}>强制升级</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="请选择设备终端">
                        {getFieldDecorator('versionType', {
                            rules: [{ required: true, message: '请选择设备终端!' }],
                            initialValue:this.props.editData.versionType
                        })(
                            <Select showSearch
                                style={{ width: 300 }}
                                placeholder="请选择"
                                onChange={this.selectHandleChange}
                            >
                                <Option value={200}>Android</Option>
                                <Option value={100}>IOS</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="显示版本号">
                        {getFieldDecorator('versionCode', {
                            rules: [{ required: true, message: '请输入显示版本号!' }],
                            initialValue:this.props.editData.versionCode
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="状态">
                        {getFieldDecorator('state', {
                            rules: [{ required: true, message: '请输入状态!' }],
                            initialValue:this.props.editData.state
                        })(
                            <RadioGroup onChange={this.onRadioChange}>
                                <Radio value={1} defaultChecked={true}>启用</Radio>
                                <Radio value={2}>未启用</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="下载链接">
                        {getFieldDecorator('appUrl', {
                            rules: [{ required: true, message: '请输入下载链接!' }],
                            initialValue:this.props.editData.appUrl
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
                <div className="lgAddTitle">按语言填写标题及内容:</div>
                <AppEditionLgForm ref={this.saveFormRef} onSub={this.addLgSave.bind(this)}/>
                <Table pagination={false} size="small" bordered columns={this.columns} dataSource={this.state.tableLgDates.length>0?this.state.tableLgDates:this.props.LgDates} />
                                
            </Modal>
        );
    }
}

const AppEditionEditForm = Form.create()(AppEditionEditForms);
export default AppEditionEditForm;

