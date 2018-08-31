import React, { Component } from 'react';
import '../css/weui.css';
import EmailInput from '../component/EmailInput.js'
import PasswordInput from '../component/PasswordInput.js'
import Verificationcode from '../component/Verificationcode.js';
import Button from '../component/Button.js';
import Label from  '../component/Label';
import {getData, postRegister} from '../DataInterface.js';

class UserinfoScan extends Component {
  constructor(props) {
    super(props);

    this.renderMain = this.renderMain.bind(this);
    this.state = {
      IuserName: '',
      IpassWord: '',
      IcheckpassWord: '',
      capi: 0,
      Icapi: 0,
      pic: '',
    }
  }

  componentWillMount() {

  }









  renderMain() {
    return (
      <div>
        <Title Titletext={'个人信息'}/>
        <div className="weui-cells">
          <UnEnableInput captionProp={'姓名'} promptProp={'-'} textProp={this.state.Name}/>
          <UnEnableInput captionProp={'行业'} promptProp={'-'} textProp={this.state.induName}/>
          <UnEnableInput captionProp={'职位'} promptProp={'-'} textProp={this.state.posi}/>
          <UnEnableInput captionProp={'口岸'} promptProp={'-'} textProp={this.state.portName}/>
          <UnEnableInput captionProp={'手机'} promptProp={'-'} textProp={this.state.mobi}/>
          <UnEnableInput captionProp={'公司全称'} promptProp={'-'} textProp={this.state.compName}/>
          <UnEnableInput captionProp={'公司简称'} promptProp={'-'} textProp={this.state.compAlia}/>
          <UnEnableInput captionProp={'邮箱'} promptProp={'-'} textProp={this.state.mail}/>
          <UnEnableInput captionProp={'电话'} promptProp={'-'} textProp={this.state.phon}/>
          <UnEnableInput captionProp={'传真'} promptProp={'-'} textProp={this.state.fax}/>
          <UnEnableInput captionProp={'QQ'} promptProp={'-'} textProp={this.state.qq}/>
          <UnEnableInput captionProp={'地址'} promptProp={'-'} textProp={this.state.addr}/>
        </div>
        <Button text={'编辑信息'} buttonstyle="1" ClickProp={this.ToEdit}/>
        <label className="weui-agree">
        <span className="weui-agree__text">
          <a  href="javascript:" onClick={this.UnBindonClick}>解除绑定</a>
        </span>
          <span className="weui-agree__text">
          　　　　　　　　　　　　　　　　<Link to={Rpath+"/register"}>注册</Link>
        </span>
        </label>
      </div>
    );
  }


  render() {
    return (
      <div>
        {
          this.renderMain()
        }
      </div>
    );
  }
}
export default UserinfoScan;