/**
 *举报管理编辑
 */
import React, { Component } from 'react';
import {Modal, Form, Input,Select,message,Row,Col,Table,Button} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const data = [{
    key: '54324',
    codeList:'54324',   
    reasonList:'涉黄1', 
},{
    key: '54325',
    codeList:'54324',
    reasonList:'涉黄2', 
},{
    key: '54326',
    codeList:'54324',
    reasonList:'涉黄3',  
},{
    key: '54327',
    codeList:'54324',
    reasonList:'涉黄3',  
},{
    key: '54328',
    codeList:'54324',
    reasonList:'涉黄3',  
},{
    key: '54329',
    codeList:'54324',
    reasonList:'涉黄3',  
},{
    key: '543223',
    codeList:'54324',
    reasonList:'涉黄3',  
}];
class ReportEditForms extends Component {
    constructor(props){
        console.log(props)
        super(props)
        this.state = {
            loading:false,
            radioValue:2,
            reason:'',
        },
        this.columns = [{
            title: '编号',
            width:'100px',
            dataIndex: 'codeList', 
        }, {
            title: '举报理由',
            width:'100px',
            dataIndex: 'reasonList',
        }]
    };
    
    selectHandleChange = (value) => {
        console.log(`selected ${value}`);
        
    }
    add= (value) => {
        this.setState({
            reason: document.getElementById('reason').value,
        });
        data.push({
            key: '543789',
            codeList:'60000',
            reasonList:document.getElementById('reason').value,  
        })
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
        return (
            <Modal className="info-modal" width="760px" destroyOnClose={true} maskClosable={false} visible={this.props.isPop} title={this.props.title} okText="保存" cancelText="关闭" onCancel={this.props.editPopClose} onOk={this.props.editPopOk}>
                <Row>
                    <Col span="6" align="right">请选择语言：</Col>
                    <Col span="18">
                        <Select showSearch
                            style={{ width: 200 }}
                            placeholder="请选择"
                            onChange={this.selectHandleChange}
                        >
                            <Option value={0}>英语</Option>
                            <Option value={1}>马来语</Option>
                            <Option value={2}>泰语</Option>
                            <Option value={3}>越南语</Option>
                            <Option value={4}>印尼语</Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{marginTop:'30px'}}>
                    <Col span="18" offset={3}> 
                        <Table pagination={false} size="small" bordered columns={this.columns} dataSource={data} />
                    </Col>
                </Row>
                <Row style={{marginTop:'50px'}}>
                    <Col span="6" align="right">举报理由：</Col>
                    <Col span="14">
                        <Input id="reason" placeholder="请输入举报理由"/>
                    </Col>
                </Row>
                <Row style={{marginTop:'20px'}}>
                    <Col span="24" align="center">
                        <Button style={{width:'200px'}} type="primary" className="search-btn" onClick={this.add.bind(this)} icon="plus-circle-">确认添加</Button>
                    </Col>
                </Row>
            </Modal>
        );
    }
}
const ReportEditForm = Form.create()(ReportEditForms);
export default ReportEditForm;

