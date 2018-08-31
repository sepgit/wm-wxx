import React, { Component } from 'react';
import '../css/weui.css';
import {Link,browserHistory} from 'react-router-dom'

import Label from  '../component/Label';
import {getCheckbind, Getwxtoken,getUserInfo,putunbind,putbinding,putUserInfo} from '../DataInterface.js';
import UserinfoEdit from  './UserinfoEdit';
import UserinfoUnBind from './UserinfoUnBind.js';
import Undobind from './Undobind.js';
import Register from './Register.js';
import Activate from './Activate.js';
import Rpath from '../Rpath.js';
import Title from  '../component/Title.js';
import Button from '../component/Button.js';
import Msg from '../component/Msg.js';
import EmailInput from '../component/EmailInput.js';
import PasswordInput from '../component/PasswordInput.js';
import BackTitle from '../component/BackTitle.js';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.renderUnBind = this.renderUnBind.bind(this);
    this.renderBinded = this.renderBinded.bind(this);
    this.renderBinding = this.renderBinding.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderReg = this.renderReg.bind(this);
    this.renderAct = this.renderAct.bind(this);
    this.renderMsg = this.renderMsg.bind(this);

    this.runweixin = this.runweixin.bind(this);
    this.getBuserName = this.getBuserName.bind(this);
    this.getuser = this.getuser.bind(this);

    this.BindonClick = this.BindonClick.bind(this);
    this.GetReActive = this.GetReActive.bind(this);

    this.ToReg = this.ToReg.bind(this);
    this.ToBinded = this.ToBinded.bind(this);
    this.ToUnBind = this.ToUnBind.bind(this);
    this.ToUndoBind = this.ToUndoBind.bind(this);

    this.ToAct = this.ToAct.bind(this);
    this.ToMsg = this.ToMsg.bind(this);
    this.GetReBind = this.GetReBind.bind(this);
    this.GetReg = this.GetReg.bind(this);
    this.GetRUnbind = this.GetRUnbind.bind(this);

    this.EmailInputonChange = this.EmailInputonChange.bind(this);
    this.PassWordInputonChange = this.PassWordInputonChange.bind(this);
    this.MsgToPageonClick = this.MsgToPageonClick.bind(this);
    this.back = this.back.bind(this);

    this.state = {
      Pagestatus:'',
      MsgType:0,
      Msg:'',
      MsgToPage:'',
      MsgBtntext:'',
      user:0,
      wxtoken:'',
      ZCuserName:''
    }
  }

  getuser(value){
    if (!value.err) {
      let userJson = value.user;
      this.setState({
        user:userJson.user,
        BinduserName: userJson.userAcco,
        Pagestatus: 'Binded'
      });
    }
  }

  getBuserName(value){
    if (!value.err) {
      let userJson = value.user;
      this.setState({
        user:userJson.user,
        BinduserName: userJson.userAcco,
        Pagestatus: 'Binded'
      });
      //getUserInfo(userJson.user,userJson.userAcco,this.state.wxtoken,this.getuser);
    }else {
      this.setState({
        Pagestatus: 'UnBind'
      });
    }
  }

  runweixin(){
    window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx073bc48322db1362&redirect_uri=http%3A%2F%2Fwww.wumaobang.com%2Fweixin%2FwxVeris&response_type=code&scope=snsapi_userinfo&state=Fh24fS2a3#wechat_redirect");
  }

  componentWillMount(){
    let wxtoken=Getwxtoken();  //获取微信ID
    //alert("wxtoken="+wxtoken);
    if (wxtoken==''){
      this.runweixin();
    }else
    {
      this.setState({
        wxtoken:wxtoken
      });
      getCheckbind(wxtoken,this.getBuserName);
    }
  }

  GetReBind(value) {
    if (!value.err) {
      this.setState({
        MsgType:1,
        Msg:'绑定成功',
        MsgToPage:'Binded',
        MsgBtntext: '返回',
        BinduserName:value.userAcco,
        Pagestatus: 'Msg',
      });
    }
    else {
      this.setState({
        MsgType:2,
        Msg:value.errMsg,
        MsgBtntext: '返回',
        MsgToPage:'UnBind',
        Pagestatus: 'Msg',
      });
    }
  }

  GetRUnbind(value) {
    if (!value.err) {
      this.setState({
        Msg:'解绑成功',
        MsgType:1,
        MsgBtntext: '返回',
        MsgToPage:'UnBind',
        BinduserName:'',
        Pagestatus: 'Msg',
      });
    }
    else {
      this.setState({
        MsgToPage:'Binded',
        Msg:value.errMsg,
        MsgBtntext: '返回',
        MsgType:2,
        Pagestatus: 'Msg',
      });
    }
  }

  GetReActive(value) {
    console.log(value.errMsg);
    if (!value.err) {
      this.setState({
        Msg: '激活成功',
        MsgType: 1,
        MsgToPage: 'Binded',
        MsgBtntext: '返回',
        Pagestatus: 'Msg',
      });
    }
    else {
      this.setState({
        Msg: value.errMsg,
        MsgType: 2,
        MsgToPage: 'UnBind',
        MsgBtntext: '返回',
        Pagestatus: 'Msg',
      });
    }
  }

  GetReg(value,userName) {
    if (!value.err) {
      this.setState({
        Msg: '注册成功',
        MsgType: 1,
        MsgToPage: 'Act',
        MsgBtntext: '立即激活',
        ZCuserName:userName,
        Pagestatus: 'Msg',
      });
    }
    else {
      this.setState({
        Msg: value.errMsg,
        MsgType: 2,
        MsgToPage: 'Reg',
        MsgBtntext: '返回',
        Pagestatus: 'Msg',
      });
    }
  }

  EmailInputonChange(event) {
    this.setState({IBinduserName: event.target.value});
  }

  PassWordInputonChange(event) {
    this.setState({IBindpassWord: event.target.value});
  }

  BindonClick(){
    let IuserName = this.state.IBinduserName;
    let IpassWord = this.state.IBindpassWord;
    let wxtoken = this.state.wxtoken;
    putbinding(IuserName,IpassWord,wxtoken,this.GetRBind);
  }

  MsgToPageonClick(){
    this.setState({
      Pagestatus:this.state.MsgToPage
    });
  }

  back(){
    this.setState({
      Pagestatus:this.state.backto
    });
  }

  ToReg(){
    let a = this.state.Pagestatus;
    this.setState({
      Pagestatus: 'Reg',
      MsgToPage:a
    });
  }

  ToAct(){
    this.setState({
      Pagestatus: 'Act',
    });
  }

  ToBinded(){
    console.log(1111);
    this.setState({
      Pagestatus: 'Binded',
    });
  }

  ToUnBind(){
    this.setState({
      Pagestatus: 'UnBind',
    });
  }

  ToUndoBind(){
    this.setState({
      Pagestatus: 'Undobind',
    });
  }

  ToMsg(aMsgType,aMsg,aMsgToPage,aMsgBtntext){
    this.setState({
      MsgType:aMsgType,
      Msg: aMsg,
      MsgToPage:aMsgToPage,
      MsgBtntext:aMsgBtntext,
      Pagestatus: 'Msg',
    });
  }

  renderUnBind(){
    return  <div>
      <UserinfoUnBind wxtoken={this.state.wxtoken} GetReBind={this.GetReBind} RegOnClick={this.ToReg} ActOnClick={this.ToAct}/>
    </div>
  }

  renderBinded(){
    return <div>
      <UserinfoEdit ToUndoBind={this.ToUndoBind} ToReg={this.ToReg} wxtoken={this.state.wxtoken}/>
    </div>
  }

  renderBinding(){
    return  <div>
      <Title Titletext={'绑定账号'}/>
      <div className="weui-cells">
        <Label text={'邮箱账号'}/>

        <EmailInput promptProp={'请输入正确邮箱地址'} TextProp={this.state.BinduserName} updateStateProp={this.EmailInputonChange}/>

        <div className="weui-cell">
        </div>

        <Label text={'密码'}/>
        <PasswordInput promptProp={'请输入密码'} updateStateProp={this.PassWordInputonChange}/>
        <div className="weui-cell">
        </div>

        <Button text={'提交'} buttonstyle={"1"} ClickProp={this.BindonClick}/>
        <label className="weui-agree">
        <span className="weui-agree__text">
              还没账号，<Link to={Rpath+"/register"}>立即注册</Link>
          </span>
        </label>
      </div>
    </div>
  }

  renderEdit(){
    return  <div>
      <UserinfoEdit ToUndoBind={this.ToUndoBind} ToReg={this.ToReg} wxtoken={this.state.wxtoken}/>
    </div>
  }

  renderReg(){
    return  <div>
      <BackTitle backonClick={this.MsgToPageonClick}/>
      <div className="title_fixed_space"></div>
      <Register GetReg={this.GetReg} ActOnClick={this.ToAct}/>
    </div>
  }

  renderAct(){
    return  <div>
      <BackTitle backonClick={this.ToUnBind}/>
      <div className="title_fixed_space"></div>
      <Activate userName={this.state.ZCuserName} GetReActive={this.GetReActive} />
    </div>
  }

  renderUndobind(){
    return  <div>
      <BackTitle backonClick={this.ToUnBind}/>
      <div className="title_fixed_space"></div>
      <Undobind wxtoken={this.state.wxtoken} ToBinded={this.ToBinded} GetRUnbind={this.GetRUnbind}/>
    </div>
  }

  renderMsg(){
    return  <div>
      <Msg Text={this.state.Msg} Typeprop={this.state.MsgType} Btnprop={this.MsgToPageonClick} Btntextprop={this.state.MsgBtntext}/>
    </div>
  }

  render() {
    return (
      <div>
        
        {
          this.state.Pagestatus=='UnBind'?
            this.renderUnBind():undefined
        }
        {
          this.state.Pagestatus=='Binded'?
            this.renderBinded():undefined
        }
        {
          this.state.Pagestatus=='Binding'?
            this.renderBinding():undefined
        }
        {
          this.state.Pagestatus=='Undobind'?
            this.renderUndobind():undefined
        }
        {
          this.state.Pagestatus=='Edit'?
            this.renderEdit():undefined
        }
        {
          this.state.Pagestatus=='Reg'?
            this.renderReg():undefined
        }
        {
          this.state.Pagestatus=='Act'?
            this.renderAct():undefined
        }
        {
          this.state.Pagestatus=='Msg'?
            this.renderMsg():undefined
        }
      </div>
    );
  }
}
export default UserInfo;