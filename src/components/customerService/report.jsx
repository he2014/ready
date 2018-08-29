/**
 * 举报管理
 */
import React ,{ Component } from 'react';
import { Row, Col, Card,Table, Button,Modal,Pagination} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import ReportEditForm from './reportEdit';

const data = [{
    key: '54324',
    codeList:'54324',
    beReportedIdList:'453224',
    beReportedNnList: 'Danae',    
    reasonList:'涉黄',
    reportedIdList:'839924',
    reportedNnList:'Nihanna',
    reportedTimeList: '2018-10-11 12:23:45',   
},{
    key: '54325',
    codeList:'54324',
    beReportedIdList:'453224',
    beReportedNnList: 'Danae',    
    reasonList:'涉黄',
    reportedIdList:'839924',
    reportedNnList:'Nihanna',
    reportedTimeList: '2018-10-11 12:23:45',  
},{
    key: '54326',
    codeList:'54324',
    beReportedIdList:'453224',
    beReportedNnList: 'Danae',    
    reasonList:'涉黄',
    reportedIdList:'839924',
    reportedNnList:'Nihanna',
    reportedTimeList: '2018-10-11 12:23:45',  
}];

class Report extends Component {
    constructor(props){
        super(props)
        this.state = {
            infoPopVisible:false,
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'新建',
            addOrEditPopVisible: false,//状态编辑弹窗
            delPopVisible: false,//删除弹窗
            currentPage:1,//当前页
            pageTotal:90,//共有数据条数
        };
        this.columns = [{
            title: '编号',
            width:'100px',
            dataIndex: 'codeList', 
        }, {
            title: '被举报人ID',
            width:'100px',
            dataIndex: 'beReportedIdList',
        }, {
            title: '被举报人昵称',
            width:'150px',
            dataIndex: 'beReportedNnList',
        }, {
            title: '举报理由',
            width:'150px',
            dataIndex: 'reasonList',
        }, {
            title: '举报人ID',
            width:'120px',
            dataIndex: 'reportedIdList',
        }, {
            title: '举报人昵称',
            width:'150px',
            dataIndex: 'reportedNnList',
        }, {
            title: '举报时间',
            width:'150px',
            dataIndex: 'reportedTimeList',
        }, {
            title: '操作',
            key: 'operatList',
            render: (text, record ,index) => (  //塞入内容
                <div className="list-btn">
                    <a onClick={this.infoPop.bind(this,text)}>查看被举报人信息</a>
                </div>
            ),
        }];

    }
    
    searchSelect = (e) => {
        console.log(e)
        let val = "请输入用户ID"
        if(e===1){
            val = "请输入用户昵称"
        }
        this.setState({
            searchPlaceholder:val
        })
    };
    infoPopVisible
    //新建弹窗
    infoPop= (e) => {
        this.setState({
            infoPopVisible: true,//状态编辑弹窗
        });
    };
    //新建弹窗
    addPop= (e) => {
        this.setState({
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'创建举报理由',
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
    handleCancel= (e) => {
        this.setState({
            addOrEditPopVisible: false,
            infoPopVisible:false,
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
                <BreadcrumbCustom first="客服管理" second="举报管理" />
                <div className="gutter-box search-box" style={{textAlign:'right'}}>
                    <Button onClick={this.addPop.bind(this)} type="primary" className="new-btn" htmlType="submit">创建举报理由</Button>
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
                <Modal title="查看被举报人信息" visible={this.state.infoPopVisible} cancelText="关闭" okText="确定" onOk={this.handleDelOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div>查看被举报人信息</div>
                </Modal>
                <ReportEditForm isType={this.state.addOrEditType} title={this.state.addOrEditPopTitle} isPop={this.state.addOrEditPopVisible} editPopOk={this.handleAddAndEditOk.bind(this)} editPopClose={this.handleCancel.bind(this)} />
            </div>
        )
    };
}

export default Report;