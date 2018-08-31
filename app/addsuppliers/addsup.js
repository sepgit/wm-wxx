import React, { Component } from 'react';
import '../css/weui.css';

class InputName extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div >
                <div className="clearfix inputnema">
                    <input className="companyname weui-input" type="text" onChange={ this.props.handleChange} value ={ this.props.myDataProp }  placeholder="请输入 公司名称 / 帐号 / 姓名" />
                    <a href="javascript:void(0)" onClick={this.props.emptyClick}>X</a>
                </div>
                
                <div className="lookupSup">
                    <button className="lookupBtn weui-btn weui-btn_plain-primary" onClick={ this.props.SelfonClick }>搜索</button>
                </div>
            </div>
        )
    }

}

export default InputName;