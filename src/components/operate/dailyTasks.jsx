/**
 * 日常任务管理
 */
import React ,{ Component } from 'react';
import { Row, Col, Card,Table,Form,Select,Button,Modal,Pagination,message,Popover} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import DailyTaskEditForm from './dailyTaskEdit';
import DailyTaskSetForm from './dailyTaskSet';
import {getTimes} from '../../utils/index';
import {getLanguage,getLanguageNameById,getDataObjsByLg} from '../../axios/system';
import {getDailyTaskLists,addDailySave,updateDailySave,deleteDailySave,addDailySetSave,getDailySetInfo} from '../../action/operate';

const FormItem = Form.Item;
const Option = Select.Option;
const data = [{
    key: '54324',
    codeList:'54324',
    eventsTitleList:{100:"1111",300:"4000"},
    eventsConList: {100:"aaaa",300:"bbbbb"}, 
    eventsList: '成功邀请N个好友', 
    eventsNumList:'10',
    moneyTypeList:'钻石',
    rewardGoldList:'50',
    indexList:'999',
    effectTimeList:'2018-10-11 00:00:00',
    stateList:'已生效',  
},{
    key: '54325',
    codeList:'54324',
    eventsTitleList:{100:"1111",300:"4000"},
    eventsConList: {100:"aaaa",300:"bbbbb"},  
    eventsList: '成功邀请N个好友', 
    eventsNumList:'10',
    moneyTypeList:'钻石',    
    rewardGoldList:'50',
    indexList:'999',
    effectTimeList:'2018-10-11 00:00:00',
    stateList:'已生效',
},{
    key: '54326',
    codeList:'54324',
    eventsTitleList:{100:"1111",300:"4000"},
    eventsConList: {100:"aaaa",300:"bbbbb"},
    eventsList: '成功邀请N个好友', 
    eventsNumList:'10',
    moneyTypeList:'钻石',
    rewardGoldList:'50',
    indexList:'999',
    effectTimeList:'2018-10-11 00:00:00',
    stateList:'已生效',
}];

