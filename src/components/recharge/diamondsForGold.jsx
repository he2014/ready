/**
 * 钻石兑换金币
 */
import React ,{ Component } from 'react';
import { Row, Col, Card,Table, Button,Modal} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import GoldForDiamondsEditForm from './goldForDiamondsEdit';

const data = [{
    key: '54324',
    codeList:'54324',
    imgList:<img src=""/>,
    numList: '10', 
    goldForDiamondsList: '1000', 
    sortList:'9',
},{
    key: '54325',
    codeList:'54324',
    imgList:<img src=""/>,
    numList: '10', 
    goldForDiamondsList: '1000', 
    sortList:'9',
},{
    key: '54326',
    codeList:'54324',
    imgList:<img src=""/>,
    numList: '10', 
    goldForDiamondsList: '1000',  
    sortList:'9',
}];

class GoldForDiamonds extends Component {
    constructor(props){
        super(props)
        this.state = {
            addOrEditType: 'add',//详情弹窗
            addOrEditPopTitle:'新建',
            addOrEditPopVisible: false,//状态编辑弹窗
            delPopVisible: false,//删除弹窗
        };
        this.columns = [{
            title: '编号',
            width:'100px',
            dataIndex: 'codeList', 
        }, {
            title: '图片',
            width:'100px',
            dataIndex: 'imgList',
        }, {
            title: '金币数',
            width:'120px',
            dataIndex: 'numList',
        }, {
            title: '金币对应钻石数',
            width:'150px',
            dataIndex: 'goldForDiamondsList',
        }, {
            title: '列表排序',
            width:'150px',
            dataIndex: 'sortList',
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
    
    handleCancel= (e) => {
        this.setState({
            delPopVisible: false,
            addOrEditPopVisible: false,
        });
    };
    render() {
        return (
            <div className="gutter-example" style={{ background:'#fff'}}>
                <BreadcrumbCustom first="货币配置" second="金币兑换钻石" />
                <div className="gutter-box search-box" style={{textAlign:'right'}}>
                    <Button onClick={this.addPop.bind(this)} type="primary" className="new-btn" htmlType="submit" icon="plus">新建</Button>
                </div>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box" style={{ padding: '0'}}>
                            <Card bordered={false}>
                                <Table pagination={false} size="small" bordered columns={this.columns} dataSource={data} />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <GoldForDiamondsEditForm isType={this.state.addOrEditType} title={this.state.addOrEditPopTitle} isPop={this.state.addOrEditPopVisible} editPopOk={this.handleAddAndEditOk.bind(this)} editPopClose={this.handleCancel.bind(this)} />
                <Modal title="是否删除" visible={this.state.delPopVisible} cancelText="关闭" okText="确定" onOk={this.handleDelOk} onCancel={this.handleCancel} okButtonProps="hidden">
                    <div>是否要删除此条信息吗？</div>
                </Modal>
            </div>
        )
    };
}

export default GoldForDiamonds;