import React, { Component } from 'react';
import '../css/weui.css';
import '../css/exhibiton.css';
import Title from  '../component/Title.js';
import Textline from  '../component/Textline.js';
import HTTPED from '../address';
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv, postData, postYJData, getDataDetail, getDataListRe } from '../DataInterface.js';
import BackT from '../advantagenew/backT.js';
class ServerList extends Component {
  constructor(props) {
    super(props);
    this.getBuserName = this.getBuserName.bind(this);
    this.search = this.search.bind(this);
    this.loadLists = this.loadLists.bind(this);
    this.renderLists = this.renderLists.bind(this);
    this.state = {
      wxtoken:'',
      BinduserName:'',
      user:'',
      comp:'',
      mainShow:true,
      listVal:[],
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
    let userName = this.state.BinduserName;
    let wxtoken = this.state.wxtoken;
    let url = 'api/servGuars/?rowCount=10&pageIndex=1&listType=3&userName='+userName+'&wxtoken='+wxtoken;
    getDataList(url,[], this.loadLists);
  }
  loadLists(value) {
    console.log(value)
    this.setState({
        listVal:value
    })
  }
  renderLists() {
    let value = this.state.listVal;
    return value.map(datas =>{
        return <li className="cabListLi" key={datas.servDisp}>
            <dl>
                <dd className="cabListLi-msg weui-flex">
                    <p className="msg-p weui-flex__item">{datas.servName}</p>
                    <p className=" weui-flex__item">{datas.servOptiName}</p>
                </dd>
                <dd className="cabListLi-msg weui-flex">
                    <p className="msg-p-all weui-flex__item">{datas.portName}</p>
                </dd>
                {
                   datas.showname == 0? 
                    <dd className="cabListLi-msg  weui-flex ">
                        <p className=" weui-flex__item tC">求购成功后显示信息</p>
                    </dd>:
                   <dd className="cabListLi-msg  weui-flex ">
                        <p className=" weui-flex__item">{datas.name}</p>
                        <p className=" weui-flex__item">{datas.compAlia}</p>
                    </dd>
                }
                <dd className="cabListLi-msg  weui-flex">
                    <p className=" weui-flex__item">{datas.curr == 1?'￥':'$'}{datas.depo}</p>            
                </dd>
            </dl>
            <div className="todetail">
                <div className="weui-btn weui-btn_primary">查看详情</div>
            </div>
        </li>
    } )
  }
  search() {
    console.log("搜索")
  }
  render() {
    let srcs = HTTPED + 'images/nlogo.png';
    return (
        <div className="cabMain">
          <BackT tit='平台服务展示' backonClick={this.props.backMain} ></BackT>
          <div className="titleback"></div>
          <div className="cabSearch" onClick={this.search}>
                <div className="searchBtn weui-icon-search">查找</div>
            </div>
          <ul className="cabLists">
                {
                    this.renderLists()
                }
            </ul>
        </div>
    )
  }
}

export default ServerList;