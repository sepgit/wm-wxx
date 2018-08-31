import React, { Component } from 'react';
import '../css/weui.css';
import {getDataList} from '../DataInterface.js';
import ListItem from '../component/ListItem.js';
import SearchBar from '../component/SearchBar.js';
import BackTitle from '../component/BackTitle.js';

class PortsList extends Component {
  constructor(props) {
    super(props);
    this.ItemonClick = this.ItemonClick.bind(this);
    this.getDepaPortList=this.getDepaPortList.bind(this);
    this.getDepaPortList=this.getDepaPortList.bind(this);
    this.getRDepaPortList=this.getRDepaPortList.bind(this);
    this.getRecentPortList=this.getRecentPortList.bind(this);
    this.getRRecentPortList=this.getRRecentPortList.bind(this);
    this.renderList=this.renderList.bind(this);
    this.SearchonChange=this.SearchonChange.bind(this);

    this.state={
      PortList:[],
      RecentPortList:[],
      ChangeportList:[],
      SelectItemID:0,
      SelectItemCaption:''
    }
  }

  componentWillMount(){
    this.getDepaPortList();
    this.getRecentPortList();
  }

  ItemonClick(a,b) {
    this.setState({
      SelectItemID:a,
      SelectItemCaption:b
    });
    this.props.GetSelectID(a,b);
  }

  getDepaPortList(){
    let userName = this.props.BinduserName;
    let wxtoken = this.props.wxtoken;
    let serv = this.props.serv;
    let url = 'api/ports/?userName='+userName+'&wxtoken='+wxtoken+'&rowCount=0&pageIndex=1&serv='+serv;
    let params = [];
    getDataList(url,params,this.getRDepaPortList);
  }

  getRDepaPortList(value){
    this.setState({
      PortList:value
    });
  }

  getRecentPortList(){
    let userName = this.props.BinduserName;
    let wxtoken = this.props.wxtoken;
    let serv = this.props.serv;
    let url = 'api/ports/?userName='+userName+'&wxtoken='+wxtoken+'&rowCount=0&pageIndex=1&recent=true&type=3&serv='+serv;
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
      for (let i=0;i<this.state.PortList.length;i++)
      {
        chv=this.state.PortList[i].portName + this.state.PortList[i].chsName;
        chv=chv.toUpperCase();
        if (chv.indexOf(v)!=-1){
          Ob={port:this.state.PortList[i].port, portName:this.state.PortList[i].portName, chsName:this.state.PortList[i].chsName};
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
        <BackTitle backonClick={this.props.backprop}/>
        <SearchBar Protext={'请输入港口名称'} SelfonChange={this.SearchonChange}/>
        {
          this.renderList()
        }
      </div>
    )
  }
}

export default PortsList;