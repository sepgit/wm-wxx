import React, { Component } from 'react';
import '../css/weui.css';
import SkipLabel from  '../component/SkipLabel';
import Button from '../component/Button.js';
import Msg from '../component/Msg.js';
import ServList from '../advancedcomponent/ServList.js';
import ServOptisList from '../advancedcomponent/ServOptisList.js';
import PortsList from '../advancedcomponent/PortsList.js';
import BaiduList from './BaiduList.js';
import AddProv from './AddProv.js';
import Evaluate from './Evaluate.js';
import BaiduItemDetail from './BaiduItemDetail.js';
import Title from  '../component/Title.js';
import BackTitle from '../component/BackTitle.js';
import Footer from '../component/Footer.js';
import {getDataList,getCheckbind,Getwxtoken,getdistDataList,getDataJson} from '../DataInterface.js';

class FWSearchBaidu extends Component {
  constructor(props) {
    super(props);
    this.getBuserName = this.getBuserName.bind(this);
    this.renderSearch=this.renderSearch.bind(this);            //主界面
    this.renderServSelect=this.renderServSelect.bind(this);     //服务选择框
    this.renderServOptiSelect=this.renderServOptiSelect.bind(this);   //具体服务选择框
    this.renderPortSelect=this.renderPortSelect.bind(this);   //口岸选择框界面
    this.renderDataList=this.renderDataList.bind(this);               //查询列表
    this.renderDataDetail=this.renderDataDetail.bind(this);           //数据明细
    this.renderMsg=this.renderMsg.bind(this);                         //返回
    this.renderAddProv=this.renderAddProv.bind(this);                 //添加供应商界面
    this.renderEvaluate=this.renderEvaluate.bind(this);                 //评价

    this.ServonClick=this.ServonClick.bind(this);       //跳转到服务界面
    this.servOptionClick=this.servOptionClick.bind(this);     ///跳转到具体服务界面
    this.PortonClick=this.PortonClick.bind(this);       //跳转到起运地选择框
    this.GetDataDetail=this.GetDataDetail.bind(this);         //转到明细界面
    this.AddProv=this.AddProv.bind(this);                     //转到添加供应商界面
    this.GetEvaluate=this.GetEvaluate.bind(this);             //转到评分界面

    this.GetservID=this.GetservID.bind(this);
    this.GetservservOptiID=this.GetservservOptiID.bind(this);
    this.GetPortID=this.GetPortID.bind(this);

    this.getServList=this.getServList.bind(this);         //查找运价类型
    this.GetRServList=this.GetRServList.bind(this);

    this.GetSearchDataList=this.GetSearchDataList.bind(this);           //查找数据
    this.GetRSearchDataList=this.GetRSearchDataList.bind(this);     //返回查找数据
    this.ResetData=this.ResetData.bind(this);                       //重置选择项
    this.GetMsg=this.GetMsg.bind(this);
    this.back=this.back.bind(this);
    this.ToDetail=this.ToDetail.bind(this);
    this.ToList=this.ToList.bind(this);
    this.ToMain=this.ToMain.bind(this);
    this.GetbaiduVip = this.GetbaiduVip.bind(this);
    this.GetRbaiduVip = this.GetRbaiduVip.bind(this);

    this.state = {
      user:0,
      BinduserName:'',
      wxtoken:'',
      serv:0,
      servName:'',
      servOpti:0,
      servOptiName:'',
      servList:[],    //修改后移除
      port:0,
      portName:'',
      SeachDataList:[],
      SelectID:0,
      Selectuser:0 ,    //查看用户明细id
      MsgType:0,
      MsgFoot:'',
      backto:'',         //返回界面
      SearchCondition:[],
      scor:0,
      winRepl:0,
      allRepl:0,
      scors:[],
      baiduvip:0,
      Pagestatus:'Main',    //Main主界面
    }
  }

  componentWillMount(){
    let wxtoken=Getwxtoken();  //获取微信ID
    this.setState({
      wxtoken:wxtoken
    });
    getCheckbind(wxtoken,this.getBuserName);
  }

  getBuserName(value){
    if (!value.err) {
      let userJson = value.user;
      let wxtoken = this.state.wxtoken;
      this.setState({
        BinduserName: userJson.userAcco,
        user:userJson.user
      });
      this.GetbaiduVip(userJson.userAcco,wxtoken);
    }
  }

  GetbaiduVip(userName,wxtoken){
    let url = 'api/disps/?userName='+userName+'&wxtoken='+wxtoken+'&isCheck=true';
    getDataJson(url,[],this.GetRbaiduVip);
  }

  GetRbaiduVip(value){
    let dispsJson =value;
    if(!dispsJson.err){
      this.setState({
        baiduvip:1
      })
    } else {
      this.setState({
        baiduvip:0
      })
    }
  }

