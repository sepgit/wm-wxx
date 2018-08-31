import React, { Component } from 'react';
import '../css/weui.css';
import Title from  '../component/Title.js';
import Textline from  '../component/Textline.js';
import HTTPED from '../address';

class Contact extends Component {
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
        <Title Titletext={'联系我们'}/>
        <div className='demo_line_01'>　　</div>
        <Textline Text={'手机/微信：'}/>
        <Textline Text={'13780008543'}/>
        <Textline Text={'　　'}/>
        <Textline Text={'　　'}/>
        <Textline Text={'邮箱：'}/>
        <Textline Text={'2970416623@qq.com'}/>
        <Textline Text={'　　'}/>
        <Textline Text={'　　'}/>
        <Textline Text={'诚招各地代理与合作者，欢迎联系以上联系方式，进行合作洽谈'}/>
        <div className="DIVLOGO"><img className="LOGO" src={this.state.LOGOPic}/></div>
      </div>
    )
  }
}

export default Contact;