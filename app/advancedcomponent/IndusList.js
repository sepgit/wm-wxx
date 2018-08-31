import React, { Component } from 'react';
import '../css/weui.css';
import {getDataList,getCheckbind,getCookie} from '../DataInterface.js';
import ListItem from '../component/ListItem.js';
import BackTitle from '../component/BackTitle.js';

class IndusList extends Component {
  constructor(props) {
    super(props);
    this.ItemonClick = this.ItemonClick.bind(this);
    this.getIndusList = this.getIndusList.bind(this);
    this.GetRIndusList = this.GetRIndusList.bind(this);
    this.renderList = this.renderList.bind(this);

    this.state={
      indusList:[],
      SelectItemID:0,
      SelectItemCaption:''
    }
  }

  componentWillMount(){
    this.getIndusList();
  }

  getIndusList(){
    let userName = this.props.BinduserName;
    let wxtoken = this.props.wxtoken;
    let url = 'api/indus/?userName='+userName+'&wxtoken='+wxtoken+'&rowCount=0&pageIndex=1';
    let params = [];
    getDataList(url,params,this.GetRIndusList);
  }

  GetRIndusList(value){
    this.setState({
      indusList:value
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
    this.state.indusList.length>0?re=this.state.indusList:re=this.state.indusList;
    return re.map(s => {
      return <ListItem key={s.indu} idProp={s.indu} captionProp={s.induName} SelfonClickProp={this.ItemonClick}/>
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

export default IndusList;