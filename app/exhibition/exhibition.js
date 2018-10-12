import React, { Component } from 'react';
import '../css/weui.css';
import '../css/exhibiton.css';
import Title from  '../component/Title.js';
import Textline from  '../component/Textline.js';
import HTTPED from '../address';
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv, postData, postYJData, getDataDetail, getDataListRe } from '../DataInterface.js';
import BackT from '../advantagenew/backT.js';
import CabLists from './cabLists.js';
import ServerList from './serverList.js';
import TicketList from './ticketList.js'
class Exhibition extends Component {
  constructor(props) {
    super(props);
    this.getBuserName = this.getBuserName.bind(this);
    this.cabPage = this.cabPage.bind(this);
    this.serverPage = this.serverPage.bind(this);
    this.ticketPage = this.ticketPage.bind(this);
    this.backMain = this.backMain.bind(this);
    this.state = {
      wxtoken:'',
      BinduserName:'',
      user:'',
      comp:'',
      mainShow:false,
      //三个按钮显示的页面
      cabShow:false,
      serverShow:false,
      ticketShow:true,
    }
  }

  componentWillMount(){
    let wxtoken = Getwxtoken();
    this.setState({
      wxtoken: wxtoken
    });
    getCheckbind(wxtoken, this.getBuserName);
  }
  getBuserName(value){
    // console.log(value);
    if (!value.err) {
      let userJson = value.user;
      this.setState({
          BinduserName: userJson.userAcco,
          user: userJson.user,
          comp: userJson.comp,
      });
    }
  }
  cabPage() {
    this.setState({
      mainShow:false,
      cabShow:true,
      serverShow:false,
      ticketShow:false
    })
  }
  serverPage() {
    this.setState({
      mainShow:false,
      cabShow:false,
      serverShow:true,
      ticketShow:false
    })
  }
  ticketPage() {
    this.setState({
      mainShow:false,
      cabShow:false,
      serverShow:false,
      ticketShow:true
    })
  }
  backMain() {
    this.setState({
      mainShow:true,
      cabShow:false,
      serverShow:false,
      ticketShow:false
    })
  }
  render() {
    let srcs = HTTPED + 'images/nlogo.png';
    return (
      <div>
      {
        this.state.mainShow ?
        <div className='exhibition'>
          <div className="exTit">平台展示</div>
          <div className="hed"></div>
          <ul className="btnLists">
              <li className="cab" onClick={this.cabPage}>舱位展示</li>
              <li className="server" onClick={this.serverPage}>服务展示</li>
              <li className="ticket" onClick={this.ticketPage}>卡卷</li>
          </ul>
          <ul className="msgLists">
              <li>1.舱位展示内容为现成舱位，即买即得。</li>
              <li>2.服务展示内容为现成服务，即买即得。</li>
              <li>3.卡卷展示内容为优质供应商发放的优惠券，可在与该供应商合作时使用。</li>
              <li>4.<span style={{color:"red"}}>请绑定物贸帮帮帐号后</span>，再购买或领取</li>
          </ul>
        </div>:undefined
      }
      {
        this.state.cabShow?
        <CabLists 
          backMain = {this.backMain}
        ></CabLists>:undefined
      }
      {
        this.state.serverShow?
        <ServerList
          backMain = {this.backMain}
        ></ServerList>
        :undefined
      }
      {
        this.state.ticketShow?
        <TicketList
          backMain = {this.backMain}
        ></TicketList>
        :undefined
      }
      </div>
    )
  }
}

export default Exhibition;