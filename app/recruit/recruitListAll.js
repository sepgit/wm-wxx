import React, { Component } from 'react';
import '../css/weui.css';
import '../css/recruit.css';
import Msg from '../component/Msg.js';
import Rpath from '../Rpath.js';
import HTTPED from '../address';
import StrInput from '../component/StrInput.js';
import BackTitle from '../component/BackTitle.js';
import Title from '../component/Title.js'
import RecruitSearch from './recruitsearch.js'
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv, postData, postYJData, getDataDetail } from '../DataInterface.js';

class RecruitListAll extends Component {
  constructor(props) {
    super(props);
    this.bkFun = this.bkFun.bind(this);
    this.state = {
        value:this.props.thevalue,
        // BinduserName: this.props.BinduserName, //当前用户
        // wxtoken: this.props.wxtoken,
        logo :''
    }
  }
  componentWillMount() {
    // let userName=this.state.BinduserName;
    // let wxtoken=this.state.wxtoken;
    let comp = this.state.value.comp;
    // let url = 'api/comps/'+comp +'?userName='+userName+ '&wxtoken='+wxtoken;
    // getDataDetail(url, this.bkFun);
    this.bkFun(this.state.value)
  }
  bkFun (data) {
    // console.log(data);
    let logo = data.logo;
    if ( logo == undefined || logo=="undefined" || logo=="null" ||logo==null  ) {
      let logoUrl =  HTTPED + 'images/nlogo.png';
        this.setState({
          logo:logoUrl
        })
    }else {
      let logoUrl =  HTTPED +logo;
        this.setState({
          logo:logoUrl
        })
    }
  }
  render() {
    // console.log(this.state.value);
    let s = this.state.value.createdatetime
    let x = s.substring(0,s.indexOf('T'));
    // console.log(this.state.logo);
    return (
      <div className="re_lists_all clearfix" onClick={this.props.toDetail}>
        <div className="re_compIcon"><img src={this.state.logo} alt="logo"/></div>
        <ul className="re_lists_ul">
            <li className="clearfix">
                <div>{this.state.value.compName}</div>
                <span>{this.state.value.salaryName}</span>
            </li>
            <li className="clearfix">
                <div>{this.state.value.hiringName}</div>
                <span>{this.state.value.cityName}</span>
            </li>
            <li className="clearfix">
                <div>{this.state.value.requirementsinfo}</div>
                <span>{x}</span>
            </li>
        </ul>
      </div>
    )
  }
}

export default RecruitListAll;