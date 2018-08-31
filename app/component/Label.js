import React, { Component } from 'react';
import '../css/weui.css';

class Label extends Component {
  constructor(props) {
    super(props);
    this.state= {
      Labeltext:this.props.text              //label
    }
  }

  render() {
    return (
      <div>
        <div className="weui-cell__hd">
          <label className="weui-label">{this.state.Labeltext}</label>
        </div>
      </div>
    )
  }
}

export default Label;