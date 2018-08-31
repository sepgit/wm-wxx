import React, { Component } from 'react';
import '../css/weui.css';
import {Link} from 'react-router-dom';
import SkipLabel from  '../component/SkipLabel';
import Button from '../component/Button.js';
import Msg from '../component/Msg.js';
import ServList from '../advancedcomponent/ServList.js';
import DepaPortsList from '../advancedcomponent/DepaPortsList.js';
import DestPortsList from '../advancedcomponent/DestPortsList.js';
import CarrList from '../advancedcomponent/CarrList.js';
import DetailList from './DetailList.js';
import BaiduList from './BaiduList.js';
import AddProv from './AddProv.js';
import BaiduItemDetail from './BaiduItemDetail.js';
import Evaluate from './Evaluate.js';
import Title from  '../component/Title.js';
import BackTitle from '../component/BackTitle.js';
import Footer from '../component/Footer.js';

import {getDataList,getCheckbind,Getwxtoken,getdistDataList,getDataJson} from '../DataInterface.js';

class YJSearchBaidu extends Component {
  constructor(props) {
    super(props);
    this.getBuserName = this.getBuserName.bind(this);
    this.renderSearch=this.renderSearch.bind(this);
    this.renderServSelect=this.renderServSelect.bind(this);
    this.renderDepaPortSelect=this.renderDepaPortSelect.bind(this);   //起运地选择框界面
    this.renderDestPortSelect=this.renderDestPortSelect.bind(this);   //目的地选择框界面
    this.renderCarrSelect=this.renderCarrSelect.bind(this);           //承运商选择界面
    this.renderDetailSelect=this.renderDetailSelect.bind(this);       //优势明细选择框
    this.renderDataList=this.renderDataList.bind(this);               //查询列表
    this.renderDataDetail=this.renderDataDetail.bind(this);           //数据明细
    this.renderMsg=this.renderMsg.bind(this);                         //返回
    this.renderAddProv=this.renderAddProv.bind(this);                 //添加供应商界面
    this.renderEvaluate=this.renderEvaluate.bind(this);                 //评价

    this.ServonClick=this.ServonClick.bind(this);
    this.DepaPortonClick=this.DepaPortonClick.bind(this);       //跳转到起运地选择框
    this.DestPortonClick=this.DestPortonClick.bind(this);      //跳转到目的地选择框
    this.CarronClick=this.CarronClick.bind(this);             //跳转到承运商选择框
    this.advaDetailonClick=this.advaDetailonClick.bind(this);         //跳转到优势明细选择框
    this.GetDataDetail=this.GetDataDetail.bind(this);         //转到明细界面
    this.AddProv=this.AddProv.bind(this);                     //转到添加供应商界面
    this.GetEvaluate=this.GetEvaluate.bind(this);             //转到评分界面

    //this.GetDataList=this.GetDataList.bind(this);
    this.GetservID=this.GetservID.bind(this);
    this.GetDepaPortID=this.GetDepaPortID.bind(this);
    this.GetDestPortID=this.GetDestPortID.bind(this);
    this.GetCarrID=this.GetCarrID.bind(this);
    this.GetDetail=this.GetDetail.bind(this);

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
      servList:[],    //修改后移除
      depa:0,
      depaName:'',
      dest:0,
      destName:'',
      carr:0,
      carrName:'',
      booking:0,
      freight:0,
      qing:0,
      shipSpace:0,
      advadetail:'',
      SeachDataList:[],
      SelectID:0,
      Selectuser:0 ,    //查看用户明细id
      MsgType:0,
      MsgFoot:'',
      backto:'',
      SearchCondition:[],
      scor:0,
      winRepl:0,
      allRepl:0,
      scors:[],
      baiduvip:0,
      Pagestatus:'Main',
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
    let depaPort = this.state.depa;
    let depaName = this.state.depaName;
    let destPort = this.state.dest;
    let destName = this.state.destName;
    let carr = this.state.carr;
    let carrName = this.state.carrName;
    let booking= this.state.booking;
    let freight= this.state.freight;
    let qing= this.state.qing;
    let shipSpace= this.state.shipSpace;
    let advadetail = this.state.advadetail;
    let url = 'api/disps/?userName='+userName+'&wxtoken='+wxtoken+'&rowCount=0&pageIndex=1&isAdva=true&serv='+serv
                +'&depaPort='+depaPort+'&destPort='+destPort+'&carr='+carr+'&booking='+booking+'&freight='+freight
                +'&qing='+qing+'&shipSpace='+shipSpace;
     let sites=[
       {'name':'服务类型','value':servName},
       {'name':'起运地','value':depaName},
       {'name':'目的地','value':destName},
       {'name':'承运商','value':carrName},
       {'name':'优势明细','value':advadetail}
     ];
    if (serv==0){
      this.GetMsg(2,'运价类型不能为空','Main');  //提示类型错误,返回界面0
    } else if(depaPort==0){
      this.GetMsg(2,'起运地不能为空','Main');  //提示类型错误,返回界面0
    } else if (destPort==0){
      this.GetMsg(2,'目的地不能为空','Main');  //提示类型错误,返回界面0
    }  else {
      this.setState({
        SearchCondition:sites
      });
      getdistDataList(url,[],this.GetRSearchDataList);
    }
  }

  GetMsg(MsgType,ErrMsg,backto){
    this.setState({
      MsgType:MsgType,      //错误标识
      Pagestatus:'Msg',
      Msg:ErrMsg,
      backto:backto
    });
  }

