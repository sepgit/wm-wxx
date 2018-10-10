import React, { Component } from 'react';
import '../css/weui.css';
import '../css/exhibiton.css';
import Title from  '../component/Title.js';
import Textline from  '../component/Textline.js';
import HTTPED from '../address';
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv, postData, postYJData, getDataDetail, getDataListRe } from '../DataInterface.js';
import BackT from '../advantagenew/backT.js';
class Exhibition extends Component {
  constructor(props) {
    super(props);
    this.getBuserName = this.getBuserName.bind(this);
    this.cabPage = this.cabPage.bind(this);
    this.serverPage = this.serverPage.bind(this);
    this.ticketPage = this.ticketPage.bind(this);
    this.state = {
      wxtoken:'',
      BinduserName:'',
      user:'',
      comp:'',
      mainShow:true,
      //三个按钮显示的页面
      cabShow:false,
      serverShow:false,
      ticketShow:false,
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
              <li>1.</li>
              <li>2.</li>
              <li>3.</li>
          </ul>
        </div>:undefined
      }
      {
        this.state.cabShow?
        <div>
          cab
        </div>:undefined
      }
      {
        this.state.serverShow?
        <div>
          server
        </div>:undefined
      }
      {
        this.state.ticketShow?
        <div>
          ticket
        </div>:undefined
      }
      </div>
    )
  }
}

export default Exhibition;