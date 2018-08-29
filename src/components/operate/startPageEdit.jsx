/**
 *  启动页新建、编辑
 */
import React, { Component } from 'react';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import {Modal, Form, Input,DatePicker,Select, Upload, Icon, message, Radio,Table} from 'antd';
import StartPageEditLgForm from './startPageEditLg';
import * as config  from '../../axios/config';
import {getLanguageNameById} from '../../axios/system';
import {getTimes} from '../../utils/index';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class StartPageEditForms extends Component {
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
            title: '图片',
            width:'150px',
            dataIndex: 'imgPath',
            key: 'imgPath',
            render:(val,record,index)=>{
                return(
                    <img className="list-img" src={val}/>
                )              
            }
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
    onRadioChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          radioValue: e.target.value,
        });
    }
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
                versionLanguage:values['versionLanguage'],
                lgName:getLanguageNameById(values['versionLanguage']),
                lgImg: values['uploadImg'],
                imgPath: config.MOCK_AUTH_IMAGE+values['uploadImg'],  
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
        
        const RangePicker = DatePicker.RangePicker;
        const defaultSelectDate = {
            startDate: this.props.isType=='edit'?moment(getTimes(this.props.editData.startTime,false,1),'YYYY-MM-DD HH:mm:ss'):'',
            endDate: this.props.isType=='edit'?moment(getTimes(this.props.editData.endTime,false,1),'YYYY-MM-DD HH:mm:ss'):''
        }
        console.log(defaultSelectDate)
        return (
            <Modal width="760px" destroyOnClose={true} maskClosable={false} visible={this.props.isPop} title={this.props.title} okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopOk}>
                <Form layout="horizontal">
                    <FormItem {...formItemLayout} label="显示版本号" style={{display:'none'}}>
                        {getFieldDecorator('lgDatas', {
                            rules: [],
                            initialValue:this.state.tableLgDates.length>0?this.state.tableLgDates:this.props.LgDates
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
                    <FormItem {...formItemLayout} label="链接类型">
                        {getFieldDecorator('urlType', {
                            rules: [{ required: true, message: '请选择类型!' }],
                            initialValue:this.props.editData.type
                        })(
                            <Select showSearch
                                style={{ width: 200 }}
                                placeholder="请选择"
                                onChange={this.selectHandleChange}
                            >
                                <Option value={0}>无点击</Option>
                                <Option value={1}>打开网页</Option>
                          </Select>
                        )}
                    </FormItem>
                   
                     <FormItem {...formItemLayout} label="链接地址">
                        {getFieldDecorator('url', {
                            rules: [{ required: true, message: '请输入国家名(英文)!' }],
                            initialValue:this.props.editData.url
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="状态">
                        {getFieldDecorator('state', {
                            rules: [{ required: true, message: '请设置是否热门!' }],
                        })(
                        <RadioGroup onChange={this.onRadioChange} defaultValue={1}>
                            <Radio value={1}>启用</Radio>
                            <Radio value={2}>未启用</Radio>
                        </RadioGroup>
                        )}
                    </FormItem>
                </Form>
                <div className="lgAddTitle">按语言上传图片:</div>
                <StartPageEditLgForm ref={this.saveFormRef} onSub={this.addLgSave.bind(this)}/>
                <Table pagination={false} size="small" bordered columns={this.columns} dataSource={this.state.tableLgDates.length>0?this.state.tableLgDates:this.props.LgDates} />
                
            </Modal>
        );
    }
}
const StartPageEditForm = Form.create()(StartPageEditForms);
export default StartPageEditForm;