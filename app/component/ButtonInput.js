import React, { Component } from 'react';
import '../css/weui.css';

class ButtonInput extends Component {
  constructor(props) {
    super(props);
    this.state= {

    }
  }

  render() {
    return (
      <div className="weui-cell">
        <div className="weui-cell__bd">
          <input className="weui-input" type="tel" placeholder={this.props.promptProp} onChange={this.props.updateStateProp}/>
        </div>
        <div className="weui-cell__ft">
          <button className="weui-vcode-btn" onClick={this.props.ButtonClickProp}>{this.props.ButtonCaptionProp}</button>
        </div>
      </div>
    )
  }
}

export default ButtonInput;