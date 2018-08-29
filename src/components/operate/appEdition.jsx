/**
 * app版本管理
 */
import React ,{ Component } from 'react';
import { Row, Col, Card,Table, Button,Modal,Pagination,message,Popover} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import AppEditionEditForm from './appEditionEdit';
import {getTimes} from '../../utils/index';
import {getLanguage,getLanguageNameById,getDataObjsByLg} from '../../axios/system';
import {getVersions,addVersions,updateVersions,delVersions} from '../../action/operate';

class StartPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            tableDates:[],
            currentDateId:0,
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'新建',
            editDate:{},
            addOrEditPopVisible: false,//状态编辑弹窗
            delPopVisible: false,//删除弹窗
            size:10,
            currentPage:1,//当前页
            pageTotal:0,//共有数据条数
            editLgData:[],
        };
        this.columns = [{
            title: '编号',
            width:'100px',
            dataIndex: 'codeList', 
        }, {
            title: '发布时间',
            width:'150px',
            dataIndex: 'putTimeList',
        }, {
            title: '设备终端',
            width:'100px',
            dataIndex: 'shebeiList',
        }, {
            title: '升级方式',
            width:'150px',
            dataIndex: 'upgradesTypeList',
        }, {
            title: '显示版本号',
            width:'150px',
            dataIndex: 'versionList',
        }, {
            title: '更新弹窗标题',
            width:'120px',
            key: 'titleList',
            dataIndex: 'titleList',
            render:(val,record,index)=>{
                const data = val?getDataObjsByLg(JSON.parse(val)):[];
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
                        <Popover title={"更新弹窗标题"}
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
            title: '更新内容',
            width:'120px',
            key: 'conList',
            dataIndex: 'conList',
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
                        <Popover title={"更新内容"}
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
            title: '下载地址',
            width:'150px',
            dataIndex: 'urlList',
        }, {
            title: '状态',
            width:'150px',
            dataIndex: 'stateList',
        }, {
            title: '操作',
            width:'120px',
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
        console.log(sendData);
        getVersions({sendData}).then((res)=>{ 
            console.log(res);
            if(res.code == 0){
                res.dataInfo.list.forEach(function(v,i){
                    v['key'] = v['appVersionId'];
                    v['codeList'] = v['appVersionId'];
                    v['putTimeList'] = getTimes(v['createTime'],false,1);
                    v['shebeiList'] = v['versionType']==100?'IOS':'Android';
                    v['upgradesTypeList'] = v['versionState']==1?'用户选择升级 ':'强制升级';
                    v['versionList'] = v['versionCode'];
                    v['titleList'] = v['versionName'];
                    v['conList'] = v['versionDesc']?JSON.parse(v['versionDesc']):'';
                    v['urlList'] = v['appUrl'];
                    v['stateList'] = v['state']===1?'启用':'未启用';
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
                sendData['fileName']='上传文件';//【未名字段】
            let desc = {};
            let name = {};
            if(values.lgDatas){
                values.lgDatas.forEach(function(v,i){
                    desc[v.versionLanguage]=v.versionDesc;
                    name[v.versionLanguage]=v.versionName;
                })
            }
            sendData['versionDesc'] = JSON.stringify(desc);
            sendData['versionName'] = JSON.stringify(name);
            sendData['versionState'] = values['versionState'];
            sendData['versionType'] = values['versionType'];
            sendData['versionCode'] = values['versionCode'];
            sendData['appUrl'] = values['appUrl'];
            sendData['state'] = values['state'];
            console.log(sendData)
            
            if(this.state.addOrEditType==='add'){//新建
                addVersions(sendData).then((res)=>{
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
                updateVersions(sendData).then((res)=>{
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
                
        delVersions(sendData).then((res)=>{
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
     //编辑弹出
    editPop= (e) => {
        console.log(e)
        let lgData=[];
        let names =  e.versionName,
            desc = e.versionDesc;
        if(names && desc){
            names = JSON.parse(names);
            desc = JSON.parse(desc);
            getLanguage().forEach(function(v,i){
                if(names[v.languageId]){
                    const val = {
                        key: i,
                        versionLanguage:v['languageId'],
                        lgName:getLanguageNameById(v['languageId']),
                        versionName:names[v.languageId],
                        versionDesc: desc[v.languageId],  
                    }
                    lgData.push(val)
                }
                
            })
        }
        
        this.setState({
            currentDateId:e.key,
            addOrEditType: 'edit',//详情弹窗
            addOrEditPopTitle:'编辑',
            addOrEditPopVisible: true,//状态编辑弹窗
            editDate:e,
            editLgData:lgData,
        });
        console.log(lgData)
    };
    
    //删除弹窗
    delPop= (e) => {
        this.setState({
            delPopVisible: true,
            currentDateId:e.key
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
    }
    showTotal=(total)=> {
        return `共有 ${total} 条`;
    }
    saveFormRef = (form) => {
        this.form = form;
    };
    render() {
        return (
            <div className="gutter-example" style={{ background:'#fff'}}>
                <BreadcrumbCustom first="运营管理" second="app版本管理" />
                <div className="gutter-box search-box" style={{textAlign:'right'}}>
                    <Button onClick={this.addPop.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="plus">新建</Button>
                </div>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box" style={{ padding: '0'}}>
                            <Card bordered={false}>
                                <Table pagination={false} size="small" bordered columns={this.columns} dataSource={this.state.tableDates} />
                                <Pagination className="pagination-me" onChange={this.changePage} total={this.state.pageTotal}  current={this.state.currentPage} defaultCurrent={1} defaultPageSize={10} hideOnSinglePage showTotal={this.showTotal} showSizeChanger showQuickJumper />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <AppEditionEditForm LgDates={this.state.editLgData} ref={this.saveFormRef} editData={this.state.editDate} isType={this.state.addOrEditType} title={this.state.addOrEditPopTitle} isPop={this.state.addOrEditPopVisible} editPopOk={this.handleAddAndEditOk.bind(this)} editPopClose={this.handleCancel.bind(this)} />
                <Modal title="是否删除" visible={this.state.delPopVisible} cancelText="关闭" okText="确定" onOk={this.handleDelOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div>是否要删除此条信息吗？</div>
                </Modal>
            </div>
        )
    };
}

export default StartPage;