class DailyTasks extends Component {
    constructor(props){
        super(props)
        this.state = {
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'新建',
            addOrEditPopVisible: false,//状态编辑弹窗
            delPopVisible: false,//删除弹窗
            infoPopVisible:false,
            setPopVisible:false,//每日签到配置
            currentPage:1,//当前页
            pageTotal:90,//共有数据条数
            size:10,
            editLgData:[],
            tableDates:[],
            currentDateId:0,
            editDate:{},
            searchSelVal:0,
            dayInfoData:{},
        };
        this.columns = [{
            title: '编号',
            width:'100px',
            dataIndex: 'codeList', 
        }, {
            title: '任务事件',
            width:'150px',
            dataIndex: 'eventsList',
        }, {
            title: '需完成任务事件个数',
            width:'150px',
            dataIndex: 'eventsNumList',
        }, {
            title: '列表排序',
            width:'150px',
            dataIndex: 'indexList',
        }, {
            title: '任务标题',
            width:'100px',
            dataIndex: 'eventsTitleList',
            render:(val,record,index)=>{
                const data = getDataObjsByLg(val);
                console.log(val)
                console.log(data)
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
            title: '任务内容',
            dataIndex: 'eventsConList',
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
            title: '币种',
            width:'100px',
            dataIndex: 'moneyTypeList',
        }, {
            title: '奖励金币数',
            width:'150px',
            dataIndex: 'rewardGoldList',
        }, {
            title: '生效时间',
            width:'150px',
            dataIndex: 'effectTimeList',
        }, {
            title: '状态',
            width:'100px',
            dataIndex: 'stateList',
        }, {
            title: '操作',
            key: 'operatList',
            width:'120px',
            render: (text, record ,index) => (  //塞入内容
                <div className="list-btn">
                    <a onClick={this.editPop.bind(this,text)}>编辑</a>
                    <a onClick={this.delPop.bind(this,text)}>删除</a>
                </div>
            ),
        }];
        this.getLists()
    }
    //获取列表数据
    getLists=(type)=>{  
        this.state.tableDates = [];
        let sendData = {
            no: this.state.currentPage,
            size: this.state.size
        };
        if(type==1){//条件查询
            sendData['type'] = this.state.searchSelVal;
        }
        console.log(sendData);
        getDailyTaskLists({sendData}).then((res)=>{ 
            console.log(res);
            if(res.code == 0){
                res.dataInfo.list.forEach(function(v,i){
                    v['key'] = v['appVersionId'];
                    v['codeList'] = v['appVersionId'];
                    v['eventsTitleList'] = v['createTime'];
                    v['eventsConList'] = v['versionType']==100?'IOS':'Android';
                    v['eventsList'] = v['versionState']==1?'用户选择升级 ':'强制升级';
                    v['eventsNumList'] = v['versionCode'];
                    v['moneyTypeList'] = v['versionName'];
                    v['rewardGoldList'] = v['versionDesc']?JSON.parse(v['versionDesc']):'';
                    v['indexList'] = v['appUrl'];
                    v['effectTimeList'] = getTimes(v['createTime'],false,1);
                    v['stateList'] = v['state']===1?'已生效':'未生效';
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
    
    handleAddAndEditOk= (e) => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
              return;
            }
            let sendData={};
            let desc = {};
            let title = {};
            if(values.lgDatas){
                values.lgDatas.forEach(function(v,i){
                    desc[v.versionLanguage]=v.versionDesc;
                    title[v.versionLanguage]=v.versionName;
                })
            }
            sendData['content'] = JSON.stringify(desc);
            sendData['title'] = JSON.stringify(title);
            sendData['versionState'] = values['versionState'];
            sendData['versionType'] = values['versionType'];
            sendData['versionCode'] = values['versionCode'];
            sendData['appUrl'] = values['appUrl'];
            sendData['state'] = values['state'];
            console.log(sendData)
            
            if(this.state.addOrEditType==='add'){//新建
                addDailySave(sendData).then((res)=>{
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
                updateDailySave(sendData).then((res)=>{
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
    getSetInfo=()=>{
         getDailySetInfo({}).then((res)=>{ 
            console.log(res);
            if(res.code == 0){
                this.setState({
                    infoPopVisible: true,
                    dayInfoData:res.dataInfo,
                });

            }
        }).catch((error)=>{
            console.log('roles error!',error)
        });  
    };
    //每日签到详情
    infoPop= (e) => {
        this.getSetInfo();
        this.setState({
            infoPopVisible: true
        });
             
    };
    //每日签到保存
    handleSetOk= (e) => {
        const form = this.dayForm;
        form.validateFields((err, values) => {
            if (err) {
              return;
            }
            let sendData={};
            console.log(sendData)

            addDailySetSave(sendData).then((res)=>{
                if(res.code == 0){
                    message.success('保存成功',2);
                    this.getLists();
                    this.setState({
                        setPopVisible: false,
                    });
                }else{
                     message.error('保存失败',2);
                }
            }).catch((error) => {
                message.error('保存失败',2);
            })
        });
        
    };
    //删除
    handleDelOk= (e) => {
        let sendData = {
            "appVersionId":this.state.currentDateId
        }
                
        deleteDailySave(sendData).then((res)=>{
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
     //每日签到配置
    setPop= (e) => {
        this.getSetInfo();
        this.setState({
            setPopVisible: true,
        });
    };

    //新建弹窗
    addPop= (e) => {
        this.setState({
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'新建',
            addOrEditPopVisible: true,//状态编辑弹窗
            editLgData:[],
            editDate:{},
        });
    };
    handleAddAndEditOk= (e) => {
        this.setState({
            addOrEditPopVisible: false,
        });
    };
    //删除弹窗
    delPop= (e) => {
        this.setState({
            currentDateId:e.key,
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
        let titles =  e.eventsTitleList,
            content = e.eventsConList;
        if(titles && content){
            titles = titles;
            content = content;
            getLanguage().forEach(function(v,i){
                if(titles[v.languageId]){
                    const val = {
                        key: i,
                        versionLanguage:v['languageId'],
                        lgName:getLanguageNameById(v['languageId']),
                        title:titles[v.languageId],
                        content: content[v.languageId],  
                    }
                    lgData.push(val)
                }
                
            })
        }
        console.log(e)
        e['enents'] = 1;
        e['stateList']=1;
        e['moneyType']=1;
        e['createTime']=1534488291440;
        
        this.setState({
            addOrEditType: 'edit',//详情弹窗
            addOrEditPopTitle:'编辑',
            addOrEditPopVisible: true,//状态编辑弹窗
            currentDateId:e.key,
            editDate:e,
            editLgData:lgData,
        });
    };

    handleCancel= (e) => {
        this.setState({
            delPopVisible: false,
            addOrEditPopVisible: false,
            setPopVisible:false,
            infoPopVisible: false,
        });
    };
    changePage = (e) => {
        this.setState({
            currentPage:e
        })
    };
    searchSelect = (e) => {
        this.setState({
            searchSelVal:e
        })
    };
    searchSubmit = (e) => {
        this.getLists(1)
    };
    showTotal=(total)=> {
        return `共有 ${total} 条`;
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    saveDayFormRef = (form) => {
        this.dayForm = form;
    };
    render() {
        return (
            <div className="gutter-example" style={{ background:'#fff'}}>
                <BreadcrumbCustom first="运营管理" second="日常任务管理" />
                <div className="gutter-box search-box" >
                    <div style={{width:'600px',float:'left'}}>
                        <Form onSubmit={this.searchSubmit}>
                            <div className="search-title">查询方式：</div>
                            <FormItem className="search-item">
                                <Select className="icp-selector" style={{width: '150px'}} placeholder="请选择状态" onChange={this.searchSelect}>
                                    <Option value="all">全部</Option>
                                    <Option value="1">已生效</Option>
                                    <Option value="2">未生效</Option>
                                </Select>
                            </FormItem>
                            <FormItem className="search-item">
                                <Button type="primary" className="search-btn" htmlType="submit" icon="search">查询</Button>
                            </FormItem>
                        </Form>
                    </div>
                    <div style={{textAlign:'right'}}>
                        <Button onClick={this.addPop.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="plus">创建任务</Button>
                        <Button onClick={this.setPop.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="plus">配置每日签到</Button>
                        <Button onClick={this.infoPop.bind(this)} type="primary" className="new-btn" htmlType="submit">查看每日签到</Button>
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
                <DailyTaskEditForm LgDates={this.state.editLgData} ref={this.saveFormRef} editData={this.state.editDate} isType={this.state.addOrEditType} title={this.state.addOrEditPopTitle} isPop={this.state.addOrEditPopVisible} editPopOk={this.handleAddAndEditOk.bind(this)} editPopClose={this.handleCancel.bind(this)} />
                <DailyTaskSetForm  ref={this.saveDayFormRef} editData={this.state.dayInfoData} isPop={this.state.setPopVisible} editPopOk={this.handleSetOk.bind(this)} editPopClose={this.handleCancel.bind(this)} />
                <Modal title="是否删除" visible={this.state.delPopVisible} cancelText="关闭" okText="确定" onOk={this.handleDelOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div style={{textAlign:'center'}}>删除任务，当天不生效，</div>
                    <div style={{textAlign:'center'}}>第二天UTC时间0点才生效，确定删除吗？</div>
                </Modal>
                <Modal className="info-modal" style={{width:'360px'}} title="每日签到配置查看" visible={this.state.infoPopVisible} cancelText="关闭" onCancel={this.handleCancel} okButtonProps="hidden">
                    <Row className="info-row">
                        <Col span="8" align="right">选择起始时间：</Col>
                        <Col span="16">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">选择币种：</Col>
                        <Col span="16">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">第1天奖励金币数：</Col>
                        <Col span="16">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">第2天奖励金币数：</Col>
                        <Col span="16">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">第3天奖励金币数：</Col>
                        <Col span="16">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">第4天奖励金币数：</Col>
                        <Col span="16">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">第5天奖励金币数：</Col>
                        <Col span="16">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">第6天奖励金币数：</Col>
                        <Col span="16">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">第7天奖励金币数：</Col>
                        <Col span="16">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="8" align="right">生效时间：</Col>
                        <Col span="16">222</Col>
                    </Row>
                </Modal>
            </div>
        )
    };
}

export default DailyTasks;