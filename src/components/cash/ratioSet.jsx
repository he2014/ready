/**
 * 提现_联系
 */
import React, { Component } from 'react';
import {Modal, Form, Input,Button,Row, Col,Card,message} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {getTimes,getNumTimes} from '../../utils/index';
import {getRatioInfo,updateRatioSave} from '../../action/cash';
const FormItem = Form.Item;

class RatioSetForms extends Component {
    constructor(props){
        console.log(props)
        super(props)
        this.state = {
            currentVal:0,
        }
        this.getInfo()
    };
    getInfo = (e) =>{
        let sendData={
            'id':102,
        };
        console.log(sendData)
        getRatioInfo().then((res)=>{
            console.log(res)
            if(res.code == 0){
                let datas = res['dataInfo'];
                if(datas && datas.length>0){
                    datas.forEach(function(v,i){
                        if(v['id']=102){
                            this.setState({
                                currentVal:v['val']
                            });
                        }
                    },this)
                }
            }
        }).catch((error) => {
            message.error('保存失败',2);
        })

    };
    handleSubmit= (e) => {
        const form = this.props.form;
        form.validateFields((err, values) => {
            console.log(values)
            let sendData={
                'id':102,
                'val':values['value']
            };
            console.log(sendData)
            updateRatioSave(sendData).then((res)=>{
                console.log(res)
                if(res.code == 0){
                    message.success('修改成功',2);
                }else{
                    message.error('修改失败',2);
                }
            }).catch((error) => {
                message.error('修改失败',2);
            })
        })
    };
    saveFormRef = (form) =>{
        this.form = form;
    }
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
             <div className="gutter-example" style={{ background:'#fff'}}>
                <BreadcrumbCustom first="提现管理" second="兑换比率配置" />              
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box" style={{ padding: '0'}}>
                            <Card bordered={false}>
                                <Form ref={this.saveFormRef}  layout="horizontal" onSubmit={this.handleSubmit}>
                                    <FormItem {...formItemLayout} label="美元数">
                                        {getFieldDecorator('money', {
                                            rules: [],
                                        })(
                                            <div>1$</div>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="当前兑换1美元需要拉币数">
                                        {getFieldDecorator('localCash', {
                                            rules: [],
                                        })(
                                            <div>{this.state.currentVal}</div>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="修改拉币数">
                                        {getFieldDecorator('value', {
                                            rules: [{ required: true, message: '请输入说明!' }],
                                        })(
                                            <Input style={{width:'200px'}}/>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} >
                                        <Row className="info-row">
                                            <Col span="10" align="center"></Col>
                                            <Col span="12">
                                                <Button type="primary" className="search-btn" htmlType="submit">修改</Button>
                                            </Col>
                                        </Row>
                                    </FormItem>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Modal className="info-modal" title="详细信息" visible={this.state.infoPopVisible} cancelText="关闭" onCancel={this.handleCancel} okButtonProps="hidden">                    
                    <Row className="info-row">
                        <Col span="8" align="center">联系：</Col>
                        <Col span="16"></Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">处理人姓名：</Col>
                        <Col span="16">{(this.state.infoData && this.state.infoData.contect)?this.state.infoData.contect.userName:''}</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">处理状态：</Col>
                        <Col span="16">{(this.state.infoData && this.state.infoData.contect)?(this.state.infoData.contect.status==1?'联系失败':'联系成功'):''}</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">处理详情：</Col>
                        <Col span="16">{(this.state.infoData && this.state.infoData.contect)?this.state.infoData.contect.remark:''}</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">处理时间：</Col>
                        <Col span="16">{(this.state.infoData && this.state.infoData.contect)?getTimes(this.state.infoData.contect.createTime):''}</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="center">打款：</Col>
                        <Col span="16"></Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">处理人姓名：</Col>
                        <Col span="16">{(this.state.infoData && this.state.infoData.transfer)?this.state.infoData.transfer.userName:''}</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">处理状态：</Col>
                        <Col span="16">{(this.state.infoData && this.state.infoData.transfer)?(this.state.infoData.transfer.status==3?'打款失败':'打款成功'):''}</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">处理详情：</Col>
                        <Col span="16">{(this.state.infoData && this.state.infoData.transfer)?this.state.infoData.transfer.remark:''}</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">处理时间：</Col>
                        <Col span="16">{(this.state.infoData && this.state.infoData.transfer)?getTimes(this.state.infoData.transfer.createTime):''}</Col>
                    </Row>
                </Modal>
            </div>

            
        );
    }
}

const RatioSetForm = Form.create()(RatioSetForms);
export default RatioSetForm;

