import React, { Component } from 'react';
import '../css/weui.css';

class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state= {
      prompt:this.props.promptProp,              //文本框未填写时候，底层灰色文字
      Data: this.props.DataProp,
      updateState: this.props.updateStateProp    //onChange事件
    }
  }

  render() {
    return (
      <div className="weui-cell">
        <div className="weui-cell__bd">
          <input className="weui-input"
                 type="password"
                 pattern="[a-z0-9._%+-]"
                 placeholder={this.state.prompt}
                 defaultValue={this.props.TextProp}
                 onChange={this.state.updateState}
          />
        </div>
      </div>
    )
  }
}

export default PasswordInput;