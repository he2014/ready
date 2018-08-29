/**
 * 邀请奖励管理
 */
import React ,{ Component } from 'react';
import { Row, Col, Card,Table,Button,Modal,Pagination,message} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import InvitingAwardsEditForm from './invitingAwardsEdit';
import {getInvitLists,addInvitSave,updateInvitSave,deleteInvitSave} from '../../action/operate';

const data = [{
    key: '54324',
    codeList:'54324',
    invitingNumList:10,
    zuanNumList:20,
},{
    key: '54325',
    codeList:'54325',
    invitingNumList:10,
    zuanNumList:20,
},{
    key: '54326',
    codeList:'54326',
    invitingNumList:10,
    zuanNumList:20,
}];

class InvitingAwards extends Component {
    constructor(props){
        super(props)
        this.state = {
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'新建',
            addOrEditPopVisible: false,//状态编辑弹窗
            delPopVisible: false,//删除弹窗
            currentPage:1,//当前页
            pageTotal:0,//共有数据条数
            size:10,
            tableDates:[],
            currentDateId:0,
            editDate:{},
        };
        this.columns = [{
            title: '编号',
            width:'100px',
            dataIndex: 'codeList', 
        }, {
            title: '邀请人数',
            width:'100px',
            dataIndex: 'invitingNumList',
        }, {
            title: '对应奖励钻石数',
            width:'120px',
            dataIndex: 'zuanNumList',
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
    getLists=()=>{  
        this.state.tableDates = [];
        let sendData = {
            no: this.state.currentPage,
            size: this.state.size
        };

        console.log(sendData);
        getInvitLists({sendData}).then((res)=>{ 
            console.log(res);
            if(res.code == 0){
                res.dataInfo.list.forEach(function(v,i){
                    v['key'] = v['appVersionId'];
                    v['codeList'] = v['appVersionId'];
                    v['invitingNumList'] = v['createTime'];
                    v['zuanNumList'] = v['versionType']==100?'IOS':'Android';

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
            console.log(values)
            let sendData={};

            console.log(sendData)
            
            if(this.state.addOrEditType==='add'){//新建
                addInvitSave(sendData).then((res)=>{
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
                updateInvitSave(sendData).then((res)=>{
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
                
        deleteInvitSave(sendData).then((res)=>{
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
            editDate:{},
        });
    };
     //编辑弹出
    editPop= (e) => {
        e['invitNum'] = 1;
        e['zuanNum']=10;
        this.setState({
            addOrEditType: 'edit',//详情弹窗
            addOrEditPopTitle:'编辑',
            addOrEditPopVisible: true,//状态编辑弹窗
            currentDateId:e.key,
            editDate:e,
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
                <BreadcrumbCustom first="运营管理" second="邀请奖励管理" />
                <div className="gutter-box search-box" style={{textAlign:'right'}}>
                    <Button onClick={this.addPop.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="plus">新建</Button>
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
                <InvitingAwardsEditForm ref={this.saveFormRef} editData={this.state.editDate} isType={this.state.addOrEditType} title={this.state.addOrEditPopTitle} isPop={this.state.addOrEditPopVisible} editPopOk={this.handleAddAndEditOk.bind(this)} editPopClose={this.handleCancel.bind(this)} />
                <Modal title="是否删除" visible={this.state.delPopVisible} cancelText="关闭" okText="确定" onOk={this.handleDelOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div>是否要删除此条信息吗？</div>
                </Modal>
            </div>
        )
    };
}

export default InvitingAwards;