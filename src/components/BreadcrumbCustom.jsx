/**
 * Created by hao.cheng on 2017/4/22.
 */
import React from 'react';
import { Breadcrumb } from 'antd';
import themes from '../style/theme';

class BreadcrumbCustom extends React.Component {
    state = {
        switcherOn: false,
        theme: null,
        themes: JSON.parse(localStorage.getItem('themes')) || [
            {type: 'info', checked: false},
            {type: 'grey', checked: false},
            {type: 'danger', checked: false},
            {type: 'warn', checked: false},
            {type: 'white', checked: false},
        ],
    };
    componentDidMount() {
        this.state.themes.forEach(val => {
            val.checked && this.setState({
                theme: themes['theme' + val.type] || null
            });
        })
    }
    switcherOn = () => {
        this.setState({
            switcherOn: !this.state.switcherOn
        })
    };
    themeChange = (v) => {
        this.setState({
            themes: this.state.themes.map((t, i) => {
                (t.type === v.type && (t.checked = !t.checked)) || (t.checked = false);
                return t;
            }),
            theme: (v.checked && themes['theme' + v.type]) || null
        }, () => {
            localStorage.setItem('themes', JSON.stringify(this.state.themes));
        })
    };
    render() {
        const first = <Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || '';
        const second = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || '';
        return (
            <span>
                <Breadcrumb style={{ padding: '12px 5px',background:'#ffffff',margin:'10px 0 0 0'}}>
                    {first}
                    {second}
                </Breadcrumb>
                <style>
                    {`
                    ${this.state.theme ?
                    `
                    .custom-theme {
                        // background: ${this.state.theme.header.background} !important;
                        background: linear-gradient(to right,${this.state.theme.header.background} 0,${this.state.theme.header.background}90 100%) !important;
                        color: #fff !important;
                    }
                    .custom-theme .ant-menu {
                        background: transparent !important;
                        color: #fff !important;
                    }
                    .custom-theme .ant-menu-item-group-title {
                        color: #fff !important;
                    }
                    ` : ''
                    }
                `}</style>
            </span>
        )
    }
}

export default BreadcrumbCustom;
