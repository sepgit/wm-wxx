import React, { Component } from 'react';
import '../css/weui.css';
import Label from  '../component/Label';
import Button from '../component/Button.js';
import EmailInput from '../component/EmailInput.js'
import {putunbind,getCheckbind,Getwxtoken} from '../DataInterface.js';

class Undobind extends Component {
  constructor(props) {
    super(props);
    this.renderMain = this.renderMain.bind(this);
    this.EmailInputonChange = this.EmailInputonChange.bind(this);
    this.UnBindonClick = this.UnBindonClick.bind(this);
    this.getBuserName = this.getBuserName.bind(this);
    this.state = {
      Pagestatus: '',
      Msg:'',
      IuserName: '',
      IpassWord: '',
      BinduserName:'',
      wxtoken:'',
    }
  }

  getBuserName(value){
    if (!value.err) {
      let userJson = value.user;
      console.log(userJson.userAcco);
      this.setState({
        BinduserName: userJson.userAcco,
        Pagestatus:'start'
      });
    }
  }

  componentWillMount(){
    let wxtoken = '';
    wxtoken = this.props.wxtoken;    //从上级传入
    if (wxtoken=='') {
      wxtoken=Getwxtoken();           //如果没有从Cookie中取
    }
    this.setState({
      wxtoken: wxtoken
    });
    getCheckbind(wxtoken,this.getBuserName);
  }

  EmailInputonChange(event) {
    this.setState({IuserName: event.target.value});
  }

  UnBindonClick(){
    let wxtoken = this.state.wxtoken;
    putunbind(wxtoken,this.props.GetRUnbind);
  }

  renderMain() {
    return(
      <div>
        <div className="weui-cells weui-cells_form">
          <Label text={'当前绑定邮箱'}/>
          <EmailInput promptProp={'请输入正确邮箱地址'} TextProp={this.state.BinduserName} updateStateProp={this.EmailInputonChange}/>

          <div className="weui-cell">
          </div>

          <Button text={'解除绑定'} buttonstyle="1" ClickProp={this.UnBindonClick}/>
          <Button text={'取消'} buttonstyle="2" ClickProp={this.props.ToBinded}/>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {
          this.state.Pagestatus=='start'?
          this.renderMain():undefined
        }
      </div>
    );
  }

}

export default Undobind;