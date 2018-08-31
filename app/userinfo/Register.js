import React, { Component } from 'react';
import '../css/weui.css';
import EmailInput from '../component/EmailInput.js'
import PasswordInput from '../component/PasswordInput.js'
import Verificationcode from '../component/Verificationcode.js';
import Button from '../component/Button.js';
import Label from  '../component/Label';
import {getData, postRegister} from '../DataInterface.js';
import BackTitle from '../component/BackTitle.js'

class Register extends Component {
  constructor(props) {
    super(props);
    this.Getpic = this.Getpic.bind(this);
    this.RegisteronClick = this.RegisteronClick.bind(this);         //注册按钮
    this.ReGetpiconClick = this.ReGetpiconClick.bind(this);
    this.EmailInputonChange = this.EmailInputonChange.bind(this);
    this.PassWordInputonChange = this.PassWordInputonChange.bind(this);
    this.CheckPassWordInputonChange = this.CheckPassWordInputonChange.bind(this);
    this.CheckInputonChange = this.CheckInputonChange.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.state = {
      IuserName: '',
      IpassWord: '',
      IcheckpassWord: '',
      capi: 0,
      Icapi: 0,
      pic: '',
    }
  }

  componentWillMount() {
    let url = 'api/capt/';
    let params = [];
    getData(url, params, this.Getpic);
  }

 RegisteronClick() {
    let capi = this.state.capi;
    let IuserName = this.state.IuserName;
    let IpassWord = this.state.IpassWord;
    let IcheckpassWord = this.state.IcheckpassWord;
    let Icapi = this.state.Icapi;
 if(IpassWord!=IcheckpassWord){
   this.props.ToMsg(2,'两次密码输入不一样','Reg','返回');
    }else{
      postRegister(IuserName, IpassWord, capi, Icapi, this.props.GetReg);
    }
 }

  ReGetpiconClick(){
    let url = 'api/capt/';
    let params = [];
    getData(url, params, this.Getpic);
  }

  Getpic(value) {
    this.setState({
      capi: value.capi,
      pic: 'data:image/png;base64,' + value.pic
    });
  }

  EmailInputonChange(event) {
    this.setState({IuserName: event.target.value});
  }

  PassWordInputonChange(event) {
    this.setState({IpassWord: event.target.value});
  }

  CheckPassWordInputonChange(event) {
    this.setState({IcheckpassWord: event.target.value});
  }

  CheckInputonChange(event) {
    this.setState({Icapi: event.target.value});
  }

  renderMain() {
    return (
      <div>
        <div className="weui-cells">

          <Label text={'邮箱账号'}/>
          <EmailInput promptProp={'请输入正确邮箱地址'} TextProp={this.state.IuserName} updateStateProp={this.EmailInputonChange}/>

          <div className="weui-cell">
          </div>

          <Label text={'密码'}/>
          <PasswordInput promptProp={'请输入密码'} TextProp={this.state.IpassWord} updateStateProp={this.PassWordInputonChange}/>
          <div className="weui-cell">
          </div>
          <Label text={'确认密码'}/>
          <PasswordInput promptProp={'请确认密码'} TextProp={this.state.IcheckpassWord} updateStateProp={this.CheckPassWordInputonChange}/>

          <div className="weui-cell">
          </div>
          <Label text={'验证码'}/>
          <Verificationcode promptProp={'请输入验证码'} picProp={this.state.pic}
                            updateStateProp={this.CheckInputonChange} ChangePicProc={this.ReGetpiconClick} />

          <div className="weui-cell">
          </div>
          <Button text={'完成注册'} buttonstyle="1" ClickProp={this.RegisteronClick}/>
          <div className="weui-msg">
            <div className="weui-msg__text-area">
              <p className="weui-msg__desc">已注册账号，未激活？<a href="javascript:void(0);" onClick={this.props.ActOnClick}>立即激活</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }


  render() {
    return (
      <div>
        {
          this.renderMain()
        }
      </div>
    );
  }
}
export default Register;