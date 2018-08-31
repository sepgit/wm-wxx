import React, { Component } from 'react';
import '../css/weui.css';
import UnEnableInput from '../component/UnEnableInput.js'
import Button from '../component/Button.js'
import BackTitle from '../component/BackTitle.js';
import TelLabel from '../component/TelLabel.js';
import {getDataDetail,postProv} from '../DataInterface.js';
import HTTPED from '../address';

class BaiduItemDetail extends Component {
  constructor(props) {
    super(props);
    this.getRDataDetail = this.getRDataDetail.bind(this);
    this.AddProvonClick = this.AddProvonClick.bind(this);
    this.GetscorsonClick = this.GetscorsonClick.bind(this);

    this.state = {
      wxtoken:'',
      BinduserName:'',
      Type:'',          //YJ,FW,TZ
      user:'',
      compAliaName:'',
      compName:'',
      portName:'',
      posi:'',
      induName:'',
      carrName:'',
      mobi:'',
      mail:'',
      addr:'',
      qq:'',

      cont:0,
      serv:0,
      port:0,
      booking:0,
      freight:0,
      qing:0,
      shipSpace:0,
      advDetail:'',

      userVip:'',
      warn:'',
      depositEnab:'',
      scor:0,
      winRepl:0,
      allRepl:0,
      scors:[],
      logo:'',
      vippic:'',
      warnpic:'',
      trustpic:'',
      Pagestatus:''
    }
  }

  componentWillMount(){
    let url = '';
    let urlpriv = '';
    let keyID = this.props.keyID;
    let BinduserName = this.props.BinduserName;
    let wxtoken = this.props.wxtoken;
    this.setState({
      BinduserName:this.props.BinduserName,
      wxtoken:this.props.wxtoken,
      cont:this.props.cont,
      serv:this.props.serv,
      port:this.props.port,
      Type:this.props.Type
    });
    if (this.props.Type!='FW')
    {
      url = 'api/disps/'+keyID+'/?userName='+BinduserName+'&wxtoken='+wxtoken+'&isAdva=true';
    } else {
      url = 'api/disps/'+keyID+'/?userName='+BinduserName+'&wxtoken='+wxtoken+'&isCont=true';
    }
    getDataDetail(url,this.getRDataDetail);

    //urlpriv = 'api/disps/'+keyID+'/?userName='+BinduserName+'&wxtoken='+wxtoken+'&isAdva=true';
  }

  getRDataDetail(value){
    let a ='';
    let b ='';
    let c = '';
    let v ='';
    let cn='';
    let logo = '';
    let trustpic = '';
    let warnpic = '';
    let vippic = '';
    let dispsJson ='';
    if (!value.err) {
      if (this.props.Type!='FW')
      {
        dispsJson = value.adva;
        cn = dispsJson.carrName;
      } else {
        dispsJson = value.cont;
      }

      if (dispsJson.depositEnab==1) {
        a='已授信';
        trustpic='images/trust.png';
      } else
      {
        a='未授信'
      }
      if (dispsJson.warn==1) {
        b='已预警';
        warnpic='images/warn.png';
      } else
      {
        b='未预警'
      }
      if (dispsJson.userVip==1) {
        c='已认证';
        vippic = 'images/vip.png';
      } else
      {
        c='未认证'
      }
      if (dispsJson.booking==1){
        v = v+'直接订舱；';
      }
      if (dispsJson.freight==1){
        v = v+'运价；';
      }
      if (dispsJson.qing==1){
        v = v+'DDP/DDU；';
      }
      if (dispsJson.shipSpace==1){
        v = v+'舱位；';
      }
      if (dispsJson.logo!= null) {
        logo = dispsJson.logo;
      } else {
        logo =  'images/nlogo.png';
      }
      this.setState({
        user:dispsJson.user,
        compAliaName:dispsJson.compAliaName,
        compName:dispsJson.compName,
        posi:dispsJson.posi,
        induName:dispsJson.induName,
        mobi:dispsJson.mobi,
        mail:dispsJson.mail,
        addr:dispsJson.addr,
        qq:dispsJson.contQq,
        portName:dispsJson.userPort,
        booking:dispsJson.booking,
        freight:dispsJson.freight,
        qing:dispsJson.qing,
        shipSpace:dispsJson.shipSpace,
        advDetail:v,
        depositEnab:a,
        warn:b,
        userVip:c,
        carrName:cn,
        scor:dispsJson.scor,
        winRepl:dispsJson.winRepl,
        allRepl:dispsJson.allRepl,
        scors:dispsJson.scors,
        logo:HTTPED + logo,
        vippic:HTTPED + vippic,
        trustpic:HTTPED + trustpic,
        warnpic:HTTPED + warnpic,
        Pagestatus:'S'
       /* scor:8,
        winRepl:10,
        allRepl:10,
        scors:[{'scorDet':'服务好','scorTime':'2018-09-09 12:00:00'},{'scorDet':'服务差','scorTime':'2018-09-09 12:00:10'}] */
      });
    }
  }

