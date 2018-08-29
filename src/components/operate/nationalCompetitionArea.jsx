/**
 * 国家赛区管理
 */
import React ,{ Component } from 'react';
import { Row, Col, Card,Table, Form,Select,Input,Button,Modal,Pagination,message} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import NationalEditForm from './nationalEdit';
import {getTimes} from '../../utils/index';
import {getLanguage,getLanguageNameById,getDataObjsByLg} from '../../axios/system';
import {getCountryZoneLists,addCountryZoneSave,updateCountryZoneSave,deleteCountryZoneSave} from '../../action/operate';

const FormItem = Form.Item;
const Option = Select.Option;

const data = [{
    key: '54324',
    idList:'54324',
    zhNameList:'中国',
    usNameList:'china',
    thList:'th',
    stateList:1,
},{
    key: '54325',
    idList:'54324',
    zhNameList:'中国',
    usNameList:'china',
    thList:'th',
    stateList:0,
},{
    key: '54326',
    idList:'54324',
    zhNameList:'中国',
    usNameList:'china',
    thList:'th',
    stateList:1,
}];

class NationalCompetitionArea extends Component {
    constructor(props){
        super(props)
        this.state = {
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'新建',
            editDate:{},
            addOrEditPopVisible: false,//状态编辑弹窗
            delPopVisible: false,//删除弹窗
            hotPopVisible: false,//设置热门弹窗
            hotMeg:'确定设置此国家为热门国家？',
            size:10,
            currentPage:1,//当前页
            pageTotal:0,//共有数据条数
            searchSelVal:0,
            natinalName:'',
        };
        this.columns = [{
            title: '序号',
            width:'100px',
            dataIndex: 'idList', 
        },  {
            title: '国旗',
            width:'100px',
            dataIndex: 'thList',
            key: 'thList',
            render:(val,record,index)=>{
                return(
                    <img className="list-img" src={val}/>
                )              
            }
        },{
            title: '国家名(中文)',
            width:'100px',
            dataIndex: 'zhNameList',
        }, {
            title: '国家名(英文)',
            width:'120px',
            dataIndex: 'usNameList',
        }, {
            title: '是否热门',
            width:'120px',
            dataIndex: 'isHotList',
        }, {
            title: '操作',
            key: 'operatList',
            render: (text, record ,index) => (  //塞入内容
                <div className="list-btn">
                　　<a onClick={this.editPop.bind(this,text)}>编辑</a>
                    <a onClick={this.delPop.bind(this,text)}>删除</a>
                    <a onClick={this.hotPop.bind(this,text)}>{text.stateList===1?'取消':'设置'}热门</a>
                </div>
            ),
        }];
        this.getLists();

    }
    //获取列
    表数据
    getLists=(type)=>{  
        this.state.tableDates = [];
        let sendData = {
            no: this.state.currentPage,
            size: this.state.size
        };
        if(type==1){//查询
            sendData['searchSelVal']=this.state.searchSelVal;
            sendData['natinalName']=this.state.natinalName;
        }
        console.log(sendData);
        getCountryZoneLists({sendData}).then((res)=>{ 
            console.log(res);
            if(res.code == 0){
                res.dataInfo.list.forEach(function(v,i){
                    v['key'] = v['appVersionId'];
                    v['idList'] = v['appVersionId'];
                    v['zhNameList'] = getTimes(v['createTime'],false,1);
                    v['usNameList'] = v['versionType']==100?'IOS':'Android';
                    v['thList'] = v['versionState']==1?'用户选择升级 ':'强制升级'; 
                    v['isHotList'] =1;                   
                    this.state.tableDates.push(v)
                },this)
                this.setState({
                    tableDates:this.state.tableDates,
                    currentPage:res.page,
                    pageTotal:res.total,
                    tableDates:this.state.tableDates,
                })

            }
        }).catch((error)=>{
            console.log('roles error!',error)
        });

    }
    //新建，编辑保存
    handleAddAndEditOk= (e) => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
              return;
            }
            let sendData={};
            console.log(values)
            sendData['enName'] = values['enName'];
            sendData['znName'] = values['znName'];
            sendData['uploadImg'] = values['uploadImg'];
            sendData['isHot'] = 1;
            console.log(sendData)
            
            if(this.state.addOrEditType==='add'){//新建
                addCountryZoneSave(sendData).then((res)=>{
                    if(res.code == 0){
                        message.success('保存成功',2);
                        this.getLists();
                        this.setState({
                            addOrEditPopVisible: false,
                        });
                    }else{
                         message.error('保存失败',2);
                    }
                }).catch((error) => {
                    message.error('保存失败',2);
                })
            }else if(this.state.addOrEditType==='edit'){//编辑
                sendData["appVersionId"]=this.state.currentDateId;
                updateCountryZoneSave(sendData).then((res)=>{
                    if(res.code == 0){
                        message.success('保存成功',2);
                        this.getLists();
                        this.setState({
                            addOrEditPopVisible: false,
                        });
                    }else{
                         message.error('保存失败',2);
                    }
                }).catch((error) => {
                    message.error('保存失败',2);
                })
            }

        });
        
    };
    //删除
    handleDelOk= (e) => {
        let sendData = {
            "appVersionId":this.state.currentDateId
        }
                
        deleteCountryZoneSave(sendData).then((res)=>{
            if(res.code == 0){
                message.success('删除成功',2);
                this.getLists();
                this.setState({
                    delPopVisible: false,
                });
            }else{
                 message.error('删除失败',2);
            }
        }).catch((error) => {
            message.error('删除失败',2);
        })
        
    };

    searchSelect = (e) => {
        alert(e)
        this.setState({
            searchSelVal:e,
        })
    };
    //删除弹窗
    delPop= (e) => {
        this.setState({
            delPopVisible: true,
        });
    };
    handleDelOk= (e) => {
        this.setState({
            delPopVisible: false,
        });
    };
    //新建弹窗
    addPop= (e) => {
        this.setState({
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'新建',
            addOrEditPopVisible: true,//状态编辑弹窗
            editDate:{},
        });
    };
    //编辑弹出
    editPop= (e) => {
        e['isHot'] = 1;
        this.setState({
            currentDateId:e.key,
            addOrEditType: 'edit',//详情弹窗
            addOrEditPopTitle:'编辑',
            addOrEditPopVisible: true,//状态编辑弹窗
            editDate:e,
        });
    };
    handleEditOk= (e) => {
        this.setState({
            editPopVisible: false,
        });
    };
    //设置热门弹窗
    hotPop= (e) => {
        console.log(e)
        this.setState({
            hotPopVisible: true,
            hotMeg:e.stateList===1?'确定取消此国家的热门国家？':'确定设置此国家为热门国家？',
        });
    };
    handleHotOk= (e) => {
        this.setState({
            hotPopVisible: false,
        });
    };
    
    handleCancel= (e) => {
        this.setState({
            delPopVisible: false,
            addOrEditPopVisible: false,
            hotPopVisible: false,
        });
    };
    changePage = (e) => {
        this.setState({
            currentPage:e
        })
    };
    showTotal=(total)=> {
        return `共有 ${total} 条`;
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    searchSubmit = (e) => {
        this.getLists(1)
    };
    inputChange = (e) => {
        console.log(e)
        this.setState({
            natinalName:document.getElementById('natinaName').value
        })
        
    }
    render() {
        return (
            <div className="gutter-example" style={{ background:'#fff'}}>
                <BreadcrumbCustom first="运营管理" second="国家赛区管理" />
                <div className="gutter-box search-box">
                    <div style={{width:'600px',float:'left'}}>
                        <Form onSubmit={this.searchSubmit}>
                            <div className="search-title">查询方式：</div>
                             <FormItem className="search-item">
                                <Input id="natinaName" style={{width: '150px'}} placeholder="请输入国家名"/>
                            </FormItem>
                            <FormItem className="search-item">
                                <Select className="icp-selector" style={{width: '150px'}} placeholder="请选择类型" onChange={this.searchSelect}>
                                    <Option value="1">热门</Option>
                                    <Option value="2">其他(非热门)</Option>
                                </Select>
                            </FormItem>
                            <FormItem className="search-item">
                                <Button type="primary" className="search-btn" htmlType="submit" icon="search">查询</Button>
                            </FormItem>
                        </Form>
                    </div>
                    <div style={{textAlign:'right'}}>
                        <Button onClick={this.addPop.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="plus">新建</Button>
                    </div>
                </div>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box" style={{ padding: '0'}}>
                            <Card bordered={false}>
                                <Table pagination={false} size="small" bordered columns={this.columns} dataSource={data} />
                                <Pagination className="pagination-me" onChange={this.changePage} total={this.state.pageTotal}  current={this.state.currentPage} defaultCurrent={1} defaultPageSize={10} hideOnSinglePage showTotal={this.showTotal} showSizeChanger showQuickJumper />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <NationalEditForm ref={this.saveFormRef} editData={this.state.editDate} isType={this.state.addOrEditType} title={this.state.addOrEditPopTitle} isPop={this.state.addOrEditPopVisible} editPopOk={this.handleAddAndEditOk.bind(this)} editPopClose={this.handleCancel.bind(this)} />
                <Modal title="是否删除" visible={this.state.delPopVisible} cancelText="关闭" okText="确定" onOk={this.handleDelOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div>是否要删除此国家信息？</div>
                </Modal>
                <Modal title="处理提示" visible={this.state.hotPopVisible} cancelText="关闭" okText="确定" onOk={this.handleHotOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div>{this.state.hotMeg}</div>
                </Modal>
            </div>
        )
    };
}

export default NationalCompetitionArea;