/**
 * 游戏新建、编辑
 */
import React, { Component } from 'react';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import {Modal, Form, Input,DatePicker,Upload,Select,Radio, Icon, message,Table} from 'antd';
import MessageEditLgForm from './messageEditLg';
import * as config  from '../../axios/config';
import {getLanguageNameById} from '../../axios/system';
import {getTimes} from '../../utils/index';
import UploadFile from '../tools/uploadFile';
import UploadFileExcel from '../tools/uploadFileExcel';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
class MessageEditForms extends Component {
    constructor(props){
        console.log(props)
        super(props)
        this.state = {
            loading:false,
            radioValue:2,
            isUploadExcel:false,
            tableLgDates:[],
        }
        this.columns1 = [{
            title: '语言',
            width:'100px',
            dataIndex: 'lgName', 
        }, {
            title: '活动标题',
            width:'100px',
            dataIndex: 'title', 
        }, {
            title: '活动简介',
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
        this.columns2 = [{
            title: '语言',
            width:'100px',
            dataIndex: 'lgName', 
        }, {
            title: '活动内容',
            width:'100px',
            dataIndex: 'title', 
        }, {
            title: '文字链接内容',
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
        this.columns3 = [{
            title: '语言',
            width:'100px',
            dataIndex: 'lgName', 
        }, {
            title: '活动内容',
            width:'100px',
            dataIndex: 'title', 
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

    };
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
    };
    onDateOk = (e) => {
        console.log('radio checked', e);
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
    };
    onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          radioValue: e.target.value,
          isUploadExcel:e.target.value==2?true:false,
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
    disabledDate= (current) => {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        let lgTableC = this.columns1;
        if(this.props.type==2){
            lgTableC = this.columns2;
        }else if(this.props.type==3){
            lgTableC = this.columns3;
        }
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
        const RangePicker = DatePicker.RangePicker;
        const defaultSelectDate = {
            startDate: this.props.isType=='edit'?moment(getTimes(this.props.editData.startTime,false,1),'YYYY-MM-DD HH:mm:ss'):'',
            endDate: this.props.isType=='edit'?moment(getTimes(this.props.editData.endTime,false,1),'YYYY-MM-DD HH:mm:ss'):''
        }
        return (
            <Modal width="760px" destroyOnClose={true} maskClosable={false} visible={this.props.isPop} title={this.props.popTitle} okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopOk} >
                <Form layout="horizontal">
                    <FormItem {...formItemLayout} label="语言内容" style={{display:'none'}}>
                        {getFieldDecorator('lgDatas', {
                            rules: [],
                            initialValue:this.state.tableLgDates.length>0?this.state.tableLgDates:this.props.LgDates
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <UploadFile title="banner上传" imgUrl={this.props.editData.picList} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout}/>
                
                    <FormItem {...formItemLayout} label="跳转链接">
                        {getFieldDecorator('goUrl', {
                            rules: [{ required: true, message: '请输入跳转链接!' }],
                            initialValue:this.props.editData.urlList
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="开始~结束时间">
                        {getFieldDecorator('startAndEndTime', {
                            rules: [{ required: true, message: '请输入开始~结束时间!' }],
                            initialValue: [this.props.isType=='edit'?defaultSelectDate.startDate:'', this.props.isType=='edit'?defaultSelectDate.endDate:'']
                        })(
                            <RangePicker locale={locale} 
                                disabledDate={this.disabledDate}
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder={['开始时间', '结束时间']}
                                onChange={this.onDateChange}
                                onOk={this.onDateOk} 
                                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="目标用户">
                        {getFieldDecorator('userType', {
                            rules: [{ required: true, message: '请选择目标用户!' }],
                        })(
                            <RadioGroup onChange={this.onRadioChange} defaultValue={1}>
                                <Radio value={1}>全部</Radio>
                                <Radio value={2}>导入用户</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <UploadFileExcel isHidden={this.state.isUploadExcel?false:true} title="选取Excel文件" getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout}/>
                
                </Form>
                <div className="lgAddTitle">按语言填写内容:</div>
                <MessageEditLgForm type={this.props.type} ref={this.saveFormRef} onSub={this.addLgSave.bind(this)} isPay={this.props.isPay}/>
                <Table pagination={false} size="small" bordered columns={lgTableC} dataSource={this.state.tableLgDates.length>0?this.state.tableLgDates:this.props.LgDates} />
                
            </Modal>
        );
    }
}
const MessageEditForm = Form.create()(MessageEditForms);
export default MessageEditForm;