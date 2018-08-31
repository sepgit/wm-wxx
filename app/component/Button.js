import React, { Component } from 'react';
import '../css/weui.css';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="weui-btn-area">
        {
          this.props.buttonstyle==1?
            <a className="weui-btn weui-btn_primary" href="javascript:" onClick={this.props.ClickProp}>{this.props.text}</a>:undefined
        }
        {
          this.props.buttonstyle==2?
            <a className="weui-btn weui-btn_default" href="javascript:" onClick={this.props.ClickProp}>{this.props.text}</a>:undefined
        }
      </div>
    )
  }
}

export default Button;