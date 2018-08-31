import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../css/weui.css';
import '../css/page.css';
import YJSearchBaidu from './YJSearchBaidu.js';
import TZSearchBaidu from './TZSearchBaidu.js';
import FWSearchBaidu from './FWSearchBaidu.js';
import Rpath from '../Rpath.js';
import Title from  '../component/Title.js';
import BackTitle from '../component/BackTitle.js';
import HeadLine from '../component/HeadLine.js';
import Footer from '../component/Footer.js';
import HTTPED from '../address';
import {getDataJson} from '../DataInterface.js';

class Baidu extends Component {
  constructor(props) {
    super(props);
    this.renderMain = this.renderMain.bind(this);
    this.renderYJ = this.renderYJ.bind(this);
    this.renderFW = this.renderFW.bind(this);
    this.renderTZ = this.renderTZ.bind(this);
    this.ToMain = this.ToMain.bind(this);
    this.ToYJ = this.ToYJ.bind(this);
    this.ToFW = this.ToFW.bind(this);
    this.ToTZ = this.ToTZ.bind(this);


    this.state = {
      Pagestatus:'',
      doorpic:'',
      baidupic:'',

    }
  }

  componentWillMount(){
    this.setState({
      Pagestatus:'Main',
      doorpic:HTTPED+ "images/door.png",
      baidupic:HTTPED+ "images/baidupic.png",
    });
  }

  ToYJ(){
    this.setState({
      Pagestatus:'YJ',
    });
  }

  ToFW(){
    this.setState({
      Pagestatus:'FW',
    });
  }

  ToTZ(){
    this.setState({
      Pagestatus:'TZ',
    });
  }

  ToMain(){
    this.setState({
      Pagestatus:'Main',
    });
  }

  renderMain(){
    return  <div>
      <HeadLine Caption={'物贸百度'}/>
      <div className="page">
        <Title SML={1} Titletext={'根据您需要的选择对应的类型'}/>
        
        <div className="weui-flex">
          <div className="weui-flex__item"><div className="blue_panel"><a className="Text_title" href="javascript:;" onClick={this.ToYJ}>普通货优势搜索</a></div></div>
          <div className="blue_panel"><img className="panel_Coin" src={this.state.doorpic}/></div>
        </div>
        <div className="mark">例：FCL、LCL、AIR</div>
        <div className="nocolor_panel"></div>
        <div className="weui-flex">
          <div className="weui-flex__item"><div className="green_panel"><a className="Text_title" href="javascript:;" onClick={this.ToTZ}>特种货优势搜索</a></div></div>
          <div className="green_panel"><img className="panel_Coin" src={this.state.doorpic}/></div>
        </div>
        <div className="mark">例：FR、RF、DG</div>
        <div className="nocolor_panel"></div>
        <div className="weui-flex">
          <div className="weui-flex__item"><div className="black_panel"><a className="Text_title" href="javascript:;" onClick={this.ToFW}>服务优势搜索</a></div></div>
          <div className="black_panel"><img className="panel_Coin" src={this.state.doorpic}/></div>
        </div>
        <div className="mark">例：报关、车队、船公司</div>
        <div className="nocolor_panel"></div>
        <div className="DIVLOGO"><img className="LOGO" src={this.state.baidupic}/></div>
        <div className="nocolor_panel"></div>
        <Footer Text={'如果查找不到你所需要的供应商'}/>
        <Footer Text={'请联系客服平台：微信/手机13780008543'}/>
      </div>
    </div>
  }

  renderYJ(){
    return  <div>
      <YJSearchBaidu ToMain={this.ToMain}/>
    </div>
  }

  renderFW(){
    return  <div>
      <FWSearchBaidu ToMain={this.ToMain}/>
    </div>
  }

  renderTZ(){
    return  <div>
      <TZSearchBaidu ToMain={this.ToMain}/>
    </div>
  }

  render() {
    return (
      <div>
        <div className="title_fixed_space"></div>
        {
          this.state.Pagestatus=='Main'?
            this.renderMain():undefined
        }
        {
          this.state.Pagestatus=='YJ'?
            this.renderYJ():undefined
        }
        {
          this.state.Pagestatus=='FW'?
            this.renderFW():undefined
        }
        {
          this.state.Pagestatus=='TZ'?
            this.renderTZ():undefined
        }
      </div>
    );
  }
}
export default Baidu;