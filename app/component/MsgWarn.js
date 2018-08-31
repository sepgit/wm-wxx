import React, { Component } from 'react';
import '../css/weui.css';

class MsgWarn extends Component {
  constructor(props) {
    super(props);
    this.state= {
      Labeltext:this.props.text              //label
    }
  }

  render() {
    return (
      <div className="weui-msg">
        <div className="weui-msg__icon-area"><i className="weui-icon-warn weui-icon_msg"></i></div>
        <div className="weui-msg__text-area">
          <h2 className="weui-msg__title">{this.state.Labeltext}</h2>
        </div>
      </div>
    )
  }
}

export default MsgWarn;