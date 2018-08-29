/**
 * 用户管理
 */
import React ,{ Component } from 'react';
import { Row, Col, Card,Table,Form,Select,Input,Button,Modal,Pagination,message} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import UserEditForm from './userEdit';
import {getUsers,changeUserName,changeBday,changeUserHeaderPic} from '../../action/userManage';
import {getTimes,getNumTimes,getTimesByDate} from '../../utils/index';
import * as config  from '../../axios/config';

const FormItem = Form.Item;
const Option = Select.Option;

class UserLists extends Component {
    constructor(props){
        super(props)
        this.state = {
            tableDates:[],
            searchPlaceholder:'',//查询输入框提示信息
            searchType:0,
            searchVal:'',
            infoPopVisible: false,//详情弹窗
            editPopVisible: false,//状态编辑弹窗
            currentPage:1,//当前页
            size:10,//每页条数
            pageTotal:0,//共有数据条数
            infoData:{}
        };
        this.columns = [{
            title: '用户ID',
            width:'100px',
            dataIndex: 'userIdList', 
        }, {
            title: '头像',
            width:'100px',
            dataIndex: 'headPicList',
            render:(val2,record2,index2)=>{
                return(
                    <img className="list-img" src={val2}/>
                )              
            }
        }, {
            title: '昵称',
            width:'120px',
            dataIndex: 'nnList',
        }, {
            title: '注册方式',
            width:'100px',
            dataIndex: 'registerList',
        }, {
            title: '封禁状态',
            width:'120px',
            dataIndex: 'stateList',
        }, {
            title: '注册时间',
            width:'150px',
            dataIndex: 'createtimeList',
        }, {
            title: '操作',
            key: 'operatList',
            render: (text, record ,index) => (  //塞入内容
                <div className="list-btn">
                　　<a onClick={this.infoPop.bind(this,text)}>查看</a>
                　　<a onClick={this.editPop.bind(this,text)}>编辑</a>
                </div>
            ),
        }];
        // this.getLists('lists');
       
    }
    