  ResetData(){
    this.setState({
      serv:0,
      servName:'',
      depa:0,
      depaName:'',
      dest:0,
      destName:'',
      carr:0,
      carrName:'',
      booking:0,
      freight:0,
      qing:0,
      shipSpace:0,
      advadetail:'',
      Pagestatus:'Main'
    })
  }

  GetRSearchDataList(value,resultAll){
    console.log("value="+value.length);
    console.log("resultAll="+resultAll);
    if (value.length>0){
      this.setState({
        SeachDataList:value,
        Pagestatus:'List',
        backto:'Main'
      })
    } else if (resultAll>0)
    {
      this.setState({
        MsgType:2,      //错误标识
        Pagestatus: 'Msg',
        Msg:'请联系平台客服开通物贸百度查看权限，平台客服联系方式 手机（微信）：13780008543',
        backto:'Main'
      });
    } else{
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
    this.setState({
      backto:'Main',
      Pagestatus:'Serv'
    });
  }

  DepaPortonClick(){
    if (this.state.serv>0){
      this.setState({
        backto:'Main',
        Pagestatus:'Depa'
      });
    }
  }

  DestPortonClick(){
    if (this.state.serv>0){
      this.setState({
        backto:'Main',
        Pagestatus:'Dest'
      });
    }
  }

  CarronClick(){
    if (this.state.serv>0){
      this.setState({
        backto:'Main',
        Pagestatus:'Carr'
      });
    }
  }

  advaDetailonClick(){
    this.setState({
      backto:'Main',
      Pagestatus:'Adv'
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

  GetDepaPortID(a,b){
    if (a>0){
      this.setState({
        Pagestatus:'Main',
        depa:a,
        depaName:b
      });
    }
  }

  GetDestPortID(a,b){
    if (a>0){
      this.setState({
        Pagestatus:'Main',
        dest:a,
        destName:b
      });
    }
  }

  GetCarrID(a,b){
    if (a>-1){
      this.setState({
        Pagestatus:'Main',
        carr:a,
        carrName:b
      });
    }
  }

  GetDetail(a,b,c,d){
    let v ='';
    if (a==1){
      v = v+'直接订舱；';
    }
    if (b==1){
      v = v+'运价；';
    }
    if (c==1){
      v = v+'DDP/DDU；';
    }
    if (d==1){
      v = v+'舱位；';
    }
    this.setState({
      Pagestatus:'Main',
      booking:a,
      freight:b,
      qing:c,
      shipSpace:d,
      advadetail:v
    });
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
      Pagestatus:this.state.backto,
      MsgFoot:''
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
      <Title Titletext={'普通运价类型'}/>
      <div className="weui-cells">
        {
          this.state.servName==''?
            <SkipLabel caption={'服务类型'} text={'请选择类型'} SelfonClick={this.ServonClick}/>:
            <SkipLabel caption={'服务类型'} text={this.state.servName} SelfonClick={this.ServonClick}/>
        }
        {
          this.state.depaName==''?
            <SkipLabel caption={'起运地'} text={'请选择起运地'} SelfonClick={this.DepaPortonClick}/>:
            <SkipLabel caption={'起运地'} text={this.state.depaName} SelfonClick={this.DepaPortonClick}/>
        }
        {
          this.state.destName==''?
            <SkipLabel caption={'目的地'} text={'请选择目的地'} SelfonClick={this.DestPortonClick}/>:
            <SkipLabel caption={'目的地'} text={this.state.destName} SelfonClick={this.DestPortonClick}/>
        }
        {
          this.state.carrName==''?
            <SkipLabel caption={'承运商'} text={'请选择承运商'} SelfonClick={this.CarronClick}/>:
            <SkipLabel caption={'承运商'} text={this.state.carrName} SelfonClick={this.CarronClick}/>
        }
        {
          this.state.advadetail==''?
            <SkipLabel caption={'优势细化'} text={'[非必选]'} SelfonClick={this.advaDetailonClick}/>:
            <SkipLabel caption={'优势细化'} text={this.state.advadetail} SelfonClick={this.advaDetailonClick}/>
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
        <ServList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} servType='3'  GetSelectID={this.GetservID} backprop={this.ToMain} />
      </div>
    </div>
  }

  renderDepaPortSelect(){
    return  <div>
      <div className="weui-cells">
        <DepaPortsList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.serv} GetSelectID={this.GetDepaPortID} backprop={this.ToMain}/>
      </div>
    </div>
  }

  renderDestPortSelect(){
    return  <div>
      <div className="weui-cells">
        <DestPortsList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.serv} GetSelectID={this.GetDestPortID} backprop={this.ToMain}/>
      </div>
    </div>
  }

  renderCarrSelect(){
    return  <div>
      <div className="weui-cells">
        <CarrList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.serv} GetSelectID={this.GetCarrID} backprop={this.ToMain}/>
      </div>
    </div>
  }

  renderDetailSelect(){
    return  <div>
      <DetailList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} GetChecked={this.GetDetail} backprop={this.ToMain}/>
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
            Type={'YJ'}
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
        Type={'YJ'}
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
          this.state.Pagestatus=='Depa'?
            this.renderDepaPortSelect():undefined
        }
        {
          this.state.Pagestatus=='Dest'?
            this.renderDestPortSelect():undefined
        }
        {
          this.state.Pagestatus=='Carr'?
            this.renderCarrSelect():undefined
        }
        {
          this.state.Pagestatus=='Adv'?
            this.renderDetailSelect():undefined
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
export default YJSearchBaidu;