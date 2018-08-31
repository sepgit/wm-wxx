import React, { Component } from 'react';
import '../css/weui.css';

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.Submit = this.Submit.bind(this);
  }

  Submit(){
    this.props.SubmitProp;
  }

  render() {
    return (
      <div>
        <div className="js_dialog">
          <div className="weui-mask"></div>
          <div className="weui-dialog">
            <div className="weui-dialog__hd"><strong className="weui-dialog__title">弹窗标题</strong></div>
            <div className="weui-dialog__bd">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>
            <div className="weui-dialog__ft">
              <a href="javascript:void(0);" className="weui-dialog__btn weui-dialog__btn_default" >辅助操作</a>
              <a href="javascript:void(0);" className="weui-dialog__btn weui-dialog__btn_primary" onClick={this.Submit}>主操作</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dialog;