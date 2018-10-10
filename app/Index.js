import React, { Component } from 'react';
import './css/weui.css';
import UserInfo from './userinfo/UserInfo.js'; //用户界面
import Baidu from './baidu/Baidu.js'; //物贸baidu主页
import AuthenticationIndex from './authentication/AuthenticationIndex.js';   //认证主页
import Contact from './contact/Contact.js';
import Introduce from './introduce/Introduce.js';
import AuthComps from './authcomps/AuthComps.js';
import Addsuppliers from './addsuppliers/addsuppliers.js';
import AdvantageNew from './advantagenew/advantageNew.js';
import Recruit from './recruit/recruit.js';
import Warn from './warn/warn.js';
import Recommend from './recommend/recommend.js';
import Silders from './sildes/silders.js';
import Exhibition from './exhibition/exhibition.js'
import {Getwxtoken,getCheckbind} from './DataInterface.js';

class Index extends Component {
  constructor(props) {
    super(props);
    this.GetRequest = this.GetRequest.bind(this);
    this.getBuserName = this.getBuserName.bind(this);

    this.state = {
      page:'',
    }
  }

  GetRequest() {
    let url = location.search; //获取url中"?"符后的字串
    console.log(url)
    if (url.indexOf("?") != -1) {
      let str = url.substr(1);
      let strs = str.split("&");
      return unescape(strs[0].split("=")[1]);
    }
  }

  componentWillMount(){
    let wxtoken=Getwxtoken();  //获取微信ID
    console.log("wxtoken="+wxtoken);
    let a =this.GetRequest();
    console.log(a);
    if (a=='contact'||a=='introduce') {
      this.setState({
        page:a
      });
    }
    else if (wxtoken==''){
      this.setState({
        page:'userinfo'
      });
    }else
    {
      getCheckbind(wxtoken,this.getBuserName);
    }
    // console.log(a)
  }

  getBuserName(value){
    let a =this.GetRequest();
    if (!value.err) {
      this.setState({
        page:a
      });
    }else {
      this.setState({
        page:'userinfo'
      });
    }
  }

  render() {
    return (
      <div>
        {
          this.state.page=='userinfo'?
            <UserInfo />:undefined
        }
        {
          this.state.page=='baidu'?
          <Baidu />:undefined
        }
        {
          this.state.page=='authentication'?
            <AuthenticationIndex />:undefined
        }
        {
          this.state.page=='contact'?
            <Contact />:undefined
        }
        {
          this.state.page=='introduce'?
            <Introduce />:undefined
        }
        {
          this.state.page=='authcomps'?
            <AuthComps />:undefined
        }
        {
          this.state.page=='addsuppliers'?
            <Addsuppliers />:undefined
        }
        {
          this.state.page=='advantagenew'?
            <AdvantageNew />:undefined
        }
        {
          this.state.page=='recruit'?
            < Recruit />:undefined
        }
        {
          this.state.page=='warn'?
            < Warn />:undefined
        }
        {
          this.state.page=='recommend'?
            < Recommend />:undefined
        }
        {
          this.state.page=='silde'?
          < Silders />:undefined
        }
        {
          this.state.page=='exhibition'?
          < Exhibition />:undefined
        }
      </div>
    );
  }
}
export default Index;