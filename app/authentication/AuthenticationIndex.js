import React, { Component } from 'react';
import '../css/weui.css';
import Msg from '../component/Msg.js';
import Authentication from './Authentication.js';
import AuthentPRights from './AuthentPRights.js';
import AuthentCRights from './AuthentCRights.js';
import AuthentPriceList from './AuthentPriceList.js';
import BackTitle from '../component/BackTitle.js';
import Button from '../component/Button.js';
import {getDataDetail,Getwxtoken,getCheckbind,postVip} from '../DataInterface.js';
import HTTPED from '../address';

class AuthenticationIndex extends Component {
  constructor(props) {
    super(props);
    this.renderRights = this.renderRights.bind(this);
    this.renderPRights = this.renderPRights.bind(this);
    this.renderCRights = this.renderCRights.bind(this);
    this.renderisVip = this.renderisVip.bind(this);
    this.rendernoVip = this.rendernoVip.bind(this);
    this.renderchkAudi = this.renderchkAudi.bind(this);
    this.renderPrice = this.renderPrice.bind(this);
    this.renderMsg = this.renderMsg.bind(this);

    this.ToOtherpage = this.ToOtherpage.bind(this);
    this.ToAnOtherpage = this.ToAnOtherpage.bind(this);
    this.TochkAudi = this.TochkAudi.bind(this);
    this.ToRights = this.ToRights.bind(this);
    this.BackToState = this.BackToState.bind(this);

    this.getRisVipDataDetail = this.getRisVipDataDetail.bind(this);
    this.getRchkAudi = this.getRchkAudi.bind(this);
    this.getRchkAudiDataDetail = this.getRchkAudiDataDetail.bind(this);
    this.getBuserName = this.getBuserName.bind(this);

    this.state = {
      Pagestatus:'',
      isVip:'',
      isAudi:'',
      BinduserName:'',
      wxtoken:'',
      user:0,
      MsgType:-1,
      Msg:'',
      MsgPic:'',
      BtnMsg:'',
      ToPage:'',
      NuCheckPic:'',
      StatePage:'',
    }
  }

  componentWillMount(){
    this.setState({
      NuCheckPic:HTTPED+ "images/NuCheck.png"
    });
    let wxtoken=Getwxtoken();  //获取微信ID
    this.setState({
      wxtoken:wxtoken,
    });
    getCheckbind(wxtoken,this.getBuserName);
  }

  getBuserName(value){
    let url = '';
    if (!value.err) {
      let userJson = value.user;
      let BinduserName = userJson.userAcco;
      let wxtoken = this.state.wxtoken;
      this.setState({
        BinduserName: userJson.userAcco,
        user:userJson.user
      });
      url = 'api/vips/?userName='+BinduserName+'&wxtoken='+wxtoken+'&chkVip=true';
      getDataDetail(url,this.getRisVipDataDetail);
      url = 'api/vips/?userName='+BinduserName+'&wxtoken='+wxtoken+'&chkAudi=true';
      getDataDetail(url,this.getRchkAudiDataDetail);
    }
  }

  getRisVipDataDetail(value){
    if (!value.err) {
      let a = value.isVip;
      console.log(a);
      if (a==true) {
        this.setState({
          isVip: a,
          MsgType:1,
          StatePage:'isVip',
          Pagestatus:'isVip'
        });
      } else {
        this.setState({
          isVip: a,
          MsgType:0,
          StatePage:'noVip',
          Pagestatus:'noVip'
        });
      }
    }
  }

  getRchkAudiDataDetail(value){
    if (!value.err) {
      if (value.isAudi){
        this.setState({
          isVip: true,
          MsgType:5,
          StatePage:'chkAudi',
          Pagestatus:'chkAudi'
        });
      }
    }
  }

  getRchkAudi(value){
    if (!value.err) {
      this.setState({
        isVip: true,
        MsgType:5,
        StatePage:'chkAudi',
        Pagestatus:'chkAudi'
      });
    } else{
      this.setState({
        MsgType:2,
        Msg:value.errMsg,
        BtnMsg:'返回',
        Pagestatus:'Msg',
        StatePage:'noVip',
      });
    }
  }

  ToOtherpage(v){
    this.setState({
      Pagestatus: v,
    });
  }

  ToAnOtherpage(){
    this.setState({
      Pagestatus: this.state.ToPage,
    });
  }

  TochkAudi(){
    let userName = this.state.BinduserName;
    let wxtoken = this.state.wxtoken;
    postVip(userName,wxtoken, this.getRchkAudi);
  }

  ToRights(){
    this.setState({
      Pagestatus: 'Rights'
    });
  }

  BackToState(){
    this.setState({
      Pagestatus: this.state.StatePage,
    });
  }

  renderRights(){
      return  <div>
        <BackTitle backonClick={this.BackToState}/>
        <Authentication ToOtherpage={this.ToOtherpage} BackToState={this.BackToState}/>
      </div>
  }

  renderPRights(){
    return  <div>
      <BackTitle backonClick={this.BackToState}/>
      <AuthentPRights ToOtherpage={this.ToOtherpage} BackToState={this.BackToState}/>
    </div>
  }

  renderCRights(){
    return  <div>
      <BackTitle backonClick={this.BackToState}/>
      <AuthentCRights ToOtherpage={this.ToOtherpage} BackToState={this.BackToState}/>
    </div>
  }

  renderisVip(){
    return  <div>
      <Msg Typeprop={this.state.MsgType} Text={'认证已经通过'} Btntextprop={'查看认证会员权益'} Btnprop={this.ToRights}/>
      <div className="weui-msg__text-area">
        <a className="weui-btn weui-btn_primary" href="javascript:">{'认证续费'}</a>
      </div>
    </div>
  }

  rendernoVip(){
    return  <div>
      <Msg Typeprop={0} Text={'未认证'} Btntextprop={'立即认证'} Btnprop={this.TochkAudi} Pic={this.state.NuCheckPic}/>
      <div className="weui-msg__text-area">
        <a className="weui-btn weui-btn_primary" href="javascript:" onClick={this.ToRights}>{'查看认证会员权益'}</a>
      </div>
    </div>
  }

  renderchkAudi(){
    return  <div>
      <Msg Typeprop={this.state.MsgType} Text={'认证会员审核中'} Btntextprop={'查看认证会员权益'} Btnprop={this.ToRights} />
    </div>
  }

  renderPrice(){
    return  <div>
      <BackTitle backonClick={this.BackToState}/>
      <AuthentPriceList  BackToState={this.BackToState}/>
    </div>
  }

  renderMsg(){
    return  <div>
      <Msg Text={this.state.Msg} Typeprop={this.state.MsgType} Btnprop={this.BackToState} Btntextprop={this.state.BtnMsg}/>
    </div>
  }

  render() {
    return (
      <div>
        <div className="title_fixed_space"></div>
        {
          this.state.Pagestatus=='Rights'?
            this.renderRights():undefined
        }
        {
          this.state.Pagestatus=='PRights'?
            this.renderPRights():undefined
        }
        {
          this.state.Pagestatus=='CRights'?
            this.renderCRights():undefined
        }
        {
          this.state.Pagestatus=='isVip'?
            this.renderisVip():undefined
        }
        {
          this.state.Pagestatus=='noVip'?
            this.rendernoVip():undefined
        }
        {
          this.state.Pagestatus=='chkAudi'?
            this.renderchkAudi():undefined
        }
        {
          this.state.Pagestatus=='Price'?
            this.renderPrice():undefined
        }
        {
          this.state.Pagestatus=='Msg'?
            this.renderMsg():undefined
        }
      </div>
    )
  }
}

export default AuthenticationIndex;