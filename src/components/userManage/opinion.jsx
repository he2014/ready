/**
 * 意见反馈
 */
import React ,{ Component } from 'react';
import { Row, Col, Card,Table, Form,Select,DatePicker,Button,Modal,Pagination} from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import BreadcrumbCustom from '../BreadcrumbCustom';
const FormItem = Form.Item;
const Option = Select.Option;

const data = [{
    key: '54324',
    userIdList:'54324',
    nnList:'Danae',
    lgList:'泰语',
    contentList:'用户反馈这是一天用户反馈这是一条用户反馈',
    sbList:'ANDROID',
    ybList:'V1.0',
    xbList:'7.1.1',
    createtimeList: '2018-10-11 12:23:45',  
},{
    key: '54324',
    userIdList:'54324',
    nnList:'Danae',
    lgList:'泰语',
    contentList:'用户反馈这是一天用户反馈这是一条用户反馈',
    sbList:'ANDROID',
    ybList:'V1.0',
    xbList:'7.1.1',
    createtimeList: '2018-10-11 12:23:45',  
},{
    key: '54324',
    userIdList:'54324',
    nnList:'Danae',
    lgList:'泰语',
    contentList:'用户反馈这是一天用户反馈这是一条用户反馈',
    sbList:'ANDROID',
    ybList:'V1.0',
    xbList:'7.1.1',
    createtimeList: '2018-10-11 12:23:45',  
}];

class OpinionLists extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchPlaceholder:'',//查询输入框提示信息
            doPopVisible: false,//操作弹窗
            currentPage:1,//当前页
            pageTotal:90,//共有数据条数
        };
        this.columns = [{
            title: '反馈人ID',
            width:'100px',
            dataIndex: 'userIdList', 
        },{
            title: '反馈人昵称',
            width:'120px',
            dataIndex: 'nnList',
        }, {
            title: '系统语言',
            width:'100px',
            dataIndex: 'lgList',
        }, {
            title: '反馈内容',
            dataIndex: 'contentList',
        }, {
            title: '反馈时间',
            width:'150px',
            dataIndex: 'createtimeList',
        }, {
            title: '设备',
            width:'100px',
            dataIndex: 'sbList',
        }, {
            title: '应用版本',
            width:'100px',
            dataIndex: 'ybList',
        }, {
            title: '系统版本',
            width:'100px',
            dataIndex: 'xbList',
        }, {
            title: '操作',
            key: 'operatList',
            width:'120px',
            render: (text, record ,index) => (  //塞入内容
                <div className="list-btn">
                　　<a onClick={this.opinionDo.bind(this,text)}>标记处理</a>
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
    //详情弹窗
    opinionDo= (e) => {
        this.setState({
            doPopVisible: true,
        });
    };
    handleCancel= (e) => {
        this.setState({
            doPopVisible: false,
        });
    };
    handleOk= (e) => {
        this.setState({
            doPopVisible: false,
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
    dateChange(dates, dateStrings) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    }
    render() {
        const RangePicker = DatePicker.RangePicker;
        return (
            <div className="gutter-example" style={{ background:'#fff'}}>
                <BreadcrumbCustom first="用户系统" second="意见反馈" />
                <div className="gutter-box search-box">
                    <Form onSubmit={this.handleSubmit}>
                        <div className="search-title">查询方式：</div>
                        <FormItem className="search-item">
                            <RangePicker locale={locale}
                                ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
                                onChange={this.dateChange}
                            />                    
                        </FormItem>
                        <Select className="icp-selector" style={{width: '150px',margin:'0 10px 0 0'}} placeholder="请选择语言" onChange={this.searchSelect}>
                            <Option value="0">英语</Option>
                            <Option value="1">泰语</Option>
                        </Select>
                        <Select className="icp-selector" style={{width: '150px'}} placeholder="请选择状态" onChange={this.searchSelect}>
                            <Option value="0">未处理</Option>
                            <Option value="1">已处理</Option>
                        </Select>
                        <FormItem className="search-item">
                            <Button type="primary" className="search-btn" htmlType="submit" icon="search">查询</Button>
                        </FormItem>
                    </Form>
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
                <Modal title="信息处理" visible={this.state.doPopVisible} cancelText="关闭" okText="确定" onOk={this.handleOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div>是否要标记为已处理？</div>
                </Modal>
            </div>
        )
    };
}

export default OpinionLists;