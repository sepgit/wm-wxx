import React, { Component } from 'react';
import '../css/weui.css';
import Button from '../component/Button.js';
import Title from '../component/Title.js';

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.ToPeronClick = this.ToPeronClick.bind(this);
    this.ToComonClick = this.ToComonClick.bind(this);
    this.ToClick = this.ToClick.bind(this);
  }

  ToPeronClick(){
    let a = 'PRights';
    this.props.ToOtherpage(a);
  }

  ToComonClick(){
    let a = 'CRights';
    this.props.ToOtherpage(a);
  }

  ToClick(){
    let a = 'Price';
    this.props.ToOtherpage(a);
  }

  render() {
    return (
      <div>
        <Title Titletext={'认证权益'}/>
        <div className="weui-btn-area">
          <Button text={'个人认证会员权益'} buttonstyle="2" ClickProp={this.ToPeronClick}/>
          <Button text={'公司认证会员权益'} buttonstyle="2" ClickProp={this.ToComonClick}/>
        </div>
        <div className="weui-btn-area">
          <Button text={'前往付款'} buttonstyle="1" ClickProp={this.ToClick}/>
        </div>
      </div>
    )
  }
}

export default Authentication;