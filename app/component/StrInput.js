import React, { Component } from 'react';
import '../css/weui.css';

class StrInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="weui-cell">
          <div className="weui-cell__hd">
            <label className="weui-label">{this.props.caption}</label>
          </div>
          <div className="weui-cell__bd">
            {
              this.props.Enable==0?
                <div className="weui-cells__tips">{this.props.TextProp}</div>:
                <input className="weui-input"
                defaultValue={this.props.TextProp}
                placeholder={this.props.promptProp}
                onChange={this.props.updateStateProp}
                />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default StrInput;