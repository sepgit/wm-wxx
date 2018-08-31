import React, { Component } from 'react';
import '../css/weui.css';
import {getDataList} from '../DataInterface.js';
import ListItem from '../component/ListItem.js';
import SearchBar from '../component/SearchBar.js';
import BackTitle from '../component/BackTitle.js';
import BackT from './backT.js'
class ADDestPortsList extends Component {
  constructor(props) {
    super(props);
    this.ItemonClick = this.ItemonClick.bind(this);
    this.getDestPortList=this.getDestPortList.bind(this);
    this.getRDestPortList=this.getRDestPortList.bind(this);
    this.getRecentPortList=this.getRecentPortList.bind(this);
    this.getRRecentPortList=this.getRRecentPortList.bind(this);
    this.renderList=this.renderList.bind(this);
    this.SearchonChange=this.SearchonChange.bind(this);

    this.state={
      DestPortList:[],
      RecentPortList:[],
      ChangeportList:[],
      SelectItemID:0,
      SelectItemCaption:''
    }
  }

  componentWillMount(){
    this.getDestPortList();
    this.getRecentPortList();
  }

  ItemonClick(a,b) {
    this.setState({
      SelectItemID:a,
      SelectItemCaption:b
    });
    this.props.GetSelectID(a,b);
  }

  getDestPortList(){
    let userName = this.props.BinduserName;
    let wxtoken = this.props.wxtoken;
    let serv = this.props.serv;
    let url = 'api/ports/?userName='+userName+'&wxtoken='+wxtoken+'&rowCount=0&pageIndex=1&type=2&serv='+serv;
    let params = [];
    getDataList(url,params,this.getRDestPortList);
  }

  getRDestPortList(value){
    this.setState({
      DestPortList:value
    });
  }

  getRecentPortList(){
    let userName = this.props.BinduserName;
    let wxtoken = this.props.wxtoken;
    let serv = this.props.serv;
    let url = 'api/ports/?userName='+userName+'&wxtoken='+wxtoken+'&rowCount=0&pageIndex=1&type=2&recent=true&serv='+serv;
    let params = [];
    getDataList(url,params,this.getRRecentPortList);
  }

  getRRecentPortList(value){
    this.setState({
      RecentPortList:value
    });
  }

  SearchonChange(event){
    let v = event.target.value;
    v=v.toUpperCase();
    let chv='';
    let Ob={};
    this.state.ChangeportList.splice(0,this.state.ChangeportList.length);
    if (v!=''){
      for (let i=0;i<this.state.DestPortList.length;i++)
      {
        chv=this.state.DestPortList[i].portName + this.state.DestPortList[i].chsName;
        chv=chv.toUpperCase();
        if (chv.indexOf(v)!=-1){
          Ob={port:this.state.DestPortList[i].port, portName:this.state.DestPortList[i].portName, chsName:this.state.DestPortList[i].chsName};
          this.state.ChangeportList.push(Ob);
        }
      }
    }
    this.forceUpdate();//刷新数据
  }

  renderList(){
    let re=[];
    this.state.ChangeportList.length>0?re=this.state.ChangeportList:re=this.state.RecentPortList;
    return re.map(s => {
      return <ListItem key={s.port} idProp={s.port} captionProp={s.portName+'/'+s.chsName} SelfonClickProp={this.ItemonClick} />
    });
  }

  render() {
    return (
      <div>
        
        <SearchBar Protext={'请输入港口名称'} SelfonChange={this.SearchonChange}/>
        {
          this.renderList()
        }
      </div>
    )
  }
}

export default ADDestPortsList;