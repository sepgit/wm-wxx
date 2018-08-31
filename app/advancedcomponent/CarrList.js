import React, { Component } from 'react';
import '../css/weui.css';
import {getDataList} from '../DataInterface.js';
import ListItem from '../component/ListItem.js';
import SearchBar from '../component/SearchBar.js';
import BackTitle from '../component/BackTitle.js';

class CarrList extends Component {
  constructor(props) {
    super(props);
    this.ItemonClick = this.ItemonClick.bind(this);
    this.getCarrList=this.getCarrList.bind(this);
    this.getCarrList=this.getCarrList.bind(this);
    this.getRCarrList=this.getRCarrList.bind(this);
    this.getRecentCarrList=this.getRecentCarrList.bind(this);
    this.getRRecentCarrList=this.getRRecentCarrList.bind(this);
    this.renderList=this.renderList.bind(this);
    this.SearchonChange=this.SearchonChange.bind(this);

    this.state={
      CarrList:[],
      RecentCarrList:[],
      ChangeCarrList:[],
      SelectItemID:0,
      SelectItemCaption:''
    }
  }

  componentWillMount(){
    this.getCarrList();
    this.getRecentCarrList();
  }

  ItemonClick(a,b) {
    this.setState({
      SelectItemID:a,
      SelectItemCaption:b
    });
    this.props.GetSelectID(a,b);
  }

  getCarrList(){
    let userName = this.props.BinduserName;
    let wxtoken = this.props.wxtoken;
    let serv = this.props.serv;
    let url = 'api/carrs/?userName='+userName+'&wxtoken='+wxtoken+'&rowCount=0&pageIndex=1&serv='+serv;
    let params = [];
    getDataList(url,params,this.getRCarrList);
  }

  getRCarrList(value){
    this.setState({
      CarrList:value
    });
  }

  getRecentCarrList(){
    let userName = this.props.BinduserName;
    let wxtoken = this.props.wxtoken;
    let serv = this.props.serv;
    let url = 'api/carrs/?userName='+userName+'&wxtoken='+wxtoken+'&rowCount=0&pageIndex=1&hot=true&serv='+serv;
    let params = [];
    getDataList(url,params,this.getRRecentCarrList);
  }

  getRRecentCarrList(value){
    this.setState({
      RecentCarrList:value
    });
  }

  SearchonChange(event){
    let v = event.target.value;
    v=v.toUpperCase();
    let chv='';
    let Ob={};
    this.state.ChangeCarrList.splice(0,this.state.ChangeCarrList.length);
    if (v!=''){
      for (let i=0;i<this.state.CarrList.length;i++)
      {
        chv=this.state.CarrList[i].carrName + this.state.CarrList[i].chsName;
        chv=chv.toUpperCase();
        if (chv.indexOf(v)!=-1){
          Ob={carr:this.state.CarrList[i].carr, carrName:this.state.CarrList[i].carrName};
          this.state.ChangeCarrList.push(Ob);
        }
      }
    }
    this.forceUpdate();//刷新数据
  }

  renderList(){
    let re=[];
    this.state.ChangeCarrList.length>0?re=this.state.ChangeCarrList:re=this.state.RecentCarrList;
    return re.map(s => {
      return <ListItem key={s.carr} idProp={s.carr} captionProp={s.carrName} SelfonClickProp={this.ItemonClick} />
    });
  }

  render() {
    return (
      <div>
        <BackTitle backonClick={this.props.backprop}/>
        <SearchBar Protext={'请输入承运商名称'} SelfonChange={this.SearchonChange}/>
        <div className="weui-cell">
        </div>
        <ListItem key='0' idProp='0' captionProp={'[全选]'} SelfonClickProp={this.ItemonClick} />
        {
          this.renderList()
        }
      </div>
    )
  }
}

export default CarrList;