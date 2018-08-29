/**
 * app版本管理编辑
 */
import React, { Component } from 'react';
import moment from 'moment';
import {Modal, Form, Input,DatePicker,Select,message,Table} from 'antd';
import {getTimes} from '../../utils/index';
import DailyTasksEditLgForm from './dailyTasksEditLg';
import {getLanguageNameById} from '../../axios/system';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class DailyTaskEditForms extends Component {
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

    onDateChange = (value, dateString) => {
        console.log('radio checked',value);
        console.log('radio checked',dateString);
    };
    onDateOk = (e) => {
        console.log('radio checked', e);
    };
    saveFormRef = (form) => {
        this.lgForm = form;
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
                title:values['title'],
                lgName:getLanguageNameById(values['versionLanguage']),
                content: values['content'],  
            }
            lg.push(v)
            this.setState({
                tableLgDates:lg
            })
        });
        
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
        const startDate = (this.props.isType=='edit')?moment(getTimes(this.props.editData.createTime,false,1),'YYYY-MM-DD HH:mm:ss'):'';
        return (
            <Modal width="760px" destroyOnClose={true} maskClosable={false} visible={this.props.isPop} title={this.props.title} okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopOk}>
                <Form layout="horizontal">

                    <FormItem {...formItemLayout} label="任务事件">
                        {getFieldDecorator('eventsType', {
                            rules: [{ required: true, message: '请选择任务事件!' }],
                            initialValue:this.props.editData.enents
                        })(
                            <Select showSearch
                                style={{ width: 300 }}
                                placeholder="请选择"
                                onChange={this.selectHandleChange}
                            >
                                <Option value={0}>成功邀请N个好友</Option>
                                <Option value={1}>玩N局1v1PK游戏</Option>
                                <Option value={2}>成功添加N个好友</Option>
                                <Option value={3}>世界喊话发送N条弹幕</Option>
                                <Option value={4}>玩1v1PK游戏胜利N局</Option>
                                <Option value={5}>和成功邀请的好友玩N局1v1PK小游戏</Option>
                                <Option value={6}>充值N次</Option>
                                <Option value={7}>玩N局单人游戏</Option>
                                <Option value={8}>和N个好友玩1v1PK游戏</Option>
                                <Option value={9}>玩N局付费场游戏</Option>
                          </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="需完成任务事件个数">
                        {getFieldDecorator('eventsNum', {
                            rules: [{ required: true, message: '请输入需完成任务事件个数!' }],
                            initialValue:this.props.editData.eventsNumList
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="币种">
                        {getFieldDecorator('moneyType', {
                            rules: [{ required: true, message: '请选择币种!' }],
                            initialValue:this.props.editData.moneyType
                        })(
                            <Select showSearch
                                style={{ width: 300 }}
                                placeholder="请选择"
                                onChange={this.selectHandleChange}
                            >
                                <Option value={1}>金币</Option>
                                <Option value={2}>钻石</Option>
                          </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="奖励金币数">
                        {getFieldDecorator('goldNum', {
                            rules: [{ required: true, message: '请输入奖励金币数!' }],
                            initialValue:this.props.editData.rewardGoldList
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="生效时间">
                        {getFieldDecorator('effectTime', {
                            rules: [{ required: true, message: '请选择生效时间!' }],
                            initialValue: this.props.isType=='edit'?startDate:''
                        
                        })(
                            <DatePicker onChange={this.onDateChange} placeholder="生效时间"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="列表排序">
                        {getFieldDecorator('index', {
                            rules: [{ required: true, message: '请输入列表排序!' }],
                            initialValue: this.props.editData.indexList
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
                <div className="lgAddTitle">按语言填写标题及内容:</div>
                <DailyTasksEditLgForm ref={this.saveFormRef} onSub={this.addLgSave.bind(this)}/>
                <Table pagination={false} size="small" bordered columns={this.columns} dataSource={this.state.tableLgDates.length>0?this.state.tableLgDates:this.props.LgDates} />
                 
            </Modal>
        );
    }
}
const DailyTaskEditForm = Form.create()(DailyTaskEditForms);
export default DailyTaskEditForm;

