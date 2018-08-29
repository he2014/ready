/**
 * 敏感词库
 */
import React ,{ Component } from 'react';
import { Row, Col, Card,Table,Form,Select,Button,Modal,Pagination} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import SensitiveLexiconEditForm from './sensitiveLexiconEdit';
const FormItem = Form.Item;
const Option = Select.Option;
const data = [{
    key: '54324',
    codeList:'54324',
    lgList:'英语',
    wordsList: 'fuck', 
    seriousLevelList: '一级', 
    createTimeList:'2018-10-11 00:00:00',
    writeInTypeList:'Excel导入',
},{
    key: '54325',
    codeList:'54324',
    lgList:'英语',
    wordsList: 'fuck', 
    seriousLevelList: '一级', 
    createTimeList:'2018-10-11 00:00:00',
    writeInTypeList:'Excel导入',
},{
    key: '54326',
    codeList:'54324',
    lgList:'英语',
    wordsList: 'fuck', 
    seriousLevelList: '一级', 
    createTimeList:'2018-10-11 00:00:00',
    writeInTypeList:'Excel导入',
}];

class SensitiveLexicon extends Component {
    constructor(props){
        super(props)
        this.state = {
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'新建',
            addOrEditPopVisible: false,//状态编辑弹窗
            delPopVisible: false,//删除弹窗
            setPopVisible:false,//每日签到配置
            currentPage:1,//当前页
            pageTotal:90,//共有数据条数
        };
        this.columns = [{
            title: '编号',
            width:'100px',
            dataIndex: 'codeList', 
        }, {
            title: '语言',
            width:'100px',
            dataIndex: 'lgList',
        }, {
            title: '敏感词',
            width:'200px',
            dataIndex: 'wordsList',
        }, {
            title: '严重级别',
            width:'150px',
            dataIndex: 'seriousLevelList',
        }, {
            title: '创建时间',
            width:'150px',
            dataIndex: 'createTimeList',
        }, {
            title: '录入方式',
            width:'100px',
            dataIndex: 'writeInTypeList',
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

    }
    
     //每日签到配置
    setPop= (e) => {
        this.setState({
            setPopVisible: true,
        });
    };
    handleSetOk= (e) => {
        this.setState({
            setPopVisible: false,
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
    handleAddAndEditOk= (e) => {
        this.setState({
            addOrEditPopVisible: false,
        });
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
        this.setState({
            addOrEditType: 'edit',//详情弹窗
            addOrEditPopTitle:'编辑',
            addOrEditPopVisible: true,//状态编辑弹窗
        });
    };

    handleCancel= (e) => {
        this.setState({
            delPopVisible: false,
            addOrEditPopVisible: false,
            setPopVisible:false,
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
                <BreadcrumbCustom first="客服管理" second="敏感词库" />
                <div className="gutter-box search-box" >
                    <div style={{width:'600px',float:'left'}}>
                        <Form onSubmit={this.handleSubmit}>
                            <div className="search-title">查询方式：</div>
                            <FormItem className="search-item">
                                <Select showSearch
                                    style={{ width: 200 }}
                                    placeholder="请选择语言"
                                    onChange={this.selectHandleChange}
                                >
                                    <Option value={0}>英语</Option>
                                    <Option value={1}>马来语</Option>
                                    <Option value={2}>泰语</Option>
                                    <Option value={3}>越南语</Option>
                                    <Option value={4}>印尼语</Option>
                              </Select>
                            </FormItem>
                            <FormItem className="search-item">
                                <Button type="primary" className="search-btn" htmlType="submit" icon="search">查询</Button>
                            </FormItem>
                        </Form>
                    </div>
                    <div style={{textAlign:'right'}}>
                        <Button onClick={this.addPop.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="plus">创建</Button>
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
                <SensitiveLexiconEditForm isType={this.state.addOrEditType} title={this.state.addOrEditPopTitle} isPop={this.state.addOrEditPopVisible} editPopOk={this.handleAddAndEditOk.bind(this)} editPopClose={this.handleCancel.bind(this)} />
                <Modal title="是否删除" visible={this.state.delPopVisible} cancelText="关闭" okText="确定" onOk={this.handleDelOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div style={{textAlign:'center'}}>确定删除此条信息？</div>
                </Modal>
            </div>
        )
    };
}

export default SensitiveLexicon;