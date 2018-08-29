/**
 * 获取语言
 */
import React, { Component } from 'react';
import {Select,Form} from 'antd';
import {getLanguages} from '../../action/common';
import {setLanguage,getLanguage} from '../../axios/system';
const FormItem = Form.Item;
const Option = Select.Option;


export default class LanguageSelect extends Component {
    constructor(props){
        super(props)
        this.state = {
            languageData:[]
        }
        this.getAllLanguages()
    };
    getAllLanguages=()=>{
        let lg = [];
        console.log(lg)
        if(lg.length>0){
            this.setState({
                languageData:lg
            })
        }else{
            getLanguages().then(res => {
                if (res.code === 0) {
                    console.log(res);
                    lg =res.dataInfo;
                    setLanguage(lg);
                }
                this.setState({
                    languageData:lg
                })
            }).catch(error => {
                console.log("languages error:", error);
            });
        }
        
    }
    selectHandleChange = (value) => {
      console.log(`selected ${value}`);
    }

    render() {

        return (
            <FormItem {...this.props.formItemLayout} label="选择语言">
                    {this.props.getFieldDecorator('versionLanguage', {
                        rules: [{ required: true, message: '请选择语言!' }],
                    })(
                        
                        <Select showSearch
                            style={{ width: 200 }}
                            placeholder="请选择"
                            onChange={this.props.onMeg}
                        >
                            { this.state.languageData.map(item => 
                                <Option key={item.languageId} value={item.languageId}>
                                    {item.languageName}
                                </Option>) 
                            }
                      </Select>
                    )}
                </FormItem>
            
        );
    }
}
