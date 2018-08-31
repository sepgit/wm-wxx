import React, { Component } from 'react';
import '../css/weui.css';
import '../css/page.css';
import logo from '../image/1.jpg';
import LOGO from '../image/LOGO.jpg';
import NuCheck from '../image/NuCheck.jpg';
import SearchBar from '../component/SearchBar.js';
import StrInput from '../component/StrInput.js';
import Msg from '../component/Msg.js';
import Button from '../component/Button.js';
import Activate from '../userinfo/Activate.js';
import IndusList from '../advancedcomponent/IndusList.js';
import Dialog from '../component/Dialog.js';
import Toast from '../component/Toast.js';
import Authentication from '../authentication/Authentication.js';
import AuthentPriceList from '../authentication/AuthentPriceList.js';
import Contact from '../contact/Contact.js';
import Introduce from '../introduce/Introduce.js';    //<Dialog  Submit={this.show2()}/>:undefined
import { VelocityTransitionGroup} from 'velocity-react';
import {getData} from '../DataInterface.js';
import HTTPED from '../address';
import Evaluate from '../baidu/Evaluate.js';

class Test extends Component {
  constructor(props) {
    super(props);
    this.show1 = this.show1.bind(this);
    this.show2 = this.show2.bind(this);
    this.getRadioValue = this.getRadioValue.bind(this);
    this.Getpic = this.Getpic.bind(this);
    this.state = {
      Pagestatus:false,
      NuCheckPic:''
    }
  }

  componentWillMount() {
    console.log(HTTPED+ "images/nvip.png");
    this.setState({
      NuCheckPic:HTTPED+ "images/NuCheck.png"
    });
  }

  Getpic(value) {
    console.log(value);
    this.setState({
      NuCheckPic: 'data:image/png;base64,' + value
    });
  }

  show1(){
    this.setState({
      Pagestatus:true
    });
    console.log(this.state.Pagestatus);
  }

  show2(){
    this.setState({
      Pagestatus:false
    });
    console.log(11111);
  }

  getRadioValue() {
    let radios = document.getElementsByName("radioname");
    let value = '';
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        value = radios[i].value;
        break;
      }
      console.log(value);
      return value;
    }
  }

  render() {
    return(
      <div>
        <Evaluate />
      </div>
    );
  }
}

export default Test;