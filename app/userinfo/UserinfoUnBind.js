import React, { Component } from 'react';
import '../css/weui.css';
import Button from '../component/Button.js';
import Msg from '../component/Msg.js';

import Label from  '../component/Label';
import EmailInput from '../component/EmailInput.js'
import PasswordInput from '../component/PasswordInput.js'
import Title from  '../component/Title.js';
import {Getwxtoken,putbinding} from '../DataInterface.js';

import {Link,browserHistory} from 'react-router-dom'
import Rpath from '../Rpath.js';

class UserinfoUnBind extends Component {
  constructor(props) {
    super(props);
    this.EmailInputonChange = this.EmailInputonChange.bind(this);
    this.PassWordInputonChange = this.PassWordInputonChange.bind(this);
    this.BindonClick = this.BindonClick.bind(this);

    this.state = {
      BinduserName:'',
      wxtoken:'',
      Msg:'',
      Pagestatus: '',
    }
  }

  componentWillMount() {
    let wxtoken = '';
    wxtoken = this.props.wxtoken;    //从上级传入
    if (wxtoken=='') {
      wxtoken=Getwxtoken();           //如果没有从Cookie中取
    }
    this.setState({
      wxtoken:wxtoken
    });
  }

  EmailInputonChange(event) {
    this.setState({IuserName: event.target.value});
  }

  PassWordInputonChange(event) {
    this.setState({IpassWord: event.target.value});
  }

  BindonClick(){
    let IuserName = this.state.IuserName;
    let IpassWord = this.state.IpassWord;
    let wxtoken = this.state.wxtoken;
    putbinding(IuserName,IpassWord,wxtoken,this.props.GetReBind);
  }


  render() {
    return (
      <div>
      <Title Titletext={'个人中心'}/>
        <div className="weui-cells">
          <Label text={'账号'}/>
          <EmailInput promptProp={'请输入已激活的帮帮账号'} updateStateProp={this.EmailInputonChange}/>

          <div className="weui-cell">
          </div>

          <Label text={'密码'}/>
          <PasswordInput promptProp={'请输入密码'} updateStateProp={this.PassWordInputonChange}/>
          <div className="weui-cell">
          </div>
        </div>
        <div className="weui-btn-area">
          <a className="weui-btn weui-btn_primary" href="javascript:"  onClick={this.BindonClick}>立即绑定账号</a>
        </div>
        <div className="weui-msg">
          <div className="weui-msg__text-area">
            <p className="weui-msg__desc">没有物贸帮帮账号？<a href="javascript:void(0);" onClick={this.props.RegOnClick}>立即注册</a></p>
            <p className="weui-msg__desc">　</p>
            <p className="weui-msg__desc">注册成功，未激活？<a href="javascript:void(0);" onClick={this.props.ActOnClick}>立即激活</a></p>
          </div>
        </div>
      </div>
    );
  }
}
export default UserinfoUnBind;