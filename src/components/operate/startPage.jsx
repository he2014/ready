/**
 * 启动页管理
 */
import React ,{ Component } from 'react';
import { Row, Col, Card,Table, Button,Modal,Pagination,message,Popover} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import StartPageEditForm from './startPageEdit';
import {getTimes,getNumTimes} from '../../utils/index';
import {getStartLists,addStartSave,updateStartSave,deleteStartSave,publishStart} from '../../action/operate';
import {getLanguage,getLanguageNameById,getDataObjsByLg} from '../../axios/system';

class StartPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            tableDates:[],
            currentDateId:0,
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'新建',
            addOrEditPopVisible: false,//状态编辑弹窗
            delPopVisible: false,//删除弹窗
            size:10,
            currentPage:1,//当前页
            pageTotal:90,//共有数据条数
            editLgData:[],
            editDate:{},
        };
        this.columns = [{
            title: '编号',
            width:'100px',
            dataIndex: 'codeList', 
        }, {
            title: '图片',
            width:'100px',
            dataIndex: 'imgList',
            key: 'imgList',
            render:(val,record,index)=>{
                const data = val?getDataObjsByLg(val):'';
                const descColumns = [{
                    title: '语言',
                    width:'100px',
                    dataIndex: 'languageName', 
                }, {
                    title: '图片',
                    width:'150px',
                    dataIndex: 'content',
                    key: 'content',
                    render:(val2,record2,index2)=>{
                        return(
                            <img className="list-img" src={val2}/>
                        )              
                    }
                }]
                return(
                    <div className='' >
                        <Popover title={"图片列表"}
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
            title: '开始时间',
            width:'150px',
            dataIndex: 'startTimeList',
        }, {
            title: '结束时间',
            width:'150px',
            dataIndex: 'endTimeList',
        }, {
            title: '链接类型',
            width:'120px',
            dataIndex: 'urlTypeList',
        }, {
            title: '链接',
            width:'150px',
            dataIndex: 'urlList',
        }, {
            title: '状态',
            width:'150px',
            dataIndex: 'stateList',
        }, {
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
        console.log(sendData);
        getStartLists({sendData}).then((res)=>{ 
            console.log(res);
            if(res.code == 0){
                res.dataInfo.list.forEach(function(v,i){
                    v['key'] = v['id']; 
                    v['codeList'] = v['id'];
                    v['imgList'] = v['image'];
                    v['startTimeList'] = getTimes(v['startTime'],false,1);
                    v['endTimeList'] = getTimes(v['endTime'],false,1);
                    v['urlTypeList'] = v['type']==1?'打开网页':'无点击';
                    v['urlList'] = v['url'];
                    v['stateList'] = v['state']===1?'启用':'未启用';
                    this.state.tableDates.push(v)
                },this)
                this.setState({
                    tableDates:this.state.tableDates,
                    currentPage:res.page,
                    pageTotal:res.total,
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
            console.log("values------------------------------")
            console.log(values)
            if (err) {
              return;
            }
            let sendData={};
            let imgs = {};
            let name = {};
            if(values.lgDatas){
                values.lgDatas.forEach(function(v,i){
                    imgs[v.versionLanguage]=v.imgs;
                })
            }
            sendData['image'] = imgs;
            sendData['startTime'] =  getNumTimes(values['startAndEndTime'][0]["_d"]);
            sendData['endTime'] =  getNumTimes(values['startAndEndTime'][0]["_d"]) ;
            sendData['url'] = values['url'];
            sendData['type'] = values['urlType'];
            console.log(sendData)
            
            if(this.state.addOrEditType==='add'){//新建
                addStartSave(sendData).then((res)=>{
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
                updateStartSave(sendData).then((res)=>{
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
            "id":this.state.currentDateId
        }        
        deleteStartSave(sendData).then((res)=>{
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
        let lgData=[];
        let images =  e.image;
        if(images){
            getLanguage().forEach(function(v,i){
                if(images[v.languageId]){
                    const val = {
                        key: i,
                        versionLanguage:v['languageId'],
                        lgName:getLanguageNameById(v['languageId']),
                        lgImg:images[v.languageId], 
                    }
                    lgData.push(val)
                }
                
            })
        }
        console.log("---------------------------------")
        
        console.log(e)
        this.setState({
            currentDateId:e.key,
            addOrEditType: 'edit',//详情弹窗
            addOrEditPopTitle:'编辑',
            addOrEditPopVisible: true,//状态编辑弹窗
            editDate:e,
            editLgData:lgData,
        });
    };

    //删除弹窗
    delPop= (e) => {
        this.setState({
            currentDateId:e.key,
            delPopVisible: true,
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
    render() {
        return (
            <div className="gutter-example" style={{ background:'#fff'}}>
                <BreadcrumbCustom first="运营管理" second="启动页管理" />
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
                <StartPageEditForm LgDates={this.state.editLgData} ref={this.saveFormRef} editData={this.state.editDate} isType={this.state.addOrEditType} title={this.state.addOrEditPopTitle} isPop={this.state.addOrEditPopVisible} editPopOk={this.handleAddAndEditOk.bind(this)} editPopClose={this.handleCancel.bind(this)} />
                <Modal title="是否删除" visible={this.state.delPopVisible} cancelText="关闭" okText="确定" onOk={this.handleDelOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div>是否要删除此条信息吗？</div>
                </Modal>
            </div>
        )
    };
}

export default StartPage;