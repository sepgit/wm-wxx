import React, { Component } from 'react';
import '../css/weui.css';
import Title from '../component/Title.js';
import BackTitle from '../component/BackTitle.js';
import SkipLabel from  '../component/SkipLabel';
import StrInput from  '../component/StrInput.js';
import Button from '../component/Button.js';
import Msg from '../component/Msg.js';
import IndusList from '../advancedcomponent/IndusList.js';
import PortsList from '../advancedcomponent/PortsList.js';
import CompsItem from '../authcomps/CompsItem.js';
import CompsItemDetail from '../authcomps/CompsItemDetail.js';
import {getdistDataList,Getwxtoken,getCheckbind,getDataJson} from '../DataInterface.js';

class AuthComps extends Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.renderDetail = this.renderDetail.bind(this);
    this.renderInduSelect = this.renderInduSelect.bind(this);
    this.renderPortSelect = this.renderPortSelect.bind(this);
    this.renderMsg = this.renderMsg.bind(this);

    this.getBuserName = this.getBuserName.bind(this);
    this.GetSearchDataList = this.GetSearchDataList.bind(this);
    this.GetRSearchDataList = this.GetRSearchDataList.bind(this);
    this.showonClick = this.showonClick.bind(this);
    this.certNoonChange = this.certNoonChange.bind(this);
    this.compAliaonChange = this.compAliaonChange.bind(this);
    this.userAccoonChange = this.userAccoonChange.bind(this);
    this.nameonChange = this.nameonChange.bind(this);

    this.ToIndu = this.ToIndu.bind(this);
    this.ToPort = this.ToPort.bind(this);
    this.ToList = this.ToList.bind(this);
    this.ToDetail = this.ToDetail.bind(this);
    this.Getindu = this.Getindu.bind(this);
    this.Getport = this.Getport.bind(this);
    this.UppageOnClick = this.UppageOnClick.bind(this);
    this.DownpageOnClick = this.DownpageOnClick.bind(this);
    this.GetSearconClick = this.GetSearconClick.bind(this);

    this.state={
      BinduserName:'',
      wxtoken:'',
      SelectJson:'',
      userAcco:'',
      certNo:'',
      compAlia:'',
      name:'',
      port:0,
      portName:'',
      indu:0,
      induName:'',
      dataList:[],
      totalRows:0,
      pages:0,
      pageIndex:0,
      Msg:'',
      MsgType:0,
      Pagestatus:''
    }
  }

  componentWillMount() {
    let wxtoken=Getwxtoken();  //获取微信ID
    this.setState({
      wxtoken:wxtoken,
      pageIndex:1
    });
    getCheckbind(wxtoken,this.getBuserName);
  }

  getBuserName(value){
    if (!value.err) {
      let userJson = value.user;
      let userName = userJson.userAcco;
      let wxtoken = this.state.wxtoken;
      let pageIndex = 1;
      this.setState({
        BinduserName: userJson.userAcco,
        user:userJson.user
      });

      let url = 'api/disps/?userName='+userName+'&wxtoken='+wxtoken+'&rowCount=5&pageIndex='+pageIndex+'&isVip=true';
      getDataJson(url,[],this.GetRSearchDataList);
    }
  }

  GetSearconClick(){
    let a = 1;
    this.GetSearchDataList(a);
    this.setState({
      pageIndex:1
    });
  }

  GetSearchDataList(a){
    let userName = this.state.BinduserName;
    let wxtoken = this.state.wxtoken;
    let userAcco = this.state.userAcco;
    let certNo = this.state.certNo;
    let compAlia = this.state.compAlia;
    let name = this.state.name;
    let port = this.state.port;
    let indu = this.state.indu;
    let pageIndex = a;
    let url = 'api/disps/?userName='+userName+'&wxtoken='+wxtoken+'&rowCount=5&pageIndex='+pageIndex+'&isVip=true&userAcco='+userAcco+'&certNo='+certNo
        +'&compAlia='+compAlia+'&name='+name+'&port='+port+'&indu='+indu;
    getDataJson(url,[],this.GetRSearchDataList);
  }

  GetRSearchDataList(value){
    let dispsJson =value;
    if(!dispsJson.err){
      this.setState({
        dataList:dispsJson.rows,
        totalRows:dispsJson.totalRows,
        pages:Math.ceil(dispsJson.totalRows/5),
        Pagestatus: 'List'
      })
    } else {
      this.setState({
        Msg:'您尚未认证，不能查看认证会员信息。请联系客服  手机（微信）：13780008543  认证成功后可查看',
        MsgType:3,
        Pagestatus: 'Msg'
      })
    }
  };

  ResetData(){
    this.setState({
      userAcco:'',
      certNo:'',
      compAlia:'',
      port:0,
      portName:'',
      indu:0,
      induName:'',
    })
  }

  Getindu(a,b){
    if (a>0){
      this.setState({
        indu:a,
        induName:b,
        Pagestatus:'Search',
      });
    }
  }

  Getport(a,b){
    if (a>0){
      this.setState({
        port:a,
        portName:b,
        Pagestatus:'Search',
      });
    }
  }

  certNoonChange(event){
    this.setState({certNo: event.target.value});
  }

  compAliaonChange(event){
    this.setState({compAlia: event.target.value});
  }

  nameonChange(event){
    this.setState({name: event.target.value});
  }

  userAccoonChange(event){
    this.setState({userAcco: event.target.value});
  }

  ToIndu(){
    this.setState({
      Pagestatus: 'Indu',
    });
  }

  ToPort(){
    this.setState({
      Pagestatus:'Port'
    });
  }

  ToList(){
    this.setState({
      Pagestatus: 'List'
    });
  }

  ToDetail(value){
    this.setState({
      SelectJson:value,
      Pagestatus: 'Detail'
    });
  }

  showonClick(){
    this.setState({
      Pagestatus:'Search'
    });
  }

  UppageOnClick(){
    let a = this.state.pageIndex;
    if (a>1) {
      this.GetSearchDataList(a-1);
      this.setState({
        pageIndex:a-1
      });
    }
  }

  DownpageOnClick(){
    let a = this.state.pageIndex;
    let b = this.state.pages;

    if (a<b) {
      this.GetSearchDataList(a+1);
      this.setState({
        pageIndex:a+1
      });
    }
  }

  renderList(){
    return  <div>
      <div className="weui-cells">
        <SkipLabel caption={'条件筛选'}  SelfonClick={this.showonClick}/>
      </div>
      {this.state.dataList.map(s =>
        <CompsItem
          key={s.user}
          sjson={s}
          DetailProp={this.ToDetail}
        />
      )}
      <div className="nocolor_panel"></div>
      <div className="pagechoice_panel">
        <div className="weui-flex">
          <a href="javascript:void(0);" onClick={this.UppageOnClick} className="CenterText_Smltitle">上一页</a>
          <div className="weui-flex__item"><p className="CenterText_Smltitle">{this.state.pageIndex+'/'+this.state.pages}</p></div>
          <a href="javascript:void(0);" onClick={this.DownpageOnClick} className="CenterText_Smltitle">下一页</a>
        </div>
      </div>
    </div>
  }

  renderSearch(){
    return  <div>
      <BackTitle backonClick={this.ToList}/>
      <div className="weui-cells">
        <Title Titletext={'*至少满足一个查询条件'}/>
        <StrInput caption={'认证编号'} defaultValue={this.state.certNo} promptProp={'例：11100000'} updateStateProp={this.certNoonChange}/>
        <div className="nocolor_panel"></div>
        <StrInput caption={'公司简称'} defaultValue={this.state.compAlia} promptProp={'例：宁波XX公司'} updateStateProp={this.compAliaonChange}/>
        <div className="nocolor_panel"></div>
        <StrInput caption={'姓名'} defaultValue={this.state.name} promptProp={'例：张三'} updateStateProp={this.nameonChange}/>
        <div className="nocolor_panel"></div>
        <StrInput caption={'账号/手机号'} defaultValue={this.state.userAcco} promptProp={'例：aaa@qq.com或13711111111'} updateStateProp={this.userAccoonChange}/>
        <div className="nocolor_panel"></div>
        <SkipLabel caption={'行业'} text={this.state.induName} Enable={1} SelfonClick={this.ToIndu}/>
        <div className="nocolor_panel"></div>
        <SkipLabel caption={'口岸'} text={this.state.portName} Enable={1} SelfonClick={this.ToPort}/>
        <div className="nocolor_panel"></div>
        <div className="button-sp-area">
          <Button text={'查找'} buttonstyle="1" ClickProp={this.GetSearconClick}/>
          <Button text={'重置'} buttonstyle="2" ClickProp={this.ResetData}/>
        </div>
      </div>
    </div>
  }

  renderInduSelect(){
    return  <div>
      <div className="weui-cells">
        <IndusList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} GetSelectID={this.Getindu} backprop={this.ToList} />
      </div>
    </div>
  }

  renderPortSelect(){
    return  <div>
      <div className="weui-cells">
        <PortsList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv='0' GetSelectID={this.Getport} backprop={this.ToList}/>
      </div>
    </div>
  }

  renderDetail(){
    return  <div className="weui-cells">
      <CompsItemDetail SelectJson={this.state.SelectJson} backprop={this.ToList}/>
    </div>
  }

  renderMsg(){
    return  <div>
      <Msg Text={this.state.Msg} Typeprop={this.state.MsgType} BtnNull={true}/>
    </div>
  }

  render() {
    return (
      <div>
         <div className="title_fixed_space"></div>
      {
        this.state.Pagestatus=='List'?
          this.renderList():undefined
      }
      {
        this.state.Pagestatus=='Search'?
          this.renderSearch():undefined
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
        this.state.Pagestatus=='Detail'?
          this.renderDetail():undefined
      }
      {
        this.state.Pagestatus=='Msg'?
          this.renderMsg():undefined
      }
      </div>
    )
  }
}

export default AuthComps;