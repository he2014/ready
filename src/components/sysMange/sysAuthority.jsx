/**
 * 权限管理
 */
import React ,{ Component } from 'react';
import { Row, Col, Card,Table,Form,Select,Input,Button,Modal,Pagination} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import SysAuthoritySetForm from './sysAuthoritySet';
const FormItem = Form.Item;
const Option = Select.Option;

const data = [{
    key: '54324',
    codeList:'54324',
    nameList:'昵称',
},{
    key: '54325',
    codeList:'54324',
    nameList:'昵称',
},{
    key: '54326',
    codeList:'54324',
    nameList:'昵称',
}];

class sysAuthorityLists extends Component {
    constructor(props){
        super(props)
        this.state = {
            setPopVisible: false,//详情弹窗
            delPopVisible: false,
            currentPage:1,//当前页
            pageTotal:90,//共有数据条数
        };
        
        this.columns = [{
            title: '编号',
            width:'100px',
            dataIndex: 'codeList', 
        }, {
            title: '名称',
            width:'240px',
            dataIndex: 'nameList',
            editable: true,
            render: (text, record ,index) => (  //塞入内容
                <div>
                    <div style={{width:'150px',float:'left'}}>
                        <Input value={text}/>
                    </div>
                    <div style={{textAlign:'right'}}>
                        <Button type="small" onClick={this.updateSave.bind(this,text,index)}>修改</Button>
                    </div>
                </div>
            ),
        }, {
            title: '操作',
            key: 'operatList',
            render: (text, record ,index) => (  //塞入内容
                <div className="list-btn">
                    <a onClick={this.setPop.bind(this,text)}>权限分配</a>
                    <a className="red" onClick={this.delPop.bind(this,text)}>删除</a>
                </div>
            ),
        }];

    }

    selectHandleChange = (value) => {
      console.log(`selected ${value}`);
    }
    updateSave= (e,text) => {
       alert(e)
       console.log(text)
    };
    //详情弹窗
    setPop= (e) => {
        this.setState({
            setPopVisible: true,
        });
    };
    handleSetOk= (e) => {
        this.setState({
            delPopVisible: false,
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
            setPopVisible: false,
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
    handleSubmit=(data)=> {
        console.log(data)
    }
    render() {
        return (
            <div className="gutter-example" style={{ background:'#fff'}}>
                <BreadcrumbCustom first="系统管理" second="权限管理" />
                <div className="gutter-box search-box">
                    <Form onSubmit={this.handleSubmit}>
                        <div className="search-title">权限名称：</div>
                        <FormItem className="search-item">
                            <Input id="addName" style={{width: '150px'}} placeholder="请输入权限名称" />
                        </FormItem>
                        <FormItem className="search-item">
                            <Button type="primary" className="search-btn" htmlType="submit">创建</Button>
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
                <SysAuthoritySetForm isPop={this.state.setPopVisible} editPopOk={this.handleSetOk.bind(this)} editPopClose={this.handleCancel.bind(this)} />
                <Modal title="是否删除" visible={this.state.delPopVisible} cancelText="关闭" okText="确定" onOk={this.handleDelOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div>是否要删除此条信息吗？</div>
                </Modal>
            </div>
        )
    };
}

export default sysAuthorityLists;