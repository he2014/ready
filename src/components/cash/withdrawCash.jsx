/**
 * 提现管理
 */
import React ,{ Component } from 'react';
import { Row, Col, Card,Table,Form,Select,Input,Button,Modal,Pagination,DatePicker,message} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import WithdrawContactForm from './withdrawContact';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {getCashLists,getCashInfo,setCashSave} from '../../action/cash';
import {getTimes,getNumTimes} from '../../utils/index';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
class WithdrawCash extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchUserId:0,
            searchState:0,
            searchStartTime:0,
            searchEndTime:0,
            infoPopVisible: false,//详情弹窗
            contactPopVisible: false,//联系弹窗
            remittancePopVisible: false,//状态编辑弹窗
            currentDateId:0,
            size:10,//每页条数
            pageTotal:0,//共有数据条数
            currentPage2:1,//当前页
            isStateType:'1',
            infoData:{}
        };
        this.columns = [{
            title: '用户ID',
            width:'100px',
            dataIndex: 'userIdList', 
        }, {
            title: 'whatapp',
            width:'100px',
            dataIndex: 'whatappList',
        }, {
            title: '提现金额',
            width:'120px',
            dataIndex: 'cashNumList',
        }, {
            title: '拉币jine',
            width:'100px',
            dataIndex: 'localCashNumList',
        }, {
            title: '状态',
            width:'120px',
            dataIndex: 'stateList',
        }, {
            title: '申请时间',
            width:'150px',
            dataIndex: 'createtimeList',
        }, {
            title: '操作',
            key: 'operatList',
            render: (text, record ,index) => (  //塞入内容
                <div className="list-btn">
                　　<a onClick={this.infoPop.bind(this,text)}>查看</a>
                　　<a onClick={this.contactPop.bind(this,text)}>联系</a>
                    <a onClick={this.remittancePop.bind(this,text)}>打款确认</a>
                </div>
            ),
        }];
        this.getLists();
       
    }
    
    //获取列表数据
    getLists=()=>{  
        let sendData = {
            userId:this.state.searchUserId,
            flowStatus: this.state.searchState,
            startTime:this.state.searchStartTime,
            endTime:this.state.searchEndTime,
            no: this.state.currentPage2,
            size: this.state.size,
        };
        console.log(sendData);
        getCashLists({sendData}).then((res)=>{ 
            console.log(res);
            if(res.code == 0){
                res.dataInfo.list.forEach(function(v,i){ 
                    v['key'] = v['flowId']; 
                    v['userIdList'] = v['userId'];
                    v['whatappList'] = v['whatapp'];
                    v['cashNumList'] = v['cash']
                    v['localCashNumList'] = v['number']
                    v['createtimeList'] =getTimes(v['createTime'],false,1);
                    v['stateList'] = this.getState(v['status']);
                    this.state.tableDates.push(v)
                },this)
                this.setState({
                    tableDates:this.state.tableDates,
                    currentPage2:res.dataInfo.page,
                    pageTotal:res.dataInfo.total,
                })
            }
        }).catch((error)=>{
            console.log('roles error!',error)
        });

    };
    getState = (num) => {
        let str="";
        switch(num){
            case 0:
                str='未处理';
                break;
            case 1:
                str='审批失败【联系失败】';
                break;
            case 2:
                str='审批中【联系成功】';
                break;
            case 3:
                str='审批失败【打款失败】';
                break;
            case 4:
                str='已完成【打款成功】';
                break;
        }
        return str;
    };
    //设置
    handleContentOk= (e) => {
        const form = this.contactForm;
        form.validateFields((err, values) => {
            console.log(values)
            if (err) {
              return;
            }
            let sendData={};
            sendData["flowId"]= this.state.currentDateId;
            sendData['status'] = values['state'];
            sendData['remark'] = values['content'];
            console.log(sendData)
            setCashSave(sendData).then((res)=>{
                if(res.code == 0){
                    message.success('保存成功',2);
                    this.getLists();
                    this.setState({
                        contactPopVisible: false,
                    });
                }else{
                     message.error('保存失败',2);
                }
            }).catch((error) => {
                message.error('保存失败',2);
            })

        });
        
    };

    searchSelect = (e) => {    
        this.setState({
            searchState: e,
        }); 
    };
    onDateChange = (e) => {    
        this.setState({
            searchStartTime: getNumTimes(e[0]["_d"]),
            searchEndTime: getNumTimes(e[1]["_d"]),
        });
    };
    //详情弹窗
    infoPop= (e) => {
         this.setState({
            currentDateId:e.key,
            infoPopVisible: true,
        });
        let sendData={};
            sendData["flowId"]= this.state.currentDateId;
        console.log(sendData)
        getCashInfo(sendData).then((res)=>{
            console.log(res)
            if(res.code == 0){
                this.setState({
                    currentDateId:e.key,
                    infoPopVisible: true,
                    infoData:res.dataInfo,
                });
            }
        }).catch((error) => {
            message.error('保存失败',2);
        })
    };
    //联系
    contactPop= (e) => {
        this.setState({
            currentDateId:e.key,
            contactPopVisible: true,
            isStateType:1,
        });
    };
    //打款
    remittancePop= (e) => {
        this.setState({
            currentDateId:e.key,
            contactPopVisible: true,
            isStateType:2,
        });
    };
    
    handleCancel= (e) => {
        this.setState({
            infoPopVisible: false,
            contactPopVisible: false,
            remittancePopVisible: false,
        });
    };
    changePage = (e) => {
        this.setState({
            currentPage2:e
        })
    };
    showTotal=(total)=> {
        return `共有 ${total} 条`;
    };
    searchUserIdChange = (e) => {
        this.setState({
            searchUserId:e.target.value,
        })
    };
    saveContactFormRef = (form) => {
        this.contactForm = form;
    };
    render() {
        return (
            <div className="gutter-example" style={{ background:'#fff'}}>
                <BreadcrumbCustom first="提现管理" second="提现处理" />
                <div className="gutter-box search-box">
                    <Form onSubmit={this.getLists}>
                        <div className="search-title">查询方式：</div>
                        
                        <FormItem className="search-item">
                            <Input id="searchV" onChange={this.searchUserIdChange.bind(this)} style={{width: '150px'}} placeholder="请输入用户ID" />
                        </FormItem>
                        <FormItem className="search-item">
                            <Select className="icp-selector" style={{width: '150px'}} placeholder="请选择状态" onChange={this.searchSelect}>
                                <Option value="0">全部</Option>
                                <Option value="1">未处理</Option>
                                <Option value="2">处理中</Option>
                                <Option value="3">已完成</Option>
                            </Select>
                        </FormItem>
                        <FormItem className="search-item">
                            <RangePicker locale={locale} 
                                format="YYYY-MM-DD"
                                placeholder={['起点', '终点']}
                                onChange={this.onDateChange}
                                onOk={this.onDateOk} 
                            />
                    </FormItem>
                        <FormItem className="search-item">
                            <Button type="primary" className="search-btn" htmlType="submit" icon="search">查询</Button>
                        </FormItem>
                    </Form>
                </div>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box" style={{ padding: '0'}}>
                            <Card bordered={false}>
                                <Table pagination={false} size="small" bordered columns={this.columns} dataSource={this.state.tableDates} />
                                <Pagination className="pagination-me" onChange={this.changePage} total={this.state.pageTotal}  current={this.state.currentPage2} defaultCurrent={1} defaultPageSize={10} hideOnSinglePage showTotal={this.showTotal} showSizeChanger showQuickJumper />
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
                <WithdrawContactForm type={this.state.isStateType}  ref={this.saveContactFormRef} isPop={this.state.contactPopVisible} editPopClose={this.handleCancel.bind(this)} editPopOk={this.handleContentOk.bind(this)}/>     
            </div>
        )
    };
}

export default WithdrawCash;