/**
 * 用户管理
 */
import React ,{ Component } from 'react';
import { Tabs, Row, Col, Card,Table, Button,Modal,Pagination,message,Popover,Form,Select} from 'antd';
import * as config  from '../../axios/config';
import BreadcrumbCustom from '../BreadcrumbCustom';
import MessageEditForm from './messageEdit';
import {getTimes,getUTCtime} from '../../utils/index';
import {getLanguage,getLanguageNameById,getDataObjsByLg} from '../../axios/system';
import {getMessage,addMessageSave,updateMessageSave,getMessageInfo,delMessage,sendMessage} from '../../action/operate';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

class Message extends Component {
    constructor(props){
        super(props)
        this.state = {
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'新建',
            addOrEditPopVisible: false,//状态编辑弹窗
            type:1,
            delPopVisible: false,
            currentPage:1,//当前页
            pageTotal:0,//共有数据条数
            size:10,
            editLgData:[],
            tableDates:[],
            currentDateId:0,
            editDate:{},
            pkData:[],
            payData:[],
            searchSelVal:null,
        };
        this.temColumns1 = [{
            title: '编号',
            width:'80px',
            dataIndex: 'codeList', 
        }, {
            title: '活动banner',
            width:'120px',
            dataIndex: 'picList',
            key: 'picList',
            render:(val2,record2,index2)=>{
                return(
                    <img className="list-img" src={val2}/>
                )              
            }
        }, {
            title: '活动标题',
            width:'100px',
            dataIndex: 'nameList',
            render:(val,record,index)=>{
                const data = getDataObjsByLg(val);
                const descColumns = [{
                    title: '语言',
                    width:'100px',
                    dataIndex: 'languageName', 
                }, {
                    title: '内容',
                    width:'150px',
                    dataIndex: 'content',
                }]
                return(
                    <div className='' >
                        <Popover title={"任务标题"}
                            content={
                                <Table pagination={false} size="small" bordered columns={descColumns} dataSource={data} />
                            }
                        >
                            详情
                        </Popover>
                    </div>
                )              
            }
        }, {
            title: '活动简介',
            width:'100px',
            dataIndex: 'infoList',
            render:(val,record,index)=>{
                const data = getDataObjsByLg(val);
                const descColumns = [{
                    title: '语言',
                    width:'100px',
                    dataIndex: 'languageName', 
                }, {
                    title: '内容',
                    width:'150px',
                    dataIndex: 'content',
                }]
                return(
                    <div className='' >
                        <Popover title={"任务内容"}
                            content={
                                <Table pagination={false} size="small" bordered columns={descColumns} dataSource={data} />
                            }
                        >
                            详情
                        </Popover>
                    </div>
                )              
            }
        }, {
            title: '跳转链接',
            dataIndex: 'urlList',
        }, {
            title: '状态',
            width:'80px',
            dataIndex: 'stateList',
        }, {
            title: '创建时间',
            width:'150px',
            dataIndex: 'creatTimeList',
        },{
            title: '操作',
            key: 'operatList',
            render: (text, record ,index) => (  //塞入内容
                <div className="list-btn">
                　　<a onClick={this.editPop.bind(this,text)}>编辑</a>
                    <a onClick={this.delPop.bind(this,text)}>删除</a>
                </div>
            ),
        }];
        this.temColumns2 = [{
            title: '编号',
            width:'80px',
            dataIndex: 'codeList', 
        }, {
            title: '活动内容',
            width:'100px',
            dataIndex: 'nameList',
            render:(val,record,index)=>{
                const data = getDataObjsByLg(val);
                const descColumns = [{
                    title: '语言',
                    width:'100px',
                    dataIndex: 'languageName', 
                }, {
                    title: '内容',
                    width:'150px',
                    dataIndex: 'content',
                }]
                return(
                    <div className='' >
                        <Popover title={"任务标题"}
                            content={
                                <Table pagination={false} size="small" bordered columns={descColumns} dataSource={data} />
                            }
                        >
                            详情
                        </Popover>
                    </div>
                )              
            }
        }, {
            title: '文字链接内容',
            width:'100px',
            dataIndex: 'infoList',
            render:(val,record,index)=>{
                const data = getDataObjsByLg(val);
                const descColumns = [{
                    title: '语言',
                    width:'100px',
                    dataIndex: 'languageName', 
                }, {
                    title: '内容',
                    width:'150px',
                    dataIndex: 'content',
                }]
                return(
                    <div className='' >
                        <Popover title={"任务内容"}
                            content={
                                <Table pagination={false} size="small" bordered columns={descColumns} dataSource={data} />
                            }
                        >
                            详情
                        </Popover>
                    </div>
                )              
            }
        }, {
            title: '跳转链接',
            width:'200px',
            dataIndex: 'urlList',
        }, {
            title: '状态',
            width:'80px',
            dataIndex: 'stateList',
        }, {
            title: '创建时间',
            width:'150px',
            dataIndex: 'creatTimeList',
        },{
            title: '操作',
            
            key: 'operatList',
            render: (text, record ,index) => (  //塞入内容
                <div className="list-btn">
                　　<a onClick={this.editPop.bind(this,text)}>编辑</a>
                    <a onClick={this.delPop.bind(this,text)}>删除</a>
                </div>
            ),
        }];
        this.temColumns3 = [{
            title: '编号',
            width:'80px',
            dataIndex: 'codeList', 
        }, {
            title: '活动内容',
            width:'100px',
            dataIndex: 'nameList',
            render:(val,record,index)=>{
                const data = getDataObjsByLg(val);
                const descColumns = [{
                    title: '语言',
                    width:'100px',
                    dataIndex: 'languageName', 
                }, {
                    title: '内容',
                    width:'150px',
                    dataIndex: 'content',
                }]
                return(
                    <div className='' >
                        <Popover title={"任务标题"}
                            content={
                                <Table pagination={false} size="small" bordered columns={descColumns} dataSource={data} />
                            }
                        >
                            详情
                        </Popover>
                    </div>
                )              
            }
        },  {
            title: '状态',
            width:'80px',
            dataIndex: 'stateList',
        }, {
            title: '创建时间',
            width:'150px',
            dataIndex: 'creatTimeList',
        },{
            title: '操作',
            key: 'operatList',
            render: (text, record ,index) => (  //塞入内容
                <div className="list-btn">
                　　<a onClick={this.editPop.bind(this,text)}>编辑</a>
                    <a onClick={this.delPop.bind(this,text)}>删除</a>
                </div>
            ),
        }];
        this.getLists();
    }
    
