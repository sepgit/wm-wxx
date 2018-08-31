import React, { Component } from 'react';
import '../css/weui.css';
import {getDataList,getCheckbind,getCookie} from '../DataInterface.js';
import ListItem from '../component/ListItem.js';
import BackTitle from '../component/BackTitle.js';
import BackT from './backT.js';

class AdServList extends Component {
  constructor(props) {
    super(props);
    this.ItemonClick = this.ItemonClick.bind(this);
    this.getServList = this.getServList.bind(this);
    this.GetRServList = this.GetRServList.bind(this);
    this.renderList = this.renderList.bind(this);

    this.state={
      servList:[],
      SelectItemID:0,
      SelectItemCaption:''
    }
  }

  componentWillMount(){
    let s = this.props.servType;
    this.getServList(s);
  }

  getServList(servType){
    let userName = this.props.BinduserName;
    let wxtoken = this.props.wxtoken;
    let url = 'api/servs/?userName='+userName+'&wxtoken='+wxtoken+'&rowCount=0&pageIndex=1&servType='+servType;
    let params = [];
    getDataList(url,params,this.GetRServList);
  }

  GetRServList(value){
    this.setState({
      servList:value
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
    this.state.servList.length>0?re=this.state.servList:re=this.state.servList;
    return re.map(s => {
      return <ListItem key={s.serv} idProp={s.serv} captionProp={s.servName} SelfonClickProp={this.ItemonClick}/>
    });
  }

  render() {
    return (
      <div>
        {
          this.renderList()
        }
      </div>
    )
  }
}

export default AdServList;