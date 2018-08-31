import React, { Component } from 'react';
import '../css/weui.css';
import Title from  '../component/Title.js';
import Textline from  '../component/Textline.js';
import HTTPED from '../address';

class Introduce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LOGOPic:''
    }
  }

  componentWillMount(){
    this.setState({
      LOGOPic:HTTPED+ "images/nlogo.png"
    });
  }

  render() {
    return (
      <div>
        <Title Titletext={'帮帮移动端功能介绍'}/>
        <div className='demo_line_01'>　　</div>
        <Textline Text={'1.请先绑定在物贸帮帮(www.wumaobang.com)上的账号，以便能最大权限查询和使用物贸帮帮移动端的各项产品。'}/>
        <Textline Text={'　　'}/>
        <Textline Text={'2.可在移动端搜索各种运价优势、特种货优势、服务优势的联系人，直接联系。提高效率。'}/>
        <Textline Text={'　　'}/>
        <Textline Text={'3.可在移动端直接询价咨询和回盘回复。'}/>
        <Textline Text={'　　'}/>
        <Textline Text={'4.可在移动端推广公司和个人的优势，实现无缝对接客户。'}/>
        <Textline Text={'　　'}/>
        <Textline Text={'5.可在移动端进行认证，认证通过后可查看所有认证会员，促进行业诚信和信用体系的建立。'}/>
        <div className="DIVLOGO"><img className="LOGO" src={this.state.LOGOPic}/></div>
      </div>
    )
  }
}

export default Introduce;