  AddProvonClick(){
    let a= this.state.user;
    this.props.AddpProp(a);
  }

  GetscorsonClick(){
    let scor= this.state.scor;
    let winRepl= this.state.winRepl;
    let allRepl= this.state.allRepl;
    let scors= this.state.scors;
    this.props.GetEvaluate(scor,winRepl,allRepl,scors);
  }

  render() {
    return (
      <div>
        {
          this.state.Pagestatus=='S'?
            <div>
              <BackTitle backonClick={this.props.backprop}/>
              <div className="nocolor_panel"></div>
              <div className="DIVLOGO"><img className="LOGO" src={this.state.logo}/></div>
              <div className="nocolor_panel"></div>
              <div className="weui-flex">
                {
                  this.state.userVip == '已认证'?
                    <div className="weui-flex__item"><p className="CenterText_Natitle"><img className="LabelImage" src={this.state.vippic}/>{this.state.userVip}</p></div>:
                    <div className="weui-flex__item"><p className="CenterText_Natitle">{this.state.userVip}</p></div>
                }
                {
                  this.state.depositEnab == '已授信'?
                    <div className="weui-flex__item"><p className="CenterText_Natitle"><img className="LabelImage" src={this.state.trustpic}/>{this.state.depositEnab}</p></div>:
                    <div className="weui-flex__item"><p className="CenterText_Natitle">{this.state.depositEnab}</p></div>
                }
                {
                  this.state.warn == '已预警'?
                    <div className="weui-flex__item"><p className="CenterText_Natitle"><img className="LabelImage" src={this.state.warnpic}/>{this.state.warn}</p></div>:
                    <div className="weui-flex__item"><p className="CenterText_Natitle">{this.state.warn}</p></div>
                }
              </div>
              <div className="nocolor_panel"></div>
              <div className="weui-cells">
                <UnEnableInput captionProp={'公司全称'} promptProp={'-'} textProp={this.state.compName}/>
                <UnEnableInput captionProp={'职位'} promptProp={'-'} textProp={this.state.posi}/>
                <UnEnableInput captionProp={'行业'} promptProp={'-'} textProp={this.state.induName}/>
                <UnEnableInput captionProp={'口岸'} promptProp={'-'} textProp={this.state.portName}/>
                <TelLabel captionProp={'手机'} promptProp={'尚未绑定手机号'} textProp={this.state.mobi}/>
                <UnEnableInput captionProp={'邮箱'} promptProp={'-'} textProp={this.state.mail}/>
                <UnEnableInput captionProp={'地址'} promptProp={'-'} textProp={this.state.addr}/>
                <UnEnableInput captionProp={'QQ'} promptProp={'-'} textProp={this.state.qq}/>
                {
                  this.state.Type == 'YJ' ?
                    <UnEnableInput captionProp={'承运商'} promptProp={'-'} textProp={this.state.carrName}/>: undefined
                }
                {
                  this.state.Type == 'YJ' ?
                    <UnEnableInput captionProp={'优势明细'} promptProp={'-'} textProp={this.state.advDetail}/>: undefined
                }
              </div>
              <Button text={'查看评论'} buttonstyle="1" ClickProp={this.GetscorsonClick}/>
              <Button text={'添加供应商'} buttonstyle="1" ClickProp={this.AddProvonClick}/>
            </div>:undefined
        }
      </div>
    );
  }
}
export default BaiduItemDetail;