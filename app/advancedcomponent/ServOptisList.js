import React, { Component } from 'react';
import '../css/weui.css';
import {getDataList,getCheckbind,getCookie} from '../DataInterface.js';
import ListItem from '../component/ListItem.js';
import BackTitle from '../component/BackTitle.js';

class ServOptisList extends Component {
  constructor(props) {
    super(props);
    this.ItemonClick = this.ItemonClick.bind(this);
    this.getServOptisList = this.getServOptisList.bind(this);
    this.GetRServOptisList = this.GetRServOptisList.bind(this);
    this.renderList = this.renderList.bind(this);

    this.state={
      servOptisList:[],
      SelectItemID:0,
      SelectItemCaption:''
    }
  }

  componentWillMount(){
    let s = this.props.serv;
    this.getServOptisList(s);
  }

  getServOptisList(serv){
    let userName = this.props.BinduserName;
    let wxtoken = this.props.wxtoken;
    let url = 'api/servOptis/?userName='+userName+'&wxtoken='+wxtoken+'&rowCount=0&pageIndex=1&serv='+serv;
    let params = [];
    getDataList(url,params,this.GetRServOptisList);
  }

  GetRServOptisList(value){
    this.setState({
      servOptisList:value
    })
  }

  ItemonClick(a,b) {
    this.setState({
      SelectItemID:a,
      SelectItemCaption:b
    });
    this.props.GetSelectID(a,b);
  }

  renderList(){
    let re=[];
    this.state.servOptisList.length>0?re=this.state.servOptisList:re=this.state.servOptisList;
    return re.map(s => {
      return <ListItem key={s.servOpti} idProp={s.servOpti} captionProp={s.name} SelfonClickProp={this.ItemonClick}/>
    });
  }

  render() {
    return (
      <div>
        <BackTitle backonClick={this.props.backprop}/>
        {
          this.renderList()
        }
      </div>
    )
  }
}

export default ServOptisList;