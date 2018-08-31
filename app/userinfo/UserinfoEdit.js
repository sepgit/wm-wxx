import React, { Component } from 'react';
import '../css/weui.css';
import SkipLabel from  '../component/SkipLabel';
import PortsList from '../advancedcomponent/PortsList.js';
import Button from '../component/Button.js';
import Msg from '../component/Msg.js';
import StrInput from  '../component/StrInput.js';
import Title from  '../component/Title.js';
import UnEnableInput from '../component/UnEnableInput.js';
import IndusList from '../advancedcomponent/IndusList.js';
import {getCheckbind, getUserInfo,Getwxtoken,putUserInfo,putunbind} from '../DataInterface.js';

class UserinfoEdit extends Component {
  constructor(props) {
    super(props);
    this.renderMain = this.renderMain.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderInduSelect = this.renderInduSelect.bind(this);
    this.renderPortSelect = this.renderPortSelect.bind(this);
    this.renderMsg = this.renderMsg.bind(this);

    this.getRUserInfo = this.getRUserInfo.bind(this);
    this.putRUserInfo = this.putRUserInfo.bind(this);
    this.getBuserName = this.getBuserName.bind(this);
    this.NameInputonChange = this.NameInputonChange.bind(this);
    this.mobiInputonChange = this.mobiInputonChange.bind(this);
    this.compNameInputonChange = this.compNameInputonChange.bind(this);
    this.compAliaInputonChange = this.compAliaInputonChange.bind(this);
    this.mailInputonChange = this.mailInputonChange.bind(this);
    this.phonInputonChange = this.phonInputonChange.bind(this);
    this.faxInputonChange = this.faxInputonChange.bind(this);
    this.qqInputonChange = this.qqInputonChange.bind(this);
    this.addrInputonChange = this.addrInputonChange.bind(this);
    this.posiInputonChange = this.posiInputonChange.bind(this);
    this.EditonClick = this.EditonClick.bind(this);
    this.InduonClick = this.InduonClick.bind(this);
    this.GetinduID = this.GetinduID.bind(this);
    this.PortonClick = this.PortonClick.bind(this);
    this.GetPortID = this.GetPortID.bind(this);
    this.back=this.back.bind(this);
    this.ToMain = this.ToMain.bind(this);
    this.ToEdit = this.ToEdit.bind(this);
    this.UnBindonClick = this.UnBindonClick.bind(this);
    this.MsgToPageonClick = this.MsgToPageonClick.bind(this);

    this.state = {
      Pagestatus:'',
      MsgType:0,
      Msg:'',
      MsgToPage:'',
      MsgBtntext:'',
      BinduserName:'',
      admiAcco:'',
      comp:'',
      wxtoken:'',
      Name:'',
      indu:0,
      induName:'',
      posi:'',
      port:0,
      portName:'',
      mobi:'',
      compName:'',
      compAlia:'',
      mail:'',
      phon:'',
      fax:'',
      permission:1,
      NameState:-1,
      induNameState:-1,
      posiState:-1,
      portNameState:-1,
      mobiState:-1,
      compNameState:-1,
      compAliaState:-1,
      mailState:-1,
      phonState:-1,
      faxState:-1,
      qqState:-1,
      addrState:-1
    }
  }

  componentWillMount() {
    let wxtoken = '';
    wxtoken = this.props.wxtoken;    //从上级传入
    if (wxtoken=='') {
      wxtoken=Getwxtoken();           //如果没有从Cookie中取
    }
    this.setState({
      wxtoken:wxtoken,
    });
    getCheckbind(wxtoken,this.getBuserName);
  }

  getBuserName(value){
    if (!value.err) {
      let userJson = value.user;
      this.setState({
        BinduserName: userJson.userAcco,
        cont: userJson.user
      });
      let cont = userJson.user;
      let BinduserName = userJson.userAcco;
      let wxtoken = this.state.wxtoken;
      getUserInfo(cont, BinduserName, wxtoken, this.getRUserInfo);
    }
  }

  UnBindonClick(){
    this.props.ToUndoBind;
  }

