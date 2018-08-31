import React, { Component } from 'react';
import '../css/weui.css';
import UnEnableInput from '../component/UnEnableInput.js'
import Button from '../component/Button.js'
import BackTitle from '../component/BackTitle.js';
import TelLabel from '../component/TelLabel.js';
import HTTPED from '../address';
import {getDataDetail} from '../DataInterface.js';

class CompsItemDetail extends Component {
  constructor(props) {
    super(props);
    this.getRDataDetail = this.getRDataDetail.bind(this);
    this.renderS = this.renderS.bind(this);
    this.state = {
      wxtoken:'',
      BinduserName:'',
      user:'',
      certNo:'',
      compName:'',
      compAlia:'',
      depositEnab:'',
      warn:'',
      posi:'',
      induName:'',
      mobi:'',
      phon:'',
      mail:'',
      addr:'',
      qq:'',
      portName:'',
      logo:'',
      vippic:'',
      warnpic:'',
      trustpic:'',
      Pagestatus:'',
    }
  }

  componentWillMount(){
    let SelectJson = this.props.SelectJson;
    this.getRDataDetail(SelectJson);
  }

  getRDataDetail(value){
    let dispsJson =value;
    let a ='';
    let b ='';
    let logo = '';
    let trustpic = '';
    let warnpic = '';
    let vippic = '';
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
    if (dispsJson.logo!=null) {
      logo = dispsJson.logo
    } else {
      logo =  '/images/nlogo.png'
    }
    vippic = 'images/vip.png';
    this.setState({
      certNo:dispsJson.certNo,
      compName:dispsJson.compName,
      compAlia:dispsJson.compAlia,
      userAcco:dispsJson.userAcco,
      induName:dispsJson.induName,
      portName:dispsJson.portName,
      posi:dispsJson.posi,
      mobi:dispsJson.mobi,
      phon:dispsJson.phon,
      qq:dispsJson.qq,
      mail:dispsJson.mail,
      addr:dispsJson.addr,
      depositEnab:a,
      warn:b,
      logo:HTTPED + logo,
      vippic:HTTPED + vippic,
      trustpic:HTTPED + trustpic,
      warnpic:HTTPED + warnpic,
      Pagestatus:'S'
    });
  }

  renderS(){
    return  <div>
      <BackTitle backonClick={this.props.backprop}/>
      <div className="nocolor_panel"></div>
      <div className="DIVLOGO"><img className="LOGO" src={this.state.logo}/></div>
      <div className="nocolor_panel"></div>
      <div className="weui-flex">
        <div className="weui-flex__item"><p className="CenterText_Natitle"><img className="LabelImage" src={this.state.vippic}/>已认证</p></div>
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
        <UnEnableInput captionProp={'认证编号'} promptProp={'-'} textProp={this.state.certNo}/>
        <UnEnableInput captionProp={'公司全称'} promptProp={'-'} textProp={this.state.compName}/>
        <UnEnableInput captionProp={'账号'} promptProp={'-'} textProp={this.state.userAcco}/>
        <UnEnableInput captionProp={'行业'} promptProp={'-'} textProp={this.state.induName}/>
        <UnEnableInput captionProp={'口岸'} promptProp={'-'} textProp={this.state.portName}/>
        <UnEnableInput captionProp={'职位'} promptProp={'-'} textProp={this.state.posi}/>
        <TelLabel captionProp={'手机'} promptProp={'-'} textProp={this.state.mobi}/>
        <UnEnableInput captionProp={'电话'} promptProp={'-'} textProp={this.state.phon}/>
        <UnEnableInput captionProp={'QQ'} promptProp={'-'} textProp={this.state.qq}/>
        <UnEnableInput captionProp={'邮箱'} promptProp={'-'} textProp={this.state.mail}/>
        <UnEnableInput captionProp={'地址'} promptProp={'-'} textProp={this.state.addr}/>
      </div>
      <Button text={'返回'} buttonstyle="2" ClickProp={this.props.backprop}/>
    </div>
  }

  render() {
    return (
      <div>
        {
          this.state.Pagestatus=='S'?
            this.renderS():undefined
        }
      </div>
    );
  }
}
export default CompsItemDetail;