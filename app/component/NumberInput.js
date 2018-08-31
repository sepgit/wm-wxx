import React, { Component } from 'react';
import '../css/weui.css';

class NumberInput extends Component {
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
                 type="number"
                 pattern="[0-9]"
                 placeholder={this.state.prompt}
                 value={this.state.Data}
                 onChange={this.state.updateState}
          />
        </div>
      </div>
    )
  }
}

export default NumberInput;