  getRUserInfo(value){
    if (!value.err) {
      let userJson = value.user;
      let p = -1;
      if (userJson.comp==0) {
        this.setState({
          NameState:1,
          induNameState:1,
          PosiState:1,
          portNameState:1,
          mobiState:1,
          compNameState:1,
          compAliaState:1,
          mailState:1,
          phonState:1,
          faxState:1,
          qqState:1,
          addrState:1
        });
      } else if (userJson.userAcco==userJson.admiAcco){
        this.setState({
          NameState:1,
          induNameState:0,
          PosiState:1,
          portNameState:0,
          mobiState:1,
          compNameState:0,
          compAliaState:0,
          mailState:1,
          phonState:1,
          faxState:1,
          qqState:1,
          addrState:1
        });
      } else {
        this.setState({
          NameState:0,
          induNameState:0,
          PosiState:0,
          portNameState:0,
          mobiState:1,
          compNameState:0,
          compAliaState:0,
          mailState:1,
          phonState:1,
          faxState:1,
          qqState:1,
          addrState:0
        });
      }
      this.setState({
        user:userJson.user,
        userAcco: userJson.userAcco,
        admiAcco:userJson.admiAcco,
        comp:userJson.comp,
        Name: userJson.name,
        posi:userJson.posi,
        portName:userJson.portName,
        mobi:userJson.mobi,
        mail:userJson.mail,
        addr:userJson.addr,
        qq:userJson.qq,
        indu:userJson.indu,
        induName:userJson.induName,
        Posi:userJson.Posi,
        port:userJson.port,
        compName:userJson.compName,
        compAlia:userJson.compAlia,
        phon:userJson.phon,
        fax:userJson.fax,
        permission:p,
        Pagestatus: 'Main'
      });
    }
  }

  back(){
    this.setState({
      Pagestatus:'Edit'
    });
  }

  NameInputonChange(event) {
    this.setState({Name: event.target.value});
  }

  InduonClick(){
    this.setState({
      Pagestatus: 'Indu',
      backto:'Main'
    });
  }

  GetinduID(a,b){
    this.setState({
      Pagestatus: 'Edit',
      indu:a,
      induName:b
    });
  }

  posiInputonChange(event) {
    this.setState({posi: event.target.value});
  }

  PortonClick(){
      let b = this.state.Pagestatus;
      this.setState({
        backto:b,
        Pagestatus:'Port'
      });
  }

  GetPortID(a,b){
    if (a>0){
      this.setState({
        Pagestatus:'Edit',
        port:a,
        portName:b
      });
    }
  }

  mobiInputonChange(event) {
    this.setState({mobi: event.target.value});
  }

  compNameInputonChange(event) {
    this.setState({compName: event.target.value});
  }

  compAliaInputonChange(event) {
    this.setState({compAlia: event.target.value});
  }

  mailInputonChange(event) {
    this.setState({mail: event.target.value});
  }

  phonInputonChange(event) {
    this.setState({phon: event.target.value});
  }

  faxInputonChange(event) {
    this.setState({fax: event.target.value});
  }

  qqInputonChange(event) {
    this.setState({qq: event.target.value});
  }

  addrInputonChange(event) {
    this.setState({addr: event.target.value});
  }

  EditonClick(){
    let user = this.state.user;
    let wxtoken = this.state.wxtoken;
    let userName=this.state.BinduserName;
    let name = this.state.Name;
    let qq = this.state.qq;
    let compName = this.state.compName;
    let compAlia = this.state.compAlia;
    let indu = this.state.indu;
    let port = this.state.port;
    let addr = this.state.addr;
    let posi = this.state.posi;
    let phon = this.state.phon;
    let fax = this.state.fax;
    let mobi = this.state.mobi;
    let mail = this.state.mail;
    putUserInfo(userName,wxtoken,user,name,qq,compName,compAlia,indu,port,addr,posi,phon,fax,mobi,mail,this.putRUserInfo);
  }

  putRUserInfo(value){
    if (!value.err) {
      this.setState({
        Msg:'修改成功',
        MsgToPage:'Main',
        MsgBtntext: '返回',
        MsgType:1,
        Pagestatus: 'Msg',
      });
    }
    else {
      this.setState({
        Msg:value.errMsg,
        MsgToPage:'Edit',
        MsgBtntext: '返回',
        MsgType:2,
        Pagestatus: 'Msg',
      });
    }
  }

  ToMain(){
    this.setState({
      Pagestatus: 'Main'
    });
  }

  ToEdit(){
    this.setState({
      Pagestatus: 'Edit'
    });
  }

  MsgToPageonClick(){
    this.setState({
      Pagestatus:this.state.MsgToPage
    });
  }

