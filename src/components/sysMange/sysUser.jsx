/**
 * 系统用户管理
 */
import React ,{ Component } from 'react';
import { Row, Col, Card,Table,Form,Select,Input,Button,Modal,Pagination} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import SysUserEditForm from './sysUserEdit';
const FormItem = Form.Item;
const Option = Select.Option;

const data = [{
    key: '54324',
    userIdList:'54324',
    headPicList:<img src=""/>,
    nnList:'昵称',
    createtimeList: '2018-10-11 12:23:45', 
    updatePsList:'123456', 
    stateList:'启用'
},{
    key: '54325',
   userIdList:'54324',
    headPicList:<img src=""/>,
    nnList:'昵称',
    createtimeList: '2018-10-11 12:23:45', 
    updatePsList:'123456', 
    stateList:'启用'
},{
    key: '54326',
    userIdList:'54324',
    headPicList:<img src=""/>,
    nnList:'昵称',
    createtimeList: '2018-10-11 12:23:45', 
    updatePsList:'123456', 
    stateList:'启用'
}];

class sysUserLists extends Component {
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
            title: '用户ID',
            width:'100px',
            dataIndex: 'userIdList', 
        }, {
            title: '头像',
            width:'100px',
            dataIndex: 'headPicList',
        }, {
            title: '用户名称',
            width:'120px',
            dataIndex: 'nnList',
        }, {
            title: '用户类型',
            width:'240px',
            dataIndex: 'registerList',
            editable: true,
            render: (text, record ,index) => (  //塞入内容
                <div>
                    <div style={{width:'150px',float:'left'}}>
                        <Select showSearch
                            style={{ width: 150 }}
                            placeholder="选择用户类型"
                            onChange={this.selectHandleChange} >
                            <Option value="tom">系统管理员</Option>
                            <Option value="jack">运营</Option>
                            <Option value="lucy">产品</Option>
                        </Select>
                    </div>
                    <div style={{textAlign:'right'}}>
                        <Button type="small" onClick={this.infoPop.bind(this,text)}>修改</Button>
                    </div>
                </div>
            ),
        }, {
            title: '创建时间',
            width:'150px',
            dataIndex: 'createtimeList',
        }, {
            title: '修改密码',
            width:'240px',
            dataIndex: 'updatePsList',
            editable: true,
            render: (text, record ,index) => (  //塞入内容
                <div>
                    <div style={{width:'150px',float:'left'}}>
                        <Input value={text}/>
                    </div>
                    <div style={{textAlign:'right'}}>
                        <Button type="small" onClick={this.infoPop.bind(this,text)}>修改</Button>
                    </div>
                </div>
            ),
        }, {
            title: '状态',
            width:'80px',
            dataIndex: 'stateList',
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
                <BreadcrumbCustom first="系统管理" second="系统用户管理" />
                <div className="gutter-box search-box">
                    <div style={{width:'600px',float:'left'}}>
                        <Form onSubmit={this.handleSubmit}>
                        <div className="search-title">查询方式：</div>
                        <FormItem className="search-item">
                            <Input style={{width: '150px'}} placeholder="请输入用户ID" />
                        </FormItem>
                        <FormItem className="search-item">
                            <Button type="primary" className="search-btn" htmlType="submit" icon="search">查询</Button>
                        </FormItem>
                    </Form>
                    </div>
                    <div style={{textAlign:'right'}}>
                        <Button onClick={this.addPop.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="plus">新建</Button>
                        <Button onClick={this.refresh.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="sync">刷新</Button>
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
                <Modal className="info-modal" title="详细信息" visible={this.state.infoPopVisible} cancelText="关闭" onCancel={this.handleCancel} okButtonProps="hidden">
                    <Row className="info-row">
                        <Col span="5" align="right">用户头像：</Col>
                        <Col span="18">222</Col>
                    </Row>
                    <Row className="info-row">
                       <Col span="5" align="right">用户名：</Col>
                        <Col span="18">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="5" align="right">用户昵称：</Col>
                        <Col span="18">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="5" align="right">真实姓名：</Col>
                        <Col span="18">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="5" align="right">部门：</Col>
                        <Col span="18">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="5" align="right">手机号码：</Col>
                        <Col span="18">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="5" align="right">状态：</Col>
                        <Col span="18">222</Col>
                    </Row>
                    <Row className="info-row">
                        <Col span="5" align="right">创建时间：</Col>
                        <Col span="18">222</Col>
                    </Row>
                </Modal>
                <SysUserEditForm isType={this.state.addOrEditType} title={this.state.addOrEditPopTitle} isPop={this.state.addOrEditPopVisible} editPopOk={this.handleAddAndEditOk.bind(this)} editPopClose={this.handleCancel.bind(this)} />
                <Modal title="是否删除" visible={this.state.delPopVisible} cancelText="关闭" okText="确定" onOk={this.handleDelOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div>是否要删除此条信息吗？</div>
                </Modal>
            </div>
        )
    };
}

export default sysUserLists;