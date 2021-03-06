/**
 * 菜单模块
 */
import React ,{ Component } from 'react';
import { Row, Col, Card,Table,Button,Modal,Pagination} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import SysMenuModuleEditForm from './sysMenuModuleEdit';

const data = [{
    key: '54324',
    codeList:'54324',
    typeNameList:'用户系统',
    nameList:'用户管理',
    keyNameList:'userManage',
    iconList: 'fa fa-user', 
    urlList:'/user/userManage', 
    sortList:'0'
},{
    key: '54325',
    codeList:'54324',
    typeNameList:'用户系统',
    nameList:'意见反馈',
    keyNameList:'userManage',
    iconList: 'fa fa-user', 
    urlList:'/user/userManage', 
    sortList:'0'
},{
    key: '54326',
    codeList:'54324',
    typeNameList:'用户系统',
    nameList:'机器人配置',
    keyNameList:'userManage',
    iconList: 'fa fa-user', 
    urlList:'/user/userManage', 
    sortList:'0'
}];

class sysMenuModuleLists extends Component {
    constructor(props){
        super(props)
        this.state = {
            infoPopVisible: false,//详情弹窗
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'新建',
            addOrEditPopVisible: false,//状态编辑弹窗
            delPopVisible: false,
            currentPage:1,//当前页
            pageTotal:90,//共有数据条数
        };
        
        this.columns = [{
            title: '编号',
            width:'100px',
            dataIndex: 'codeList', 
        }, {
            title: '类别名称',
            width:'100px',
            dataIndex: 'typeNameList', 
        },{
            title: '名称',
            width:'120px',
            dataIndex: 'nameList',
        }, {
            title: 'key名称',
            width:'150px',
            dataIndex: 'keyNameList',
        }, {
            title: '图标',
            width:'150px',
            dataIndex: 'iconList',
        }, {
            title: '路径',
            width:'150px',
            dataIndex: 'urlList',
        }, {
            title: '排序',
            width:'80px',
            dataIndex: 'sortList',
        }, {
            title: '操作',
            key: 'operatList',
            render: (text, record ,index) => (  //塞入内容
                <div className="list-btn">
                    <a onClick={this.infoPop.bind(this,text)}>详情</a>
                    <a onClick={this.editPop.bind(this,text)}>编辑</a>
                    <a className="red" onClick={this.delPop.bind(this,text)}>删除</a>
                </div>
            ),
        }];

    }

    selectHandleChange = (value) => {
      console.log(`selected ${value}`);
    }
    //详情弹窗
    infoPop= (e) => {
        this.setState({
            infoPopVisible: true,
        });
    };
    //新建弹窗
    addPop= (e) => {
        this.setState({
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'新建',
            addOrEditPopVisible: true,//状态编辑弹窗
        });
    };
     //编辑弹出
    editPop= (e) => {
        this.setState({
            addOrEditType: 'edit',//详情弹窗
            addOrEditPopTitle:'编辑',
            addOrEditPopVisible: true,//状态编辑弹窗
        });
    };
    handleAddAndEditOk= (e) => {
        this.setState({
            addOrEditPopVisible: false,
        });
    };
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
    refresh= (e) => {
       alert("刷新")
    };

    handleCancel= (e) => {
        this.setState({
            infoPopVisible: false,
            addOrEditPopVisible: false,
            delPopVisible: false,
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
    render() {
        return (
            <div className="gutter-example" style={{ background:'#fff'}}>
                <BreadcrumbCustom first="系统管理" second="菜单模块" />
                <div className="gutter-box search-box" style={{textAlign:'right'}}>
                    <Button onClick={this.addPop.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="plus">新建</Button>
                    <Button onClick={this.refresh.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="sync">刷新</Button>   
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
                 <Modal className="info-modal" title="详细信息" visible={this.state.infoPopVisible} cancelText="关闭" onCancel={this.handleCancel} okButtonProps="hidden">
                    <Row className="info-row">
                        <Col span="5" align="right">编号：</Col>
                        <Col span="18">222</Col>
                    </Row>
                    <Row className="info-row">
                       <Col span="5" align="right">类别名称：</Col>
                        <Col span="18">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="5" align="right">名称：</Col>
                        <Col span="18">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="5" align="right">key名称：</Col>
                        <Col span="18">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="5" align="right">图标：</Col>
                        <Col span="18">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="5" align="right">路径：</Col>
                        <Col span="18">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="5" align="right">排序：</Col>
                        <Col span="18">222</Col>
                    </Row>
                </Modal>
                <SysMenuModuleEditForm isType={this.state.addOrEditType} title={this.state.addOrEditPopTitle} isPop={this.state.addOrEditPopVisible} editPopOk={this.handleAddAndEditOk.bind(this)} editPopClose={this.handleCancel.bind(this)} />
                <Modal title="是否删除" visible={this.state.delPopVisible} cancelText="关闭" okText="确定" onOk={this.handleDelOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div>是否要删除此条信息吗？</div>
                </Modal>
            </div>
        )
    };
}

export default sysMenuModuleLists;