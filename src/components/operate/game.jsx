/**
 * 用户管理
 */
import React ,{ Component } from 'react';
import { Tabs, Row, Col, Card,Table, Button,Modal,Pagination,message,Popover} from 'antd';
import * as config  from '../../axios/config';
import BreadcrumbCustom from '../BreadcrumbCustom';
import GameEditForm from './gameEdit';
import {getTimes} from '../../utils/index';
import {getLanguage,getLanguageNameById,getDataObjsByLg} from '../../axios/system';
import {getGameLists,addGameSave,updateGameSave,deleteGameSave,publishGame} from '../../action/operate';

const TabPane = Tabs.TabPane;
function callback(key) {
  console.log(key);
}
class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'新建',
            addOrEditPopVisible: false,//状态编辑弹窗
            isPk:false,
            isPay:false,
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
        };
        this.PKcolumns = [{
            title: '编号',
            width:'80px',
            dataIndex: 'codeList', 
        }, {
            title: '任务标题',
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
            title: '任务内容',
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
            title: '游戏海报',
            width:'120px',
            dataIndex: 'picList',
            key: 'picList',
            render:(val2,record2,index2)=>{
                return(
                    <img className="list-img" src={val2}/>
                )              
            }
        }, {
            title: '游戏icon',
            width:'100px',
            dataIndex: 'iconList',
            key: 'iconList',
            render:(val2,record2,index2)=>{
                return(
                    <img className="list-img" src={val2}/>
                )              
            }
        }, {
            title: '游戏链接',
            dataIndex: 'urlList',
        }, {
            title: '入场金币数(败扣除金币数)',
            width:'170px',
            dataIndex: 'jionNumList',
        }, {
            title: '胜利奖励金币数',
            width:'110px',
            dataIndex: 'winNumList',
        }, {
            title: '列表排序',
            width:'80px',
            dataIndex: 'sortList',
        }, {
            title: '游戏状态',
            width:'80px',
            dataIndex: 'stateList',
        },{
            title: '操作',
            width:'120px',
            key: 'operatList',
            render: (text, record ,index) => (  //塞入内容
                <div className="list-btn">
                　　<a onClick={this.editPkPop.bind(this,text)}>编辑</a>
                    <a onClick={this.delPkPop.bind(this,text)}>删除</a>
                </div>
            ),
        }];
        this.payColumns = [{
            title: '编号',
            width:'80px',
            dataIndex: 'codeList', 
        }, {
            title: '任务标题',
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
            title: '游戏海报',
            width:'120px',
            dataIndex: 'picList',
            render:(val2,record2,index2)=>{
                return(
                    <img className="list-img" src={val2}/>
                )              
            }
        }, {
            title: '游戏icon',
            width:'100px',
            dataIndex: 'iconList',
            render:(val2,record2,index2)=>{
                return(
                    <img className="list-img" src={val2}/>
                )              
            }
        }, {
            title: '游戏链接',
            dataIndex: 'urlList',
        }, {
            title: '入场钻石数',
            width:'170px',
            dataIndex: 'jionNumList',
        }, {
            title: '列表排序',
            width:'80px',
            dataIndex: 'sortList',
        }, {
            title: '游戏状态',
            width:'80px',
            dataIndex: 'stateList',
        },{
            title: '操作',
            width:'120px',
            key: 'operatList',
            render: (text, record ,index) => (  //塞入内容
                <div className="list-btn">
                　　<a onClick={this.editPayPop.bind(this,text)}>编辑</a>
                    <a onClick={this.delPayPop.bind(this,text)}>删除</a>
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
        if(type==1){//条件查询
            sendData['type'] = this.state.searchSelVal;
        }
        console.log(sendData);
        getGameLists({sendData}).then((res)=>{ 
            console.log(res);
            if(res.code == 0){
                res.dataInfo.list.forEach(function(v,i){
                    v['key'] = v['gameId'];
                    v['codeList'] = v['gameId'];
                    v['nameList'] = v['gameName'];
                    v['picList'] = v['gameImage'];
                    v['iconList'] = v['gameIcon'];
                    v['infoList'] = v['gameInstruction'];
                    v['urlList'] = v['gameUrl'];
                    v['jionNumList'] = v['versionDesc']?JSON.parse(v['versionDesc']):'';
                    v['winNumList'] = v['appUrl'];
                    v['sortList'] = getTimes(v['createTime'],false,1);
                    v['stateList'] = v['state']===1?'已生效':'未生效';
                    if(this.state.isPk){
                        this.state.pkData.push(v)
                    }else if(this.state.isPay){
                        this.state.payData.push(v)
                    }    
                    this.state.tableDates.push(v)              
                },this)
                this.setState({
                    tableDates:this.state.tableDates,
                    currentPage:res.page,
                    pageTotal:res.total,
                    pkData:this.state.pkData,
                    payData:this.state.payData,
                })
            }
        }).catch((error)=>{
            console.log('roles error!',error)
        });

    };
    
    handleAddAndEditOk= (e) => {
        const form = this.form;
        form.validateFields((err, values) => {
            console.log(values)
            if (err) {
              return;
            }
            let sendData={};
            let desc = {},
                title = {};
            if(values.lgDatas){
                values.lgDatas.forEach(function(v,i){
                    desc[v.lgId]=v.content;
                    title[v.lgId]=v.title;
                })
            }
            sendData['content'] = JSON.stringify(desc);
            sendData['game_name'] = JSON.stringify(title);
            sendData['game_ticket'] = values.posterUrl;
            sendData['game_icon'] = values.iconUrl;
            sendData['game_type'] = this.state.isPk?'pk':'pay';//游戏类型
            sendData['state'] = values['state'];
            console.log(sendData)
            if(this.state.isPk){

            }else if(this.state.isPay){

            }
            if(this.state.addOrEditType==='add'){//新建
                addGameSave(sendData).then((res)=>{
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
                updateGameSave(sendData).then((res)=>{
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
            "game_id":this.state.currentDateId
        }
                
        deleteGameSave(sendData).then((res)=>{
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
    delPkPop= (e) => {
        this.setState({
            isPk:true,
            isPay:false,
            delPopVisible: true,
        });
    };
    delPayPop= (e) => {
        this.setState({
            isPk:false,
            isPay:true,
            delPopVisible: true,
        });
    };
    handleDelOk= (e) => {
        this.setState({
            delPopVisible: false,
        });
    };
    
    //编辑弹出
    editPkPop= (e) => {
        let lgData=[];
        let titles =  e.nameList,
            pics = e.picList,
            icons = e.iconList,
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
                    }
                    lgData.push(val)
                }
                
            })
        }
        console.log(e)

        this.setState({
            isPk:true,
            isPay:false,
            addOrEditPopVisible: true,
            addOrEditPopTitle:'Pk编辑',
            addOrEditType:'edit',
            currentDateId:e.key,
            editDate:e,
            editLgData:lgData,
        });
    };
    editPayPop= (e) => {
        let lgData=[];
        let titles =  e.nameList,
            pics = e.picList,
            icons = e.iconList,
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
                        posterUrlPath: pics['posterUrl'], 
                        iconUrlPath: icons['iconUrl'],
                        posterUrl: config.MOCK_AUTH_IMAGE+pics['posterUrl'], 
                        iconUrl: config.MOCK_AUTH_IMAGE+icons['iconUrl'],  
                    }
                    lgData.push(val)
                }
                
            })
        }
        this.setState({
            isPk:false,
            isPay:true,
            addOrEditPopVisible: true,
            addOrEditPopTitle:'付费编辑',
            addOrEditType:'edit',
            currentDateId:e.key,
            editDate:e,
            editLgData:lgData,
        });
    };
    addPkPop= (e) => {
        this.setState({
            isPk:true,
            isPay:false,
            addOrEditPopVisible: true,
            addOrEditPopTitle:'Pk新建',
            addOrEditType:'add',
        });
    };
    //状态编辑弹出
    addPayPop= (e) => {
        this.setState({
            isPk:false,
            isPay:true,
            addOrEditPopVisible: true,
            addOrEditPopTitle:'付费新建',
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
    render() {
        return (
            <div className="gutter-example" style={{ background:'#fff'}}>
                <BreadcrumbCustom first="运营管理" second="游戏配置管理" />
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="PK竞技场游戏" key="1">
                        <div className="gutter-box search-box" style={{textAlign:'right'}}>
                            <Button onClick={this.addPkPop.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="plus">创建游戏</Button>
                        </div>
                        <Row gutter={16}>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box" style={{ padding: '0'}}>
                                    <Card bordered={false}>
                                        <Table pagination={false} size="small" bordered columns={this.PKcolumns} dataSource={this.state.pkData} />
                                        <Pagination className="pagination-me" onChange={this.changePage} total={this.state.pageTotal} current={this.state.currentPage} defaultCurrent={1} defaultPageSize={10} hideOnSinglePage showTotal={this.showTotal} showSizeChanger showQuickJumper />
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="付费场游戏" key="2">
                        <div className="gutter-box search-box" style={{textAlign:'right'}}>
                            <Button onClick={this.addPayPop.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="plus">创建游戏</Button>
                        </div>
                        <Row gutter={16}>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box" style={{ padding: '0'}}>
                                    <Card bordered={false}>
                                        <Table pagination={false} size="small" bordered columns={this.payColumns} dataSource={this.state.payData} />
                                        <Pagination className="pagination-me" onChange={this.changePage} total={this.state.pageTotal} current={this.state.currentPage} defaultCurrent={1} defaultPageSize={10} hideOnSinglePage showTotal={this.showTotal} showSizeChanger showQuickJumper />
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
                <GameEditForm  LgDates={this.state.editLgData} ref={this.saveFormRef} editData={this.state.editDate} popTitle={this.state.addOrEditPopTitle} isPk={this.state.isPk} isPay={this.state.isPay} isPop={this.state.addOrEditPopVisible} addOrEdit={this.state.addOrEditType} editPopOk={this.handleAddAndEditOk.bind(this)} editPopClose={this.handleCancel.bind(this)} />
                <Modal title="是否删除" visible={this.state.delPopVisible} cancelText="关闭" okText="确定" onOk={this.handleDelOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div style={{textAlign:'center'}}>确定要删除此游戏？</div>
                </Modal>     
            </div>
        )
    };
}

export default Game;