import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../css/weui.css';
import EmailInput from '../component/EmailInput.js'
import PasswordInput from '../component/PasswordInput.js'
import Button from '../component/Button.js';
import Msg from '../component/Msg.js';
import Label from  '../component/Label';
import BackTitle from '../component/BackTitle.js';
import Title from '../component/Title.js';
import Rpath from '../Rpath.js';
import {putbinding,getCheckbind,Getwxtoken} from '../DataInterface.js';

class Binding extends Component {
  constructor(props) {
    super(props);
    this.GetRe = this.GetRe.bind(this);
    this.EmailInputonChange = this.EmailInputonChange.bind(this);
    this.PassWordInputonChange = this.PassWordInputonChange.bind(this);
    this.BindonClick = this.BindonClick.bind(this);
    this.back = this.back.bind(this);
    this.getBuserName = this.getBuserName.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.renderMsg = this.renderMsg.bind(this);

    this.state = {
      Pagestatus: '',      //0 初始界面 1成功界面  -1 失败界面
      Msg:'',
      wxtoken:'',
      BinduserName:'',
      IuserName: '',
      IpassWord: '',
      MsgType:0,
      backto:''
    }
  }

  getBuserName(value){
    if (!value.err) {
      let userJson = value.user;
      this.setState({
        BinduserName: userJson.userAcco,
        Pagestatus: 'Main'
      });
    } else{
      this.setState({
        Pagestatus: 'Main'
      });
    }
  }

  componentWillMount(){
    let wxtoken=Getwxtoken();  //获取微信ID
    this.setState({
      wxtoken: wxtoken
    });
    getCheckbind(wxtoken,this.getBuserName);
  }

  GetRe(value) {
    if (!value.err) {
      this.setState({
        MsgType:1,
        Pagestatus: 'Msg',
        Msg:'绑定成功',
        backto:'Main'
      });
    }
    else {
      this.setState({
        MsgType:2,
        Pagestatus: 'Msg',
        Msg:value.errMsg,
        backto:'Main'
      });
    }
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
    putbinding(IuserName,IpassWord,wxtoken,this.GetRe);
  }

  back(){
    this.setState({
      Pagestatus:this.state.backto
    });
  }

  renderMain(){
    return  <div>
      <BackTitle backonClick={this.props.backprop}/>
      <Title Titletext={'绑定账号'}/>
      <div className="weui-cells">
        <Label text={'邮箱账号'}/>
        <EmailInput promptProp={'请输入正确邮箱地址'} TextProp={this.state.BinduserName} updateStateProp={this.EmailInputonChange}/>

        <div className="weui-cell">
        </div>

        <Label text={'密码'}/>
        <PasswordInput promptProp={'请输入密码'} updateStateProp={this.PassWordInputonChange}/>
        <div className="weui-cell">
        </div>

        <Button text={'提交'} buttonstyle={"1"} ClickProp={this.BindonClick}/>
        <label className="weui-agree">
          <span className="weui-agree__text">
                还没账号，<Link to={Rpath+"/register"}>立即注册</Link>
            </span>
        </label>
      </div>
    </div>
  }

  renderMsg(){
    return  <div>
      <Msg text={this.state.Msg} typeprop={this.state.MsgType} backprop={this.back} backtextprop={'返回绑定页'}/>
    </div>
  }

  render() {
    return(
      <div>
        <div className="title_fixed_space"></div>
        {
          this.state.Pagestatus=='Main'?
            this.renderMain():undefined
        }
        {
          this.state.Pagestatus=='Msg'?
          this.renderMsg():undefined
        }
      </div>
    );
  }
}

export default Binding;