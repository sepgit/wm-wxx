import React, { Component } from 'react';
import '../css/weui.css';
import EmailInput from '../component/EmailInput.js'
import ButtonInput from '../component/ButtonInput.js'
import Button from '../component/Button.js';
import Msg from '../component/Msg.js';
import Label from  '../component/Label';
import Toast from '../component/Toast.js';
import {sendActive, Active} from '../DataInterface.js';

class Activate extends Component {
  constructor(props) {
    super(props);

    this.GetReSend = this.GetReSend.bind(this);
    this.ActiveonClick = this.ActiveonClick.bind(this);
    this.SendonClick = this.SendonClick.bind(this);
    this.EmailInputonChange = this.EmailInputonChange.bind(this);
    this.ActiveonChange = this.ActiveonChange.bind(this);
    this.closeToast = this.closeToast.bind(this);

    this.state = {
      Email:'',
      actiCode:'',
      ToastVisible:0
    }
  }

  componentWillMount() {
    let userName = this.props.userName;
    this.setState({
      Email:userName
    });
  }

  GetReSend(value) {
    if (!value.err) {
      this.setState({
        ToastVisible:1,
        Msg:'已发送'
      });
    }
    else {
      this.setState({
        ToastVisible: 1,
        Msg: value.errMsg
      });
    }
  }

  closeToast(){
    this.setState({
      ToastVisible: 0,
    });
  }

  SendonClick() {
    let a = this.state.Email;
    sendActive(a,this.GetReSend);
  }

  ActiveonClick() {
    let a = this.state.Email;
    let b = this.state.actiCode;
    Active(a,b,this.props.GetReActive);
  }

  EmailInputonChange(event) {
    this.setState({Email: event.target.value});
  }

  ActiveonChange(event) {
    this.setState({actiCode: event.target.value});
  }

  render() {
    return (
      <div>
        <div className="weui-cells weui-cells_form">

          <Label text={'邮箱账号'}/>
          <EmailInput promptProp={'请输入正确邮箱地址'} TextProp={this.state.Email} updateStateProp={this.EmailInputonChange}/>

          <div className="weui-cell">
          </div>

          <Label text={'激活验证码'}/>
          <ButtonInput promptProp={'请输入激活码'} ButtonCaptionProp={'发送激活码'} updateStateProp={this.ActiveonChange}
                       ButtonClickProp={this.SendonClick}/>
          {
            this.state.ToastVisible==1?
              <Toast Close={this.closeToast} Text={this.state.Msg}/>:undefined
          }
          <div className="weui-cell">
          </div>
          <Button text={'完成'} buttonstyle="1" ClickProp={this.ActiveonClick}/>
        </div>
      </div>
    );
  }
}
export default Activate;