  renderMain() {
    return (
      <div>
        <Title Titletext={'个人信息'}/>
        <div className="weui-cells">
          <UnEnableInput captionProp={'账号'} promptProp={'-'} textProp={this.state.BinduserName}/>
          <UnEnableInput captionProp={'行业'} promptProp={'-'} textProp={this.state.induName}/>
          <UnEnableInput captionProp={'口岸'} promptProp={'-'} textProp={this.state.portName}/>
          <UnEnableInput captionProp={'公司全称'} promptProp={'-'} textProp={this.state.compName}/>
          <UnEnableInput captionProp={'公司简称'} promptProp={'-'} textProp={this.state.compAlia}/>
          <UnEnableInput captionProp={'姓名'} promptProp={'-'} textProp={this.state.Name}/>
          <UnEnableInput captionProp={'职位'} promptProp={'-'} textProp={this.state.posi}/>
          <UnEnableInput captionProp={'地址'} promptProp={'-'} textProp={this.state.addr}/>
          <UnEnableInput captionProp={'手机'} promptProp={'-'} textProp={this.state.mobi}/>
          <UnEnableInput captionProp={'邮箱'} promptProp={'-'} textProp={this.state.mail}/>
          <UnEnableInput captionProp={'电话'} promptProp={'-'} textProp={this.state.phon}/>
          <UnEnableInput captionProp={'传真'} promptProp={'-'} textProp={this.state.fax}/>
          <UnEnableInput captionProp={'QQ'} promptProp={'-'} textProp={this.state.qq}/>
        </div>
        <Button text={'编辑信息'} buttonstyle="1" ClickProp={this.ToEdit}/>
        <div className="weui-msg">
          <div className="weui-msg__text-area">
            <p className="weui-msg__desc">更换账号，<a href="javascript:void(0);" onClick={this.props.ToUndoBind}>解除绑定</a></p>
            <p className="weui-msg__desc">　</p>
            <p className="weui-msg__desc">注册新账号，<a href="javascript:void(0);" onClick={this.props.ToReg}>注册</a></p>
          </div>
        </div>
      </div>
    );
  }

  renderEdit(){
    return  <div>
      <Title Titletext={'个人信息'}/>
      <div className="weui-cells">
        <StrInput caption={'账号'} promptProp={'-'} TextProp={this.state.BinduserName} Enable={'0'}/>
        <SkipLabel caption={'行业'} text={this.state.induName} Enable={this.state.induNameState} SelfonClick={this.InduonClick}/>
        <SkipLabel caption={'口岸'} text={this.state.portName} Enable={this.state.portNameState} SelfonClick={this.PortonClick}/>
        <StrInput caption={'公司全称'} promptProp={'请输入公司全称'} TextProp={this.state.compName} Enable={this.state.compNameState} updateStateProp={this.compNameInputonChange}/>
        <StrInput caption={'公司简称'} promptProp={'请输入公司简称'} TextProp={this.state.compAlia} Enable={this.state.compAliaState} updateStateProp={this.compAliaInputonChange}/>
        <StrInput caption={'姓名'} promptProp={'请输入姓名'} TextProp={this.state.Name} Enable={this.state.NameState} updateStateProp={this.NameInputonChange}/>
        <StrInput caption={'职位'} promptProp={'请输入职位'} TextProp={this.state.posi} Enable={this.state.PosiState} updateStateProp={this.posiInputonChange}/>
        <StrInput caption={'地址'} promptProp={'请输入地址'} TextProp={this.state.addr} Enable={this.state.addrState} updateStateProp={this.addrInputonChange}/>
        <StrInput caption={'手机'} promptProp={'请输入手机号'} TextProp={this.state.mobi} Enable={this.state.mobiState} updateStateProp={this.mobiInputonChange}/>
        <StrInput caption={'邮箱'} promptProp={'请输入邮箱'} TextProp={this.state.mail} Enable={this.state.mailState} updateStateProp={this.mailInputonChange}/>
        <StrInput caption={'电话'} promptProp={'请输入手电话'} TextProp={this.state.phon} Enable={this.state.phonState} updateStateProp={this.phonInputonChange}/>
        <StrInput caption={'传真'} promptProp={'请输入传真'} TextProp={this.state.fax} Enable={this.state.faxState} updateStateProp={this.faxInputonChange}/>
        <StrInput caption={'QQ'} promptProp={'请输入QQ'} TextProp={this.state.qq} Enable={this.state.qqState} updateStateProp={this.qqInputonChange}/>
      </div>
      <Button text={'提交'} buttonstyle="1"  ClickProp={this.EditonClick}/>
      <Button text={'取消'} buttonstyle="2" ClickProp={this.ToMain}/>
    </div>
  }

  renderInduSelect(){
    return  <div>
      <div className="weui-cells">
        <IndusList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} GetSelectID={this.GetinduID} backprop={this.back} />
      </div>
    </div>
  }

  renderPortSelect(){
    return  <div>
      <div className="weui-cells">
        <PortsList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv='0' GetSelectID={this.GetPortID} backprop={this.back}/>
      </div>
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
          this.state.Pagestatus=='Main'?
            this.renderMain():undefined
        }
        {
          this.state.Pagestatus=='Edit'?
            this.renderEdit():undefined
        }
        {
          this.state.Pagestatus=='Indu'?
            this.renderInduSelect():undefined
        }
        {
          this.state.Pagestatus=='Port'?
            this.renderPortSelect():undefined
        }
        {
          this.state.Pagestatus=='Msg'?
            this.renderMsg():undefined
        }
      </div>
    );
  }
}
export default UserinfoEdit;