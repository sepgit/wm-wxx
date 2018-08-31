import React, { Component } from 'react';
import '../css/weui.css';

class UnEnableInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="weui-cell">
        {
          this.props.captionProp!=''?
          <div className="weui-cell__hd"><label className="weui-label">{this.props.captionProp}</label></div>:undefined
        }

        <div className="weui-cell__hd">
          {
            this.props.textProp!=''?
              <div className="weui-cells__tips">{this.props.textProp}</div>
              :<div className="weui-cells__tips">{this.props.promptProp}</div>
          }
        </div>
      </div>
    )
  }
}

export default UnEnableInput;