    //获取列表数据
    getLists=(type)=>{  
        this.state.tableDates = [];
        let sendData = {
            no: this.state.currentPage,
            size: this.state.size
        };
        sendData['type'] = this.state.searchSelVal;
        console.log(sendData);
        getMessage({sendData}).then((res)=>{ 
            console.log(res);
            if(res.code == 0){
                res.dataInfo.list.forEach(function(v,i){
                    v['key'] = v['inMailId'];
                    v['picList'] = v['inMailTempleateEntity']['templeateData']['img'];
                    v['nameList'] = v['inMailTempleateEntity']['templeateData']['title'];
                    v['infoList'] = v['inMailTempleateEntity']['templeateData']['param'];
                    v['urlList'] = v['inMailTempleateEntity']['templeateData']['paramuri'];
                    v['startTime'] = v['inMailStartTime'];
                    v['endTime'] = v['inMailExpireTime'];
                    v['creatTimeList'] = getTimes(v['createTime'],false,1);
                    v['stateList'] =this.getState(v['inMailState']);
                    v['userType']=1;//缺少目标用户选择
                    this.state.tableDates.push(v);               
                },this)
                this.setState({
                    tableDates:this.state.tableDates,
                    currentPage:res.dataInfo.page,
                    pageTotal:res.dataInfo.total,
                })

            }
        }).catch((error)=>{
            console.log('roles error!',error)
        });

    };
    