  getServList(servType){
    let userName = this.state.BinduserName;
    let wxtoken = this.state.wxtoken;
    let url = 'api/servs/?userName='+userName+'&wxtoken='+wxtoken+'&rowCount=0&pageIndex=1&servType='+servType;
    let params = [];
    getDataList(url,params,this.GetRServList);
  }

  GetSearchDataList(){
    let userName = this.state.BinduserName;
    let wxtoken = this.state.wxtoken;
    let serv = this.state.serv;
    let servName = this.state.servName;
    let servOpti = this.state.servOpti;
    let servOptiName = this.state.servOptiName;
    let port = this.state.port;
    let portName = this.state.portName;
    let url = 'api/disps/?userName='+userName+'&wxtoken='+wxtoken+'&rowCount=0&pageIndex=1&isCont=true&serv='+serv+'&servOpti='+servOpti+'&port='+port;

    let sites=[
      {'name':'服务类型','value':servName},
      {'name':'具体服务','value':servOptiName},
      {'name':'口岸','value':portName}
    ];
    if (serv==0){
      this.GetMsg(2,'服务不能为空','Main');  //提示类型错误,返回界面0
    } else if(servOpti==0){
      this.GetMsg(2,'具体服务不能为空','Main');  //提示类型错误,返回界面0
    } else if (port==0){
      this.GetMsg(2,'口岸不能为空','Main');  //提示类型错误,返回界面0
    } else {
      this.setState({
        SearchCondition:sites
      });
      getdistDataList(url,[],this.GetRSearchDataList);
    }
  }

  GetMsg(MsgType,ErrMsg,backto){
    this.setState({
      MsgType:MsgType,      //错误标识
      Pagestatus: 'Msg',
      Msg:ErrMsg,
      backto:backto
    });
  }

  ResetData(){
    this.setState({
      serv:0,
      servName:'',
      port:0,
      portName:'',
      servOpti:0,
      servOptiName:'',
      carr:0,
      carrName:'',
      Pagestatus:'Main'
    })
  }

  GetRSearchDataList(value,resultAll){
    if (value.length>0){
      this.setState({
        SeachDataList:value,
        Pagestatus:'List',
        backto:'Main'
      })
    }else if (resultAll>0)
    {
      this.setState({
        MsgType:2,      //错误标识
        Pagestatus: 'Msg',
        Msg:'请联系平台客服开通物贸百度查看权限，平台客服联系方式 手机（微信）：13780008543',
        backto:'Main'
      });
    } else
    {
      this.setState({
        MsgType:2,      //错误标识
        Pagestatus: 'Msg',
        Msg:'该条件无可查询数据',
        backto:'Main',
        MsgFoot:'Y'
      });
    }
  }

  GetDataDetail(value){
    let a = this.state.Pagestatus;
    this.setState({
      SelectID:value,
      Pagestatus:'Detail',
      backto:a
    })
  }

  AddProv(value){
    let a = this.state.Pagestatus;
    this.setState({
      Selectuser:value,
      Pagestatus:'Addprov',
      backto:a
    });
  }

  GetRServList(value){
    this.setState({
      servList:value
    })
  }

  ServonClick(){
    let b = this.state.Pagestatus;
    this.setState({
      backto:b,
      Pagestatus:'Serv'
    });
  }

  servOptionClick(){
    let b = this.state.Pagestatus;
    this.setState({
      backto:b,
      Pagestatus:'ServOpti'
    });
  }

