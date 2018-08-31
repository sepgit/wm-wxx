//          <p className="weui-msg__desc">点击此处<a href="javascript:void(0);" onClick={this.state.back}>{this.state.backtext}</a></p>

import React, { Component } from 'react';
import '../css/weui.css';

class Msg extends Component {
  constructor(props) {
    super(props);
    this.state= {

    }
  }

  render() {
    return (
      <div className="weui-msg">
        <div className="weui-msg__icon-area">
          {
           this.props.Typeprop==1?
            <i className="weui-icon-success weui-icon_msg"></i>
             :undefined
          }
          {
            this.props.Typeprop==2?
            <i className="weui-icon-warn weui-icon_msg"></i>
              :undefined
          }
          {
            this.props.Typeprop==3?
              <i className="weui-icon-info weui-icon_msg"></i>
              :undefined
          }
          {
            this.props.Typeprop==4?
              <i className="weui-icon-warn weui-icon_msg-primary"></i>
              :undefined
          }
          {
            this.props.Typeprop==5?
              <i className="weui-icon-waiting weui-icon_msg"></i>
              :undefined
          }
          {
            this.props.Typeprop==0?
              <img src={this.props.Pic}/>
              :undefined
          }
        </div>
        <div className="weui-msg__text-area">
          <h2 className="weui-msg__title">{this.props.Text}</h2>
          {
            this.props.BtnNull==true?
              undefined:
            <a className="weui-btn weui-btn_primary" href="javascript:" onClick={this.props.Btnprop}>{this.props.Btntextprop}</a>
          }

        </div>
      </div>
    )
  }
}

export default Msg;