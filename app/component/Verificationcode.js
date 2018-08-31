import React, { Component } from 'react';
import '../css/weui.css';

class Verificationcode extends Component {
  constructor(props) {
    super(props);
    this.state= {
      prompt:this.props.promptProp,              //文本框未填写时候，底层灰色文字
      pic: this.props.picProp,
      updateState: this.props.updateStateProp    //onChange事件
    }
  }

  render() {
    return (
      <div className="weui-cell weui-cell weui-cell_vcode">
        <div className="weui-cell__bd">
          <input className="weui-input"
                 type="number"
                 pattern="[0-9]"
                 placeholder={this.props.promptProp}
                 onChange={this.props.updateStateProp}
          />
        </div>
        {
          this.props.picProp!=''?
            <div className="weui-cell__ft">
              <img className="weui-vcode-img" src={this.props.picProp} onClick={this.props.ChangePicProc} />
            </div>:
            <div className="weui-cell__ft">
              <img className="weui-vcode-img" onClick={this.props.ChangePicProc} />
            </div>
        }
      </div>
    )
  }
}

export default Verificationcode;