    handleAddAndEditOk= (e) => {
        const form = this.form;
        let _this = this;
        form.validateFields((err, values) => {
            console.log(values)
            if (err) {
              return;
            }
            let desc = {},
                title = {};
            if(values.lgDatas){
                values.lgDatas.forEach(function(v,i){
                    if(_this.state.type==1){
                        desc[v.lgId]=v.infos;
                        title[v.lgId]=v.title;
                    }else if(_this.state.type==2){
                        desc[v.lgId]=v.content;
                        title[v.lgId]=v.urlContent;
                    }else if(_this.state.type==3){
                        desc[v.lgId]=v.content;
                    }
                })
            }
            let sendData={
                userType:values['userType'],//缺少：目标用户
                mType:this.state.type,//缺少模板类型  
                inMailStartTime:getUTCtime(values['startAndEndTime'][0]['_d']) ,
                inMailExpireTime:getUTCtime(values['startAndEndTime'][1]['_d']),               
                title: JSON.stringify(title),
                param: JSON.stringify(desc),
                paramuri: values['goUrl'],
                img: values['uploadImg'],
                fileData: values['uploadExcel']
            };

            console.log(sendData)

            if(this.state.addOrEditType==='add'){//新建
                addMessageSave(sendData).then((res)=>{
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
                sendData["inMailId"]=this.state.currentDateId;
                updateMessageSave(sendData).then((res)=>{
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
            "inMailId":this.state.currentDateId
        }                
        delMessage(sendData).then((res)=>{
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
    
    //编辑弹出
    editPop= (e) => {
        let lgData=[];
        let titles =  e.nameList,
            content = e.infoList;
        if(titles && content){
            getLanguage().forEach(function(v,i){
                if(titles[v.languageId]){
                    const val = {
                        key: i,
                        lgId:v['languageId'],
                        lgName:getLanguageNameById(v['languageId']),
                        title:titles[v.languageId],
                        content: content[v.languageId], 
                        infos:content[v.languageId],
                        urlContent:titles[v.languageId] 
                    }
                    lgData.push(val)
                }
                
            })
        }
        console.log(e)

        this.setState({
            addOrEditPopVisible: true,
            addOrEditPopTitle:'Pk编辑',
            addOrEditType:'edit',
            currentDateId:e.key,
            editDate:e,
            editLgData:lgData,
        });
    };
    
    //状态编辑弹出
    addModelPop1= (e) => {
        this.setState({
            type:1,
            addOrEditPopVisible: true,
            addOrEditPopTitle:'模板1新建',
            addOrEditType:'add',
        });
    };
    //状态编辑弹出
    addModelPop2= (e) => {
        this.setState({
            type:2,
            addOrEditPopVisible: true,
            addOrEditPopTitle:'模板2新建',
            addOrEditType:'add',
        });
    };
    //状态编辑弹出
    addModelPop3= (e) => {
        this.setState({
            type:3,
            addOrEditPopVisible: true,
            addOrEditPopTitle:'模板3新建',
            addOrEditType:'add',
        });
    };
    handleCancel= (e) => {
        this.setState({
            delPopVisible: false,
            addOrEditPopVisible: false,
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
    tabCallback = (key) => {
        this.setState({
            type:key
        })
        this.getLists();
    };
    searchSubmit=(e)=>{
        this.getLists()
    }
    searchSelect = (e) => {
        this.setState({
            searchSelVal:e,
        })
    };
    getState = (num) => {
        let str="";
        switch(num){
            case 0:
                str='初始化';
                break;
            case 1:
                str='开始发送';
                break;
            case 2:
                str='完成';
                break;
        }
        return str;
    };
    render() {
        return (
            <div className="gutter-example" style={{ background:'#fff'}}>
                <BreadcrumbCustom first="运营管理" second="消息管理" />
                <Tabs defaultActiveKey="1" onChange={this.tabCallback}>
                    <TabPane tab="模板1" key="1">
                        <div className="gutter-box search-box">
                            <div style={{width:'600px',float:'left'}}>
                                <Form onSubmit={this.searchSubmit}>
                                    <div className="search-title">查询方式：</div>
                                    <FormItem className="search-item">
                                        <Select className="icp-selector" style={{width: '150px'}} placeholder="请选择类型" onChange={this.searchSelect}>
                                            <Option value={0}>初始化</Option>
                                            <Option value={1}>开始发送</Option>
                                            <Option value={2}>完成</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem className="search-item">
                                        <Button type="primary" className="search-btn" htmlType="submit" icon="search">查询</Button>
                                    </FormItem>
                                </Form>
                            </div>
                            <div style={{textAlign:'right'}}>
                                <Button onClick={this.addModelPop1.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="plus">创建模板1</Button>
                            </div>
                        </div>
                        <Row gutter={16}>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box" style={{ padding: '0'}}>
                                    <Card bordered={false}>
                                        <Table pagination={false} size="small" bordered columns={this.temColumns1} dataSource={this.state.tableDates} />
                                        <Pagination className="pagination-me" onChange={this.changePage} total={this.state.pageTotal} current={this.state.currentPage} defaultCurrent={1} defaultPageSize={10} hideOnSinglePage showTotal={this.showTotal} showSizeChanger showQuickJumper />
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="模板2" key="2">
                        <div className="gutter-box search-box">
                            <div style={{width:'600px',float:'left'}}>
                                <Form onSubmit={this.searchSubmit}>
                                    <div className="search-title">查询方式：</div>
                                    <FormItem className="search-item">
                                        <Select className="icp-selector" style={{width: '150px'}} placeholder="请选择类型" onChange={this.searchSelect}>
                                            <Option value={0}>初始化</Option>
                                            <Option value={1}>开始发送</Option>
                                            <Option value={2}>完成</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem className="search-item">
                                        <Button type="primary" className="search-btn" htmlType="submit" icon="search">查询</Button>
                                    </FormItem>
                                </Form>
                            </div>
                            <div style={{textAlign:'right'}}>
                                <Button onClick={this.addModelPop2.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="plus">创建模板2</Button>
                            </div>
                        </div>
                        <Row gutter={16}>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box" style={{ padding: '0'}}>
                                    <Card bordered={false}>
                                        <Table pagination={false} size="small" bordered columns={this.temColumns2} dataSource={this.state.tableDates} />
                                        <Pagination className="pagination-me" onChange={this.changePage} total={this.state.pageTotal} current={this.state.currentPage} defaultCurrent={1} defaultPageSize={10} hideOnSinglePage showTotal={this.showTotal} showSizeChanger showQuickJumper />
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="模板3" key="3">
                        <div className="gutter-box search-box">
                            <div style={{width:'600px',float:'left'}}>
                                <Form onSubmit={this.searchSubmit}>
                                    <div className="search-title">查询方式：</div>
                                    <FormItem className="search-item">
                                        <Select className="icp-selector" style={{width: '150px'}} placeholder="请选择类型" onChange={this.searchSelect}>
                                            <Option value={0}>初始化</Option>
                                            <Option value={1}>开始发送</Option>
                                            <Option value={2}>完成</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem className="search-item">
                                        <Button type="primary" className="search-btn" htmlType="submit" icon="search">查询</Button>
                                    </FormItem>
                                </Form>
                            </div>
                            <div style={{textAlign:'right'}}>
                                <Button onClick={this.addModelPop3.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="plus">创建模板3</Button>
                            </div>
                        </div>
                        <Row gutter={16}>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box" style={{ padding: '0'}}>
                                    <Card bordered={false}>
                                        <Table pagination={false} size="small" bordered columns={this.temColumns3} dataSource={this.state.tableDates} />
                                        <Pagination className="pagination-me" onChange={this.changePage} total={this.state.pageTotal} current={this.state.currentPage} defaultCurrent={1} defaultPageSize={10} hideOnSinglePage showTotal={this.showTotal} showSizeChanger showQuickJumper />
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
                <MessageEditForm  LgDates={this.state.editLgData} ref={this.saveFormRef} editData={this.state.editDate} popTitle={this.state.addOrEditPopTitle} type={this.state.type} isPop={this.state.addOrEditPopVisible} addOrEdit={this.state.addOrEditType} editPopOk={this.handleAddAndEditOk.bind(this)} editPopClose={this.handleCancel.bind(this)} />
                <Modal title="是否删除" visible={this.state.delPopVisible} cancelText="关闭" okText="确定" onOk={this.handleDelOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div style={{textAlign:'center'}}>确定要删除此游戏？</div>
                </Modal>     
            </div>
        )
    };
}

export default Message;