  PortonClick(){
    if (this.state.serv>0){
      let b = this.state.Pagestatus;
      this.setState({
        backto:b,
        Pagestatus:'Port'
      });
    }
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

  GetservservOptiID(a,b){
    if (a>0){
      this.setState({
        Pagestatus:'Main',
        servOpti:a,
        servOptiName:b
      });
    }
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

  GetEvaluate(scor,winRepl,allRepl,scors){
    this.setState({
      Pagestatus:'Eva',
      scor:scor,
      winRepl:winRepl,
      allRepl:allRepl,
      scors:scors,
    });
  }

  back(){
    this.setState({
      Pagestatus:this.state.backto
    });
  }

  ToDetail(){
    this.setState({
      Pagestatus:'Detail'
    });
  }

  ToList(){
    this.setState({
      Pagestatus:'List'
    });
  }

  ToMain(){
    this.setState({
      Pagestatus:'Main'
    });
  }

  renderSearch(){
    return  <div>
      <BackTitle backonClick={this.props.ToMain}/>
      <Title Titletext={'服务类型'}/>
      <div className="weui-cells">
        {
          this.state.servName==''?
            <SkipLabel caption={'服务类型'} text={'请选择服务类型'} SelfonClick={this.ServonClick}/>:
            <SkipLabel caption={'服务类型'} text={this.state.servName} SelfonClick={this.ServonClick}/>
        }
        {
          this.state.servOptiName==''?
            <SkipLabel caption={'具体服务类型'} text={'请选择具体服务类型'} SelfonClick={this.servOptionClick}/>:
            <SkipLabel caption={'具体服务类型'} text={this.state.servOptiName} SelfonClick={this.servOptionClick}/>
        }
        {
          this.state.portName==''?
            <SkipLabel caption={'口岸'} text={'请选择口岸'} SelfonClick={this.PortonClick}/>:
            <SkipLabel caption={'口岸'} text={this.state.portName} SelfonClick={this.PortonClick}/>
        }
      </div>
      <div className="weui-cell">
      </div>
      <div className="button-sp-area">
        <Button text={'查找'} buttonstyle="1" ClickProp={this.GetSearchDataList}/>
        <Button text={'重置'} buttonstyle="2" ClickProp={this.ResetData}/>
      </div>
      <div className="nocolor_panel"></div>
      <div className="nocolor_panel"></div>
      {
        this.state.baiduvip==0?
          <div>
            <Footer Text={'你尚未开通物贸百度权限，查询被受限'}/>
            <Footer Text={'开通请联系客服平台：微信/手机13780008543'}/>
          </div>:undefined
      }
    </div>
  }

  renderServSelect(){
    return  <div>
      <div className="weui-cells">
        <ServList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} servType='2'  GetSelectID={this.GetservID} backprop={this.ToMain} />
      </div>
    </div>
  }

  renderServOptiSelect(){
    return  <div>
      <div className="weui-cells">
        <ServOptisList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.serv} GetSelectID={this.GetservservOptiID} backprop={this.ToMain} />
      </div>
    </div>
  }

  renderPortSelect(){
    return  <div>
      <div className="weui-cells">
        <PortsList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.serv} GetSelectID={this.GetPortID} backprop={this.ToMain}/>
      </div>
    </div>
  }

  renderDataList() {
    return <div>
      <BackTitle backonClick={this.ToMain}/>
      {
        this.state.SeachDataList.length > 0 ?
          <BaiduList
            BinduserName={this.state.BinduserName}
            wxtoken={this.state.wxtoken}
            Type={'FW'}
            serv={this.state.serv}
            port={this.state.dest}
            datas={this.state.SeachDataList}
            SearchCondition={this.state.SearchCondition}
            GetDetail={this.GetDataDetail}
            AddProv={this.AddProv}
            backprop={this.ToMain}/> :
          <p>无数据</p>
      }
    </div>
  }

  renderDataDetail(){
    return  <div>
      <BaiduItemDetail
        BinduserName={this.state.BinduserName}
        wxtoken={this.state.wxtoken}
        keyID={this.state.SelectID}
        Type={'FW'}
        cont={this.state.Selectuser}
        serv={this.state.serv}
        port={this.state.dest}
        GetMsg={this.GetMsg}
        AddpProp={this.AddProv}
        backprop={this.ToList}
        GetEvaluate={this.GetEvaluate}
      />
    </div>
  }

  renderMsg(){
    return  <div>
      <Msg Text={this.state.Msg} Typeprop={this.state.MsgType} Btnprop={this.back} Btntextprop={'返回'}/>
      {
        this.state.MsgFoot =='Y'?
          <div>
            <Footer Text={'如果查找不到你所需要的供应商'}/>
            <Footer Text={'请联系客服平台：微信/手机13780008543'}/>
          </div>:undefined
      }
    </div>
  }

  renderAddProv(){
    return  <div>
      <AddProv BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} cont={this.state.Selectuser} backprop={this.back}/>
    </div>
  }

  renderEvaluate(){
    return  <div>
      <Evaluate scor={this.state.scor} winRepl={this.state.winRepl} allRepl={this.state.allRepl} scors={this.state.scors} backprop={this.ToDetail}/>
    </div>
  }

  render() {
    return (
      <div>
        {
          this.state.Pagestatus=='Main'?
            this.renderSearch():undefined
        }
        {
          this.state.Pagestatus=='Serv'?
            this.renderServSelect():undefined
        }
        {
          this.state.Pagestatus=='ServOpti'?
            this.renderServOptiSelect():undefined
        }
        {
          this.state.Pagestatus=='Port'?
            this.renderPortSelect():undefined
        }
        {
          this.state.Pagestatus=='List'?
            this.renderDataList():undefined
        }
        {
          this.state.Pagestatus=='Detail'?
            this.renderDataDetail():undefined
        }
        {
          this.state.Pagestatus=='Msg'?
            this.renderMsg():undefined
        }
        {
          this.state.Pagestatus=='Addprov'?
            this.renderAddProv():undefined
        }
        {
          this.state.Pagestatus=='Eva'?
            this.renderEvaluate():undefined
        }
      </div>
    );
  }
}
export default FWSearchBaidu;