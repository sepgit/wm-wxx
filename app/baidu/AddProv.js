import React, { Component } from 'react';
import '../css/weui.css';
import UnEnableInput from '../component/UnEnableInput.js'
import Msg from '../component/Msg.js';
import SkipLabel from  '../component/SkipLabel.js';
import StrInput from '../component/StrInput.js';
import Title from '../component/Title.js';
import Button from '../component/Button.js';
import BackTitle from '../component/BackTitle.js';
import ServList from '../advancedcomponent/ServList.js';
import PortsList from '../advancedcomponent/DepaPortsList.js';
import {getUserInfo,postProv} from '../DataInterface.js';

class AddProv extends Component {
  constructor(props) {
    super(props);
    this.renderMain = this.renderMain.bind(this);               //主界面
    this.renderServSelect = this.renderServSelect.bind(this);   //服务类型选择界面
    this.renderPortSelect = this.renderPortSelect.bind(this);   //港口选择界面
    this.renderMsg = this.renderMsg.bind(this);                 //Msg界面

    this.ServonClick = this.ServonClick.bind(this);
    this.PortonClick = this.PortonClick.bind(this);
    this.AddProvonClick = this.AddProvonClick.bind(this);       //添加供应商

    this.getRUserInfo = this.getRUserInfo.bind(this);
    this.back = this.back.bind(this);
    this.GetservID = this.GetservID.bind(this);
    this.GetPortID = this.GetPortID.bind(this);
    this.Getlabe = this.Getlabe.bind(this);
    this.GetAddProvMsg = this.GetAddProvMsg.bind(this);

    this.state = {
      BinduserName:'',
      wxtoken:'',
      Pagestatus:'',
      backto:'',
      cont:0,
      userAcco:'',
      serv:0,
      servName:'',
      port:0,
      portName:'',
      labe:''
    }
  }

  componentWillMount(){
    let cont = this.props.cont;
    let BinduserName = this.props.BinduserName;
    let wxtoken = this.props.wxtoken;
    this.setState({
      Pagestatus:'Main',
      BinduserName:this.props.BinduserName,
      wxtoken:this.props.wxtoken,
      cont:this.props.cont,
    });
    getUserInfo(cont,BinduserName,wxtoken,this.getRUserInfo);
  }

  getRUserInfo(value){
    if (!value.err) {
      let userJson = value.user;
      this.setState({
        userAcco: userJson.userAcco
      });
    }
  }

  ServonClick(){
    this.setState({
      backto:'Main',
      Pagestatus:'Serv'
    });
  }

  GetservID(a,b){
    if (a>0){
      this.setState({
        Pagestatus:'Main',
        serv:a,
        servName:b
      });
    }
  }

  PortonClick(){
    this.setState({
      backto:'Main',
      Pagestatus:'Port'
    });
  }

  GetPortID(a,b){
    if (a>0){
      this.setState({
        Pagestatus:'Main',
        port:a,
        portName:b
      });
    }
  }

  Getlabe(event) {
    this.setState({
      labe: event.target.value
    });
  }

  AddProvonClick(){
    let cont = this.state.cont;
    let userName = this.state.BinduserName;
    let wxtoken = this.state.wxtoken;
    let serv = this.state.serv;
    let port = this.state.port;
    let servOpti=0;
    let labe =this.state.labe;
    postProv(userName,wxtoken,serv,servOpti,port,cont,labe, this.GetAddProvMsg)
  }

  back(){
    this.setState({
      Pagestatus:this.state.backto
    });
  }

  GetAddProvMsg(value){
    if (!value.err) {
      this.setState({
        MsgType:1,
        Pagestatus:'Msg',
        Msg:'添加成功',
        backto:'Main'
      });
    }
    else {
      this.setState({
        MsgType:2,
        Pagestatus: 'Msg',
        Msg:value.errMsg,
        backto:'Main'
      });
    }
  }

  renderMain(){
    return  <div>
      <BackTitle backonClick={this.props.backprop}/>
      <Title Titletext={'新增供应商'}/>
      <div className="weui-cells">
        {
          this.state.userAcco==''?
           <UnEnableInput captionProp={'账号'} promptProp={'-'} textProp={''}/>:
            <UnEnableInput captionProp={'账号'} promptProp={''} textProp={this.state.userAcco}/>
        }

        <div className="weui-cell">
        </div>

        {
          this.state.servName==''?
            <SkipLabel caption={'服务类型'} text={'请选择类型'} SelfonClick={this.ServonClick}/>:
            <SkipLabel caption={'服务类型'} text={this.state.servName} SelfonClick={this.ServonClick}/>
        }
        {
          this.state.portName==''?
            <SkipLabel caption={'口岸'} text={'请选择口岸'} SelfonClick={this.PortonClick}/>:
            <SkipLabel caption={'口岸'} text={this.state.portName} SelfonClick={this.PortonClick}/>
        }

        <StrInput caption={'备注'} promptProp={'请输入备注信息'} updateStateProp={this.Getlabe}/>
      </div>
      <div className="button-sp-area">
        <Button text={'完成'} buttonstyle="1" ClickProp={this.AddProvonClick}/>
      </div>
    </div>
  }

  renderServSelect(){
    return  <div>
      <div className="weui-cells">
        <ServList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} servType='6'  GetSelectID={this.GetservID} backprop={this.back} />
      </div>
    </div>
  }

  renderPortSelect(){
    return  <div>
      <div className="weui-cells">
        <PortsList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.serv} GetSelectID={this.GetPortID} backprop={this.back}/>
      </div>
    </div>
  }

  renderMsg(){
    return  <div>
      <Msg Text={this.state.Msg} Typeprop={this.state.MsgType} Btnprop={this.back} Btntextprop={'返回'}/>
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
          this.state.Pagestatus=='Serv'?
            this.renderServSelect():undefined
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
export default AddProv;