    //获取列表数据
    getLists=(e)=>{ 
        let sendData = {
            type: this.state.searchType,
            val:this.state.searchVal,
            no: this.state.currentPage,
            size: this.state.size
        };
        console.log(sendData);
        getUsers({sendData}).then((res)=>{ 
            console.log(res);
            if(res.code == 0){
                this.state.tableDates=[]
                res.dataInfo.list.forEach(function(v,i){
                    v['key'] = v['userId'];
                    v['userIdList'] = v['userId'];
                    v['headPicList'] =config.MOCK_AUTH_IMAGE+ v['info']['headPic'];
                    v['headPic'] =v['info']['headPic'];
                    v['nnList'] = v['info']['nickName'];
                    v['birthday'] = v['info']['birthday'];
                    v['registerList'] = this.getRegisterType(v['register']['registerType']);
                    v['createtimeList'] = getTimes(v['register']['registerTime'],false,1);
                    v['stateList'] = this.getState(v['register']['registerType']); 
                    v['state'] = v['register']['registerType']; 
                    this.state.tableDates.push(v)                
                },this)
                console.log(this.state.tableDates)
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
        form.validateFields((err, values) => {
            console.log(values)
            if (err) {
              return;
            }
            if(values["nickname"] && values["nickname"] !=this.state.infoData['nnList']){
                let sendData = {
                    userId: this.state.infoData.userId,
                    nickName: values["nickname"]
                };
                console.log(sendData)
                changeUserName(sendData).then(res => {
                    console.log(res)
                    if (res.code === 0) {
                        this.getLists()
                    } 
                });
            }
            if(values["birthday"]['_d'] && getNumTimes(values["birthday"]['_d']) != this.state.infoData['birthday']){
                let sendData = {
                    userId: this.state.infoData.userId,
                    birthday: getTimesByDate(values["birthday"]['_d'],9)
                };
                console.log(sendData)
                changeBday(sendData).then(res => {
                    console.log(res)
                    if (res.code === 0) {
                        this.getLists()
                    } 
                });
            }
            if(values["uploadImg"] && values["uploadImg"] != this.state.infoData['headPic']){
                let sendData = {
                    userId: this.state.infoData.userId,
                    file: values["uploadImg"]
                };
                console.log(sendData)
                changeUserHeaderPic(sendData).then(res => {
                    console.log(res)
                    if (res.code === 0) {
                        this.getLists()
                    } 
                });
            }
        })
        this.setState({
            infoPopVisible: false,
            editPopVisible: false,
        });
    };
    searchSelect = (e) => {
        let p = "请输入用户ID";
        let type = 0;
        document.getElementById("searchV").value = '';   
        if(e==1){
            p = "请输入用户昵称";
            type = 1;
        }
        this.setState({
            searchPlaceholder:p,
            searchType:type,
        })
        
    };
    //详情弹窗
    infoPop= (e) => {
        console.log(e)
        this.setState({
            infoData:e,
            infoPopVisible: true,
        });
    };
    //状态编辑弹出
    editPop= (e) => {
        this.setState({
            infoData:e,
            editPopVisible: true,
        });
    };
    handleCancel= (e) => {
        this.setState({
            infoPopVisible: false,
            editPopVisible: false,
        });
    };
    changePage = (e) => {
        this.setState({
            currentPage:e
        })
        this.getLists(e)
    };
    showTotal=(total)=> {
        return `共有 ${total} 条`;
    };
    valChange = (e) => {
        this.setState({
            searchVal:e.target.value,
        })
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    //获取注册方式
    getRegisterType = (num) => {
        let str="";
        switch(num){
            case 0:
                str='后台创建';
                break;
            case 1:
                str='facebook';
                break;
            case 2:
                str='twitter';
                break;
            case 3:
                str='google';
                break;
            case 4:
                str='instagram';
                break;
            case 5:
                str='手机';
                break;
            case 6:
                str='邮箱';
                break;
        }
        return str;
    };
    //获取后台的状态
    getState = (num) => {
        let str="";
        switch(num){
            case 0:
                str='正常';
                break;
            case 1:
                str='设备被封禁';
                break;
            case 2:
                str='账号被封';
                break;
        }
        return str;
    };
    render() {
        return (
            <div className="gutter-example" style={{ background:'#fff'}}>
                <BreadcrumbCustom first="用户系统" second="用户管理" />
                <div className="gutter-box search-box">
                    <Form onSubmit={this.getLists}>
                        <div className="search-title">查询方式：</div>
                        <FormItem className="search-item">
                            <Select className="icp-selector" style={{width: '150px'}} placeholder="请选择查询条件" onChange={this.searchSelect}>
                                <Option value="0">用户ID</Option>
                                <Option value="1">昵称</Option>
                            </Select>
                        </FormItem>
                        <FormItem className="search-item">
                            <Input id="searchV" onChange={this.valChange.bind(this)} style={{width: '150px'}} placeholder={this.state.searchPlaceholder} />
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
                                <Pagination className="pagination-me" onChange={this.changePage} total={this.state.pageTotal}  current={this.state.currentPage} defaultCurrent={1} defaultPageSize={10} hideOnSinglePage showTotal={this.showTotal} showSizeChanger showQuickJumper />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Modal className="info-modal" title="详细信息" visible={this.state.infoPopVisible} cancelText="关闭" onCancel={this.handleCancel} okButtonProps="hidden">
                    <Row className="" style={{height:'60px'}}>
                        <Col span="4" align="right">用户头像：</Col>
                        <Col span="8"><img className="list-img" src={this.state.infoData?this.state.infoData.headPicList:''}/></Col>
                        <Col span="4" align="right">金币剩余：</Col>
                        <Col span="8">{this.state.infoData && this.state.infoData.balance?this.state.infoData.balance.balance:''}</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="4" align="right">用户ID：</Col>
                        <Col span="8">{this.state.infoData?this.state.infoData.userId:''}</Col>
                        <Col span="4" align="right">钻石剩余：</Col>
                        <Col span="8">{this.state.infoData && this.state.infoData.balance?this.state.infoData.balance.returnBalance:''}</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="4" align="right">用户昵称：</Col>
                        <Col span="8">{this.state.infoData && this.state.infoData.info?this.state.infoData.info.nickName:''}</Col>
                        <Col span="4" align="right">今日胜点值：</Col>
                        <Col span="8">{this.state.infoData && this.state.infoData.balance?this.state.infoData.balance.returnBalance:''}</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="4" align="right">用户性别：</Col>
                        <Col span="8">{this.state.infoData && this.state.infoData.info?(this.state.infoData.info.sex==1?'男':'女'):''}</Col>
                        <Col span="4" align="right">本周胜点值：</Col>
                        <Col span="8">{this.state.infoData && this.state.infoData.balance?this.state.infoData.balance.returnBalance:''}</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="4" align="right">用户生日：</Col>
                        <Col span="8">{this.state.infoData && this.state.infoData.info?getTimes(this.state.infoData.info.birthday,false,1):''}</Col>
                        <Col span="4" align="right">今日收益钻石：</Col>
                        <Col span="8">{this.state.infoData && this.state.infoData.balance?this.state.infoData.balance.returnBalance:''}</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="4" align="right">注册时间：</Col>
                        <Col span="8">{this.state.infoData && this.state.infoData.register?getTimes(this.state.infoData.register.registerTime,false,1):''}</Col>
                        <Col span="4" align="right">本周收益钻石：</Col>
                        <Col span="8">{this.state.infoData && this.state.infoData.balance?this.state.infoData.balance.returnBalance:''}</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="4" align="right">上次登录时间：</Col>
                        <Col span="8">{this.state.infoData && this.state.infoData.info?getTimes(this.state.infoData.info.lastLoginTime,false,1):''}</Col>
                        <Col span="4" align="right">账号状态：</Col>
                        <Col span="8">{this.state.infoData && this.state.infoData.returnBalance?this.state.infoData.balance.returnBalance:''}</Col>
                    </Row>
                </Modal>
                <UserEditForm ref={this.saveFormRef} infoData={this.state.infoData} isPop={this.state.editPopVisible} editPopClose={this.handleCancel.bind(this)} editPopOk={this.handleAddAndEditOk.bind(this)}/>
            </div>
        )
    };
}

export default UserLists;